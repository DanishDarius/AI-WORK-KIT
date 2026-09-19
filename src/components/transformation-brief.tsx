"use client";

import { useState } from "react";
import { Icon } from "./kit-icons";

const labels = ["Votre projet", "Le cadre", "Votre équipe", "Vos coordonnées"];

export function TransformationBrief() {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  return (
    <div className="aw-brief-card">
      <div className="aw-brief-topline">
        <span>Votre brief IA</span>
        <strong>0{step + 1} / 04</strong>
      </div>
      <ol className="aw-brief-progress" aria-label="Étapes du brief">
        {labels.map((label, index) => (
          <li key={label} data-active={index === step} data-done={index < step}>
            <span>{index + 1}</span>{label}
          </li>
        ))}
      </ol>

      {!ready ? (
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="aw-brief-step" hidden={step !== 0}>
            <p className="aw-systems-kicker">Votre projet</p>
            <h3>Par quoi voulez-vous commencer&nbsp;?</h3>
            <label>
              <span>Quelle activité souhaitez-vous améliorer&nbsp;?</span>
              <textarea rows={4} placeholder="Une tâche récurrente, un processus trop lent, un projet à lancer…" required />
            </label>
            <label>
              <span>Quel résultat aimeriez-vous obtenir&nbsp;?</span>
              <textarea rows={3} placeholder="Un gain de temps, une meilleure qualité, un délai plus court…" />
            </label>
          </div>
          <div className="aw-brief-step" hidden={step !== 1}>
            <p className="aw-systems-kicker">Le cadre</p>
            <h3>Dans quel environnement travaillons-nous&nbsp;?</h3>
            <label>
              <span>Quels outils et quelles données sont concernés&nbsp;?</span>
              <textarea rows={4} placeholder="CRM, messagerie, documents, base clients, outils internes…" />
            </label>
            <label>
              <span>Quelles contraintes devons-nous respecter&nbsp;?</span>
              <textarea rows={3} placeholder="Confidentialité, validation, sécurité, délais…" />
            </label>
          </div>
          <div className="aw-brief-step" hidden={step !== 2}>
            <p className="aw-systems-kicker">Votre équipe</p>
            <h3>Qui utilisera la solution&nbsp;?</h3>
            <div className="aw-brief-fields">
              <label><span>Nombre de personnes</span><input placeholder="Ex. 8" /></label>
              <label><span>Équipe concernée</span><input placeholder="Ex. Service commercial" /></label>
            </div>
            <label>
              <span>Comment l’équipe utilise-t-elle déjà l’IA&nbsp;?</span>
              <textarea rows={4} placeholder="Outils testés, usages actuels, niveau d’autonomie…" />
            </label>
          </div>
          <div className="aw-brief-step" hidden={step !== 3}>
            <p className="aw-systems-kicker">Vos coordonnées</p>
            <h3>Préparons notre échange.</h3>
            <div className="aw-brief-fields">
              <label><span>Nom</span><input autoComplete="name" placeholder="Votre nom" required /></label>
              <label><span>Email professionnel</span><input type="email" autoComplete="email" placeholder="vous@entreprise.com" required /></label>
              <label><span>Entreprise</span><input autoComplete="organization" placeholder="Votre entreprise" /></label>
              <label><span>Fonction</span><input autoComplete="organization-title" placeholder="Votre fonction" /></label>
            </div>
          </div>

          <div className="aw-brief-actions">
            {step > 0 && <button type="button" className="aw-brief-back" onClick={() => setStep((value) => value - 1)}>Retour</button>}
            {step < 3 ? (
              <button type="button" className="aw-brief-next" onClick={() => setStep((value) => value + 1)}>
                Continuer <Icon name="right" />
              </button>
            ) : (
              <button type="button" className="aw-brief-next" onClick={() => setReady(true)}>
                Préparer mon brief <Icon name="arrow" />
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="aw-brief-ready" role="status">
          <span><Icon name="sparkles" size={26} /></span>
          <h3>Votre brief est structuré.</h3>
          <p>Les informations essentielles sont prêtes pour cadrer votre premier échange.</p>
          <button type="button" onClick={() => { setReady(false); setStep(0); }}>Modifier mes réponses</button>
        </div>
      )}
    </div>
  );
}
