// Petites fonctions de validation et de normalisation partagées par le
// serveur et le navigateur. Aucune dépendance : utilisable partout.

/** Texte en minuscules et sans accents, pour comparer des recherches. */
export function sansAccents(texte: string) {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** Texte saisi dans un formulaire : chaîne uniquement, sans espaces autour, longueur bornée. */
export function texteBorne(valeur: unknown, max: number) {
  return typeof valeur === "string" ? valeur.trim().slice(0, max) : "";
}

/** E-mail tel qu'il est stocké et comparé : sans espaces autour, en minuscules. */
export function normaliserEmail(email: string) {
  return email.trim().toLowerCase();
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Vrai si la valeur est une adresse e-mail plausible (chaîne, longueur bornée). */
export function estEmail(valeur: unknown): valeur is string {
  return typeof valeur === "string" && valeur.length <= 254 && EMAIL.test(valeur.trim());
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Vrai si la valeur est un identifiant UUID. À vérifier avant toute requête. */
export function estUuid(valeur: unknown): valeur is string {
  return typeof valeur === "string" && UUID.test(valeur);
}

/**
 * Chemin interne sûr pour une redirection. Tout ce qui n'est pas un chemin du
 * site (autre domaine, « // », « /\ », schéma) est remplacé par le repli.
 */
export function cheminInterne(valeur: string | null | undefined, repli = "/") {
  if (!valeur || !valeur.startsWith("/") || valeur.startsWith("//") || valeur.includes("\\")) return repli;
  try {
    const base = "https://interne.invalid";
    const url = new URL(valeur, base);
    if (url.origin !== base) return repli;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return repli;
  }
}
