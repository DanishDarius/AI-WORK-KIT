import "server-only";

import { creerMemoireCourte } from "@/lib/memoire-courte";
import { normaliserEmail } from "@/lib/normaliser";
import { createAdminClient } from "@/lib/supabase/admin";
import { SANS_ABONNEMENT, type Abonnement } from "@/lib/offre";

type Ligne = { periode: Abonnement["periode"]; statut: Abonnement["statut"]; fin_le: string };

// Règle C2 : un abonnement en cours est gardé 60 secondes en mémoire du
// serveur, comme l'accès payé (src/lib/acces-actif.ts). Une page et les
// routes qu'elle appelle ne relisent pas la même ligne. L'absence
// d'abonnement n'est jamais gardée : un achat ouvre l'abonnement tout de suite.
// La date de fin est recontrôlée à chaque lecture.
const memoire = creerMemoireCourte<Ligne>(60_000);

function etat(ligne: Ligne): Abonnement {
  const enCours = ligne.statut !== "expire" && new Date(ligne.fin_le).getTime() > Date.now();
  return {
    actif: enCours,
    periode: ligne.periode,
    statut: enCours ? ligne.statut : "expire",
    fin_le: ligne.fin_le,
  };
}

// Un abonnement ouvre la Bibliothèque tant que sa date de fin n'est pas
// dépassée. Un abonnement résilié reste donc actif jusqu'au bout de la
// période déjà payée.
export async function getAbonnement(email: string | null | undefined): Promise<Abonnement> {
  if (!email) return SANS_ABONNEMENT;
  const cle = normaliserEmail(email);
  const connu = memoire.lire(cle);
  if (connu) return etat(connu);
  try {
    const { data, error } = await createAdminClient()
      .from("abonnements")
      .select("periode, statut, fin_le")
      .eq("email", cle)
      .order("fin_le", { ascending: false })
      .limit(1);
    if (error || !data?.length) return SANS_ABONNEMENT;
    const ligne = data[0] as Ligne;
    const abonnement = etat(ligne);
    if (abonnement.actif) memoire.garder(cle, ligne);
    return abonnement;
  } catch {
    return SANS_ABONNEMENT;
  }
}
