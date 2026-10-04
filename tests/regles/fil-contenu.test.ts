import { describe, expect, it } from "vitest";
import { lire, lister } from "../outils/fichiers";

// Le contenu du fil Nouveau arrive par des migrations de contenu fabriquées à
// partir d'une source (règle Q7). Ces tests relisent le SQL produit :
// - une tâche publiée par le fil est une tâche du fil, hors de tout métier
//   (règles S4 et B3 : le site en ligne et les comptes connectés ne la lisent
//   pas directement) ;
// - une publication désigne un contenu écrit dans le même fichier ;
// - un modèle à remplir et ses champs se correspondent ;
// - les chiffres d'une réponse attendue sont justes.

const MIGRATIONS = lister("supabase/migrations", (f) => f.endsWith(".sql"));
const DU_FIL = MIGRATIONS.filter((f) => /insert into publications/.test(lire(f)));
const AVEC_TACHES = DU_FIL.filter((f) => /select 'tache', t\.id::text/.test(lire(f)));
const texte = (motif: RegExp, sql: string) => [...sql.matchAll(motif)].map((m) => m[1]);

describe("S4 B3 · les tâches du fil restent hors des parcours", () => {
  it("au moins une migration publie des tâches dans le fil", () => {
    expect(AVEC_TACHES.length).toBeGreaterThan(0);
  });

  it.each(AVEC_TACHES)("%s : chaque tâche est créée « du fil », et aucune n'entre dans un métier", (fichier) => {
    const sql = lire(fichier);
    const creations = sql.split("\n").filter((l) => l.startsWith("insert into taches "));
    expect(creations.length).toBeGreaterThan(0);
    for (const ligne of creations) {
      expect(ligne).toMatch(/^insert into taches \(code, titre, limite_connue, du_fil\) select \$t\$F\d+\$t\$, .*, false, true$/);
    }
    // La mise à jour qui suit garde la tâche dans le fil.
    const majs = sql.split("\n").filter((l) => l.startsWith("update taches set "));
    expect(majs.length).toBe(creations.length);
    for (const ligne of majs) expect(ligne).toMatch(/, du_fil = true$/);
    expect(sql).not.toMatch(/insert into metiers_taches/);
    expect(sql).not.toMatch(/insert into ressources_taches/);
    // Garde de début et contrôle de fin : la migration s'arrête si un code est déjà pris par un métier.
    expect(sql).toMatch(/do \$garde\$/);
    expect(sql).toMatch(/Tâches du fil sans publication ni pack/);
  });

  it.each(AVEC_TACHES)("%s : chaque tâche a un cas pratique avec sa réponse, et un modèle", (fichier) => {
    const sql = lire(fichier);
    const codes = texte(/^insert into taches \(code, titre, limite_connue, du_fil\) select \$t\$(F\d+)\$t\$/gm, sql);
    for (const code of codes) {
      expect(sql, `cas de ${code}`).toMatch(new RegExp(`reponse_attendue = \\$t\\$[^$]+\\$t\\$\\n  where numero = 1 and tache_id in \\(select id from taches where code = \\$t\\$${code}\\$t\\$\\)`));
      expect(sql, `modèle de ${code}`).toMatch(new RegExp(`insert into modeles_prompts [^;]*where t\\.code = \\$t\\$${code}\\$t\\$`));
    }
  });

  it("chaque tâche du fil a sa catégorie d'usage dans le catalogue", () => {
    const catalogue = lire("src/lib/catalogue.ts");
    for (const fichier of AVEC_TACHES) {
      for (const code of texte(/^insert into taches \(code, titre, limite_connue, du_fil\) select \$t\$(F\d+)\$t\$/gm, lire(fichier))) {
        expect(catalogue, code).toMatch(new RegExp(`^  ${code}: "`, "m"));
      }
    }
  });
});

