// Service worker d'AIW : le mode hors ligne (plan produit, chantier 4).
//
// But : une page, une tâche, un kit ou un guide déjà ouvert avec une connexion
// reste lisible sans connexion. Rien d'autre : pas de notification, pas de
// téléchargement à l'avance, aucune requête vers un autre site.
//
// Ce fichier ne contient aucun contenu payant (règle S2). Ce qu'il garde vient
// des pages et des routes protégées que le client a lui-même ouvertes, et reste
// dans son navigateur. Les copies sont vidées à la déconnexion, au changement
// de compte, et dès que le serveur répond que la session ou l'accès n'est plus
// valable.
//
// Trois réserves :
// - statique : les fichiers du site. Ceux de /_next/static ne changent pas de
//   contenu sans changer de nom : la réserve passe d'abord. Ceux de /brand
//   (logo, icônes) gardent leur nom : le réseau passe d'abord ;
// - pages    : le document des pages réservées, relu sur le réseau d'abord ;
// - donnees  : les réponses des lectures de l'API, relues sur le réseau d'abord.
// Les écritures (tâche faite, favori, profil) ne passent jamais par ici : sans
// connexion, elles échouent et l'écran le dit.

const VERSION = "v1";
const PREFIXE = "aiw-";
const CACHE_STATIQUE = `${PREFIXE}statique-${VERSION}`;
const CACHE_PAGES = `${PREFIXE}pages-${VERSION}`;
const CACHE_DONNEES = `${PREFIXE}donnees-${VERSION}`;
const CACHES_PRIVES = [CACHE_PAGES, CACHE_DONNEES];
const CACHES_CONNUS = [CACHE_STATIQUE, CACHE_PAGES, CACHE_DONNEES];

// Tailles bornées : au-delà, les copies les plus anciennes partent.
const MAX_STATIQUE = 150;
const MAX_PAGES = 60;
const MAX_DONNEES = 150;

// Avec une copie en réserve, on n'attend pas le réseau plus longtemps.
const DELAI_RESEAU_MS = 6000;

// Pages visibles sans compte : jamais gardées, jamais servies d'ici.
const PAGES_PUBLIQUES = ["/acces", "/connexion", "/mot-de-passe-oublie", "/nouveau-mot-de-passe", "/activation", "/auth", "/desabonnement", "/conditions", "/confidentialite", "/mentions-legales"];
// Arriver sur l'une d'elles veut dire que le compte n'est plus connecté.
const PAGES_SANS_SESSION = ["/acces", "/connexion"];

// Lectures de l'API gardées pour le mode hors ligne. Les fichiers à
// télécharger (kits, PDF des guides) n'en font pas partie.
const LECTURES = [
  /^\/api\/catalogue$/,
  /^\/api\/metiers(\/[a-z0-9-]+)?$/,
  /^\/api\/taches\/[0-9a-f-]{36}$/,
  /^\/api\/kits\/[a-z0-9-]+$/,
  /^\/api\/kit$/,
  /^\/api\/progression$/,
  /^\/api\/favoris$/,
  /^\/api\/moi$/,
  /^\/api\/profil$/,
  /^\/api\/nouveau$/,
];

function sousChemin(chemin, liste) {
  return liste.some((p) => chemin === p || chemin.startsWith(`${p}/`));
}

// Ce que le service worker fait d'une requête :
// - "statique" : la réserve d'abord, le réseau sinon ;
// - "marque"   : le réseau d'abord, la réserve si le réseau manque ;
// - "page"     : le réseau d'abord, la réserve si le réseau manque ;
// - "donnees"  : le réseau d'abord, la réserve si le réseau manque ;
// - "sortie"   : page sans session, laissée au réseau, les copies privées sont vidées ;
// - "visite"   : navigation dans l'application, laissée au réseau ; le document
//                de la page est gardé à part pour une ouverture sans connexion ;
// - "reseau"   : rien à faire, le navigateur s'en occupe.
function decider(requete, origine) {
  if (requete.method !== "GET") return "reseau";
  const url = new URL(requete.url);
  if (url.origin !== origine) return "reseau";
  const chemin = url.pathname;

  if (chemin.startsWith("/_next/static/")) return "statique";
  if (chemin.startsWith("/brand/")) return "marque";
  if (LECTURES.some((motif) => motif.test(chemin))) return "donnees";
  if (chemin.startsWith("/api/") || chemin.startsWith("/_next/")) return "reseau";

  if (requete.mode === "navigate") {
    if (sousChemin(chemin, PAGES_SANS_SESSION)) return "sortie";
    return sousChemin(chemin, PAGES_PUBLIQUES) ? "reseau" : "page";
  }

  // Navigation à l'intérieur de l'application (Next demande un morceau de
  // page, pas un document). Un préchargement de lien n'est pas une visite.
  if (requete.headers.get("rsc") && !requete.headers.get("next-router-prefetch") && !requete.headers.get("next-router-segment-prefetch")) {
    return sousChemin(chemin, PAGES_PUBLIQUES) ? "reseau" : "visite";
  }
  return "reseau";
}

// Adresse du document d'une page, sans le paramètre technique de Next.
function adresseDocument(adresse) {
  const url = new URL(adresse);
  url.searchParams.delete("_rsc");
  return url.href;
}

function estHtml(reponse) {
  return (reponse.headers.get("content-type") || "").includes("text/html");
}

