import { describe, expect, it } from "vitest";
import { lire, lister } from "../outils/fichiers";

// Les kits métier : le contenu est en base (migrations), les fichiers à
// télécharger sont dans private/kits, servis par une route protégée.
// - Règle S2 : aucun fichier de kit dans public/.
// - Chaque fichier cité par une migration existe, et son nom passe le motif
//   de la route de téléchargement. Aucun fichier n'est oublié dans le dossier.
// - Règle Q7 : les textes des kits n'ont pas de tiret long, et chaque champ
//   d'un modèle à remplir est bien utilisé par sa consigne.

const NOM = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(zip|xlsx|docx)$/;
const MIGRATIONS = lister("supabase/migrations", (f) => /\/\d{4}_kit[_s]?.*\.sql$/.test(f));
const SQL = MIGRATIONS.map(lire).join("\n");
const fichiersCites = [...new Set([...SQL.matchAll(/\$t\$([a-z0-9-]+\.(?:zip|xlsx|docx))\$t\$/g)].map((m) => m[1]))].sort();
const fichiersPresents = lister("private/kits").map((f) => f.replace("private/kits/", ""));

describe("kits · fichiers à télécharger", () => {
  it("trouve les migrations des kits et leurs fichiers", () => {
    expect(MIGRATIONS.length).toBeGreaterThanOrEqual(2);
    expect(fichiersCites.length).toBeGreaterThanOrEqual(8);
  });

  it.each(fichiersCites)("%s existe dans private/kits et son nom passe le motif de la route", (nom) => {
    expect(nom).toMatch(NOM);
    expect(fichiersPresents).toContain(nom);
  });

  it("private/kits ne contient aucun fichier que le contenu ne cite pas", () => {
    expect(fichiersPresents.filter((f) => !fichiersCites.includes(f))).toEqual([]);
  });

  it("le motif de la route est le même que celui de la base", () => {
    expect(lire("src/app/api/kits/fichiers/[nom]/route.ts")).toContain(String(NOM).slice(1, -1));
    expect(lire("supabase/migrations/0018_kits_metier.sql")).toContain("'^[a-z0-9]+(-[a-z0-9]+)*\\.(zip|xlsx|docx)$'");
  });

  it("les fichiers de kit sont embarqués avec la route, et absents de public/", () => {
    expect(lire("next.config.ts")).toContain('"/api/kits/fichiers/[nom]": ["./private/kits/**/*"]');
    expect(lister("public", (f) => /\.(zip|xlsx|docx)$/i.test(f))).toEqual([]);
  });
});

describe("kits · textes (règle Q7)", () => {
  it("aucun tiret long dans le contenu des kits", () => {
    expect(SQL).not.toMatch(/[–—]/);
  });

  it("les liens « Faire une copie » sont des liens Google en https", () => {
    const liens = [...SQL.matchAll(/\$t\$(https?:\/\/[^$]+)\$t\$/g)].map((m) => m[1]);
    expect(liens.length).toBeGreaterThan(0);
    for (const lien of liens) expect(lien).toMatch(/^https:\/\/docs\.google\.com\/(spreadsheets|document)\/d\/[\w-]+\/copy$/);
  });

  it("chaque consigne à remplir n'utilise que des champs en minuscules, sans accolade orpheline", () => {
    const gabarits = [...SQL.matchAll(/\$t\$(Rôle : [\s\S]*?)\$t\$/g)].map((m) => m[1]);
    expect(gabarits.length).toBeGreaterThanOrEqual(8);
    for (const gabarit of gabarits) {
      const champs = [...gabarit.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]);
      expect(champs.length).toBeGreaterThan(0);
      for (const champ of champs) expect(champ).toMatch(/^[a-z][a-z0-9_]*$/);
      expect(gabarit.replace(/\{\{\w+\}\}/g, "")).not.toMatch(/[{}]/);
    }
  });
});
