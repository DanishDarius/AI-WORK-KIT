import { describe, expect, it } from "vitest";
import { A_REMPLIR, champsManquants, NON_PRECISE, remplirGabarit } from "@/lib/gabarit";

// Modèle à remplir : la consigne copiée par le client doit porter ses
// réponses, et jamais une accolade oubliée.

const CHAMPS = [
  { cle: "article", requis: true },
  { cle: "prix", requis: true },
  { cle: "photos", requis: false },
];
const GABARIT = "Je vends {{article}} à {{prix}} FCFA. Photos : {{photos}}. Encore : {{article}}.";

describe("remplirGabarit", () => {
  it("remplace chaque champ par la réponse, partout où il apparaît", () => {
    expect(remplirGabarit(GABARIT, CHAMPS, { article: " une crème ", prix: "4 000", photos: "trois photos" })).toBe(
      "Je vends une crème à 4 000 FCFA. Photos : trois photos. Encore : une crème.",
    );
  });

  it("signale un champ obligatoire vide et note un champ facultatif vide", () => {
    const texte = remplirGabarit(GABARIT, CHAMPS, { article: "", prix: "   " });
    expect(texte).toBe(`Je vends ${A_REMPLIR} à ${A_REMPLIR} FCFA. Photos : ${NON_PRECISE}. Encore : ${A_REMPLIR}.`);
    expect(texte).not.toMatch(/\{\{|\}\}/);
  });

  it("ne laisse aucune accolade, même pour un champ inconnu du formulaire", () => {
    expect(remplirGabarit("Bonjour {{inconnu}}.", CHAMPS, {})).toBe(`Bonjour ${A_REMPLIR}.`);
  });

  it("garde tel quel ce que le client écrit, accolades comprises", () => {
    expect(remplirGabarit("Message : {{article}}", CHAMPS, { article: "{{prix}} $1 $&" })).toBe("Message : {{prix}} $1 $&");
  });
});

describe("champsManquants", () => {
  it("ne compte que les champs obligatoires vides", () => {
    expect(champsManquants(CHAMPS, { article: "sac", prix: " " }).map((c) => c.cle)).toEqual(["prix"]);
    expect(champsManquants(CHAMPS, { article: "sac", prix: "10 000" })).toEqual([]);
  });
});
