"use client";

import Link from "next/link";
import { useAbonne } from "@/lib/moi";
import { Chip } from "./ui";

// Bloc en bas du parcours : renvoie vers la page Sur mesure, où l'abonné
// demande une tâche ou un métier entier et suit ses demandes.
export function TacheSurMesure({ slug, metier }: { slug: string; metier: string }) {
  const abonne = useAbonne();
  if (abonne === undefined) return null;
  const lien = `/sur-mesure?metier=${encodeURIComponent(slug)}`;
  return (
    <section id="sur-mesure" className={`card stack${abonne ? "" : " is-orange"}`} aria-labelledby="sur-mesure-titre">
      {abonne ? <Chip tone="green" icon="check">Inclus dans votre abonnement</Chip> : <Chip tone="orange" icon="lock">Avec l’abonnement</Chip>}
      <h2 id="sur-mesure-titre" className="h2">Votre tâche n’est pas dans la liste ?</h2>
      <p className="muted">
        Une tâche plus complexe ou propre à votre activité en {metier} : décrivez-la, vous recevez sa fiche complète en 30 min à 2 h.
        Votre métier est très spécifique ? Demandez un kit complet, livré en 8 h à 24 h.
      </p>
      <div className="card pad-sm stack-sm" style={{ borderBottomWidth: 2 }}>
        <p className="kicker">Exemple de demande</p>
        <p>« Chaque fin de mois, je rapproche les paiements Mobile Money reçus avec les factures envoyées. Je veux repérer vite les factures non payées. »</p>
      </div>
      <div className="row">
        {abonne ? (
          <>
            <Link className="btn" href={lien}>Demander une tâche</Link>
            <Link className="btn btn-secondary btn-plain" href="/sur-mesure?type=metier">Demander un métier</Link>
          </>
        ) : (
          <Link className="btn btn-orange" href="/sur-mesure">Découvrir le sur-mesure</Link>
        )}
      </div>
    </section>
  );
}
