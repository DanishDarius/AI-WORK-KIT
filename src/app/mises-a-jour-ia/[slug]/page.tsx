import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  UpdateMeta,
  UpdateTag,
  updateHref,
} from "@/components/ia-updates-screen";
import { UpdateMediaBlock } from "@/components/update-media";
import { getUpdate, iaUpdates, newestFirst } from "@/lib/ia-updates";

export const dynamicParams = false;

export function generateStaticParams() {
  return iaUpdates.map((item) => ({ slug: item.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getUpdate(slug);
  if (!item) return {};
  return {
    title: `${item.title} | Mises à jour IA | AI WORK KIT`,
    description: item.text,
  };
}

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getUpdate(slug);
  if (!item) notFound();

  // À lire aussi : d'abord la même IA, puis les plus récentes.
  const others = newestFirst(iaUpdates).filter((u) => u.slug !== item.slug);
  const related = [
    ...others.filter((u) => u.ia === item.ia),
    ...others.filter((u) => u.ia !== item.ia),
  ].slice(0, 3);

  return (
    <article className="aw-update-article">
      <nav className="aw-bread" aria-label="Fil d’Ariane">
        <Link href="/mises-a-jour-ia">Mises à jour IA</Link>
        <span aria-hidden="true">/</span>
        <span>{item.title.replace(/\.$/, "")}</span>
      </nav>

      <header className="aw-update-article-head">
        <UpdateTag item={item} />
        <h1>{item.title}</h1>
        <UpdateMeta item={item} />
        <p className="aw-update-article-lead">{item.text}</p>
      </header>

      <UpdateMediaBlock media={item.media} priority />

      <div className="aw-update-article-body">
        <div className="aw-update-article-main">
          <section className="aw-update-callout" aria-labelledby="pour-vous">
            <h2 id="pour-vous">Ce que ça change pour vous</h2>
            <p>{item.impact}</p>
          </section>
          <section className="aw-update-callout is-action" aria-labelledby="a-faire">
            <h2 id="a-faire">Ce que vous devez faire</h2>
            <p>{item.action}</p>
          </section>
          <section aria-labelledby="en-detail">
            <h2 id="en-detail" className="aw-update-article-h2">En détail</h2>
            <ul className="aw-update-points">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="aw-update-facts" aria-label="Fiche pratique">
          <div>
            <h2>Disponible pour</h2>
            <p>{item.disponibilite}</p>
          </div>
          <div>
            <h2>Sources</h2>
            <ul>
              {item.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label} <span aria-hidden="true">→</span>
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="aw-update-related" aria-labelledby="a-lire-aussi">
          <h2 id="a-lire-aussi">À lire aussi</h2>
          <ul>
            {related.map((u) => (
              <li key={u.slug}>
                <Link href={updateHref(u)}>
                  <UpdateTag item={u} />
                  <strong>{u.title}</strong>
                  <UpdateMeta item={u} />
                </Link>
              </li>
            ))}
          </ul>
          <Link className="aw-update-more" href="/mises-a-jour-ia">
            Toutes les mises à jour <span aria-hidden="true">→</span>
          </Link>
        </section>
      )}
    </article>
  );
}
