"use client";

import Link from "next/link";
import type { Moi } from "@/lib/moi";
import { dateLongue, fcfa, LIEN_ABONNEMENT, PRIX, SUPPORT_EMAIL } from "@/lib/offre";
import { BoutonChat } from "./support-chat";

function mail(sujet: string, corps: string) {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
}

export function MonOffre({ moi }: { moi: Moi }) {
  const a = moi.abonnement;
  const fin = dateLongue(a.fin_le);
  const periode = a.periode === "annuel" ? "annuelle" : "mensuelle";
  return (
    <section className="aw-offer" id="mon-offre" aria-labelledby="mon-offre-titre">
      <h2 id="mon-offre-titre">Mon offre</h2>
      <div className="aw-offer-grid">
        <article className="aw-offer-card">
          <header>
            <h3>Accès AIW</h3>
            <span className="aw-offer-status is-on"><i aria-hidden="true" />Actif</span>
          </header>
          <p>
            Paiement unique, sans limite de durée.
            {dateLongue(moi.acces_depuis) ? ` Actif depuis le ${dateLongue(moi.acces_depuis)}.` : ""}
          </p>
          <ul>
            <li>Tâches et Métiers, avec cas pratiques et prompts</li>
            <li>Plans « Mettre en place » et Mises à jour IA</li>
            <li>
              <Link href="/bibliotheque?acces=inclus">10 guides de la bibliothèque</Link>
            </li>
          </ul>
        </article>

        <article className={`aw-offer-card${a.actif ? " is-subscribed" : ""}`}>
          <header>
            <h3>Abonnement Bibliothèque</h3>
            {a.actif ? (
              <span className="aw-offer-status is-on"><i aria-hidden="true" />{a.statut === "resilie" ? "Résilié" : "Actif"}</span>
            ) : (
              <span className="aw-offer-status">{a.statut === "expire" ? "Terminé" : "Non souscrit"}</span>
            )}
          </header>
          {a.actif ? (
            <>
              <p>
                {a.statut === "resilie"
                  ? `Vous gardez l’accès jusqu’au ${fin}. Il ne sera pas renouvelé.`
                  : `Formule ${periode}. Actif jusqu’au ${fin}, renouvellement automatique.`}
              </p>
              <ul>
                <li>Les guides de la bibliothèque, sans exception</li>
                <li>La tâche sur mesure dans chaque métier</li>
              </ul>
              <div className="aw-offer-actions">
                <a
                  className="aw-offer-secondary"
                  href={mail("Gérer mon abonnement AIW", `Bonjour, je souhaite modifier mon abonnement Bibliothèque (compte : ${moi.email ?? ""}).`)}
                >
                  Gérer le paiement
                </a>
                {a.statut !== "resilie" && (
                  <a
                    className="aw-offer-link"
                    href={mail("Résilier mon abonnement AIW", `Bonjour, je souhaite résilier mon abonnement Bibliothèque (compte : ${moi.email ?? ""}). J’ai bien noté que l’accès reste ouvert jusqu’à la fin de la période payée.`)}
                  >
                    Résilier
                  </a>
                )}
              </div>
            </>
          ) : (
            <>
              <p>Tous les guides de la bibliothèque et la tâche sur mesure dans chaque métier. Sans engagement.</p>
              <p className="aw-offer-price">
                <span className="aw-offer-amount"><strong>{fcfa(PRIX.mensuel)}</strong> / mois</span>
                <span>ou {fcfa(PRIX.annuel)} / an, soit deux mois offerts</span>
              </p>
              <div className="aw-offer-actions">
                <a className="aw-offer-cta" href={LIEN_ABONNEMENT}>S’abonner à la Bibliothèque</a>
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  );
}

export function AideSupport({ titre = "Aide et support" }: { titre?: string }) {
  return (
    <section className="aw-support" aria-labelledby="aide-support-titre">
      <h2 id="aide-support-titre">{titre}</h2>
      <div className="aw-support-card">
        <div>
          <p className="aw-support-lead">Une question ? On vous répond 24 h/24, 7 j/7.</p>
          <p>
            Par chat dans l’app, ou par email à <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>
        <BoutonChat className="aw-support-open" />
      </div>
    </section>
  );
}
