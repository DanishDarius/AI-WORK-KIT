import Link from "next/link";
import {
  IaUpdate,
  iaMakers,
  iaNoms as iaLabels,
  newestFirst,
  updateIas as chemins,
} from "@/lib/ia-updates";
import type { GuideSummary } from "@/lib/guides";
import { GuideShelf } from "./guide-shelf";

export const longDate = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeZone: "UTC",
});
const shortDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

export function updateHref(item: IaUpdate) {
  return `/mises-a-jour-ia/${item.slug}`;
}

export function UpdateMeta({
  item,
  date = longDate,
}: {
  item: IaUpdate;
  date?: Intl.DateTimeFormat;
}) {
  return (
    <p className="aw-update-meta">
      {iaMakers[item.ia]} ·{" "}
      <time dateTime={item.publishedAt}>
        {date.format(new Date(item.publishedAt))}
      </time>
    </p>
  );
}

export function UpdateImpact({ item }: { item: IaUpdate }) {
  return (
    <dl className="aw-update-impact">
      <div>
        <dt>Pour vous</dt>
        <dd>{item.impact}</dd>
      </div>
      <div>
        <dt>À faire</dt>
        <dd>{item.action}</dd>
      </div>
    </dl>
  );
}

export function UpdateTag({ item }: { item: IaUpdate }) {
  return (
    <span className={`aw-update-tag tag-${item.ia}`}>
      <span className={`ia-dot dot-${item.ia}`} aria-hidden="true" />
      {iaLabels[item.ia]} · {item.kind}
    </span>
  );
}

// "À la une" : une publication principale et deux secondaires, sans carrousel
// automatique, pour que l'essentiel se lise d'un coup d'œil.
function Featured({ items }: { items: IaUpdate[] }) {
  const [lead, ...others] = items;
  if (!lead) return null;
  return (
    <section className="aw-updates-featured" aria-labelledby="updates-featured">
      <h2 id="updates-featured" className="sr-only">
        À la une
      </h2>
      <article className="panel aw-update-lead">
        <UpdateTag item={lead} />
        <h3>
          <Link href={updateHref(lead)}>{lead.title}</Link>
        </h3>
        <p className="aw-update-text">{lead.text}</p>
        <UpdateImpact item={lead} />
        <div className="aw-update-lead-foot">
          <UpdateMeta item={lead} />
          <Link className="aw-update-more" href={updateHref(lead)}>
            Lire l’article <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
      {others.length > 0 && (
        <div className="aw-update-side">
          {others.slice(0, 2).map((item) => (
            <article key={item.slug} className="aw-update-secondary">
              <UpdateTag item={item} />
              <h3>
                <Link href={updateHref(item)}>{item.title}</Link>
              </h3>
              <p>{item.impact}</p>
              <UpdateMeta item={item} date={shortDate} />
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
      <p className="aw-update-card-top">
        <span>{item.kind}</span>
        <time dateTime={item.publishedAt}>
          {shortDate.format(new Date(item.publishedAt))}
        </time>
      </p>
      <h3>
        <Link href={updateHref(item)}>{item.title}</Link>
      </h3>
      <p>{item.impact}</p>
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
  const featuredSlugs = new Set(featured.map((item) => item.slug));
  const latest = sorted[0];
  return (
    <div className="aw-updates-page">
      <section className="aw-updates-intro">
        <p className="aw-updates-kicker">
          Mises à jour IA
          {latest && (
            <>
              {" "}· Édition du{" "}
              <time dateTime={latest.publishedAt}>
                {longDate.format(new Date(latest.publishedAt))}
              </time>
            </>
          )}
        </p>
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
              const updates = sorted.filter(
                (item) => item.ia === ia && !featuredSlugs.has(item.slug),
              );
              return (
                <section
                  className="aw-updates-column"
                  key={ia}
                  aria-labelledby={`updates-${ia}`}
                >
                  <h3 id={`updates-${ia}`}>
                    <span className={`ia-dot dot-${ia}`} />
                    {iaLabels[ia]}
                    <small>{iaMakers[ia]}</small>
                  </h3>
                  <div className="aw-updates-feed">
                    {updates.length ? (
                      updates.map((item) => (
                        <UpdateCard key={item.slug} item={item} />
                      ))
                    ) : (
                      <p className="aw-updates-none">
                        Rien d’autre de nouveau pour {iaLabels[ia]} en ce
                        moment. Dès qu’il bouge, vous le lisez ici.
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
