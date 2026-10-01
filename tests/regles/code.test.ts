import { describe, expect, it } from "vitest";
import { occurrences, sources } from "../outils/fichiers";

// Règles contrôlées par lecture du code source :
// S7 (entrées), S8 (messages d'erreur), S12 (rendu), C7 (e-mail), Q3 (typage).

function chercher(motif: RegExp) {
  return sources().flatMap((fichier) => occurrences(fichier, motif));
}

describe("S7 · aucune entrée brute dans un filtre", () => {
  it("aucun filtre .or() construit avec une valeur interpolée", () => {
    expect(chercher(/\.or\(\s*`[^`]*\$\{/)).toEqual([]);
  });
});

describe("S8 · aucun détail technique renvoyé au client", () => {
  it("aucune réponse ne renvoie le message d'une erreur", () => {
    expect(chercher(/error:\s*[\w.?]+\.message\b/)).toEqual([]);
  });
});

describe("S12 · rendu sûr", () => {
  it("aucun dangerouslySetInnerHTML", () => {
    expect(chercher(/dangerouslySetInnerHTML/)).toEqual([]);
  });

  it("aucun lien target=_blank sans rel", () => {
    expect(chercher(/target="_blank"(?![^>]*\brel=)/)).toEqual([]);
  });
});

describe("C7 · e-mail comparé en minuscules avec une égalité", () => {
  it("aucun .ilike sur une colonne email", () => {
    expect(chercher(/\.ilike\(\s*["']email["']/)).toEqual([]);
  });
});

describe("Q3 · TypeScript strict", () => {
  it("aucun any explicite", () => {
    expect(chercher(/(:\s*any\b|\bas\s+any\b|<any>)/)).toEqual([]);
  });

  it("aucune directive @ts-ignore ou @ts-expect-error", () => {
    expect(chercher(/@ts-(ignore|expect-error|nocheck)/)).toEqual([]);
  });
});
