import Link from "next/link";
import { PublicFooter, PublicTop } from "@/components/public";
import { Kicker } from "@/components/ui";

// Un numéro inconnu, ou mal écrit : la page le dit, sans rien révéler d'autre.
export default function AttestationIntrouvable() {
  return (
    <>
      <PublicTop action={<Link className="btn btn-secondary btn-sm btn-plain" href="/acces">Découvrir AIW</Link>} />
      <main id="contenu" className="wrap section stack-lg" style={{ maxWidth: 760 }}>
        <header className="page-head">
          <Kicker>Vérification d’une attestation</Kicker>
          <h1 className="h1">Aucune attestation ne porte ce numéro.</h1>
          <p className="lead">
            Vérifiez le numéro écrit sur le document : il commence par AIW, suivi de trois groupes de 4 signes, par exemple{" "}
            <span style={{ whiteSpace: "nowrap" }}>AIW-7F3A-91C2-0B4E</span>.
          </p>
          <p className="small muted">
            Qui délivre ces attestations : voir les <Link className="strong" href="/mentions-legales">mentions légales</Link>.
          </p>
        </header>
      </main>
      <PublicFooter />
    </>
  );
}
