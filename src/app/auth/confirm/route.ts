import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { cheminInterne } from "@/lib/normaliser";

// GET /auth/confirm : point d'arrivée d'un lien d'e-mail en « token_hash »
// (invitation d'achat, reconnexion).
//
// Aujourd'hui, les modèles d'e-mail de Supabase (Authentication → Emails →
// Templates) utilisent le lien par défaut {{ .ConfirmationURL }} : il passe
// par le domaine *.supabase.co, puis revient sur /activation, où
// src/components/session-from-hash.tsx ouvre la session.
//
// Cette route sert si l'on fait pointer les modèles directement sur le site,
// pour que le lien de l'e-mail porte notre domaine :
//
//   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type={{ .Type }}&next=/activation
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  // Règle S6 : « next » ne peut désigner qu'un chemin du site.
  const next = cheminInterne(searchParams.get("next"));

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  // Lien invalide, expiré ou déjà utilisé.
  return NextResponse.redirect(
    `${origin}/?erreur_connexion=1`
  );
}
