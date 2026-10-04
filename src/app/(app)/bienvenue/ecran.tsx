"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { Chip } from "@/components/ui";
import { api, type IA, type Metier, useResource } from "@/lib/kit-api";
import { enregistrerProfil, type Appareil, type Outil, type Pays, type ProfilType } from "@/lib/profil";
import { PAYS, rangPublic, trierParPublic } from "@/lib/profil-commun";

const PROFILS: { id: ProfilType; label: string; desc: string }[] = [
  { id: "salarie", label: "Salarié", desc: "Je travaille dans une entreprise, une ONG ou une administration." },
  { id: "independant", label: "Indépendant", desc: "Je vends mes services : conseil, formation, graphisme, couture…" },
  { id: "commercant", label: "Commerçant", desc: "Je vends des produits, en boutique ou sur WhatsApp et Facebook." },
];

const OUTILS: { id: Outil; label: string; desc: string }[] = [
  { id: "chatgpt", label: "ChatGPT", desc: "Application ou site" },
  { id: "gemini", label: "Gemini", desc: "Souvent déjà installé sur Android" },
  { id: "claude", label: "Claude", desc: "Application ou site" },
  { id: "metaai", label: "Meta AI", desc: "Dans WhatsApp" },
  { id: "copilot", label: "Copilot", desc: "Microsoft" },
  { id: "aucune", label: "Aucune pour l’instant", desc: "On vous guide" },
];

const APPAREILS: { id: Appareil; label: string; desc: string }[] = [
  { id: "telephone", label: "Téléphone", desc: "Les étapes sont pensées pour le téléphone." },
  { id: "ordinateur", label: "Ordinateur", desc: "Les étapes sont pensées pour l’ordinateur." },
];

function Option({ on, multi, label, desc, onClick }: { on: boolean; multi?: boolean; label: string; desc?: string; onClick: () => void }) {
  return (
    <button type="button" className={`option${multi ? " is-multi" : ""}`} aria-pressed={on} onClick={onClick}>
      <span className="option-mark" aria-hidden="true">{on && <Icon name="check" size={16} strokeWidth={3} />}</span>
      <span><b>{label}</b>{desc && <small>{desc}</small>}</span>
    </button>
  );
}

function Bulle({ children }: { children: React.ReactNode }) {
  return (
    <div className="row" style={{ flexWrap: "nowrap" }}>
      <Image src="/brand/atelier/symbol-primary.svg" alt="" width={52} height={52} />
      <p className="card pad-sm" style={{ fontSize: 17, borderBottomWidth: 2 }}>{children}</p>
    </div>
  );
}

