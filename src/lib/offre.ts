// Offre commerciale AIW, partagée entre le serveur et le navigateur.
//
// - Accès AIW : paiement unique (vendu sur la page de vente). Donne la
//   plateforme, les Tâches, les Métiers et les 10 guides listés ci-dessous.
// - Abonnement Bibliothèque : mensuel ou annuel, présenté uniquement dans la
//   PWA. Ouvre tous les guides et la « tâche sur mesure » de chaque métier.

// Numéros des guides inclus dans l'accès (sans abonnement).
export const GUIDES_INCLUS: readonly number[] = [
  // Les plus recherchés
  292, // Planificateur de repas et de courses
  105, // Comparatif des applications de prise de notes IA
  203, // Quinze mots essentiels du vocabulaire IA
  // Les autres
  18,
  11,
  91,
  148,
  115,
  217,
  239,
];

const inclus = new Set(GUIDES_INCLUS);

export function guideInclus(numero: number) {
  return inclus.has(numero);
}

export const PRIX = {
  acces: 5000,
  mensuel: 5000,
  annuel: 50000,
} as const;

export function fcfa(montant: number) {
  // Espace fine insécable comme séparateur de milliers : « 50 000 FCFA ».
  return `${new Intl.NumberFormat("fr-FR").format(montant).replace(/\s/g, " ")} FCFA`;
}

export const SUPPORT_EMAIL = "support@parlonsads.com";

// Lien de souscription. Tant qu'aucun prestataire de paiement n'est branché,
// la demande part par email au support.
export const LIEN_ABONNEMENT =
  process.env.NEXT_PUBLIC_SUBSCRIBE_URL ||
  `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Abonnement Bibliothèque AIW")}&body=${encodeURIComponent("Bonjour, je souhaite m’abonner à la Bibliothèque AIW (formule mensuelle ou annuelle, à préciser).")}`;

export type Abonnement = {
  actif: boolean;
  periode: "mensuel" | "annuel" | null;
  statut: "actif" | "resilie" | "expire" | null;
  fin_le: string | null;
};

export const SANS_ABONNEMENT: Abonnement = {
  actif: false,
  periode: null,
  statut: null,
  fin_le: null,
};

export function dateLongue(iso: string | null | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(date);
}
