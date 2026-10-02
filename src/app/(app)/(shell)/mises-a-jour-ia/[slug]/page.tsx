import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { Media } from "@/components/media";
import { Page } from "@/components/shell";
import { Chip, Kicker } from "@/components/ui";
import { getUpdate, iaMakers, iaNoms, iaUpdates, newestFirst } from "@/lib/ia-updates";
import { exigerAccesActif } from "@/lib/acces";

export const dynamicParams = false;

export function generateStaticParams() {
  return iaUpdates.map((item) => ({ slug: item.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getUpdate(slug);
  return item ? { title: item.title, description: item.text } : {};
}

export default async function MiseAJour({ params }: Props) {
  await exigerAccesActif();
  const { slug } = await params;
  const item = getUpdate(slug);
  if (!item) notFound();
  const autres = newestFirst(iaUpdates).filter((u) => u.slug !== item.slug);
  const liees = [...autres.filter((u) => u.ia === item.ia), ...autres.filter((u) => u.ia !== item.ia)].slice(0, 3);
  const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(item.publishedAt));

  return (
    <Page
      aside={
        <>
          <section className="card pad-md stack-sm">
            <Kicker>Disponible pour</Kicker>
            <p className="small">{item.disponibilite}</p>
          </section>
          <section className="card pad-md stack-sm">
            <Kicker>Sources</Kicker>
            {item.sources.map((s) => (
              <a key={s.url} className="link small" href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label} <Icon name="external" size={14} /><span className="sr-only"> (nouvel onglet)</span>
              </a>
            ))}
          </section>
        </>
      }
    >
      <Link className="link" href="/nouveau"><Icon name="left" size={18} /> Nouveau</Link>
      <header className="stack">
        <div className="row" style={{ gap: 8 }}>
          <Chip tone="blue">{iaNoms[item.ia]}</Chip>
          <Chip>{item.kind}</Chip>
          <span className="tiny muted">{iaMakers[item.ia]} · {date}</span>
        </div>
        <h1 className="h1">{item.title}</h1>
        <p className="lead">{item.text}</p>
      </header>
      <Media media={item.media} priority />
      <section className="card is-mint stack-sm" aria-labelledby="pour-vous">
        <h2 id="pour-vous" className="h3">Ce que ça change pour vous</h2>
        <p>{item.impact}</p>
      </section>
      <section className="card stack-sm" aria-labelledby="a-faire" style={{ background: "var(--gold-bg)", borderColor: "#f5dfa3" }}>
        <h2 id="a-faire" className="h3">Ce que vous devez faire</h2>
        <p>{item.action}</p>
      </section>
      <section className="stack-sm" aria-labelledby="en-detail">
        <h2 id="en-detail" className="h2">En détail</h2>
        <ul className="steps">{item.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </section>
      {liees.length > 0 && (
        <section className="stack" aria-labelledby="a-lire-aussi">
          <h2 id="a-lire-aussi" className="h2">À lire aussi</h2>
          <div className="grid-3">
            {liees.map((u) => (
              <Link key={u.slug} href={`/mises-a-jour-ia/${u.slug}`} className="card pad-md card-link">
                <Chip tone="blue">{iaNoms[u.ia]}</Chip>
                <span className="strong">{u.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}