async function garder(nomCache, adresse, reponse, max) {
  const cache = await caches.open(nomCache);
  // Retirée puis remise : la copie redevient la plus récente.
  await cache.delete(adresse);
  await cache.put(adresse, reponse);
  const cles = await cache.keys();
  for (const cle of cles.slice(0, Math.max(0, cles.length - max))) await cache.delete(cle);
}

async function viderPrive() {
  await Promise.all(CACHES_PRIVES.map((nom) => caches.delete(nom)));
}

function apres(ms) {
  return new Promise((resoudre) => setTimeout(resoudre, ms));
}

const PAGE_HORS_LIGNE = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hors connexion | AIW</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f6f8f7;color:#17211f;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.55}
main{max-width:460px;margin:24px;padding:28px;background:#fff;border:2px solid #e2e8e5;border-bottom-width:4px;border-radius:20px}
h1{margin:0 0 12px;font-size:24px;line-height:1.25}
p{margin:0 0 14px;color:#56615e;font-size:16px}
a,button{display:inline-block;margin:6px 10px 0 0;padding:12px 18px;border-radius:14px;border:2px solid #0b6b5e;background:#0b6b5e;color:#fff;font:inherit;font-weight:700;text-decoration:none;cursor:pointer}
a{background:#fff;color:#0b6b5e}
</style>
</head>
<body>
<main>
<h1>Vous êtes hors connexion.</h1>
<p>Cette page n’a pas encore été ouverte avec une connexion : elle ne peut pas s’afficher pour le moment.</p>
<p>Les pages, les tâches, les kits et les guides que vous avez déjà ouverts restent lisibles.</p>
<button type="button" onclick="location.reload()">Réessayer</button>
<a href="/">Revenir à l’accueil</a>
</main>
</body>
</html>`;

function pageHorsLigne() {
  return new Response(PAGE_HORS_LIGNE, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

async function servirStatique(requete) {
  const cache = await caches.open(CACHE_STATIQUE);
  const connue = await cache.match(requete.url);
  if (connue) return connue;
  const reponse = await fetch(requete);
  if (reponse.ok) await garder(CACHE_STATIQUE, requete.url, reponse.clone(), MAX_STATIQUE);
  return reponse;
}

async function servirReseauPuisReserve(requete, nomCache, max, prive) {
  try {
    const reponse = await fetch(requete);
    // Session expirée ou accès retiré : plus rien de privé ne reste ici.
    if (prive && (reponse.status === 401 || reponse.status === 403)) await viderPrive();
    else if (reponse.ok) await garder(nomCache, requete.url, reponse.clone(), max);
    return reponse;
  } catch (erreur) {
    const connue = await (await caches.open(nomCache)).match(requete.url);
    if (connue) return connue;
    throw erreur;
  }
}

// Le document d'une page réservée. Une redirection (vers la page d'accès,
// par exemple) n'est jamais gardée : seule une page réellement rendue l'est.
async function servirPage(requete, attendre) {
  const adresse = requete.url;
  const reseau = fetch(requete).then(async (reponse) => {
    if (reponse.ok && reponse.type === "basic" && !reponse.redirected && estHtml(reponse)) {
      await garder(CACHE_PAGES, adresse, reponse.clone(), MAX_PAGES);
    }
    return reponse;
  });
  // La mise en réserve se termine même si la copie a déjà été servie.
  attendre(reseau.catch(() => undefined));

  const connue = await (await caches.open(CACHE_PAGES)).match(adresse);
  try {
    if (!connue) return await reseau;
    return await Promise.race([reseau, apres(DELAI_RESEAU_MS).then(() => connue)]);
  } catch {
    return connue || pageHorsLigne();
  }
}

// Une page visitée dans l'application : on garde son document une fois, pour
// qu'elle s'ouvre sans connexion. Jamais quand le client a demandé au
// navigateur d'économiser ses données.
async function garderDocument(adresseVisitee) {
  if (self.navigator && self.navigator.connection && self.navigator.connection.saveData) return;
  const adresse = adresseDocument(adresseVisitee);
  const cache = await caches.open(CACHE_PAGES);
  if (await cache.match(adresse)) return;
  const reponse = await fetch(adresse, { credentials: "same-origin", headers: { Accept: "text/html" } });
  if (reponse.ok && reponse.type === "basic" && !reponse.redirected && estHtml(reponse)) {
    await garder(CACHE_PAGES, adresse, reponse, MAX_PAGES);
  }
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Les réserves d'une version précédente partent.
      const noms = await caches.keys();
      await Promise.all(noms.filter((nom) => nom.startsWith(PREFIXE) && !CACHES_CONNUS.includes(nom)).map((nom) => caches.delete(nom)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const decision = decider(event.request, self.location.origin);
  if (decision === "statique") event.respondWith(servirStatique(event.request));
  else if (decision === "marque") event.respondWith(servirReseauPuisReserve(event.request, CACHE_STATIQUE, MAX_STATIQUE, false));
  else if (decision === "donnees") event.respondWith(servirReseauPuisReserve(event.request, CACHE_DONNEES, MAX_DONNEES, true));
  else if (decision === "page") event.respondWith(servirPage(event.request, (promesse) => event.waitUntil(promesse)));
  else if (decision === "sortie") event.waitUntil(viderPrive());
  else if (decision === "visite") event.waitUntil(garderDocument(event.request.url).catch(() => undefined));
});

// L'application demande de tout vider (déconnexion, changement de compte).
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "vider") event.waitUntil(viderPrive());
});
