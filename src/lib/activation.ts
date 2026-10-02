import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

// Envoi du lien d'activation à un acheteur : l'invitation Supabase confirme
// l'adresse, puis conduit à la page /activation où il choisit son mot de
// passe. Utilisé par le webhook de paiement et par le renvoi en libre-service.
//
// - « envoyee » : l'e-mail est parti. Si l'adresse a déjà reçu une invitation
//   sans l'utiliser, Supabase en renvoie une nouvelle.
// - « compte_existant » : l'adresse a déjà un compte activé, rien n'est envoyé.
//   La personne se connecte, ou passe par « Mot de passe oublié ».
// - « echec » : l'e-mail n'est pas parti (limite d'envoi atteinte, service
//   indisponible). Rien n'est perdu : l'accès payé reste, l'envoi se reprend.
export type EnvoiActivation = "envoyee" | "compte_existant" | "echec";

export async function envoyerActivation(
  admin: SupabaseClient,
  email: string,
  origine: string,
): Promise<EnvoiActivation> {
  try {
    const { error } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${origine}/activation`,
    });
    if (!error) return "envoyee";
    const dejaInscrit =
      (error as { code?: string }).code === "email_exists" ||
      /already (been )?registered|already exists/i.test(error.message);
    if (dejaInscrit) return "compte_existant";
    console.error("[activation] envoi impossible", error.message);
    return "echec";
  } catch (erreur) {
    console.error("[activation] envoi impossible", erreur);
    return "echec";
  }
}
