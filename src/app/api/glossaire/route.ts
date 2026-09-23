import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/glossaire - les termes du glossaire, identiques pour tous les métiers.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase } = access;

  const { data, error } = await supabase
    .from("glossaire")
    .select("terme, definition")
    .order("ordre", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
