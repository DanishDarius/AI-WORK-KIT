import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Toutes les routes sauf les fichiers statiques, les images et les pages
    // publiques statiques (page d'accès et pages légales, règle C3) : elles
    // sont servies telles quelles, sans exécuter le proxy. C'est la page
    // d'accès qui reçoit le trafic d'un lancement.
    "/((?!_next/static|_next/image|favicon.ico|acces$|conditions$|confidentialite$|mentions-legales$|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)",
  ],
};
