"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { MiseEnPlace } from "@/lib/mise-en-place-types";
export type IA = "chatgpt" | "claude" | "gemini";
export const iaLabels: Record<IA, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
};
export const chemins: IA[] = ["chatgpt", "claude", "gemini"];
// Libellé du fournisseur officiel affiché à côté des outils « officiel », par IA.
export const officielLabel: Record<IA, string> = {
  claude: "Officiel Claude",
  gemini: "Officiel Google",
  chatgpt: "Officiel OpenAI",
};
// Nom du mécanisme d'automatisation récurrente de chaque IA.
export const automatisationLabel: Record<IA, string> = {
  claude: "Cowork",
  gemini: "les actions planifiées Gemini",
  chatgpt: "les tâches planifiées ChatGPT",
};
export type Metier = {
  id: string;
  slug: string;
  nom: string;
  description: string | null;
  nb_taches: number;
  taches_faites: number;
};
export type Tache = {
  id: string;
  code: string;
  titre: string;
  ia_par_defaut: IA | null;
  limite_connue: boolean;
  ia_alternative_conseillee: IA | null;
  fait: boolean;
  favori: boolean;
};
export type MetierDetail = {
  metier: Omit<Metier, "nb_taches" | "taches_faites">;
  taches_faites: number;
  chemin_choisi: IA | null;
  taches: Tache[];
};
export type Exercice = {
  titre: string;
  contexte: string | null;
  donnees: string | null;
  travail_a_faire: string | null;
  prompts: Record<IA, string | null>;
};
export type TacheDetail = {
  tache: Omit<Tache, "id" | "ia_par_defaut" | "fait" | "favori">;
  fait: boolean;
  favori: boolean;
  ia_par_defaut: IA | null;
  // Nom du métier d'où l'on vient et tâche suivante de son parcours.
  metier_nom: string | null;
  suivante_id: string | null;
  exercices: Exercice[];
  // Outils, prompt et routine de la tâche, pour chaque IA (contenu payant,
  // fourni par la route protégée, jamais importé côté client).
  mise_en_place: Record<IA, MiseEnPlace | null>;
};
export type Favori = {
  tache_id: string;
  tache_code: string;
  tache_titre: string;
  metier_slug: string;
  metier_nom: string;
};
export type Progression = {
  taches_faites_total: number;
  taches_total: number;
  metiers_termines: number;
  metiers_total: number;
  reprise: Favori | null;
  serie_jours: number;
  jours_actifs_semaine: boolean[];
};
export function tacheHref(id: string, metier: string) {
  return `/taches/${encodeURIComponent(id)}?metier=${encodeURIComponent(metier)}`;
}
// Réponses des lectures (GET), partagées entre les composants d'une page.
//
// Règle C2 : plusieurs composants demandent la même ressource (la carte de
// progression et la carte « Reprendre », par exemple). Sans partage, chaque
// composant relançait sa propre requête. Ici, une ressource est demandée une
// fois, puis resservie pendant quelques secondes.
//
// Toute écriture (POST, PUT, DELETE) vide ce partage : après une tâche
// marquée faite ou un favori, les lectures suivantes repartent du serveur.
const DUREE_PARTAGE_MS = 10_000;
const partage = new Map<string, { promesse: Promise<unknown>; expire: number }>();

function lirePartage<T>(url: string): Promise<T> {
  const connue = partage.get(url);
  if (connue && connue.expire > Date.now()) return connue.promesse as Promise<T>;
  const promesse = api<T>(url);
  partage.set(url, { promesse, expire: Date.now() + DUREE_PARTAGE_MS });
  // Un échec n'est jamais gardé : le prochain composant réessaie.
  promesse.catch(() => {
    if (partage.get(url)?.promesse === promesse) partage.delete(url);
  });
  return promesse;
}

export async function api<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("La connexion est momentanément indisponible. Veuillez réessayer plus tard.");
  }
  const { data, error } = await createClient().auth.getSession();
  if (error || !data.session)
    throw new Error(
      "Vous n’êtes pas connecté. Connectez-vous pour continuer.",
    );
  const ecriture = Boolean(options.method && options.method.toUpperCase() !== "GET");
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      credentials: "same-origin",
      cache: "no-store",
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } finally {
    if (ecriture) partage.clear();
  }
  if (response.status === 401)
    throw new Error(
      "Votre session a expiré. Reconnectez-vous pour continuer.",
    );
  if (response.status === 403)
    throw new Error("Votre abonnement ne donne pas accès à ce contenu.");
  if (response.status === 404) throw new Error("Ce contenu n’existe plus ou a été déplacé.");
  if (!response.ok)
    throw new Error(
      "Échec du chargement ou de l’enregistrement. Réessayez dans un instant.",
    );
  return response.json() as Promise<T>;
}
export function useResource<T>(url: string) {
  const [state, setState] = useState<{ url: string; data?: T; error?: string }>(
    { url },
  );
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let actif = true;
    lirePartage<T>(url).then(
      (data) => {
        if (actif) setState({ url, data });
      },
      (error) => {
        if (actif)
          setState({
            url,
            error:
              error instanceof Error
                ? error.message
                : "Une erreur est survenue.",
          });
      },
    );
    return () => {
      actif = false;
    };
  }, [url, attempt]);
  return {
    data: state.url === url ? state.data : undefined,
    error: state.url === url ? state.error : undefined,
    retry: () => {
      partage.delete(url);
      setState({ url });
      setAttempt((n) => n + 1);
    },
    setData: (update: T | ((previous: T) => T)) =>
      setState((previous) => {
        if (typeof update === "function") {
          if (previous.url !== url || previous.data === undefined)
            return previous;
          return { url, data: (update as (previous: T) => T)(previous.data) };
        }
        return { url, data: update };
      }),
  };
}
