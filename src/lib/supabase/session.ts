import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

// Identité de la personne connectée, lue dans le jeton de session.
//
// Règle C2 : la session se vérifie SANS appel réseau. `getClaims()` contrôle
// la signature du jeton avec la clé publique du projet (clé asymétrique ES256,
// gardée en mémoire par la bibliothèque) au lieu d'interroger le serveur
// d'authentification à chaque requête comme le fait `getUser()`.
//
// Ce que cela change : une session fermée ailleurs reste valable jusqu'à
// l'expiration du jeton (une heure au plus). Ce n'est pas elle qui ouvre le
// contenu : l'accès payé est revérifié en base (src/lib/acces-actif.ts).
//
// Pour une opération sensible sur le compte lui-même (changement de mot de
// passe), on garde `getUser()` : voir src/app/auth/recovery/route.ts.
export type Session = { id: string; email: string };

type ClientAuth = Pick<SupabaseClient, "auth">;

export async function lireSession(supabase: ClientAuth): Promise<Session | null> {
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims) return null;
  // Seul un compte réel, connecté par e-mail, compte comme une session.
  if (claims.role !== "authenticated" || claims.is_anonymous === true) return null;
  if (typeof claims.sub !== "string" || !claims.sub) return null;
  if (typeof claims.email !== "string" || !claims.email) return null;
  return { id: claims.sub, email: claims.email };
}
