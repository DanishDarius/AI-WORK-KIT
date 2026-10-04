import { NextResponse } from "next/server";
import { lireCatalogue, tachesDuMetier } from "@/lib/contenu";
import { erreurServeur } from "@/lib/reponses-api";
import { idsTachesFaites } from "@/lib/suivi";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/metiers : la liste des métiers, avec pour chacun le nombre de
// tâches et le nombre de tâches déjà faites par l'utilisateur.
//
// Le contenu vient du cache (règle C1). Reste 1 requête base : les tâches
// faites du compte.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("metiers", erreur);
  }
  const faites = await idsTachesFaites(supabase, user.id);

  return NextResponse.json(
    catalogue.metiers.map((m) => {
      const taches = tachesDuMetier(catalogue, m.id);
      return {
        id: m.id,
        slug: m.slug,
        nom: m.nom,
        description: m.description,
        publics: m.publics,
        nb_taches: taches.length,
        taches_faites: taches.filter((t) => faites.has(t.id)).length,
      };
    }),
  );
}
