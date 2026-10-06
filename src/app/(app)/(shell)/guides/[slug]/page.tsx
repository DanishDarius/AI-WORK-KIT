import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideMarkdown } from "@/components/guide-markdown";
import { GuideActions, GuideCover } from "@/components/guides";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { Chip, Kicker } from "@/components/ui";
import { getAbonnement } from "@/lib/abonnement";
import { getAllGuides, guideLisible } from "@/lib/guides";
import { exigerAccesActif } from "@/lib/acces";

// Rendu à la demande : le contenu envoyé dépend de l'abonnement. Un guide
// réservé aux abonnés, ouvert sans abonnement, ne transmet que son titre.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getAllGuides().find((g) => g.slug === slug);
  if (!guide) return {};
  // Le résumé d'un guide réservé ne sort pas du serveur sans abonnement.
  return guide.inclus ? { title: guide.title, description: guide.excerpt } : { title: guide.title };
}

export default async function GuidePage({ params }: Props) {
  const { email } = await exigerAccesActif();
  const { slug } = await params;
  const guides = getAllGuides();
  const index = guides.findIndex((g) => g.slug === slug);
  if (index < 0) notFound();
  const guide = guides[index];
  const suivants = [guides[(index + 1) % guides.length], guides[(index + 2) % guides.length]];
  const abonnement = await getAbonnement(email);
  const verrouille = !guideLisible(guide, abonnement.actif);
  const reserves = guides.filter((g) => !g.inclus).length;

  return (
    <Page width="wide">
      <Link className="link" href="/bibliotheque"><Icon name="left" size={18} /> Guides</Link>
      <header className="row" style={{ alignItems: "flex-end", gap: 32 }}>
        <div className="grow stack" style={{ minWidth: 280 }}>
          <div className="chips">
            {verrouille ? <Chip tone="orange" icon="lock">Abonnés</Chip> : guide.inclus && !abonnement.actif ? <Chip tone="green">Inclus</Chip> : null}
            <Chip>{guide.category}</Chip>
            <Chip icon="clock">{guide.tool} · {guide.duration}</Chip>
          </div>
          <h1 className="h1" style={{ maxWidth: 820 }}>{guide.title}</h1>
          {!verrouille && <p className="lead">{guide.excerpt}</p>}
          <GuideActions slug={guide.slug} number={guide.number} title={guide.title} telechargement={abonnement.actif} />
          {!abonnement.actif && !verrouille && (
            <p className="small muted"><span aria-hidden="true" style={{ display: "inline-flex", verticalAlign: "-2px", marginRight: 6 }}><Icon name="lock" size={14} /></span>Téléchargement en PDF, avec le droit de le revendre : <Link className="link" href="/abonnement">avec l’abonnement</Link>.</p>
          )}
        </div>
        <div className="hide-sm">
          <GuideCover number={guide.number} title={guide.title} tool={guide.tool} variant={guide.coverVariant} locked={verrouille} width={200} />
        </div>
      </header>

      {verrouille ? (
        <section className="card is-orange stack" style={{ maxWidth: 700 }}>
          <div className="row" style={{ flexWrap: "nowrap" }}>
            <span className="iconbox is-orange" aria-hidden="true" style={{ background: "#fff" }}><Icon name="lock" size={22} /></span>
            <h2 className="h2">Ce guide est réservé aux abonnés</h2>
          </div>
          <p>Il fait partie des {reserves} guides de l’abonnement. Vos {guides.length - reserves} guides inclus s’affichent en entier.</p>
          <div className="row">
            <Link className="btn btn-orange" href="/abonnement">Voir les formules</Link>
            <Link className="btn btn-secondary btn-plain" href="/bibliotheque?acces=inclus">Mes guides inclus</Link>
          </div>
        </section>
      ) : (
        <div className="reading">
          <aside className="reading-nav">
            <div className="card pad-sm stack-sm">
              <Kicker>Guide {String(guide.number).padStart(3, "0")}</Kicker>
              <p className="small muted">Lisez, copiez les prompts, testez-les tout de suite sur votre travail.</p>
              <Link className="link small" href="/taches">Mettre en pratique <Icon name="arrow" size={16} /></Link>
            </div>
          </aside>
          <article className="stack-lg">
            <GuideMarkdown markdown={guide.markdown} guideNumber={guide.number} />
          </article>
        </div>
      )}

      <section className="stack" aria-labelledby="a-lire-ensuite">
        <h2 id="a-lire-ensuite" className="h2">À lire ensuite</h2>
        <div className="grid-2">
          {suivants.map((s) => (
            <Link key={s.slug} href={`/guides/${s.slug}`} className="card pad-md card-link" style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <GuideCover number={s.number} title={s.title} tool={s.tool} variant={s.coverVariant} width={72} mini />
              <span className="grow stack-sm">
                <span className="tiny muted">{s.tool} · {s.duration}</span>
                <span className="strong">{s.title}</span>
              </span>
              <Icon name="arrow" size={20} />
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}
