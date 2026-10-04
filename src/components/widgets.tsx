"use client";

import Link from "next/link";
import { tacheHref, useResource, type Progression } from "@/lib/kit-api";
import { useMoi } from "@/lib/moi";
import { dateLongue, FORMULES } from "@/lib/offre";
import { Icon } from "./icon";
import { Bar, IconBox } from "./ui";

export function useProgression() {
  return useResource<Progression>("/api/progression");
}

const INITIALES = ["D", "L", "M", "M", "J", "V", "S"];

// Les 7 derniers jours, aujourd'hui en dernier (même ordre que l'API).
function septDerniersJours() {
  const aujourdHui = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const jour = new Date(aujourdHui);
    jour.setDate(aujourdHui.getDate() - (6 - i));
    return INITIALES[jour.getDay()];
  });
}

// Série, tâches faites et régularité de la semaine : la colonne de droite
// de chaque écran commence par cette carte.
export function StatsCard() {
  const { data } = useProgression();
  const serie = data?.serie_jours ?? 0;
  const faites = data?.taches_faites_total ?? 0;
  const total = data?.taches_total ?? 0;
  const nouveautes = useMoi()?.nouveautes ?? 0;
  return (
    <section className="card pad-md stack" aria-label="Votre progression">
      <div className="stats">
        <span className="stat is-gold"><Icon name="flame" size={22} strokeWidth={2.2} /><b>{data ? serie : "–"}</b> {serie > 1 ? "jours" : "jour"}</span>
        <span className="stat is-green"><Icon name="check" size={22} strokeWidth={2.4} /><b>{data ? faites : "–"}</b> {faites > 1 ? "tâches" : "tâche"}</span>
        <Link className="icon-btn" href="/nouveau" aria-label={nouveautes > 0 ? `Nouveautés : ${nouveautes >= 9 ? "9 ou plus" : nouveautes} à lire` : "Nouveautés"}>
          <Icon name="bell" size={20} />
          {nouveautes > 0 && <span className="pastille" aria-hidden="true">{nouveautes >= 9 ? "9+" : nouveautes}</span>}
        </Link>
      </div>
      <Bar value={total ? (faites / total) * 100 : 0} thin label={`${faites} tâches faites sur ${total}`} />
      <div className="week" aria-label="Jours d’activité des 7 derniers jours">
        {(data ? septDerniersJours() : Array(7).fill("")).map((jour: string, i: number) => {
          const on = Boolean(data?.jours_actifs_semaine?.[i]);
          return (
            <span key={i} className={`week-day${on ? " is-on" : ""}`}>
              <span>{on && <Icon name="flame" size={16} />}</span>
              <span aria-hidden="true">{jour}</span>
              <span className="sr-only">{on ? "actif" : "inactif"}</span>
            </span>
          );
        })}
      </div>
    </section>
  );
}

// Reprise de la dernière tâche ouverte.
export function ReprendreCard() {
  const { data } = useProgression();
  const reprise = data?.reprise;
  if (!reprise) return null;
  return (
    <section className="resume" aria-label="Reprendre">
      <div className="grow stack-sm" style={{ minWidth: 220 }}>
        <p className="kicker is-light">Reprendre</p>
        <h2>{reprise.tache_titre}</h2>
        <p>{reprise.metier_nom}</p>
      </div>
      <Link className="btn btn-mint" href={tacheHref(reprise.tache_id, reprise.metier_slug)}>Continuer</Link>
    </section>
  );
}

// Carte de l'abonnement : invitation (non abonné) ou état (abonné).
export function AbonnementCard() {
  const moi = useMoi();
  if (moi === undefined) return null;
  const a = moi?.abonnement;
  if (a?.actif) {
    const formule = FORMULES.find((f) => f.id === a.periode)?.label.toLowerCase() ?? "";
    return (
      <section className="card pad-md row" style={{ alignItems: "flex-start", flexWrap: "nowrap" }}>
        <IconBox name="shield" tone="orange" />
        <div className="stack-sm">
          <h3 className="h3">Abonnement {formule} actif</h3>
          <p className="small muted">
            {a.periode === "a_vie" ? "Tout AIW est ouvert, sans échéance." : `Tout AIW est ouvert jusqu’au ${dateLongue(a.fin_le)}.`}
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="card pad-md stack">
      <div className="row" style={{ alignItems: "flex-start", flexWrap: "nowrap" }}>
        <IconBox name="gift" tone="orange" />
        <div className="stack-sm">
          <h3 className="h3">Passez à l’abonnement</h3>
          <p className="small muted">Guides revendables, sur-mesure et chat. Au mois, à l’année ou à vie.</p>
        </div>
      </div>
      <Link className="btn btn-orange btn-block" href="/abonnement">Voir les formules</Link>
    </section>
  );
}
