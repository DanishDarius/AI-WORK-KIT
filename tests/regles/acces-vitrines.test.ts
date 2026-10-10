import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chemin, lire, lister } from "../outils/fichiers";

// Page d'accès : l'attestation en vitrine et le kit installé dans les trois IA
// (décision du 10 octobre 2026).
// - Q7 : l'attestation montrée est un exemple, marqué comme tel ; ni tiret
//   long ni chiffre inventé dans les légendes.
// - Accessibilité : un contenu qui défile seul se met en pause (survol,
//   toucher, clavier, hors de l'écran, animations réduites, bouton).
// - C3 : la page d'accès reste statique ; les deux blocs sont des composants
//   du navigateur, sans lecture de session.

const vitrine = lire("src/components/attestation-vitrine.tsx");
const kit = lire("src/components/kit-dans-ia.tsx");
const acces = lire("src/app/(public)/acces/page.tsx");

describe("page d'accès · attestation en vitrine", () => {
  it("est marquée « Exemple » et dit ce qu'elle n'est pas", () => {
    expect(vitrine).toMatch(/>Exemple</);
    expect(acces).toContain("<AttestationVitrine />");
    expect(acces).toContain("Ce n’est ni un diplôme ni une certification officielle.");
  });

  it("n'anime rien pour qui a réduit les animations, et s'affiche sans JavaScript", () => {
    expect(vitrine).toContain("prefers-reduced-motion: reduce");
    // Les cartes ne sont cachées qu'une fois le composant chargé.
    expect(vitrine).toMatch(/classList\.add\("est-en-attente"\)/);
  });
});

describe("page d'accès · le kit dans les trois IA", () => {
  const images = [...kit.matchAll(/image: "([\w-]+\.webp)"/g)].map((m) => m[1]);

  it("a ses trois IA et quatre étapes chacune", () => {
    expect(acces).toContain("<KitDansIA />");
    for (const ia of ["chatgpt", "claude", "gemini"]) expect(images.filter((i) => i.startsWith(`${ia}-`))).toHaveLength(4);
  });

  it("chaque capture existe dans public/accueil/ia, et aucune autre n'y traîne", () => {
    for (const image of images) expect(existsSync(chemin("public/accueil/ia", image)), image).toBe(true);
    expect(lister("public/accueil/ia", () => true).map((f) => f.split("/").pop()).sort()).toEqual([...images].sort());
  });

  it("se met en pause : survol, toucher, clavier, hors de l'écran, onglet caché, animations réduites, bouton", () => {
    expect(kit).toMatch(/const enPause = arret \|\| survol \|\| !visible \|\| reduit;/);
    for (const motif of [/onMouseEnter/, /onTouchStart/, /onFocus/, /IntersectionObserver/, /document\.hidden/, /prefers-reduced-motion: reduce/, /Mettre le défilement en pause/]) {
      expect(kit).toMatch(motif);
    }
  });

  it("les légendes suivent la règle Q7", () => {
    const legendes = [...kit.matchAll(/legende: "([^"]+)"/g)].map((m) => m[1]);
    expect(legendes).toHaveLength(12);
    for (const l of legendes) {
      expect(l).not.toMatch(/—/);
      expect(l).not.toMatch(/\btu\b|\bton\b|\btes\b/i);
    }
  });
});
