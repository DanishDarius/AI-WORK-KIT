"use client";
import { useId, useState } from "react";
import {
  chemins,
  Exercice,
  IA,
  iaLabels,
  TacheDetail,
  useResource,
} from "@/lib/kit-api";
import { Back, Badge, Intro, ResourceState } from "./kit-ui";
function Cas({
  exercice,
  index,
  initial,
}: {
  exercice: Exercice;
  index: number;
  initial: IA | null;
}) {
  const uid = useId();
  const [active, setActive] = useState<IA>(initial || "chatgpt");
  const [copied, setCopied] = useState("");
  const prompt = exercice.prompts[active];
  async function copy() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied("Prompt copié.");
    } catch {
      setCopied(
        "Copie impossible. Sélectionnez le texte du prompt pour le copier manuellement.",
      );
    }
  }
  return (
    <article className="panel mb-6">
      <p className="eyebrow">Cas fictif {index + 1}</p>
      <h2>{exercice.titre}</h2>
      <div className="my-6 grid gap-5 lg:grid-cols-2">
        {(
          [
            ["Contexte", exercice.contexte],
            ["Données", exercice.donnees],
            ["Travail à faire", exercice.travail_a_faire],
          ] as const
        ).map(
          ([title, text]) =>
            text && (
              <section
                key={title}
                className={
                  title === "Travail à faire"
                    ? "practice-block lg:col-span-2"
                    : ""
                }
              >
                <h3 className="mb-2 text-sm">{title}</h3>
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[var(--muted)]">
                  {text}
                </p>
              </section>
            ),
        )}
      </div>
      <div className="prompt-box">
        <div
          role="tablist"
          aria-label={`Prompts du cas ${index + 1}`}
          className="flex flex-wrap gap-1 border-b border-[var(--border)] p-2"
        >
          {chemins.map((ia, i) => (
            <button
              key={ia}
              id={`${uid}-${ia}`}
              role="tab"
              aria-selected={active === ia}
              aria-controls={`${uid}-panel`}
              tabIndex={active === ia ? 0 : -1}
              className="prompt-tab"
              onClick={() => {
                setActive(ia);
                setCopied("");
              }}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight"
                    ? (i + 1) % 3
                    : event.key === "ArrowLeft"
                      ? (i + 2) % 3
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : -1;
                if (next >= 0) {
                  event.preventDefault();
                  setActive(chemins[next]);
                  setCopied("");
                  document.getElementById(`${uid}-${chemins[next]}`)?.focus();
                }
              }}
            >
              <span className={`ia-dot dot-${ia}`} />
              {iaLabels[ia]}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-${active}`}
          tabIndex={0}
          className="p-4 sm:p-5"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold">
              Votre prompt pour {iaLabels[active]}
            </p>
            <button className="button" disabled={!prompt} onClick={copy}>
              Copier le prompt
            </button>
          </div>
          <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap break-words font-mono text-sm leading-7">
            {prompt || "Ce prompt n’est pas disponible pour cette IA."}
          </pre>
          <p className="mt-3 text-sm text-[var(--muted)]" role="status">
            {copied}
          </p>
        </div>
      </div>
    </article>
  );
}
function TacheContent({ id, metier }: { id: string; metier: string }) {
  const { data, error, retry } = useResource<TacheDetail>(
    `/api/taches/${encodeURIComponent(id)}?metier=${encodeURIComponent(metier)}`,
  );
  return (
    <>
      <Back href={`/metiers/${encodeURIComponent(metier)}`}>
        Retour au métier
      </Back>
      {!data ? (
        <ResourceState error={error} retry={retry} />
      ) : (
        <>
          <Intro eyebrow={`Tâche ${data.tache.code}`} title={data.tache.titre}>
            Explorez les cas fictifs et copiez le prompt dans votre IA.
          </Intro>
          <div className="mb-6 flex items-center gap-3 text-sm">
            <span>Votre chemin</span>
            <Badge ia={data.ia_par_defaut} />
          </div>
          {data.tache.limite_connue && (
            <aside className="exception mb-6">
              <h2 className="text-base">Point de vigilance : limite connue</h2>
              <p className="mt-2 text-sm leading-6">
                Cette tâche comporte une limite connue.
                {data.tache.ia_alternative_conseillee
                  ? ` L’IA alternative conseillée est ${iaLabels[data.tache.ia_alternative_conseillee]}. Vous pouvez consulter son prompt dans les onglets ci-dessous.`
                  : "Aucune IA alternative n’est indiquée pour cette tâche."}
              </p>
            </aside>
          )}
          {data.exercices.map((exercice, index) => (
            <Cas
              key={`${index}-${data.ia_par_defaut}`}
              exercice={exercice}
              index={index}
              initial={data.ia_par_defaut}
            />
          ))}
          {!data.exercices.length && (
            <p className="panel">
              Aucun cas pratique disponible pour cette tâche.
            </p>
          )}
        </>
      )}
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
  return <TacheContent id={id} metier={metier} />;
}