export default function Bienvenue() {
  const router = useRouter();
  const [etape, setEtape] = useState(0);
  const [type, setType] = useState<ProfilType | null>(null);
  const [metier, setMetier] = useState<string | null>(null);
  const [outils, setOutils] = useState<Outil[]>([]);
  const [appareil, setAppareil] = useState<Appareil | null>(null);
  const [pays, setPays] = useState<Pays | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const metiers = useResource<Metier[]>("/api/metiers");

  const peutContinuer = [true, !!type, !!metier, outils.length > 0, !!appareil, !!pays][etape] ?? true;
  const metierNom = metiers.data?.find((m) => m.slug === metier)?.nom;

  function basculerOutil(id: Outil) {
    setOutils((liste) => {
      if (id === "aucune") return liste.includes("aucune") ? [] : ["aucune"];
      const sans = liste.filter((o) => o !== "aucune");
      return sans.includes(id) ? sans.filter((o) => o !== id) : [...sans, id];
    });
  }

  async function terminer() {
    if (!metier || envoi) return;
    setEnvoi(true);
    enregistrerProfil({ type, metier, outils, appareil, pays });
    const ia = outils.find((o): o is IA => o === "chatgpt" || o === "claude" || o === "gemini");
    if (ia) {
      await api(`/api/metiers/${encodeURIComponent(metier)}/chemin`, { method: "POST", body: JSON.stringify({ chemin: ia }) }).catch(() => null);
    }
    router.replace("/");
  }

  return (
    <div className="auth" style={{ minHeight: "100vh" }}>
      <header className="wrap row" style={{ paddingTop: 20, flexWrap: "nowrap", maxWidth: 900, width: "100%" }}>
        <button type="button" className="icon-btn is-flat" aria-label="Revenir" onClick={() => setEtape((e) => Math.max(0, e - 1))} disabled={etape === 0}>
          <Icon name="left" size={24} />
        </button>
        <div className="grow"><div className="bar" role="progressbar" aria-label="Avancement" aria-valuemin={0} aria-valuemax={6} aria-valuenow={etape}><span style={{ width: `${(etape / 6) * 100}%` }} /></div></div>
        <Link className="icon-btn is-flat" href="/" aria-label="Passer">
          <Icon name="x" size={24} />
        </Link>
      </header>

      <main id="contenu" className="wrap stack-lg" style={{ maxWidth: 760, width: "100%", paddingTop: 36, paddingBottom: 140, flexGrow: 1 }}>
        {etape === 0 && (
          <div className="stack-lg" style={{ alignItems: "center", textAlign: "center", paddingTop: 30 }}>
            <Image src="/brand/atelier/symbol-primary.svg" alt="" width={112} height={112} priority />
            <h1 className="h1">Bienvenue sur AIW.</h1>
            <p className="lead">Cinq questions, une minute environ. Ensuite, votre parcours est prêt.</p>
            <div className="chips" style={{ justifyContent: "center" }}>
              <Chip icon="clock">1 minute</Chip>
              <Chip icon="settings">Modifiable à tout moment</Chip>
            </div>
          </div>
        )}
        {etape === 1 && (
          <div className="stack-lg">
            <Bulle>Vous êtes plutôt…</Bulle>
            <div className="stack">
              {PROFILS.map((p) => <Option key={p.id} on={type === p.id} label={p.label} desc={p.desc} onClick={() => setType(p.id)} />)}
            </div>
          </div>
        )}
        {etape === 2 && (
          <div className="stack-lg">
            <Bulle>Quel est votre métier ?</Bulle>
            {metiers.data ? (
              <div className="grid-2">
                {trierParPublic(metiers.data, (m) => rangPublic(m.publics, type)).map((m) => <Option key={m.slug} on={metier === m.slug} label={m.nom} desc={`${m.nb_taches} tâches`} onClick={() => setMetier(m.slug)} />)}
              </div>
            ) : (
              <p className="muted" role="status">{metiers.error ?? "Chargement des métiers…"}</p>
            )}
          </div>
        )}
        {etape === 3 && (
          <div className="stack-lg">
            <Bulle>Quelles IA avez-vous déjà ? Plusieurs choix possibles.</Bulle>
            <div className="grid-2">
              {OUTILS.map((o) => <Option key={o.id} multi on={outils.includes(o.id)} label={o.label} desc={o.desc} onClick={() => basculerOutil(o.id)} />)}
            </div>
            <p className="small muted">La première IA cochée parmi ChatGPT, Claude et Gemini devient celle de vos prompts. Vous pourrez en changer.</p>
          </div>
        )}
        {etape === 4 && (
          <div className="stack-lg">
            <Bulle>Vous travaillez surtout sur…</Bulle>
            <div className="grid-2">
              {APPAREILS.map((a) => <Option key={a.id} on={appareil === a.id} label={a.label} desc={a.desc} onClick={() => setAppareil(a.id)} />)}
            </div>
          </div>
        )}
        {etape === 5 && (
          <div className="stack-lg">
            <Bulle>Dans quel pays travaillez-vous ?</Bulle>
            <div className="grid-2">
              {PAYS.map((p) => <Option key={p.code} on={pays === p.code} label={p.nom} onClick={() => setPays(p.code)} />)}
            </div>
          </div>
        )}
        {etape === 6 && (
          <div className="stack-lg">
            <Bulle>Parfait. Votre parcours est prêt.</Bulle>
            <div className="card stack">
              <div className="chips">
                {type && <Chip tone="green">{PROFILS.find((p) => p.id === type)?.label}</Chip>}
                {metierNom && <Chip tone="blue">{metierNom}</Chip>}
                {appareil && <Chip>{APPAREILS.find((a) => a.id === appareil)?.label}</Chip>}
                {pays && pays !== "autre" && <Chip>{PAYS.find((p) => p.code === pays)?.nom}</Chip>}
              </div>
              <h2 className="h2">Vos tâches vous attendent, étape par étape.</h2>
              <p className="muted">Commencez par la première : un cas concret, un prompt à copier, et c’est fait.</p>
            </div>
          </div>
        )}
      </main>

      <footer style={{ position: "sticky", bottom: 0, background: "var(--paper)", borderTop: "2px solid var(--line)" }}>
        <div className="wrap row-between" style={{ maxWidth: 900, paddingBlock: 16 }}>
          <span className="small muted">{etape === 0 ? "Personnalisation" : etape < 6 ? `Question ${etape} sur 5` : "Terminé"}</span>
          {etape < 6 ? (
            <button type="button" className="btn btn-lg" disabled={!peutContinuer} onClick={() => peutContinuer && setEtape((e) => e + 1)}>Continuer</button>
          ) : (
            <button type="button" className="btn btn-lg" disabled={envoi} onClick={terminer}>{envoi ? "Un instant…" : "Commencer mon parcours"}</button>
          )}
        </div>
      </footer>
    </div>
  );
}
