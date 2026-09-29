"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chemins, type IA, iaLabels } from "@/lib/kit-api";
import { useAbonne } from "@/lib/moi";
import { LIEN_ABONNEMENT } from "@/lib/offre";
import { GuideMarkdown } from "./guide-markdown";

type Plan = {
  id: string;
  description: string;
  ias: string[];
  statut: "recue" | "en_cours" | "livre";
  plan: string | null;
  cree_le: string;
  livre_le: string | null;
};

const statutLabels: Record<Plan["statut"], string> = {
  recue: "Demande reçue",
  en_cours: "En préparation",
  livre: "Plan prêt",
};

function dateCourte(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date);
}

function resume(texte: string) {
  const ligne = texte.replace(/\s+/g, " ").trim();
  return ligne.length > 80 ? `${ligne.slice(0, 77).trimEnd()}…` : ligne;
}

function Cadenas() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function Verrouille({ metier }: { metier: string }) {
  return (
    <section className="aw-custom-task is-locked" aria-labelledby="sur-mesure-titre">
      <div className="aw-custom-task-copy">
        <span className="aw-custom-task-badge"><Cadenas />Inclus dans l’abonnement</span>
        <h2 id="sur-mesure-titre">Votre tâche n’est pas dans la liste ?</h2>
        <p>
          Décrivez-la en quelques lignes. Vous recevez un plan détaillé, étape par étape, avec un prompt
          prêt pour ChatGPT, Claude et Gemini, comme pour les tâches de {metier}.
        </p>
        <div className="aw-custom-task-actions">
          <a className="aw-custom-task-cta" href={LIEN_ABONNEMENT}>S’abonner pour débloquer</a>
          <Link href="/mon-compte#mon-offre">Voir ce que comprend l’abonnement <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="aw-custom-task-example" aria-label="Exemple">
        <p className="aw-custom-task-label">Exemple de demande</p>
        <p className="aw-custom-task-quote">
          « Préparer chaque mois la déclaration de TVA d’un client à partir de ses relevés et de ses factures. »
        </p>
        <p className="aw-custom-task-label">Vous recevez</p>
        <ul>
          <li><span>Plan ChatGPT · étapes détaillées</span><b>prompt prêt</b></li>
          <li><span>Plan Claude · étapes détaillées</span><b>prompt prêt</b></li>
          <li><span>Plan Gemini · étapes détaillées</span><b>prompt prêt</b></li>
        </ul>
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
      setMessage({
        ok: false,
        texte: error instanceof Error ? error.message : "Connexion impossible. Vérifiez votre réseau puis réessayez.",
      });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <section className="aw-custom-task is-active" aria-labelledby="sur-mesure-titre">
      <div className="aw-custom-task-copy">
        <span className="aw-custom-task-badge">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>Abonnement actif
        </span>
        <h2 id="sur-mesure-titre">Votre tâche n’est pas dans la liste ?</h2>
        <p>
          Décrivez-la en quelques lignes : ce que vous faites, avec quels documents, et le résultat attendu.
          Votre plan arrive ici, pour les IA que vous choisissez.
        </p>
        <div className="aw-custom-task-plans">
          <h3>Vos plans sur mesure</h3>
          {plans === null ? (
            <p className="aw-muted">Chargement…</p>
          ) : plans.length ? (
            <ul>
              {plans.map((p) => (
                <li key={p.id}>
                  <details>
                    <summary>
                      <span>{resume(p.description)}</span>
                      <small className={`aw-plan-status is-${p.statut}`}>{statutLabels[p.statut]}</small>
                      <time dateTime={p.cree_le}>{dateCourte(p.cree_le)}</time>
                    </summary>
                    <div className="aw-plan-body">
                      {p.statut === "livre" && p.plan ? (
                        <GuideMarkdown markdown={p.plan} guideNumber={0} />
                      ) : (
                        <p>Votre plan est en préparation. Il s’affichera ici dès qu’il sera prêt.</p>
                      )}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          ) : (
            <p className="aw-muted">Aucune demande pour ce métier pour l’instant.</p>
          )}
        </div>
      </div>
      <form className="aw-custom-task-form" onSubmit={envoyer}>
        <label>
          <span>Décrivez votre tâche</span>
          <textarea
            rows={6}
            required
            minLength={30}
            maxLength={3000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Exemple : chaque fin de mois, je rapproche les paiements Mobile Money reçus avec les factures envoyées, dans un tableau Excel. Je veux repérer vite les factures non payées."
          />
        </label>
        <fieldset>
          <legend>Plan pour</legend>
          <div>
            {chemins.map((ia) => (
              <label key={ia} className="aw-custom-task-ia">
                <input type="checkbox" checked={ias.includes(ia)} onChange={() => basculer(ia)} />
                {iaLabels[ia]}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="aw-form-honeypot" aria-hidden="true">
          Site <input type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
        <button type="submit" disabled={envoi || !ias.length}>
          {envoi ? "Envoi…" : "Recevoir mon plan"}
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
        <p role="status" className={message ? (message.ok ? "is-ok" : "is-error") : undefined}>
          {message?.texte ?? "Évitez les données confidentielles : décrivez la tâche, pas vos clients."}
        </p>
      </form>
    </section>
  );
}

export function TacheSurMesure({ slug, metier }: { slug: string; metier: string }) {
  const abonne = useAbonne();
  if (abonne === undefined) return null;
  return abonne ? <Formulaire slug={slug} /> : <Verrouille metier={metier} />;
}
