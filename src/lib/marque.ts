// La marque AIW en mots : un seul endroit pour le nom et le slogan.
// Le slogan s'écrit partout sous cette forme exacte (décision du 3 octobre
// 2026) : onglet du navigateur, aperçu d'un lien partagé, application
// installée, page d'accès.
export const NOM = "AI WORK KIT";
export const SIGLE = "AIW";
// En deux parties pour le grand titre de la page d'accès, qui met la seconde en vert.
export const SLOGAN_PARTIES = ["L’IA dans votre travail", "et au cœur de vos tâches du quotidien"] as const;
export const SLOGAN = SLOGAN_PARTIES.join(" ");
export const SITE = "https://ai-work-kit.parlonsads.com";
// L'éditeur d'AIW. Son nom ne s'écrit que sur les pages légales (mentions légales,
// conditions, confidentialité), qui le lisent ici : en changer ne touche qu'à cette ligne
// (décision du 9 octobre 2026).
export const EDITEUR = "Parlons ADS";
