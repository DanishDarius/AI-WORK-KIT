import "server-only";

import { normaliserEmail } from "@/lib/normaliser";
import { createAdminClient } from "@/lib/supabase/admin";

// Préférences de notification d'un client (table preferences_notifications,
// migration 0040) : l'e-mail de la semaine, les rappels d'échéance, et la date
// de sa dernière visite du fil Nouveau (pastille sur la cloche).
//
// La table est réservée au serveur : chaque fonction reçoit l'adresse du
// compte connecté (lue dans la session par requireActiveUser) ou, pour le
// lien « ne plus recevoir » d'un e-mail, le jeton de la ligne.
//
// Règle S13 : une seule ligne par adresse (clé primaire). Un compte ne peut
// donc écrire qu'une ligne, quel que soit le nombre d'appels.

export type Preferences = { email_semaine: boolean; rappels_echeance: boolean; fil_vu_le: string | null };

export const PREFERENCES_PAR_DEFAUT: Preferences = { email_semaine: true, rappels_echeance: true, fil_vu_le: null };

/** Les préférences du compte. Sans ligne enregistrée : tout est actif. */
export async function lirePreferences(email: string): Promise<Preferences> {
  const { data, error } = await createAdminClient()
    .from("preferences_notifications")
    .select("email_semaine, rappels_echeance, fil_vu_le")
    .eq("email", normaliserEmail(email))
    .maybeSingle();
  if (error) throw new Error(`Lecture des préférences impossible : ${error.message}`);
  const ligne = data as Partial<Preferences> | null;
  return {
    email_semaine: ligne?.email_semaine !== false,
    rappels_echeance: ligne?.rappels_echeance !== false,
    fil_vu_le: ligne?.fil_vu_le ?? null,
  };
}

/** Enregistre un choix du client. Seuls les champs donnés changent. */
export async function enregistrerPreferences(email: string, choix: Partial<Pick<Preferences, "email_semaine" | "rappels_echeance">>) {
  const { error } = await createAdminClient()
    .from("preferences_notifications")
    .upsert({ email: normaliserEmail(email), ...choix, maj_le: new Date().toISOString() }, { onConflict: "email" });
  if (error) throw new Error(`Enregistrement des préférences impossible : ${error.message}`);
}

/** Le client vient d'ouvrir le fil Nouveau : la pastille repart de zéro. */
export async function marquerFilVu(email: string) {
  const maintenant = new Date().toISOString();
  const { error } = await createAdminClient()
    .from("preferences_notifications")
    .upsert({ email: normaliserEmail(email), fil_vu_le: maintenant, maj_le: maintenant }, { onConflict: "email" });
  if (error) throw new Error(`Enregistrement de la visite impossible : ${error.message}`);
}

/**
 * Lien « ne plus recevoir » d'un e-mail : coupe l'e-mail de la semaine pour
 * la ligne qui porte ce jeton. Ne crée jamais de ligne (règle S13) et ne dit
 * pas si le jeton existe.
 */
export async function desabonnerParJeton(jeton: string) {
  const { error } = await createAdminClient()
    .from("preferences_notifications")
    .update({ email_semaine: false, maj_le: new Date().toISOString() })
    .eq("jeton", jeton);
  if (error) throw new Error(`Désabonnement impossible : ${error.message}`);
}
