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
export const category = (code: string) => categories[code] || "Création";
export const categoryIcon = (code: string) =>
  ({
    Organisation: "tasks",
    Rédaction: "writing",
    Analyse: "analysis",
    Création: "creative",
    "Relation client": "messages",
  })[category(code)] || "tasks";
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
