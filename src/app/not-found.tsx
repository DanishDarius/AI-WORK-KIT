import Link from "next/link";
import { Kicker } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="contenu" className="auth">
      <div className="auth-main">
        <div className="card stack" style={{ maxWidth: 520 }}>
          <Kicker>Page introuvable</Kicker>
          <h1 className="h1">Cette page n’existe pas.</h1>
          <p className="muted">Le lien est erroné ou la page a changé d’adresse. Repartez de votre parcours.</p>
          <Link className="btn" href="/">Retour au parcours</Link>
        </div>
      </div>
    </main>
  );
}
