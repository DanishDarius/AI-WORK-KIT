"use client";
import { useEffect, useState } from "react";
import { api, Metier, MetierDetail, Tache } from "./kit-api";

// Taxonomie visuelle conservée de la version 1. Aucun champ API supplémentaire.
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
// Libellés des 12 métiers, pour l'affichage (ex. fil d'Ariane) quand seul le
// slug est disponible côté client, sans requête supplémentaire à l'API.
export const metierLabels: Record<string, string> = {
  "vente-commercial": "Vente / Commercial",
  "btp-gestion-de-chantier": "BTP / Gestion de chantier",
  comptabilite: "Comptabilité",
  "secretariat-administration": "Secrétariat / Administration",
  "logistique-supply-chain": "Logistique / Supply Chain",
  "service-clientele": "Service clientèle",
  marketing: "Marketing",
  communication: "Communication",
  "ressources-humaines": "Ressources humaines",
  journalisme: "Journalisme",
  graphisme: "Graphisme",
  "montage-video": "Montage vidéo",
};
export const metierLabel = (slug: string) => metierLabels[slug] || "Mon espace métier";
export const category = (code: string) => categories[code] || "Création";
export const categoryIcon = (code: string) =>
  ({
    Organisation: "tasks",
    Rédaction: "writing",
    Analyse: "analysis",
    Création: "creative",
    "Relation client": "messages",
  })[category(code)] || "tasks";

// Classification (Générative / Agent) et nature (rythme d'exécution) de chaque
// tâche, issues du recensement des 42 tâches. Deuxième axe de tri, indépendant
// des catégories ci-dessus : voir la proposition de refonte du chemin Tâches.
export type Classification = "Generatif" | "Agent";
const classifications: Record<string, Classification> = {
  F01: "Agent",
  F02: "Agent",
  F03: "Generatif",
  F04: "Generatif",
  F05: "Agent",
  F06: "Agent",
  F07: "Agent",
  F08: "Generatif",
  F09: "Generatif",
  F10: "Agent",
  F11: "Generatif",
  F12: "Agent",
  F13: "Generatif",
  F14: "Generatif",
  F15: "Generatif",
  F16: "Agent",
  F17: "Agent",
  F18: "Generatif",
  F19: "Agent",
  F20: "Agent",
  F21: "Agent",
  F22: "Agent",
  F23: "Agent",
  F24: "Agent",
  F25: "Agent",
  F26: "Generatif",
  F27: "Generatif",
  F28: "Agent",
  F29: "Generatif",
  F30: "Generatif",
  F31: "Generatif",
  F32: "Agent",
  F33: "Generatif",
  F34: "Generatif",
  F35: "Generatif",
  F36: "Agent",
  F37: "Agent",
  F38: "Generatif",
  F39: "Generatif",
  F40: "Agent",
  F41: "Generatif",
  F42: "Generatif",
};
export const classification = (code: string): Classification =>
  classifications[code] || "Generatif";
export const classificationLabel: Record<Classification, string> = {
  Generatif: "Génératif",
  Agent: "Agent",
};

