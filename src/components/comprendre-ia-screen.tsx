"use client";
import { useId, useState } from "react";
import { chemins, IA, iaLabels } from "@/lib/kit-api";
import { Back, GlossaireList, Intro } from "./kit-ui";
import type { GuideSummary } from "@/lib/guides";
import { GuideShelf } from "./guide-shelf";

// Les 3 cas du guide pas-à-pas, avec les étapes propres à chaque IA, à parité
// stricte entre ChatGPT, Claude et Gemini (même nombre de cas, même niveau de
// détail), pour une comparaison juste.
const CAS: {
  titre: string;
  sousTitre: string;
  etapes: Record<IA, string[]>;
}[] = [
  {
    titre: "Brancher une application courante (Drive, Slack, Gmail...)",
    sousTitre: "Le plus utile · 2 minutes",
    etapes: {
      chatgpt: [
        "Cliquez sur + dans la zone de saisie.",
        "Choisissez Applications connectées ou ouvrez le répertoire des applications.",
        "Cherchez l'application (Google Drive, Slack...) et cliquez sur Connecter.",
        "Validez l'autorisation dans la fenêtre qui s'ouvre.",
      ],
      claude: [
        "Allez dans Réglages > Connecteurs.",
        "Parcourez le catalogue (Google Drive, Slack, Notion, Figma...).",
        "Cliquez sur Connecter et autorisez l'accès.",
        "En conversation, cliquez sur + pour ajouter des fichiers depuis vos connecteurs.",
      ],
      gemini: [
        "Sur gemini.google.com, ouvrez Paramètres, puis Applis connectées.",
        "Activez l'application voulue (Gmail, Google Maps, Spotify...) avec le bouton.",
        "En conversation, tapez @ pour choisir l'application, puis envoyez votre demande.",
        "Si l'application n'est pas encore liée, Gemini vous demande l'autorisation à ce moment-là.",
      ],
    },
  },
  {
    titre: "Créer un assistant sur mesure, sans coder",
    sousTitre: "Pour aller plus loin · 10 minutes",
    etapes: {
      chatgpt: [
        "Allez dans Explorer les GPT > Créer > onglet Configurer.",
        "Donnez-lui un nom, des instructions et, si besoin, des fichiers de référence.",
        "Pour le relier à un outil externe : Créer une nouvelle action, puis collez le schéma de l'API (OpenAPI, JSON ou YAML).",
        "Configurez l'authentification (clé API ou OAuth) et ajoutez une politique de confidentialité.",
        "Testez, puis cliquez sur Publier.",
      ],
      claude: [
        "Dans la barre latérale, cliquez sur Projets > Créer un projet.",
        "Écrivez vos consignes dans Instructions du projet.",
        "Dans Contenu du projet, ajoutez vos documents de référence (méthode, exemples, modèles).",
        "Optionnel : reliez le projet à vos connecteurs déjà configurés.",
      ],
      gemini: [
        "Sur gemini.google.com, ouvrez Explorer les Gems, puis Nouveau Gem.",
        "Donnez-lui un nom et des instructions : rôle, tâche, contexte, format de réponse.",
        "Dans Connaissances, cliquez sur Ajouter des fichiers pour lui donner vos documents.",
        "Testez dans l'aperçu, puis cliquez sur Enregistrer (rien n'est sauvegardé automatiquement).",
      ],
    },
  },
  {
    titre: "Brancher un outil interne ou sur mesure (MCP)",
    sousTitre: "Profil technique",
    etapes: {
      chatgpt: [
        "Allez dans Réglages > Apps & Connecteurs.",
        "Activez le Developer Mode dans les paramètres avancés.",
        "Cliquez sur Créer et renseignez nom, description, URL sécurisée (https://...) et authentification.",
        "En conversation, cliquez sur +, choisissez Developer Mode et cochez votre connecteur.",
      ],
      claude: [
        "Ouvrez Claude Desktop (recommandé pour les connecteurs locaux).",
        "Profil > Réglages > onglet Developer > Edit Config (fichier claude_desktop_config.json).",
        'Ajoutez la configuration, par exemple : { "mcpServers": { "mon-outil": { "command": "npx", "args": ["-y", "@nom-du-serveur/mcp"] } } }',
        "Enregistrez et redémarrez Claude Desktop.",
      ],
      gemini: [
        "Ouvrez (ou créez) le fichier ~/.gemini/settings.json.",
        'Ajoutez la configuration, par exemple : { "mcpServers": { "mon-outil": { "command": "npx", "args": ["-y", "@nom-du-serveur/mcp"] } } }',
        "Redémarrez Gemini CLI : il lance automatiquement les serveurs déclarés.",
        'Vérifiez avec la commande /mcp list (elle doit afficher "Connected").',
      ],
    },
  },
];

