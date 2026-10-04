import { NextResponse } from "next/server";
import { getAbonnement } from "@/lib/abonnement";
import { lireFil } from "@/lib/contenu";
import { elementsDuFil } from "@/lib/fil";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";

// Nombre de publications envoyées : l'accueil n'en montre que les dernières.
const TAILLE = 12;
const SEPT_JOURS_MS = 7 * 86_400_000;

// GET /api/nouveau : les dernières publications du fil, telles que ce client
// peut les voir (titre seul pour une publication réservée aux abonnés).
//
// Le fil vient du cache (règle C1). Une requête base propre au compte :
// l'abonnement, gardé 60 secondes. Cette route ne fait que lire (règle C4).
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;

  let fil;
  try {
    fil = await lireFil();
  } catch (erreur) {
    return erreurServeur("nouveau", erreur);
  }
  const abonnement = await getAbonnement(access.user.email);

  const maintenant = Date.now();
  const elements = elementsDuFil(fil, abonnement.actif, maintenant)
    .slice(0, TAILLE)
    .map((e) => ({ ...e, de_la_semaine: Date.parse(e.publie_le) > maintenant - SEPT_JOURS_MS }));

  return NextResponse.json(
    { abonne: abonnement.actif, elements },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
