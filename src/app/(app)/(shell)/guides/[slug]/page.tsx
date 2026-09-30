import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideMarkdown } from "@/components/guide-markdown";
import { GuideActions, GuideCover } from "@/components/guides";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { Chip, Kicker } from "@/components/ui";
import { getAbonnementCourant } from "@/lib/abonnement";
import { getAllGuides, guidePreview } from "@/lib/guides";

// Rendu à la demande : le contenu envoyé dépend de l'abonnement. Un guide
// réservé aux abonnés, lu sans abonnement, ne transmet que son aperçu.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getAllGuides().find((g) => g.slug === slug);
  return guide ? { title: guide.title, description: guide.excerpt } : {};
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guides = getAllGuides();
  const index = guides.findIndex((g) => g.slug === slug);
  if (index < 0) notFound();
  const guide = guides[index];
  const suivants = [guides[(index + 1) % guides.length], guides[(index + 2) % guides.length]];
  const { abonnement } = await getAbonnementCourant();
  const verrouille = !guide.inclus && !abonnement.actif;
  const markdown = verrouille ? guidePreview(guide.markdown) : guide.markdown;
  const reserves = guides.filter((g) => !g.inclus).length;

  return (
    <Page width="wide">
      <Link className="link" href="/bibliotheque"><Icon name="left" size={18} /> Guides</Link>
      <header className="row" style={{ alignItems: "flex-end", gap: 32 }}>
        <div className="grow stack" style={{ minWidth: 280 }}>
          <div className="chips">
            {verrouille ? <Chip tone="orange" icon="lock">Aperçu · abonnés</Chip> : guide.inclus && !abonnement.actif ? <Chip tone="green">Inclus</Chip> : null}
            <Chip>{guide.category}</Chip>
            <Chip icon="clock">{guide.tool} · {guide.duration}</Chip>
          </div>
          <h1 className="h1" style={{ maxWidth: 820 }}>{guide.title}</h1>
          <p className="lead">{guide.excerpt}</p>
          <GuideActions slug={guide.slug} number={guide.number} title={guide.title} telechargement={!verrouille} />
        </div>
        <div className="hide-sm">
          <GuideCover number={guide.number} title={guide.title} tool={guide.tool} variant={guide.coverVariant} locked={verrouille} width={200} />
        </div>
      </header>

      <div className="reading">
        <aside className="reading-nav">
          <div className="card pad-sm stack-sm">
            <Kicker>Guide {String(guide.number).padStart(3, "0")}</Kicker>
            <p className="small muted">{verrouille ? "Vous lisez l’introduction. La suite s’ouvre avec l’abonnement." : "Lisez, copiez les prompts, testez-les tout de suite sur votre travail."}</p>
            <Link className="link small" href="/taches">Mettre en pratique <Icon name="arrow" size={16} /></Link>
          </div>
        </aside>
        <article className="stack-lg">
          <div className={verrouille ? "preview-wrap" : undefined}>
            <GuideMarkdown markdown={markdown} guideNumber={guide.number} />
          </div>
          {verrouille && (
            <section className="card is-orange stack" style={{ maxWidth: 700 }}>
              <div className="row" style={{ flexWrap: "nowrap" }}>
                <span className="iconbox is-orange" aria-hidden="true" style={{ background: "#fff" }}><Icon name="lock" size={22} /></span>
                <h2 className="h2">La suite est réservée aux abonnés</h2>
              </div>
              <p>Ce guide fait partie des {reserves} guides de l’abonnement. Vos {guides.length - reserves} guides inclus s’affichent en entier.</p>
              <div className="row">
                <Link className="btn btn-orange" href="/abonnement">Voir les formules</Link>
                <Link className="btn btn-secondary btn-plain" href="/bibliotheque?acces=inclus">Mes guides inclus</Link>
              </div>
            </section>
          )}
        </article>
      </div>

      <section className="stack" aria-labelledby="a-lire-ensuite">
        <h2 id="a-lire-ensuite" className="h2">À lire ensuite</h2>
        <div className="grid-2">
          {suivants.map((s) => (
            <Link key={s.slug} href={`/guides/${s.slug}`} className="card pad-md card-link row" style={{ flexWrap: "nowrap", alignItems: "center" }}>
              <GuideCover number={s.number} title={s.title} tool={s.tool} variant={s.coverVariant} width={90} />
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
