"use client";
import Link from "next/link";
import { useState } from "react";
import {
  api,
  chemins,
  IA,
  iaLabels,
  MetierDetail,
  tacheHref,
  useResource,
} from "@/lib/kit-api";
import { category, categoryIcon, normalize } from "@/lib/catalogue";
import { ResourceState, Back } from "./kit-ui";
import { Icon } from "./kit-icons";
import { UsageFilters } from "./catalogue-screen";
import { ProgressBar } from "./progression-ui";
import { TacheActions } from "./tache-actions";

export function MetierScreen({ slug }: { slug: string }) {
  const endpoint = `/api/metiers/${encodeURIComponent(slug)}`;
  const { data, error, retry, setData } = useResource<MetierDetail>(endpoint);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [usage, setUsage] = useState("Tout");
  const [limit, setLimit] = useState(6);
  async function choose(chemin: IA) {
    if (!data || saving || data.chemin_choisi === chemin) return;
    setSaving(true);
    setMessage("");
    try {
      const result = await api<{ ok: boolean; chemin_choisi: IA }>(
        `${endpoint}/chemin`,
        { method: "POST", body: JSON.stringify({ chemin }) },
      );
      setData((previous) => ({
        ...previous,
        chemin_choisi: result.chemin_choisi,
        taches: previous.taches.map((t) => ({
          ...t,
          ia_par_defaut: result.chemin_choisi,
        })),
      }));
      setMessage(
        `C’est noté : vos prompts sont adaptés à ${iaLabels[result.chemin_choisi]}.`,
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "L’enregistrement a échoué. Réessayez.",
      );
    } finally {
      setSaving(false);
    }
  }
  if (!data)
    return (
      <>
        <Back />
        <ResourceState error={error} retry={retry} />
      </>
    );
  const taches = data.taches.filter(
    (t) =>
      (usage === "Tout" || category(t.code) === usage) &&
      normalize(`${t.titre} ${category(t.code)}`).includes(normalize(query)),
  );
  return (
    <>
      <nav className="aw-bread" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <Icon name="chevron" />
        <Link href="/metiers">Métiers</Link>
        <Icon name="chevron" />
        <span>{data.metier.nom}</span>
      </nav>
      <section className="aw-jobhero">
        <div>
          <div className="aw-icon aw-blue">
            <Icon name="jobs" size={22} />
          </div>
          <div className="aw-eyebrow">Votre métier, en pratique</div>
          <h1>{data.metier.nom}</h1>
          <p>
            {data.taches.length} tâches de votre quotidien. Pour chacune : un
            cas concret et un prompt prêt à copier.
          </p>
        </div>
        <aside className="aw-panel">
          <h3>Avec quelle IA travaillez-vous ?</h3>
          <p className="aw-muted text-xs">
            Les prompts s’adaptent à l’outil choisi.
          </p>
          <fieldset className="aw-ai" disabled={saving}>
            <legend className="sr-only">Choisir votre chemin IA</legend>
            {chemins.map((ia) => (
              <button
                key={ia}
                className="choice-button"
                aria-pressed={data.chemin_choisi === ia}
                onClick={() => choose(ia)}
              >
                {data.chemin_choisi === ia && (
                  <span className={`ia-dot dot-${ia}`} />
                )}
                {iaLabels[ia]}
              </button>
            ))}
          </fieldset>
          <p className="aw-muted text-xs">
            Vous pouvez en changer à tout moment.
          </p>
          <p role="status" className="aw-muted text-xs mt-3">
            {saving ? "Enregistrement…" : message}
          </p>
        </aside>
      </section>
      <section
        className="aw-metier-progress mb-7"
        aria-label="Progression de ce métier"
      >
        <p className="mb-3 text-sm font-semibold">
          {data.taches_faites}/{data.taches.length} tâches faites
        </p>
        <ProgressBar done={data.taches_faites} total={data.taches.length} />
      </section>
      {data.taches.length > 0 && data.taches_faites >= data.taches.length && (
        <section className="panel aw-next-step" aria-labelledby="next-step">
          <div>
            <p className="eyebrow">Métier terminé · Prochaine étape</p>
            <h2 id="next-step">
              {data.taches.length} tâches sur {data.taches.length}. Et si elles
              se faisaient sans vous ?
            </h2>
            <p>
              Vous avez les prompts. Un système IA les exécute tout seul, dans
              vos outils, et vous validez avant chaque envoi.
            </p>
          </div>
          <div className="aw-next-step-actions">
            <Link href="/systemes-ia">
              Automatiser mes tâches <span aria-hidden="true">→</span>
            </Link>
            <Link href="/transformation-ia">
              Former toute mon équipe <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}
      <div className="aw-sectionhead">
        <div>
          <h2>Vos tâches, prêtes à confier à l’IA</h2>
          <p>Commencez par celle qui vous prend le plus de temps.</p>
        </div>
        <label className="aw-search">
          <Icon name="search" />
          <input
            type="search"
            aria-label="Rechercher dans ce métier"
            placeholder="E-mail, rapport, présentation..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(6);
            }}
          />
        </label>
      </div>
      <UsageFilters
        value={usage}
        onChange={(value) => {
          setUsage(value);
          setLimit(6);
        }}
      />
      {taches.length ? (
        <>
          <div className="aw-list">
            {taches.slice(0, limit).map((t) => (
              <article
                key={t.id}
                className={`aw-taskrow ${t.fait ? "task-done" : ""}`}
              >
                <Link className="aw-row" href={tacheHref(t.id, slug)}>
                  <span className="aw-icon">
                    <Icon name={categoryIcon(t.code)} />
                  </span>
                  <span>
                    <strong>{t.titre}</strong>
                    <small>
                      {category(t.code)}
                      {t.limite_connue
                        ? " · À vérifier avant usage"
                        : " · Cas pratiques"}
                    </small>
                  </span>
                  <Icon name="arrow" />
                </Link>
                <TacheActions
                  id={t.id}
                  metier={slug}
                  titre={t.titre}
                  value={t}
                  onChange={(patch) =>
                    setData((previous) => {
                      const taches = previous.taches.map((item) =>
                        item.id === t.id ? { ...item, ...patch } : item,
                      );
                      return {
                        ...previous,
                        taches,
                        taches_faites: taches.filter((item) => item.fait)
                          .length,
                      };
                    })
                  }
                />
              </article>
            ))}
          </div>
          <div className="aw-more">
            <span role="status">
              {Math.min(limit, taches.length)} sur {taches.length} tâches
            </span>
            {taches.length > limit && (
              <button className="aw-btn" onClick={() => setLimit((n) => n + 6)}>
                Afficher plus <Icon name="down" />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="aw-empty">
          <p>
            {data.taches.length
              ? "Aucune tâche ne correspond. Essayez un autre mot ou retirez un filtre."
              : "Les tâches de ce métier arrivent bientôt."}
          </p>
          {data.taches.length > 0 && (
            <button
              className="aw-btn"
              onClick={() => {
                setQuery("");
                setUsage("Tout");
              }}
            >
              Effacer les filtres
            </button>
          )}
        </div>
      )}
    </>
  );
}
