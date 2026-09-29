"use client";

import { useRef, useState, type FormEvent } from "react";
import { envoyerDemande } from "@/lib/contact";
import { Icon } from "./kit-icons";

const labels = ["Votre projet", "Le cadre", "Votre équipe", "Vos coordonnées"];

export function TransformationBrief() {
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Vérifie uniquement les champs de l'étape affichée : les autres étapes sont
  // masquées et le navigateur ne peut pas y afficher son message d'erreur.
  function etapeValide(index: number, signaler = true) {
    const etape = formRef.current?.querySelectorAll<HTMLElement>(".aw-brief-step")[index];
    const champs = etape?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea") ?? [];
    for (const champ of champs) {
      if (!champ.checkValidity()) {
        if (signaler) champ.reportValidity();
        return false;
      }
    }
    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (envoi) return;
    const invalide = [0, 1, 2, 3].find((i) => !etapeValide(i, false));
    if (invalide !== undefined) {
      // Affiche l'étape incomplète ; le message apparaît au clic suivant.
      if (invalide === step) etapeValide(step);
      else {
        setStep(invalide);
        setErreur("Une information obligatoire manque à cette étape.");
      }
      return;
    }
    const f = new FormData(event.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");
    setErreur("");
    setEnvoi(true);
    try {
      await envoyerDemande({
        formulaire: "transformation-ia",
        nom: v("nom"),
        email: v("email"),
        entreprise: v("entreprise"),
        fonction: v("fonction"),
        site: v("site"),
        reponses: {
          activite: v("activite"),
          resultat: v("resultat"),
          outils: v("outils"),
          contraintes: v("contraintes"),
          nb_personnes: v("nb_personnes"),
          equipe: v("equipe"),
          usage_ia: v("usage_ia"),
        },
      });
      setReady(true);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "L'envoi a échoué.");
    } finally {
      setEnvoi(false);
    }
  }

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
        <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={envoi}>
          <div className="aw-brief-step" hidden={step !== 0}>
            <p className="aw-systems-kicker">Votre projet</p>
            <h3>Par quoi voulez-vous commencer ?</h3>
            <label>
              <span>Quelle activité souhaitez-vous améliorer ?</span>
              <textarea name="activite" maxLength={4000} rows={4} placeholder="Une tâche récurrente, un processus trop lent, un projet à lancer…" required />
            </label>
            <label>
              <span>Quel résultat aimeriez-vous obtenir ?</span>
              <textarea name="resultat" maxLength={4000} rows={3} placeholder="Un gain de temps, une meilleure qualité, un délai plus court…" />
            </label>
          </div>
          <div className="aw-brief-step" hidden={step !== 1}>
            <p className="aw-systems-kicker">Le cadre</p>
            <h3>Dans quel environnement travaillons-nous ?</h3>
            <label>
              <span>Quels outils et quelles données sont concernés ?</span>
              <textarea name="outils" maxLength={4000} rows={4} placeholder="CRM, messagerie, documents, base clients, outils internes…" />
            </label>
            <label>
              <span>Quelles contraintes devons-nous respecter ?</span>
              <textarea name="contraintes" maxLength={4000} rows={3} placeholder="Confidentialité, validation, sécurité, délais…" />
            </label>
          </div>
          <div className="aw-brief-step" hidden={step !== 2}>
            <p className="aw-systems-kicker">Votre équipe</p>
            <h3>Qui utilisera la solution ?</h3>
            <div className="aw-brief-fields">
              <label><span>Nombre de personnes</span><input name="nb_personnes" inputMode="numeric" maxLength={50} placeholder="Ex. 8" /></label>
              <label><span>Équipe concernée</span><input name="equipe" maxLength={200} placeholder="Ex. Service commercial" /></label>
            </div>
            <label>
              <span>Comment l’équipe utilise-t-elle déjà l’IA ?</span>
              <textarea name="usage_ia" maxLength={4000} rows={4} placeholder="Outils testés, usages actuels, niveau d’autonomie…" />
            </label>
          </div>
          <div className="aw-brief-step" hidden={step !== 3}>
            <p className="aw-systems-kicker">Vos coordonnées</p>
            <h3>Préparons notre échange.</h3>
            <div className="aw-brief-fields">
              <label><span>Nom</span><input name="nom" autoComplete="name" maxLength={200} placeholder="Votre nom" required /></label>
              <label><span>Email professionnel</span><input name="email" type="email" autoComplete="email" maxLength={200} placeholder="vous@entreprise.com" required /></label>
              <label><span>Entreprise</span><input name="entreprise" autoComplete="organization" maxLength={200} placeholder="Votre entreprise" /></label>
              <label><span>Fonction</span><input name="fonction" autoComplete="organization-title" maxLength={200} placeholder="Votre fonction" /></label>
            </div>
          </div>

          <label className="aw-form-honeypot" aria-hidden="true">
            Ne pas remplir
            <input name="site" tabIndex={-1} autoComplete="off" />
          </label>
          {erreur && (
            <p className="aw-form-error" role="alert">
              {erreur}
            </p>
          )}

          <div className="aw-brief-actions">
            {step > 0 && <button type="button" className="aw-brief-back" onClick={() => { setErreur(""); setStep((value) => value - 1); }}>Retour</button>}
            {step < 3 ? (
              <button type="button" className="aw-brief-next" onClick={() => { if (etapeValide(step)) { setErreur(""); setStep((value) => value + 1); } }}>
                Continuer <Icon name="right" />
              </button>
            ) : (
              <button type="submit" className="aw-brief-next" disabled={envoi}>
                {envoi ? "Envoi en cours…" : "Envoyer mon brief"}{" "}
                {!envoi && <Icon name="arrow" />}
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="aw-brief-ready" role="status">
          <span><Icon name="sparkles" size={26} /></span>
          <h3>Brief envoyé.</h3>
          <p>Nous l’étudions et revenons vers vous sous 48 heures ouvrées pour fixer un premier échange.</p>
        </div>
      )}
    </div>
  );
}
