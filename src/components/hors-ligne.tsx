"use client";

import { useEffect, useSyncExternalStore } from "react";
import { compteAChange, viderCopiesHorsLigne } from "@/lib/hors-ligne";
import { oublierProfil } from "@/lib/profil";
import { createClient } from "@/lib/supabase/client";

function abonner(rappel: () => void) {
  window.addEventListener("online", rappel);
  window.addEventListener("offline", rappel);
  return () => {
    window.removeEventListener("online", rappel);
    window.removeEventListener("offline", rappel);
  };
}

// Mode hors ligne (plan produit, chantier 4). Posé dans le layout des pages
// réservées : il installe le service worker (public/sw.js), prévient quand la
// connexion manque, et vide les copies d'un autre compte.
export function HorsLigne() {
  const enLigne = useSyncExternalStore(abonner, () => navigator.onLine, () => true);

  useEffect(() => {
    // En développement, un service worker garderait d'anciennes pages.
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => undefined);
  }, []);

  useEffect(() => {
    // Sans connexion, la session ne se lit pas de façon sûre : on ne touche à rien.
    if (!navigator.onLine || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return;
    let actif = true;
    createClient()
      .auth.getSession()
      .then(({ data }) => {
        const identifiant = data.session?.user.id;
        if (!actif || !identifiant || !compteAChange(identifiant)) return;
        // Un autre compte s'est connecté ici : ses copies et son profil partent.
        oublierProfil();
        void viderCopiesHorsLigne();
      })
      .catch(() => undefined);
    return () => {
      actif = false;
    };
  }, []);

  if (enLigne) return null;
  return (
    <p className="offline-banner" role="status">
      Vous êtes hors connexion. Les pages déjà ouvertes restent lisibles ; rien ne s’enregistre tant que la connexion n’est pas revenue.
    </p>
  );
}
