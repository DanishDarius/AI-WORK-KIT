"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { Bar, Chip, IconBox, PageHead, ResourceState } from "@/components/ui";
import { AbonnementCard, StatsCard } from "@/components/widgets";
import { automatisationLabel, chemins, type IA, iaLabels, type MetierDetail, officielLabel, tacheHref, useResource } from "@/lib/kit-api";
import type { MiseEnPlace } from "@/lib/mise-en-place-types";
import { useProfil } from "@/lib/profil";

// Mon kit : tout ce qu'il faut installer pour travailler avec l'IA dans son
// métier, rassemblé à partir de la mise en place de chaque tâche.
const CLE = "aw-kit-installe";
const EVENEMENT = "aw-kit-maj";

function lire() {
  try {
    return localStorage.getItem(CLE) ?? "[]";
  } catch {
    return "[]";
  }
}
function abonner(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENEMENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENEMENT, cb);
  };
}
function useInstalles() {
  const brut = useSyncExternalStore(abonner, lire, () => "[]");
  const set = useMemo(() => {
    try {
      return new Set<string>(JSON.parse(brut));
    } catch {
      return new Set<string>();
    }
  }, [brut]);
  function basculer(id: string) {
    const suivant = new Set(set);
    if (suivant.has(id)) suivant.delete(id);
    else suivant.add(id);
    try {
      localStorage.setItem(CLE, JSON.stringify([...suivant]));
    } catch {}
    window.dispatchEvent(new Event(EVENEMENT));
  }
  return { set, basculer };
}

function Coche({ fait, label, onClick }: { fait: boolean; label: string; onClick: () => void }) {
  return (
    <button type="button" className={`check-dot${fait ? "" : " is-empty"}`} aria-pressed={fait} aria-label={`${fait ? "Installé" : "Marquer comme installé"} : ${label}`} onClick={onClick} style={{ width: 32, height: 32, border: fait ? 0 : undefined, cursor: "pointer" }}>
      {fait && <Icon name="check" size={16} strokeWidth={3} />}
    </button>
  );
}

function Kit({ slug }: { slug: string }) {
  const { data, error, retry } = useResource<MetierDetail>(`/api/metiers/${encodeURIComponent(slug)}`);
  if (!data) return <ResourceState error={error} retry={retry} />;
  return <KitContenu slug={slug} data={data} />;
}

