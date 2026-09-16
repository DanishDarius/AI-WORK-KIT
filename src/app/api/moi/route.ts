import { NextResponse } from "next/server";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/moi — infos sur l'utilisateur connecté.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { user } = access;

  return NextResponse.json({
    email: user.email,
    membre_depuis: user.created_at,
  });
}
