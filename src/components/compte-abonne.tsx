"use client";

import Link from "next/link";
import { useState } from "react";
import { api, useResource } from "@/lib/kit-api";
import { Icon } from "./icon";
import { Chip, ResourceState } from "./ui";

// Deux blocs de la page Profil : ce que le client veut recevoir, et la
// communauté des abonnés (lien WhatsApp, session en direct, replays).

type Choix = { email_semaine: boolean; rappels_echeance: boolean };

const LIGNES: { cle: keyof Choix; titre: string; texte: string }[] = [
  { cle: "email_semaine", titre: "L’e-mail de la semaine", texte: "Une fois par semaine, ce qui est paru dans le fil Nouveau. Envoyé aux abonnés." },
  { cle: "rappels_echeance", titre: "Les rappels d’échéance", texte: "5 jours avant la fin d’un abonnement au mois ou à l’année, puis le jour même." },
];

export function Notifications() {
  const { data, error, retry, setData } = useResource<Choix>("/api/notifications");
  const [erreur, setErreur] = useState("");

  async function basculer(cle: keyof Choix) {
    if (!data) return;
    const voulu = !data[cle];
    setData((d) => ({ ...d, [cle]: voulu }));
    setErreur("");
    try {
      await api("/api/notifications", { method: "PUT", body: JSON.stringify({ [cle]: voulu }) });
    } catch (e) {
      setData((d) => ({ ...d, [cle]: !voulu }));
      setErreur(e instanceof Error ? e.message : "L’enregistrement a échoué.");
    }
  }

  if (!data) return <ResourceState error={error} retry={retry} />;
  return (
    <div className="stack-sm">
      {LIGNES.map((l) => (
        <label key={l.cle} className="list-row" style={{ cursor: "pointer", alignItems: "flex-start" }}>
          <input type="checkbox" checked={data[l.cle]} onChange={() => basculer(l.cle)} style={{ width: 22, height: 22, marginTop: 2, accentColor: "var(--green)", flex: "none" }} />
          <span className="grow stack-sm" style={{ gap: 2 }}>
            <span className="strong">{l.titre}</span>
            <span className="small muted">{l.texte}</span>
          </span>
        </label>
      ))}
      <p className="tiny muted">La pastille sur la cloche, dans l’application, signale toujours les nouveautés.</p>
      {erreur && <p className="form-error" role="alert">{erreur}</p>}
    </div>
  );
}

type Session = { titre: string; debut_le: string; lien: string | null };
type Communaute = { abonne: boolean; lien: string | null; session: Session | null; replays: { titre: string; debut_le: string; replay_url: string | null }[] };

function dateEtHeure(iso: string) {
  return `${new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "UTC" }).format(new Date(iso))} (heure GMT)`;
}

export function CommunauteAbonnes() {
  const { data, error, retry } = useResource<Communaute>("/api/communaute");
  if (!data) return <ResourceState error={error} retry={retry} />;

  const session = data.session && (
    <div className="card pad-md stack-sm" style={{ borderBottomWidth: 2 }}>
      <div className="row-between"><h3 className="h3">Prochaine session en direct</h3><Chip icon="calendar">45 minutes</Chip></div>
      <p className="strong">{data.session.titre}</p>
      <p className="small muted">{dateEtHeure(data.session.debut_le)}</p>
      {data.session.lien && (
        <div className="row"><a className="btn btn-sm btn-plain" href={data.session.lien} target="_blank" rel="noreferrer"><Icon name="external" size={16} /> Rejoindre la session</a></div>
      )}
    </div>
  );

  if (!data.abonne)
    return (
      <div className="stack">
        <p className="muted">La communauté WhatsApp et la session en direct de chaque mois sont réservées aux abonnés : vous y posez vos questions et vous voyez une ressource en démonstration.</p>
        {session}
        <div className="row"><Link className="btn btn-orange btn-sm" href="/abonnement">Voir les formules</Link></div>
      </div>
    );

  return (
    <div className="stack">
      {data.lien ? (
        <div className="stack-sm">
          <p className="muted">Annonces de la semaine, questions entre membres, entraide. Ce lien est personnel : merci de ne pas le partager.</p>
          <div className="row"><a className="btn btn-sm btn-plain" href={data.lien} target="_blank" rel="noreferrer"><Icon name="chat" size={16} /> Rejoindre la communauté WhatsApp</a></div>
        </div>
      ) : (
        <p className="muted">La communauté WhatsApp des abonnés ouvre bientôt. Le lien d’invitation apparaîtra ici.</p>
      )}
      {session ?? <p className="small muted">La date de la prochaine session en direct sera annoncée ici.</p>}
      {data.replays.length > 0 && (
        <div className="stack-sm">
          <h3 className="h3">Replays</h3>
          {data.replays.map((r) => (
            <a key={r.debut_le} className="link small" href={r.replay_url ?? "#"} target="_blank" rel="noreferrer">
              {r.titre} <Icon name="external" size={14} /><span className="sr-only"> (nouvel onglet)</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
