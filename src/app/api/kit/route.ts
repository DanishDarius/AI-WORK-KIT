import { NextResponse } from "next/server";
import { miseEnPlacePourCodes } from "@/lib/mise-en-place";
import { requireActiveUser } from "@/lib/supabase/active-access";

const IAS = ["chatgpt", "claude", "gemini"] as const;
type IA = (typeof IAS)[number];
const CODE = /^F\d{2,3}$/;
const MAX_CODES = 80;

// GET /api/kit?ia=claude&codes=F01,F02 : la « mise en place » (outils,
// prompts, routines) des tâches demandées, pour une IA.
//
// Règle S2 : ce contenu est payant. Il n'est jamais importé par un composant
// client (il finirait dans un fichier JavaScript public) : il passe par cette
// route, qui vérifie la session et l'accès payé.
export async function GET(request: Request) {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;

  const { searchParams } = new URL(request.url);
  const ia = searchParams.get("ia");
  if (!IAS.includes(ia as IA)) {
    return NextResponse.json({ error: "IA inconnue" }, { status: 400 });
  }
  const codes = [...new Set((searchParams.get("codes") ?? "").split(",").filter((c) => CODE.test(c)))];
  if (!codes.length || codes.length > MAX_CODES) {
    return NextResponse.json({ error: "Liste de tâches invalide" }, { status: 400 });
  }

  return NextResponse.json(
    { mise_en_place: miseEnPlacePourCodes(ia as IA, codes) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
