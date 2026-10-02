"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { category } from "@/lib/catalogue";
import { api, automatisationLabel, chemins, type IA, iaLabels, type MetierDetail, officielLabel, tacheHref, type TacheDetail, useResource } from "@/lib/kit-api";
import { Icon } from "./icon";
import { iconeCategorie } from "./parcours";
import { Chip, IconBox, Kicker, ResourceState } from "./ui";

const LIENS_IA: Record<IA, string> = {
  chatgpt: "https://chatgpt.com/",
  claude: "https://claude.ai/new",
  gemini: "https://gemini.google.com/app",
};

const CONSEILS_IA: Record<IA, string> = {
  chatgpt: "Collez le prompt dans une nouvelle conversation. La version gratuite suffit pour cette tâche.",
  claude: "Collez le prompt dans une nouvelle conversation. Joignez vos fichiers avec le trombone si la tâche en demande.",
  gemini: "Sur Android, ouvrez l’application Gemini et collez le prompt. Vous pouvez aussi joindre une photo ou un fichier.",
};

async function copier(texte: string) {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch {
    return false;
  }
}

function useStatut(id: string, metier: string, initial: { fait: boolean; favori: boolean }) {
  const [statut, setStatut] = useState(initial);
  const [erreur, setErreur] = useState("");
  const verrou = useRef({ fait: false, favori: false });
  async function basculer(champ: "fait" | "favori") {
    if (verrou.current[champ]) return;
    verrou.current[champ] = true;
    const precedent = statut[champ];
    setStatut((s) => ({ ...s, [champ]: !precedent }));
    setErreur("");
    try {
      const url = `/api/taches/${encodeURIComponent(id)}/${champ === "fait" ? "faite" : `favori?metier=${encodeURIComponent(metier)}`}`;
      const r = await api<{ ok: boolean; fait?: boolean; favori?: boolean }>(url, { method: "POST", body: JSON.stringify({ [champ]: !precedent }) });
      if (!r.ok || r[champ] !== !precedent) throw new Error("L’enregistrement n’a pas été confirmé. Réessayez.");
    } catch (e) {
      setStatut((s) => ({ ...s, [champ]: precedent }));
      setErreur(e instanceof Error ? e.message : "L’enregistrement a échoué.");
    } finally {
      verrou.current[champ] = false;
    }
  }
  return { statut, erreur, basculer };
}

