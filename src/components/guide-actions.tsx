"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GuideCover } from "./guide-cover";

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

type DownloadPhase = "loading" | "ready" | "downloading" | "error" | "started";

function GuideDownloadDialog({ number, slug, title, tool, variant, onClose }: {
  number: number;
  slug: string;
  title: string;
  tool: string;
  variant: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<DownloadPhase>("loading");
  const [retry, setRetry] = useState(0);
  const basename = `guide-${String(number).padStart(3, "0")}-${slug}`;
  const downloadUrl = `/api/guides/${basename}/pdf`;

  useEffect(() => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function prepareDownload() {
      try {
        const response = await fetch(downloadUrl, {
          method: "HEAD",
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok || !response.headers.get("content-type")?.includes("application/pdf")) {
          throw new Error("Le PDF n'est pas disponible.");
        }
        if (Number(response.headers.get("content-length")) < 1024) throw new Error("Le PDF est incomplet.");
        if (controller.signal.aborted) return;
        setPhase("ready");
      } catch {
        if (!controller.signal.aborted) setPhase("error");
      }
    }

    void prepareDownload();
    return () => {
      controller.abort();
    };
  }, [downloadUrl, retry]);

  const close = () => {
    dialogRef.current?.close();
    onClose();
  };

  async function startDownload() {
    setPhase("downloading");
    try {
      const response = await fetch(downloadUrl, { credentials: "same-origin", cache: "no-store" });
      if (!response.ok || !response.headers.get("content-type")?.includes("application/pdf")) {
        throw new Error("Le PDF n'est pas disponible.");
      }
      const blob = await response.blob();
      if (blob.size < 1024) throw new Error("Le PDF est incomplet.");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `AI-WORK-KIT-${basename}.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setPhase("started");
    } catch {
      setPhase("error");
    }
  }

  return (
    <dialog ref={dialogRef} className="aw-guide-download-dialog" aria-labelledby="aw-guide-download-title" onClose={onClose}>
      <div className="aw-guide-download-dialog-inner">
        <button type="button" className="aw-guide-dialog-close" aria-label="Fermer" onClick={close}>×</button>
        <p className="aw-guide-dialog-kicker">GUIDE {String(number).padStart(3, "0")}</p>
        <h2 id="aw-guide-download-title">{title}</h2>
        <div className="aw-guide-dialog-cover" aria-label={`Couverture du guide ${title}`}>
          <GuideCover number={number} title={title} tool={tool} variant={variant} />
        </div>
        <div className="aw-guide-dialog-footer">
          {phase === "ready" && (
            <button type="button" className="aw-guide-dialog-download" onClick={() => void startDownload()}>Télécharger le PDF</button>
          )}
          {phase === "loading" && <span role="status" className="aw-guide-dialog-status">Vérification du PDF…</span>}
          {phase === "downloading" && <span role="status" className="aw-guide-dialog-status">Préparation du téléchargement…</span>}
          {phase === "error" && (
            <div className="aw-guide-dialog-error" role="alert">
              <span>Le téléchargement n’a pas pu être préparé. Vérifiez votre connexion.</span>
              <button type="button" onClick={() => { setPhase("loading"); setRetry((value) => value + 1); }}>Réessayer</button>
            </div>
          )}
          {phase === "started" && (
            <>
              <span role="status" className="aw-guide-dialog-status">Téléchargement lancé dans votre navigateur.</span>
              <button type="button" className="aw-guide-dialog-done" onClick={close}>Terminé</button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

export function GuideActions({ slug, number, title, tool, variant }: { slug: string; number: number; title: string; tool: string; variant: number }) {
  const [downloadOpen, setDownloadOpen] = useState(false);
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
    <>
    <div className="aw-guide-actions">
      <button type="button" className="aw-guide-save" aria-pressed={saved} onClick={toggleSaved}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.8h12v16.4l-6-3.8-6 3.8z" /></svg>
        {saved ? "Enregistré" : "Enregistrer"}
      </button>
      <button type="button" className="aw-guide-download" onClick={() => setDownloadOpen(true)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 20h14" /></svg>
        Télécharger le guide
      </button>
      {saved && (
        <Link className="aw-guide-saved-link" href="/favoris#guides-enregistres">
          Retrouver dans Mes favoris <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
    {downloadOpen && <GuideDownloadDialog number={number} slug={slug} title={title} tool={tool} variant={variant} onClose={() => setDownloadOpen(false)} />}
    </>
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
