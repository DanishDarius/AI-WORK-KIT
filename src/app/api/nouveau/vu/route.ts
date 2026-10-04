import { NextResponse } from "next/server";
import { marquerFilVu } from "@/lib/notifications";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";

// POST /api/nouveau/vu : le client vient d'ouvrir le fil Nouveau. La pastille
// de la cloche repart de zéro. Une écriture, sur la ligne du compte (une
// seule ligne par compte, règle S13). La page du fil, elle, ne fait que lire
// (règle C4) : c'est le navigateur qui appelle cette route.
export async function POST() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  if (!access.user.email) return NextResponse.json({ ok: true });
  try {
    await marquerFilVu(access.user.email);
  } catch (erreur) {
    return erreurServeur("nouveau-vu", erreur);
  }
  return NextResponse.json({ ok: true });
}
