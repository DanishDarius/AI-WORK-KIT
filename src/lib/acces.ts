import "server-only";

import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { normaliserEmail } from "@/lib/normaliser";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type EtatAcces = "deconnecte" | "inactif" | "actif" | "indisponible";

// État d'accès de la personne qui consulte la page (pages serveur).
// « actif » : session valide ET accès Chariow actif (table acces_clients).
// Mis en cache pour la durée d'une requête.
export const getEtatAcces = cache(async (): Promise<{ etat: EtatAcces; email: string | null }> => {
  // Toujours évalué à la requête, jamais figé au moment du build.
  await connection();
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { etat: "deconnecte", email: null };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { etat: "deconnecte", email: null };
  try {
    const { data, error } = await createAdminClient()
      .from("acces_clients")
      .select("id")
      .eq("email", normaliserEmail(user.email))
      .eq("statut", "actif")
      .limit(1);
    // Base injoignable : on ne laisse pas entrer (règle S1). La page d'accès
    // affiche l'état « indisponible », les pages réservées une erreur.
    if (error) {
      console.error("[acces] vérification impossible", error.message);
      return { etat: "indisponible", email: user.email };
    }
    return { etat: data?.length ? "actif" : "inactif", email: user.email };
  } catch (erreur) {
    console.error("[acces] vérification impossible", erreur);
    return { etat: "indisponible", email: user.email };
  }
});

// À appeler au début de CHAQUE page réservée (règle S1) : le layout ne suffit
// pas, il ne décide pas du rendu des pages qu'il contient. Le résultat de
// getEtatAcces est mis en cache pour la requête : aucun appel supplémentaire.
export async function exigerAccesActif() {
  const { etat, email } = await getEtatAcces();
  if (etat === "deconnecte") redirect("/acces");
  if (etat === "inactif") redirect("/acces?compte=inactif");
  if (etat === "indisponible" || !email) {
    throw new Error("La vérification de votre accès est momentanément impossible.");
  }
  return { email };
}
