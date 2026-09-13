import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rafraîchit la session Supabase à chaque requête et repropage les cookies
// mis à jour. Nécessaire avec @supabase/ssr en Next.js : sans ce middleware,
// un jeton de session arrivé à expiration ne se renouvelle jamais tout seul
// côté serveur, et l'utilisateur se retrouve déconnecté sans raison visible.
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

  // Ne pas retirer : nécessaire pour déclencher le rafraîchissement du
  // jeton auprès de Supabase avant qu'il n'expire.
  await supabase.auth.getUser();

  return response;
}