function CasGuide({ cas }: { cas: (typeof CAS)[number] }) {
  const uid = useId();
  const [active, setActive] = useState<IA>("chatgpt");
  return (
    <article className="panel mb-6">
      <p className="eyebrow">{cas.sousTitre}</p>
      <h3 className="mb-4">{cas.titre}</h3>
      <div className="prompt-box">
        <div
          role="tablist"
          aria-label={`Choisir l'IA pour : ${cas.titre}`}
          className="flex flex-wrap gap-1 border-b border-[var(--border)] p-2"
        >
          {chemins.map((ia, i) => (
            <button
              key={ia}
              id={`${uid}-${ia}`}
              role="tab"
              aria-selected={active === ia}
              aria-controls={`${uid}-panel`}
              tabIndex={active === ia ? 0 : -1}
              className="prompt-tab"
              onClick={() => setActive(ia)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight"
                    ? (i + 1) % 3
                    : event.key === "ArrowLeft"
                      ? (i + 2) % 3
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : -1;
                if (next >= 0) {
                  event.preventDefault();
                  setActive(chemins[next]);
                  document.getElementById(`${uid}-${chemins[next]}`)?.focus();
                }
              }}
            >
              <span className={`ia-dot dot-${ia}`} />
              {iaLabels[ia]}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-${active}`}
          tabIndex={0}
          className="p-4 sm:p-5"
        >
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-[var(--muted)]">
            {cas.etapes[active].map((etape, i) => (
              <li key={i}>{etape}</li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}


export function ComprendreIaScreen({ guides = [] }: { guides?: GuideSummary[] }) {
  return (
    <>
      <Back href="/">Accueil</Back>
      <Intro eyebrow="Les bases" title="ChatGPT, Claude, Gemini : ce qu’il faut savoir.">
        Ce qu’elles savent faire, laquelle choisir, et comment ne pas se faire
        piéger. 5 minutes de lecture, zéro jargon.
      </Intro>

      <section className="panel mb-6">
        <p className="eyebrow">Partie 1 · Les bases</p>
        <h2 className="mb-3">Ce n’est pas Google. C’est un assistant.</h2>
        <p className="text-sm leading-7 text-[var(--muted)]">
          Google vous donne des liens. ChatGPT, Claude et Gemini vous donnent
          une réponse, écrite pour vous. Vous leur parlez comme à un collègue,
          vous leur confiez un texte, une image ou un document, et ils
          produisent ce que vous demandez : un résumé, un e-mail, un tableau,
          un plan, une idée.
        </p>
      </section>

      <section className="panel mb-6">
        <h2 className="mb-3">Comment ça marche, en deux phrases</h2>
        <p className="text-sm leading-7 text-[var(--muted)]">
          Ces outils ont lu des milliards de textes et appris comment les mots
          s’enchaînent pour former un raisonnement. Ils ne recopient pas : ils
          écrivent une réponse neuve, mot après mot.
        </p>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          C’est le principe du texte prédictif de votre téléphone, en
          infiniment plus puissant. D’où leur force (ils rédigent vite et
          bien) et leur faiblesse (ils peuvent inventer avec aplomb).
        </p>
      </section>

      <section className="panel mb-6">
        <h2 className="mb-4">Laquelle pour quoi ?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              ia: "chatgpt" as IA,
              createur: "OpenAI",
              force:
                "Le couteau suisse. Idéal pour créer à partir de rien, trouver des idées et écrire du code.",
            },
            {
              ia: "claude" as IA,
              createur: "Anthropic",
              force:
                "Le rédacteur rigoureux. Écriture naturelle, raisonnement solide, et à l’aise avec les longs documents.",
            },
            {
              ia: "gemini" as IA,
              createur: "Google",
              force:
                "Le branché Google. Travaille directement avec Gmail, Drive, Maps et YouTube, et analyse texte, vidéo et son ensemble.",
            },
          ].map(({ ia, createur, force }) => (
            <div key={ia} className="practice-block">
              <div className="mb-2 flex items-center gap-2">
                <span className={`ia-dot dot-${ia}`} />
                <span className="font-bold">{iaLabels[ia]}</span>
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                {createur}
              </p>
              <p className="text-sm leading-6 text-[var(--muted)]">{force}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel mb-6">
        <h2 className="mb-3">Le prompt : tout part de là</h2>
        <p className="text-sm leading-7 text-[var(--muted)]">
          Le prompt, c’est la consigne que vous donnez à l’IA. Plus elle est
          précise (contexte, résultat attendu, ton), plus la réponse est
          utile. C’est pour ça que chaque tâche d’AI WORK KIT vous donne un
          prompt déjà écrit.
        </p>
      </section>

      <section className="exception mb-10">
        <h2 className="mb-3">3 règles avant de commencer</h2>
        <ul className="space-y-3 text-sm leading-7">
          <li>
            <strong>Vérifiez les chiffres, noms et dates.</strong> Une IA
            répond toujours, même quand elle ne sait pas. On appelle ça une
            « hallucination ».
          </li>
          <li>
            <strong>Ce n’est pas une personne.</strong> Elle ne ressent rien et
            n’a pas d’opinion : elle produit le texte le plus probable.
          </li>
          <li>
            <strong>Ne collez rien de confidentiel.</strong> Données clients,
            chiffres internes, mots de passe : seulement si vous connaissez les
            règles de confidentialité de l’outil.
          </li>
        </ul>
      </section>

      <p className="eyebrow">Partie 2 · Aller plus loin</p>
      <h2 className="mb-4">De la réponse à l’action : générer, automatiser, agents</h2>
      <p className="mb-6 max-w-2xl text-sm leading-7 text-[var(--muted)]">
        Quand l’IA ne se contente plus de répondre, mais agit dans vos outils.
        Chaque terme est défini dans le glossaire en bas de page.
      </p>

      <section className="panel mb-6">
        <h3 className="mb-3">Comment tout s’articule</h3>
        <p className="text-sm leading-7 text-[var(--muted)]">
          Tout part d’un <strong>prompt</strong>. Seul, il suffit à{" "}
          <strong>générer</strong> une réponse ou à vous{" "}
          <strong>assister</strong> sur une tâche : c’est le cas de la plupart
          des usages au travail. Pour que l’IA agisse sans vous
          (<strong>automatiser</strong>) ou enchaîne plusieurs étapes seule
          (<strong>agent IA</strong>), elle doit accéder à vos outils : un{" "}
          <strong>connecteur</strong> pour les cas simples (lire ou écrire
          dans Gmail, Drive...), un <strong>MCP</strong> pour agir dans un
          logiciel métier.
        </p>
      </section>

      <h3 className="mb-4">
        Pas à pas : la même chose sur les trois IA
      </h3>
      {CAS.map((cas) => (
        <CasGuide key={cas.titre} cas={cas} />
      ))}

      <GlossaireList
        title="Tous les mots de l’IA, expliqués simplement"
        eyebrow="Glossaire"
      />
      <GuideShelf guides={guides} />
    </>
  );
}
