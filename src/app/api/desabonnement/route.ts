import { NextResponse } from "next/server";
import { desabonnerParJeton } from "@/lib/notifications";
import { estUuid } from "@/lib/normaliser";

// POST /api/desabonnement : le lien « ne plus recevoir » de l'e-mail de la
// semaine. Body attendu : { "jeton": "<uuid>" }.
//
// Route publique par nature : le client clique depuis sa messagerie, sans
// être connecté. Le jeton (un identifiant aléatoire propre à chaque adresse,
// reçu dans l'e-mail) tient lieu de preuve. La réponse est la même que le
// jeton existe ou non. La route ne crée aucune ligne (règle S13) : elle ne
// peut que couper l'e-mail de la semaine d'une ligne existante.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { jeton?: unknown } | null;
  if (!estUuid(body?.jeton)) {
    return NextResponse.json({ error: "Lien invalide" }, { status: 400 });
  }
  try {
    await desabonnerParJeton(body.jeton);
  } catch (erreur) {
    console.error("[desabonnement]", erreur instanceof Error ? erreur.message : erreur);
    return NextResponse.json({ error: "Une erreur est survenue. Réessayez dans un instant." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
