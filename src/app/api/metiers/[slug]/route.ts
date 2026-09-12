import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/metiers/[slug] — détail d'un métier + ses tâches + le chemin choisi
// par l'utilisateur connecté (ia_par_defaut sur chaque tâche = le chemin choisi,
// tant que la tâche ne signale pas une limite connue — voir mécanique d'exception
// gérée côté frontend, l'API renvoie ici les données brutes).
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

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

  const { data: taches, error: erreurTaches } = await supabase
    .from("taches")
    .select("id, code, titre, ordre, limite_connue, ia_alternative_conseillee")
    .eq("metier_id", metier.id)
    .order("ordre", { ascending: true });

  if (erreurTaches) {
    return NextResponse.json({ error: erreurTaches.message }, { status: 500 });
  }

  const cheminChoisi = chemin?.chemin ?? null;

  return NextResponse.json({
    metier,
    chemin_choisi: cheminChoisi,
    taches: (taches ?? []).map((t) => ({
      id: t.id,
      code: t.code,
      titre: t.titre,
      ia_par_defaut: cheminChoisi,
      limite_connue: t.limite_connue,
      ia_alternative_conseillee: t.ia_alternative_conseillee,
    })),
  });
}
