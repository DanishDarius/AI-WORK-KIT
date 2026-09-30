"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chemins, type IA, iaLabels } from "@/lib/kit-api";
import { useAbonne } from "@/lib/moi";
import { GuideMarkdown } from "./guide-markdown";
import { Icon } from "./icon";
import { Chip } from "./ui";

type Plan = {
  id: string;
  description: string;
  ias: string[];
  statut: "recue" | "en_cours" | "livre";
  plan: string | null;
  cree_le: string;
  livre_le: string | null;
};

const statuts: Record<Plan["statut"], { label: string; tone: "line" | "gold" | "green" }> = {
  recue: { label: "Demande reçue", tone: "line" },
  en_cours: { label: "En préparation", tone: "gold" },
  livre: { label: "Plan prêt", tone: "green" },
};

function dateCourte(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date);
}

function resume(texte: string) {
  const ligne = texte.replace(/\s+/g, " ").trim();
  return ligne.length > 80 ? `${ligne.slice(0, 77).trimEnd()}…` : ligne;
}

function Verrouille({ metier }: { metier: string }) {
  return (
    <section id="sur-mesure" className="card is-orange stack" aria-labelledby="sur-mesure-titre">
      <Chip tone="orange" icon="lock">Abonnés</Chip>
      <h2 id="sur-mesure-titre" className="h2">Votre tâche n’est pas dans la liste ?</h2>
      <p className="muted">
        Décrivez-la en quelques lignes. Vous recevez un plan détaillé, étape par étape, avec un prompt prêt
        pour ChatGPT, Claude et Gemini, comme pour les tâches de {metier}.
      </p>
      <div className="card pad-sm stack-sm" style={{ borderBottomWidth: 2 }}>
        <p className="kicker">Exemple de demande</p>
        <p>« Chaque fin de mois, je rapproche les paiements Mobile Money reçus avec les factures envoyées. Je veux repérer vite les factures non payées. »</p>
      </div>
      <div className="row">
        <Link className="btn btn-orange" href="/abonnement">Débloquer avec l’abonnement</Link>
      </div>
    </section>
  );
}

function Formulaire({ slug }: { slug: string }) {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [description, setDescription] = useState("");
  const [ias, setIas] = useState<IA[]>([...chemins]);
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);

  useEffect(() => {
    let actif = true;
    fetch(`/api/plans?metier=${encodeURIComponent(slug)}`, { credentials: "same-origin", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { plans: [] }))
      .then((d: { plans: Plan[] }) => actif && setPlans(d.plans ?? []))
      .catch(() => actif && setPlans([]));
    return () => {
      actif = false;
    };
  }, [slug]);

  function basculer(ia: IA) {
    setIas((liste) => (liste.includes(ia) ? liste.filter((i) => i !== ia) : [...liste, ia]));
  }

  async function envoyer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (envoi) return;
    const site = new FormData(event.currentTarget).get("site");
    setEnvoi(true);
    setMessage(null);
    try {
      const r = await fetch("/api/plans", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metier: slug, description, ias, site }),
      });
      const d = (await r.json().catch(() => ({}))) as { plan?: Plan; error?: string };
      if (!r.ok) throw new Error(d.error || "Envoi impossible. Réessayez dans un instant.");
      if (d.plan) setPlans((liste) => [d.plan!, ...(liste ?? [])]);
      setDescription("");
      setMessage({ ok: true, texte: "C’est envoyé. Votre plan apparaîtra ici dès qu’il sera prêt." });
    } catch (error) {
      setMessage({ ok: false, texte: error instanceof Error ? error.message : "Connexion impossible. Vérifiez votre réseau puis réessayez." });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <section id="sur-mesure" className="card stack-lg" aria-labelledby="sur-mesure-titre">
      <div className="stack-sm">
        <Chip tone="green" icon="check">Abonnement actif</Chip>
        <h2 id="sur-mesure-titre" className="h2">Votre tâche n’est pas dans la liste ?</h2>
        <p className="muted">Décrivez-la : ce que vous faites, avec quels documents, et le résultat attendu. Votre plan arrive ici.</p>
      </div>
      <form className="stack" onSubmit={envoyer}>
        <div className="field">
          <label className="field-label" htmlFor="sur-mesure-description">Décrivez votre tâche</label>
          <textarea id="sur-mesure-description" className="textarea" rows={6} required minLength={30} maxLength={3000} value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Exemple : chaque fin de mois, je rapproche les paiements Mobile Money reçus avec les factures envoyées, dans un tableau Excel." />
        </div>
        <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="field-label" style={{ marginBottom: 8 }}>Plan pour</legend>
          <div className="row">
            {chemins.map((ia) => (
              <button key={ia} type="button" className="pill" aria-pressed={ias.includes(ia)} onClick={() => basculer(ia)}>
                {ias.includes(ia) && <Icon name="check" size={16} strokeWidth={3} />}{iaLabels[ia]}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="honeypot" aria-hidden="true">Site <input type="text" name="site" tabIndex={-1} autoComplete="off" /></label>
        <div className="row">
          <button type="submit" className="btn" disabled={envoi || !ias.length}>{envoi ? "Envoi…" : "Recevoir mon plan"}</button>
        </div>
        <p role="status" className={message ? (message.ok ? "form-ok" : "form-error") : "form-help"}>
          {message?.texte ?? "Évitez les données confidentielles : décrivez la tâche, pas vos clients."}
        </p>
      </form>
      <div className="stack">
        <h3 className="h3">Vos plans sur mesure</h3>
        {plans === null ? (
          <p className="muted small">Chargement…</p>
        ) : plans.length ? (
          plans.map((p) => (
            <details key={p.id} className="faq">
              <summary>
                <span className="grow">{resume(p.description)}</span>
                <Chip tone={statuts[p.statut].tone}>{statuts[p.statut].label}</Chip>
                <time className="small muted" dateTime={p.cree_le}>{dateCourte(p.cree_le)}</time>
              </summary>
              <div style={{ marginTop: 12 }}>
                {p.statut === "livre" && p.plan ? <GuideMarkdown markdown={p.plan} guideNumber={0} /> : <p className="muted">Votre plan est en préparation. Il s’affichera ici dès qu’il sera prêt.</p>}
              </div>
            </details>
          ))
        ) : (
          <p className="muted small">Aucune demande pour ce métier pour l’instant.</p>
        )}
      </div>
    </section>
  );
}

export function TacheSurMesure({ slug, metier }: { slug: string; metier: string }) {
  const abonne = useAbonne();
  if (abonne === undefined) return null;
  return abonne ? <Formulaire slug={slug} /> : <Verrouille metier={metier} />;
}
