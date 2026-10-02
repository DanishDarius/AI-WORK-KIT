"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { GuideSummary } from "@/lib/guides";
import { useAbonne } from "@/lib/moi";
import { sansAccents } from "@/lib/normaliser";
import { Icon } from "./icon";
import { Chip } from "./ui";

// ------------------------------------------------------------ couverture
export function GuideCover({ number, title, tool, variant, locked, width, mini }: { number: number; title: string; tool: string; variant: number; locked?: boolean; width?: number; mini?: boolean }) {
  const court = title.split(/[:?.!]/)[0].trim();
  return (
    <span className={`cover v${((variant - 1) % 8) + 1}${mini ? " is-mini" : ""}`} style={width ? { width } : undefined} aria-hidden="true">
      {locked && <span className="cover-lock"><Icon name="lock" size={15} /></span>}
      {mini ? (
        <>
          <small>AIW</small>
          <strong>{String(number).padStart(3, "0")}</strong>
        </>
      ) : (
        <>
          <small>AIW · Guide {String(number).padStart(3, "0")}</small>
          <strong>{court.length > 60 ? `${court.slice(0, 57)}…` : court}</strong>
          <span>{tool}</span>
        </>
      )}
    </span>
  );
}

// ------------------------------------------------- guides enregistrés
const CLE = "awk-saved-guides";
function lireBrut() {
  try {
    return localStorage.getItem(CLE) ?? "[]";
  } catch {
    return "[]";
  }
}
function slugs(brut = lireBrut()): string[] {
  try {
    const v = JSON.parse(brut);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
function ecrire(liste: string[]) {
  try {
    localStorage.setItem(CLE, JSON.stringify(liste));
  } catch {
    // Stockage indisponible (navigation privée).
  }
  window.dispatchEvent(new Event("awk-guides-updated"));
}
function abonner(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("awk-guides-updated", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("awk-guides-updated", cb);
  };
}
function useGuidesEnregistres() {
  const brut = useSyncExternalStore(abonner, lireBrut, () => null);
  return brut === null ? null : slugs(brut);
}
function retirerGuide(slug: string) {
  ecrire(slugs().filter((s) => s !== slug));
}

// ----------------------------------------------------------- bibliothèque
type Filtre = "tous" | "inclus" | "premium";
const PAR_PAGE = 24;

export function Bibliotheque({ guides, acces }: { guides: GuideSummary[]; acces?: Filtre }) {
  const abonne = useAbonne();
  const [q, setQ] = useState("");
  const [outil, setOutil] = useState("tous");
  const [filtre, setFiltre] = useState<Filtre>(acces ?? "tous");
  const [limite, setLimite] = useState(PAR_PAGE);
  const outils = useMemo(() => [...new Set(guides.map((g) => g.tool))].sort(), [guides]);
  const inclus = guides.filter((g) => g.inclus);

  const liste = useMemo(() => {
    const r = sansAccents(q.trim());
    const base = abonne ? guides : [...guides].sort((a, b) => Number(b.inclus) - Number(a.inclus));
    return base.filter((g) =>
      (outil === "tous" || g.tool === outil) &&
      (filtre === "tous" || (filtre === "inclus" ? g.inclus : !g.inclus)) &&
      (!r || sansAccents(`${g.title} ${g.excerpt} ${g.category}`).includes(r)),
    );
  }, [guides, q, outil, filtre, abonne]);

  const vedette = inclus[0] ?? guides[0];

  return (
    <div className="stack-lg">
      <div className="row">
        <label className="input-icon grow" htmlFor="recherche-guides" style={{ minWidth: 240 }}>
          <Icon name="search" size={20} />
          <span className="sr-only">Chercher un guide</span>
          <input id="recherche-guides" type="search" placeholder="Chercher un guide" value={q} onChange={(e) => { setQ(e.target.value); setLimite(PAR_PAGE); }} />
        </label>
        <select className="select" aria-label="Outil" style={{ width: "auto", minHeight: 56 }} value={outil} onChange={(e) => setOutil(e.target.value)}>
          <option value="tous">Tous les outils</option>
          {outils.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {vedette && !q && outil === "tous" && filtre === "tous" && (
        <Link href={`/guides/${vedette.slug}`} className="card card-link row" style={{ alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <GuideCover number={vedette.number} title={vedette.title} tool={vedette.tool} variant={vedette.coverVariant} width={180} />
          <span className="grow stack" style={{ minWidth: 240 }}>
            <span className="kicker">Commencer ici</span>
            <span className="h2">{vedette.title}</span>
            <span className="muted">{vedette.excerpt}</span>
            <span className="chips">{vedette.inclus && !abonne && <Chip tone="green">Inclus</Chip>}<Chip icon="clock">{vedette.duration}</Chip></span>
          </span>
        </Link>
      )}

      <div className="row-between">
        {abonne ? <h2 className="h2">Tous les guides</h2> : (
          <div className="seg" role="group" aria-label="Accès" style={{ minWidth: 300 }}>
            <button type="button" aria-pressed={filtre === "tous"} onClick={() => setFiltre("tous")}>Tous</button>
            <button type="button" aria-pressed={filtre === "inclus"} onClick={() => setFiltre("inclus")}>Inclus</button>
            <button type="button" aria-pressed={filtre === "premium"} onClick={() => setFiltre("premium")}>Abonnés</button>
          </div>
        )}
        <span className="small muted" role="status">{liste.length} guide{liste.length > 1 ? "s" : ""}</span>
      </div>

      {liste.length ? (
        <div className="grid-4" style={{ gap: 24 }}>
          {liste.slice(0, limite).map((g) => {
            const verrou = !g.inclus && abonne === false;
            return (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="book">
                <GuideCover number={g.number} title={g.title} tool={g.tool} variant={g.coverVariant} locked={verrou} />
                <span className="book-title">{g.title}</span>
                <span className="row" style={{ gap: 6 }}>
                  {abonne === false && (g.inclus ? <Chip tone="green">Inclus</Chip> : <Chip tone="orange" icon="lock">Abonnés</Chip>)}
                  <span className="tiny muted">{g.duration}</span>
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="card empty"><p>Aucun guide ne correspond à votre recherche.</p></div>
      )}
      {limite < liste.length && (
        <div className="row" style={{ justifyContent: "center" }}>
          <button type="button" className="btn btn-secondary" onClick={() => setLimite((l) => l + PAR_PAGE)}>Afficher plus</button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------- actions d'un guide
type Phase = "loading" | "ready" | "downloading" | "error" | "started";

function DialogueTelechargement({ number, slug, title, onClose }: { number: number; slug: string; title: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [essai, setEssai] = useState(0);
  const base = `guide-${String(number).padStart(3, "0")}-${slug}`;
  const url = `/api/guides/${base}/pdf`;

  useEffect(() => {
    if (!ref.current?.open) ref.current?.showModal();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { method: "HEAD", cache: "no-store", signal: controller.signal })
      .then((r) => {
        if (!r.ok || !r.headers.get("content-type")?.includes("application/pdf")) throw new Error();
        if (Number(r.headers.get("content-length")) < 1024) throw new Error();
        if (!controller.signal.aborted) setPhase("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setPhase("error");
      });
    return () => controller.abort();
  }, [url, essai]);

  async function telecharger() {
    setPhase("downloading");
    try {
      const r = await fetch(url, { credentials: "same-origin", cache: "no-store" });
      if (!r.ok || !r.headers.get("content-type")?.includes("application/pdf")) throw new Error();
      const blob = await r.blob();
      if (blob.size < 1024) throw new Error();
      const lien = document.createElement("a");
      const objet = URL.createObjectURL(blob);
      lien.href = objet;
      lien.download = `AIW-${base}.pdf`;
      document.body.append(lien);
      lien.click();
      lien.remove();
      window.setTimeout(() => URL.revokeObjectURL(objet), 60_000);
      setPhase("started");
    } catch {
      setPhase("error");
    }
  }

  function fermer() {
    ref.current?.close();
    onClose();
  }

  return (
    <dialog ref={ref} className="dialog" aria-labelledby="dialogue-pdf-titre" onClose={onClose}>
      <div className="stack">
        <div className="row-between">
          <p className="kicker">Guide {String(number).padStart(3, "0")}</p>
          <button type="button" className="icon-btn is-flat" aria-label="Fermer" onClick={fermer}><Icon name="x" size={22} /></button>
        </div>
        <h2 id="dialogue-pdf-titre" className="h3">{title}</h2>
        {phase === "ready" && <button type="button" className="btn btn-block" onClick={telecharger}><Icon name="download" size={18} /> Télécharger le PDF</button>}
        {phase === "loading" && <p role="status" className="muted">Vérification du PDF…</p>}
        {phase === "downloading" && <p role="status" className="muted">Préparation du téléchargement…</p>}
        {phase === "error" && (
          <div className="form-error stack-sm" role="alert">
            <p>Le téléchargement n’a pas pu être préparé. Vérifiez votre connexion.</p>
            <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={() => { setPhase("loading"); setEssai((e) => e + 1); }}>Réessayer</button>
          </div>
        )}
        {phase === "started" && (
          <>
            <p role="status" className="form-ok">Téléchargement lancé dans votre navigateur.</p>
            <button type="button" className="btn btn-secondary btn-plain" onClick={fermer}>Terminé</button>
          </>
        )}
      </div>
    </dialog>
  );
}

export function GuideActions({ slug, number, title, telechargement = true }: { slug: string; number: number; title: string; telechargement?: boolean }) {
  const [pdf, setPdf] = useState(false);
  const enregistres = useGuidesEnregistres();
  const enregistre = Boolean(enregistres?.includes(slug));
  return (
    <div className="row">
      <button type="button" className="btn btn-secondary btn-sm btn-plain" aria-pressed={enregistre} onClick={() => ecrire(enregistre ? slugs().filter((s) => s !== slug) : [...slugs(), slug])}>
        <Icon name="bookmark" size={16} filled={enregistre} /> {enregistre ? "Enregistré" : "Enregistrer"}
      </button>
      {telechargement && (
        <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={() => setPdf(true)}>
          <Icon name="download" size={16} /> Télécharger le PDF
        </button>
      )}
      {enregistre && <Link className="link small" href="/profil#guides">Retrouver dans mon profil</Link>}
      {pdf && <DialogueTelechargement number={number} slug={slug} title={title} onClose={() => setPdf(false)} />}
    </div>
  );
}

export function CopyPromptButton({ text }: { text: string }) {
  const [copie, setCopie] = useState(false);
  async function copier() {
    try {
      await navigator.clipboard.writeText(text);
      setCopie(true);
      window.setTimeout(() => setCopie(false), 1800);
    } catch {
      setCopie(false);
    }
  }
  return <button type="button" onClick={copier}>{copie ? "Copié !" : "Copier le prompt"}</button>;
}

// Guides enregistrés sur cet appareil (profil).
export function GuidesEnregistres({ guides }: { guides: Pick<GuideSummary, "slug" | "title" | "tool" | "duration">[] }) {
  const liste = useGuidesEnregistres();
  if (liste === null) return null;
  const parSlug = new Map(guides.map((g) => [g.slug, g]));
  const elements = [...liste].reverse().map((s) => parSlug.get(s)).filter(Boolean) as typeof guides;
  if (!elements.length)
    return <p className="muted small">Aucun guide enregistré. Sur un guide, touchez « Enregistrer » pour le retrouver ici.</p>;
  return (
    <div>
      {elements.map((g) => (
        <div key={g.slug} className="list-row">
          <span className="iconbox is-sm" aria-hidden="true"><Icon name="book" size={18} /></span>
          <Link href={`/guides/${g.slug}`} className="grow stack-sm" style={{ gap: 2, color: "var(--ink)" }}>
            <span className="title">{g.title}</span>
            <span className="tiny muted">{g.tool} · {g.duration}</span>
          </Link>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => retirerGuide(g.slug)} aria-label={`Retirer « ${g.title} »`}>Retirer</button>
        </div>
      ))}
    </div>
  );
}
