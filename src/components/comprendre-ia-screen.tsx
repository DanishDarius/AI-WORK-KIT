"use client";
import { useId, useState } from "react";
import { chemins, IA, iaLabels } from "@/lib/kit-api";
import { Back, GlossaireList, Intro } from "./kit-ui";
import type { GuideSummary } from "@/lib/guides";
import { GuideShelf } from "./guide-shelf";

// Les 3 "cas" du guide pas-à-pas, avec les étapes propres à chaque IA — à
// parité stricte entre ChatGPT, Claude et Gemini (même nombre de cas, même
// niveau de détail), pour que l'utilisateur se fasse une idée juste de ce
// que chacune propose plutôt que de survoler une IA et détailler les autres.
const CAS: {
  titre: string;
  sousTitre: string;
  etapes: Record<IA, string[]>;
}[] = [
  {
    titre: "Cas 1 — Connecter un outil avancé ou personnalisé",
    sousTitre: "Public technique",
    etapes: {
      chatgpt: [
        "Va dans Réglages > Apps & Connecteurs (ou Sécurité et connexion).",
        "Active le Developer Mode dans les paramètres avancés.",
        "Clique sur Créer (ou Connecter d'autres outils) et renseigne nom, description, URL sécurisée (https://...) et authentification.",
        "Dans une conversation, clique sur +, choisis Developer Mode, puis coche ton connecteur.",
      ],
      claude: [
        "Ouvre Claude Desktop (recommandé pour les connecteurs en local).",
        "Profil > Réglages > onglet Developer > Edit Config (ou modifie directement claude_desktop_config.json).",
        'Ajoute la configuration, par exemple : { "mcpServers": { "mon-outil-perso": { "command": "npx", "args": ["-y", "@nom-du-serveur/mcp"] } } }',
        "Sauvegarde et redémarre Claude Desktop.",
      ],
      gemini: [
        "Ouvre (ou crée) le fichier ~/.gemini/settings.json.",
        'Ajoute la configuration, par exemple : { "mcpServers": { "mon-outil-perso": { "command": "npx", "args": ["-y", "@nom-du-serveur/mcp"] } } }',
        "Redémarre Gemini CLI : il détecte et lance automatiquement les serveurs définis.",
        'Vérifie la connexion avec la commande /mcp list (doit afficher "Connected").',
      ],
    },
  },
  {
    titre: "Cas 2 — Connecter une application déjà proposée",
    sousTitre: "Le plus courant",
    etapes: {
      chatgpt: [
        "Clique sur + dans la zone de saisie.",
        "Sélectionne Applications connectées ou explore le répertoire de plugins.",
        "Cherche l'application voulue (Google Drive, Slack…) et clique sur Connecter.",
        "Valide l'authentification dans la fenêtre qui s'ouvre.",
      ],
      claude: [
        "Va dans Réglages > Connecteurs (ou Personnalisation / Extensions).",
        "Parcours le catalogue d'applications certifiées (Google Drive, Slack, Notion, Figma…).",
        "Clique sur Connecter et autorise l'accès.",
        "En conversation, clique sur + pour insérer directement des fichiers depuis tes connecteurs.",
      ],
      gemini: [
        "Connecte-toi sur gemini.google.com, clique sur l'icône Paramètres, puis Applis connectées.",
        "Cherche l'application voulue (Gmail, Google Maps, Spotify…) et active-la avec le bouton de bascule.",
        "Dans une conversation, tape @ pour choisir quelle application utiliser, puis envoie ta demande.",
        "Si l'appli n'est pas encore liée, Gemini te demande l'autorisation au moment où tu la mentionnes.",
      ],
    },
  },
  {
    titre: "Cas 3 — Créer un agent personnalisé sans coder",
    sousTitre: "Utilisateurs avancés",
    etapes: {
      chatgpt: [
        "Va dans Explorer les GPT > Créer > onglet Configurer.",
        "Tout en bas, clique sur Créer une nouvelle action.",
        "Colle le schéma technique (OpenAPI, JSON ou YAML) de l'API à relier.",
        "Configure l'authentification (clé API ou OAuth) et ajoute une politique de confidentialité.",
        "Teste, puis clique sur Publier ou Mettre à jour.",
      ],
      claude: [
        "Dans la barre latérale, clique sur Projets > Créer un projet.",
        "Configure les consignes générales dans Instructions du projet.",
        "Dans Contenu du projet, ajoute un fichier de méthodologie (par exemple CLAUDE.md ou SKILL.md).",
        "Optionnel : associe le projet à des connecteurs MCP déjà configurés sur ton Claude Desktop.",
      ],
      gemini: [
        "Sur gemini.google.com, ouvre Explorer les Gems dans la barre latérale, puis clique sur Nouveau Gem.",
        "Donne-lui un nom et rédige ses instructions : rôle, tâche, contexte utile et format de réponse attendu.",
        "Dans Connaissances, clique sur Ajouter des fichiers pour lui donner des documents de référence.",
        "Teste-le dans le volet d'aperçu, puis clique sur Enregistrer (pas de sauvegarde automatique pendant l'aperçu).",
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
      <Back />
      <Intro eyebrow="Culture IA" title="Comprendre les IA">
        Un guide pour comprendre ChatGPT, Claude et Gemini — que tu démarres
        tout juste ou que tu veuilles aller plus loin dans leurs
        fonctionnalités avancées.
      </Intro>

      {/* Partie 1 — les bases, pour tous les niveaux */}
      <section className="panel mb-6">
        <p className="eyebrow">Partie 1 · Les bases</p>
        <h2 className="mb-3">C&apos;est quoi, au juste ?</h2>
        <p className="text-sm leading-7 text-[var(--muted)]">
          Imagine ChatGPT, Claude et Gemini comme des assistants
          ultra-cultivés. Ce ne sont pas des moteurs de recherche comme
          Google : ce sont des générateurs de réponses. Tu ne leur demandes
          pas de trouver un lien vers un site web ; tu discutes avec eux
          comme avec une personne. Tu leur donnes du texte, des images ou des
          documents, et ils créent du contenu sur mesure : un résumé, un
          e-mail, une explication, une idée, un tableau, un plan.
        </p>
      </section>

      <section className="panel mb-6">
        <h2 className="mb-3">Comment ça marche ?</h2>
        <p className="text-sm leading-7 text-[var(--muted)]">
          Ces outils reposent sur des grands modèles de langage (LLM). Leur
          &quot;cerveau&quot; contient des milliards de textes (livres,
          articles, sites web, code, conversations), de la logique de
          langage — ils ont appris comment les mots s&apos;assemblent pour
          former un raisonnement cohérent, pas recopié des phrases trouvées
          en ligne — et des filtres de sécurité pour rester polis et éviter
          les réponses dangereuses.
        </p>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          Leur fonctionnement repose sur la prédiction du mot suivant : tu
          poses une question ou une demande (un prompt), l&apos;IA calcule
          quel est le mot le plus logique à écrire ensuite, l&apos;écrit,
          puis recalcule le suivant, très rapidement. C&apos;est le même
          principe que le texte prédictif de ton téléphone, en largement
          plus puissant et capable de construire un vrai raisonnement.
        </p>
      </section>

      <section className="panel mb-6">
        <h2 className="mb-4">Qui fait quoi ?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              ia: "chatgpt" as IA,
              createur: "OpenAI",
              force:
                "Le couteau suisse : polyvalent, très bon pour créer du contenu à partir de rien, le brainstorming et le code.",
            },
            {
              ia: "claude" as IA,
              createur: "Anthropic",
              force:
                "L'intellectuel rigoureux : une écriture fluide et naturelle, de la logique, et une bonne capacité à analyser de longs documents sans se perdre.",
            },
            {
              ia: "gemini" as IA,
              createur: "Google",
              force:
                "L'assistant connecté : intégré à l'écosystème Google (Gmail, Drive, Maps, YouTube), performant pour analyser ensemble texte, vidéo et son.",
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
        <h2 className="mb-3">Une conversation, un prompt</h2>
        <p className="text-sm leading-7 text-[var(--muted)]">
          Un prompt, c&apos;est simplement la consigne que tu envoies à
          l&apos;IA — une question, une demande, une instruction. Plus il est
          précis (le contexte, le résultat attendu, le ton souhaité), plus la
          réponse sera utile. C&apos;est la base de tout ce que tu feras avec
          ces outils.
        </p>
      </section>

      <section className="exception mb-10">
        <h2 className="mb-3">Ce qu&apos;il faut savoir avant de commencer</h2>
        <ul className="space-y-3 text-sm leading-7">
          <li>
            <strong>Elles peuvent se tromper (les &quot;hallucinations&quot;)</strong> —
            une IA est conçue pour toujours répondre, même sans être sûre.
            Vérifie toujours les informations importantes (chiffres, noms,
            dates, citations) avant de les utiliser.
          </li>
          <li>
            <strong>Elles n&apos;ont pas de conscience</strong> — elles ne
            ressentent rien, n&apos;ont pas d&apos;opinion personnelle et ne
            &quot;pensent&quot; pas comme un humain.
          </li>
          <li>
            <strong>Fais attention à ce que tu leur donnes</strong> — évite de
            coller des informations confidentielles (données clients,
            chiffres financiers internes, mots de passe) sauf si tu es
            sûr(e) des conditions de confidentialité de l&apos;outil utilisé.
          </li>
        </ul>
      </section>

      {/* Partie 2 — aller plus loin */}
      <p className="eyebrow">Partie 2 · Aller plus loin</p>
      <h2 className="mb-4">
        Générer, automatiser, agents et connexions
      </h2>
      <p className="mb-6 max-w-2xl text-sm leading-7 text-[var(--muted)]">
        Comment les IA vont au-delà de la simple conversation. Retrouve ces
        termes et leurs définitions complètes dans le glossaire en bas de
        page.
      </p>

      <section className="panel mb-6">
        <h3 className="mb-3">Comment ça se relie entre eux</h3>
        <p className="text-sm leading-7 text-[var(--muted)]">
          Tout part toujours d&apos;un <strong>prompt</strong>. Sans aucune
          connexion, ce prompt te fait juste <strong>générer</strong> une
          réponse ou <strong>assister</strong> une tâche en cours —
          suffisant pour la majorité des usages professionnels courants. Dès
          que tu veux que l&apos;IA agisse dans le temps sans y repenser
          (<strong>automatiser</strong>) ou qu&apos;elle enchaîne plusieurs
          étapes seule (<strong>agent IA</strong>), il lui faut un accès à
          tes outils : un <strong>connecteur</strong> pour les cas simples
          (lire/écrire dans Gmail, Drive...), un <strong>MCP</strong> pour
          les cas plus poussés (agir directement dans un logiciel métier).
          Le prompt est toujours le point de départ, la manière de le
          formuler définit le niveau d&apos;autonomie délégué à l&apos;IA, et
          connecteur/MCP sont les deux niveaux de branchement technique qui
          rendent cette autonomie possible sur tes vrais outils.
        </p>
      </section>

      <h3 className="mb-4">
        Une même logique chez les trois IA, avec des interfaces différentes
      </h3>
      {CAS.map((cas) => (
        <CasGuide key={cas.titre} cas={cas} />
      ))}

      <GlossaireList
        title="Glossaire complet"
        eyebrow="Pour aller vite chercher un terme"
      />
      <GuideShelf guides={guides} />
    </>
  );
}
