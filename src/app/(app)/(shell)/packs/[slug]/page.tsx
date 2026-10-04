import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { BadgesTache, Chip } from "@/components/ui";
import { AbonnementCard, StatsCard } from "@/components/widgets";
import { getAbonnement } from "@/lib/abonnement";
import { exigerAccesActif } from "@/lib/acces";
import { lireFil } from "@/lib/contenu";
import { accesPublication, hrefTacheDuFil } from "@/lib/fil";

export const metadata: Metadata = { title: "Pack" };

type Props = { params: Promise<{ slug: string }> };

// Un pack : quelques tâches liées, publiées ensemble dans le fil Nouveau. Il
// ne s'affiche que s'il est paru ; réservé aux abonnés, un client sans
// abonnement en voit le titre seul.
export default async function Pack({ params }: Props) {
  const { email } = await exigerAccesActif();
  const { slug } = await params;
  const [fil, abonnement] = await Promise.all([lireFil(), getAbonnement(email)]);
  const pack = /^[a-z0-9-]{1,80}$/.test(slug) ? fil.packs[slug] : undefined;
  const acces = pack ? accesPublication(fil, "pack", slug, abonnement.actif) : "absente";
  if (!pack || acces === "absente") notFound();

  const taches = pack.taches.map((id) => fil.taches[id]).filter(Boolean);

  return (
    <Page aside={<><StatsCard /><AbonnementCard /></>}>
      <Link className="link" href="/nouveau"><Icon name="left" size={18} /> Nouveau</Link>
      <header className="stack">
        <div className="row" style={{ gap: 8 }}>
          <Chip tone="green">Pack</Chip>
          <Chip>{taches.length} tâches</Chip>
          {acces === "reservee" && <Chip tone="orange" icon="lock">Réservé aux abonnés</Chip>}
        </div>
        <h1 className="h1">{pack.titre}</h1>
        {acces === "ouverte" && <p className="lead">{pack.description}</p>}
        {acces === "ouverte" && pack.pour_qui && <p className="small muted">{pack.pour_qui}</p>}
      </header>

      {acces === "reservee" ? (
        <section className="card stack-sm" style={{ background: "var(--orange-bg)", borderColor: "var(--orange-line)" }}>
          <h2 className="h3">Réservé aux abonnés</h2>
          <p>Un pack réunit des tâches liées, chacune avec son cas concret et sa consigne à remplir. Il en paraît un chaque mois pour les abonnés.</p>
          <div className="row"><Link className="btn btn-orange" href="/abonnement">Voir les formules</Link></div>
        </section>
      ) : (
        <section className="card" aria-label="Les tâches du pack">
          {taches.map((t, i) => (
            <Link key={t.id} href={hrefTacheDuFil(t.id)} className="list-row" style={{ color: "var(--ink)" }}>
              <span className="node is-sm" aria-hidden="true" style={{ fontFamily: "var(--font-title)", fontWeight: 900, fontSize: 20 }}>{i + 1}</span>
              <span className="grow stack-sm" style={{ gap: 6, minWidth: 0 }}>
                <span className="title">{t.titre}</span>
                <span className="chips"><BadgesTache gratuit={t.gratuit_ok} mobile={t.mobile_ok} /></span>
              </span>
              <Icon name="arrow" size={20} />
            </Link>
          ))}
        </section>
      )}
    </Page>
  );
}
