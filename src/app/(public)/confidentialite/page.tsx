import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { EDITEUR } from "@/lib/marque";

export const metadata: Metadata = {
  title: "Politique de confidentialité et cookies | AI WORK KIT",
  description:
    "Données collectées par AI WORK KIT, finalités, durées de conservation, prestataires, cookies et exercice de vos droits.",
};

const sections = [
  { id: "responsable", title: "Responsable du traitement" },
  { id: "donnees", title: "Les données que nous traitons" },
  { id: "finalites", title: "Pourquoi et sur quelle base" },
  { id: "conservation", title: "Durées de conservation" },
  { id: "destinataires", title: "Qui y a accès" },
  { id: "transferts", title: "Transferts hors du Bénin" },
  { id: "cookies", title: "Cookies et stockage local" },
  { id: "securite", title: "Sécurité" },
  { id: "droits", title: "Vos droits" },
  { id: "mineurs", title: "Public concerné" },
  { id: "evolution", title: "Évolution de cette politique" },
];

const mail = <a href="mailto:support@parlonsads.com">support@parlonsads.com</a>;

export default function Confidentialite() {
  return (
    <LegalPage
      current="/confidentialite"
      kicker="Données personnelles"
      title="Politique de confidentialité et cookies"
      sections={sections}
      intro={
        <p>
          AI WORK KIT collecte le strict nécessaire pour vous donner accès à la
          plateforme et suivre votre progression. Nous ne vendons pas vos
          données, nous n’utilisons aucun outil publicitaire ni de mesure
          d’audience, et nous ne lisons pas ce que vous saisissez dans ChatGPT,
          Claude ou Gemini.
        </p>
      }
    >
      <LegalSection id="responsable" title="Responsable du traitement">
        <p>
          Le responsable du traitement est {EDITEUR}, éditeur d’AIW, établi en
          République du Bénin (voir les{" "}
          <Link href="/mentions-legales">mentions légales</Link>). Pour toute
          question sur vos données : {mail}.
        </p>
        <p>
          Cette politique applique la loi n° 2017-20 du 20 avril 2018 portant
          code du numérique en République du Bénin, notamment son livre
          consacré à la protection des données à caractère personnel. Lorsque
          vous résidez dans l’Union européenne, elle respecte également le
          Règlement général sur la protection des données (RGPD).
        </p>
      </LegalSection>

      <LegalSection id="donnees" title="Les données que nous traitons">
        <div className="legal-table" role="region" aria-label="Données traitées" tabIndex={0}>
          <table>
            <thead>
              <tr><th scope="col">Catégorie</th><th scope="col">Données</th><th scope="col">Origine</th></tr>
            </thead>
            <tbody>
              <tr><td>Compte</td><td>Adresse email, mot de passe (stocké chiffré, jamais lisible par nous), date de création du compte, dates de connexion</td><td>Vous, à l’activation</td></tr>
              <tr><td>Achat et accès</td><td>Adresse email d’achat, référence de la vente, offre achetée, statut de l’accès et de l’abonnement</td><td>Le prestataire de paiement, après votre commande</td></tr>
              <tr><td>Profil</td><td>Vos réponses au questionnaire de bienvenue : votre situation (salarié, indépendant, commerçant), votre métier, les IA que vous utilisez, votre appareil principal et votre pays</td><td>Vous, à la première ouverture ou depuis « Modifier mon profil »</td></tr>
              <tr><td>Progression</td><td>Tâches marquées comme faites, favoris, IA choisie pour chaque métier, dernière tâche consultée, jours d’activité (pour la série)</td><td>Votre utilisation</td></tr>
              <tr><td>Notifications</td><td>Vos choix de notification (e-mail de la semaine, rappels d’échéance), la date de votre dernière visite du fil Nouveau, et le journal des e-mails qui vous ont été envoyés (type, date)</td><td>Vous, depuis votre profil, et votre utilisation</td></tr>
              <tr><td>Attestation</td><td>Le rendu de l’exercice final de votre métier (images ou PDF), le nom à écrire sur l’attestation, ce que vous indiquez avoir vérifié, l’état et la date du rendu, la note et le commentaire du correcteur (abonnés uniquement)</td><td>Vous et le correcteur</td></tr>
              <tr><td>Tâche sur mesure</td><td>Le métier concerné, la description de la tâche que vous soumettez, les IA choisies, le plan qui vous est remis et son statut (abonnés uniquement)</td><td>Vous</td></tr>
              <tr><td>Demandes de contact</td><td>Nom, email, entreprise, fonction, secteur, taille d’entreprise, description du besoin, budget envisagé, compte à l’origine de la demande</td><td>Formulaires Systèmes IA et Transformation IA</td></tr>
              <tr><td>Support</td><td>Vos échanges avec le support, par email ou par le chat (messages, adresse email du compte, page depuis laquelle vous écrivez, navigateur et pays approximatif détectés par l’outil de chat)</td><td>Vous et l’outil de chat</td></tr>
              <tr><td>Données techniques</td><td>Adresse IP, type de navigateur, pages demandées et erreurs, dans les journaux de nos hébergeurs</td><td>Automatique</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Nous ne collectons pas vos données bancaires : elles sont traitées
          uniquement par le prestataire de paiement. Nous ne collectons aucune
          donnée sensible. Les recherches que vous faites dans la plateforme ne
          sont pas enregistrées.
        </p>
      </LegalSection>

      <LegalSection id="finalites" title="Pourquoi et sur quelle base">
        <ul>
          <li><strong>Créer et sécuriser votre compte, ouvrir votre accès après paiement, gérer l’abonnement :</strong> exécution du contrat.</li>
          <li><strong>Afficher votre progression, vos favoris et votre série, reprendre là où vous en étiez :</strong> exécution du contrat.</li>
          <li><strong>Adapter l’affichage à votre profil</strong> (métiers et tâches montrés en premier, étapes pensées pour votre appareil) et le retrouver sur un autre appareil : exécution du contrat.</li>
          <li><strong>Préparer le plan de votre tâche sur mesure et vous le remettre dans votre espace :</strong> exécution du contrat d’abonnement.</li>
          <li><strong>Corriger votre exercice final et vous délivrer l’attestation de votre métier :</strong> exécution du contrat d’abonnement.</li>
          <li><strong>Répondre au support et aux demandes de contact, préparer un devis :</strong> exécution de mesures précontractuelles ou du contrat.</li>
          <li><strong>Vous envoyer les emails de service</strong> (activation, mot de passe, reçu) : exécution du contrat.</li>
          <li><strong>Conserver les justificatifs de vente :</strong> obligation légale comptable.</li>
          <li><strong>Prévenir la fraude, le partage de comptes et les attaques, corriger les erreurs :</strong> intérêt légitime à protéger la plateforme.</li>
        </ul>
        <p>
          Nous n’envoyons pas d’emails commerciaux sans votre accord préalable,
          et chaque email de ce type contiendra un moyen simple de se
          désinscrire.
        </p>
      </LegalSection>

      <LegalSection id="conservation" title="Durées de conservation">
        <ul>
          <li><strong>Compte, profil et progression :</strong> tant que votre compte est actif. Après une demande de fermeture, suppression sous 30 jours.</li>
          <li><strong>Justificatifs d’achat :</strong> 10 ans, durée de conservation des pièces comptables.</li>
          <li><strong>Demandes de contact :</strong> 3 ans après le dernier échange, sauf si elles aboutissent à un contrat.</li>
          <li><strong>Échanges avec le support :</strong> 3 ans après le dernier échange.</li>
          <li><strong>Demandes de tâche sur mesure et plans remis :</strong> tant que votre compte est actif, pour que vous puissiez retrouver vos plans.</li>
          <li><strong>Rendus de l’exercice final et correction :</strong> les fichiers et ce que vous indiquez avoir vérifié sont effacés 2 mois après l’obtention de votre attestation. Le nom écrit sur l’attestation, le métier, les dates, la note et le commentaire du correcteur sont gardés tant que votre compte est actif : ils fondent votre attestation. Tant que l’attestation n’est pas obtenue, le rendu est gardé tant que votre compte est actif.</li>
          <li><strong>Journaux techniques :</strong> selon la durée fixée par nos hébergeurs, en général quelques jours à 30 jours.</li>
        </ul>
      </LegalSection>

      <LegalSection id="destinataires" title="Qui y a accès">
        <p>
          Vos données sont accessibles uniquement à {EDITEUR} et aux
          prestataires techniques nécessaires au service, qui agissent sur nos
          instructions :
        </p>
        <div className="legal-table" role="region" aria-label="Prestataires" tabIndex={0}>
          <table>
            <thead>
              <tr><th scope="col">Prestataire</th><th scope="col">Rôle</th><th scope="col">Lieu des données</th></tr>
            </thead>
            <tbody>
              <tr><td>Supabase</td><td>Base de données, comptes et connexion</td><td>Union européenne (Irlande)</td></tr>
              <tr><td>Vercel</td><td>Hébergement et affichage de l’application</td><td>États-Unis et réseau mondial</td></tr>
              <tr><td>Resend</td><td>Envoi des emails de la plateforme (compte, e-mail de la semaine, rappels d’échéance), des demandes de contact et des demandes de tâche sur mesure</td><td>Union européenne (Irlande), société américaine</td></tr>
              <tr><td>tawk.to</td><td>Chat du support, uniquement si vous l’ouvrez</td><td>États-Unis</td></tr>
              <tr><td>Bunny Stream</td><td>Hébergement et lecture des vidéos d’AIW, uniquement si vous lancez une vidéo</td><td>Union européenne (Allemagne) pour le stockage, réseau mondial pour la lecture</td></tr>
              <tr><td>Cloudflare (R2)</td><td>Stockage privé des fichiers que vous rendez pour l’attestation, ouverts seulement par le correcteur</td><td>Union européenne</td></tr>
              <tr><td>Hostinger</td><td>Messagerie support@parlonsads.com et nom de domaine</td><td>Centres de données de Hostinger</td></tr>
              <tr><td>Prestataire de paiement</td><td>Encaissement des paiements</td><td>Indiqué sur la page de commande</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Nous ne vendons, ne louons et ne cédons jamais vos données. Elles ne
          sont communiquées à une autorité que sur demande légale.
        </p>
      </LegalSection>

      <LegalSection id="transferts" title="Transferts hors du Bénin">
        <p>
          Nos prestataires étant situés dans l’Union européenne et aux
          États-Unis, vos données sont hébergées hors du Bénin. Nous
          choisissons des prestataires qui offrent des garanties de protection
          adaptées (engagements contractuels de protection des données,
          chiffrement, contrôle des accès). tawk.to, qui traite les échanges
          du chat aux États-Unis, est certifié au cadre de protection des
          données UE-États-Unis (Data Privacy Framework). Pour obtenir le détail de ces
          garanties, écrivez à {mail}.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="Cookies et stockage local">
        <p>
          AI WORK KIT n’utilise <strong>aucun cookie publicitaire, de réseau
          social ou de mesure d’audience</strong>. Les seuls éléments déposés sur
          votre appareil sont nécessaires au fonctionnement du service. C’est
          pourquoi aucun bandeau de consentement ne vous est demandé.
        </p>
        <div className="legal-table" role="region" aria-label="Cookies et stockage" tabIndex={0}>
          <table>
            <thead>
              <tr><th scope="col">Nom</th><th scope="col">Type</th><th scope="col">Utilité</th><th scope="col">Durée</th></tr>
            </thead>
            <tbody>
              <tr><td>sb-…-auth-token</td><td>Cookie de connexion (Supabase)</td><td>Vous garder connecté de façon sécurisée</td><td>Jusqu’à la déconnexion, renouvelé automatiquement</td></tr>
              <tr><td>aw-profil, aw-profil-envoye</td><td>Stockage local du navigateur</td><td>Afficher tout de suite votre profil (métier, situation, IA, appareil, pays), sans attendre le serveur</td><td>Jusqu’à ce que vous effaciez les données du site</td></tr>
              <tr><td>aw-compte</td><td>Stockage local du navigateur</td><td>Reconnaître qu’un autre compte se connecte sur cet appareil, pour ne pas lui montrer les copies du précédent</td><td>Jusqu’à la déconnexion</td></tr>
              <tr><td>aiw-pages, aiw-donnees, aiw-statique</td><td>Mémoire du navigateur pour le mode hors ligne</td><td>Garder lisibles sans connexion les pages, les tâches, les kits et les guides que vous avez déjà ouverts. Ces copies restent sur votre appareil</td><td>Jusqu’à la déconnexion ou au changement de compte ; les copies les plus anciennes sont remplacées par les plus récentes</td></tr>
              <tr><td>aw-premiers-pas</td><td>Stockage local du navigateur</td><td>Retenir les étapes que vous avez cochées dans « Premiers pas »</td><td>Jusqu’à ce que vous effaciez les données du site</td></tr>
              <tr><td>awk-saved-guides</td><td>Stockage local du navigateur</td><td>Mémoriser les guides que vous avez enregistrés sur cet appareil</td><td>Jusqu’à ce que vous le retiriez ou effaciez les données du site</td></tr>
              <tr><td>aw-dock-hidden</td><td>Stockage de session</td><td>Garder masqué le module de progression si vous l’avez fermé</td><td>Jusqu’à la fermeture de l’onglet</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Chat du support :</strong> le chat (tawk.to) ne se charge
          que lorsque vous cliquez sur le bouton de chat. Avant ce clic, aucun
          script ni cookie de tawk.to n’est présent. En l’ouvrant, vous
          demandez ce service : tawk.to dépose alors les éléments nécessaires
          à la conversation (cookies <em>tawk_uuid_…</em>, <em>twk_idm_key</em>,{" "}
          <em>TawkConnectionTime</em> et un jeton de session dans le stockage
          local), pour garder votre conversation ouverte d’une page à l’autre
          et entre vos onglets, pendant 6 mois au plus. Ils sont décrits dans
          la politique de tawk.to.
        </p>
        <p>
          <strong>Vidéos :</strong> les vidéos d’AIW (tâches, kits, premiers
          pas, page d’accès) sont hébergées par Bunny Stream (BunnyWay d.o.o.,
          Ljubljana, Slovénie). Une vidéo ne se charge que si vous cliquez sur
          le bouton lecture. Son lecteur reçoit alors, comme tout serveur qui
          envoie un contenu, votre adresse IP, votre pays et le type de votre
          navigateur ; Bunny indique rendre l’adresse IP anonyme dans ses
          journaux. Le lecteur garde vos réglages de lecture (volume, vitesse,
          sous-titres) dans votre navigateur. Certaines actualités contiennent
          une vidéo YouTube. Elle ne se charge, elle aussi, que si vous cliquez
          sur le bouton lecture, en mode confidentialité renforcée
          (youtube-nocookie.com). En lançant la vidéo, vous acceptez que
          YouTube (Google) traite certaines données selon sa propre politique
          de confidentialité.
        </p>
        <p>
          <strong>Images externes :</strong> certains visuels d’actualité sont
          affichés depuis les serveurs de leur éditeur (Anthropic, Google,
          YouTube), qui reçoivent à cette occasion votre adresse IP, comme pour
          toute image chargée sur internet.
        </p>
        <p>
          Vous pouvez supprimer à tout moment les cookies et le stockage local
          depuis les réglages de votre navigateur. Le cookie de connexion étant
          nécessaire, sa suppression vous déconnecte.
        </p>
        <p>
          Si nous ajoutons un jour un outil de mesure d’audience ou de
          publicité, nous vous demanderons votre accord au préalable et nous
          mettrons ce tableau à jour.
        </p>
      </LegalSection>

      <LegalSection id="securite" title="Sécurité">
        <p>
          Les échanges avec la plateforme sont chiffrés (HTTPS). Les mots de
          passe sont stockés sous forme chiffrée. Chaque utilisateur n’accède
          qu’à ses propres données, grâce à des règles d’accès appliquées dans
          la base de données. Les clés d’accès techniques ne sont jamais
          exposées dans l’application.
        </p>
      </LegalSection>

      <LegalSection id="droits" title="Vos droits">
        <p>Vous disposez à tout moment des droits suivants sur vos données :</p>
        <ul>
          <li><strong>accès :</strong> savoir quelles données nous détenons et en obtenir une copie ;</li>
          <li><strong>rectification :</strong> corriger une donnée inexacte ;</li>
          <li><strong>effacement :</strong> demander la suppression de vos données et de votre compte ;</li>
          <li><strong>opposition et limitation :</strong> vous opposer à un traitement fondé sur notre intérêt légitime ou en demander la suspension ;</li>
          <li><strong>portabilité :</strong> recevoir vos données de progression dans un format lisible ;</li>
          <li><strong>directives après décès :</strong> indiquer ce que doivent devenir vos données.</li>
        </ul>
        <p>
          Pour les exercer, écrivez à {mail} depuis l’adresse de votre compte.
          Nous répondons dans un délai d’un mois. Nous pouvons vous demander de
          confirmer votre identité si la demande ne vient pas de cette adresse.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          saisir l’Autorité de Protection des Données à caractère Personnel du
          Bénin (APDP, apdp.bj) ou, si vous résidez dans l’Union européenne,
          l’autorité de protection des données de votre pays (en France, la
          CNIL).
        </p>
      </LegalSection>

      <LegalSection id="mineurs" title="Public concerné">
        <p>
          AI WORK KIT s’adresse aux adultes et aux professionnels. Le service
          n’est pas destiné aux personnes de moins de 18 ans et nous ne
          collectons pas sciemment leurs données.
        </p>
      </LegalSection>

      <LegalSection id="evolution" title="Évolution de cette politique">
        <p>
          Nous mettrons cette politique à jour si nos pratiques évoluent. La
          date de dernière mise à jour figure en haut de la page. En cas de
          changement important, nous vous prévenons par email.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
