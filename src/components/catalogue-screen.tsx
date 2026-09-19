"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Catalogue,
  category,
  categoryIcon,
  normalize,
  usages,
  useCatalogue,
} from "@/lib/catalogue";
import { tacheHref } from "@/lib/kit-api";
import { Badge, ResourceState } from "./kit-ui";
import { Icon } from "./kit-icons";
import { ProgressBar } from "./progression-ui";
import { Recherche } from "./recherche";

export function PathCard({
  mode,
  count,
}: {
  mode: "taches" | "metiers";
  count?: number;
}) {
  const jobs = mode === "metiers";
  return (
    <Link className="aw-path" href={`/${mode}`}>
      <span className={`aw-icon ${jobs ? "aw-blue" : ""}`}>
        <Icon name={jobs ? "jobs" : "tasks"} />
      </span>
      <span>
        <strong>
          {jobs ? "Métiers" : "Tâches"}
          {count !== undefined && (
            <span className="aw-count">
              {count} {jobs ? "univers" : "à explorer"}
            </span>
          )}
        </strong>
        <p>
          {jobs ? (
            <>
              Je pars de mon quotidien.
              <br />
              Je découvre mes possibilités.
            </>
          ) : (
            <>
              Je sais ce que je veux faire.
              <br />
              Je trouve le bon prompt.
            </>
          )}
        </p>
        <small>Explorer les {jobs ? "métiers" : "tâches"}</small>
      </span>
      <span className="aw-arrow">
        <Icon name="arrow" />
      </span>
    </Link>
  );
}
export function UsageFilters({
  value,
  onChange,
}: {
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <div className="aw-filters" role="group" aria-label="Filtrer par usage">
      {usages.map((c) => (
        <button key={c} onClick={() => onChange(c)} aria-pressed={value === c}>
          {c}
        </button>
      ))}
    </div>
  );
}
function CatalogResults({
  data,
  mode,
  home,
}: {
  data: Catalogue;
  mode: "taches" | "metiers";
  home: boolean;
}) {
  const [query, setQuery] = useState("");
  const [usage, setUsage] = useState("Tout");
  const [limit, setLimit] = useState(6);
  const jobs = mode === "metiers";
  const metiers = data.metiers.filter((m) =>
    normalize(m.nom).includes(normalize(query)),
  );
  const taches = data.taches.filter(
    (t) =>
      (usage === "Tout" || category(t.code) === usage) &&
      (home ||
        normalize(`${t.titre} ${category(t.code)}`).includes(normalize(query))),
  );
  const count = jobs ? metiers.length : taches.length;
  return (
    <section
      aria-label={jobs ? "Catalogue des métiers" : "Catalogue des tâches"}
    >
      {home ? (
        <Recherche
          heading="Qu’allez-vous accomplir ?"
          description="Choisissez une tâche. Les cas et les prompts sont prêts."
          onQueryChange={setQuery}
        />
      ) : (
        <div className="aw-sectionhead">
          <div>
            <h2>
              {jobs
                ? "L’IA dans votre quotidien."
                : home
                  ? "Qu’allez-vous accomplir ?"
                  : "Toutes vos tâches, au même endroit."}
            </h2>
            <p>
              {jobs
                ? "Explorez les tâches associées à votre métier."
                : "Choisissez une tâche. Les cas et les prompts sont prêts."}
            </p>
          </div>
          <label className="aw-search">
            <Icon name="search" />
            <input
              type="search"
              aria-label={
                jobs ? "Rechercher un métier" : "Rechercher une tâche"
              }
              placeholder={
                jobs ? "Chercher mon métier…" : "E-mail, rapport, présentation…"
              }
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(6);
              }}
            />
          </label>
        </div>
      )}
      <div hidden={home && query.length >= 2}>
        {!jobs && (
          <UsageFilters
            value={usage}
            onChange={(value) => {
              setUsage(value);
              setLimit(6);
            }}
          />
        )}
        {count ? (
          <>
            <div className="aw-grid">
              {jobs
                ? metiers.slice(0, limit).map((m) => (
                    <Link
                      key={m.id}
                      href={`/metiers/${encodeURIComponent(m.slug)}`}
                      className="aw-tile"
                    >
                      <div className="aw-tiletop">
                        <span className="aw-icon aw-blue">
                          <Icon name="jobs" />
                        </span>
                        <span className="aw-label">{m.nb_taches} tâches</span>
                      </div>
                      <h3>{m.nom}</h3>
                      <div className="aw-tilefooter">
                        <Badge ia={m.chemin_choisi} />
                        <Icon name="arrow" />
                      </div>
                      <div className="aw-tileprogress">
                        <ProgressBar
                          done={m.taches_faites}
                          total={m.nb_taches}
                          label={`Progression : ${m.nom}`}
                        />
                        <span>
                          {m.taches_faites}/{m.nb_taches} tâches faites
                        </span>
                      </div>
                    </Link>
                  ))
                : taches.slice(0, limit).map((t) => (
                    <Link
                      key={t.id}
                      className="aw-tile"
                      href={tacheHref(t.id, t.metiers[0].slug)}
                    >
                      <div className="aw-tiletop">
                        <span className="aw-icon">
                          <Icon name={categoryIcon(t.code)} />
                        </span>
                        <span className="aw-label">{category(t.code)}</span>
                      </div>
                      <h3>{t.titre}</h3>
                      <div className="aw-tilefooter">
                        <span>
                          {t.fait ? "Faite · " : ""}
                          {t.metiers[0].nom}
                        </span>
                        <Icon name="arrow" />
                      </div>
                    </Link>
                  ))}
            </div>
            <div className="aw-more">
              <span role="status">
                {Math.min(limit, count)} sur {count}{" "}
                {jobs ? "métiers" : "tâches"}
              </span>
              {count > limit && (
                <button
                  className="aw-btn"
                  onClick={() => setLimit((n) => n + 6)}
                >
                  Voir la suite <Icon name="down" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="aw-empty">
            <p>Aucun résultat pour cette recherche.</p>
            <button
              className="aw-btn"
              onClick={() => {
                setQuery("");
                setUsage("Tout");
              }}
            >
              Effacer les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
export function CatalogueScreen({
  home = false,
  mode = "taches",
}: {
  home?: boolean;
  mode?: "taches" | "metiers";
}) {
  const { data, error, retry } = useCatalogue();
  return (
    <>
      {!home && (
        <nav className="aw-bread" aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link>
          <Icon name="chevron" />
          <span>{mode === "taches" ? "Tâches" : "Métiers"}</span>
        </nav>
      )}
      {home && (
        <>
          <section className="aw-hero aw-signature-hero">
            <div className="aw-hero-copy">
              <div className="aw-eyebrow">
                <Icon name="sparkles" />
                L’IA appliquée à votre métier
              </div>
              <h1>
                Moins de temps à chercher.<br />
                <span>Plus d’impact avec l’IA.</span>
              </h1>
              <p>
                Un seul espace pour passer de votre tâche au bon outil,
                comprendre la méthode et utiliser un prompt prêt à l’emploi.
              </p>
              <div className="aw-hero-actions">
                <Link className="aw-hero-primary" href="/taches">
                  Explorer les tâches <Icon name="right" />
                </Link>
                <Link className="aw-hero-secondary" href="/metiers">
                  Explorer les métiers <Icon name="right" />
                </Link>
              </div>
              <small className="aw-hero-note">
                Des cas pratiques · Des prompts concrets · À votre rythme
              </small>
            </div>
          </section>

          <section className="aw-start-showcase" aria-labelledby="point-depart">
            <div className="aw-start-pill" id="point-depart">
              <Icon name="sparkles" />
              <strong>Trouvez votre point de départ</strong>
              <span>Une tâche · Un cas pratique · Votre prompt</span>
            </div>
            <div className="aw-start-window">
              <div className="aw-window-bar">
                <span /><span /><span />
                <small>AI WORK KIT · guide de démarrage</small>
              </div>
              <div
                className="aw-ai-video"
                role="img"
                aria-label="Aperçu du guide vidéo sur le choix de l’intelligence artificielle, avec un ordinateur connecté à des outils de travail."
              >
                <div className="aw-ai-video-overlay">
                  <span className="aw-video-kicker">
                    AI WORK KIT · Pour bien commencer
                  </span>
                  <span className="aw-video-play" aria-hidden="true">
                    <Icon name="play" size={28} />
                  </span>
                  <h2>Quelle IA choisir pour votre travail&nbsp;?</h2>
                  <p>ChatGPT · Claude · Gemini</p>
                </div>
              </div>
            </div>
          </section>

        </>
      )}
      {data ? (
        <CatalogResults data={data} mode={mode} home={home} />
      ) : (
        <ResourceState error={error} retry={retry} />
      )}
      {!home && (
        <section
          className="aw-crosspath"
          aria-label="Explorer l’autre parcours"
        >
          <PathCard
            mode={mode === "taches" ? "metiers" : "taches"}
            count={
              mode === "taches" ? data?.metiers.length : data?.taches.length
            }
          />
        </section>
      )}
    </>
  );
}
