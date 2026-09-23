import Link from "next/link";
import { Intro } from "@/components/kit-ui";

export default function NotFound() {
  return (
    <>
      <Intro eyebrow="Page introuvable" title="Cette page n’existe pas.">
        Le lien est erroné ou la page a changé d’adresse. Repartez de l’accueil.
      </Intro>
      <Link className="button" href="/">
        Retour à l’accueil
      </Link>
    </>
  );
}
