"use client";

import { useState, type FormEvent } from "react";
import { envoyerDemande } from "@/lib/contact";
import { Icon } from "./kit-icons";

type Etat = "idle" | "envoi" | "envoye";

export function SystemesContactForm() {
  const [etat, setEtat] = useState<Etat>("idle");
  const [erreur, setErreur] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (etat === "envoi") return;
    const f = new FormData(event.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");
    setErreur("");
    setEtat("envoi");
    try {
      await envoyerDemande({
        formulaire: "systemes-ia",
        nom: v("name"),
        email: v("email"),
        entreprise: v("company"),
        fonction: v("role"),
        site: v("site"),
        reponses: {
          secteur: v("industry"),
          taille: v("company-size"),
          besoin: v("need"),
          budget: v("budget"),
        },
      });
      setEtat("envoye");
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "L'envoi a échoué.");
      setEtat("idle");
    }
  }

  if (etat === "envoye")
    return (
      <div className="aw-systems-form aw-form-sent" role="status">
        <span aria-hidden="true"><Icon name="sparkles" size={26} /></span>
        <h3>Demande reçue.</h3>
        <p>
          Nous étudions votre besoin et vous répondons sous 48 heures ouvrées,
          à l’adresse que vous avez indiquée.
        </p>
      </div>
    );

  return (
    <form
      className="aw-systems-form"
      aria-label="Demande d’accompagnement personnalisé"
      onSubmit={onSubmit}
      aria-busy={etat === "envoi"}
    >
      <div className="aw-systems-form-grid">
        <label>
          <span>Nom</span>
          <input name="name" autoComplete="name" placeholder="Votre nom" required maxLength={200} />
        </label>
        <label>
          <span>Email professionnel</span>
          <input name="email" type="email" autoComplete="email" placeholder="vous@entreprise.com" required maxLength={200} />
        </label>
        <label>
          <span>Entreprise</span>
          <input name="company" autoComplete="organization" placeholder="Nom de votre entreprise" maxLength={200} />
        </label>
        <label>
          <span>Fonction</span>
          <input name="role" autoComplete="organization-title" placeholder="Votre fonction" maxLength={200} />
        </label>
        <label>
          <span>Secteur</span>
          <select name="industry" defaultValue="">
            <option value="" disabled>Sélectionner un secteur</option>
            <option>Communication et marketing</option>
            <option>Conseil et services</option>
            <option>Commerce et e-commerce</option>
            <option>Finance et administration</option>
            <option>Ressources humaines</option>
            <option>Autre</option>
          </select>
        </label>
        <label>
          <span>Taille de l’entreprise</span>
          <select name="company-size" defaultValue="">
            <option value="" disabled>Sélectionner une taille</option>
            <option>Indépendant</option>
            <option>2 à 10 personnes</option>
            <option>11 à 50 personnes</option>
            <option>51 personnes et plus</option>
          </select>
        </label>
      </div>
      <label className="aw-systems-form-wide">
        <span>Votre besoin</span>
        <textarea
          name="need"
          rows={5}
          placeholder="La tâche qui vous prend du temps, ce que vous avez déjà essayé, le résultat attendu…"
          required
          maxLength={4000}
        />
      </label>
      <label className="aw-systems-form-wide">
        <span>Budget envisagé</span>
        <select name="budget" defaultValue="">
          <option value="" disabled>Sélectionner un budget</option>
          <option>À définir ensemble</option>
          <option>Moins de 500 €</option>
          <option>500 € à 1 500 €</option>
          <option>Plus de 1 500 €</option>
        </select>
      </label>
      <label className="aw-form-honeypot" aria-hidden="true">
        Ne pas remplir
        <input name="site" tabIndex={-1} autoComplete="off" />
      </label>
      {erreur && (
        <p className="aw-form-error" role="alert">
          {erreur}
        </p>
      )}
      <button type="submit" disabled={etat === "envoi"}>
        {etat === "envoi" ? "Envoi en cours…" : "Demander mon accompagnement"}{" "}
        {etat !== "envoi" && <Icon name="arrow" />}
      </button>
    </form>
  );
}
