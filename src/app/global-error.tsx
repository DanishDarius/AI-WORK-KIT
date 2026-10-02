"use client";

import { useEffect } from "react";
import "./globals.css";

// Dernier filet (règle Q5) : affiché quand la mise en page racine elle-même
// échoue. Cette page remplace toute la mise en page : elle porte ses propres
// balises <html> et <body>, et ne dépend d'aucun composant de l'application.
export default function ErreurGlobale({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <title>Un problème est survenu | AIW</title>
        <main className="auth">
          <div className="auth-main">
            <div className="card stack" style={{ maxWidth: 520 }} role="alert">
              <h1 className="h1">AIW est momentanément indisponible.</h1>
              <p className="muted">Ce n’est pas de votre fait. Réessayez dans un instant : votre progression est conservée.</p>
              <div className="row">
                <button type="button" className="btn" onClick={() => retry()}>Réessayer</button>
              </div>
              <p className="small muted">
                Le problème continue ? Écrivez à support@parlonsads.com
                {error.digest ? <> en indiquant la référence <b>{error.digest}</b></> : null}.
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
