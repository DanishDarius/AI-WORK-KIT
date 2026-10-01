import { describe, expect, it } from "vitest";
import { estClient, lire, lister, sources } from "../outils/fichiers";

// Règle S2 : aucun contenu payant dans un composant client ni dans public/.
// Un module importé par un composant client finit dans un fichier JavaScript
// servi sans authentification.

// Modules qui portent du contenu payant. Tout nouveau fichier de contenu
// (kits, cas, modèles) doit être ajouté ici.
const MODULES_PAYANTS = [/^@\/lib\/mise-en-place/, /^@\/lib\/guides$/, /^@\/lib\/kits?(\/|$)/, /^@\/content\//];

const IMPORT = /(?:import|export)\s+(type\s+)?[^;]*?from\s+["']([^"']+)["']/g;

function importsPayants(contenu: string) {
  const trouves: string[] = [];
  for (const m of contenu.matchAll(IMPORT)) {
    const typeSeulement = Boolean(m[1]);
    if (!typeSeulement && MODULES_PAYANTS.some((motif) => motif.test(m[2]))) trouves.push(m[2]);
  }
  return trouves;
}

describe("S2 · aucun contenu payant envoyé au navigateur", () => {
  const clients = sources().filter((f) => estClient(lire(f)));

  it("trouve des composants client à contrôler", () => {
    expect(clients.length).toBeGreaterThan(5);
  });

  it.each(clients)("%s n'importe aucun module de contenu payant", (fichier) => {
    expect(importsPayants(lire(fichier))).toEqual([]);
  });

  it("public/ ne contient ni guide, ni PDF, ni fichier de contenu", () => {
    const interdits = lister("public", (f) => /\.(pdf|md|mdx|json)$/i.test(f) && !/manifest|\.webmanifest$/i.test(f));
    expect(interdits).toEqual([]);
  });
});
