import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { Chip, PageHead } from "@/components/ui";
import { AbonnementCard, StatsCard } from "@/components/widgets";
import { iaNoms, iaUpdates, mediaThumb, newestFirst, updateIas } from "@/lib/ia-updates";
import type { IA } from "@/lib/kit-api";
import { exigerAccesActif } from "@/lib/acces";

export const metadata: Metadata = { title: "Nouveau" };

function dateCourte(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(iso));
}

export default async function Nouveau({ searchParams }: PageProps<"/nouveau">) {
  await exigerAccesActif();
  const { ia } = await searchParams;
  const filtre = updateIas.includes(ia as IA) ? (ia as IA) : null;
  const liste = newestFirst(iaUpdates).filter((u) => !filtre || u.ia === filtre);

  return (
    <Page aside={<><StatsCard /><AbonnementCard /></>}>
      <PageHead kicker="Ce qui a changé dans les IA" title="Nouveau">
        Les annonces de ChatGPT, Claude et Gemini, expliquées simplement : ce que ça change pour vous, et ce que vous devez faire.
      </PageHead>
      <nav className="seg" aria-label="Filtrer par IA" style={{ maxWidth: 520 }}>
        <Link href="/nouveau" aria-current={!filtre ? "page" : undefined}>Tout</Link>
        {updateIas.map((i) => (
          <Link key={i} href={`/nouveau?ia=${i}`} aria-current={filtre === i ? "page" : undefined}>{iaNoms[i]}</Link>
        ))}
      </nav>
      <div className="stack">
        {liste.map((u, i) => {
          const vignette = mediaThumb(u.media);
          return (
            <Link key={u.slug} href={`/mises-a-jour-ia/${u.slug}`} className="card pad-md card-link row" style={{ alignItems: "flex-start", gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={vignette.src} alt="" loading={i < 2 ? "eager" : "lazy"} style={{ width: 180, aspectRatio: "16 / 10", objectFit: "cover", borderRadius: 14, flex: "none", background: "var(--night)" }} className="hide-sm" />
              <span className="grow stack-sm" style={{ minWidth: 220 }}>
                <span className="row" style={{ gap: 8 }}>
                  <Chip tone="blue">{iaNoms[u.ia]}</Chip>
                  <Chip>{u.kind}</Chip>
                  <span className="tiny muted">{dateCourte(u.publishedAt)}</span>
                </span>
                <span className="h3">{u.title}</span>
                <span className="muted small">{u.text}</span>
                <span className="small" style={{ color: "var(--green)" }}><b className="strong">Pour vous :</b> {u.impact}</span>
              </span>
              <Icon name="arrow" size={20} />
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
