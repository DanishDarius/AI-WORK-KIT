import "server-only";

import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { accesActif } from "@/lib/acces-actif";
import { createClient } from "@/lib/supabase/server";
import { lireSession } from "@/lib/supabase/session";

export type EtatAcces = "deconnecte" | "inactif" | "actif" | "indisponible";

// État d'accès de la personne qui consulte la page (pages serveur).
// « actif » : session valide ET accès actif (table acces_clients).
// Mis en cache pour la durée d'une requête : layout et page partagent la
// même réponse.
export const getEtatAcces = cache(async (): Promise<{ etat: EtatAcces; email: string | null }> => {
  // Toujours évalué à la requête, jamais figé au moment du build.
  await connection();
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { etat: "deconnecte", email: null };
  }
  const session = await lireSession(await createClient());
  if (!session) return { etat: "deconnecte", email: null };
  try {
    const acces = await accesActif(session.email);
    return { etat: acces.actif ? "actif" : "inactif", email: session.email };
  } catch (erreur) {
    // Base injoignable : on ne laisse pas entrer (règle S1). Les pages
    // réservées affichent une erreur.
    console.error("[acces] vérification impossible", erreur);
    return { etat: "indisponible", email: session.email };
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
