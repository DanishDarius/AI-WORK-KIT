"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { chemins, type IA, iaLabels, type Metier, useResource } from "@/lib/kit-api";
import { useAbonne } from "@/lib/moi";
import { GuideMarkdown } from "./guide-markdown";
import { Icon } from "./icon";
import { Chip, IconBox, PageHead } from "./ui";

// Demandes sur mesure de l'abonnement : une tâche (8 par mois, livrée en
// 30 min à 2 h) ou un métier entier (2 par mois, livré en 8 h à 24 h).

type TypeDemande = "tache" | "metier";
type Demande = {
  id: string;
  type: TypeDemande;
  metier_nom: string;
  description: string;
  ias: string[];
  statut: "recue" | "en_cours" | "livre";
  plan: string | null;
  cree_le: string;
  livre_le: string | null;
};
type Reponse = { plans: Demande[]; restant: Record<TypeDemande, number> };

const statuts: Record<Demande["statut"], { label: string; tone: "line" | "gold" | "green" }> = {
  recue: { label: "Reçue", tone: "line" },
  en_cours: { label: "En préparation", tone: "gold" },
  livre: { label: "Livrée", tone: "green" },
};

const TYPES: Record<TypeDemande, { titre: string; delai: string; limite: number; texte: string }> = {
  tache: {
    titre: "Une tâche sur mesure",
    delai: "30 min à 2 h",
    limite: 8,
    texte: "Une tâche plus complexe ou propre à votre activité, même si votre métier est déjà dans AIW. Vous recevez une fiche complète : cas, modèle à remplir, prompt pour votre IA et ressources utiles.",
  },
  metier: {
    titre: "Un métier sur mesure",
    delai: "8 h à 24 h",
    limite: 2,
    texte: "Un kit complet pour votre métier, qu’il soit dans AIW ou non : configuration de votre IA, skills, modèles de documents, routines et vos 5 tâches principales.",
  },
};

function dateCourte(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date);
}

function resume(texte: string) {
  const ligne = texte.replace(/\s+/g, " ").trim();
  return ligne.length > 90 ? `${ligne.slice(0, 87).trimEnd()}…` : ligne;
}

