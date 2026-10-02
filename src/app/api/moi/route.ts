import { NextResponse } from "next/server";
import { getAbonnement } from "@/lib/abonnement";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/moi : infos sur l'utilisateur connecté, son accès et son abonnement.
// Une seule requête base : l'abonnement. La date de l'accès vient de la
// vérification déjà faite par requireActiveUser.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { user, accesDepuis } = access;

  const abonnement = await getAbonnement(user.email);

  return NextResponse.json(
    {
      email: user.email,
      // Le compte est créé par l'achat : il date de l'accès.
      membre_depuis: accesDepuis,
      acces_depuis: accesDepuis,
      abonnement,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
