// Les vidéos d'AIW (tâches, kits, ressources, premiers pas, page d'accès)
// sont hébergées chez Bunny Stream, dans une seule bibliothèque. Elles se
// lisent dans la page, par le lecteur de Bunny, chargé seulement au clic.
// Aucune dépendance : utilisable côté serveur, dans le navigateur et dans les tests.
//
// En base, une vidéo est l'adresse de son lecteur, telle que Bunny la donne :
//   https://player.mediadelivery.net/embed/772541/<identifiant de la vidéo>
// Toute autre adresse est écartée : rien ne s'affiche.

/** La bibliothèque « AIW » chez Bunny Stream. Un numéro public, pas un secret. */
export const BIBLIOTHEQUE_VIDEOS = "772541";
export const HOTE_LECTEUR = "https://player.mediadelivery.net";

const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const ADRESSE = /^https:\/\/(?:player|iframe)\.mediadelivery\.net\/(?:embed|play)\/(\d{1,12})\/([0-9a-f-]{36})\/?$/;

/** L'identifiant d'une vidéo, s'il a la forme attendue. */
export function idVideo(valeur: unknown): string | null {
  const id = typeof valeur === "string" ? valeur.trim().toLowerCase() : "";
  return ID.test(id) ? id : null;
}

/** L'identifiant de la vidéo que désigne une adresse de lecteur, ou null si l'adresse n'est pas une vidéo d'AIW. */
export function lireVideo(adresse: unknown): string | null {
  if (typeof adresse !== "string") return null;
  const trouve = ADRESSE.exec(adresse.trim().toLowerCase());
  if (!trouve || trouve[1] !== BIBLIOTHEQUE_VIDEOS) return null;
  return idVideo(trouve[2]);
}

/** L'adresse rangée en base et envoyée au navigateur : toujours la même forme. */
export function adresseVideo(id: string): string {
  return `${HOTE_LECTEUR}/embed/${BIBLIOTHEQUE_VIDEOS}/${id}`;
}

/** Une adresse de vidéo lue en base, remise en forme ; null si ce n'est pas une vidéo d'AIW. */
export function videoValide(adresse: unknown): string | null {
  const id = lireVideo(adresse);
  return id ? adresseVideo(id) : null;
}

/** L'adresse du cadre du lecteur : lecture lancée (le client vient de cliquer), interface en français. */
export function adresseLecteur(id: string): string {
  return `${adresseVideo(id)}?autoplay=true&preload=true&lang=fr`;
}