export type Nature = "Ponctuelle" | "Periodique" | "Projet";
const naturesByCode: Record<string, Nature> = {
  F01: "Periodique",
  F02: "Periodique",
  F03: "Ponctuelle",
  F04: "Ponctuelle",
  F05: "Periodique",
  F06: "Periodique",
  F07: "Periodique",
  F08: "Ponctuelle",
  F09: "Ponctuelle",
  F10: "Periodique",
  F11: "Ponctuelle",
  F12: "Periodique",
  F13: "Ponctuelle",
  F14: "Ponctuelle",
  F15: "Ponctuelle",
  F16: "Projet",
  F17: "Periodique",
  F18: "Ponctuelle",
  F19: "Periodique",
  F20: "Periodique",
  F21: "Periodique",
  F22: "Periodique",
  F23: "Periodique",
  F24: "Ponctuelle",
  F25: "Periodique",
  F26: "Periodique",
  F27: "Periodique",
  F28: "Periodique",
  F29: "Projet",
  F30: "Ponctuelle",
  F31: "Ponctuelle",
  F32: "Projet",
  F33: "Projet",
  F34: "Ponctuelle",
  F35: "Ponctuelle",
  F36: "Projet",
  F37: "Projet",
  F38: "Ponctuelle",
  F39: "Ponctuelle",
  F40: "Projet",
  F41: "Ponctuelle",
  F42: "Ponctuelle",
};
// Tâches Génératif ponctuelles qui peuvent aussi être programmées, selon
// l'usage (compte-rendu hebdomadaire, sous-titrage à chaque épisode, etc.).
const optionPeriodiqueCodes = new Set([
  "F03",
  "F04",
  "F09",
  "F14",
  "F15",
  "F18",
  "F30",
]);
export const nature = (code: string): Nature => naturesByCode[code] || "Ponctuelle";
export const hasOptionPeriodique = (code: string) => optionPeriodiqueCodes.has(code);
export const natures: Nature[] = ["Ponctuelle", "Periodique", "Projet"];
export const natureLabels: Record<Nature, string> = {
  Ponctuelle: "Ponctuelle",
  Periodique: "Périodique / récurrente",
  Projet: "Projet",
};
export const natureIcon: Record<Nature, string> = {
  Ponctuelle: "clock",
  Periodique: "cycle",
  Projet: "flag",
};
// Une tâche "Ponctuelle (+ option périodique)" reste filtrable sous Ponctuelle
// (son usage par défaut) et apparaît aussi sous Périodique / récurrente.
export const matchesNature = (code: string, filter: Nature | "Toutes") =>
  filter === "Toutes" ||
  nature(code) === filter ||
  (filter === "Periodique" && hasOptionPeriodique(code));
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export type CatalogueTache = Tache & {
  metiers: { slug: string; nom: string }[];
};
export type Catalogue = {
  metiers: (Metier & { chemin_choisi: MetierDetail["chemin_choisi"] })[];
  taches: CatalogueTache[];
};

export function useCatalogue() {
  const [data, setData] = useState<Catalogue>();
  const [error, setError] = useState<string>();
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      const metiers = await api<Metier[]>("/api/metiers", {
        signal: controller.signal,
      });
      // Le contrat ne propose pas GET /api/taches : le catalogue est dérivé
      // des fiches métier, avec quatre requêtes simultanées au maximum.
      const details: MetierDetail[] = [];
      let cursor = 0;
      await Promise.all(
        Array.from({ length: Math.min(4, metiers.length) }, async () => {
          while (cursor < metiers.length) {
            const index = cursor++;
            details[index] = await api<MetierDetail>(
              `/api/metiers/${encodeURIComponent(metiers[index].slug)}`,
              { signal: controller.signal },
            );
          }
        }),
      );
      const tasks = new Map<string, CatalogueTache>();
      details.forEach((detail) =>
        detail.taches.forEach((t) => {
          const metier = { slug: detail.metier.slug, nom: detail.metier.nom };
          const previous = tasks.get(t.id);
          if (previous) previous.metiers.push(metier);
          else tasks.set(t.id, { ...t, metiers: [metier] });
        }),
      );
      if (!controller.signal.aborted)
        setData({
          metiers: metiers.map((m, i) => ({
            ...m,
            chemin_choisi: details[i].chemin_choisi,
          })),
          taches: [...tasks.values()],
        });
    }
    load().catch((e) => {
      if (!controller.signal.aborted)
        setError(
          e instanceof Error ? e.message : "Le catalogue n’est pas disponible.",
        );
    });
    return () => controller.abort();
  }, [attempt]);
  return {
    data,
    error,
    retry: () => {
      setData(undefined);
      setError(undefined);
      setAttempt((n) => n + 1);
    },
  };
}