function Chargee({ id, metier, data }: { id: string; metier: string; data: TacheDetail }) {
  const { tache, exercices } = data;
  const [cas, setCas] = useState(0);
  const [ia, setIa] = useState<IA>(data.ia_par_defaut ?? "chatgpt");
  const [copie, setCopie] = useState<"" | "ok" | "echec">("");
  const [copieRoutine, setCopieRoutine] = useState(false);
  const { statut, erreur, basculer } = useStatut(id, metier, { fait: data.fait, favori: data.favori });
  const metierDetail = useResource<MetierDetail>(`/api/metiers/${encodeURIComponent(metier)}`);

  const exercice = exercices[cas];
  const prompt = exercice?.prompts[ia] ?? "";
  const aCopier = `${prompt}${exercice?.donnees ? `\n\n---\nDonnées du cas pratique\n\n${exercice.donnees}` : ""}`;
  const mep = data.mise_en_place?.[ia] ?? undefined;
  const categorie = category(tache.code);
  const taches = metierDetail.data?.taches ?? [];
  const position = taches.findIndex((t) => t.id === id);
  const suivante = position >= 0 ? taches.slice(position + 1).find((t) => !t.fait) ?? taches[position + 1] : undefined;
  const retour = `/metiers/${encodeURIComponent(metier)}`;

  async function copierPrompt() {
    const ok = await copier(aCopier);
    setCopie(ok ? "ok" : "echec");
    window.setTimeout(() => setCopie(""), 2200);
  }

  return (
    <div className="task">
      <header className="task-top">
        <Link className="icon-btn is-flat" href={retour} aria-label="Fermer et revenir au parcours"><Icon name="x" size={26} /></Link>
        <div className="grow">
          <span>{metierDetail.data?.metier.nom ?? "Parcours"} · {categorie}</span>
          <h1>{tache.titre}</h1>
        </div>
        <button type="button" className="icon-btn" aria-pressed={statut.favori} aria-label={statut.favori ? "Retirer des favoris" : "Ajouter aux favoris"} onClick={() => basculer("favori")} style={statut.favori ? { color: "var(--gold)", borderColor: "#f5dfa3", background: "var(--gold-bg)" } : undefined}>
          <Icon name="star" size={20} filled={statut.favori} />
        </button>
      </header>

      <main id="contenu" className="task-split">
        <section className="task-left" aria-label="Consignes">
          <div className="chips">
            <Chip tone="green" icon={iconeCategorie[categorie] ?? "list"}>{categorie}</Chip>
            <Chip>{tache.code}</Chip>
            {statut.fait && <Chip tone="green" icon="check">Faite</Chip>}
          </div>
          <h2 className="h1" style={{ fontSize: 30 }}>{tache.titre}</h2>

          {tache.limite_connue && (
            <div className="notice" role="note">
              <Icon name="help" size={20} />
              <p>
                À savoir : cette tâche est plus délicate avec certaines IA.
                {tache.ia_alternative_conseillee && <> Pour de meilleurs résultats, préférez <b>{iaLabels[tache.ia_alternative_conseillee]}</b>.</>}
              </p>
            </div>
          )}

          {exercices.length > 1 && (
            <div className="seg" role="tablist" aria-label="Cas pratiques">
              {exercices.map((e, i) => (
                <button key={i} type="button" role="tab" aria-selected={cas === i} onClick={() => setCas(i)}>Cas {i + 1}</button>
              ))}
            </div>
          )}

          {exercice ? (
            <>
              <div className="situation">
                <Kicker>La situation</Kicker>
                <h3 className="h3">{exercice.titre}</h3>
                {exercice.contexte && <p>{exercice.contexte}</p>}
                {exercice.donnees && (
                  <details>
                    <summary className="link" style={{ cursor: "pointer" }}>Voir les données du cas</summary>
                    <pre style={{ whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)", fontSize: 13.5, lineHeight: 1.6, margin: "8px 0 0" }}>{exercice.donnees}</pre>
                  </details>
                )}
              </div>
              {exercice.travail_a_faire && (
                <div className="stack-sm">
                  <Kicker>Ce que vous devez obtenir</Kicker>
                  <p style={{ whiteSpace: "pre-line" }}>{exercice.travail_a_faire}</p>
                </div>
              )}
            </>
          ) : (
            <p className="muted">Le cas pratique de cette tâche arrive bientôt.</p>
          )}

          {mep && mep.outils.length > 0 && (
            <div className="stack">
              <Kicker>Ce qu’il vous faut avec {iaLabels[ia]}</Kicker>
              {mep.outils.map((o) => (
                <a key={o.nom} className="card pad-sm row" href={o.lien} target="_blank" rel="noreferrer" style={{ flexWrap: "nowrap", color: "var(--ink)" }}>
                  <IconBox name="link" size="sm" tone={o.type === "officiel" ? undefined : "blue"} />
                  <span className="grow stack-sm" style={{ gap: 2 }}>
                    <span className="strong">{o.nom}</span>
                    <span className="tiny muted">{o.type === "officiel" ? officielLabel[ia] : "Outil tiers"}</span>
                  </span>
                  <Icon name="external" size={18} />
                </a>
              ))}
            </div>
          )}

          <div className="stack-sm">
            <Kicker>Étapes</Kicker>
            <ol className="steps">
              <li>Choisissez votre IA à droite.</li>
              <li>Copiez le prompt : les données du cas sont ajoutées automatiquement.</li>
              <li>Ouvrez votre IA, collez, envoyez.</li>
              <li>Relisez le résultat, puis refaites l’exercice avec vos propres informations.</li>
            </ol>
          </div>
        </section>

        <section className="task-right" aria-label="Espace de travail">
          <div className="seg" role="group" aria-label="Votre IA">
            {chemins.map((c) => (
              <button key={c} type="button" aria-pressed={ia === c} onClick={() => setIa(c)}>{iaLabels[c]}</button>
            ))}
          </div>

          <div className="prompt-panel">
            <header>
              <span className="kicker is-light">Le prompt · {iaLabels[ia]}</span>
              {exercice?.donnees && <span className="tiny" style={{ color: "var(--night-soft)" }}>+ données du cas à la copie</span>}
            </header>
            <pre>{prompt || "Le prompt de ce cas n’est pas encore disponible pour cette IA."}</pre>
          </div>

          <div className="row">
            <button type="button" className="btn btn-plain" onClick={copierPrompt} disabled={!prompt}>
              <Icon name={copie === "ok" ? "check" : "copy"} size={18} />
              {copie === "ok" ? "Copié !" : copie === "echec" ? "Copie impossible" : "Copier le prompt"}
            </button>
            <a className="btn btn-secondary btn-plain" href={LIENS_IA[ia]} target="_blank" rel="noreferrer">
              <Icon name="external" size={18} /> Ouvrir {iaLabels[ia]}
            </a>
          </div>
          <p className="tip">{CONSEILS_IA[ia]}</p>

          {mep?.tachePlanifiee && (
            <div className="card stack">
              <div className="row-between">
                <div className="stack-sm" style={{ gap: 2 }}>
                  <Kicker>Automatiser avec {automatisationLabel[ia]}</Kicker>
                  <h3 className="h3">{mep.tachePlanifiee.nom}</h3>
                </div>
                <Chip icon="cycle">{mep.tachePlanifiee.frequence}</Chip>
              </div>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)", fontSize: 13.5, lineHeight: 1.6, background: "var(--bg)", borderRadius: 14, padding: 14, maxHeight: 260, overflow: "auto" }}>{mep.tachePlanifiee.prompt}</pre>
              <div className="row">
                <button type="button" className="btn btn-secondary btn-sm btn-plain" onClick={async () => { setCopieRoutine(await copier(mep.tachePlanifiee!.prompt)); window.setTimeout(() => setCopieRoutine(false), 2000); }}>
                  <Icon name="copy" size={16} /> {copieRoutine ? "Copié !" : "Copier la routine"}
                </button>
                {mep.tachePlanifiee.modeApprobation && <Chip tone={mep.tachePlanifiee.modeApprobation === "Manuelle" ? "gold" : "green"}>Validation {mep.tachePlanifiee.modeApprobation.toLowerCase()}</Chip>}
              </div>
              {mep.tachePlanifiee.raisonApprobation && <p className="small muted">{mep.tachePlanifiee.raisonApprobation}</p>}
            </div>
          )}

          {erreur && <p className="form-error" role="alert">{erreur}</p>}
          <div className="row-between" style={{ paddingTop: 6 }}>
            <button type="button" className={`btn btn-plain${statut.fait ? "" : " btn-secondary"}`} aria-pressed={statut.fait} onClick={() => basculer("fait")}>
              <Icon name="check" size={18} /> {statut.fait ? "Tâche faite" : "Marquer comme faite"}
            </button>
            {suivante ? (
              <Link className="btn btn-plain" href={tacheHref(suivante.id, metier)}>Tâche suivante <Icon name="arrow" size={18} /></Link>
            ) : (
              <Link className="btn btn-secondary btn-plain" href={retour}>Retour au parcours</Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export function TacheEcran({ id, metier }: { id: string; metier: string }) {
  const { data, error, retry } = useResource<TacheDetail>(`/api/taches/${encodeURIComponent(id)}?metier=${encodeURIComponent(metier)}`);
  if (!data)
    return (
      <div className="task">
        <header className="task-top">
          <Link className="icon-btn is-flat" href="/" aria-label="Revenir au parcours"><Icon name="x" size={26} /></Link>
          <div className="grow"><span>Tâche</span></div>
        </header>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}><ResourceState error={error} retry={retry} /></div>
      </div>
    );
  return <Chargee key={`${id}-${metier}`} id={id} metier={metier} data={data} />;
}
