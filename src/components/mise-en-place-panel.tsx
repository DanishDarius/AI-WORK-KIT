"use client";
import { useRef, useState } from "react";
import { Icon } from "./kit-icons";
import { miseEnPlace, ModeApprobation } from "@/lib/mise-en-place";

function ApprobationBadge({ mode }: { mode: ModeApprobation }) {
  return (
    <span
      className={`aw-approbation aw-approbation-${
        mode === "Automatique" ? "auto" : "manuelle"
      }`}
    >
      <Icon name={mode === "Automatique" ? "sparkles" : "layers"} size={13} />
      {mode}
    </span>
  );
}

function CopyPrompt({ prompt, label }: { prompt: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLPreElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const node = ref.current;
      if (!node) return;
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }
  return (
    <div className="aw-prompt">
      <div className="aw-promptlabel">
        <span>{label}</span>
        <Icon name="writing" />
      </div>
      <pre ref={ref}>{prompt}</pre>
      <button className="aw-btn aw-primary aw-copy" onClick={copy}>
        <Icon name="copy" />
        {copied ? "Prompt copié" : "Copier le prompt"}
      </button>
    </div>
  );
}

export function MiseEnPlacePanel({ code }: { code: string }) {
  const content = miseEnPlace[code];
  if (!content) {
    return (
      <div className="aw-panel aw-mep-soon">
        <h2>Contenu bientôt disponible</h2>
        <p className="aw-bodytext">
          Le guide de mise en place (outils, prompt prêt à copier,
          automatisation) pour cette tâche arrive prochainement. En
          attendant, entraînez-vous dans l&apos;onglet &laquo; S&apos;entraîner &raquo;.
        </p>
      </div>
    );
  }
  const { outils, promptPonctuel, tachePlanifiee, uneSeuleFois } = content;
  let step = 0;
  return (
    <div className="aw-mep">
      <section className="aw-panel">
        <h2>
          <span className="aw-number">{String(++step).padStart(2, "0")}</span>{" "}
          Outils à activer
        </h2>
        <ul className="aw-outils">
          {outils.map((o) => (
            <li key={o.nom}>
              <a href={o.lien} target="_blank" rel="noopener noreferrer">
                <Icon name="link" size={14} />
                {o.nom}
              </a>
              <span className={`aw-outil-type aw-outil-${o.type}`}>
                {o.type === "officiel" ? "Officiel Claude" : "Tiers"}
              </span>
            </li>
          ))}
        </ul>
      </section>
      {promptPonctuel && (
        <section className="aw-panel">
          <h2>
            <span className="aw-number">{String(++step).padStart(2, "0")}</span>{" "}
            Votre prompt, prêt à l&apos;emploi
          </h2>
          <CopyPrompt prompt={promptPonctuel} label="Prompt ponctuel" />
        </section>
      )}
      {tachePlanifiee && (
        <section className="aw-panel">
          <h2>
            <span className="aw-number">{String(++step).padStart(2, "0")}</span>{" "}
            Automatiser avec Cowork
            {tachePlanifiee.optionnelle && (
              <span className="aw-tag-optionnel">Optionnel</span>
            )}
          </h2>
          <div className="aw-automation">
            <div className="aw-automation-row">
              <span className="aw-automation-label">
                Nom de la tâche planifiée
              </span>
              <strong>{tachePlanifiee.nom}</strong>
            </div>
            <div className="aw-automation-row">
              <span className="aw-automation-label">Fréquence</span>
              <strong>{tachePlanifiee.frequence}</strong>
            </div>
            <div className="aw-automation-row">
              <span className="aw-automation-label">
                Mode d&apos;approbation recommandé
              </span>
              <ApprobationBadge mode={tachePlanifiee.modeApprobation} />
            </div>
            <p className="aw-automation-raison">
              {tachePlanifiee.raisonApprobation}
            </p>
          </div>
          <CopyPrompt
            prompt={tachePlanifiee.prompt}
            label="Prompt de la tâche planifiée"
          />
        </section>
      )}
      {uneSeuleFois && (
        <p className="aw-mep-once">
          <Icon name="sparkles" size={14} />
          {uneSeuleFois}
        </p>
      )}
    </div>
  );
}
