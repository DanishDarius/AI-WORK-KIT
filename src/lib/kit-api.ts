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
};
export type Tache = {
  id: string;
  code: string;
  titre: string;
  ia_par_defaut: IA | null;
  limite_connue: boolean;
  ia_alternative_conseillee: IA | null;
};
export type MetierDetail = {
  metier: Omit<Metier, "nb_taches">;
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
  tache: Omit<Tache, "id" | "ia_par_defaut">;
  ia_par_defaut: IA | null;
  exercices: Exercice[];
};
export async function api<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const { data, error } = await createClient().auth.getSession();
  if (error || !data.session)
    throw new Error(
      "Votre session a expiré ou vous n’êtes pas connecté. Utilisez votre lien de connexion reçu par email, puis réessayez.",
    );
  const response = await fetch(url, {
    ...options,
    credentials: "same-origin",
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (response.status === 401)
    throw new Error(
      "Votre session a expiré. Utilisez votre lien de connexion reçu par email.",
    );
  if (response.status === 403)
    throw new Error("Votre compte n’a pas accès à ce contenu.");
  if (response.status === 404) throw new Error("Ce contenu est introuvable.");
  if (!response.ok)
    throw new Error(
      "Impossible de charger ou d’enregistrer les données. Veuillez réessayer.",
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
    setData: (data: T) => setState({ url, data }),
  };
}
