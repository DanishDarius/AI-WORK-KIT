import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chemin, lire, lister } from "../outils/fichiers";

// Règle C3 : les pages publiques sont statiques.
// Règle Q5 : chaque groupe de pages a sa page d'erreur et son état de chargement.

const PAGES_PUBLIQUES = lister("src/app/(public)", (f) => f.endsWith("/page.tsx"));

// Tout ce qui rend une page dynamique : lecture des cookies ou des en-têtes,
// connection(), ou un module qui lit la session.
const DYNAMIQUE = /(from\s+["']next\/headers["']|\bconnection\s*\(|@\/lib\/acces["']|@\/lib\/abonnement["']|@\/lib\/supabase\/server["']|force-dynamic)/;

describe("C3 · pages publiques statiques", () => {
  it("trouve les pages publiques", () => {
    expect(PAGES_PUBLIQUES.length).toBeGreaterThanOrEqual(4);
  });

  it.each(PAGES_PUBLIQUES)("%s ne lit ni session ni cookies", (fichier) => {
    expect(lire(fichier)).not.toMatch(DYNAMIQUE);
  });
});

describe("Q5 · pages d'erreur et états de chargement", () => {
  it.each([
    "src/app/error.tsx",
    "src/app/global-error.tsx",
    "src/app/not-found.tsx",
    "src/app/(app)/loading.tsx",
  ])("%s existe", (fichier) => {
    expect(existsSync(chemin(fichier))).toBe(true);
  });
});
