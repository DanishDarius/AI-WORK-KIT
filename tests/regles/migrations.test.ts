import { describe, expect, it } from "vitest";
import { lire, lister } from "../outils/fichiers";

// Règles S4 et B1 : chaque table a la RLS activée, des droits explicites pour
// service_role, et aucun droit pour anon. Le contenu payant n'est ouvert ni
// par une politique ni par un droit à « tout compte connecté ».
//
// Le test rejoue les migrations dans l'ordre et calcule l'état final des
// droits et des politiques. Il ne remplace pas la vérification en base.

// Tables dont chaque ligne appartient à un utilisateur (politique
// « auth.uid() = user_id »). Ce sont les seules que le rôle authenticated
// peut lire ou écrire directement.
const TABLES_PERSONNELLES = new Set([
  "utilisateurs_chemins",
  "taches_faites",
  "favoris",
  "derniere_activite",
  "activite_journaliere",
]);

type Etat = {
  tables: Set<string>;
  rls: Set<string>;
  droits: Map<string, Map<string, Set<string>>>; // table -> rôle -> privilèges
  politiquesOuvertes: Map<string, string>; // nom -> table
  defautRoles: Set<string>;
};

const nomTable = (brut: string) => brut.replace(/^public\./, "").replace(/"/g, "").toLowerCase();
const liste = (brut: string) => brut.split(",").map((v) => v.trim().toLowerCase()).filter(Boolean);

function rejouer(): Etat {
  const etat: Etat = { tables: new Set(), rls: new Set(), droits: new Map(), politiquesOuvertes: new Map(), defautRoles: new Set() };
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
        for (const role of liste(m[2])) etat.defautRoles.delete(role);
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
        }
      } else if ((m = s.match(/^drop policy (?:if exists )?"([^"]+)" on/i))) {
        etat.politiquesOuvertes.delete(m[1]);
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

  it.each(tables.filter((t) => !TABLES_PERSONNELLES.has(t)))(
    "%s (contenu ou table interne) ne donne aucun droit à authenticated",
    (table) => {
      expect([...(etat.droits.get(table)?.get("authenticated") ?? [])]).toEqual([]);
    },
  );

  it("aucune politique n'ouvre une table à tout compte connecté", () => {
    expect([...etat.politiquesOuvertes.entries()].map(([nom, table]) => `${table} : ${nom}`)).toEqual([]);
  });

  it("les droits par défaut ne donnent rien à anon ni à authenticated", () => {
    expect([...etat.defautRoles].filter((r) => r === "anon" || r === "authenticated")).toEqual([]);
  });

  it("les tables écrites par le serveur donnent l'écriture à service_role", () => {
    for (const table of ["acces_clients", "abonnements", "demandes_plans", "demandes_contact"]) {
      expect([...(etat.droits.get(table)?.get("service_role") ?? [])], table).toEqual(
        expect.arrayContaining(["select", "insert", "update"]),
      );
    }
  });
});
