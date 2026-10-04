import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { estCookieDeSession } from "@/lib/supabase/cookie-session";
import { RECOVERY_COOKIE } from "@/lib/supabase/recovery";
import { lireSession } from "@/lib/supabase/session";

// Rafraichit la session Supabase a chaque requete et repropage les cookies
// mis a jour. Necessaire avec @supabase/ssr en Next.js : sans ce middleware,
// un jeton de session arrive a expiration ne se renouvelle jamais tout seul
// cote serveur, et l'utilisateur se retrouve deconnecte sans raison visible.
//
// Cout (regle C2) : aucun appel reseau tant que le jeton est valable. Le
// jeton est verifie sur place (lireSession) ; le serveur d'authentification
// n'est joint que pour le renouveler, environ une fois par heure. Un visiteur
// sans cookie de session ne declenche aucun travail.
//
// Controle d'acces : tant qu'elle n'est pas authentifiee, une personne ne
// peut atteindre que les pages publiques ci-dessous (connexion, mot de passe
// oublie/nouveau, activation du compte, confirmation par email) ; toute
// autre page redirige vers /acces (présentation et paiement). Une fois connectee, /connexion et
// /mot-de-passe-oublie redirigent vers l'accueil pour eviter de revoir le
// formulaire de connexion inutilement. /nouveau-mot-de-passe et /activation
// restent accessibles meme authentifiee : ces pages s'appuient sur la
// session temporaire creee par le lien recu par email.
const PUBLIC_PATHS = [
  // Page d'accès : la seule page de présentation visible sans compte.
  "/acces",
  "/connexion",
  "/mot-de-passe-oublie",
  "/nouveau-mot-de-passe",
  "/activation",
  "/auth",
  // Lien « ne plus recevoir » de l'e-mail de la semaine : ouvert depuis la
  // messagerie, sans connexion.
  "/desabonnement",
  // Pages légales : lisibles avant tout achat ou connexion.
  "/mentions-legales",
  "/conditions",
  "/confidentialite",
];

const AUTH_ONLY_PATHS = ["/connexion", "/mot-de-passe-oublie"];

function matchesPath(pathname: string, paths: string[]) {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function aUnCookieDeSession(request: NextRequest) {
  return request.cookies.getAll().some((c) => estCookieDeSession(c.name));
}

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");
  const isPublic = isApiRoute || matchesPath(pathname, PUBLIC_PATHS);

  // Visiteur sans session : rien a verifier ni a renouveler. Les routes API
  // repondent elles-memes 401 (requireActiveUser).
  if (!aUnCookieDeSession(request)) {
    if (isPublic) return NextResponse.next({ request });
    const url = request.nextUrl.clone();
    url.pathname = "/acces";
    url.search = "";
    return NextResponse.redirect(url);
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Ne pas retirer : c'est cet appel qui renouvelle le jeton aupres de
  // Supabase quand il arrive a expiration, et qui repose les cookies.
  const user = await lireSession(supabase);

  // Le lien de récupération crée une session Supabase. Elle sert uniquement
  // à définir un nouveau mot de passe, pas à parcourir l'application.
  const recoveryPending = Boolean(
    user && request.cookies.get(RECOVERY_COOKIE)?.value === user.id,
  );
  if (
    recoveryPending &&
    !matchesPath(pathname, ["/nouveau-mot-de-passe", "/auth"])
  ) {
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Terminez la réinitialisation du mot de passe." },
        { status: 403 },
      );
    }
    const url = request.nextUrl.clone();
    url.pathname = "/nouveau-mot-de-passe";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/acces";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (user && matchesPath(pathname, AUTH_ONLY_PATHS)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
