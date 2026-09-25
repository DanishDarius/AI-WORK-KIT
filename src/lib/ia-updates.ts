import type { IA } from "./kit-api";

// Actualités des IA, rédigées à la main à partir des annonces officielles.
// Règles de rédaction : faits vérifiés et sourcés, "vous", pas de jargon,
// toujours dire ce que ça change et ce qu'il faut faire.
export type UpdateMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; captions?: string };

export type IaUpdate = {
  // Identifiant et adresse de la page : /mises-a-jour-ia/<slug>.
  slug: string;
  ia: IA;
  // Nature de l'annonce, affichée en étiquette (ex. "Nouveau modèle").
  kind: string;
  // Ce qui est sorti, en une phrase.
  title: string;
  publishedAt: string; // Date ISO, pour le tri du plus récent au plus ancien.
  // Le résumé en 2 ou 3 phrases.
  text: string;
  // Ce que ça change concrètement pour l'utilisateur, en une phrase.
  impact: string;
  // Ce qu'il doit faire (ou "Rien" si ses prompts fonctionnent déjà).
  action: string;
  // Détails affichés dans la page de l'article.
  points: string[];
  disponibilite: string;
  sources: { label: string; url: string }[];
  media?: UpdateMedia;
  featured?: boolean;
};

// Copies locales (kit-api est un module "use client", inutilisable ici côté serveur).
export const updateIas: IA[] = ["chatgpt", "claude", "gemini"];
export const iaNoms: Record<IA, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Gemini",
};

// Éditeur de chaque IA, affiché à côté de la date.
export const iaMakers: Record<IA, string> = {
  chatgpt: "OpenAI",
  claude: "Anthropic",
  gemini: "Google DeepMind",
};

