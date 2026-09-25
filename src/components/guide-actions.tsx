"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const CLE = "awk-saved-guides";

// Renvoie la chaîne brute (valeur stable pour useSyncExternalStore).
export function lireGuidesEnregistres() {
  try {
    return localStorage.getItem(CLE) ?? "[]";
  } catch {
    return "[]";
  }
}

function ecrireGuidesEnregistres(slugs: string[]) {
  try {
    localStorage.setItem(CLE, JSON.stringify(slugs));
  } catch {
    // Stockage indisponible (navigation privée) : rien à faire.
  }
  window.dispatchEvent(new Event("awk-guides-updated"));
}

function slugsEnregistres(): string[] {
  try {
    const v = JSON.parse(lireGuidesEnregistres());
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function retirerGuideEnregistre(slug: string) {
  ecrireGuidesEnregistres(slugsEnregistres().filter((s) => s !== slug));
}

export function subscribeSavedGuides(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("awk-guides-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("awk-guides-updated", callback);
  };
}

export function GuideActions({ slug }: { slug: string }) {
  const saved = useSyncExternalStore(
    subscribeSavedGuides,
    () => slugsEnregistres().includes(slug),
    () => false,
  );

  function toggleSaved() {
    const slugs = slugsEnregistres();
    ecrireGuidesEnregistres(
      slugs.includes(slug) ? slugs.filter((s) => s !== slug) : [...slugs, slug],
    );
  }

  return (
    <div className="aw-guide-actions">
      <button type="button" className="aw-guide-save" aria-pressed={saved} onClick={toggleSaved}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.8h12v16.4l-6-3.8-6 3.8z" /></svg>
        {saved ? "Enregistré" : "Enregistrer"}
      </button>
      <button type="button" className="aw-guide-download" onClick={() => window.print()}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 20h14" /></svg>
        Télécharger le PDF
      </button>
      {saved && (
        <Link className="aw-guide-saved-link" href="/favoris#guides-enregistres">
          Retrouver dans Mes favoris <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

export function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <button type="button" onClick={copy}>{copied ? "Prompt copié" : "Copier le prompt"}</button>;
}
