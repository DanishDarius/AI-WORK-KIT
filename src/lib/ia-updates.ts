import type { MediaContenu } from "./contenu";
import type { IA } from "./kit-api";

// Aides d'affichage des actualités des IA. Les actualités elles-mêmes sont en
// base (table mises_a_jour_ia, migration 0040) : une publication ne demande
// plus de nouvel envoi du site. Elles se lisent par src/lib/contenu.ts
// (lireFil), et src/lib/fil.ts décide de ce qui est montré à chaque client.
//
// Règles de rédaction d'une actualité : faits lus sur la page officielle et
// sourcés, « vous », pas de jargon, toujours dire ce que ça change et ce
// qu'il faut faire. Bloc visuel facultatif : une image OU une vidéo.
// - image : visuel officiel de l'éditeur (lien direct, crédit affiché) ou
//   illustration maison placée dans /public/actus/.
// - youtube : vidéo officielle, chargée seulement au clic (youtube-nocookie).
// - video : fichier vidéo hébergé (mp4), avec affiche.
export type UpdateMedia = MediaContenu;

// Copies locales (kit-api est un module "use client", inutilisable ici côté serveur).
export const iaNoms: Record<IA, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
};

// Éditeur de chaque IA, affiché à côté de la date.
export const iaMakers: Record<IA, string> = {
  chatgpt: "OpenAI",
  claude: "Anthropic",
  gemini: "Google DeepMind",
};

// Vignette statique d'un média (pour les listes).
export function mediaThumb(media: UpdateMedia) {
  if (media.type === "image") return { src: media.src, alt: media.alt };
  if (media.type === "youtube")
    return { src: `https://i.ytimg.com/vi/${media.id}/maxresdefault.jpg`, alt: media.title };
  return { src: media.poster, alt: media.title };
}
