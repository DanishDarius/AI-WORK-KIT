import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";
import { erreurServeur } from "@/lib/reponses-api";

// GET /api/glossaire : les termes du glossaire, identiques pour tous les métiers.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { supabase } = access;

  const { data, error } = await supabase
    .from("glossaire")
    .select("terme, definition")
    .order("ordre", { ascending: true });

  if (error) {
    return erreurServeur("glossaire", error.message);
  }

  return NextResponse.json(data);
}
