"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

// Filet de sécurité pour la connexion par lien magique / invitation.
//
// Tant que le SMTP personnalisé n'est pas configuré dans Supabase (voir
// Authentication → Emails → un bandeau "Set up custom SMTP to edit
// templates" bloque l'édition), le modèle d'email par défaut renvoie le
// client vers le site avec la session dans le FRAGMENT d'URL
// (#access_token=...&refresh_token=...&type=invite), pas vers une route
// serveur — voir la doc Supabase "Redirecting the user to a server-side
// endpoint". Un fragment n'est jamais envoyé au serveur : seul le
// navigateur peut le lire, d'où ce composant client.
//
// Dès que le SMTP personnalisé sera en place, le modèle "Invite user"
// pourra être changé pour pointer vers /auth/confirm (déjà prêt côté
// serveur) — plus propre et fonctionne aussi avec les clients mail qui
// pré-chargent les liens (Outlook Safe Links, etc.). Ce composant restera
// alors un filet de sécurité inoffensif pour d'anciens liens déjà envoyés.
export function SessionFromHash() {
  useEffect(() => {
    if (!window.location.hash.includes("access_token")) return;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    if (!access_token || !refresh_token) return;

    createClient()
      .auth.setSession({ access_token, refresh_token })
      .finally(() => {
        // Nettoie l'URL pour ne pas laisser les jetons visibles ou
        // réutilisés (historique, partage accidentel du lien, etc.).
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      });
  }, []);

  return null;
}
