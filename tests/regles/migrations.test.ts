import { describe, expect, it } from "vitest";
import { lire, lister } from "../outils/fichiers";

// Règles S4 et B1 : chaque table a la RLS activée, des droits explicites pour
// service_role, et aucun droit pour anon. Le contenu payant n'est lisible que
// par un compte dont l'accès est actif (fonction a_un_acces_actif), jamais
// par « tout compte connecté ». Les tables internes sont réservées au serveur.
//
// Le test rejoue les migrations dans l'ordre et calcule l'état final des
// droits et des politiques. Il ne remplace pas la vérification en base :
// Supabase donne de lui-même TRUNCATE, REFERENCES, TRIGGER et MAINTAIN aux
// rôles publics à la création d'une table, et aucun de nos fichiers ne le dit.
// D'où deux exigences : les droits d'un rôle public sont remis à zéro
// (« revoke all ») avant d'être donnés, et supabase/controles/droits.sql
// (lecture seule) est lancé en base après chaque migration.

// Tables dont chaque ligne appartient à un utilisateur (politique
// « auth.uid() = user_id »). Ce sont les seules que le rôle authenticated
// peut lire ou écrire directement.
const TABLES_PERSONNELLES = new Set([
  "utilisateurs_chemins",
  "taches_faites",
  "favoris",
  "derniere_activite",
  "activite_journaliere",
  "progression_kit",
  "profils",
]);

// Tables internes : seul le serveur (clé service) les lit et les écrit.
const TABLES_INTERNES = new Set([
  "acces_clients",
  "abonnements",
  "demandes_plans",
  "demandes_contact",
  // Notifications : lues et écrites par le serveur, pour le compte connecté
  // ou sur présentation du jeton d'un e-mail (migration 0040).
  "preferences_notifications",
  "envois_notifications",
  // Rendus des exercices finaux d'attestation (migration 0052) : le serveur
  // vérifie l'abonnement et les conditions, et garde les clés des fichiers.
  "rendus_attestation",
]);

// Contenu des kits : lu par le serveur seulement (clé service, puis cache).
// Un compte connecté n'y a aucun droit, même en lecture.
const TABLES_CONTENU_SERVEUR = new Set([
  "kits",
  "ressources",
  "kits_metier",
  "ressources_taches",
  "modeles_prompts",
  "champs_modele",
  "conseils_ia",
  // Le fil Nouveau (migration 0040) : c'est le serveur qui décide, compte par
  // compte, ce qui est montré en entier ou en titre seul.
  "publications",
  "mises_a_jour_ia",
  "packs",
  "packs_taches",
  "sessions_live",
  "videos",
  // Exercices finaux d'attestation (migration 0052) : la réponse type du
  // correcteur ne doit jamais être lisible par un abonné.
  "exercices_finaux",
]);

type Etat = {
  tables: Set<string>;
  rls: Set<string>;
  droits: Map<string, Map<string, Set<string>>>; // table -> rôle -> privilèges
  politiquesOuvertes: Map<string, string>; // nom -> table
  politiquesAcces: Map<string, string>; // nom -> table (lecture conditionnée à l'accès actif)
  defautRoles: Set<string>;
  defautToutRetire: Set<string>; // rôles dont tous les droits par défaut ont été retirés
  remisAZero: Set<string>; // « table:rôle » passés par un « revoke all »
};

