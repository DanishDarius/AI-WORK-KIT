"use client";

import { useEffect, useState } from "react";
import { useMoi } from "@/lib/moi";
import { SUPPORT_EMAIL } from "@/lib/offre";

// Chat du support (tawk.to), chargé uniquement au clic.
// Tant que personne n'ouvre le chat, aucun script tiers n'est chargé et aucun
// cookie tawk.to n'est déposé : pas besoin de bandeau cookies.
// Variables (Vercel) : NEXT_PUBLIC_TAWK_PROPERTY_ID et NEXT_PUBLIC_TAWK_WIDGET_ID,
// visibles dans tawk.to > Administration > Chat Widget (lien du widget :
// https://tawk.to/chat/<PROPERTY_ID>/<WIDGET_ID>). Sans elles, le bouton
// ouvre un email au support.

const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "default";
const EVENEMENT = "aw-support-open";

type TawkApi = {
  visitor?: { name?: string; email?: string };
  onLoad?: () => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  maximize?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

let etat: "absent" | "chargement" | "pret" = "absent";
let emailVisiteur: string | null = null;

function ouvrirEmail() {
  window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Question sur AIW")}`;
}

function charger(onOuvert: (ouvert: boolean) => void) {
  const api: TawkApi = window.Tawk_API || {};
  window.Tawk_API = api;
  window.Tawk_LoadStart = new Date();
  if (emailVisiteur) api.visitor = { name: emailVisiteur, email: emailVisiteur };
  api.onLoad = () => {
    etat = "pret";
    api.showWidget?.();
    api.maximize?.();
  };
  api.onChatMaximized = () => onOuvert(true);
  // Chat refermé : on masque la bulle tawk.to, la nôtre reprend sa place.
  api.onChatMinimized = () => {
    api.hideWidget?.();
    onOuvert(false);
  };
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");
  script.onerror = () => {
    etat = "absent";
    ouvrirEmail();
  };
  document.body.appendChild(script);
  etat = "chargement";
}

// À appeler depuis n'importe quel bouton « Ouvrir le chat ».
export function ouvrirSupport() {
  window.dispatchEvent(new Event(EVENEMENT));
}

export function SupportChat() {
  const moi = useMoi();
  const [ouvert, setOuvert] = useState(false);
  const [attente, setAttente] = useState(false);

  useEffect(() => {
    emailVisiteur = moi?.email ?? null;
  }, [moi]);

  useEffect(() => {
    function ouvrir() {
      if (!PROPERTY_ID) return ouvrirEmail();
      if (etat === "pret") {
        window.Tawk_API?.showWidget?.();
        window.Tawk_API?.maximize?.();
        return;
      }
      if (etat === "chargement") return;
      setAttente(true);
      charger((valeur) => {
        setAttente(false);
        setOuvert(valeur);
      });
    }
    window.addEventListener(EVENEMENT, ouvrir);
    return () => window.removeEventListener(EVENEMENT, ouvrir);
  }, []);

  if (ouvert) return null;
  return (
    <button
      type="button"
      className="aw-support-bubble"
      onClick={ouvrirSupport}
      aria-label="Ouvrir le chat du support"
      aria-busy={attente || undefined}
      title="Une question ? Le support répond 24 h/24, 7 j/7."
    >
      {attente ? (
        <span className="aw-support-spinner" aria-hidden="true" />
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
        </svg>
      )}
    </button>
  );
}

export function BoutonChat({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={ouvrirSupport}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
      </svg>
      {children ?? "Ouvrir le chat"}
    </button>
  );
}
