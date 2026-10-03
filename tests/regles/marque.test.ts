import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { chemin, lire, lister } from "../outils/fichiers";

// La marque (décisions du 3 octobre 2026) : le logo est un cube qui porte
// l'étincelle de l'IA, et le slogan s'écrit partout sous une seule forme.

const SLOGAN = "L’IA dans votre travail et au cœur de vos tâches du quotidien";

/** Largeur et hauteur d'un PNG, lues dans son en-tête. */
function taille(fichier: string) {
  const octets = readFileSync(chemin(fichier));
  expect(octets.subarray(1, 4).toString("latin1")).toBe("PNG");
  return [octets.readUInt32BE(16), octets.readUInt32BE(20)];
}

describe("marque · slogan", () => {
  it("vaut exactement la formulation retenue", async () => {
    const { SLOGAN: valeur, SLOGAN_PARTIES } = await import("@/lib/marque");
    expect(valeur).toBe(SLOGAN);
    expect(SLOGAN_PARTIES.join(" ")).toBe(SLOGAN);
  });

  it("s'écrit à un seul endroit du code", () => {
    const fichiers = lister("src", (f) => /\.(ts|tsx)$/.test(f)).filter((f) => lire(f).includes("au cœur de vos tâches"));
    expect(fichiers).toEqual(["src/lib/marque.ts"]);
  });

  it.each(["src/app/layout.tsx", "src/app/manifest.ts", "src/app/(public)/acces/page.tsx"])("%s reprend le slogan", (fichier) => {
    expect(lire(fichier)).toMatch(/\bSLOGAN\b/);
  });

  it.each(lister("src", (f) => /\.(ts|tsx)$/.test(f)))("%s ne porte plus les anciennes accroches", (fichier) => {
    const source = lire(fichier);
    expect(source).not.toContain("prête à l’emploi");
    expect(source).not.toContain("l’IA au travail\"");
    expect(source).not.toContain("appliquée à votre travail, concrètement");
  });
});

describe("marque · logo", () => {
  const dessins = [...lister("public/brand/atelier", (f) => f.endsWith(".svg")), "src/app/icon.svg"];

  it("le jeu de dessins est complet", () => {
    expect(dessins).toHaveLength(10);
  });

  it.each(dessins)("%s est le cube à l'étincelle", (fichier) => {
    const svg = lire(fichier);
    expect(svg).toContain("<title>AI WORK KIT</title>");
    // L'étincelle : quatre courbes qui se rejoignent au centre.
    expect(svg).toMatch(/d="M64,35 Q[\d.]+,[\d.]+ 94,65 /);
    // L'ancien dessin à trois branches avait des points ronds.
    expect(svg).not.toContain("<circle");
    expect(svg).not.toMatch(/[—–]/);
  });

  it.each([
    ["public/brand/atelier/icon-16.png", 16, 16],
    ["public/brand/atelier/icon-32.png", 32, 32],
    ["public/brand/atelier/icon-192.png", 192, 192],
    ["public/brand/atelier/icon-512.png", 512, 512],
    ["public/brand/atelier/icon-maskable.png", 512, 512],
    ["public/brand/atelier/icon-monochrome.png", 512, 512],
    ["public/brand/atelier/logo-reverse.png", 1480, 512],
    ["src/app/apple-icon.png", 180, 180],
    ["src/app/opengraph-image.png", 1200, 630],
  ])("%s mesure %i × %i", (fichier, largeur, hauteur) => {
    expect(taille(fichier)).toEqual([largeur, hauteur]);
  });

  it("l'image d'un lien partagé est décrite par le slogan", () => {
    expect(lire("src/app/opengraph-image.alt.txt")).toContain(SLOGAN.replace("L’IA", "l’IA"));
    expect(lire("src/app/layout.tsx")).toMatch(/metadataBase/);
    expect(lire("src/app/layout.tsx")).toMatch(/openGraph/);
  });
});
