// Types partages par les guides de mise en place (Claude, Gemini, ChatGPT).
export type Outil = {
  nom: string;
  lien: string;
  type: "officiel" | "tiers";
};

export type ModeApprobation = "Automatique" | "Manuelle";

export type TachePlanifiee = {
  nom: string;
  frequence: string;
  prompt: string;
  modeApprobation?: ModeApprobation;
  raisonApprobation?: string;
  optionnelle?: boolean;
};

export type MiseEnPlace = {
  outils: Outil[];
  promptPonctuel?: string;
  tachePlanifiee?: TachePlanifiee;
  uneSeuleFois?: string;
};
