import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/taches/[id]?metier=<slug> : détail d'une tâche : ses 2 exercices,
// avec pour chacun les 3 prompts (chatgpt / claude / gemini).
//
// Le paramètre "metier" (slug) est nécessaire car une tâche peut appartenir
// à plusieurs métiers : il indique de quel métier on vient, pour savoir
// quel "chemin choisi" (ia_par_defaut) appliquer sur cette page.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const metierSlug = searchParams.get("metier");

  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const { data: tache, error: erreurTache } = await supabase
    .from("taches")
    .select("id, code, titre, limite_connue, ia_alternative_conseillee")
    .eq("id", id)
    .single();

  if (erreurTache || !tache) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }

  let cheminChoisi: string | null = null;
  if (metierSlug) {
    const { data: metier } = await supabase
      .from("metiers")
      .select("id")
      .eq("slug", metierSlug)
      .maybeSingle();

    if (metier) {
      const { data: chemin } = await supabase
        .from("utilisateurs_chemins")
        .select("chemin")
        .eq("metier_id", metier.id)
        .eq("user_id", user.id)
        .maybeSingle();
      cheminChoisi = chemin?.chemin ?? null;

      // Effet de bord : on enregistre cette consultation pour "Reprendre où
      // vous en étiez" (une seule ligne, écrasée à chaque fois) et pour la
      // série de régularité (un journal des jours où au moins une tâche a
      // été consultée). On ne bloque pas la réponse sur une éventuelle
      // erreur ici, ce n'est pas critique pour afficher la tâche.
      const aujourdHui = new Date().toISOString().slice(0, 10);
      await Promise.all([
        supabase.from("derniere_activite").upsert(
          {
            user_id: user.id,
            metier_id: metier.id,
            tache_id: tache.id,
            maj_le: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        ),
        supabase
          .from("activite_journaliere")
          .upsert(
            { user_id: user.id, jour: aujourdHui },
            { onConflict: "user_id,jour", ignoreDuplicates: true }
          ),
      ]);
    }
  }

  const [{ data: faitRow }, { data: favoriRow }] = await Promise.all([
    supabase
      .from("taches_faites")
      .select("tache_id")
      .eq("user_id", user.id)
      .eq("tache_id", tache.id)
      .maybeSingle(),
    supabase
      .from("favoris")
      .select("tache_id")
      .eq("user_id", user.id)
      .eq("tache_id", tache.id)
      .maybeSingle(),
  ]);

  const { data: exercices, error: erreurExercices } = await supabase
    .from("exercices")
    .select("id, numero, titre, contexte, donnees, travail_a_faire")
    .eq("tache_id", tache.id)
    .order("numero", { ascending: true });

  if (erreurExercices) {
    return NextResponse.json({ error: erreurExercices.message }, { status: 500 });
  }

  const exercicesAvecPrompts = await Promise.all(
    (exercices ?? []).map(async (exo) => {
      const { data: prompts } = await supabase
        .from("prompts")
        .select("ia, contenu")
        .eq("exercice_id", exo.id);

      const parIa: Record<string, string> = {};
      (prompts ?? []).forEach((p) => {
        parIa[p.ia] = p.contenu;
      });

      return {
        titre: exo.titre,
        contexte: exo.contexte,
        donnees: exo.donnees,
        travail_a_faire: exo.travail_a_faire,
        prompts: {
          chatgpt: parIa.chatgpt ?? null,
          claude: parIa.claude ?? null,
          gemini: parIa.gemini ?? null,
        },
      };
    })
  );

  return NextResponse.json({
    tache: {
      code: tache.code,
      titre: tache.titre,
      limite_connue: tache.limite_connue,
      ia_alternative_conseillee: tache.ia_alternative_conseillee,
    },
    ia_par_defaut: cheminChoisi,
    fait: !!faitRow,
    favori: !!favoriRow,
    exercices: exercicesAvecPrompts,
  });
}
