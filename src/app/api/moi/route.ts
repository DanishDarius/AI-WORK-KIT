import { NextResponse } from "next/server";
import { getAbonnement } from "@/lib/abonnement";
import { lireFil } from "@/lib/contenu";
import { nouveautesDepuis } from "@/lib/fil";
import { lirePreferences } from "@/lib/notifications";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/moi : infos sur l'utilisateur connecté, son accès, son abonnement
// et le nombre de nouveautés du fil depuis sa dernière visite (pastille de la
// cloche). Deux requêtes base propres au compte : l'abonnement (gardé 60
// secondes) et les préférences. Le fil vient du cache (règle C1). La date de
// l'accès vient de la vérification déjà faite par requireActiveUser.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const { user, accesDepuis } = access;

  const [abonnement, nouveautes] = await Promise.all([getAbonnement(user.email), compterNouveautes(user.email)]);

  return NextResponse.json(
    {
      email: user.email,
      // Le compte est créé par l'achat : il date de l'accès.
      membre_depuis: accesDepuis,
      acces_depuis: accesDepuis,
      abonnement,
      nouveautes,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

// La pastille est un confort : si le fil ou les préférences ne se lisent pas,
// le compte s'affiche quand même, sans pastille.
async function compterNouveautes(email: string | null | undefined) {
  if (!email) return 0;
  try {
    const [fil, preferences] = await Promise.all([lireFil(), lirePreferences(email)]);
    return nouveautesDepuis(fil, preferences.fil_vu_le);
  } catch (erreur) {
    console.error("[moi] nouveautés illisibles", erreur instanceof Error ? erreur.message : erreur);
    return 0;
  }
}
