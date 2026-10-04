import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { Media } from "@/components/media";
import { Page } from "@/components/shell";
import { Chip, Kicker } from "@/components/ui";
import { AbonnementCard } from "@/components/widgets";
import { getAbonnement } from "@/lib/abonnement";
import { exigerAccesActif } from "@/lib/acces";
import { lireFil } from "@/lib/contenu";
import { accesPublication, elementsDuFil } from "@/lib/fil";
import { iaMakers, iaNoms } from "@/lib/ia-updates";

export const metadata: Metadata = { title: "Mise à jour des IA" };

type Props = { params: Promise<{ slug: string }> };

// Une actualité des IA, lue dans le fil (cache, règle C1). Elle ne s'affiche
// que si elle est parue ; réservée aux abonnés, un client sans abonnement en
// voit le titre seul.
export default async function MiseAJour({ params }: Props) {
  const { email } = await exigerAccesActif();
  const { slug } = await params;
  const [fil, abonnement] = await Promise.all([lireFil(), getAbonnement(email)]);
  const item = /^[a-z0-9-]{1,80}$/.test(slug) ? fil.misesAJour[slug] : undefined;
  const acces = item ? accesPublication(fil, "mise_a_jour", slug, abonnement.actif) : "absente";
  if (!item || acces === "absente") notFound();

  const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(item.annonce_le));
  const entete = (
    <header className="stack">
      <div className="row" style={{ gap: 8 }}>
        <Chip tone="blue">{iaNoms[item.ia]}</Chip>
        <Chip>{item.genre}</Chip>
        <span className="tiny muted">{iaMakers[item.ia]} · {date}</span>
      </div>
      <h1 className="h1">{item.titre}</h1>
      {acces === "ouverte" && <p className="lead">{item.resume}</p>}
    </header>
  );

  if (acces === "reservee")
    return (
      <Page aside={<AbonnementCard />}>
        <Link className="link" href="/nouveau"><Icon name="left" size={18} /> Nouveau</Link>
        {entete}
        <section className="card stack-sm" style={{ background: "var(--orange-bg)", borderColor: "var(--orange-line)" }}>
          <h2 className="h3">Réservé aux abonnés</h2>
          <p>Cette mise à jour fait partie de « Ce qui a changé dans les IA », publié chaque jeudi pour les abonnés : ce que cela change pour vous, et ce que vous devez faire.</p>
          <div className="row"><Link className="btn btn-orange" href="/abonnement">Voir les formules</Link></div>
        </section>
      </Page>
    );

  // À lire aussi : les autres actualités que ce client peut ouvrir, la même IA d'abord.
  const autres = elementsDuFil(fil, abonnement.actif)
    .filter((e) => e.type === "mise_a_jour" && e.ref && e.ref !== item.slug)
    .map((e) => fil.misesAJour[e.ref as string])
    .filter(Boolean);
  const liees = [...autres.filter((u) => u.ia === item.ia), ...autres.filter((u) => u.ia !== item.ia)].slice(0, 3);

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
      {entete}
      {item.media && <Media media={item.media} priority />}
      <section className="card is-mint stack-sm" aria-labelledby="pour-vous">
        <h2 id="pour-vous" className="h3">Ce que ça change pour vous</h2>
        <p>{item.impact}</p>
      </section>
      <section className="card stack-sm" aria-labelledby="a-faire" style={{ background: "var(--gold-bg)", borderColor: "#f5dfa3" }}>
        <h2 id="a-faire" className="h3">Ce que vous devez faire</h2>
        <p>{item.action}</p>
      </section>
      {item.points.length > 0 && (
        <section className="stack-sm" aria-labelledby="en-detail">
          <h2 id="en-detail" className="h2">En détail</h2>
          <ul className="steps">{item.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </section>
      )}
      {liees.length > 0 && (
        <section className="stack" aria-labelledby="a-lire-aussi">
          <h2 id="a-lire-aussi" className="h2">À lire aussi</h2>
          <div className="grid-3">
            {liees.map((u) => (
              <Link key={u.slug} href={`/mises-a-jour-ia/${u.slug}`} className="card pad-md card-link">
                <Chip tone="blue">{iaNoms[u.ia]}</Chip>
                <span className="strong">{u.titre}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}
