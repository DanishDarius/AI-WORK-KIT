import { NextResponse } from "next/server";
import { lireCatalogue, tachesDuMetier, type TacheContenu } from "@/lib/contenu";
import { erreurServeur } from "@/lib/reponses-api";
import { cheminsChoisis, idsFavoris, idsTachesFaites } from "@/lib/suivi";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/catalogue : tout ce dont les pages Tâches et Métiers ont besoin, en
// un appel : métiers (avec progression et IA choisie) et tâches (avec leurs
// métiers, dans l'ordre des métiers puis du parcours).
//
// Le contenu vient du cache (règle C1). Restent 3 requêtes base, propres au
// compte : IA choisies, favoris, tâches faites.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("catalogue", erreur);
  }

  const [chemins, favoris, faites] = await Promise.all([
    cheminsChoisis(supabase, user.id),
    idsFavoris(supabase, user.id),
    idsTachesFaites(supabase, user.id),
  ]);

  const metiers = [];
  const taches = new Map<
    string,
    Omit<TacheContenu, "resultat" | "etapes" | "precisions" | "outil_gratuit_conseille" | "video_url"> & {
      ia_par_defaut: string | null;
      fait: boolean;
      favori: boolean;
      metiers: { slug: string; nom: string }[];
    }
  >();

  for (const m of catalogue.metiers) {
    const liste = tachesDuMetier(catalogue, m.id);
    const chemin = chemins.get(m.id) ?? null;
    metiers.push({
      id: m.id,
      slug: m.slug,
      nom: m.nom,
      description: m.description,
      publics: m.publics,
      nb_taches: liste.length,
      taches_faites: liste.filter((t) => faites.has(t.id)).length,
      chemin_choisi: chemin,
    });
    for (const t of liste) {
      const ref = { slug: m.slug, nom: m.nom };
      const existante = taches.get(t.id);
      if (existante) existante.metiers.push(ref);
      else
        taches.set(t.id, {
          id: t.id,
          code: t.code,
          titre: t.titre,
          limite_connue: t.limite_connue,
          ia_alternative_conseillee: t.ia_alternative_conseillee,
          gratuit_ok: t.gratuit_ok,
          mobile_ok: t.mobile_ok,
          ia_par_defaut: chemin,
          fait: faites.has(t.id),
          favori: favoris.has(t.id),
          metiers: [ref],
        });
    }
  }

  return NextResponse.json({ metiers, taches: [...taches.values()] });
}
