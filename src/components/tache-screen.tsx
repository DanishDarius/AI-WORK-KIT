"use client";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import {
  chemins,
  Exercice,
  IA,
  iaLabels,
  TacheDetail,
  useResource,
} from "@/lib/kit-api";
import { category, categoryIcon, classification, classificationLabel, metierLabel } from "@/lib/catalogue";
import { Back, Intro, ResourceState } from "./kit-ui";
import { Icon } from "./kit-icons";
import { FaitCheckbox, FavoriButton, useTacheActions } from "./tache-actions";
import { MiseEnPlacePanel } from "./mise-en-place-panel";

const aiLinks = {
  chatgpt: "https://chatgpt.com/",
  claude: "https://claude.ai/",
  gemini: "https://gemini.google.com/",
};
const strip = (s: string | null) =>
  (s || "").replace(/^(Contexte|Travail à faire)\s*:\s*/, "");
const caseTitle = (s: string) => s.replace(/^Cas fictif \d+\s*[—–-]\s*/, "");

function CaseWorkspace({
  exercice,
  active,
  onIAChange,
}: {
  exercice: Exercice;
  active: IA;
  onIAChange: (ia: IA) => void;
}) {
  const uid = useId();
  const promptRef = useRef<HTMLPreElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const prompt = exercice.prompts[active];
  const content = `${prompt || ""}${exercice.donnees ? `\n\n---\nDonnées du cas pratique\n\n${exercice.donnees}` : ""}`;
  async function copy() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(
        `Le prompt et les données sont copiés. Collez-les dans ${iaLabels[active]}.`,
      );
    } catch {
      setManualCopy(true);
      setExpanded(true);
      setCopied(
        "La copie automatique n’est pas disponible. Sélectionnez le contenu complet ci-dessous pour le copier.",
      );
    }
  }
  const selectAll = () => {
    const node = promptRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };
  function changeIA(ia: IA) {
    onIAChange(ia);
    setCopied("");
    setManualCopy(false);
  }
  return (
    <div className="aw-workspace">
      <section className="aw-panel">
        <h2>
          <span className="aw-number">01</span> Prenez connaissance du cas
        </h2>
        <p className="aw-bodytext">{strip(exercice.contexte)}</p>
        {exercice.donnees && (
          <details>
            <summary>Voir les données du cas</summary>
            <pre>{exercice.donnees}</pre>
          </details>
        )}
        <div className="aw-workblock">
          <h2>
            <span className="aw-number">02</span> Votre mission
          </h2>
          <div className="aw-taskwork aw-bodytext">
            {strip(exercice.travail_a_faire)}
          </div>
        </div>
      </section>
      <section className="aw-panel">
        <h2>
          <span className="aw-number">03</span> Passez à la pratique
        </h2>
        <p className="aw-muted text-xs">
          Votre prompt, préparé pour l’IA de votre choix.
        </p>
        <div className="aw-ai" role="tablist" aria-label="Choisir votre IA">
          {chemins.map((ia, i) => (
            <button
              key={ia}
              id={`${uid}-${ia}`}
              role="tab"
              aria-selected={active === ia}
              aria-controls={`${uid}-panel`}
              tabIndex={active === ia ? 0 : -1}
              onClick={() => changeIA(ia)}
              onKeyDown={(e) => {
                const next =
                  e.key === "ArrowRight"
                    ? (i + 1) % 3
                    : e.key === "ArrowLeft"
                      ? (i + 2) % 3
                      : e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 2
                          : -1;
                if (next >= 0) {
                  e.preventDefault();
                  changeIA(chemins[next]);
                  document.getElementById(`${uid}-${chemins[next]}`)?.focus();
                }
              }}
            >
              {active === ia && <span className={`ia-dot dot-${ia}`} />}
              {iaLabels[ia]}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-${active}`}
          tabIndex={0}
        >
          <div className="aw-prompt">
            <div className="aw-promptlabel">
              <span>Prompt {iaLabels[active]}</span>
              <Icon name="writing" />
            </div>
            <pre ref={promptRef}>
              {manualCopy
                ? content
                : prompt
                  ? expanded || prompt.length <= 570
                    ? prompt
                    : `${prompt.slice(0, 570)}…`
                  : "Ce prompt n’est pas disponible pour cette IA."}
            </pre>
            {prompt && prompt.length > 570 && !manualCopy && (
              <button
                className="aw-expand"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                {expanded ? "Réduire le prompt" : "Lire le prompt complet"}
                <Icon name="down" />
              </button>
            )}
          </div>
          <button
            className="aw-btn aw-primary aw-copy"
            disabled={!prompt}
            onClick={copy}
          >
            <Icon name="copy" />
            Copier le prompt + les données
          </button>
          <p className="aw-caption">
            Le contenu complet est copié, même si l’aperçu est réduit.
          </p>
          {manualCopy && (
            <button className="aw-btn mt-3" onClick={selectAll}>
              Sélectionner le contenu complet
            </button>
          )}
          <p role="status" className="aw-muted text-xs mt-3">
            {copied}
          </p>
          <div className="aw-next">
            <strong>Et maintenant ?</strong>
            <p>
              Ouvrez {iaLabels[active]}, collez le contenu dans une nouvelle
              conversation et comparez la réponse à votre mission.
            </p>
            <a
              className="aw-btn"
              href={aiLinks[active]}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouvrir {iaLabels[active]}
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function LoadedTask({
  id,
  metier,
  initial,
}: {
  id: string;
  metier: string;
  initial: TacheDetail;
}) {
  const [data, setData] = useState(initial);
  const [exercise, setExercise] = useState(0);
  const [ia, setIA] = useState<IA>(initial.ia_par_defaut || "chatgpt");
  const [tab, setTab] = useState<"entrainer" | "mep">("entrainer");
  const actions = useTacheActions({
    id,
    metier,
    value: data,
    onChange: (patch) => setData((previous) => ({ ...previous, ...patch })),
  });
  return (
    <>
      <nav className="aw-bread" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <Icon name="chevron" />
        <Link href="/metiers">Métiers</Link>
        <Icon name="chevron" />
        <Link href={`/metiers/${encodeURIComponent(metier)}`}>
          {metierLabel(metier)}
        </Link>
        <Icon name="chevron" />
        <span>Cas pratique</span>
      </nav>
      <div className="aw-task-title-row">
        <section className="aw-taskhead">
          <div className="aw-eyebrow">
            <Icon name={categoryIcon(data.tache.code)} />
            {category(data.tache.code)} · {data.tache.code}
            <span
              className={`aw-classif aw-classif-${classification(data.tache.code).toLowerCase()}`}
            >
              <i />
              {classificationLabel[classification(data.tache.code)]}
            </span>
          </div>
          <h1>{data.tache.titre}</h1>
          <div className="aw-meta">
            <span>
              <Icon name="layers" />
              {data.exercices.length} cas pratiques
            </span>
            <span>
              <Icon name="sparkles" />3 versions de prompt
            </span>
            <span>Données fictives du kit</span>
          </div>
        </section>
        <FavoriButton
          favori={data.favori}
          titre={data.tache.titre}
          pending={actions.pending.favori}
          onClick={() => actions.toggle("favori")}
        />
      </div>
      {actions.messages.favori && (
        <p className="action-error mb-4" role="alert">
          {actions.messages.favori}
        </p>
      )}
      {data.tache.limite_connue && (
        <aside className="exception mb-6">
          <h2>Point de vigilance : limite connue</h2>
          <p>
            Cette tâche comporte une limite connue.{" "}
            {data.tache.ia_alternative_conseillee
              ? `L’IA alternative conseillée est ${iaLabels[data.tache.ia_alternative_conseillee]}. Son prompt est disponible dans les onglets ci-dessous.`
              : "Vérifiez attentivement le résultat obtenu."}
          </p>
        </aside>
      )}
      <div className="aw-tache-tabs" role="tablist" aria-label="Section de la tâche">
        <button
          role="tab"
          id="tab-entrainer"
          aria-selected={tab === "entrainer"}
          aria-controls="panel-entrainer"
          tabIndex={tab === "entrainer" ? 0 : -1}
          onClick={() => setTab("entrainer")}
        >
          <Icon name="creative" size={15} />
          S&apos;entraîner
        </button>
        <button
          role="tab"
          id="tab-mep"
          aria-selected={tab === "mep"}
          aria-controls="panel-mep"
          tabIndex={tab === "mep" ? 0 : -1}
          onClick={() => setTab("mep")}
        >
          <Icon name="link" size={15} />
          Mettre en place
        </button>
      </div>
      <div
        role="tabpanel"
        id="panel-entrainer"
        aria-labelledby="tab-entrainer"
        hidden={tab !== "entrainer"}
      >
        {data.exercices.length ? (
          <>
            <div
              className="aw-cases"
              role="group"
              aria-label="Choisir un cas pratique"
            >
              {data.exercices.map((ex, i) => (
                <button
                  className="aw-case"
                  key={i}
                  aria-pressed={exercise === i}
                  onClick={() => setExercise(i)}
                >
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>
                    <small>Cas pratique {i + 1}</small>
                    {caseTitle(ex.titre)}
                  </span>
                </button>
              ))}
            </div>
            <CaseWorkspace
              key={exercise}
              exercice={data.exercices[exercise]}
              active={ia}
              onIAChange={setIA}
            />
          </>
        ) : (
          <p className="aw-empty">
            Aucun cas pratique disponible pour cette tâche.
          </p>
        )}
      </div>
      <div
        role="tabpanel"
        id="panel-mep"
        aria-labelledby="tab-mep"
        hidden={tab !== "mep"}
      >
        <MiseEnPlacePanel code={data.tache.code} ia={ia} onIAChange={setIA} />
      </div>
      <section className="panel aw-completion" aria-label="Votre avancement">
        <FaitCheckbox
          fait={data.fait}
          pending={actions.pending.fait}
          titre={data.tache.titre}
          fullLabel
          onChange={() => actions.toggle("fait")}
        />
        <p className="aw-muted text-xs mt-2">
          Vous pouvez revenir sur cette tâche à tout moment.
        </p>
        {actions.messages.fait && (
          <p className="action-error" role="alert">
            {actions.messages.fait}
          </p>
        )}
      </section>
      <div className="aw-backrow">
        <Link
          className="aw-btn aw-ghost"
          href={`/metiers/${encodeURIComponent(metier)}`}
        >
          <Icon name="left" />
          Retour au métier
        </Link>
        {data.exercices.length > 1 && (
          <button
            className="aw-btn"
            onClick={() => setExercise((i) => (i + 1) % data.exercices.length)}
          >
            {exercise < data.exercices.length - 1
              ? "Passer au cas suivant"
              : "Revoir le premier cas"}
            <Icon name="right" />
          </button>
        )}
      </div>
    </>
  );
}
function TacheContent({ id, metier }: { id: string; metier: string }) {
  const { data, error, retry } = useResource<TacheDetail>(
    `/api/taches/${encodeURIComponent(id)}?metier=${encodeURIComponent(metier)}`,
  );
  return data ? (
    <LoadedTask id={id} metier={metier} initial={data} />
  ) : (
    <>
      <Back href={`/metiers/${encodeURIComponent(metier)}`}>
        Retour au métier
      </Back>
      <ResourceState error={error} retry={retry} />
    </>
  );
}
export function TacheScreen({ id, metier }: { id: string; metier: string }) {
  if (!metier)
    return (
      <>
        <Back />
        <Intro
          eyebrow="Métier requis"
          title="Ouvrez cette tâche depuis un métier."
        >
          Le métier permet de retrouver votre chemin IA et les prompts associés.
        </Intro>
      </>
    );
  return <TacheContent key={`${id}-${metier}`} id={id} metier={metier} />;
}
