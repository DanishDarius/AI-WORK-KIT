import "server-only";

import { creerMemoireCourte } from "@/lib/memoire-courte";
import { normaliserEmail } from "@/lib/normaliser";
import { createAdminClient } from "@/lib/supabase/admin";

// L'accès payé d'une adresse e-mail : la SEULE fonction qui le vérifie
// (pages par exigerAccesActif, routes API par requireActiveUser).
//
// Règle C2 : une réponse « actif » est gardée 60 secondes en mémoire du
// serveur. Une page et les routes qu'elle appelle ne reposent donc pas la
// même question à la base à chaque requête.
//
// Ce qui n'est JAMAIS gardé :
// - « pas d'accès » : un acheteur entre dès que sa ligne est créée ;
// - une erreur de la base : on ne laisse pas entrer (règle S1) et on réessaie.
// Conséquence assumée : un accès retiré à la main reste ouvert 60 secondes
// au plus sur un serveur qui l'avait déjà vérifié.
type Actif = { actif: true; depuis: string };
export type AccesActif = Actif | { actif: false };

const memoire = creerMemoireCourte<Actif>(60_000);

export class AccesInverifiable extends Error {
  constructor(detail: string) {
    super(`Vérification de l'accès impossible : ${detail}`);
    this.name = "AccesInverifiable";
  }
}

/** Lève AccesInverifiable si la base ne répond pas : l'appelant ferme la porte. */
export async function accesActif(email: string): Promise<AccesActif> {
  const cle = normaliserEmail(email);
  const connu = memoire.lire(cle);
  if (connu) return connu;

  const { data, error } = await createAdminClient()
    .from("acces_clients")
    .select("cree_le")
    .eq("email", cle)
    .eq("statut", "actif")
    .order("cree_le", { ascending: true })
    .limit(1);
  if (error) throw new AccesInverifiable(error.message);

  const ligne = (data as { cree_le: string }[] | null)?.[0];
  if (!ligne) return { actif: false };

  const valeur: Actif = { actif: true, depuis: ligne.cree_le };
  memoire.garder(cle, valeur);
  return valeur;
}
