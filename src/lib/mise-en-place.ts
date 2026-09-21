// Point d'entree du guide "Mettre en place", tous IA confondues. Le contenu reel
// est reparti par IA dans mise-en-place-claude.ts, mise-en-place-gemini.ts et
// mise-en-place-chatgpt.ts : chaque fichier vient d'un guide complet des 42 taches
// base sur les sources officielles de l'IA concernee.
import { IA } from "./kit-api";
import { MiseEnPlace } from "./mise-en-place-types";
import { miseEnPlaceClaude } from "./mise-en-place-claude";
import { miseEnPlaceGemini } from "./mise-en-place-gemini";
import { miseEnPlaceChatgpt } from "./mise-en-place-chatgpt";

export type { Outil, ModeApprobation, TachePlanifiee, MiseEnPlace } from "./mise-en-place-types";

export const miseEnPlace: Record<IA, Partial<Record<string, MiseEnPlace>>> = {
  claude: miseEnPlaceClaude,
  gemini: miseEnPlaceGemini,
  chatgpt: miseEnPlaceChatgpt,
};

// Libelle du fournisseur officiel affiche a cote des outils "officiel", par IA.
export const officielLabel: Record<IA, string> = {
  claude: "Officiel Claude",
  gemini: "Officiel Google",
  chatgpt: "Officiel OpenAI",
};

// Nom du mecanisme d'automatisation recurrente de chaque IA, pour le titre de la
// section "Automatiser avec ...".
export const automatisationLabel: Record<IA, string> = {
  claude: "Cowork",
  gemini: "les actions planifiees Gemini",
  chatgpt: "les taches planifiees ChatGPT",
};

export const outilsCount = (ia: IA, code: string) =>
  miseEnPlace[ia]?.[code]?.outils.length ?? 0;
