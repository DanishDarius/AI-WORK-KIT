"use client";

import { useState } from "react";
import { BoutonPaiement } from "@/components/bouton-paiement";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { CheckList, Chip, IconBox, PageHead } from "@/components/ui";
import { useMoi } from "@/lib/moi";
import { ABONNEMENT_OUVERT, dateLongue, fcfa, type Formule, FORMULES, LIEN_ETRE_PREVENU, PRIX } from "@/lib/offre";

const LIGNES: { label: string; base: boolean | string; abo: boolean | string }[] = [
  { label: "Le kit de votre métier et ses mises à jour", base: true, abo: true },
  { label: "Les tâches, cas pratiques et modèles à remplir", base: true, abo: true },
  { label: "Le parcours de votre métier", base: true, abo: true },
  { label: "Guides de la bibliothèque (lecture)", base: "10 inclus", abo: "Tous" },
  { label: "Guides téléchargeables, avec droit de revente", base: false, abo: true },
  { label: "Tâche sur mesure", base: false, abo: "8 par mois" },
  { label: "Métier sur mesure (kit complet)", base: false, abo: "2 par mois" },
  { label: "Support", base: "E-mail", abo: "E-mail et chat" },
  { label: "La tâche de la semaine, les packs et les mises à jour des IA", base: "Titres seuls", abo: true },
];

function Cellule({ v, orange }: { v: boolean | string; orange?: boolean }) {
  if (v === true) return <span className={`check-dot${orange ? " is-orange" : ""}`} aria-label="Inclus"><Icon name="check" size={14} strokeWidth={3} /></span>;
  if (v === false) return <span aria-label="Non inclus" style={{ color: "var(--soft)" }}><Icon name="x" size={18} /></span>;
  return <span className="strong small">{v}</span>;
}

export function AbonnementEcran() {
  const moi = useMoi();
  const [formule, setFormule] = useState<Formule>("annuel");
  const choisie = FORMULES.find((f) => f.id === formule)!;
  const a = moi?.abonnement;

  return (
    <Page
      aside={
        <>
          <section className="card pad-md stack">
            <h3 className="h3">Ce que vous débloquez</h3>
            <CheckList tone="orange" items={[{ label: "Tous les guides, à télécharger et à revendre" }, { label: "8 tâches et 2 métiers sur mesure par mois" }, { label: "Le chat du support, 7 j/7" }, { label: "La tâche de la semaine, les packs et les mises à jour des IA" }]} />
          </section>
          <section className="card pad-md row" style={{ alignItems: "flex-start", flexWrap: "nowrap" }}>
            <IconBox name="shield" tone="plain" />
            <div className="stack-sm">
              <h3 className="h3">Sans prélèvement automatique</h3>
              <p className="small muted">Vous payez une période, une seule fois. Pour continuer, vous la prolongez quand vous voulez. Vous hésitez ? Commencez par le mensuel.</p>
            </div>
          </section>
        </>
      }
    >
      <PageHead kicker="Abonnement" title="Tout AIW, pour aller plus loin.">
        Tous les guides, à télécharger et à revendre, et le sur-mesure : une tâche ou un métier entier préparé pour vous, avec le chat du support.
      </PageHead>

      {!ABONNEMENT_OUVERT && !a?.actif && (
        <div className="notice" role="status" style={{ background: "var(--orange-bg)", borderColor: "var(--orange-line)", color: "var(--orange)" }}>
          <Icon name="clock" size={20} />
          <p>L’abonnement ouvre bientôt. Voici ce qu’il contiendra : laissez-nous votre adresse, nous vous prévenons dès l’ouverture.</p>
        </div>
      )}

      {a?.actif && (
        <div className="notice" role="status" style={{ background: "var(--mint-bg)", borderColor: "#c9ebdb", color: "var(--green)" }}>
          <Icon name="check" size={20} />
          <p>Votre abonnement {FORMULES.find((f) => f.id === a.periode)?.label.toLowerCase()} est actif{a.periode === "a_vie" ? ", sans échéance" : ` jusqu’au ${dateLongue(a.fin_le)}`}. Tout AIW est ouvert.{a.periode !== "a_vie" && " Un nouvel achat s’ajoute à la fin de votre période en cours."}</p>
        </div>
      )}

      <div className="grid-3" role="radiogroup" aria-label="Formule">
        {FORMULES.map((f) => (
          <button key={f.id} type="button" role="radio" aria-checked={formule === f.id} onClick={() => setFormule(f.id)} className="card stack-sm" style={{ textAlign: "left", cursor: "pointer", minHeight: 170, borderColor: formule === f.id ? "var(--orange)" : undefined, background: formule === f.id ? "var(--orange-bg)" : undefined }}>
            <span className="row-between"><span className="strong" style={{ fontSize: 18 }}>{f.label}</span>{f.id === "annuel" && <Chip tone="orange">Conseillé</Chip>}</span>
            <span className="strong" style={{ fontSize: 32, fontWeight: 900 }}>{fcfa(f.prix)}</span>
            <span className="small muted">{f.unite}</span>
            <span className="small muted" style={{ marginTop: "auto" }}>{f.note}</span>
          </button>
        ))}
      </div>

      {!ABONNEMENT_OUVERT && !a?.actif ? (
        <div className="row">
          <a className="btn btn-orange btn-lg" href={LIEN_ETRE_PREVENU}><Icon name="bell" size={18} /> Être prévenu de l’ouverture</a>
          <span className="small muted">Un e-mail, rien d’autre. Votre accès AIW reste inchangé.</span>
        </div>
      ) : (
      <div className="row">
        <BoutonPaiement className="btn btn-orange btn-lg" prix={choisie.prix} />
        <span className="small muted">Le paiement par Mobile Money, carte ou portefeuille électronique arrive directement dans AIW.</span>
      </div>
      )}

      <section className="stack" aria-labelledby="comparaison">
        <h2 id="comparaison" className="h2">Accès ou abonnement</h2>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="comparaison-ligne is-tete">
            <span className="strong">Ce qui est inclus</span>
            <span className="strong" style={{ textAlign: "center" }}>Accès · {fcfa(PRIX.acces)}</span>
            <span className="strong" style={{ textAlign: "center", color: "var(--orange)" }}>Abonnement</span>
          </div>
          {LIGNES.map((l) => (
            <div key={l.label} className="comparaison-ligne">
              <span>{l.label}</span>
              <span style={{ display: "flex", justifyContent: "center" }}><Cellule v={l.base} /></span>
              <span style={{ display: "flex", justifyContent: "center" }}><Cellule v={l.abo} orange /></span>
            </div>
          ))}
        </div>
      </section>

      <section className="card stack" aria-labelledby="equipes">
        <h2 id="equipes" className="h2">Pour une équipe ?</h2>
        <p className="muted">Entreprises, ONG, écoles : nous préparons une offre pour plusieurs personnes, avec le suivi de la progression.</p>
        <div className="row">
          <a className="btn btn-secondary btn-plain" href={`mailto:support@parlonsads.com?subject=${encodeURIComponent("Offre équipe AIW")}`}><Icon name="users" size={18} /> Nous écrire</a>
        </div>
      </section>
    </Page>
  );
}
