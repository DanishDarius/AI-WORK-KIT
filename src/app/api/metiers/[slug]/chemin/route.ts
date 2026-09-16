import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

const CHEMINS_VALIDES = ["chatgpt", "claude", "gemini"];

// POST /api/metiers/[slug]/chemin — définir ou changer le chemin IA choisi
// par l'utilisateur connecté pour ce métier. Body attendu : { "chemin": "gemini" }
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const body = await request.json().catch(() => null);
  const chemin = body?.chemin;
  if (!CHEMINS_VALIDES.includes(chemin)) {
    return NextResponse.json(
      { error: "Chemin invalide (chatgpt / claude / gemini attendu)" },
      { status: 400 }
    );
  }

  const { data: metier, error: erreurMetier } = await supabase
    .from("metiers")
    .select("id")
    .eq("slug", slug)
    .single();

  if (erreurMetier || !metier) {
    return NextResponse.json({ error: "Métier introuvable" }, { status: 404 });
  }

  const { error } = await supabase.from("utilisateurs_chemins").upsert(
    {
      user_id: user.id,
      metier_id: metier.id,
      chemin,
      maj_le: new Date().toISOString(),
    },
    { onConflict: "user_id,metier_id" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, chemin_choisi: chemin });
}