// Les plus récentes marquées `featured: true` apparaissent en tête de page
// (1 principale + 2 secondaires).
export const iaUpdates: IaUpdate[] = [
  {
    slug: "claude-opus-5-5",
    ia: "claude",
    kind: "Nouveau modèle",
    title: "Claude Opus 5.5 est disponible.",
    publishedAt: "2026-09-22",
    featured: true,
    text: "Anthropic lance Opus 5.5, son modèle le plus puissant. Il atteint presque le niveau de Claude Fable 5.1 tout en coûtant 40 % de moins à faire tourner qu’Opus 5. Ses réponses vont plus vite à l’essentiel, avec moins de jargon.",
    impact:
      "Des réponses plus directes : l’information importante arrive en premier, même sur une analyse longue.",
    action:
      "Rien à changer. Choisissez Opus 5.5 dans le sélecteur de modèle, vos prompts AI WORK KIT fonctionnent tels quels.",
    points: [
      "Anthropic le présente comme le modèle le plus performant qu’il ait testé, en tête sur le travail d’analyse, l’utilisation de l’ordinateur et les tâches en plusieurs étapes.",
      "Ses réponses placent l’essentiel au début et utilisent moins de termes techniques.",
      "Il résiste mieux aux instructions cachées dans des pages web ou des documents (injections de prompt).",
      "Claude Sonnet 5.5 et Claude Haiku 5.5 arrivent dans les prochaines semaines.",
    ],
    disponibilite:
      "Tous les abonnements Claude, depuis le 22 septembre 2026. Aussi via l’API et chez AWS, Google Cloud et Microsoft Azure.",
    sources: [
      { label: "Anthropic : Introducing Claude Opus 5.5", url: "https://www.anthropic.com/claude-opus-5-5" },
      { label: "Notes de version de l’app Claude", url: "https://support.claude.com/en/articles/12138966-release-notes" },
      { label: "TechCrunch", url: "https://techcrunch.com/2026/09/22/anthropic-releases-opus-5-5-with-lower-prices-and-fable-level-performance/" },
    ],
  },
  {
    slug: "gpt-6-astra",
    ia: "chatgpt",
    kind: "Nouveau modèle",
    title: "GPT-6 Astra arrive dans ChatGPT.",
    publishedAt: "2026-09-04",
    featured: true,
    text: "OpenAI présente GPT-6 Astra comme son modèle le plus avancé. Selon OpenAI, il comprend mieux ce que vous voulez, suit mieux les consignes et mène plus souvent à bien les tâches en plusieurs étapes. Il est aussi plus à l’aise pour produire présentations, documents et tableaux.",
    impact:
      "Les demandes complexes (un dossier à partir de notes, une présentation, une analyse de plusieurs fichiers) aboutissent plus souvent du premier coup.",
    action:
      "Avec un abonnement payant, choisissez GPT-6 Astra pour vos tâches longues. Pour une question simple, le modèle habituel suffit et consomme moins de votre quota.",
    points: [
      "Selon 9to5Mac, ChatGPT contrôle l’ordinateur presque deux fois plus vite qu’avant.",
      "OpenAI met en avant des progrès en recherche, en programmation et en travail professionnel : diapositives, feuilles de calcul, documents qui respectent les modèles de l’entreprise.",
      "Son utilisation est comptée dans les limites de votre abonnement, avec la possibilité d’acheter des crédits en plus.",
      "Certaines demandes sensibles (cybersécurité avancée) restent réservées à des testeurs agréés.",
    ],
    disponibilite:
      "ChatGPT Plus, Pro, Business et Enterprise, déployé progressivement depuis le 4 septembre 2026. Pas disponible sur les offres Free et Go.",
    sources: [
      { label: "OpenAI : GPT-6 Astra", url: "https://openai.com/index/gpt-6-astra/" },
      { label: "Notes de version ChatGPT", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
      { label: "9to5Mac", url: "https://9to5mac.com/2026/09/04/openai-releasing-major-upgrade-to-chatgpt-and-codex-with-gpt-6-astra-details-here/" },
    ],
  },
  {
    slug: "gemini-3-8-flash",
    ia: "gemini",
    kind: "Nouveau modèle",
    title: "Gemini 3.8 Flash va plus loin sur les tâches complexes.",
    publishedAt: "2026-09-02",
    featured: true,
    text: "Trois semaines après la version 3.7, Google sort Gemini 3.8 Flash. Le modèle « travaille plus » sur les demandes difficiles : il enchaîne davantage d’étapes de raisonnement et d’outils avant de répondre. Il arrive aussi dans Google Sheets.",
    impact:
      "Les analyses chiffrées et les demandes en plusieurs étapes sont plus fiables, directement dans Gemini et dans Google Sheets.",
    action:
      "Rien à changer si vous êtes abonné Google AI Pro ou Ultra. Essayez-le dans Sheets sur un tableau que vous analysez chaque semaine.",
    points: [
      "Google annonce des gains nets en raisonnement en plusieurs étapes et en analyse professionnelle.",
      "Le modèle prend plus de temps sur les tâches difficiles pour vérifier son travail.",
      "C’est le troisième modèle Flash en six semaines : Google publie désormais ses améliorations par petites étapes rapprochées.",
    ],
    disponibilite:
      "Abonnés Google AI Pro et Ultra, dans l’app Gemini, le mode IA de la recherche et Google Sheets, depuis le 2 septembre 2026.",
    sources: [
      { label: "9to5Google", url: "https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/" },
      { label: "Notes de version de l’API Gemini", url: "https://ai.google.dev/gemini-api/docs/changelog" },
    ],
  },
  {
    slug: "chatgpt-dans-word",
    ia: "chatgpt",
    kind: "Nouvelle fonction",
    title: "ChatGPT s’installe dans Microsoft Word.",
    publishedAt: "2026-09-17",
    text: "OpenAI lance ChatGPT pour Word. Vous rédigez et corrigez vos documents avec ChatGPT sans quitter Word, et sans copier-coller entre deux fenêtres.",
    impact:
      "Les tâches de rédaction et de correction (lettres, comptes-rendus, propositions) se font directement dans votre document.",
    action:
      "Activez ChatGPT dans Word en suivant la page d’aide d’OpenAI. Nos prompts de rédaction se collent tels quels dans le panneau ChatGPT.",
    points: [
      "Disponible sur toutes les offres, y compris la version gratuite.",
      "Pratique pour les tâches « Rédaction et correction de documents professionnels » du kit.",
    ],
    disponibilite: "Toutes les offres ChatGPT, depuis le 17 septembre 2026.",
    sources: [
      { label: "Notes de version ChatGPT", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
    ],
  },
  {
    slug: "fin-des-gpt-personnalises",
    ia: "chatgpt",
    kind: "À savoir",
    title: "Les GPT personnalisés vont être remplacés par des plugins.",
    publishedAt: "2026-09-11",
    text: "OpenAI a annoncé le retrait progressif des GPT personnalisés (Custom GPTs). Une migration vers les plugins est prévue, avec un calendrier qui varie selon les comptes.",
    impact:
      "Un assistant que vous avez construit sous forme de GPT devra passer en plugin. Ne créez plus de nouveau GPT.",
    action:
      "Listez les GPT que vous utilisez vraiment et suivez la migration proposée par OpenAI. Pour un nouvel assistant, utilisez un Projet ChatGPT avec vos documents.",
    points: [
      "Concerne toutes les offres ChatGPT.",
      "Nos guides de mise en place recommandent déjà les Projets ChatGPT plutôt que les GPT.",
    ],
    disponibilite: "Toutes les offres ChatGPT. Annonce du 11 septembre 2026.",
    sources: [
      { label: "Notes de version ChatGPT", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
    ],
  },
  {
    slug: "taches-planifiees-declencheurs",
    ia: "chatgpt",
    kind: "Nouvelle fonction",
    title: "Les tâches planifiées de ChatGPT réagissent à vos applications.",
    publishedAt: "2026-08-25",
    text: "Une tâche planifiée ne tourne plus seulement à heure fixe : elle peut aussi se lancer quand une application connectée change. Vous pouvez également partager une tâche avec un collègue.",
    impact:
      "Une automatisation peut partir au bon moment, par exemple à l’arrivée d’une information, au lieu d’attendre le lendemain matin.",
    action:
      "Reprenez une tâche de l’onglet « Mettre en place » du kit et testez un déclenchement par événement plutôt qu’à heure fixe.",
    points: [
      "Fonction réservée aux offres Plus, Pro, Business et Enterprise.",
      "Les tâches partagées évitent que chaque membre de l’équipe refasse la même configuration.",
    ],
    disponibilite: "ChatGPT Plus, Pro, Business et Enterprise, depuis le 25 août 2026.",
    sources: [
      { label: "Notes de version ChatGPT", url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes" },
    ],
  },
  {
    slug: "claude-slides-docs-designs",
    ia: "claude",
    kind: "Nouvelle fonction",
    title: "Claude crée présentations, documents et designs dans n’importe quelle conversation.",
    publishedAt: "2026-09-16",
    text: "Claude peut désormais produire une présentation, un document ou un visuel directement dans la conversation. Le même jour, Cowork, son mode qui agit sur vos fichiers et vos outils, arrive dans chaque conversation pour les abonnés Pro et Max.",
    impact:
      "Une présentation ou un compte-rendu sort prêt à relire, sans passer par un autre logiciel.",
    action:
      "Pour les tâches « Créer une présentation » du kit, demandez directement le résultat sous forme de présentation dans Claude.",
    points: [
      "Présentations, documents et designs : toutes les offres (en bêta pour Enterprise).",
      "Cowork dans chaque conversation : offres Pro et Max, déploiement progressif sur le web, l’ordinateur et le mobile.",
    ],
    disponibilite: "Toutes les offres Claude pour les présentations et documents, Pro et Max pour Cowork. Depuis le 16 septembre 2026.",
    sources: [
      { label: "Notes de version de l’app Claude", url: "https://support.claude.com/en/articles/12138966-release-notes" },
    ],
  },
  {
    slug: "memoire-claude-cowork",
    ia: "claude",
    kind: "Nouvelle fonction",
    title: "La mémoire de Claude fonctionne aussi dans Cowork.",
    publishedAt: "2026-08-25",
    text: "Claude se souvient du contexte de votre travail d’une conversation à l’autre, y compris dans Cowork. Vous pouvez voir et modifier les sujets qu’il retient, et régler ce qu’il ne doit pas mémoriser.",
    impact:
      "Moins de contexte à réexpliquer : votre métier, vos outils et vos habitudes sont déjà connus.",
    action:
      "Ouvrez les réglages de mémoire de Claude pour vérifier ce qui est retenu et retirer ce qui ne doit pas l’être.",
    points: [
      "Activée par défaut sur Free, Pro et Max ; désactivée par défaut sur Team et Enterprise.",
      "Un réglage dédié permet d’écarter les sujets sensibles.",
    ],
    disponibilite: "Toutes les offres Claude, depuis le 25 août 2026.",
    sources: [
      { label: "Notes de version de l’app Claude", url: "https://support.claude.com/en/articles/12138966-release-notes" },
    ],
  },
  {
    slug: "gemini-3-7-flash",
    ia: "gemini",
    kind: "Nouveau modèle",
    title: "Gemini 3.7 Flash relie vos fichiers et vos e-mails.",
    publishedAt: "2026-08-13",
    text: "Google a mis à jour Gemini avec la version 3.7 Flash. Selon Google, elle raisonne mieux sur les tâches en plusieurs étapes, par exemple rassembler des informations dispersées dans des dizaines de fichiers et d’e-mails pour en faire un seul document.",
    impact:
      "Une synthèse à partir de nombreuses sources (dossier client, projet, veille) demande moins de reprises.",
    action:
      "Rien à changer si vous êtes abonné Pro ou Ultra. Depuis, la version 3.8 Flash l’a remplacée.",
    points: [
      "Google cite des usages comme regrouper des fichiers, rédiger des e-mails ou transformer un rapport PDF en présentation interactive.",
      "Déployé dans plus de 160 pays.",
    ],
    disponibilite: "Abonnés Google AI Pro et Ultra, depuis le 13 août 2026.",
    sources: [
      { label: "Google : Gemini 3.7 Flash", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/" },
      { label: "9to5Google", url: "https://9to5google.com/2026/08/13/gemini-3-7-flash-launch/" },
    ],
  },
];

export function newestFirst(items: IaUpdate[]) {
  return [...items].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

export function getUpdate(slug: string) {
  return iaUpdates.find((item) => item.slug === slug);
}
