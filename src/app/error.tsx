"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Kicker } from "@/components/ui";

// Page d'erreur de l'application (règle Q5) : affichée quand une page échoue
// au rendu (base injoignable, vérification d'accès impossible, erreur
// inattendue). Le détail technique reste dans les logs du serveur : seule une
// référence est montrée, pour que le support retrouve l'erreur (règle S8).
export default function Erreur({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="contenu" className="auth">
      <div className="auth-main">
        <div className="card stack" style={{ maxWidth: 520 }} role="alert">
          <Kicker>Un problème est survenu</Kicker>
          <h1 className="h1">Cette page n’a pas pu s’afficher.</h1>
          <p className="muted">Ce n’est pas de votre fait. Réessayez dans un instant : votre progression est conservée.</p>
          <div className="row">
            <button type="button" className="btn" onClick={() => retry()}>Réessayer</button>
            <Link className="btn btn-secondary btn-plain" href="/">Retour au parcours</Link>
          </div>
          <p className="small muted">
            Le problème continue ? Écrivez à support@parlonsads.com
            {error.digest ? <> en indiquant la référence <b>{error.digest}</b></> : null}.
          </p>
        </div>
      </div>
    </main>
  );
}
