import { SIGLE, SITE } from "@/lib/marque";

// Ce qui est public dans une attestation obtenue (étape D, document « AIW :
// attestations par métier, grille et exercices finaux », validé le
// 10 octobre 2026) : son numéro, le nom, le métier et la date. Rien d'autre
// ne sort d'un rendu : ni fichiers, ni note, ni commentaire.

/** Le numéro d'une attestation, donné par la base (migration 0055). */
export const NUMERO_ATTESTATION = /^AIW-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/;

/** Numéro lu dans une adresse : en majuscules, validé avant toute requête (règle S7). */
export function numeroValide(valeur: unknown): string | null {
  if (typeof valeur !== "string" || valeur.length > 40) return null;
  const numero = valeur.trim().toUpperCase();
  return NUMERO_ATTESTATION.test(numero) ? numero : null;
}

// Les signes que les polices de l'attestation savent écrire (Nunito et
// Varela Round, jeu « latin ») : lettres latines, accents du français et des
// langues voisines, espaces, apostrophes, traits d'union et points.
export const NOM_ECRIVABLE = /^[A-Za-zÀ-ÖØ-öø-ÿŒœ' ’.-]+$/;
export const MESSAGE_NOM = "Le nom ne peut contenir que des lettres (accents compris), des espaces, des apostrophes, des traits d’union et des points.";

/** Le texte de l'attestation, tel que le document validé l'écrit. */
export const texteAttestation = (metier: string) => `Attestation de compétences IA, métier ${metier}, délivrée par ${SIGLE}`;

/** Date de l'attestation : le jour de la décision du correcteur. */
export const dateAttestation = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(iso));

export const lienVerification = (numero: string) => `${SITE}/attestation/${numero}`;

/** Le lien « Ajouter à LinkedIn » (paramètres publiés par LinkedIn sur addtoprofile.linkedin.com). */
export function lienLinkedIn({ metier, numero, delivreeLe }: { metier: string; numero: string; delivreeLe: string }) {
  const date = new Date(delivreeLe);
  const parametres = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: `Attestation de compétences IA, métier ${metier}`,
    organizationName: SIGLE,
    issueYear: String(date.getUTCFullYear()),
    issueMonth: String(date.getUTCMonth() + 1),
    certUrl: lienVerification(numero),
    certId: numero,
  });
  return `https://www.linkedin.com/profile/add?${parametres.toString()}`;
}
