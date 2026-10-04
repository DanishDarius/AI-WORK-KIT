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
  { id: "abonnement", title: "Abonnement AIW" },
  { id: "retractation", title: "Rétractation et remboursement" },
  { id: "usage", title: "Ce que vous pouvez faire avec les contenus" },
  { id: "licence", title: "Licence de revente des guides" },
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
        <dl className="legal-facts">
          <div><dt>Plateforme</dt><dd>L’application web AI WORK KIT, installable sur ordinateur et mobile, et l’ensemble de ses contenus.</dd></div>
          <div><dt>Utilisateur ou vous</dt><dd>La personne titulaire d’un compte, qu’elle agisse à titre personnel ou pour son activité professionnelle.</dd></div>
          <div><dt>Contenus</dt><dd>Les tâches, cas pratiques, données d’exemple, prompts, parcours par métier, plans de mise en place, guides et fiches d’actualité.</dd></div>
          <div><dt>Accès AI WORK KIT</dt><dd>L’offre payée en une seule fois, décrite ci-dessous.</dd></div>
          <div><dt>Abonnement AIW</dt><dd>L’offre payée par période (un mois, un an ou à vie) qui ouvre l’ensemble des guides avec leur licence de revente, le sur-mesure et le chat du support.</dd></div>
        </dl>
      </LegalSection>

      <LegalSection id="offres" title="Les offres">
        <h3>Accès AI WORK KIT (paiement unique)</h3>
        <p>Un paiement unique ouvre, sans limite de durée tant que la Plateforme est exploitée :</p>
        <ul>
          <li>le <strong>kit de votre métier</strong> (configurations, skills, modèles de documents, routines), au fur et à mesure de sa publication, et ses mises à jour quand un outil d’IA change ;</li>
          <li>les parcours <strong>Tâches</strong> et <strong>Métiers</strong> : chaque tâche avec ses cas pratiques, ses données d’exemple et ses prompts prêts à copier pour ChatGPT, Claude et Gemini ;</li>
          <li>les plans de mise en place : outils, prompts et configuration des tâches automatisables pour chaque IA ;</li>
          <li>les nouveautés des IA ;</li>
          <li><strong>10 guides</strong> de la bibliothèque à lire en ligne, signalés « Inclus », ainsi que l’aperçu (introduction et premier chapitre) des autres guides ;</li>
          <li>le suivi de votre progression, vos favoris et vos guides enregistrés ;</li>
          <li>le support par email, décrit plus bas.</li>
        </ul>

        <h3>Abonnement AIW</h3>
        <p>
          Réservé aux titulaires de l’Accès AI WORK KIT et souscrit depuis la
          Plateforme, il ouvre pendant toute sa durée :
        </p>
        <ul>
          <li>l’ensemble des guides de la bibliothèque et les nouveaux guides publiés, à lire en ligne et à <strong>télécharger en PDF</strong>, avec la licence de revente décrite plus bas ;</li>
          <li>la <strong>tâche sur mesure</strong> : vous décrivez une tâche plus complexe ou propre à votre activité, même dans un métier déjà couvert, et l’équipe vous prépare sa fiche complète (cas, modèle à remplir, prompt pour chacune des IA choisies, ressources utiles), livrée dans votre espace en 30 minutes à 2 heures, dans la limite de <strong>8 demandes par mois</strong> ;</li>
          <li>le <strong>métier sur mesure</strong> : pour un métier couvert ou non, l’équipe vous prépare un kit complet (configuration de votre IA, skills, modèles de documents, routines et vos principales tâches), livré en 8 à 24 heures, dans la limite de <strong>2 demandes par mois</strong> ;</li>
          <li>le chat du support, en plus de l’email ;</li>
          <li>les nouveautés publiées pour les abonnés : la tâche de la semaine, les packs de tâches et les mises à jour des IA. Un client sans abonnement en voit le titre.</li>
        </ul>
        <p>
          Les délais de livraison du sur-mesure courent pendant les heures d’activité du support et sont indicatifs.
          Les limites mensuelles se renouvellent le 1er de chaque mois. Le sur-mesure ne couvre pas la réalisation
          de la tâche à votre place. Une version anonymisée d’une demande peut rejoindre le catalogue d’AIW quand
          elle peut servir à d’autres clients ; aucune donnée qui vous identifie n’y figure.
        </p>
        <p>Le sur-mesure, le téléchargement des guides, le chat et les nouveautés réservées aux abonnés ne sont utilisables que pendant un abonnement actif.</p>
        <p>
          Les abonnés reçoivent un e-mail par semaine, qui annonce ce qui est paru, et, pour les formules au mois et à l’année,
          un rappel 5 jours avant l’échéance puis le jour même. Chacun de ces e-mails se coupe depuis le profil ; l’e-mail de la
          semaine se coupe aussi par le lien placé en bas du message.
        </p>

        <h3>Services sur mesure</h3>
        <p>
          Les offres <Link href="/accompagnement">Systèmes IA</Link> et{" "}
          <Link href="/accompagnement">Transformation IA</Link> (conception
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
        <p>À la date de mise à jour de ces Conditions, les prix sont les suivants :</p>
        <dl className="legal-facts">
          <div><dt>Accès AI WORK KIT</dt><dd>5 000 FCFA, payés une seule fois</dd></div>
          <div><dt>Abonnement AIW mensuel</dt><dd>5 000 FCFA pour un mois, payés une seule fois</dd></div>
          <div><dt>Abonnement AIW annuel</dt><dd>50 000 FCFA pour un an, payés une seule fois</dd></div>
          <div><dt>Abonnement AIW à vie</dt><dd>95 000 FCFA, payés une seule fois</dd></div>
        </dl>
        <p>
          Le prix applicable est celui affiché au moment de la commande. Il
          comprend l’ensemble des éléments de l’offre choisie. Les éventuels frais facturés par votre
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

      <LegalSection id="abonnement" title="Abonnement AIW">
        <ul>
          <li><strong>Durée :</strong> l’abonnement court pour la période choisie à la commande : un mois ou un an à compter de l’activation. La formule à vie est sans échéance.</li>
          <li><strong>Paiement unique, sans renouvellement automatique :</strong> chaque période est payée une seule fois. Aucun prélèvement n’est effectué ensuite, et il n’y a donc rien à résilier.</li>
          <li><strong>Prolongation :</strong> vous pouvez prolonger à tout moment depuis la Plateforme, au prix en vigueur. La nouvelle période s’ajoute à la fin de celle en cours.</li>
          <li><strong>Activation :</strong> l’abonnement s’active automatiquement lorsque le paiement est fait avec l’adresse email de votre compte. Si vous avez payé avec une autre adresse, écrivez à {mail} pour le faire rattacher.</li>
          <li><strong>Fin de l’abonnement :</strong> à l’échéance, vous conservez l’Accès AI WORK KIT et les 10 guides inclus, ainsi que les livraisons sur mesure déjà reçues et les guides déjà téléchargés. Le sur-mesure, le téléchargement, le chat et les nouveautés réservées aux abonnés se referment.</li>
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
          commencée.
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
          <li>reproduire, publier, revendre ou distribuer les Contenus, en tout ou en partie, y compris dans une formation, un produit ou un service concurrent, sauf les guides téléchargés dans le cadre de la licence ci-dessous ;</li>
          <li>extraire les Contenus de façon automatisée (robots, aspiration, copie en masse) ;</li>
          <li>contourner les mesures de sécurité ou d’accès de la Plateforme, ou perturber son fonctionnement ;</li>
          <li>utiliser la Plateforme à des fins illicites ou contraires aux règles des outils d’IA concernés.</li>
        </ul>
      </LegalSection>

      <LegalSection id="licence" title="Licence de revente des guides">
        <p>
          Chaque guide que vous téléchargez pendant un abonnement actif est à vous : vous pouvez le vendre,
          l’offrir, l’intégrer à vos produits ou le publier sous votre nom. Ce droit reste valable après la fin
          de l’abonnement pour les guides déjà téléchargés.
        </p>
        <p>Une seule règle, selon que vous modifiez le guide ou non :</p>
        <ul>
          <li><strong>Vous le laissez tel quel :</strong> vous pouvez mentionner AI WORK KIT, ou ne pas le mentionner.</li>
          <li><strong>Vous le modifiez :</strong> vous retirez toute mention d’AI WORK KIT et de Parlons ADS. Le guide modifié est votre œuvre, sous votre seule responsabilité.</li>
        </ul>
        <p>
          Cette licence concerne uniquement les guides téléchargés. Les tâches, cas pratiques, prompts et kits
          restent réservés à votre usage, et votre compte reste personnel.
        </p>
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
          Le support est joignable par email à {mail} pour tous les clients, et
          par le chat intégré à la Plateforme, <strong>7 j/7</strong>, pour les abonnés, pour toute question sur votre accès, votre abonnement ou l’utilisation
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
          une modification ne s’applique pas à une période déjà payée.
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
