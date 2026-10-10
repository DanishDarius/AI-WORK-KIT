import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicFooter, PublicTop } from "@/components/public";
import { Chip, Kicker } from "@/components/ui";
import { dateAttestation, numeroValide, texteAttestation } from "@/lib/attestation-publique";
import { lireAttestationPublique } from "@/lib/attestation-verification";

// /attestation/<numéro> : la page publique de vérification d'une attestation
// (étape D, document « AIW : attestations par métier » validé le 10 octobre
// 2026). Seule page publique ajoutée à la plateforme fermée. Elle montre le
// nom, le métier et la date, dit que ce n'est ni un diplôme ni une
// certification officielle, et renvoie aux mentions légales.
//
// Règle C3 : la page ne dépend pas du visiteur. Elle se fabrique à la
// première visite d'un numéro, puis reste en cache 10 minutes (ISR, la durée
// du cache du contenu, qui lui donne le nom du métier) ; le proxy ne
// s'exécute pas sur elle. Elle n'est pas indexée par les moteurs de
// recherche : on y arrive par le numéro, donné par le titulaire.

export const revalidate = 600;

export function generateStaticParams() {
  return [];
}

export const metadata: Metadata = {
  title: "Vérification d’une attestation | AI WORK KIT",
  description: "Vérifiez une attestation de compétences IA délivrée par AIW, avec son numéro.",
  robots: { index: false, follow: false },
};

export default async function VerificationAttestation({ params }: { params: Promise<{ numero: string }> }) {
  const numero = numeroValide((await params).numero);
  const attestation = numero ? await lireAttestationPublique(numero) : null;
  if (!attestation) notFound();
  const date = dateAttestation(attestation.delivreeLe);

  return (
    <>
      <PublicTop action={<Link className="btn btn-secondary btn-sm btn-plain" href="/acces">Découvrir AIW</Link>} />
      <main id="contenu" className="wrap section stack-lg" style={{ maxWidth: 760 }}>
        <header className="page-head">
          <Kicker>Vérification d’une attestation</Kicker>
          <h1 className="h1">{attestation.nom}</h1>
        </header>
        <section className="card stack" aria-labelledby="attestation-titre" style={{ background: "var(--mint-bg)" }}>
          <Chip tone="green" icon="award">Attestation valide</Chip>
          <h2 id="attestation-titre" className="h2">{texteAttestation(attestation.metier)}</h2>
          <dl className="attestation-faits">
            <div><dt>Nom</dt><dd>{attestation.nom}</dd></div>
            <div><dt>Métier</dt><dd>{attestation.metier}</dd></div>
            <div><dt>Délivrée le</dt><dd>{date}</dd></div>
            <div><dt>Numéro</dt><dd>{attestation.numero}</dd></div>
          </dl>
        </section>
        <section className="stack-sm" aria-labelledby="sens-titre">
          <h2 id="sens-titre" className="h3">Ce que dit cette attestation</h2>
          <p>
            La personne a réussi l’exercice final du parcours {attestation.metier} d’AIW : un cas pratique du métier,
            traité avec l’IA puis corrigé selon une grille de 5 critères.
          </p>
          <p><b>Ce n’est ni un diplôme ni une certification officielle.</b></p>
          <p className="small muted">
            Qui délivre cette attestation : voir les <Link className="strong" href="/mentions-legales">mentions légales</Link>.
          </p>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