function KitContenu({ slug, data }: { slug: string; data: MetierDetail }) {
  const [choix, setChoix] = useState<IA | null>(null);
  const { set, basculer } = useInstalles();
  const [copie, setCopie] = useState("");

  const ia: IA = choix ?? data.chemin_choisi ?? "chatgpt";
  // Le contenu du kit est payant : il vient d'une route protégée (règle S2).
  const codes = data.taches.map((t) => t.code).join(",");
  const kit = useResource<{ mise_en_place: Record<string, MiseEnPlace> }>(
    `/api/kit?ia=${ia}&codes=${encodeURIComponent(codes)}`,
  );
  const charge = kit.data !== undefined;
  const parCode = kit.data?.mise_en_place ?? {};

  const outils = new Map<string, { nom: string; lien: string; type: "officiel" | "tiers"; taches: string[] }>();
  const routines: { id: string; tacheId: string; tache: string; nom: string; frequence: string; prompt: string }[] = [];
  for (const t of data.taches) {
    const mep = parCode[t.code];
    if (!mep) continue;
    for (const o of mep.outils) {
      const e = outils.get(o.nom) ?? { ...o, taches: [] };
      e.taches.push(t.titre);
      outils.set(o.nom, e);
    }
    if (mep.tachePlanifiee) routines.push({ id: `${ia}:routine:${t.code}`, tacheId: t.id, tache: t.titre, nom: mep.tachePlanifiee.nom, frequence: mep.tachePlanifiee.frequence, prompt: mep.tachePlanifiee.prompt });
  }
  const listeOutils = [...outils.values()].sort((a, b) => (a.type === b.type ? b.taches.length - a.taches.length : a.type === "officiel" ? -1 : 1));
  const ids = [...listeOutils.map((o) => `${ia}:outil:${o.nom}`), ...routines.map((r) => r.id)];
  const faits = ids.filter((id) => set.has(id)).length;
  const pct = ids.length ? Math.round((faits / ids.length) * 100) : 0;

  async function copier(id: string, texte: string) {
    try {
      await navigator.clipboard.writeText(texte);
      setCopie(id);
      window.setTimeout(() => setCopie(""), 2000);
    } catch {}
  }

  return (
    <>
      <PageHead kicker="Votre boîte à outils" title={`Mon kit : ${data.metier.nom}`}>
        Les outils à brancher et les routines à programmer dans votre IA, pour toutes les tâches de votre métier. Installez-les une fois, servez-vous-en tous les jours.
      </PageHead>

      <section className="card row" style={{ gap: 20 }}>
        <div aria-hidden="true" style={{ width: 88, height: 88, borderRadius: "50%", background: `conic-gradient(var(--green) 0 ${pct}%, #e6ecea ${pct}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <span style={{ width: 66, height: 66, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }} className="strong">{pct} %</span>
        </div>
        <div className="grow stack-sm" style={{ minWidth: 220 }}>
          <h2 className="h2">Installer mon kit</h2>
          <p className="muted">{faits} élément{faits > 1 ? "s" : ""} installé{faits > 1 ? "s" : ""} sur {ids.length}. Cochez au fur et à mesure.</p>
          <Bar value={pct} thin label={`Kit installé à ${pct} %`} />
        </div>
      </section>

      <div className="seg" role="group" aria-label="Kit pour quelle IA">
        {chemins.map((c) => <button key={c} type="button" aria-pressed={ia === c} onClick={() => setChoix(c)}>{iaLabels[c]}</button>)}
      </div>

      <section className="card stack" aria-labelledby="kit-outils">
        <div className="row-between">
          <h2 id="kit-outils" className="h2">1. Brancher vos outils</h2>
          {charge && <Chip>{listeOutils.length} outils</Chip>}
        </div>
        <p className="muted small">Les connecteurs qui donnent à {iaLabels[ia]} accès à vos e-mails, documents ou agenda. Commencez par les officiels.</p>
        {!charge ? (
          <ResourceState error={kit.error} retry={kit.retry} />
        ) : listeOutils.length ? (
          <div>
            {listeOutils.map((o) => {
              const id = `${ia}:outil:${o.nom}`;
              return (
                <div key={id} className="list-row" style={{ flexWrap: "wrap" }}>
                  <Coche fait={set.has(id)} label={o.nom} onClick={() => basculer(id)} />
                  <IconBox name="link" tone={o.type === "officiel" ? undefined : "blue"} size="sm" />
                  <div className="grow stack-sm" style={{ gap: 4, minWidth: 200 }}>
                    <span className="title">{o.nom}</span>
                    <span className="tiny muted">{o.type === "officiel" ? officielLabel[ia] : "Outil tiers"} · utile pour {o.taches.length} tâche{o.taches.length > 1 ? "s" : ""}</span>
                  </div>
                  <a className="btn btn-secondary btn-sm btn-plain" href={o.lien} target="_blank" rel="noreferrer"><Icon name="external" size={16} /> Ouvrir</a>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="muted">Aucun outil à brancher pour ce métier avec {iaLabels[ia]}.</p>
        )}
      </section>

      <section className="card stack" aria-labelledby="kit-routines">
        <div className="row-between">
          <h2 id="kit-routines" className="h2">2. Programmer vos routines</h2>
          {charge && <Chip icon="cycle">{routines.length} routines</Chip>}
        </div>
        <p className="muted small">Des tâches qui se font toutes seules, avec {automatisationLabel[ia]}. Copiez le prompt, choisissez la fréquence.</p>
        {!charge ? (
          <ResourceState error={kit.error} retry={kit.retry} />
        ) : routines.length ? (
          <div>
            {routines.map((r) => (
              <div key={r.id} className="list-row" style={{ flexWrap: "wrap" }}>
                <Coche fait={set.has(r.id)} label={r.nom} onClick={() => basculer(r.id)} />
                <IconBox name="calendar" size="sm" />
                <div className="grow stack-sm" style={{ gap: 4, minWidth: 200 }}>
                  <span className="title">{r.nom}</span>
                  <span className="tiny muted">{r.frequence} · <Link href={tacheHref(r.tacheId, slug)}>{r.tache}</Link></span>
                </div>
                <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={() => copier(r.id, r.prompt)}>
                  <Icon name={copie === r.id ? "check" : "copy"} size={16} /> {copie === r.id ? "Copié" : "Copier"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">Aucune routine pour ce métier avec {iaLabels[ia]}.</p>
        )}
      </section>
    </>
  );
}

export default function MonKit() {
  const profil = useProfil();
  return (
    <Page aside={<><StatsCard /><section className="card pad-md stack-sm"><h3 className="h3">Toujours à jour</h3><p className="small muted">Les outils et routines suivent les changements des IA. Cochez ce que vous avez installé : c’est enregistré sur cet appareil.</p></section><AbonnementCard /></>}>
      {profil === undefined ? (
        <ResourceState />
      ) : profil.metier ? (
        <Kit slug={profil.metier} />
      ) : (
        <div className="card empty">
          <h1 className="h2">Choisissez d’abord votre métier.</h1>
          <p className="muted">Votre kit rassemble les outils et routines des tâches de votre métier.</p>
          <Link className="btn" href="/metiers">Choisir mon métier</Link>
        </div>
      )}
    </Page>
  );
}
