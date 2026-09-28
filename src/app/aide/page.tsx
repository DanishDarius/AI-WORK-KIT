import type { Metadata } from "next";
import Link from "next/link";
import { AideSupport } from "@/components/mon-offre";
import { fcfa, PRIX } from "@/lib/offre";

export const metadata: Metadata = {
  title: "Aide et support | AI WORK KIT",
  description: "Une question sur AIW ? Le support répond 24 h/24, 7 j/7, par chat ou par email.",
};

const questions: Array<[string, React.ReactNode]> = [
  [
    "Que comprend mon accès AIW ?",
    <>
      Votre paiement unique ouvre, sans limite de durée, les Tâches et les Métiers avec leurs cas pratiques et leurs
      prompts, les plans « Mettre en place », les Mises à jour IA et{" "}
      <Link href="/bibliotheque?acces=inclus">10 guides de la bibliothèque</Link>.
    </>,
  ],
  [
    "Que change l’abonnement Bibliothèque ?",
    <>
      Il ouvre tous les guides de la bibliothèque, y compris chaque nouveau guide publié, et la tâche sur mesure dans
      chaque métier. Il coûte {fcfa(PRIX.mensuel)} par mois ou {fcfa(PRIX.annuel)} par an. Les guides Premium restent
      lisibles en aperçu sans abonnement.
    </>,
  ],
  [
    "Comment fonctionne la tâche sur mesure ?",
    <>
      En bas de chaque page métier, décrivez une tâche qui ne figure pas dans la liste. L’équipe vous prépare un plan
      détaillé, étape par étape, avec un prompt prêt pour les IA choisies. Le plan s’affiche au même endroit dès qu’il
      est prêt.
    </>,
  ],
  [
    "Comment résilier mon abonnement ?",
    <>
      Depuis <Link href="/mon-compte#mon-offre">Mon compte</Link>, section Mon offre, ou en écrivant au support.
      L’accès reste ouvert jusqu’à la fin de la période déjà payée.
    </>,
  ],
  [
    "Je n’arrive plus à me connecter.",
    <>
      Utilisez <Link href="/mot-de-passe-oublie">Mot de passe oublié</Link> avec l’adresse email de votre achat. Si
      rien n’arrive, vérifiez vos courriers indésirables puis écrivez-nous.
    </>,
  ],
];

export default function AidePage() {
  return (
    <div className="aw-help-page">
      <div className="aw-help-head">
        <p className="eyebrow">Aide et support</p>
        <h1>Comment pouvons-nous vous aider ?</h1>
      </div>
      <AideSupport titre="Nous contacter" />
      <section className="aw-help-faq" aria-labelledby="questions-frequentes">
        <h2 id="questions-frequentes">Questions fréquentes</h2>
        {questions.map(([question, reponse]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{reponse}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
