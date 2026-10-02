import "server-only";

import { NextResponse } from "next/server";

// Règle S8 : le client reçoit un message générique, le détail technique va
// dans les logs du serveur. Ne jamais renvoyer error.message au navigateur.
export function erreurServeur(
  etiquette: string,
  detail: unknown,
  message = "Une erreur est survenue. Réessayez dans un instant.",
) {
  console.error(`[${etiquette}]`, detail instanceof Error ? detail.message : detail);
  return NextResponse.json({ error: message }, { status: 500 });
}
