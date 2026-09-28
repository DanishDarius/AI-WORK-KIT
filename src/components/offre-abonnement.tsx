import Link from "next/link";
import { fcfa, LIEN_ABONNEMENT, PRIX } from "@/lib/offre";

function Coche() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function Cadenas() {
  return (
    <svg className="aw-lock-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

// Carte d'abonnement affichée sous l'aperçu d'un guide Premium.
export function OffreAbonnement({ autres, total }: { autres: number; total: number }) {
  return (
    <section className="aw-paywall" aria-labelledby="paywall-title">
      <div className="aw-paywall-copy">
        <p className="aw-library-kicker">Abonnement Bibliothèque</p>
        <h2 id="paywall-title">La suite de ce guide, et {autres} autres.</h2>
        <p>
          Vous venez de lire l’aperçu gratuit. L’abonnement ouvre la totalité de la bibliothèque et la
          tâche sur mesure dans chaque métier.
        </p>
        <ul>
          <li><Coche /><span><strong>Les {total} guides</strong>, et chaque nouveau guide publié</span></li>
          <li><Coche /><span><strong>La tâche sur mesure</strong> : décrivez une tâche, recevez un plan pour ChatGPT, Claude et Gemini</span></li>
          <li><Coche /><span>Résiliable à tout moment, depuis Mon compte</span></li>
        </ul>
      </div>
      <div className="aw-paywall-price">
        <p className="aw-paywall-amount">
          <strong>{fcfa(PRIX.mensuel).replace(" FCFA", "")}</strong>
          <span>FCFA / mois</span>
        </p>
        <p className="aw-paywall-year">ou {fcfa(PRIX.annuel)} / an, soit deux mois offerts</p>
        <a className="aw-paywall-cta" href={LIEN_ABONNEMENT}>S’abonner à la Bibliothèque</a>
        <Link className="aw-paywall-secondary" href="/bibliotheque?acces=inclus">Voir les 10 guides inclus dans mon accès</Link>
        <p className="aw-paywall-note">Sans engagement · Questions ? Le support répond 24 h/24, 7 j/7.</p>
      </div>
    </section>
  );
}
