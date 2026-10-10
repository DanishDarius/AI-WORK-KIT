"use client";

import Link from "next/link";
import { useState } from "react";
import { api, useResource } from "@/lib/kit-api";
import { Icon } from "./icon";
import { Page } from "./shell";
import { Chip, PageHead, ResourceState } from "./ui";

// L'écran de correction des rendus d'attestation (étape C), pour le
// correcteur seul : la liste des rendus à corriger, puis un rendu avec ses
// fichiers, l'exercice, la réponse type et la grille de 5 critères. La grille
// et la règle de décision sont aussi vérifiées par le serveur
// (src/lib/correction.ts), qui envoie aussi leur texte : cet écran ne fait
// que les montrer.


const date = (iso: string | null) => (iso ? new Date(iso).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" }) : "");
const taille = (octets: number) =>
  octets < 1024 * 1024 ? `${Math.max(1, Math.round(octets / 1024))} Ko` : `${(octets / 1024 / 1024).toFixed(1).replace(".", ",")} Mo`;

const LIBELLE: Record<string, string> = { valide: "Validé", a_refaire: "À refaire", en_attente: "En correction" };

type Liste = {
  a_corriger: { id: string; metier: string; nom: string | null; nb_fichiers: number; rendu_le: string; echeance: string; en_retard: boolean }[];
  decisions: { id: string; metier: string; nom: string | null; statut: string; corrige_le: string }[];
};

export function Correction() {
  const { data, error, retry } = useResource<Liste>("/api/correction");
  if (!data) return <Page width="single"><ResourceState error={error} retry={retry} /></Page>;
  return (
    <Page width="single">
      <PageHead kicker="Attestations" title="Rendus à corriger">
        Chaque rendu se corrige sous 72 heures, week-ends compris. L’abonné reçoit un e-mail à chaque décision.
      </PageHead>

      <section className="card stack-sm" aria-labelledby="a-corriger">
        <h2 id="a-corriger" className="h2">À corriger ({data.a_corriger.length})</h2>
        {data.a_corriger.length === 0 && <p className="muted">Aucun rendu n’attend sa correction.</p>}
        {data.a_corriger.map((r) => {
          const enRetard = r.en_retard;
          return (
            <Link key={r.id} href={`/correction/${r.id}`} className="list-row" style={{ color: "inherit" }}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="title" style={{ display: "block" }}>{r.metier}</span>
                <span className="muted small">{r.nom ?? "Sans nom"} · {r.nb_fichiers} fichier{r.nb_fichiers > 1 ? "s" : ""} · rendu le {date(r.rendu_le)}</span>
              </span>
              <Chip tone={enRetard ? "orange" : "line"} icon="clock">{enRetard ? "En retard" : `Avant le ${new Date(r.echeance).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`}</Chip>
            </Link>
          );
        })}
      </section>

      {data.decisions.length > 0 && (
        <section className="card stack-sm" aria-labelledby="decisions">
          <h2 id="decisions" className="h2">Dernières décisions</h2>
          {data.decisions.map((r) => (
            <Link key={r.id} href={`/correction/${r.id}`} className="list-row" style={{ color: "inherit" }}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span className="title" style={{ display: "block" }}>{r.metier}</span>
                <span className="muted small">{r.nom ?? "Sans nom"} · le {date(r.corrige_le)}</span>
              </span>
              <Chip tone={r.statut === "valide" ? "green" : "orange"}>{LIBELLE[r.statut] ?? r.statut}</Chip>
            </Link>
          ))}
        </section>
      )}
    </Page>
  );
}

type Rendu = {
  id: string;
  statut: "en_attente" | "a_refaire" | "valide";
  metier: { nom: string; slug: string } | null;
  nom: string | null;
  verification: string | null;
  fichiers: { numero: number; type: string; taille: number; url: string | null }[];
  notes: number[] | null;
  commentaire: string | null;
  rendu_le: string | null;
  echeance: string | null;
  corrige_le: string | null;
  purge_le: string | null;
  essais_a_refaire: number;
  grille: { titre: string; deux: string; un: string; zero: string }[];
  seuil: number;
  exercice: { numero: number; cas: string; titre_donnees: string; donnees: string[]; travail: string[]; a_rendre: string; pour_le_correcteur: string } | null;
};

function Fichiers({ fichiers, purge, recharger }: { fichiers: Rendu["fichiers"]; purge: string | null; recharger: () => void }) {
  if (purge) return <p className="muted">Les fichiers ont été effacés le {date(purge)}, 2 mois après l’attestation.</p>;
  if (!fichiers.length) return <p className="muted">Aucun fichier.</p>;
  return (
    <div className="stack-sm">
      {fichiers.map((f) =>
        !f.url ? (
          <p key={f.numero} className="muted">Fichier {f.numero} : l’espace des fichiers n’est pas configuré.</p>
        ) : f.type === "application/pdf" ? (
          <a key={f.numero} className="btn btn-secondary" style={{ alignSelf: "flex-start" }} href={f.url} target="_blank" rel="noreferrer">
            <Icon name="file" size={18} /> Ouvrir le PDF {f.numero} ({taille(f.taille)})
          </a>
        ) : (
          <a key={f.numero} href={f.url} target="_blank" rel="noreferrer" className="stack-sm" style={{ color: "inherit" }}>
            {/* Image signée chez R2, valable 10 minutes : pas d'optimisation de Next. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.url} alt={`Fichier ${f.numero} du rendu`} style={{ width: "100%", height: "auto", borderRadius: 14, border: "2px solid var(--line)" }} />
            <span className="muted small">Fichier {f.numero} · {taille(f.taille)} · ouvrir en grand</span>
          </a>
        ),
      )}
      <p className="muted small">Les liens des fichiers valent 10 minutes. <button type="button" className="btn btn-plain btn-sm" onClick={recharger}>Recharger les liens</button></p>
    </div>
  );
}

function Grille({ rendu, apres }: { rendu: Rendu; apres: (emailEnvoye: boolean) => void }) {
  const { grille, seuil } = rendu;
  const [notes, setNotes] = useState<(number | null)[]>([null, null, null, null, null]);
  const [commentaire, setCommentaire] = useState("");
  const [erreur, setErreur] = useState("");
  const [occupe, setOccupe] = useState(false);
  const completes = notes.every((n) => n !== null);
  const points = notes.reduce<number>((a, n) => a + (n ?? 0), 0);
  const reussie = completes && points >= seuil && notes[1] !== 0;

  async function decider(decision: "valide" | "a_refaire") {
    if (occupe) return;
    setErreur("");
    if (!completes) return setErreur("Notez les 5 critères.");
    if (decision === "a_refaire" && commentaire.trim().length < 20) return setErreur("Écrivez le critère qui manque et ce qu’il faut corriger : ce commentaire part à l’abonné.");
    setOccupe(true);
    try {
      const r = await api<{ email_envoye: boolean }>(`/api/correction/${rendu.id}`, {
        method: "POST",
        body: JSON.stringify({ decision, notes, commentaire: commentaire.trim() }),
      });
      apres(r.email_envoye);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "La décision n’a pas pu être enregistrée.");
    } finally {
      setOccupe(false);
    }
  }

  return (
    <section className="card stack" aria-labelledby="grille-titre">
      <h2 id="grille-titre" className="h2">La grille</h2>
      <p className="muted small">Validé à {seuil} points sur 10 au moins, sans 0 au critère 2 (éliminatoire).</p>
      {grille.map((c, i) => (
        <fieldset key={c.titre} className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="h3" style={{ marginBottom: 8 }}>{i + 1}. {c.titre}{i === 1 ? " (éliminatoire)" : ""}</legend>
          {([[2, c.deux], [1, c.un], [0, c.zero]] as const).map(([valeur, texte]) => (
            <button
              key={valeur}
              type="button"
              className="option"
              aria-pressed={notes[i] === valeur}
              disabled={occupe}
              onClick={() => setNotes((n) => n.map((x, j) => (j === i ? valeur : x)))}
            >
              <span className="option-mark" aria-hidden="true">{notes[i] === valeur && <Icon name="check" size={14} strokeWidth={3} />}</span>
              <span><b>{valeur} point{valeur > 1 ? "s" : ""}</b><small>{texte}</small></span>
            </button>
          ))}
        </fieldset>
      ))}
      <p className="h3" role="status">Total : {points} sur 10{completes ? (reussie ? " · le rendu peut être validé" : " · le rendu ne peut pas être validé") : ""}</p>
      <div className="field">
        <label className="field-label" htmlFor="commentaire">Commentaire pour l’abonné</label>
        <textarea id="commentaire" className="textarea" value={commentaire} maxLength={3000} disabled={occupe} onChange={(e) => setCommentaire(e.target.value)} placeholder="Pour « À refaire » : le critère qui manque et ce qu’il faut corriger. Pour « Validé » : facultatif." />
      </div>
      {erreur && <p className="form-error" role="alert">{erreur}</p>}
      <div className="row" style={{ gap: 12, flexWrap: "wrap" }}>
        <button type="button" className="btn" disabled={occupe || !reussie} onClick={() => decider("valide")}>Valider</button>
        <button type="button" className="btn btn-secondary" disabled={occupe || !completes} onClick={() => decider("a_refaire")}>À refaire</button>
      </div>
    </section>
  );
}

export function CorrectionRendu({ id }: { id: string }) {
  const { data, error, retry } = useResource<Rendu>(`/api/correction/${encodeURIComponent(id)}`);
  const [decide, setDecide] = useState<null | { email: boolean }>(null);
  if (!data) return <Page width="single"><ResourceState error={error} retry={retry} /></Page>;
  const e = data.exercice;
  return (
    <Page width="single">
      <PageHead kicker="Correction" title={data.metier?.nom ?? "Rendu"}>
        Rendu le {date(data.rendu_le)}{data.echeance && data.statut === "en_attente" ? `, à corriger avant le ${date(data.echeance)}` : ""}.
        {data.essais_a_refaire > 0 ? ` ${data.essais_a_refaire} essai${data.essais_a_refaire > 1 ? "s" : ""} déjà « à refaire ».` : ""}
      </PageHead>

      <p className="small"><Link className="strong" href="/correction">← Tous les rendus</Link></p>

      {(decide || data.statut !== "en_attente") && (
        <section className="card stack-sm" role="status">
          <Chip tone={data.statut === "valide" ? "green" : data.statut === "a_refaire" ? "orange" : "line"}>{decide ? "Décision enregistrée" : LIBELLE[data.statut]}</Chip>
          {!decide && data.notes && <p>Note : {data.notes.reduce((a, b) => a + b, 0)} sur 10, le {date(data.corrige_le)}.</p>}
          {!decide && data.commentaire && <p><b>Commentaire.</b> {data.commentaire}</p>}
          {decide && !decide.email && <p className="form-error">L’e-mail à l’abonné n’est pas parti : prévenez-le vous-même.</p>}
          {decide && <p><Link className="strong" href="/correction">Retour à la liste</Link></p>}
        </section>
      )}

      <section className="card stack" aria-labelledby="rendu-titre">
        <h2 id="rendu-titre" className="h2">Le rendu</h2>
        <p><b>Nom sur l’attestation.</b> {data.nom ?? "Sans nom"}</p>
        <div className="stack-sm">
          <h3 className="h3">Ce que l’abonné a vérifié et corrigé</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{data.verification ?? (data.purge_le ? "Effacé avec les fichiers." : "Rien.")}</p>
        </div>
        <div className="stack-sm">
          <h3 className="h3">Les fichiers</h3>
          <Fichiers fichiers={data.fichiers} purge={data.purge_le} recharger={retry} />
        </div>
      </section>

      {e && (
        <section className="card stack" aria-labelledby="exercice-titre">
          <h2 id="exercice-titre" className="h2">L’exercice {e.numero}</h2>
          <p>{e.cas}</p>
          <div className="stack-sm">
            <h3 className="h3">{e.titre_donnees}</h3>
            <ul className="steps" style={{ listStyle: "disc" }}>{e.donnees.map((d, i) => <li key={i}>{d}</li>)}</ul>
          </div>
          <div className="stack-sm">
            <h3 className="h3">Le travail</h3>
            <ol className="steps">{e.travail.map((t, i) => <li key={i}>{t}</li>)}</ol>
          </div>
          <p><b>À rendre.</b> {e.a_rendre}</p>
          <div className="notice" role="note">
            <span style={{ flex: "none", display: "inline-flex" }}><Icon name="help" size={20} /></span>
            <p><b>Pour le correcteur.</b> {e.pour_le_correcteur}</p>
          </div>
        </section>
      )}

      {data.statut === "en_attente" && !decide && <Grille rendu={data} apres={(email) => setDecide({ email })} />}
    </Page>
  );
}
