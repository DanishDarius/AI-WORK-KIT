import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { chemin, lire, lister } from "../outils/fichiers";

// Règle C3 : les pages publiques sont statiques.
// Règle Q5 : chaque groupe de pages a sa page d'erreur et son état de chargement.
// Règle Q8 : sur téléphone, les barres restent à l'écran et ne bougent pas.

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
    "src/app/(app)/(shell)/loading.tsx",
  ])("%s existe", (fichier) => {
    expect(existsSync(chemin(fichier))).toBe(true);
  });

  it.each(["src/app/error.tsx", "src/app/global-error.tsx"])("%s est un composant client qui propose de réessayer", (fichier) => {
    const contenu = lire(fichier);
    expect(contenu).toMatch(/^"use client";/);
    expect(contenu).toMatch(/\bretry\(\)/);
    // Règle S8 : le message technique de l'erreur n'est jamais affiché.
    expect(contenu).not.toMatch(/\{\s*error\.message\s*\}/);
  });

  it("la page d'erreur globale porte ses propres balises html et body", () => {
    const contenu = lire("src/app/global-error.tsx");
    expect(contenu).toMatch(/<html lang="fr">/);
    expect(contenu).toMatch(/<body>/);
  });
});

describe("Q8 · sur téléphone, les barres restent à l'écran", () => {
  const styles = lire("src/app/globals.css");
  const ecrans = lister("src", (f) => f.endsWith(".tsx"));

  it("aucun écran n'accroche une barre au bas de sa page, ni ne fixe sa hauteur en vh", () => {
    for (const fichier of ecrans) {
      const source = lire(fichier);
      // « sticky » en bas d'une page suit la page, pas l'écran : la barre flotte quand le navigateur replie les siennes.
      expect(source, fichier).not.toMatch(/position:\s*["']sticky["']/);
      expect(source, fichier).not.toMatch(/100vh/);
    }
  });

  it("une hauteur d'écran s'écrit en dvh : la hauteur vraiment visible, barres du navigateur comprises", () => {
    // Pas de repli en vh : la construction le retire (navigateurs visés : Chrome 111, Safari 16.4), il ne servirait à rien.
    expect(styles).not.toMatch(/100vh/);
    expect(styles.match(/100dvh/g)?.length).toBeGreaterThanOrEqual(6);
  });

  it("le questionnaire de démarrage est un cadre à la hauteur de l'écran, dont seules les réponses défilent", () => {
    const ecran = lire("src/app/(app)/bienvenue/ecran.tsx");
    expect(ecran).toMatch(/<div className="etapes">/);
    expect(ecran).toMatch(/<header className="etapes-haut">/);
    expect(ecran).toMatch(/<main id="contenu" ref=\{corps\} className="etapes-corps stack-lg">/);
    expect(ecran).toMatch(/<footer className="etapes-bas">/);
    // Chaque question s'ouvre en haut de la zone qui défile.
    expect(ecran).toMatch(/corps\.current\?\.scrollTo\(0, 0\)/);
    expect(styles).toMatch(/\.etapes \{ height: 100dvh; display: flex; flex-direction: column; overflow: hidden;/);
    expect(styles).toMatch(/\.etapes-corps \{[^}]*min-height: 0; overflow-y: auto;/);
    expect(styles).toMatch(/\.etapes-haut \{ flex: none;/);
    expect(styles).toMatch(/\.etapes-bas \{ flex: none;[^}]*env\(safe-area-inset-bottom\)/);
  });

  it("le menu du bas est fixé à l'écran, au-dessus de la zone réservée du téléphone", () => {
    expect(styles).toMatch(/\.tabbar \{ display: flex; position: fixed; left: 0; right: 0; bottom: 0;[^}]*env\(safe-area-inset-bottom\)/);
  });

  it("sur téléphone, le bloc « Votre parcours » reste à sa place et ne glisse pas sous l'en-tête", () => {
    expect(styles).toMatch(/@media \(max-width: 860px\) \{ \.path-head \{ position: static; \} \}/);
  });

  it("le rayon des guides garde de petites couvertures : deux par ligne sur téléphone, jamais une seule", () => {
    expect(lire("src/components/guides.tsx")).toMatch(/<div className="books">/);
    expect(styles).toMatch(/\.books \{ display: grid; grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
    expect(styles).toMatch(/@media \(max-width: 720px\) \{ \.books \{ grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
    expect(styles).toMatch(/@media \(max-width: 560px\) \{\s*\.books \{ grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
    // Le titre de la couverture suit la largeur de la couverture, pour tenir dans une petite.
    expect(styles).toMatch(/\.books \.book \{ container-type: inline-size; \}/);
    expect(styles).toMatch(/\.books \.cover strong \{ font-size: clamp\(15px, 11cqi, 20px\); \}/);
  });
});
