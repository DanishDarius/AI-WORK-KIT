import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Toutes les routes sauf les fichiers statiques, les images et les pages
    // publiques statiques (page d'accès, pages légales et vérification d'une
    // attestation, règle C3) : elles sont servies telles quelles, sans
    // exécuter le proxy. C'est la page d'accès qui reçoit le trafic d'un
    // lancement. Le service worker du mode hors ligne (sw.js) est un fichier
    // statique : il passe lui aussi tel quel.
    "/((?!_next/static|_next/image|favicon.ico|sw\\.js$|acces$|conditions$|confidentialite$|mentions-legales$|attestation/[^/]+$|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest)$).*)",
  ],
};
