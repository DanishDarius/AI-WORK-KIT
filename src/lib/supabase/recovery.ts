export const RECOVERY_COOKIE = "awk-recovery-pending";

export const recoveryCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  // Le temps de choisir le nouveau mot de passe une fois le lien ouvert.
  maxAge: 60 * 60,
};

// Un lien « mot de passe oublié » vaut une heure après son envoi (règle S14).
// Supabase n'a qu'une durée pour tous ses liens, réglée à 24 heures pour le
// lien d'activation d'un achat : la durée plus courte du mot de passe se
// vérifie donc ici, côté serveur, dans la route /auth/recovery.
export const DUREE_LIEN_MOT_DE_PASSE_MS = 60 * 60 * 1000;

/** Sans date d'envoi lisible, le lien est refusé. */
export function lienMotDePasseValable(envoyeLe: string | null | undefined, maintenant = Date.now()) {
  if (!envoyeLe) return false;
  const envoi = Date.parse(envoyeLe);
  if (Number.isNaN(envoi)) return false;
  return maintenant - envoi <= DUREE_LIEN_MOT_DE_PASSE_MS;
}
