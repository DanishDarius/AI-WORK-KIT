import "server-only";

import { normaliserEmail } from "@/lib/normaliser";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { SANS_ABONNEMENT, type Abonnement } from "@/lib/offre";

// Un abonnement ouvre la Bibliothèque tant que sa date de fin n'est pas
// dépassée. Un abonnement résilié reste donc actif jusqu'au bout de la
// période déjà payée.
export async function getAbonnement(email: string | null | undefined): Promise<Abonnement> {
  if (!email) return SANS_ABONNEMENT;
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("abonnements")
      .select("periode, statut, fin_le")
      .eq("email", normaliserEmail(email))
      .order("fin_le", { ascending: false })
      .limit(1);
    if (error || !data?.length) return SANS_ABONNEMENT;
    const ligne = data[0] as { periode: Abonnement["periode"]; statut: Abonnement["statut"]; fin_le: string };
    const enCours = ligne.statut !== "expire" && new Date(ligne.fin_le).getTime() > Date.now();
    return {
      actif: enCours,
      periode: ligne.periode,
      statut: enCours ? ligne.statut : "expire",
      fin_le: ligne.fin_le,
    };
  } catch {
    return SANS_ABONNEMENT;
  }
}

// Abonnement de la personne connectée (pages serveur).
export async function getAbonnementCourant() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user, abonnement: await getAbonnement(user?.email) };
}
