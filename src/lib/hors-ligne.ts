"use client";

// Mode hors ligne, côté page (le service worker est public/sw.js).

// Préfixes des réserves privées du service worker : le document des pages
// réservées et les réponses de l'API. Mêmes noms que dans public/sw.js
// (contrôlé par tests/unitaires/hors-ligne.test.ts).
export const RESERVES_PRIVEES = ["aiw-pages-", "aiw-donnees-"];

// Le compte connecté dans ce navigateur, pour repérer un changement de compte.
const CLE_COMPTE = "aw-compte";

/** Vide les copies gardées pour le mode hors ligne. Jamais d'erreur. */
export async function viderCopiesHorsLigne() {
  try {
    if (!("caches" in window)) return;
    const noms = await caches.keys();
    await Promise.all(noms.filter((nom) => RESERVES_PRIVEES.some((p) => nom.startsWith(p))).map((nom) => caches.delete(nom)));
  } catch {
    // Navigation privée ou stockage fermé : rien n'était gardé.
  }
}

/**
 * Note le compte connecté. Renvoie vrai quand un AUTRE compte était connecté
 * ici avant : ses copies et son profil ne doivent pas servir au nouveau.
 */
export function compteAChange(identifiant: string) {
  try {
    const connu = localStorage.getItem(CLE_COMPTE);
    localStorage.setItem(CLE_COMPTE, identifiant);
    return Boolean(connu && connu !== identifiant);
  } catch {
    return false;
  }
}

export function oublierCompte() {
  try {
    localStorage.removeItem(CLE_COMPTE);
  } catch {
    // Rien à retirer.
  }
}
