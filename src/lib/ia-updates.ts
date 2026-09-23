import type { IA } from "./kit-api";

// Structure éditoriale frontend, sans nouvelle route API ni actualité fictive.
export type UpdateMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; captions?: string };

export type IaUpdate = {
  id: string;
  ia: IA;
  // Ce qui est sorti, en une phrase (ex. "Claude Opus 5.5 est disponible.").
  title: string;
  publishedAt: string; // Date ISO, pour le tri du plus récent au plus ancien.
  // Le résumé en 2 ou 3 phrases.
  text?: string;
  // Ce que ça change concrètement pour l'utilisateur, en une phrase.
  impact?: string;
  // Ce qu'il doit faire (ou "Rien" si ses prompts fonctionnent déjà).
  action?: string;
  media?: UpdateMedia;
  featured?: boolean;
};

// Éditeur de chaque IA, affiché à côté de la date.
export const iaMakers: Record<IA, string> = {
  chatgpt: "OpenAI",
  claude: "Anthropic",
  gemini: "Google DeepMind",
};

// À alimenter à chaque nouvelle sortie de modèle. Les plus récentes marquées
// `featured: true` apparaissent en tête de page (1 principale + 2 secondaires).
export const iaUpdates: IaUpdate[] = [];

export function newestFirst(items: IaUpdate[]) {
  return [...items].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}
