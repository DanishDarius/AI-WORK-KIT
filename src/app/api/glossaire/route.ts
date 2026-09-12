import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/glossaire — les termes du glossaire, identiques pour tous les métiers.
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("glossaire")
    .select("terme, definition")
    .order("ordre", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
