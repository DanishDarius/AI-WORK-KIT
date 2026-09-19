import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideActions } from "@/components/guide-actions";
import { GuideCover } from "@/components/guide-cover";
import { GuideMarkdown } from "@/components/guide-markdown";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

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

  return (
    <div className="aw-guide-page">
      <section className="aw-guide-header">
        <div className="aw-guide-heading">
          <Link className="aw-guide-back" href="/bibliotheque">← Bibliothèque</Link>
          <p className="aw-library-kicker">Guide {String(guide.number).padStart(3, "0")} · {guide.category}</p>
          <h1>{guide.title}</h1>
          <p className="aw-guide-meta">{guide.tool} <span>·</span> {guide.duration}</p>
          <p className="aw-guide-intro">{guide.excerpt}</p>
          <GuideActions slug={guide.slug} />
        </div>
        <div className="aw-guide-hero-cover">
          <GuideCover number={guide.number} title={guide.title} tool={guide.tool} variant={guide.coverVariant} featured />
        </div>
      </section>

      <div className="aw-guide-reading-layout">
        <aside className="aw-guide-reading-note">
          <span>Dans ce guide</span>
          <strong>{guide.duration}</strong>
          <p>Lisez à votre rythme, puis copiez les prompts pour passer directement à la pratique.</p>
        </aside>
        <article><GuideMarkdown markdown={guide.markdown} guideNumber={guide.number} /></article>
      </div>

      <section className="aw-guide-next" aria-labelledby="next-guides-title">
        <p className="aw-library-kicker">À lire ensuite</p>
        <h2 id="next-guides-title">Continuez à votre rythme.</h2>
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
