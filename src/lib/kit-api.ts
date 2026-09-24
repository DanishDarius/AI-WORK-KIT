"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
export type IA = "chatgpt" | "claude" | "gemini";
export const iaLabels: Record<IA, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
};
export const chemins: IA[] = ["chatgpt", "claude", "gemini"];
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
  exercices: Exercice[];
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
export type Recherche = {
  taches: {
    id: string;
    code: string;
    titre: string;
    metier_slug: string;
    metier_nom: string;
  }[];
  glossaire: { terme: string; definition: string }[];
};
export function tacheHref(id: string, metier: string) {
  return `/taches/${encodeURIComponent(id)}?metier=${encodeURIComponent(metier)}`;
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
  const response = await fetch(url, {
    ...options,
    credentials: "same-origin",
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
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
    const controller = new AbortController();
    api<T>(url, { signal: controller.signal }).then(
      (data) => {
        if (!controller.signal.aborted) setState({ url, data });
      },
      (error) => {
        if (!controller.signal.aborted)
          setState({
            url,
            error:
              error instanceof Error
                ? error.message
                : "Une erreur est survenue.",
          });
      },
    );
    return () => controller.abort();
  }, [url, attempt]);
  return {
    data: state.url === url ? state.data : undefined,
    error: state.url === url ? state.error : undefined,
    retry: () => {
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
