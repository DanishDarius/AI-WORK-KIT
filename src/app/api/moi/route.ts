import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/moi — infos sur l'utilisateur connecté.
export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  return NextResponse.json({
    email: user.email,
    membre_depuis: user.created_at,
  });
}
