import { NextResponse } from "next/server";
import { estUuid } from "@/lib/normaliser";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";

// Code renvoyé par la base quand la ressource n'existe pas (clé étrangère).
const RESSOURCE_INCONNUE = "23503";

// POST /api/kits/ressources/[id]/installee : coche ou décoche une ressource
// du kit pour l'utilisateur connecté. Body attendu : { "fait": true } ou
// { "fait": false }.
//
// Règle S13 : une ligne par compte et par ressource (clé primaire), et la
// ressource doit exister (clé étrangère). Un compte ne peut donc pas écrire
// plus de lignes qu'il n'y a de ressources.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!estUuid(id)) {
    return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
  }
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase, user } = access;

  const body = await request.json().catch(() => null);
  const fait = body?.fait;
  if (typeof fait !== "boolean") {
    return NextResponse.json({ error: "Le champ 'fait' (booléen) est requis." }, { status: 400 });
  }

  if (fait) {
    const { error } = await supabase.from("progression_kit").upsert(
      { user_id: user.id, ressource_id: id, fait_le: new Date().toISOString() },
      { onConflict: "user_id,ressource_id" }
    );
    if (error?.code === RESSOURCE_INCONNUE) {
      return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
    }
    if (error) return erreurServeur("kit-ressource", error.message);
  } else {
    const { error } = await supabase
      .from("progression_kit")
      .delete()
      .eq("user_id", user.id)
      .eq("ressource_id", id);
    if (error) return erreurServeur("kit-ressource", error.message);
  }

  return NextResponse.json({ ok: true, fait });
}
