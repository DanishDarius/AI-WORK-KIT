import "server-only";

import { lireCatalogue, metierParId } from "@/lib/contenu";
import { createAdminClient } from "@/lib/supabase/admin";

// La page publique /attestation/<numéro> (étape D) : ce qu'elle montre d'une
// attestation obtenue, et rien d'autre (nom, métier, date). Seule lecture de
// la plateforme faite sans connexion, par une page servie en cache (règle C3).
//
// - Le numéro est validé avant la requête (règle S7) et ne se devine pas
//   (48 bits tirés au hasard par la base, migration 0055).
// - 1 requête par numéro et par 10 minutes au plus : la page est gardée en
//   cache 10 minutes (règle C2).
// - Le nom du métier vient du cache du contenu : c'est la seule lecture de ce
//   cache faite sans accès payé (règle C1), et seul le nom du métier en sort.

export type AttestationPublique = { nom: string; metier: string; delivreeLe: string; numero: string };

export async function lireAttestationPublique(numero: string): Promise<AttestationPublique | null> {
  const { data, error } = await createAdminClient()
    .from("rendus_attestation")
    .select("nom_attestation, metier_id, corrige_le")
    .eq("numero", numero)
    .eq("statut", "valide")
    .maybeSingle();
  if (error) throw new Error(`attestation-verification : ${error.message}`);
  const ligne = data as { nom_attestation: string | null; metier_id: string; corrige_le: string | null } | null;
  if (!ligne?.nom_attestation || !ligne.corrige_le) return null;
  const metier = metierParId(await lireCatalogue(), ligne.metier_id);
  if (!metier) return null;
  return { nom: ligne.nom_attestation, metier: metier.nom, delivreeLe: ligne.corrige_le, numero };
}
