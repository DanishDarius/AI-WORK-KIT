import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

// POST /api/taches/[id]/faite - marque ou démarque une tâche comme faite
// pour l'utilisateur connecté. Body attendu : { "fait": true } ou { "fait": false }.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const body = await request.json().catch(() => null);
  const fait = body?.fait;
  if (typeof fait !== "boolean") {
    return NextResponse.json(
      { error: "Le champ 'fait' (booléen) est requis." },
      { status: 400 }
    );
  }

  if (fait) {
    const { error } = await supabase.from("taches_faites").upsert(
      { user_id: user.id, tache_id: id, fait_le: new Date().toISOString() },
      { onConflict: "user_id,tache_id" }
    );
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabase
      .from("taches_faites")
      .delete()
      .eq("user_id", user.id)
      .eq("tache_id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, fait });
}