function ChoixIA({ ias, onChange }: { ias: IA[]; onChange: (ias: IA[]) => void }) {
  return (
    <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="field-label" style={{ marginBottom: 8 }}>Pour quelle IA ?</legend>
      <div className="row">
        {chemins.map((ia) => (
          <button key={ia} type="button" className="pill" aria-pressed={ias.includes(ia)} onClick={() => onChange(ias.includes(ia) ? ias.filter((i) => i !== ia) : [...ias, ia])}>
            {ias.includes(ia) && <Icon name="check" size={16} strokeWidth={3} />}{iaLabels[ia]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Champ({ id, label, aide, long, value, onChange, required, placeholder }: { id: string; label: string; aide?: string; long?: boolean; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{label}{!required && <span className="muted small"> (facultatif)</span>}</label>
      {long ? (
        <textarea id={id} className="textarea" rows={4} required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={3000} />
      ) : (
        <input id={id} className="input" required={required} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} maxLength={120} />
      )}
      {aide && <p className="form-help">{aide}</p>}
    </div>
  );
}

function Formulaire({ type, metierInitial, restant, onEnvoye }: { type: TypeDemande; metierInitial: string; restant: number; onEnvoye: (d: Demande) => void }) {
  const { data: metiers } = useResource<Metier[]>("/api/metiers");
  const [champs, setChamps] = useState<Record<string, string>>({ metier: metierInitial });
  const [ias, setIas] = useState<IA[]>([...chemins]);
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);
  const v = (cle: string) => champs[cle] ?? "";
  const set = (cle: string) => (valeur: string) => setChamps((c) => ({ ...c, [cle]: valeur }));

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
        body: JSON.stringify({ type, ...champs, ias, site }),
      });
      const d = (await r.json().catch(() => ({}))) as { plan?: Demande; error?: string };
      if (!r.ok) throw new Error(d.error || "Envoi impossible. Réessayez dans un instant.");
      if (d.plan) onEnvoye(d.plan);
      setChamps({ metier: metierInitial });
      setMessage({ ok: true, texte: `C’est envoyé. Livraison en ${TYPES[type].delai} : vous la retrouverez ici, dans « Mes demandes ».` });
    } catch (error) {
      setMessage({ ok: false, texte: error instanceof Error ? error.message : "Connexion impossible. Vérifiez votre réseau puis réessayez." });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form className="card stack" onSubmit={envoyer}>
      <div className="row-between">
        <h2 className="h2">{TYPES[type].titre}</h2>
        <Chip icon="clock">Livrée en {TYPES[type].delai}</Chip>
      </div>
      <p className="muted">{TYPES[type].texte}</p>

      {type === "tache" ? (
        <>
          <div className="field">
            <label className="field-label" htmlFor="sm-metier">Votre métier</label>
            <select id="sm-metier" className="select" value={v("metier")} onChange={(e) => set("metier")(e.target.value)} required>
              <option value="">Choisir…</option>
              {metiers?.map((m) => <option key={m.slug} value={m.slug}>{m.nom}</option>)}
              <option value="autre">Autre métier</option>
            </select>
          </div>
          {v("metier") === "autre" && <Champ id="sm-metier-libre" label="Lequel ?" value={v("metier_libre")} onChange={set("metier_libre")} required placeholder="Ex. transitaire, pharmacien, agent immobilier" />}
          <Champ id="sm-tache" label="Ce que vous devez faire" long required value={v("tache")} onChange={set("tache")}
            placeholder="Ex. je trie chaque jour 60 e-mails de clients avec bons de commande en pièce jointe, et je dois saisir chaque commande dans notre tableau de suivi." />
          <Champ id="sm-donnees" label="Avec quelles données ou quels documents" long value={v("donnees")} onChange={set("donnees")}
            aide="Décrivez-les ou collez un exemple anonymisé : retirez les noms, numéros et montants réels." />
          <Champ id="sm-resultat" label="Le résultat attendu" long required value={v("resultat")} onChange={set("resultat")}
            placeholder="Ex. un tableau à jour et une réponse type à chaque client." />
        </>
      ) : (
        <>
          <Champ id="sm-intitule" label="Votre métier" required value={v("intitule")} onChange={set("intitule")} placeholder="Ex. transitaire en douane" />
          <Champ id="sm-pays" label="Votre pays" required value={v("pays")} onChange={set("pays")} placeholder="Ex. Bénin" />
          <Champ id="sm-clients" label="Pour qui vous travaillez" long required value={v("clients")} onChange={set("clients")} placeholder="Ex. importateurs de véhicules et commerçants, surtout par WhatsApp." />
          <Champ id="sm-taches" label="Les 5 tâches qui vous prennent le plus de temps" long required value={v("taches")} onChange={set("taches")} placeholder={"1. …\n2. …\n3. …\n4. …\n5. …"} />
          <Champ id="sm-outils" label="Vos outils" long value={v("outils")} onChange={set("outils")} placeholder="Ex. WhatsApp Business, Excel, logiciel de dédouanement." />
        </>
      )}

      <ChoixIA ias={ias} onChange={setIas} />
      <label className="honeypot" aria-hidden="true">Site <input type="text" name="site" tabIndex={-1} autoComplete="off" /></label>
      <div className="row">
        <button type="submit" className="btn" disabled={envoi || !ias.length || restant <= 0}>{envoi ? "Envoi…" : "Envoyer ma demande"}</button>
        <span className="small muted">{restant > 0 ? `Il vous reste ${restant} demande${restant > 1 ? "s" : ""} ce mois-ci.` : "Limite du mois atteinte : elle revient le 1er du mois prochain."}</span>
      </div>
      <p role="status" className={message ? (message.ok ? "form-ok" : "form-error") : "form-help"}>
        {message?.texte ?? "Ne collez jamais de données personnelles de vos clients."}
      </p>
    </form>
  );
}

function MesDemandes({ demandes }: { demandes: Demande[] }) {
  if (!demandes.length) return <p className="muted small">Aucune demande pour l’instant.</p>;
  return (
    <div className="stack-sm">
      {demandes.map((d) => (
        <details key={d.id} className="faq">
          <summary>
            <Chip>{d.type === "metier" ? "Métier" : "Tâche"}</Chip>
            <span className="grow">{d.metier_nom} · {resume(d.description)}</span>
            <Chip tone={statuts[d.statut].tone}>{statuts[d.statut].label}</Chip>
            <time className="small muted" dateTime={d.cree_le}>{dateCourte(d.cree_le)}</time>
          </summary>
          <div style={{ marginTop: 12 }}>
            {d.statut === "livre" && d.plan ? <GuideMarkdown markdown={d.plan} guideNumber={0} /> : <p className="muted">Votre demande est en préparation. Elle s’affichera ici dès qu’elle sera livrée.</p>}
          </div>
        </details>
      ))}
    </div>
  );
}

function Verrouille() {
  return (
    <section className="card is-orange stack">
      <Chip tone="orange" icon="lock">Avec l’abonnement</Chip>
      <h2 className="h2">Ce qu’AIW n’a pas encore, on le prépare pour vous.</h2>
      <div className="grid-2">
        {(Object.keys(TYPES) as TypeDemande[]).map((t) => (
          <div key={t} className="card pad-md stack-sm" style={{ borderBottomWidth: 2 }}>
            <h3 className="h3">{TYPES[t].titre}</h3>
            <p className="small muted">{TYPES[t].texte}</p>
            <p className="small strong">{TYPES[t].limite} par mois · livrée en {TYPES[t].delai}</p>
          </div>
        ))}
      </div>
      <div className="row"><Link className="btn btn-orange" href="/abonnement">Voir l’abonnement</Link></div>
    </section>
  );
}

export function SurMesureEcran({ metierInitial = "", typeInitial = "tache" }: { metierInitial?: string; typeInitial?: TypeDemande }) {
  const abonne = useAbonne();
  const [type, setType] = useState<TypeDemande>(typeInitial);
  const [donnees, setDonnees] = useState<Reponse | null>(null);

  useEffect(() => {
    if (!abonne) return;
    let actif = true;
    fetch("/api/plans", { credentials: "same-origin", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { plans: [], restant: { tache: 0, metier: 0 } }))
      .then((d: Reponse) => actif && setDonnees(d))
      .catch(() => actif && setDonnees({ plans: [], restant: { tache: 0, metier: 0 } }));
    return () => {
      actif = false;
    };
  }, [abonne]);

  return (
    <>
      <PageHead kicker="Sur mesure" title="Votre besoin n’est pas dans AIW ?">
        Une tâche plus complexe, un métier très spécifique : décrivez-le, l’équipe vous prépare ce qu’il faut, dans le même format que le reste d’AIW.
      </PageHead>
      {abonne === undefined ? null : !abonne ? (
        <Verrouille />
      ) : (
        <>
          <div className="seg" role="group" aria-label="Type de demande">
            <button type="button" aria-pressed={type === "tache"} onClick={() => setType("tache")}>Une tâche</button>
            <button type="button" aria-pressed={type === "metier"} onClick={() => setType("metier")}>Un métier</button>
          </div>
          <Formulaire key={type} type={type} metierInitial={metierInitial} restant={donnees?.restant[type] ?? TYPES[type].limite}
            onEnvoye={(d) => setDonnees((x) => x && { plans: [d, ...x.plans], restant: { ...x.restant, [d.type]: Math.max(0, x.restant[d.type] - 1) } })} />
          <section className="card stack" aria-labelledby="mes-demandes">
            <div className="row" style={{ flexWrap: "nowrap" }}>
              <IconBox name="list" size="sm" />
              <h2 id="mes-demandes" className="h2">Mes demandes</h2>
            </div>
            {donnees ? <MesDemandes demandes={donnees.plans} /> : <p className="muted small">Chargement…</p>}
          </section>
        </>
      )}
    </>
  );
}
