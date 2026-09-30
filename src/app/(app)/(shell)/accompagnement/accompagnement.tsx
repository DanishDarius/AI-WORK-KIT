"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { CheckList, IconBox, PageHead } from "@/components/ui";
import { envoyerDemande, type Formulaire } from "@/lib/contact";
import { useMoi } from "@/lib/moi";

const OFFRES: Record<Formulaire, { titre: string; texte: string; points: string[] }> = {
  "systemes-ia": {
    titre: "Systèmes IA",
    texte: "Une tâche répétitive devient un système qui travaille dans vos outils, avec validation humaine.",
    points: ["Diagnostic de la tâche et de vos outils", "Construction de l’agent ou de l’automatisation", "Prise en main et transmission"],
  },
  "transformation-ia": {
    titre: "Transformation IA",
    texte: "Un plan clair pour toute l’équipe : priorités, projet pilote, adoption et mesure des résultats.",
    points: ["Cadrage des priorités", "Projet pilote sur un cas réel", "Formation et suivi de l’adoption"],
  },
};

function Choix({ label, name, options, required }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <select className="select" name={name} defaultValue="" required={required}>
        <option value="" disabled>Choisir</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function Accompagnement() {
  const moi = useMoi();
  const [formulaire, setFormulaire] = useState<Formulaire>("systemes-ia");
  const [envoi, setEnvoi] = useState(false);
  const [etat, setEtat] = useState<{ ok: boolean; texte: string } | null>(null);
  const offre = OFFRES[formulaire];

  async function envoyer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (envoi) return;
    const form = event.currentTarget;
    const f = new FormData(form);
    const v = (k: string) => String(f.get(k) ?? "");
    const cles = formulaire === "systemes-ia" ? ["secteur", "taille", "besoin", "budget"] : ["activite", "resultat", "nb_personnes", "usage_ia"];
    setEnvoi(true);
    setEtat(null);
    try {
      await envoyerDemande({ formulaire, nom: v("nom"), email: v("email"), entreprise: v("entreprise"), fonction: v("fonction"), reponses: Object.fromEntries(cles.map((k) => [k, v(k)])), site: v("site") });
      setEtat({ ok: true, texte: "Demande reçue. Nous vous répondons sous 48 heures par e-mail." });
      form.reset();
    } catch (e) {
      setEtat({ ok: false, texte: e instanceof Error ? e.message : "L’envoi a échoué." });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <Page width="single">
      <PageHead kicker="Accompagnement" title="Quand un prompt ne suffit plus.">
        Parlons ADS construit avec vous la suite : un système dans vos outils, ou une démarche pour toute l’équipe. Chaque projet fait l’objet d’un devis.
      </PageHead>
      <div className="seg" role="tablist" aria-label="Type d’accompagnement">
        {(Object.keys(OFFRES) as Formulaire[]).map((k) => (
          <button key={k} id={k === "transformation-ia" ? "transformation" : undefined} type="button" role="tab" aria-selected={formulaire === k} onClick={() => { setFormulaire(k); setEtat(null); }}>{OFFRES[k].titre}</button>
        ))}
      </div>
      <section className="card row" style={{ alignItems: "flex-start", gap: 20 }}>
        <IconBox name={formulaire === "systemes-ia" ? "bolt" : "users"} size="lg" />
        <div className="grow stack" style={{ minWidth: 240 }}>
          <h2 className="h2">{offre.titre}</h2>
          <p className="muted">{offre.texte}</p>
          <CheckList items={offre.points.map((p) => ({ label: p }))} />
        </div>
      </section>
      <form key={formulaire} className="card stack" onSubmit={envoyer} aria-label={`Demande ${offre.titre}`}>
        <h2 className="h3">Décrivez votre besoin</h2>
        <div className="grid-2" style={{ gap: 16 }}>
          <label className="field"><span className="field-label">Nom</span><input className="input" name="nom" required autoComplete="name" /></label>
          <label className="field"><span className="field-label">E-mail</span><input className="input" name="email" type="email" required autoComplete="email" defaultValue={moi?.email ?? ""} /></label>
          <label className="field"><span className="field-label">Structure</span><input className="input" name="entreprise" autoComplete="organization" /></label>
          <label className="field"><span className="field-label">Fonction</span><input className="input" name="fonction" autoComplete="organization-title" /></label>
          {formulaire === "systemes-ia" ? (
            <>
              <Choix label="Secteur" name="secteur" options={["Commerce et vente en ligne", "Communication et marketing", "Conseil et services", "Finance et administration", "Ressources humaines", "Autre"]} />
              <Choix label="Taille" name="taille" options={["Indépendant", "2 à 10 personnes", "11 à 50 personnes", "51 personnes et plus"]} />
            </>
          ) : (
            <>
              <Choix label="Personnes concernées" name="nb_personnes" options={["Moins de 10", "10 à 50", "51 à 200", "Plus de 200"]} />
              <Choix label="Usage actuel de l’IA" name="usage_ia" options={["Aucun", "Quelques personnes, sans cadre", "Usage régulier dans l’équipe", "Déjà des projets en place"]} />
            </>
          )}
        </div>
        {formulaire === "systemes-ia" ? (
          <>
            <label className="field"><span className="field-label">Votre besoin</span><textarea className="textarea" name="besoin" required placeholder="La tâche répétitive, les outils utilisés, le résultat attendu." /></label>
            <Choix label="Budget envisagé" name="budget" options={["À définir ensemble", "Moins de 300 000 FCFA", "300 000 à 1 000 000 FCFA", "Plus de 1 000 000 FCFA"]} />
          </>
        ) : (
          <>
            <label className="field"><span className="field-label">Activité à améliorer</span><textarea className="textarea" name="activite" required placeholder="Ce que l’équipe fait aujourd’hui et qui prend trop de temps." /></label>
            <label className="field"><span className="field-label">Résultat attendu</span><input className="input" name="resultat" /></label>
          </>
        )}
        <label className="honeypot" aria-hidden="true">Site <input name="site" tabIndex={-1} autoComplete="off" /></label>
        <div className="row">
          <button type="submit" className="btn" disabled={envoi}><Icon name="arrow" size={18} /> {envoi ? "Envoi…" : "Envoyer ma demande"}</button>
        </div>
        {etat && <p className={etat.ok ? "form-ok" : "form-error"} role={etat.ok ? "status" : "alert"}>{etat.texte}</p>}
      </form>
    </Page>
  );
}
