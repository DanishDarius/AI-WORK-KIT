"use client";

import { useState, useSyncExternalStore } from "react";

function subscribeSavedGuides(callback: () => void) {
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
    () => (JSON.parse(localStorage.getItem("awk-saved-guides") ?? "[]") as string[]).includes(slug),
    () => false,
  );

  function toggleSaved() {
    const savedGuides = new Set(JSON.parse(localStorage.getItem("awk-saved-guides") ?? "[]") as string[]);
    if (savedGuides.has(slug)) savedGuides.delete(slug);
    else savedGuides.add(slug);
    localStorage.setItem("awk-saved-guides", JSON.stringify(Array.from(savedGuides)));
    window.dispatchEvent(new Event("awk-guides-updated"));
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
