import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideActions } from "@/components/guide-actions";
import { GuideCover } from "@/components/guide-cover";
import { GuideMarkdown } from "@/components/guide-markdown";
import { Cadenas, OffreAbonnement } from "@/components/offre-abonnement";
import { getAbonnementCourant } from "@/lib/abonnement";
import { getAllGuides, getGuideBySlug, guidePreview } from "@/lib/guides";

// Rendu à la demande : le contenu envoyé dépend de l'abonnement. Un guide
// Premium lu sans abonnement ne transmet que son aperçu, jamais le texte
// complet.
export const dynamic = "force-dynamic";

type GuidePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return { title: `${guide.title} | AI WORK KIT`, description: guide.excerpt };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guides = getAllGuides();
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();
  const index = guides.findIndex((item) => item.slug === slug);
  const nextGuides = [guides[(index + 1) % guides.length], guides[(index + 2) % guides.length]];
  const { abonnement } = await getAbonnementCourant();
  const verrouille = !guide.inclus && !abonnement.actif;
  const markdown = verrouille ? guidePreview(guide.markdown) : guide.markdown;
  const premium = guides.filter((item) => !item.inclus).length;

  return (
    <div className="aw-guide-page">
      <section className="aw-guide-header">
        <div className="aw-guide-heading">
          <Link className="aw-guide-back" href="/bibliotheque">← Bibliothèque</Link>
          <div className="aw-guide-kicker-row">
            <p className="aw-library-kicker">Guide {String(guide.number).padStart(3, "0")} · {guide.category}</p>
            {verrouille && <span className="aw-access-badge is-premium"><Cadenas />Premium · aperçu gratuit</span>}
            {guide.inclus && !abonnement.actif && <span className="aw-access-badge is-included">Inclus dans votre accès</span>}
          </div>
          <h1>{guide.title}</h1>
          <p className="aw-guide-meta">{guide.tool} <span>·</span> {guide.duration}</p>
          <p className="aw-guide-intro">{guide.excerpt}</p>
          <GuideActions slug={guide.slug} telechargement={!verrouille} />
        </div>
        <div className="aw-guide-hero-cover">
          <GuideCover number={guide.number} title={guide.title} tool={guide.tool} variant={guide.coverVariant} featured />
        </div>
      </section>

      <div className="aw-guide-reading-layout">
        <aside className="aw-guide-reading-note">
          <span>Dans ce guide</span>
          <strong>{verrouille ? "Aperçu gratuit" : guide.duration}</strong>
          <p>
            {verrouille
              ? "L’introduction et le premier chapitre. La suite s’ouvre avec l’abonnement Bibliothèque."
              : "Lisez, copiez les prompts, testez-les tout de suite sur votre travail."}
          </p>
        </aside>
        <article className={verrouille ? "aw-guide-preview" : undefined}>
          <GuideMarkdown markdown={markdown} guideNumber={guide.number} />
        </article>
      </div>

      {verrouille && <OffreAbonnement autres={premium - 1} total={guides.length} />}

      <section className="aw-guide-next" aria-labelledby="next-guides-title">
        <p className="aw-library-kicker">À lire ensuite</p>
        <h2 id="next-guides-title">Le guide suivant, dans la foulée.</h2>
        <div>
          {nextGuides.map((next) => (
            <Link key={next.slug} href={`/guides/${next.slug}`}>
              <span>{next.category} · {next.duration}</span>
              <strong>{next.title}</strong>
              <b aria-hidden="true">→</b>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
