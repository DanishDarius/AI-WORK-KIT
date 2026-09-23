import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/metiers - liste des 12 métiers avec le nombre de tâches de chacun
// (une tâche pouvant appartenir à plusieurs métiers - relation many-to-many
// via la table metiers_taches).
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const [{ data: metiers, error }, { data: liaisons }, { data: faites }] = await Promise.all([
    supabase
      .from("metiers")
      .select("id, slug, nom, description, ordre, metiers_taches(count)")
      .order("ordre", { ascending: true }),
    supabase.from("metiers_taches").select("metier_id, tache_id"),
    supabase.from("taches_faites").select("tache_id").eq("user_id", user.id),
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Nombre de tâches faites par métier, pour la barre de progression de
  // chaque carte métier sur l'accueil.
  const idsTachesFaites = new Set((faites ?? []).map((f) => f.tache_id));
  const tachesFaitesParMetier = new Map<string, number>();
  (liaisons ?? []).forEach((l) => {
    if (idsTachesFaites.has(l.tache_id)) {
      tachesFaitesParMetier.set(
        l.metier_id,
        (tachesFaitesParMetier.get(l.metier_id) ?? 0) + 1
      );
    }
  });

  const resultat = (metiers ?? []).map((m) => ({
    id: m.id,
    slug: m.slug,
    nom: m.nom,
    description: m.description,
    nb_taches: Array.isArray(m.metiers_taches)
      ? (m.metiers_taches[0]?.count ?? 0)
      : 0,
    taches_faites: tachesFaitesParMetier.get(m.id) ?? 0,
  }));

  return NextResponse.json(resultat);
}
