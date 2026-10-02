import "server-only";

// Point d'entrée de la « mise en place », toutes IA confondues. Le contenu
// réel est réparti par IA dans mise-en-place-claude.ts, mise-en-place-gemini.ts
// et mise-en-place-chatgpt.ts : chaque fichier vient d'un guide complet des 42
// tâches, basé sur les sources officielles de l'IA concernée.
//
// Règle S2 : c'est du contenu payant. Ce module est réservé au serveur et ne
// doit jamais être importé par un composant client. Les écrans le reçoivent
// par /api/kit et /api/taches/[id], qui vérifient l'accès.
import type { IA } from "./kit-api";
import type { MiseEnPlace } from "./mise-en-place-types";
import { miseEnPlaceClaude } from "./mise-en-place-claude";
import { miseEnPlaceGemini } from "./mise-en-place-gemini";
import { miseEnPlaceChatgpt } from "./mise-en-place-chatgpt";

const miseEnPlace: Record<IA, Partial<Record<string, MiseEnPlace>>> = {
  claude: miseEnPlaceClaude,
  gemini: miseEnPlaceGemini,
  chatgpt: miseEnPlaceChatgpt,
};

/** Mise en place d'une tâche pour chacune des trois IA (null si absente). */
export function miseEnPlaceDeLaTache(code: string): Record<IA, MiseEnPlace | null> {
  return {
    chatgpt: miseEnPlace.chatgpt[code] ?? null,
    claude: miseEnPlace.claude[code] ?? null,
    gemini: miseEnPlace.gemini[code] ?? null,
  };
}

/** Mise en place de plusieurs tâches pour une IA, indexée par code de tâche. */
export function miseEnPlacePourCodes(ia: IA, codes: string[]): Record<string, MiseEnPlace> {
  const resultat: Record<string, MiseEnPlace> = {};
  for (const code of codes) {
    const mep = miseEnPlace[ia][code];
    if (mep) resultat[code] = mep;
  }
  return resultat;
}
