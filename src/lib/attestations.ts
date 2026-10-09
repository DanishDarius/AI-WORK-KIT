import "server-only";

import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getAbonnement } from "@/lib/abonnement";
import { type KitContenu, lireCatalogue, lireExercicesFinaux, lireKit, metierParSlug } from "@/lib/contenu";
import { erreurServeur } from "@/lib/reponses-api";
import type { requireActiveUser } from "@/lib/supabase/active-access";
import { idsRessourcesInstallees, idsTachesFaites } from "@/lib/suivi";

// L'attestation par métier (plan produit, chantier 8.3 ; document « AIW :
// attestations par métier, grille et exercices finaux », validé le
// 10 octobre 2026).
//
// Pour ouvrir l'exercice final, trois conditions vérifiées par le serveur :
// un abonnement actif, le kit du métier installé (toutes les étapes de
// « Mon kit » cochées, pour l'une des trois IA) et 5 tâches du métier faites.

export const TACHES_REQUISES = 5;
export const MAX_FICHIERS = 5;
/** Demandes de liens d'envoi par jour et par rendu (règle S13). */
export const LIMITE_ENVOIS_JOUR = 20;

// Types acceptés et taille maximale de chaque fichier. Les images sont
// réduites dans le navigateur avant l'envoi (src/components/attestation.tsx) :
// la limite des images ne sert que de garde-fou.
export const TYPES_FICHIERS: Record<string, { libelle: string; max: number }> = {
  "image/jpeg": { libelle: "image", max: 8 * 1024 * 1024 },
  "image/png": { libelle: "image", max: 8 * 1024 * 1024 },
  "image/webp": { libelle: "image", max: 8 * 1024 * 1024 },
  "application/pdf": { libelle: "PDF", max: 20 * 1024 * 1024 },
};

export type FichierPrevu = { type: string; taille: number };
export type FichierRendu = FichierPrevu & { cle: string };

/** Liste de fichiers annoncée par le navigateur, validée et bornée (règle S7). */
export function fichiersValides(valeur: unknown): FichierPrevu[] | null {
  if (!Array.isArray(valeur) || valeur.length < 1 || valeur.length > MAX_FICHIERS) return null;
  const liste: FichierPrevu[] = [];
  for (const brut of valeur) {
    if (!brut || typeof brut !== "object") return null;
    const { type, taille } = brut as Record<string, unknown>;
    if (typeof type !== "string" || !(type in TYPES_FICHIERS)) return null;
    if (typeof taille !== "number" || !Number.isInteger(taille) || taille < 1 || taille > TYPES_FICHIERS[type].max) return null;
    liste.push({ type, taille });
  }
  return liste;
}

const IAS = ["chatgpt", "claude", "gemini"] as const;

/** Le kit est installé quand, pour l'une des IA, chaque ressource des étapes
 *  d'installation est cochée (les ressources « pour plus tard » ne comptent pas). */
export function kitInstalle(kit: KitContenu | null, installees: Set<string>): boolean {
  if (!kit) return false;
  return IAS.some((ia) => {
    const etapes = kit.ressources.filter((r) => r.etape !== null && (!r.outil || r.outil === ia));
    return etapes.length > 0 && etapes.every((r) => installees.has(r.id));
  });
}

export type Conditions = {
  abonne: boolean;
  kit_installe: boolean;
  taches_faites: number;
  taches_requises: number;
};

export const conditionsRemplies = (c: Conditions) => c.abonne && c.kit_installe && c.taches_faites >= c.taches_requises;

/** Conditions d'un compte pour un métier : 2 requêtes propres au compte, lancées ensemble. */
export async function lireConditions(
  supabase: SupabaseClient,
  userId: string,
  abonne: boolean,
  kit: KitContenu | null,
  tachesDuMetier: string[],
): Promise<Conditions> {
  const [faites, installees] = await Promise.all([idsTachesFaites(supabase, userId), idsRessourcesInstallees(supabase, userId)]);
  return {
    abonne,
    kit_installe: kitInstalle(kit, installees),
    taches_faites: tachesDuMetier.filter((id) => faites.has(id)).length,
    taches_requises: TACHES_REQUISES,
  };
}

/** Échéance de la correction : 72 heures, week-ends compris (décision du 10 octobre 2026). */
export function echeanceCorrection(renduLe: string | Date) {
  return new Date(new Date(renduLe).getTime() + 72 * 3600 * 1000);
}

export type StatutRendu = "brouillon" | "en_attente" | "a_refaire" | "valide";

// ---------------------------------------------------------------------------
// Ce que les trois routes /api/attestations/[slug] ont en commun, APRÈS
// requireActiveUser (règle S1, appelé par chaque route) : l'abonnement, puis
// le métier, son kit, ses tâches et son exercice final, tous lus dans le
// cache du contenu (règle C1).

type Acces = Exclude<Awaited<ReturnType<typeof requireActiveUser>>, { response: unknown }>;

export async function contexteAttestation(access: Acces, slug: string) {
  const abonnement = await getAbonnement(access.user.email);

  let catalogue, exercices;
  try {
    [catalogue, exercices] = await Promise.all([lireCatalogue(), lireExercicesFinaux()]);
  } catch (erreur) {
    return { response: erreurServeur("attestation", erreur) };
  }
  const metier = metierParSlug(catalogue, slug);
  const exercice = metier ? exercices[metier.id] : undefined;
  if (!metier || !exercice) {
    return { response: NextResponse.json({ error: "Métier introuvable" }, { status: 404 }) };
  }
  let kit;
  try {
    kit = await lireKit(metier.id);
  } catch (erreur) {
    return { response: erreurServeur("attestation", erreur) };
  }
  return {
    ...access,
    abonne: abonnement.actif,
    metier,
    kit,
    exercice,
    taches: catalogue.tachesParMetier[metier.id] ?? [],
  };
}
