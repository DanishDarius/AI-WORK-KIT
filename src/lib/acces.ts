import "server-only";

import { connection } from "next/server";
import { cache } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type EtatAcces = "deconnecte" | "inactif" | "actif";

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
      .ilike("email", user.email)
      .eq("statut", "actif")
      .limit(1);
    // Base momentanément injoignable : on laisse entrer. Les routes API
    // revérifient l'accès (requireActiveUser) avant de servir la moindre donnée.
    if (error) return { etat: "actif", email: user.email };
    return { etat: data?.length ? "actif" : "inactif", email: user.email };
  } catch {
    return { etat: "actif", email: user.email };
  }
});