describe("Q7 · un modèle à remplir et ses champs se correspondent", () => {
  it.each(AVEC_TACHES)("%s", (fichier) => {
    const blocs = lire(fichier).split("insert into modeles_prompts ").slice(1);
    expect(blocs.length).toBeGreaterThan(0);
    for (const bloc of blocs) {
      const fin = bloc.indexOf("insert into conseils_ia");
      const modele = bloc.slice(0, fin);
      const gabarit = modele.slice(0, modele.indexOf("insert into champs_modele"));
      const dansGabarit = [...new Set(texte(/\{\{([a-z][a-z0-9_]*)\}\}/g, gabarit))].sort();
      const champs = texte(/^ {4}\(\$t\$([a-z][a-z0-9_]*)\$t\$, \$t\$[^$]+\$t\$, \$t\$(?:texte|long|choix|nombre)\$t\$/gm, modele).sort();
      expect(champs.length).toBeGreaterThan(0);
      expect(champs).toEqual(dansGabarit);
      // Les cinq IA ont leur note.
      const notes = texte(/^ {4}\(\$t\$(chatgpt|claude|gemini|meta_ai|copilot)\$t\$, /gm, bloc.slice(fin));
      expect(notes.sort()).toEqual(["chatgpt", "claude", "copilot", "gemini", "meta_ai"]);
    }
  });
});

describe("Le fil · une publication désigne un contenu qui existe, à une date lisible", () => {
  it.each(DU_FIL)("%s", (fichier) => {
    const sql = lire(fichier);
    const actus = new Set([...texte(/^values \(\n {2}\$t\$([a-z0-9-]+)\$t\$, \$t\$(?:chatgpt|claude|gemini)\$t\$/gm, sql), ...texte(/^values \(\n {2}'([a-z0-9-]+)', '(?:chatgpt|claude|gemini)'/gm, sql)]);
    const publiees = [...texte(/values \('mise_a_jour', \$t\$([a-z0-9-]+)\$t\$/g, sql), ...texte(/values \('mise_a_jour', '([a-z0-9-]+)'/g, sql)];
    expect(publiees.length).toBe(actus.size);
    for (const slug of publiees) expect(actus.has(slug), slug).toBe(true);

    const packs = new Set(texte(/insert into packs \(slug, titre, description, pour_qui\) values \(\$t\$([a-z0-9-]+)\$t\$/g, sql));
    for (const slug of texte(/values \('pack', \$t\$([a-z0-9-]+)\$t\$/g, sql)) expect(packs.has(slug), slug).toBe(true);

    const dates = texte(/'(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)', (?:true|false)\)?$/gm, sql);
    expect(dates.length).toBeGreaterThanOrEqual(publiees.length);
    for (const date of dates) expect(Number.isFinite(Date.parse(date)), date).toBe(true);
  });

  it.each(DU_FIL)("%s : chaque actualité cite au moins une source officielle en https", (fichier) => {
    const sql = lire(fichier);
    expect(sql).not.toMatch(/"url":\s?"http:\/\//);
    const actus = sql.split("insert into mises_a_jour_ia ").slice(1);
    for (const actu of actus) {
      expect(actu.slice(0, actu.indexOf("on conflict"))).toMatch(/"url":\s?"https:\/\//);
    }
  });

  it.each(DU_FIL)("%s : ni tiret long, ni nom du fondateur", (fichier) => {
    const sql = lire(fichier);
    expect(sql).not.toMatch(/[—–]/);
    expect(sql).not.toMatch(/darius|nassoutode|bscale/i);
  });
});

describe("Q7 · les chiffres des réponses attendues sont justes (migration 0042)", () => {
  const sql = lire("supabase/migrations/0042_fil_semaines_1_a_4.sql");
  const fcfa = (n: number) => n.toLocaleString("fr-FR").replace(/[  ]/g, " ");
  const reponse = (code: string) => {
    const m = sql.match(new RegExp(`reponse_attendue = \\$t\\$([^$]+)\\$t\\$\\n  where numero = 1 and tache_id in \\(select id from taches where code = \\$t\\$${code}\\$t\\$\\)`));
    return m?.[1] ?? "";
  };

  it("F61 : la commande et ce qu'il reste du budget", () => {
    const pagnes = (60 - 8) * 7000;
    const sacs = (25 - 5) * 6000;
    const foulards = (40 - 30) * 1500;
    const total = pagnes + sacs + foulards;
    for (const attendu of [`52 pagnes (${fcfa(pagnes)} FCFA)`, `20 sacs (${fcfa(sacs)} FCFA)`, `10 foulards (${fcfa(foulards)} FCFA)`, `soit ${fcfa(total)} FCFA`, `il reste ${fcfa(600000 - total)} FCFA`]) {
      expect(reponse("F61")).toContain(attendu);
    }
  });

  it("F62 : la marge par paire de chaque offre", () => {
    const [payeA, coutA] = [2 * 15000 + 15000 / 2, 3 * 10000];
    const [payeB, coutB] = [2 * 15000, 2 * 10000 + 1000];
    for (const attendu of [`paie ${fcfa(payeA)} FCFA`, `coûtent ${fcfa(coutA)} FCFA`, `de ${fcfa(payeA - coutA)} FCFA, soit ${fcfa((payeA - coutA) / 3)} FCFA par paire`, `paie ${fcfa(payeB)} FCFA`, `coûtent ${fcfa(coutB)} FCFA`, `de ${fcfa(payeB - coutB)} FCFA, soit ${fcfa((payeB - coutB) / 2)} FCFA par paire`]) {
      expect(reponse("F62")).toContain(attendu);
    }
    expect((payeA - coutA) / 3).toBeLessThan(3000);
    expect((payeB - coutB) / 2).toBeGreaterThanOrEqual(3000);
  });

  it("F63 : les dates limites, 72 heures avant", () => {
    expect(reponse("F63")).toContain(`le ${25 - 3} décembre pour Noël et le ${31 - 3} décembre pour le 31`);
  });

  it("F65 : le total, la moyenne, l'écart et le reste", () => {
    const trimestres = [1_800_000, 2_100_000, 1_950_000, 2_650_000];
    const ventes = trimestres.reduce((a, b) => a + b, 0);
    expect(Math.round(ventes / 12 / 1000) * 1000).toBe(708_000);
    for (const attendu of [`${fcfa(ventes)} FCFA, soit environ 708 000 FCFA par mois`, `${fcfa(Math.max(...trimestres))} FCFA`, `${fcfa(Math.min(...trimestres))} FCFA`, `soit ${fcfa(Math.max(...trimestres) - Math.min(...trimestres))} FCFA d'écart`, `il reste ${fcfa(ventes - 6_900_000)} FCFA`]) {
      expect(reponse("F65")).toContain(attendu);
    }
  });

  it("la tâche de la semaine paraît un lundi, les actualités un jeudi, trois par jeudi", () => {
    const taches = [...sql.matchAll(/select 'tache', t\.id::text, [^\n]*'(\d{4}-\d{2}-\d{2})T05:00:00Z', true/g)].map((m) => m[1]);
    expect(taches.length).toBe(4);
    for (const jour of taches) expect(new Date(`${jour}T12:00:00Z`).getUTCDay(), jour).toBe(1);
    const actus = [...sql.matchAll(/values \('mise_a_jour', [^\n]*'(\d{4}-\d{2}-\d{2})T05:00:00Z', true\)/g)].map((m) => m[1]);
    expect(actus.length).toBe(12);
    const parJour = new Map<string, number>();
    for (const jour of actus) {
      expect(new Date(`${jour}T12:00:00Z`).getUTCDay(), jour).toBe(4);
      parJour.set(jour, (parJour.get(jour) ?? 0) + 1);
    }
    expect([...parJour.values()]).toEqual([3, 3, 3, 3]);
  });
});
