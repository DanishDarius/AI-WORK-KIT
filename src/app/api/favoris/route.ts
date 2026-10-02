import { NextResponse } from "next/server";
import { lireCatalogue, metierParId } from "@/lib/contenu";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/favoris : les tâches mises en favori par l'utilisateur, de la plus
// récente à la plus ancienne, avec le métier d'où elles ont été ajoutées
// (pour reconstruire le lien /taches/[id]?metier=<slug>).
//
// 1 requête base (les favoris du compte, bornés) ; titres et métiers viennent
// du cache de contenu (règle C1).
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("favoris", erreur);
  }

  const { data, error } = await supabase
    .from("favoris")
    .select("tache_id, metier_id")
    .eq("user_id", user.id)
    .order("cree_le", { ascending: false })
    .limit(500);
  if (error) return erreurServeur("favoris", error.message);

  const resultat = ((data ?? []) as { tache_id: string; metier_id: string }[]).map((f) => {
    const tache = catalogue.taches[f.tache_id];
    const metier = metierParId(catalogue, f.metier_id);
    return {
      tache_id: f.tache_id,
      tache_code: tache?.code ?? null,
      tache_titre: tache?.titre ?? null,
      metier_slug: metier?.slug ?? null,
      metier_nom: metier?.nom ?? null,
    };
  });

  return NextResponse.json(resultat);
}
