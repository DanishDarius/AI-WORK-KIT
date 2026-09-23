import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

// POST /api/taches/[id]/favori?metier=<slug> - ajoute ou retire une tâche
// des favoris de l'utilisateur connecté. Body attendu : { "favori": true|false }.
//
// Le paramètre "metier" (slug) est requis pour AJOUTER un favori : il permet
// d'enregistrer de quel métier on vient, pour reconstruire plus tard le bon
// lien /taches/[id]?metier=... depuis la page "Mes favoris" (une tâche peut
// appartenir à plusieurs métiers). Il est ignoré pour un retrait.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const metierSlug = searchParams.get("metier");
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const body = await request.json().catch(() => null);
  const favori = body?.favori;
  if (typeof favori !== "boolean") {
    return NextResponse.json(
      { error: "Le champ 'favori' (booléen) est requis." },
      { status: 400 }
    );
  }

  if (favori) {
    if (!metierSlug) {
      return NextResponse.json(
        { error: "Le paramètre 'metier' est requis pour ajouter un favori." },
        { status: 400 }
      );
    }
    const { data: metier, error: erreurMetier } = await supabase
      .from("metiers")
      .select("id")
      .eq("slug", metierSlug)
      .maybeSingle();
    if (erreurMetier || !metier) {
      return NextResponse.json({ error: "Métier introuvable" }, { status: 404 });
    }
    const { error } = await supabase.from("favoris").upsert(
      {
        user_id: user.id,
        tache_id: id,
        metier_id: metier.id,
        cree_le: new Date().toISOString(),
      },
      { onConflict: "user_id,tache_id" }
    );
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabase
      .from("favoris")
      .delete()
      .eq("user_id", user.id)
      .eq("tache_id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, favori });
}