const nomTable = (brut: string) => brut.replace(/^public\./, "").replace(/"/g, "").toLowerCase();
const liste = (brut: string) => brut.split(",").map((v) => v.trim().toLowerCase()).filter(Boolean);

function rejouer(): Etat {
  const etat: Etat = { tables: new Set(), rls: new Set(), droits: new Map(), politiquesOuvertes: new Map(), politiquesAcces: new Map(), defautRoles: new Set(), defautToutRetire: new Set(), remisAZero: new Set() };
  const fichiers = lister("supabase/migrations", (f) => f.endsWith(".sql"));
  for (const fichier of fichiers) {
    const sql = lire(fichier)
      .split("\n")
      .map((ligne) => ligne.replace(/--.*$/, ""))
      .join("\n");
    for (const brut of sql.split(";")) {
      const s = brut.replace(/\s+/g, " ").trim();
      if (!s) continue;
      let m: RegExpMatchArray | null;

      if ((m = s.match(/^create table (?:if not exists )?([\w."]+)/i))) {
        etat.tables.add(nomTable(m[1]));
      } else if ((m = s.match(/^alter table ([\w."]+) enable row level security/i))) {
        etat.rls.add(nomTable(m[1]));
      } else if ((m = s.match(/^alter default privileges .*? grant (.+?) on tables to (.+)$/i))) {
        for (const role of liste(m[2])) etat.defautRoles.add(role);
      } else if ((m = s.match(/^alter default privileges .*? revoke (.+?) on tables from (.+)$/i))) {
        for (const role of liste(m[2])) {
          etat.defautRoles.delete(role);
          if (liste(m[1]).includes("all")) etat.defautToutRetire.add(role);
        }
      } else if ((m = s.match(/^grant (.+?) on (?:table )?([\w."]+) to (.+)$/i)) && !/ on schema /i.test(s)) {
        const table = nomTable(m[2]);
        const parTable = etat.droits.get(table) ?? new Map<string, Set<string>>();
        for (const role of liste(m[3])) {
          const privileges = parTable.get(role) ?? new Set<string>();
          for (const p of liste(m[1])) privileges.add(p);
          parTable.set(role, privileges);
        }
        etat.droits.set(table, parTable);
      } else if ((m = s.match(/^revoke (.+?) on (?:table )?([\w."]+) from (.+)$/i))) {
        const parTable = etat.droits.get(nomTable(m[2]));
        if (liste(m[1]).includes("all")) {
          for (const role of liste(m[3])) etat.remisAZero.add(`${nomTable(m[2])}:${role}`);
        }
        if (parTable) {
          const retires = liste(m[1]);
          for (const role of liste(m[3])) {
            if (retires.includes("all")) parTable.delete(role);
            else retires.forEach((p) => parTable.get(role)?.delete(p));
            if (parTable.get(role)?.size === 0) parTable.delete(role);
          }
        }
      } else if ((m = s.match(/^create policy "([^"]+)" on ([\w."]+)(.*)$/i))) {
        if (/auth\.role\(\)\s*=\s*'authenticated'/i.test(m[3]) || /using\s*\(\s*true\s*\)/i.test(m[3])) {
          etat.politiquesOuvertes.set(m[1], nomTable(m[2]));
        } else if (/a_un_acces_actif\(\)/i.test(m[3])) {
          etat.politiquesAcces.set(m[1], nomTable(m[2]));
        }
      } else if ((m = s.match(/^drop policy (?:if exists )?"([^"]+)" on/i))) {
        etat.politiquesOuvertes.delete(m[1]);
        etat.politiquesAcces.delete(m[1]);
      }
    }
  }
  return etat;
}

describe("S4 · droits et protections des tables", () => {
  const etat = rejouer();
  const tables = [...etat.tables].sort();

  it("retrouve les tables de l'application", () => {
    expect(tables.length).toBeGreaterThan(10);
  });

  it.each(tables)("%s a la RLS activée", (table) => {
    expect(etat.rls.has(table)).toBe(true);
  });

  it.each(tables)("%s a des droits explicites pour service_role", (table) => {
    expect([...(etat.droits.get(table)?.get("service_role") ?? [])]).toContain("select");
  });

  it.each(tables)("%s ne donne aucun droit à anon", (table) => {
    expect([...(etat.droits.get(table)?.get("anon") ?? [])]).toEqual([]);
  });

  it.each(tables.filter((t) => TABLES_INTERNES.has(t)))("%s (table interne) ne donne aucun droit à authenticated", (table) => {
    expect([...(etat.droits.get(table)?.get("authenticated") ?? [])]).toEqual([]);
  });

  it.each([...TABLES_CONTENU_SERVEUR])("%s (contenu d'un kit) existe et ne donne aucun droit à authenticated", (table) => {
    expect(tables).toContain(table);
    expect([...(etat.droits.get(table)?.get("authenticated") ?? [])]).toEqual([]);
    expect(etat.remisAZero.has(`${table}:authenticated`), "« revoke all on table … from authenticated » manquant").toBe(true);
    expect(etat.remisAZero.has(`${table}:anon`), "« revoke all on table … from anon » manquant").toBe(true);
  });

  const contenu = tables.filter((t) => !TABLES_PERSONNELLES.has(t) && !TABLES_INTERNES.has(t));

  it.each(contenu)("%s (contenu payant) n'est lisible que par un compte dont l'accès est actif", (table) => {
    const droits = [...(etat.droits.get(table)?.get("authenticated") ?? [])];
    expect(droits.filter((d) => d !== "select"), "authenticated ne peut que lire le contenu").toEqual([]);
    if (droits.includes("select")) {
      expect([...etat.politiquesAcces.values()], "politique a_un_acces_actif() manquante").toContain(table);
    }
  });

  const ouvertesAuxComptes = tables.filter((t) => (etat.droits.get(t)?.get("authenticated")?.size ?? 0) > 0);

  it.each(ouvertesAuxComptes)("%s : les droits de authenticated sont remis à zéro avant d'être donnés", (table) => {
    expect(etat.remisAZero.has(`${table}:authenticated`), "« revoke all on table … from authenticated » manquant").toBe(true);
  });

  it.each(ouvertesAuxComptes)("%s ne donne ni truncate, ni references, ni trigger à authenticated", (table) => {
    const droits = [...(etat.droits.get(table)?.get("authenticated") ?? [])];
    expect(droits.filter((d) => ["all", "truncate", "references", "trigger", "maintain"].includes(d))).toEqual([]);
  });

  it("la fonction a_un_acces_actif existe, en security definer, sans droit pour anon", () => {
    const sql = lister("supabase/migrations", (f) => f.endsWith(".sql")).map(lire).join("\n");
    expect(sql).toMatch(/create or replace function public\.a_un_acces_actif\(\)[\s\S]{0,200}security definer[\s\S]{0,80}set search_path = ''/i);
    expect(sql).toMatch(/revoke all on function public\.a_un_acces_actif\(\) from anon/i);
  });

  it("les tâches du fil ne sortent que par le serveur : politiques restrictives sur taches et exercices", () => {
    const sql = lister("supabase/migrations", (f) => f.endsWith(".sql")).map(lire).join("\n");
    expect(sql).toMatch(/create policy "taches_du_fil_par_le_serveur" on taches\s+as restrictive for select to authenticated using \(not du_fil\)/i);
    expect(sql).toMatch(/create policy "exercices_du_fil_par_le_serveur" on exercices\s+as restrictive for select to authenticated using \(not public\.tache_du_fil\(tache_id\)\)/i);
    expect(sql).toMatch(/create or replace function public\.tache_du_fil\(p_tache uuid\)[\s\S]{0,200}security definer[\s\S]{0,80}set search_path = ''/i);
    expect(sql).toMatch(/revoke all on function public\.tache_du_fil\(uuid\) from anon/i);
    // Aucune migration ne retire ces deux politiques sans les recréer.
    for (const nom of ["taches_du_fil_par_le_serveur", "exercices_du_fil_par_le_serveur"]) {
      const creations = sql.split(`create policy "${nom}"`).length - 1;
      const retraits = sql.split(`drop policy if exists "${nom}"`).length - 1;
      expect(creations, nom).toBeGreaterThanOrEqual(retraits);
      expect(creations, nom).toBeGreaterThan(0);
    }
  });

  it("aucune politique n'ouvre une table à tout compte connecté", () => {
    expect([...etat.politiquesOuvertes.entries()].map(([nom, table]) => `${table} : ${nom}`)).toEqual([]);
  });

  it("les droits par défaut ne donnent rien à anon ni à authenticated", () => {
    expect([...etat.defautRoles].filter((r) => r === "anon" || r === "authenticated")).toEqual([]);
    expect([...etat.defautToutRetire].sort()).toEqual(expect.arrayContaining(["anon", "authenticated"]));
  });

  it("le contrôle des droits en base existe et ne fait que lire", () => {
    const sql = lire("supabase/controles/droits.sql")
      .split("\n")
      .map((ligne) => ligne.replace(/--.*$/, ""))
      .join("\n")
      .replace(/'[^']*'/g, "''"); // les libellés entre apostrophes ne sont pas des ordres
    expect(sql).toMatch(/pg_policies/);
    expect(sql).not.toMatch(/\b(insert|update|delete|truncate|alter|drop|create|grant|revoke)\b/i);
  });

  it("les tables écrites par le serveur donnent l'écriture à service_role", () => {
    for (const table of ["acces_clients", "abonnements", "demandes_plans", "demandes_contact"]) {
      expect([...(etat.droits.get(table)?.get("service_role") ?? [])], table).toEqual(
        expect.arrayContaining(["select", "insert", "update"]),
      );
    }
  });
});
