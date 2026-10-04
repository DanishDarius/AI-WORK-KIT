import { NextResponse } from "next/server";
import { enregistrerPreferences, lirePreferences } from "@/lib/notifications";
import { erreurServeur } from "@/lib/reponses-api";
import { requireActiveUser } from "@/lib/supabase/active-access";

const SANS_CACHE = { headers: { "Cache-Control": "private, no-store" } };

// GET /api/notifications : ce que le client a choisi de recevoir. Une requête
// base, propre au compte.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  if (!access.user.email) return NextResponse.json({ error: "Compte sans adresse" }, { status: 400 });
  try {
    const { email_semaine, rappels_echeance } = await lirePreferences(access.user.email);
    return NextResponse.json({ email_semaine, rappels_echeance }, SANS_CACHE);
  } catch (erreur) {
    return erreurServeur("notifications", erreur);
  }
}

// PUT /api/notifications : enregistre un choix. Body attendu :
// { email_semaine?: boolean, rappels_echeance?: boolean }.
//
// Règle S7 : seuls deux booléens sont acceptés. Règle S13 : une ligne par
// compte (clé primaire), que cette route crée ou remplace.
export async function PUT(request: Request) {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  if (!access.user.email) return NextResponse.json({ error: "Compte sans adresse" }, { status: 400 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const choix: { email_semaine?: boolean; rappels_echeance?: boolean } = {};
  if (typeof body?.email_semaine === "boolean") choix.email_semaine = body.email_semaine;
  if (typeof body?.rappels_echeance === "boolean") choix.rappels_echeance = body.rappels_echeance;
  if (!Object.keys(choix).length) {
    return NextResponse.json({ error: "Choix invalide" }, { status: 400 });
  }

  try {
    await enregistrerPreferences(access.user.email, choix);
  } catch (erreur) {
    return erreurServeur("notifications", erreur);
  }
  return NextResponse.json({ ok: true, ...choix }, SANS_CACHE);
}
