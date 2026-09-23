import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

// GET /auth/confirm : point d'arrivée du lien magique (invitation d'achat ou
// reconnexion) envoyé par Supabase Auth.
//
// Ce lien ne fonctionne PAS tout seul : il faut que le modèle d'email "Invite
// user" (et "Magic Link" si utilisé un jour) dans Supabase Dashboard →
// Authentication → Email Templates pointe vers cette route, au lieu du lien
// par défaut {{ .ConfirmationURL }}. Remplacer le corps du lien par :
//
//   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type={{ .Type }}&next=/
//
// Sans ce changement de modèle, le clic sur le lien renvoie l'acheteur vers
// le domaine *.supabase.co qui affiche une page de vérification neutre au
// lieu d'ouvrir une session dans l'application.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Lien invalide, expiré ou déjà utilisé.
  return NextResponse.redirect(
    `${origin}/?erreur_connexion=1`
  );
}
