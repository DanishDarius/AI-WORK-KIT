"use client";

import Link from "next/link";
import { chemins, iaLabels } from "@/lib/kit-api";
import { IaUpdate, iaMakers, newestFirst } from "@/lib/ia-updates";
import type { GuideSummary } from "@/lib/guides";
import { GuideShelf } from "./guide-shelf";

const longDate = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeZone: "UTC",
});
const shortDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

function Media({ item }: { item: IaUpdate }) {
  if (!item.media) return null;
  if (item.media.type === "video")
    return (
      <video
        controls
        preload="none"
        poster={item.media.poster}
        aria-label={item.title}
      >
        <source src={item.media.src} />
        {item.media.captions && (
          <track
            kind="captions"
            src={item.media.captions}
            srcLang="fr"
            label="Français"
            default
          />
        )}
      </video>
    );
  // Les médias éditoriaux pourront provenir de domaines encore non définis.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.media.src} alt={item.media.alt} loading="lazy" />;
}

function Meta({ item, date = longDate }: { item: IaUpdate; date?: Intl.DateTimeFormat }) {
  return (
    <p className="aw-update-meta">
      {iaMakers[item.ia]} ·{" "}
      <time dateTime={item.publishedAt}>
        {date.format(new Date(item.publishedAt))}
      </time>
    </p>
  );
}

function Impact({ item }: { item: IaUpdate }) {
  if (!item.impact && !item.action) return null;
  return (
    <dl className="aw-update-impact">
      {item.impact && (
        <div>
          <dt>Pour vous</dt>
          <dd>{item.impact}</dd>
        </div>
      )}
      {item.action && (
        <div>
          <dt>À faire</dt>
          <dd>{item.action}</dd>
        </div>
      )}
    </dl>
  );
}

// "À la une" : une publication principale et deux secondaires, sans carrousel
// automatique, pour que l'essentiel de la semaine se lise d'un coup d'œil.
function Featured({ items }: { items: IaUpdate[] }) {
  const [lead, ...others] = items;
  if (!lead) return null;
  return (
    <section className="aw-updates-featured" aria-labelledby="updates-featured">
      <h2 id="updates-featured" className="sr-only">
        À la une cette semaine
      </h2>
      <article className="panel aw-update-lead">
        <span className={`aw-update-tag tag-${lead.ia}`}>
          Nouveau · {iaLabels[lead.ia]}
        </span>
        <h3>{lead.title}</h3>
        {lead.text && <p className="aw-update-text">{lead.text}</p>}
        <Media item={lead} />
        <Impact item={lead} />
        <Meta item={lead} />
      </article>
      {others.length > 0 && (
        <div className="aw-update-side">
          {others.slice(0, 2).map((item) => (
            <article key={item.id} className="aw-update-secondary">
              <Meta item={item} date={shortDate} />
              <h3>{item.title}</h3>
              {item.impact && <p>{item.impact}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function UpdateCard({ item }: { item: IaUpdate }) {
  return (
    <article className="aw-update-card">
      <time dateTime={item.publishedAt}>
        {shortDate.format(new Date(item.publishedAt))}
      </time>
      <h3>{item.title}</h3>
      <Media item={item} />
      {item.text && <p>{item.text}</p>}
      <Impact item={item} />
    </article>
  );
}

export function IaUpdatesScreen({
  items,
  guides = [],
}: {
  items: IaUpdate[];
  guides?: GuideSummary[];
}) {
  const sorted = newestFirst(items);
  const featured = sorted.filter((item) => item.featured).slice(0, 3);
  return (
    <div className="aw-updates-page">
      <section className="aw-updates-intro">
        <p className="aw-updates-kicker">Mises à jour IA · Chaque semaine</p>
        <h1>L’IA a bougé. Voici ce qui change pour vous.</h1>
        <p>
          Les sorties de ChatGPT, Claude et Gemini résumées en 2 minutes : ce
          qui est sorti, ce que ça change dans votre travail, et s’il faut agir.
        </p>
      </section>

      {sorted.length === 0 ? (
        <section className="panel aw-updates-empty" role="status">
          <h2>Première édition en préparation.</h2>
          <p>
            Dès qu’un modèle sort ou change, vous le lisez ici, résumé et
            traduit en impact concret pour votre travail. En attendant, les
            guides ci-dessous vous font gagner du temps dès aujourd’hui.
          </p>
          <Link className="text-link" href="/bibliotheque">
            Voir tous les guides <span aria-hidden="true">→</span>
          </Link>
        </section>
      ) : (
        <>
          <Featured items={featured} />
          <section
            className="aw-updates-columns"
            aria-labelledby="updates-by-ia"
          >
            <div className="aw-updates-columns-head">
              <p className="aw-updates-kicker">Par outil</p>
              <h2 id="updates-by-ia">Un fil par IA. Seulement ce qui compte.</h2>
            </div>
            {chemins.map((ia) => {
              const updates = sorted.filter((item) => item.ia === ia);
              return (
                <section
                  className="aw-updates-column"
                  key={ia}
                  aria-labelledby={`updates-${ia}`}
                >
                  <h3 id={`updates-${ia}`}>
                    <span className={`ia-dot dot-${ia}`} />
                    {iaLabels[ia]}
                  </h3>
                  <div className="aw-updates-feed">
                    {updates.length ? (
                      updates.map((item) => (
                        <UpdateCard key={item.id} item={item} />
                      ))
                    ) : (
                      <p className="aw-updates-none">
                        Rien de nouveau pour {iaLabels[ia]} en ce moment. Dès
                        qu’il bouge, vous le lisez ici.
                      </p>
                    )}
                  </div>
                </section>
              );
            })}
          </section>
        </>
      )}

      <GuideShelf guides={guides} />
    </div>
  );
}
