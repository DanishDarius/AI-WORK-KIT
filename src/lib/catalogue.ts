"use client";
import { type Metier, type MetierDetail, type Tache, useResource } from "./kit-api";

// Catégorie d'usage de chaque tâche, pour grouper le parcours et filtrer la
// liste des tâches. Aucun champ API supplémentaire.
const categories: Record<string, string> = {
  F01: "Organisation",
  F03: "Rédaction",
  F04: "Rédaction",
  F05: "Organisation",
  F07: "Analyse",
  F08: "Analyse",
  F11: "Analyse",
  F12: "Organisation",
  F13: "Analyse",
  F14: "Rédaction",
  F15: "Création",
  F16: "Organisation",
  F02: "Création",
  F06: "Relation client",
  F25: "Relation client",
  F26: "Relation client",
  F27: "Relation client",
  F28: "Analyse",
  F10: "Relation client",
  F17: "Relation client",
  F18: "Relation client",
  F19: "Analyse",
  F20: "Analyse",
  F21: "Organisation",
  F22: "Organisation",
  F23: "Analyse",
  F24: "Organisation",
  F31: "Analyse",
  F32: "Analyse",
  F33: "Analyse",
  F29: "Analyse",
  F30: "Organisation",
};
export const usages = [
  "Tout",
  "Organisation",
  "Rédaction",
  "Analyse",
  "Création",
  "Relation client",
];
export const category = (code: string) => categories[code] || "Création";
export type CatalogueTache = Tache & {
  metiers: { slug: string; nom: string }[];
};
export type Catalogue = {
  metiers: (Metier & { chemin_choisi: MetierDetail["chemin_choisi"] })[];
  taches: CatalogueTache[];
};

// Une seule requête : le serveur assemble métiers et tâches.
export function useCatalogue() {
  const { data, error, retry } = useResource<Catalogue>("/api/catalogue");
  return { data, error, retry };
}
