import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation et de vente | AI WORK KIT",
  description:
    "Règles d’accès, offres, prix, abonnement, remboursement et responsabilités de la plateforme AI WORK KIT.",
};

const sections = [
  { id: "objet", title: "Objet et acceptation" },
  { id: "definitions", title: "Définitions" },
  { id: "offres", title: "Les offres" },
  { id: "compte", title: "Création du compte et accès" },
  { id: "prix", title: "Prix et paiement" },
  { id: "abonnement", title: "Abonnement Bibliothèque" },
  { id: "retractation", title: "Rétractation et remboursement" },
  { id: "usage", title: "Ce que vous pouvez faire avec les contenus" },
  { id: "outils-ia", title: "Outils d’IA tiers" },
  { id: "support", title: "Support" },
  { id: "disponibilite", title: "Disponibilité et évolution" },
  { id: "responsabilite", title: "Responsabilité" },
  { id: "suspension", title: "Suspension et fermeture du compte" },
  { id: "donnees", title: "Données personnelles" },
  { id: "modification", title: "Modification des conditions" },
  { id: "litiges", title: "Droit applicable et litiges" },
];

const mail = <a href="mailto:support@parlonsads.com">support@parlonsads.com</a>;

export default function Conditions() {
  return (
    <LegalPage
      current="/conditions"
      kicker="Conditions générales"
      title="Conditions générales d’utilisation et de vente"
      sections={sections}
      intro={
        <p>
          Ces conditions encadrent l’achat et l’utilisation d’AI WORK KIT. Elles
          sont écrites pour être lues : chaque partie dit clairement ce que vous
          obtenez, ce que vous payez et ce que chacun s’engage à faire.
        </p>
      }
    >
      <LegalSection id="objet" title="Objet et acceptation">
        <p>
          Les présentes conditions générales d’utilisation et de vente (les
          « Conditions ») s’appliquent à la plateforme AI WORK KIT, accessible
          à l’adresse ai-work-kit.parlonsads.com et éditée par Parlons ADS
          (voir les <Link href="/mentions-legales">mentions légales</Link>).
        </p>
        <p>
          En passant commande ou en utilisant votre compte, vous acceptez les
          Conditions en vigueur à cette date. Elles prévalent sur tout autre
          document, sauf accord écrit particulier, par exemple un devis signé
          pour un service sur mesure.
        </p>
      </LegalSection>

      <LegalSection id="definitions" title="Définitions">
        <dl className="aw-legal-facts">
          <div><dt>Plateforme</dt><dd>L’application web AI WORK KIT, installable sur ordinateur et mobile, et l’ensemble de ses contenus.</dd></div>
          <div><dt>Utilisateur ou vous</dt><dd>La personne titulaire d’un compte, qu’elle agisse à titre personnel ou pour son activité professionnelle.</dd></div>
          <div><dt>Contenus</dt><dd>Les tâches, cas pratiques, données d’exemple, prompts, parcours par métier, plans de mise en place, guides, fiches d’actualité et glossaire.</dd></div>
          <div><dt>Accès AI WORK KIT</dt><dd>L’offre payée en une seule fois, décrite ci-dessous.</dd></div>
          <div><dt>Abonnement Bibliothèque</dt><dd>L’offre payante et renouvelable qui ouvre l’ensemble des guides.</dd></div>
        </dl>
      </LegalSection>

      <LegalSection id="offres" title="Les offres">
        <h3>Accès AI WORK KIT (paiement unique)</h3>
        <p>Un paiement unique ouvre, sans limite de durée tant que la Plateforme est exploitée :</p>
        <ul>
          <li>les parcours <strong>Tâches</strong> et <strong>Métiers</strong> : chaque tâche avec ses cas pratiques, ses données d’exemple et ses prompts prêts à copier pour ChatGPT, Claude et Gemini ;</li>
          <li>les plans <strong>Mettre en place</strong> : outils, prompts et configuration des tâches automatisables pour chaque IA ;</li>
          <li>le bloc <strong>tâche sur mesure</strong> de chaque métier : vous décrivez une tâche précise et recevez un plan détaillé pour chacune des IA, sur le modèle des tâches existantes ;</li>
          <li><strong>Comprendre les IA</strong>, le glossaire et les <strong>Mises à jour IA</strong> ;</li>
          <li><strong>25 guides</strong> de la bibliothèque, signalés comme inclus ;</li>
          <li>le suivi de votre progression, vos favoris et vos guides enregistrés ;</li>
          <li>le support décrit plus bas.</li>
        </ul>

        <h3>Abonnement Bibliothèque</h3>
        <p>
          Il ouvre l’accès à l’ensemble des guides de la bibliothèque, au-delà
          des 25 guides inclus dans l’Accès AI WORK KIT, ainsi qu’aux nouveaux
          guides publiés pendant sa durée. Il est réservé aux titulaires de
          l’Accès AI WORK KIT, sauf mention contraire sur la page de commande.
        </p>

        <h3>Services sur mesure</h3>
        <p>
          Les offres <Link href="/systemes-ia">Systèmes IA</Link> et{" "}
          <Link href="/transformation-ia">Transformation IA</Link> (conception
          d’automatisations, accompagnement et formation d’équipe) ne sont pas
          vendues sur la Plateforme. Les formulaires servent uniquement à nous
          décrire votre besoin. Chaque projet fait l’objet d’un devis et de
          conditions propres, acceptés séparément.
        </p>
      </LegalSection>

      <LegalSection id="compte" title="Création du compte et accès">
        <p>
          Après votre paiement, vous recevez un email pour activer votre compte
          et choisir votre mot de passe. Votre compte est lié à l’adresse email
          utilisée lors de l’achat.
        </p>
        <p>
          Le compte est <strong>personnel</strong> : un compte correspond à une
          personne. Vous ne pouvez ni partager vos identifiants, ni revendre ou
          céder votre accès. Pour équiper une équipe, écrivez-nous : nous vous
          proposerons une offre adaptée.
        </p>
        <p>
          Vous êtes responsable de la confidentialité de votre mot de passe et
          de l’activité réalisée depuis votre compte. En cas de doute sur une
          utilisation par un tiers, prévenez-nous sans délai à {mail}.
        </p>
      </LegalSection>

      <LegalSection id="prix" title="Prix et paiement">
        <p>
          Les prix sont ceux affichés sur la page de commande au moment de
          l’achat, dans la devise indiquée. Ils comprennent l’ensemble des
          éléments de l’offre choisie. Les éventuels frais facturés par votre
          banque ou votre opérateur de paiement restent à votre charge.
        </p>
        <p>
          Le paiement est traité par un prestataire de paiement sécurisé,
          indiqué sur la page de commande. Parlons ADS ne reçoit ni ne conserve
          vos données de carte bancaire ou de compte de paiement mobile. Un
          reçu vous est adressé par email.
        </p>
        <p>
          La commande est définitive lorsque le paiement est confirmé. L’accès
          est ouvert immédiatement après cette confirmation.
        </p>
      </LegalSection>

      <LegalSection id="abonnement" title="Abonnement Bibliothèque">
        <ul>
          <li><strong>Durée :</strong> l’abonnement court pour la période choisie à la commande (par exemple un mois ou un an).</li>
          <li><strong>Renouvellement :</strong> il se renouvelle automatiquement pour une période identique, au prix en vigueur, sauf résiliation.</li>
          <li><strong>Résiliation :</strong> vous pouvez le résilier à tout moment, sans frais, en écrivant à {mail} ou depuis votre espace dès que cette option y est proposée. La résiliation prend effet à la fin de la période en cours, jusqu’à laquelle vous gardez l’accès à tous les guides.</li>
          <li><strong>Fin de l’abonnement :</strong> vous conservez l’Accès AI WORK KIT et les 25 guides inclus.</li>
          <li><strong>Changement de prix :</strong> toute hausse vous est annoncée par email au moins 30 jours avant le renouvellement concerné. Vous pouvez résilier avant qu’elle s’applique.</li>
        </ul>
      </LegalSection>

      <LegalSection id="retractation" title="Rétractation et remboursement">
        <p>
          AI WORK KIT est un contenu numérique fourni immédiatement après le
          paiement. En validant votre commande, vous demandez expressément
          l’accès immédiat aux contenus et reconnaissez perdre, dès cet accès,
          votre droit de rétractation lorsque la loi applicable le prévoit
          pour ce type de contenu.
        </p>
        <p>
          En conséquence, <strong>les paiements ne sont pas remboursables</strong>,
          qu’il s’agisse de l’Accès AI WORK KIT ou d’une période d’abonnement
          commencée. La résiliation d’un abonnement arrête les paiements
          suivants, sans remboursement de la période en cours.
        </p>
        <p>Nous vous remboursons toutefois dans les cas suivants :</p>
        <ul>
          <li>vous avez été débité deux fois pour la même commande ;</li>
          <li>votre accès n’a jamais pu être ouvert et notre support n’a pas trouvé de solution dans les 7 jours suivant votre signalement ;</li>
          <li>la loi applicable vous accorde un droit au remboursement auquel il ne peut être dérogé.</li>
        </ul>
        <p>Pour ces demandes, écrivez à {mail} avec votre reçu.</p>
      </LegalSection>

      <LegalSection id="usage" title="Ce que vous pouvez faire avec les contenus">
        <p>
          Parlons ADS vous accorde un droit d’utilisation personnel, non
          exclusif et non transférable des Contenus, pour la durée de votre
          accès.
        </p>
        <p><strong>Vous pouvez :</strong></p>
        <ul>
          <li>copier les prompts dans vos outils d’IA et les adapter à vos besoins ;</li>
          <li>utiliser les méthodes, plans et guides pour votre travail et celui de votre entreprise ;</li>
          <li>utiliser librement les résultats que vous obtenez avec vos outils d’IA.</li>
        </ul>
        <p><strong>Vous ne pouvez pas :</strong></p>
        <ul>
          <li>partager vos identifiants ou donner accès à votre compte à un tiers ;</li>
          <li>reproduire, publier, revendre ou distribuer les Contenus, en tout ou en partie, y compris dans une formation, un produit ou un service concurrent ;</li>
          <li>extraire les Contenus de façon automatisée (robots, aspiration, copie en masse) ;</li>
          <li>contourner les mesures de sécurité ou d’accès de la Plateforme, ou perturber son fonctionnement ;</li>
          <li>utiliser la Plateforme à des fins illicites ou contraires aux règles des outils d’IA concernés.</li>
        </ul>
      </LegalSection>

      <LegalSection id="outils-ia" title="Outils d’IA tiers">
        <p>
          AI WORK KIT vous apprend à utiliser des outils édités par d’autres
          entreprises, comme ChatGPT (OpenAI), Claude (Anthropic) ou Gemini
          (Google). Ces outils ne sont pas fournis par Parlons ADS :
        </p>
        <ul>
          <li>vous créez vos propres comptes chez ces éditeurs et acceptez leurs conditions ;</li>
          <li>leurs éventuels abonnements sont à votre charge ;</li>
          <li>leurs fonctionnalités, prix et limites peuvent changer sans préavis, ce qui peut nécessiter d’adapter une méthode ;</li>
          <li>les réponses qu’ils produisent peuvent contenir des erreurs : vérifiez-les avant tout usage important.</li>
        </ul>
        <p>
          Ne transmettez pas à un outil d’IA des informations confidentielles,
          des données personnelles de tiers ou des données sensibles sans avoir
          vérifié que vous en avez le droit et que l’outil offre les garanties
          nécessaires.
        </p>
      </LegalSection>

      <LegalSection id="support" title="Support">
        <p>
          Le support est joignable <strong>24 h/24 et 7 j/7</strong> à {mail},
          pour toute question sur votre accès, votre abonnement ou l’utilisation
          des Contenus. Nous répondons dans les meilleurs délais. Le support
          n’inclut pas la réalisation de vos tâches à votre place ni la
          conception de systèmes sur mesure, qui relèvent des services sur
          devis.
        </p>
      </LegalSection>

      <LegalSection id="disponibilite" title="Disponibilité et évolution">
        <p>
          Nous faisons le nécessaire pour que la Plateforme soit accessible en
          permanence. Des interruptions peuvent toutefois survenir pour
          maintenance, mise à jour ou en cas d’incident chez nos prestataires
          techniques.
        </p>
        <p>
          Les Contenus évoluent : nous ajoutons des tâches, des guides et des
          actualités, et nous mettons à jour ou retirons ce qui devient
          obsolète. Ces évolutions ne réduisent pas la nature de l’offre que
          vous avez achetée.
        </p>
      </LegalSection>

      <LegalSection id="responsabilite" title="Responsabilité">
        <p>
          Parlons ADS est tenu d’une obligation de moyens : nous fournissons des
          Contenus préparés avec soin et une Plateforme entretenue, sans
          garantir un résultat précis, un gain de temps chiffré ou un résultat
          commercial.
        </p>
        <p>
          Parlons ADS n’est pas responsable des dommages indirects, des
          décisions prises sur la base des réponses d’un outil d’IA, ni des
          conséquences d’un changement effectué par un éditeur d’IA tiers.
          Dans tous les cas, et dans la limite permise par la loi, la
          responsabilité de Parlons ADS est limitée au montant que vous avez
          payé au cours des 12 derniers mois.
        </p>
        <p>
          Ces limites ne s’appliquent pas en cas de faute lourde ou
          intentionnelle, ni aux droits que la loi applicable accorde aux
          consommateurs de manière impérative.
        </p>
      </LegalSection>

      <LegalSection id="suspension" title="Suspension et fermeture du compte">
        <p>
          En cas de manquement grave aux Conditions (partage d’identifiants,
          revente ou diffusion des Contenus, extraction automatisée, fraude au
          paiement), Parlons ADS peut suspendre votre compte après vous avoir
          informé par email, puis le fermer si le manquement continue. Une
          fermeture pour ces motifs ne donne pas lieu à remboursement.
        </p>
        <p>
          Vous pouvez à tout moment demander la fermeture de votre compte et la
          suppression de vos données à {mail}.
        </p>
      </LegalSection>

      <LegalSection id="donnees" title="Données personnelles">
        <p>
          Le traitement de vos données est décrit dans la{" "}
          <Link href="/confidentialite">politique de confidentialité et cookies</Link>.
        </p>
      </LegalSection>

      <LegalSection id="modification" title="Modification des conditions">
        <p>
          Nous pouvons faire évoluer ces Conditions, notamment pour suivre
          l’évolution de la Plateforme ou de la loi. La version applicable est
          celle en vigueur à la date de votre commande. Pour les abonnements,
          toute modification importante vous est notifiée par email au moins
          30 jours avant de s’appliquer : vous pouvez alors résilier.
        </p>
      </LegalSection>

      <LegalSection id="litiges" title="Droit applicable et litiges">
        <p>
          Les Conditions sont soumises au droit de la République du Bénin,
          notamment à la loi n° 2017-20 du 20 avril 2018 portant code du
          numérique. Si vous êtes un consommateur résidant dans un autre pays,
          vous conservez la protection des règles impératives de votre pays de
          résidence.
        </p>
        <p>
          En cas de difficulté, écrivez d’abord à {mail} : nous cherchons une
          solution amiable dans un délai de 30 jours. À défaut d’accord, le
          litige sera porté devant les tribunaux compétents de Cotonou, sauf
          règle impérative contraire applicable au consommateur.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
