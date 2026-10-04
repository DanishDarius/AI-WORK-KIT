"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./icon";
import { Chip } from "./ui";

export type EtapePremiersPas = {
  cle: string;
  titre: string;
  minutes: number;
  intro: string;
  gestes: string[];
  aSavoir: string;
  /** Lien de la vidéo du geste, quand elle existe. */
  video: string | null;
};

// Les étapes cochées restent dans ce navigateur : c'est un simple pense-bête,
// il ne part pas au serveur.
const CLE = "aw-premiers-pas";
const EVENEMENT = "aw-premiers-pas-maj";

function lire(): string {
  try {
    return localStorage.getItem(CLE) ?? "";
  } catch {
    return "";
  }
}

function abonner(rappel: () => void) {
  window.addEventListener("storage", rappel);
  window.addEventListener(EVENEMENT, rappel);
  return () => {
    window.removeEventListener("storage", rappel);
    window.removeEventListener(EVENEMENT, rappel);
  };
}

export function EtapesPremiersPas({ etapes }: { etapes: EtapePremiersPas[] }) {
  const brut = useSyncExternalStore(abonner, lire, () => "");
  const faites = new Set(brut.split(",").filter(Boolean));

  function basculer(cle: string) {
    const suivant = new Set(faites);
    if (suivant.has(cle)) suivant.delete(cle);
    else suivant.add(cle);
    try {
      localStorage.setItem(CLE, [...suivant].join(","));
    } catch {
      // Navigation privée : la coche vaut pour cette page seulement.
    }
    window.dispatchEvent(new Event(EVENEMENT));
  }

  return (
    <>
      {etapes.map((e, i) => {
        const faite = faites.has(e.cle);
        return (
          <section key={e.cle} className="card stack" aria-labelledby={`pas-${e.cle}`}>
            <div className="row-between">
              <h2 id={`pas-${e.cle}`} className="h2">{i + 1}. {e.titre}</h2>
              {faite ? <Chip tone="green" icon="check">Fait</Chip> : <Chip icon="clock">environ {e.minutes} min</Chip>}
            </div>
            <p className="muted">{e.intro}</p>
            <ol className="steps">
              {e.gestes.map((g) => <li key={g}>{g}</li>)}
            </ol>
            <div className="notice" role="note">
              <span style={{ flex: "none", display: "inline-flex" }}><Icon name="help" size={20} /></span>
              <p><b>À savoir.</b> {e.aSavoir}</p>
            </div>
            <div className="row">
              <button type="button" className={`btn btn-sm btn-plain${faite ? "" : " btn-secondary"}`} aria-pressed={faite} onClick={() => basculer(e.cle)}>
                <Icon name="check" size={16} /> {faite ? "C’est fait" : "Marquer comme fait"}
              </button>
              {e.video && (
                <a className="btn btn-secondary btn-sm btn-plain" href={e.video} target="_blank" rel="noreferrer"><Icon name="video" size={16} /> Voir la vidéo</a>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
