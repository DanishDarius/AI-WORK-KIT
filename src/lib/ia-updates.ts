import type { IA } from "./kit-api";

// Structure éditoriale frontend, sans nouvelle route API ni actualité fictive.
export type UpdateMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; captions?: string };

export type IaUpdate = {
  id: string;
  ia: IA;
  title: string;
  publishedAt: string; // Date ISO, pour le tri du plus récent au plus ancien.
  text?: string;
  media?: UpdateMedia;
  featured?: boolean;
};

// À alimenter lorsque les contenus éditoriaux seront disponibles.
export const iaUpdates: IaUpdate[] = [];

export function newestFirst(items: IaUpdate[]) {
  return [...items].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}
