import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { EDITEUR } from "@/lib/marque";

export const metadata: Metadata = {
  title: "Mentions légales | AI WORK KIT",
  description: "Éditeur, hébergement et propriété intellectuelle de la plateforme AI WORK KIT.",
};

const sections = [
  { id: "editeur", title: "Éditeur de la plateforme" },
  { id: "publication", title: "Responsable de la publication" },
  { id: "hebergement", title: "Hébergement et prestataires techniques" },
  { id: "propriete", title: "Propriété intellectuelle" },
  { id: "marques", title: "Marques citées et indépendance" },
  { id: "contenus-ia", title: "Nature des contenus" },
  { id: "responsabilite", title: "Responsabilité" },
  { id: "liens", title: "Liens et contenus externes" },
  { id: "signalement", title: "Signaler un contenu" },
  { id: "droit", title: "Droit applicable" },
];

export default function MentionsLegales() {
  return (
    <LegalPage
      current="/mentions-legales"
      kicker="Informations légales"
      title="Mentions légales"
      sections={sections}
      intro={
        <p>
          Cette page présente l’éditeur de la plateforme AIW (AI WORK KIT), accessible
          à l’adresse ai-work-kit.parlonsads.com, ainsi que ses prestataires
          d’hébergement et les règles qui protègent ses contenus.
        </p>
      }
    >
      <LegalSection id="editeur" title="Éditeur de la plateforme">
        <dl className="legal-facts">
          <div><dt>Service édité</dt><dd>AIW (AI WORK KIT), application web (PWA) d’apprentissage et d’usage de l’intelligence artificielle au travail</dd></div>
          <div><dt>Éditeur</dt><dd>AIW est un produit de {EDITEUR}</dd></div>
          <div><dt>Pays d’établissement</dt><dd>République du Bénin</dd></div>
          <div><dt>Adresse postale</dt><dd>Communiquée sur simple demande écrite à support@parlonsads.com</dd></div>
          <div><dt>Email</dt><dd><a href="mailto:support@parlonsads.com">support@parlonsads.com</a></dd></div>
        </dl>
      </LegalSection>

      <LegalSection id="publication" title="Responsable de la publication">
        <p>
          La publication est assurée par l’équipe {EDITEUR}, joignable à
          l’adresse <a href="mailto:support@parlonsads.com">support@parlonsads.com</a>.
        </p>
      </LegalSection>

      <LegalSection id="hebergement" title="Hébergement et prestataires techniques">
        <p>La plateforme repose sur les prestataires suivants :</p>
        <dl className="legal-facts">
          <div><dt>Hébergement de l’application</dt><dd>Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (vercel.com)</dd></div>
          <div><dt>Base de données et comptes</dt><dd>Supabase Pte. Ltd., 970 Toa Payoh North #07-04, Singapour 318992 (supabase.com). Données stockées dans la région Union européenne (Irlande).</dd></div>
          <div><dt>Envoi des emails de la plateforme</dt><dd>Resend (Plus Five Five, Inc.), 2261 Market Street #5039, San Francisco, CA 94114, États-Unis (resend.com). Envoi depuis la région Union européenne (Irlande).</dd></div>
          <div><dt>Nom de domaine et messagerie</dt><dd>Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Chypre (hostinger.com)</dd></div>
        </dl>
      </LegalSection>

      <LegalSection id="propriete" title="Propriété intellectuelle">
        <p>
          L’ensemble des contenus de la plateforme est la propriété exclusive
          de {EDITEUR}, sauf mention contraire : textes, cas pratiques,
          prompts, guides, parcours par métier, plans de mise en place, fiches
          d’actualité, illustrations, logos, marque AI WORK KIT,
          charte graphique, organisation des contenus et code de l’application.
        </p>
        <p>
          Votre accès vous donne un droit d’utilisation personnel, décrit dans
          les <Link href="/conditions">conditions générales</Link>. Vous pouvez
          utiliser les prompts et les méthodes pour votre propre travail et
          celui de votre entreprise. En revanche, toute reproduction,
          revente, diffusion publique, mise à disposition gratuite ou payante,
          extraction massive ou adaptation des contenus en dehors de ce cadre
          est interdite sans accord écrit de {EDITEUR}.
        </p>
        <p>
          Les visuels et vidéos d’actualité provenant d’un éditeur tiers
          (OpenAI, Anthropic, Google…) restent la propriété de leurs auteurs.
          Leur source est indiquée sous chaque visuel.
        </p>
      </LegalSection>

      <LegalSection id="marques" title="Marques citées et indépendance">
        <p>
          ChatGPT et OpenAI, Claude et Anthropic, Gemini et Google, ainsi que
          les autres outils cités (Notion, Canva, Perplexity…), sont des
          marques de leurs propriétaires respectifs. Elles sont citées
          uniquement pour désigner les outils dont la plateforme explique
          l’usage.
        </p>
        <p>
          AI WORK KIT est un service indépendant. Il n’est ni affilié, ni
          sponsorisé, ni validé par ces entreprises. {EDITEUR} n’est pas non
          plus affilié à Meta ou Facebook.
        </p>
      </LegalSection>

      <LegalSection id="contenus-ia" title="Nature des contenus">
        <p>
          Les contenus de la plateforme sont des ressources pédagogiques et
          pratiques. Les cas pratiques utilisent des entreprises, des personnes
          et des données fictives. Toute ressemblance avec une entreprise ou une
          personne réelle serait fortuite.
        </p>
        <p>
          Les fonctionnalités et les offres des outils d’IA évoluent vite. Les
          guides et les fiches d’actualité indiquent l’état des outils à leur
          date de rédaction, avec leurs sources. Ils ne constituent pas un
          conseil juridique, financier, médical ou professionnel personnalisé.
        </p>
      </LegalSection>

      <LegalSection id="responsabilite" title="Responsabilité">
        <p>
          {EDITEUR} met tout en œuvre pour proposer des contenus exacts et
          une plateforme disponible. Les réponses produites par ChatGPT,
          Claude, Gemini ou tout autre outil d’IA à partir de nos prompts sont
          générées par ces outils, et non par {EDITEUR} : elles peuvent
          contenir des erreurs. Vous restez responsable de leur vérification et
          de l’usage que vous en faites.
        </p>
        <p>
          Les règles détaillées de responsabilité applicables à votre compte
          figurent dans les <Link href="/conditions">conditions générales</Link>.
        </p>
      </LegalSection>

      <LegalSection id="liens" title="Liens et contenus externes">
        <p>
          La plateforme contient des liens vers des sites tiers (outils d’IA,
          documentation officielle, sources des actualités) et peut afficher
          des vidéos YouTube. {EDITEUR} ne contrôle pas ces sites et n’est
          pas responsable de leur contenu ni de leurs pratiques en matière de
          données personnelles.
        </p>
      </LegalSection>

      <LegalSection id="signalement" title="Signaler un contenu">
        <p>
          Pour signaler une erreur, un contenu illicite ou une atteinte à vos
          droits, écrivez à <a href="mailto:support@parlonsads.com">support@parlonsads.com</a> en
          précisant l’adresse de la page concernée. Nous traitons chaque
          signalement dans les meilleurs délais.
        </p>
      </LegalSection>

      <LegalSection id="droit" title="Droit applicable">
        <p>
          Les présentes mentions légales sont soumises au droit de la
          République du Bénin, notamment à la loi n° 2017-20 du 20 avril 2018
          portant code du numérique. Les règles applicables en cas de litige
          sont précisées dans les <Link href="/conditions">conditions générales</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
