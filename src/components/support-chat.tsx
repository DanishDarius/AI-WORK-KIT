"use client";

import { useEffect, useState } from "react";
import { useAbonne, useMoi } from "@/lib/moi";
import { SUPPORT_EMAIL } from "@/lib/offre";
import { Icon } from "./icon";

// Chat du support (tawk.to), réservé aux abonnés et chargé uniquement au clic.
// Les clients de l'accès seul écrivent au support par e-mail.
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
function ouvrirSupport() {
  window.dispatchEvent(new Event(EVENEMENT));
}

export function SupportChat() {
  const abonne = useAbonne();
  return abonne ? <BulleChat /> : null;
}

function BulleChat() {
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
      className="support-bubble"
      onClick={ouvrirSupport}
      aria-label="Ouvrir le chat du support"
      aria-busy={attente || undefined}
      title="Une question ? Le support répond 24 h/24, 7 j/7."
    >
      {attente ? (
        <span className="support-spinner" aria-hidden="true" />
      ) : (
        <Icon name="chat" size={26} strokeWidth={2.2} />
      )}
    </button>
  );
}

function BoutonChat({ className = "btn", children }: { className?: string; children?: React.ReactNode }) {
  const abonne = useAbonne();
  if (!abonne)
    return (
      <a className={className} href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Question sur AIW")}`}>
        <Icon name="mail" size={18} />
        Écrire au support
      </a>
    );
  return (
    <button type="button" className={className} onClick={ouvrirSupport}>
      <Icon name="chat" size={18} />
      {children ?? "Ouvrir le chat"}
    </button>
  );
}

// Bouton de chat affiché seulement aux abonnés (rien pour les autres).
export function ChatSiAbonne({ className = "btn btn-secondary btn-plain" }: { className?: string }) {
  const abonne = useAbonne();
  return abonne ? <BoutonChat className={className}>Ouvrir le chat</BoutonChat> : null;
}
