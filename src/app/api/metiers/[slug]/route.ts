import { NextResponse } from "next/server";
import { lireCatalogue, metierParSlug, tachesDuMetier } from "@/lib/contenu";
import { erreurServeur } from "@/lib/reponses-api";
import { cheminsChoisis, idsFavoris, idsTachesFaites } from "@/lib/suivi";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/metiers/[slug] : un métier, ses tâches dans l'ordre du parcours et
// l'IA choisie par l'utilisateur pour CE métier.
//
// Le contenu vient du cache (règle C1). Restent 3 requêtes base, lancées
// ensemble : IA choisies, favoris, tâches faites.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("metiers", erreur);
  }
  const metier = metierParSlug(catalogue, slug);
  if (!metier) {
    return NextResponse.json({ error: "Métier introuvable" }, { status: 404 });
  }

  const [chemins, favoris, faites] = await Promise.all([
    cheminsChoisis(supabase, user.id),
    idsFavoris(supabase, user.id),
    idsTachesFaites(supabase, user.id),
  ]);
  const cheminChoisi = chemins.get(metier.id) ?? null;

  const taches = tachesDuMetier(catalogue, metier.id).map((t) => ({
    id: t.id,
    code: t.code,
    titre: t.titre,
    ia_par_defaut: cheminChoisi,
    limite_connue: t.limite_connue,
    ia_alternative_conseillee: t.ia_alternative_conseillee,
    gratuit_ok: t.gratuit_ok,
    mobile_ok: t.mobile_ok,
    fait: faites.has(t.id),
    favori: favoris.has(t.id),
  }));

  return NextResponse.json({
    metier,
    chemin_choisi: cheminChoisi,
    taches_faites: taches.filter((t) => t.fait).length,
    taches,
  });
}
