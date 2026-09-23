import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rafraichit la session Supabase a chaque requete et repropage les cookies
// mis a jour. Necessaire avec @supabase/ssr en Next.js : sans ce middleware,
// un jeton de session arrive a expiration ne se renouvelle jamais tout seul
// cote serveur, et l'utilisateur se retrouve deconnecte sans raison visible.
//
// Controle d'acces : tant qu'elle n'est pas authentifiee, une personne ne
// peut atteindre que les pages publiques ci-dessous (connexion, mot de passe
// oublie/nouveau, activation du compte, confirmation par email) ; toute
// autre page redirige vers /connexion. Une fois connectee, /connexion et
// /mot-de-passe-oublie redirigent vers l'accueil pour eviter de revoir le
// formulaire de connexion inutilement. /nouveau-mot-de-passe et /activation
// restent accessibles meme authentifiee : ces pages s'appuient sur la
// session temporaire creee par le lien recu par email.
const PUBLIC_PATHS = [
  "/connexion",
  "/mot-de-passe-oublie",
  "/nouveau-mot-de-passe",
  "/activation",
  "/auth",
];

const AUTH_ONLY_PATHS = ["/connexion", "/mot-de-passe-oublie"];

function matchesPath(pathname: string, paths: string[]) {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export async function updateSession(request: NextRequest) {
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

  // Ne pas retirer : necessaire pour declencher le rafraichissement du
  // jeton aupres de Supabase avant qu'il n'expire.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");
  const isPublic = isApiRoute || matchesPath(pathname, PUBLIC_PATHS);

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
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
