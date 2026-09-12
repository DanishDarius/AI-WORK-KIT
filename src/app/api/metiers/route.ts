import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/metiers — liste des 12 métiers avec le nombre de tâches de chacun.
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  const { data: metiers, error } = await supabase
    .from("metiers")
    .select("id, slug, nom, description, ordre, taches(count)")
    .order("ordre", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const resultat = (metiers ?? []).map((m) => ({
    id: m.id,
    slug: m.slug,
    nom: m.nom,
    description: m.description,
    nb_taches: Array.isArray(m.taches) ? (m.taches[0]?.count ?? 0) : 0,
  }));

  return NextResponse.json(resultat);
}
