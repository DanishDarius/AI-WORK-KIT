import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/metiers/[slug] - détail d'un métier + ses tâches (via la table de
// liaison metiers_taches, une tâche pouvant appartenir à plusieurs métiers)
// + le chemin choisi par l'utilisateur connecté pour CE métier.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const { data: metier, error: erreurMetier } = await supabase
    .from("metiers")
    .select("id, slug, nom, description")
    .eq("slug", slug)
    .single();

  if (erreurMetier || !metier) {
    return NextResponse.json({ error: "Métier introuvable" }, { status: 404 });
  }

  const { data: chemin } = await supabase
    .from("utilisateurs_chemins")
    .select("chemin")
    .eq("metier_id", metier.id)
    .eq("user_id", user.id)
    .maybeSingle();

  const [{ data: liaisons, error: erreurTaches }, { data: favoris }, { data: faites }] =
    await Promise.all([
      supabase
        .from("metiers_taches")
        .select(
          "ordre, taches(id, code, titre, limite_connue, ia_alternative_conseillee)"
        )
        .eq("metier_id", metier.id)
        .order("ordre", { ascending: true }),
      supabase.from("favoris").select("tache_id").eq("user_id", user.id),
      supabase.from("taches_faites").select("tache_id").eq("user_id", user.id),
    ]);

  if (erreurTaches) {
    return NextResponse.json({ error: erreurTaches.message }, { status: 500 });
  }

  const cheminChoisi = chemin?.chemin ?? null;
  const idsFavoris = new Set((favoris ?? []).map((f) => f.tache_id));
  const idsFaites = new Set((faites ?? []).map((f) => f.tache_id));

  const taches = (liaisons ?? [])
    .map((l) => {
      const t = Array.isArray(l.taches) ? l.taches[0] : l.taches;
      if (!t) return null;
      return {
        id: t.id,
        code: t.code,
        titre: t.titre,
        ia_par_defaut: cheminChoisi,
        limite_connue: t.limite_connue,
        ia_alternative_conseillee: t.ia_alternative_conseillee,
        fait: idsFaites.has(t.id),
        favori: idsFavoris.has(t.id),
      };
    })
    .filter(Boolean);

  const tachesFaites = taches.filter(
    (t) => (t as { fait: boolean } | null)?.fait
  ).length;

  return NextResponse.json({
    metier,
    chemin_choisi: cheminChoisi,
    taches_faites: tachesFaites,
    taches,
  });
}
