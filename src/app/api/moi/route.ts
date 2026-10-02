import { NextResponse } from "next/server";
import { getAbonnement } from "@/lib/abonnement";
import { normaliserEmail } from "@/lib/normaliser";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/moi : infos sur l'utilisateur connecté, son accès et son abonnement.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { user } = access;

  const admin = createAdminClient();
  const [{ data: acces }, abonnement] = await Promise.all([
    admin
      .from("acces_clients")
      .select("cree_le")
      .eq("email", normaliserEmail(user.email ?? ""))
      .eq("statut", "actif")
      .order("cree_le", { ascending: true })
      .limit(1),
    getAbonnement(user.email),
  ]);

  return NextResponse.json(
    {
      email: user.email,
      membre_depuis: user.created_at,
      acces_depuis: acces?.[0]?.cree_le ?? user.created_at,
      abonnement,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
