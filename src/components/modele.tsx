"use client";

import { useState } from "react";
import { champsManquants, remplirGabarit } from "@/lib/gabarit";
import { type ChampModele, type IA, iaLabels, type ModeleTache } from "@/lib/kit-api";
import { copierTexte } from "@/lib/presse-papiers";
import { Icon } from "./icon";
import { Kicker } from "./ui";

// Modèle à remplir : une consigne déjà rédigée, dont les parties variables
// sont des champs. Le client répond à quelques questions, la consigne se
// complète seule, puis il la copie dans son IA. Rien n'est envoyé au
// serveur : tout se passe dans le navigateur.

// Au-delà de cette longueur, l'exemple ne tient plus sur une ligne de téléphone.
const LIGNE = 34;
const AUTRES_IA: [cle: string, nom: string][] = [["meta_ai", "Meta AI"], ["copilot", "Copilot"]];

type Valeurs = Record<string, string>;

const exemples = (champs: ChampModele[]): Valeurs => Object.fromEntries(champs.map((c) => [c.cle, c.exemple ?? ""]));
const vides = (champs: ChampModele[]): Valeurs => Object.fromEntries(champs.map((c) => [c.cle, ""]));

function Champ({ champ, valeur, onChange }: { champ: ChampModele; valeur: string; onChange: (v: string) => void }) {
  const id = `champ-${champ.cle}`;
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {champ.libelle}
        {!champ.requis && <span className="muted" style={{ fontWeight: 600 }}> (facultatif)</span>}
      </label>
      {champ.type === "choix" && champ.options ? (
        <select id={id} className="select" value={valeur} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choisir</option>
          {champ.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : champ.type === "long" ? (
        <textarea id={id} className="textarea" style={{ minHeight: 110 }} maxLength={2000} value={valeur} onChange={(e) => onChange(e.target.value)} />
      ) : champ.type === "texte" && (champ.exemple?.length ?? 0) > LIGNE ? (
        // Une réponse d'une phrase : deux lignes, pour la lire en entier sur un téléphone.
        <textarea id={id} className="textarea" rows={2} style={{ minHeight: 78 }} maxLength={300} value={valeur} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} className="input" type="text" inputMode={champ.type === "nombre" ? "numeric" : undefined} maxLength={300} value={valeur} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function ModeleARemplir({ modele, ia, lienIa, prenom }: { modele: ModeleTache; ia: IA; lienIa: string; prenom: string | null }) {
  const [valeurs, setValeurs] = useState<Valeurs>(() => exemples(modele.champs));
  const [copie, setCopie] = useState<"" | "ok" | "echec">("");

  const consigne = remplirGabarit(modele.gabarit, modele.champs, valeurs);
  const estExemple = modele.champs.every((c) => (valeurs[c.cle] ?? "") === (c.exemple ?? ""));
  const manquants = champsManquants(modele.champs, valeurs);
  const note = modele.conseils[ia];

  async function copier() {
    setCopie((await copierTexte(consigne)) ? "ok" : "echec");
    window.setTimeout(() => setCopie(""), 2200);
  }

  return (
    <>
      <div className="card stack">
        <div className="stack-sm" style={{ gap: 4 }}>
          <Kicker>Adapter à ma situation</Kicker>
          <p className="small muted">
            {estExemple
              ? "Les champs sont préremplis avec un exemple. Remplacez-les par vos propres informations : la consigne se complète seule."
              : "La consigne ci-dessous se complète avec vos réponses."}
          </p>
        </div>
        {modele.champs.map((c) => (
          <Champ key={c.cle} champ={c} valeur={valeurs[c.cle] ?? ""} onChange={(v) => setValeurs((p) => ({ ...p, [c.cle]: v }))} />
        ))}
        <div className="row">
          <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={() => setValeurs(vides(modele.champs))}>Vider les champs</button>
          {!estExemple && (
            <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={() => setValeurs(exemples(modele.champs))}>Remettre l’exemple</button>
          )}
        </div>
      </div>

      <div className="stack-sm" style={{ gap: 2 }}>
        <p className="strong" aria-live="polite">
          {estExemple ? `Voici ce que cela donne pour ${prenom ?? "l’exemple"} :` : "Voici votre consigne :"}
        </p>
        <p className="form-help">Une consigne, ou prompt, est le texte que l’on écrit à l’IA pour lui demander un travail.</p>
      </div>
      <div className="prompt-panel">
        <header>
          <span className="kicker is-light">La consigne · {iaLabels[ia]}</span>
        </header>
        <pre>{consigne}</pre>
      </div>

      {manquants.length > 0 && (
        <p className="form-help" role="status">
          Il reste {manquants.length > 1 ? `${manquants.length} champs` : "un champ"} à remplir avant de copier.
        </p>
      )}
      <div className="row">
        <button type="button" className="btn btn-plain" onClick={copier} disabled={manquants.length > 0}>
          <Icon name={copie === "ok" ? "check" : "copy"} size={18} />
          {copie === "ok" ? "Copié !" : copie === "echec" ? "Copie impossible" : "Copier la consigne"}
        </button>
        <a className="btn btn-secondary btn-plain" href={lienIa} target="_blank" rel="noreferrer">
          <Icon name="external" size={18} /> Ouvrir {iaLabels[ia]}
        </a>
      </div>

      {(note || modele.avertissement) && (
        <p className="tip">
          {note}
          {note && modele.avertissement ? " " : ""}
          {modele.avertissement && <b>{modele.avertissement}</b>}
        </p>
      )}
      {AUTRES_IA.some(([cle]) => modele.conseils[cle]) && (
        <details>
          <summary className="link" style={{ cursor: "pointer" }}>Vous utilisez Meta AI ou Copilot ?</summary>
          <div className="stack-sm" style={{ marginTop: 8 }}>
            {AUTRES_IA.filter(([cle]) => modele.conseils[cle]).map(([cle, nom]) => (
              <p key={cle} className="small"><b>{nom}.</b> {modele.conseils[cle]}</p>
            ))}
          </div>
        </details>
      )}
    </>
  );
}
