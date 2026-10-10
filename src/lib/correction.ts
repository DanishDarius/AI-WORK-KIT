import "server-only";

import { NextResponse } from "next/server";
import { normaliserEmail } from "@/lib/normaliser";
import type { requireActiveUser } from "@/lib/supabase/active-access";

// La correction des rendus d'attestation (étape C, validée le 10 octobre
// 2026 ; document « AIW : attestations par métier, grille et exercices
// finaux »). Pour l'instant, l'utilisateur corrige seul.
//
// Le correcteur est reconnu par son adresse : variable CORRECTEUR_EMAILS
// (une ou plusieurs adresses, séparées par des virgules). Sans elle,
// personne n'est correcteur (règle S10). Le correcteur passe d'abord par
// l'accès payé, comme tout compte (règle S1).

export function correcteurs(env: Record<string, string | undefined> = process.env): Set<string> {
  return new Set(
    (env.CORRECTEUR_EMAILS ?? "")
      .split(",")
      .map((e) => normaliserEmail(e))
      .filter((e) => e.includes("@")),
  );
}

export function estCorrecteur(email: string | null | undefined, env: Record<string, string | undefined> = process.env) {
  return Boolean(email) && correcteurs(env).has(normaliserEmail(email as string));
}

type Acces = Exclude<Awaited<ReturnType<typeof requireActiveUser>>, { response: unknown }>;

/** À appeler après requireActiveUser dans chaque route de correction. */
export function exigerCorrecteur(access: Acces) {
  // 404 plutôt que 403 : la correction n'existe pas pour un abonné.
  return estCorrecteur(access.user.email) ? null : NextResponse.json({ error: "Introuvable" }, { status: 404 });
}

// La grille : 5 critères, chacun noté 0, 1 ou 2. Le texte reprend le
// document validé, mot pour mot.
export const GRILLE = [
  {
    titre: "Le résultat répond à la demande",
    deux: "Chaque point du travail demandé est traité",
    un: "Un point manque ou reste vague",
    zero: "Plusieurs points manquent, ou le sujet n'est pas le bon",
  },
  {
    titre: "Les faits et les chiffres sont justes",
    deux: "Calculs exacts, dates cohérentes, rien d'inventé hors des données du cas",
    un: "Une petite erreur sans effet sur la décision",
    zero: "Un calcul faux, une date fausse ou un fait inventé qui change le résultat",
  },
  {
    titre: "Le résultat est prêt à servir",
    deux: "Le format demandé, le bon ton pour le destinataire, utilisable tel quel",
    un: "Utilisable après une retouche",
    zero: "À refaire avant de servir",
  },
  {
    titre: "L'IA est bien utilisée",
    deux: "La capture montre la configuration ou la skill du kit, les données du cas et au moins une demande de correction",
    un: "L'IA est utilisée sans le kit, ou sans demande de correction",
    zero: "Pas de capture de la conversation",
  },
  {
    titre: "La personne a vérifié",
    deux: "Les trois lignes citent une vérification réelle et une correction apportée à ce que l'IA a proposé",
    un: "Une vérification générale, sans exemple",
    zero: "Rien sur la vérification",
  },
] as const;

export const SEUIL = 7;
/** Le critère 2 (les faits et les chiffres) est éliminatoire. */
export const CRITERE_ELIMINATOIRE = 1;
export const COMMENTAIRE_MIN = 20;
export const COMMENTAIRE_MAX = 3000;

export type Notes = [number, number, number, number, number];

/** Cinq notes entières de 0 à 2, ou null. */
export function notesValides(valeur: unknown): Notes | null {
  if (!Array.isArray(valeur) || valeur.length !== GRILLE.length) return null;
  if (!valeur.every((n) => n === 0 || n === 1 || n === 2)) return null;
  return valeur as Notes;
}

export const total = (notes: Notes) => notes.reduce((a, b) => a + b, 0);

/** Un rendu est validé à 7 points sur 10 au moins, sans 0 au critère 2. */
export const grilleReussie = (notes: Notes) => total(notes) >= SEUIL && notes[CRITERE_ELIMINATOIRE] > 0;

export type Decision = "valide" | "a_refaire";

/**
 * Vérifie une décision du correcteur. « Validé » demande une grille réussie ;
 * « À refaire » demande un commentaire qui dit quoi corriger (il part à
 * l'abonné). Renvoie le message d'erreur, ou null.
 */
export function erreurDecision(decision: unknown, notes: Notes | null, commentaire: string): string | null {
  if (decision !== "valide" && decision !== "a_refaire") return "Choisissez « Validé » ou « À refaire ».";
  if (!notes) return "Notez les 5 critères, de 0 à 2.";
  if (decision === "valide" && !grilleReussie(notes)) {
    return notes[CRITERE_ELIMINATOIRE] === 0
      ? "Le critère 2 est à 0 : le rendu ne peut pas être validé."
      : `Le rendu a ${total(notes)} points sur 10 : il en faut ${SEUIL} pour le valider.`;
  }
  if (decision === "a_refaire" && commentaire.length < COMMENTAIRE_MIN) {
    return "Écrivez un commentaire : le critère qui manque et ce qu'il faut corriger.";
  }
  return null;
}

/** Le rendu est gardé jusqu'à 2 mois après l'attestation (décision du
 *  10 octobre 2026) : est purgé ce qui a été validé avant cette date. */
export const MOIS_DE_GARDE = 2;
export function limitePurge(maintenant: Date) {
  const limite = new Date(maintenant);
  limite.setUTCMonth(limite.getUTCMonth() - MOIS_DE_GARDE);
  return limite;
}
/** Rendus purgés au plus par passage du travail planifié (règle S13). */
export const PURGES_MAX = 50;
