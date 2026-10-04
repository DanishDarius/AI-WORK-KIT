import type { Metadata } from "next";
import Link from "next/link";
import { LIBELLE_TYPE, MarquerFilVu } from "@/components/fil";
import { Icon } from "@/components/icon";
import { Page } from "@/components/shell";
import { Chip, PageHead } from "@/components/ui";
import { AbonnementCard, StatsCard } from "@/components/widgets";
import { getAbonnement } from "@/lib/abonnement";
import { exigerAccesActif } from "@/lib/acces";
import { lireFil, type MiseAJourContenu } from "@/lib/contenu";
import { elementsDuFil, type ElementFil } from "@/lib/fil";
import { iaNoms, mediaThumb } from "@/lib/ia-updates";

export const metadata: Metadata = { title: "Nouveau" };

const FILTRES = [
  { cle: "", nom: "Tout" },
  { cle: "taches", nom: "Tâches et packs" },
  { cle: "ia", nom: "Mises à jour des IA" },
] as const;

function dateCourte(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(iso));
}

function garde(filtre: string, e: ElementFil) {
  if (filtre === "taches") return e.type === "tache" || e.type === "pack";
  if (filtre === "ia") return e.type === "mise_a_jour";
  return true;
}

// Une publication du fil. Réservée et sans abonnement : le titre seul, sans lien.
function Element({ e, actu, hautDePage }: { e: ElementFil; actu: MiseAJourContenu | null; hautDePage: boolean }) {
  const vignette = actu?.media ? mediaThumb(actu.media) : null;
  const contenu = (
    <>
      {e.ouvert && vignette && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={vignette.src} alt="" loading={hautDePage ? "eager" : "lazy"} style={{ width: 180, aspectRatio: "16 / 10", objectFit: "cover", borderRadius: 14, flex: "none", background: "var(--night)" }} className="hide-sm" />
      )}
      <span className="grow stack-sm" style={{ minWidth: 220 }}>
        <span className="row" style={{ gap: 8 }}>
          {actu ? <Chip tone="blue">{iaNoms[actu.ia]}</Chip> : <Chip tone="green">{LIBELLE_TYPE[e.type]}</Chip>}
          {actu && <Chip>{actu.genre}</Chip>}
          {e.reserve && <Chip tone="orange" icon={e.ouvert ? undefined : "lock"}>{e.ouvert ? "Abonnés" : "Réservé aux abonnés"}</Chip>}
          <span className="tiny muted">{dateCourte(e.publie_le)}</span>
        </span>
        <span className="h3">{e.titre}</span>
        {e.resume && <span className="muted small">{e.resume}</span>}
        {e.ouvert && actu && <span className="small" style={{ color: "var(--green)" }}><b className="strong">Pour vous :</b> {actu.impact}</span>}
      </span>
      {e.ouvert && <Icon name="arrow" size={20} />}
    </>
  );
  const style = { alignItems: "flex-start", gap: 20 } as const;
  return e.ouvert && e.href ? (
    <Link href={e.href} className="card pad-md card-link row" style={style}>{contenu}</Link>
  ) : (
    <div className="card pad-md row" style={style}>{contenu}</div>
  );
}

export default async function Nouveau({ searchParams }: PageProps<"/nouveau">) {
  const { email } = await exigerAccesActif();
  const { type } = await searchParams;
  const filtre = FILTRES.some((f) => f.cle === type) ? (type as string) : "";

  const [fil, abonnement] = await Promise.all([lireFil(), getAbonnement(email)]);
  const liste = elementsDuFil(fil, abonnement.actif).filter((e) => garde(filtre, e));
  // L'actualité d'une publication ouverte, pour sa vignette et son « Pour vous ».
  const actuDe = (e: ElementFil) => (e.type === "mise_a_jour" && e.ref ? fil.misesAJour[e.ref] ?? null : null);
  const reserves = liste.filter((e) => !e.ouvert && e.reserve).length;

  return (
    <Page aside={<><StatsCard /><AbonnementCard /></>}>
      <MarquerFilVu />
      <PageHead kicker="Ce qui vient de paraître" title="Nouveau">
        La tâche de la semaine, les packs et ce qui a changé dans ChatGPT, Claude et Gemini, expliqué simplement : ce que cela change pour vous, et ce que vous devez faire.
      </PageHead>
      <nav className="seg" aria-label="Filtrer le fil" style={{ maxWidth: 620 }}>
        {FILTRES.map((f) => (
          <Link key={f.cle} href={f.cle ? `/nouveau?type=${f.cle}` : "/nouveau"} aria-current={filtre === f.cle ? "page" : undefined}>{f.nom}</Link>
        ))}
      </nav>
      {reserves > 0 && (
        <p className="small muted">
          Les publications marquées « Réservé aux abonnés » s’ouvrent avec l’abonnement. <Link className="link" href="/abonnement">Voir les formules</Link>
        </p>
      )}
      <div className="stack">
        {liste.length === 0 && <div className="card pad-md empty"><p>Rien n’est encore paru ici.</p></div>}
        {liste.map((e, i) => <Element key={e.id} e={e} actu={actuDe(e)} hautDePage={i < 2} />)}
      </div>
    </Page>
  );
}
