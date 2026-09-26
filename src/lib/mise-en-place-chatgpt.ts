// Contenu du guide "Mettre en place" pour ChatGPT : outils reels, prompts prets a
// copier et configuration des taches planifiees (Tasks), tache par tache.
// Source : recherches menees sur les sources officielles OpenAI (help.openai.com,
// openai.com) en septembre 2026. Etat verifie a cette date, susceptible d'evoluer
// vite (OpenAI change regulierement ses fonctionnalites) :
// - ChatGPT n'a pas de reglage d'approbation automatique/manuelle dedie comme Cowork
//   (Claude) : les taches planifiees (Tasks) peuvent se mettre en pause d'elles-memes
//   pour valider une action sensible, sans reglage utilisateur equivalent. On s'appuie
//   donc, comme pour Gemini, sur des instructions explicites dans le prompt plutot que
//   sur modeApprobation.
// - Tasks (taches planifiees) : jusqu'a 3 actives sur Free/Go, 5 sur Plus, 10 sur
//   Business/Edu, 15 sur Pro/Enterprise ; frequence max une fois par jour sur Free/Go,
//   jusqu'a une fois par heure sur les plans payants, jusqu'a 30 fois/heure pour les
//   taches declenchees par evenement.
// - "ChatGPT Work" est le mode agent actuel (taches complexes multi-etapes, navigateur
//   cloud, creation de fichiers Office) : il remplace l'ancien "ChatGPT agent" /
//   Operator, retire. Disponible sur Plus, Pro, Business, Enterprise (pas Free/Go).
// - Les GPT personnalises (Custom GPTs) sont en cours de retrait progressif au profit
//   d'un systeme d'apps/connecteurs : on evite donc d'en recommander la creation pour
//   de nouveaux usages dans ce guide.
// - Le mode developpeur (ajout de connecteurs MCP personnalises : Buffer, Xero,
//   Google Ads, etc.) est surtout reserve aux espaces Business/Enterprise/Edu ; les
//   comptes Pro individuels n'y ont qu'un acces limite en lecture seule. C'est une
//   difference importante avec Claude, ou les connecteurs MCP personnalises sont plus
//   largement accessibles aux comptes individuels.
// - Sora (l'outil de generation video d'OpenAI) a ete arrete : experiences web/app le
//   26 avril 2026, API le 24 septembre 2026. A la date de redaction de ce guide,
//   OpenAI ne propose donc plus d'outil officiel de generation video dans ChatGPT
//   (voir la tache F42 ci-dessous pour le detail et une alternative).
import { MiseEnPlace } from "./mise-en-place-types";

export const miseEnPlaceChatgpt: Partial<Record<string, MiseEnPlace>> = {
  F01: {
    outils: [
      {
        nom: "Connecteur Gmail ou Outlook (compte personnel)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Tasks (tâches planifiées ChatGPT)",
        lien: "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Tri de la boîte mail",
      frequence: "Quotidien (matin)",
      prompt: `<system_prompt>
Tu es mon assistant de gestion de boîte mail.
</system_prompt>

<context>
Je reçois de nombreux e-mails chaque jour sur ma boîte connectée via le connecteur Gmail ou Outlook. Je veux garder le contrôle sans tout lire moi-même.
</context>

<instructions>
1. Parcours les e-mails non lus reçus depuis ma dernière vérification.
2. Classe-les en trois catégories : Urgent (réponse attendue sous 24h), À traiter (pas urgent mais actionnable), Information (rien à faire).
3. Pour chaque e-mail "Urgent", rédige un brouillon de réponse court et professionnel, sans jamais l'envoyer toi-même.
4. Signale les e-mails qui ressemblent à du spam ou du phishing sans les supprimer.
</instructions>

<output_format>
Une liste groupée par catégorie, avec pour chaque e-mail : expéditeur, objet en une ligne, et pour les "Urgent" le brouillon de réponse proposé.
</output_format>`,
    },
    uneSeuleFois:
      "ChatGPT n'a pas de réglage d'approbation automatique/manuelle comme Cowork : le prompt interdit explicitement l'envoi automatique, ce qui joue le même rôle. Si la tâche modifie des données sensibles, ChatGPT peut aussi la mettre en pause de lui-même pour demander une validation.",
  },
  F02: {
    outils: [
      {
        nom: "App Canva dans ChatGPT",
        lien: "https://openai.com/index/introducing-apps-in-chatgpt/",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Buffer (publication programmée, mode développeur)",
        lien: "https://buffer.com/mcp",
        type: "tiers",
      },
      {
        nom: "Connecteur MCP Hootsuite (publication programmée, mode développeur)",
        lien: "https://www.hootsuite.com/integrations/mcp",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es rédacteur de contenu réseaux sociaux spécialisé dans [secteur].
</system_prompt>

<context>
Public cible : [à préciser]. Ton de marque : [à préciser]. Réseaux visés : [LinkedIn / Instagram / etc.].
</context>

<instructions>
1. Propose 5 idées de publications pour la semaine à venir, adaptées à chaque réseau visé.
2. Rédige le texte complet de chaque publication, avec hashtags si pertinent.
3. Précise pour chaque publication le meilleur jour et créneau horaire de diffusion.
</instructions>

<output_format>
Un tableau : Jour | Réseau | Texte de la publication | Hashtags | Créneau conseillé.
</output_format>`,
    uneSeuleFois:
      "Le mode développeur (ajout de connecteurs MCP comme Buffer ou Hootsuite) est surtout accessible aux espaces ChatGPT Business/Enterprise/Edu, avec un accès lecture seule limité sur Pro. Sans ce mode, copiez simplement les publications validées dans Buffer ou Hootsuite manuellement, ou demandez à l'app Canva de préparer les visuels associés.",
  },
  F03: {
    outils: [
      {
        nom: "ChatGPT for Word (complément Office, gratuit sur tous les plans)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant rédactionnel professionnel, rigoureux sur l'orthographe, la grammaire et le ton.
</system_prompt>

<context>
Voici le document à corriger ou à rédiger : [coller le texte ou joindre le fichier]. Contexte : [type de document, destinataire, objectif].
</context>

<instructions>
1. Corrige l'orthographe, la grammaire et la ponctuation.
2. Améliore la clarté et la fluidité sans changer le sens.
3. Adapte le ton au destinataire indiqué.
4. Liste en fin de réponse les changements de fond que tu as faits (pas les fautes corrigées).
</instructions>

<output_format>
Le document corrigé en entier, suivi d'une liste à puces des changements de fond.
</output_format>`,
  },
  F04: {
    outils: [
      {
        nom: "ChatGPT for Word (rédaction du compte-rendu)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
      {
        nom: "Connecteur Google Drive, SharePoint ou Notion (dossier des transcriptions)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Compte-rendu de réunion récurrente",
      frequence: "Quotidien (fin de journée)",
      prompt: `<system_prompt>
Tu es assistant de réunion, tu rédiges des comptes-rendus clairs et actionnables.
</system_prompt>

<context>
Vérifie le dossier connecté des transcriptions de réunion pour toute nouvelle transcription déposée aujourd'hui. Participants et objectif de chaque réunion : à déduire de la transcription.
</context>

<instructions>
1. Pour chaque nouvelle transcription trouvée, produis un compte-rendu structuré : objet, participants, décisions prises, actions à faire (avec responsable si mentionné), points en suspens.
2. Signale les points où l'information est ambiguë ou manquante plutôt que de deviner.
3. Dépose le compte-rendu dans le même dossier, à côté de la transcription source.
</instructions>

<output_format>
Un compte-rendu par réunion traitée, avec les sections Décisions / Actions / Points en suspens.
</output_format>`,
    },
    uneSeuleFois:
      "Si aucun connecteur de stockage n'est disponible sur votre plan, collez simplement la transcription dans le chat au fil de l'eau : cette tâche devient alors un prompt ponctuel plutôt qu'une tâche planifiée.",
  },
  F05: {
    outils: [
      {
        nom: "Connecteur Google Calendar ou Outlook Calendar",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Tasks (tâches planifiées ChatGPT)",
        lien: "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Préparation de l'agenda",
      frequence: "Quotidien (matin)",
      prompt: `<system_prompt>
Tu es mon assistant d'organisation quotidienne.
</system_prompt>

<context>
Mon calendrier est connecté via le connecteur Google Calendar ou Outlook Calendar. Je veux anticiper ma journée et éviter les conflits.
</context>

<instructions>
1. Liste les rendez-vous du jour dans l'ordre chronologique, avec heure, durée et participants.
2. Signale tout conflit d'horaire ou enchaînement trop serré (moins de 10 minutes entre deux rendez-vous).
3. Pour chaque rendez-vous important, rappelle le contexte utile s'il est disponible (objet, derniers échanges liés).
</instructions>

<output_format>
Un planning de la journée, suivi d'une section "Points de vigilance" pour les conflits ou enchaînements serrés.
</output_format>`,
    },
  },
  F06: {
    outils: [
      {
        nom: "Connecteur Notion, SharePoint ou Google Drive (base de connaissances)",
        lien: "https://help.openai.com/en/articles/12084614-connector-use-cases-and-prompts",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant support client, tu réponds uniquement à partir de la base de connaissances fournie.
</system_prompt>

<context>
Voici notre base de connaissances / FAQ : [connecter la source via le connecteur ou la coller]. Voici la question du client : [coller le message].
</context>

<instructions>
1. Cherche la réponse dans la base de connaissances connectée.
2. Si l'information existe, rédige une réponse claire et empathique au client.
3. Si l'information n'existe pas, dis-le explicitement plutôt que d'inventer une réponse, et propose d'escalader vers un humain.
</instructions>

<output_format>
La réponse proposée au client, précédée d'une ligne "Source trouvée : oui/non".
</output_format>`,
    uneSeuleFois:
      "Les GPT personnalisés (Custom GPTs) sont en cours de retrait progressif chez OpenAI : pour un bot de support réutilisable, préférez un Projet ChatGPT avec vos documents de FAQ attachés et ces instructions en instructions de projet, plutôt que de créer un GPT dédié.",
  },
  F07: {
    outils: [
      {
        nom: "Recherche web native de ChatGPT (aucune activation nécessaire)",
        lien: "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Deep Research (rapport approfondi avec sources)",
        lien: "https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "ChatGPT Work + navigateur cloud (sites sans flux exploitable)",
        lien: "https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Veille sectorielle hebdomadaire",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es analyste de veille sectorielle.
</system_prompt>

<context>
Secteur à surveiller : [à préciser]. Sources prioritaires : [sites, concurrents, mots-clés].
</context>

<instructions>
1. Recherche les actualités, annonces et mouvements concurrentiels marquants de la semaine écoulée sur le secteur indiqué.
2. Pour chaque élément retenu, résume l'information en 2-3 lignes et indique pourquoi elle est pertinente pour nous.
3. Cite systématiquement la source (nom et lien) de chaque information.
</instructions>

<output_format>
Une liste groupée par thème (concurrents / marché / réglementation), chaque entrée avec résumé et source citée.
</output_format>`,
    },
    uneSeuleFois:
      "Pour un rapport plus approfondi et sourcé ponctuellement (au-delà de la veille hebdomadaire courante), lancez Deep Research avec /deepresearch depuis le chat.",
  },
  F08: {
    outils: [
      {
        nom: "Analyse de données / Advanced Data Analysis (officiel)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "ChatGPT for Excel (complément Office)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste de données, rigoureux et pédagogue.
</system_prompt>

<context>
Voici les données à analyser : [joindre le fichier Excel/CSV]. Objectif du rapport : [à préciser].
</context>

<instructions>
1. Explore les données et identifie les tendances, anomalies et chiffres clés pertinents pour l'objectif indiqué.
2. Produis les tableaux et graphiques nécessaires pour illustrer ces points.
3. Rédige une synthèse en langage clair, sans jargon statistique non expliqué.
</instructions>

<output_format>
Une synthèse en 5 points clés maximum, suivie des tableaux/graphiques détaillés.
</output_format>`,
  },
  F09: {
    outils: [
      {
        nom: "App Canva dans ChatGPT",
        lien: "https://openai.com/index/introducing-apps-in-chatgpt/",
        type: "officiel",
      },
      {
        nom: "Génération et édition d'images ChatGPT",
        lien: "https://help.openai.com/en/articles/11084440-images-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es designer visuel spécialisé dans les supports marketing.
</system_prompt>

<context>
Objectif du visuel : [à préciser]. Format cible : [post Instagram, bannière, etc.]. Charte graphique : [couleurs, police, logo].
</context>

<instructions>
1. Propose 3 pistes de composition différentes pour le visuel demandé.
2. Pour la piste retenue, génère le visuel en respectant la charte graphique donnée.
3. Précise les ajustements possibles si le rendu ne convient pas (couleur, texte, disposition).
</instructions>

<output_format>
Les 3 pistes décrites brièvement, puis le visuel généré pour la piste retenue.
</output_format>`,
  },
  F10: {
    outils: [
      {
        nom: "Connecteur/app HubSpot",
        lien: "https://help.openai.com/en/articles/12084614-connector-use-cases-and-prompts",
        type: "officiel",
      },
      {
        nom: "Agentforce / serveur MCP Salesforce (officiel Salesforce, mode développeur)",
        lien: "https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/chatgpt.html",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Nettoyage de la base CRM",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant CRM, tu identifies et corriges les incohérences de données.
</system_prompt>

<context>
Base CRM connectée : [HubSpot / Salesforce]. Critères de qualité attendus : [champs obligatoires, format des numéros, doublons à éviter].
</context>

<instructions>
1. Parcours les fiches contacts/entreprises modifiées ou créées depuis la dernière vérification.
2. Signale les doublons probables, les champs obligatoires manquants et les formats incohérents (téléphone, email).
3. Propose les corrections mais ne modifie rien directement dans le CRM sans validation.
</instructions>

<output_format>
Un tableau : Fiche concernée | Problème détecté | Correction proposée.
</output_format>`,
    },
  },
  F11: {
    outils: [
      {
        nom: "Lecture native de PDF et formulaires (aucune activation nécessaire)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "ChatGPT for Excel (export des données extraites)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant d'extraction de données, précis et exhaustif.
</system_prompt>

<context>
Voici le(s) document(s) source(s) : [joindre]. Voici les champs à extraire : [liste des champs].
</context>

<instructions>
1. Extrait chaque champ demandé pour chaque document fourni.
2. Si un champ est illisible ou absent, indique-le explicitement plutôt que d'inventer une valeur.
3. Structure le résultat pour qu'il soit directement copiable dans un tableur.
</instructions>

<output_format>
Un tableau avec une ligne par document et une colonne par champ demandé.
</output_format>`,
  },
  F12: {
    outils: [
      {
        nom: "Connecteur Google Drive, SharePoint ou OneDrive",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur Box (si stockage Box)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Classement des nouveaux documents",
      frequence: "Quotidien",
      prompt: `<system_prompt>
Tu es assistant d'organisation documentaire.
</system_prompt>

<context>
Dossier à organiser : [chemin/nom du dossier connecté]. Règle de classement souhaitée : [par date, par client, par type de document].
</context>

<instructions>
1. Repère les documents ajoutés ou non classés depuis la dernière vérification.
2. Propose pour chacun un nom de fichier et un sous-dossier de destination conformes à la règle de classement.
3. N'effectue le déplacement/renommage que si l'action est possible via le connecteur ; sinon, liste les actions à faire manuellement.
</instructions>

<output_format>
Un tableau : Document | Nom proposé | Dossier de destination proposé.
</output_format>`,
    },
  },
  F13: {
    outils: [
      {
        nom: "Lecture native de PDF (aucune activation nécessaire)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur Google Drive (récupération des pièces si besoin)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant d'analyse documentaire, méthodique et exhaustif.
</system_prompt>

<context>
Voici les documents du dossier à analyser ou comparer : [joindre/connecter]. Points de comparaison attendus : [à préciser].
</context>

<instructions>
1. Identifie dans chaque document les informations correspondant aux points de comparaison demandés.
2. Signale les incohérences ou écarts entre les documents.
3. Indique les pièces manquantes par rapport à ce qui serait attendu dans un dossier complet.
</instructions>

<output_format>
Un tableau comparatif par point de comparaison, suivi d'une liste des pièces manquantes ou incohérentes.
</output_format>`,
  },
  F14: {
    outils: [
      {
        nom: "ChatGPT for Word (traduction dans le document)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es traducteur professionnel, attentif au registre de langue et au contexte métier.
</system_prompt>

<context>
Document à traduire : [joindre/coller]. Langue source : [à préciser]. Langue cible : [à préciser]. Registre attendu : [formel/informel].
</context>

<instructions>
1. Traduis le document intégralement en respectant le sens, le ton et le registre demandé.
2. Adapte les expressions idiomatiques plutôt que de les traduire mot à mot.
3. Signale les termes techniques ou noms propres pour lesquels plusieurs traductions étaient possibles, avec ton choix justifié.
</instructions>

<output_format>
Le document traduit en entier, suivi d'une liste des choix de traduction à valider.
</output_format>`,
  },
  F15: {
    outils: [
      {
        nom: "ChatGPT Work (création de présentations PowerPoint)",
        lien: "https://help.openai.com/en/articles/20001278-creating-and-editing-documents-spreadsheets-and-presentations-with-chatgpt-work",
        type: "officiel",
      },
      {
        nom: "App Canva (habillage visuel)",
        lien: "https://openai.com/index/introducing-apps-in-chatgpt/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es concepteur de présentations professionnelles, clair et synthétique.
</system_prompt>

<context>
Voici le brief : [coller le brief]. Public : [à préciser]. Durée de présentation visée : [à préciser]. Charte graphique : [à préciser].
</context>

<instructions>
1. Propose un plan de présentation (liste des diapositives avec leur titre et leur objectif).
2. Une fois le plan validé, rédige le contenu détaillé de chaque diapositive (titre, points clés, note orateur).
3. Crée le fichier de présentation correspondant, en respectant la charte graphique indiquée.
</instructions>

<output_format>
D'abord le plan sous forme de liste, puis le fichier de présentation généré une fois le plan validé.
</output_format>`,
    uneSeuleFois:
      "La création directe de fichiers .pptx via ChatGPT Work dépend du plan, de l'espace de travail et de la surface utilisée (elle n'était pas incluse au lancement initial du flux Work) : vérifiez la disponibilité au moment de l'usage, sinon demandez le contenu texte prêt à coller dans PowerPoint ou Google Slides.",
  },
  F16: {
    outils: [
      {
        nom: "Connecteur GitHub, GitLab ou Notion (selon l'outil utilisé)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Asana, Jira, Linear, Monday ou ClickUp (mode développeur, non officiellement listé par OpenAI)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Point de suivi de projet",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant de gestion de projet.
</system_prompt>

<context>
Outil de gestion de projet connecté : [GitHub / Notion / Jira / autre]. Projet à suivre : [nom du projet].
</context>

<instructions>
1. Liste les tâches en retard, les tâches terminées cette semaine, et celles à venir dans les 7 prochains jours.
2. Signale les tâches sans responsable assigné ou sans date d'échéance.
3. Résume l'avancement global du projet en une phrase.
</instructions>

<output_format>
Trois listes (Retard / Terminées / À venir), suivies du résumé d'avancement en une phrase.
</output_format>`,
    },
    uneSeuleFois:
      "Asana, Jira, Linear, Monday et ClickUp n'ont pas de connecteur officiel listé par OpenAI à ce jour : leur ajout passe par le mode développeur (serveur MCP du fournisseur), surtout accessible aux espaces Business/Enterprise/Edu. Sur un compte individuel, exportez plutôt un état du projet (CSV/listé) et collez-le dans le chat.",
  },
  F17: {
    outils: [
      {
        nom: "Connecteur/app HubSpot",
        lien: "https://help.openai.com/en/articles/12084614-connector-use-cases-and-prompts",
        type: "officiel",
      },
      {
        nom: "Agentforce / serveur MCP Salesforce (officiel Salesforce, mode développeur)",
        lien: "https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/chatgpt.html",
        type: "officiel",
      },
      {
        nom: "Connecteur Gmail ou Outlook (envoi des relances en brouillon)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Relances commerciales",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant commercial, tu prépares des relances personnalisées sans jamais les envoyer toi-même.
</system_prompt>

<context>
Cible : [type de prospect]. CRM connecté : [HubSpot/autre]. Offre à présenter : [à préciser].
</context>

<instructions>
1. Identifie dans le CRM les prospects sans contact depuis plus de [X] jours et encore actifs dans le pipeline.
2. Pour chacun, rédige un brouillon de relance personnalisé (en te basant sur le dernier échange connu).
3. Ne programme et n'envoie jamais l'e-mail toi-même : laisse le brouillon prêt à être validé.
</instructions>

<output_format>
Un tableau : Prospect | Dernier contact | Brouillon de relance proposé.
</output_format>`,
    },
    uneSeuleFois:
      "ChatGPT n'a pas de réglage d'approbation automatique/manuelle comme Cowork : le prompt interdit explicitement l'envoi automatique, ce qui joue le même rôle.",
  },
  F18: {
    outils: [
      {
        nom: "ChatGPT for Word / Excel (devis et facturation)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
      {
        nom: "Connecteur/app HubSpot (données client, si CRM connecté)",
        lien: "https://help.openai.com/en/articles/12084614-connector-use-cases-and-prompts",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de facturation, précis sur les montants et les mentions légales.
</system_prompt>

<context>
Client : [nom/infos]. Prestations/produits demandés : [liste avec quantités]. Grille tarifaire : [joindre ou préciser].
</context>

<instructions>
1. Calcule le montant de chaque ligne à partir de la grille tarifaire fournie, puis le total (avec taxes si applicable).
2. Rédige le devis ou la facture au format habituel de l'entreprise, avec toutes les mentions obligatoires.
3. Vérifie et signale toute incohérence entre la demande et la grille tarifaire (produit absent, quantité improbable).
</instructions>

<output_format>
Le document (devis ou facture) complet, prêt à être exporté en Word ou Excel.
</output_format>`,
  },
  F19: {
    outils: [
      {
        nom: "Connecter QuickBooks Online à ChatGPT (guide officiel Intuit)",
        lien: "https://quickbooks.intuit.com/learn-support/en-us/help-article/mobile-and-apps/connect-quickbooks-online-chatgpt/L0RDe9RPd_US_en_US",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Xero (tiers, mode développeur, à vérifier avant mise en prod)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Catégorisation des transactions",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant comptable, tu catégorises les transactions selon le plan comptable fourni.
</system_prompt>

<context>
Logiciel comptable connecté : [QuickBooks/Xero]. Plan comptable en vigueur : [joindre ou préciser].
</context>

<instructions>
1. Parcours les transactions non catégorisées depuis la dernière vérification.
2. Propose une catégorie du plan comptable pour chacune, avec le niveau de confiance (haute/moyenne/faible).
3. Pour les transactions à faible confiance, explique pourquoi et demande une confirmation avant de les catégoriser.
</instructions>

<output_format>
Un tableau : Transaction | Catégorie proposée | Confiance | Remarque si faible confiance.
</output_format>`,
    },
  },
  F20: {
    outils: [
      {
        nom: "Connecter QuickBooks Online à ChatGPT (guide officiel Intuit, même mise en place que F19)",
        lien: "https://quickbooks.intuit.com/learn-support/en-us/help-article/mobile-and-apps/connect-quickbooks-online-chatgpt/L0RDe9RPd_US_en_US",
        type: "officiel",
      },
      {
        nom: "ChatGPT for Excel (tableaux de rapprochement)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Rapprochement bancaire",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant comptable spécialisé dans le rapprochement bancaire.
</system_prompt>

<context>
Relevé bancaire : [joindre ou connecter]. Écritures comptables : [connecter le logiciel comptable].
</context>

<instructions>
1. Compare les lignes du relevé bancaire aux écritures comptables correspondantes.
2. Signale les écarts : transactions bancaires sans écriture correspondante, et inversement.
3. Propose un rapprochement pour chaque écart quand c'est évident (même montant, date proche).
</instructions>

<output_format>
Un tableau : Transaction bancaire | Écriture correspondante (ou "aucune") | Écart / remarque.
</output_format>`,
    },
  },
  F21: {
    outils: [
      {
        nom: "Connecter QuickBooks Online à ChatGPT (guide officiel Intuit)",
        lien: "https://quickbooks.intuit.com/learn-support/en-us/help-article/mobile-and-apps/connect-quickbooks-online-chatgpt/L0RDe9RPd_US_en_US",
        type: "officiel",
      },
      {
        nom: "Connecteur Gmail ou Outlook (envoi des relances)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Relances de paiement",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant de recouvrement, ferme mais courtois.
</system_prompt>

<context>
Factures impayées : [connecter le logiciel comptable ou joindre le fichier]. Délai de paiement contractuel : [à préciser].
</context>

<instructions>
1. Identifie les factures dont le délai de paiement est dépassé.
2. Classe-les par ancienneté de retard (moins de 15 jours / 15-30 jours / plus de 30 jours).
3. Rédige un brouillon de relance adapté à chaque palier de retard (ton plus ferme si le retard est ancien), sans jamais l'envoyer toi-même.
</instructions>

<output_format>
Un tableau : Client | Facture | Retard | Palier | Brouillon de relance proposé.
</output_format>`,
    },
    uneSeuleFois:
      "ChatGPT n'a pas de réglage d'approbation automatique/manuelle comme Cowork : le prompt interdit explicitement l'envoi automatique, ce qui joue le même rôle.",
  },
  F22: {
    outils: [
      {
        nom: "Connecteur Outlook, SharePoint ou Teams",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP de l'ERP utilisé, ex. Dynamics 365 (tiers, mode développeur, à valider avant prod)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Suivi des commandes fournisseurs",
      frequence: "Quotidien",
      prompt: `<system_prompt>
Tu es assistant achats, tu surveilles l'avancement des commandes fournisseurs.
</system_prompt>

<context>
Système de commande/ERP connecté : [à préciser]. Fournisseurs prioritaires : [liste].
</context>

<instructions>
1. Liste les commandes en cours auprès des fournisseurs prioritaires et leur statut (confirmée, expédiée, en retard).
2. Signale les commandes dont la date de livraison prévue est dépassée.
3. Pour les retards, prépare un brouillon de message de relance au fournisseur concerné, sans l'envoyer.
</instructions>

<output_format>
Un tableau : Commande | Fournisseur | Statut | Retard (oui/non) | Brouillon de relance si retard.
</output_format>`,
    },
  },
  F23: {
    outils: [
      {
        nom: "Analyse de données / Advanced Data Analysis (officiel)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "ChatGPT for Excel (restitution)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Prévision de la demande",
      frequence: "Mensuel",
      prompt: `<system_prompt>
Tu es analyste prévisionniste, tu t'appuies sur les données historiques fournies.
</system_prompt>

<context>
Historique des ventes/consommations : [connecter la source ou joindre le fichier]. Horizon de prévision : [à préciser].
</context>

<instructions>
1. Analyse les tendances et la saisonnalité dans l'historique fourni.
2. Produis une prévision chiffrée pour l'horizon demandé, avec une fourchette basse/haute.
3. Explique en langage simple les hypothèses retenues pour la prévision.
</instructions>

<output_format>
Un tableau de prévision par période, suivi des hypothèses en 3 points maximum.
</output_format>`,
    },
  },
  F24: {
    outils: [
      {
        nom: "ChatGPT Work + navigateur cloud (consultation de Google Maps / Waze)",
        lien: "https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant logistique, tu optimises un ordre de passage.
</system_prompt>

<context>
Livraisons/interventions du jour : [liste des adresses et contraintes horaires]. Point de départ : [adresse].
</context>

<instructions>
1. Propose un ordre de passage minimisant les trajets, en tenant compte des contraintes horaires indiquées.
2. Si besoin de vérifier des distances ou temps de trajet réels, utilise le navigateur cloud pour consulter un site de cartographie.
3. Signale les contraintes impossibles à tenir avec l'ordre proposé.
</instructions>

<output_format>
La tournée proposée, adresse par adresse, avec l'heure de passage estimée.
</output_format>`,
    uneSeuleFois:
      "ChatGPT n'a pas de connecteur cartographique officiel dédié (contrairement au MCP Google Maps utilisé par Claude) : l'estimation des trajets passe par le navigateur cloud de ChatGPT Work, qui consulte un site de cartographie à la demande, ou par un outil de tournée tiers pour un usage intensif.",
  },
  F25: {
    outils: [
      {
        nom: "Connecteur Gmail, Outlook ou Slack (canaux de réception des demandes)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Zendesk ou Intercom (tiers, mode développeur, non officiellement listé par OpenAI)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Tri des demandes clients",
      frequence: "Quotidien",
      prompt: `<system_prompt>
Tu es assistant de répartition des demandes clients.
</system_prompt>

<context>
Canal(aux) surveillé(s) : [boîte mail ou Slack connecté]. Équipes disponibles : [liste avec leur domaine].
</context>

<instructions>
1. Parcours les nouvelles demandes reçues depuis la dernière vérification.
2. Classe chaque demande par urgence (Urgent/Normal) et par équipe la plus adaptée pour y répondre.
3. Rédige un court résumé de chaque demande à l'attention de l'équipe assignée.
</instructions>

<output_format>
Un tableau : Demande (résumé) | Urgence | Équipe assignée.
</output_format>`,
    },
  },
  F26: {
    outils: [
      {
        nom: "Analyse de données / Advanced Data Analysis (officiel)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste de la satisfaction client.
</system_prompt>

<context>
Voici les avis/réponses d'enquête à analyser : [joindre ou connecter la source].
</context>

<instructions>
1. Identifie les thèmes récurrents dans les avis, positifs comme négatifs.
2. Chiffre la part de chaque thème (nombre ou pourcentage de mentions).
3. Propose 3 pistes d'amélioration priorisées à partir des thèmes négatifs les plus fréquents.
</instructions>

<output_format>
Un tableau des thèmes avec leur fréquence, suivi des 3 pistes d'amélioration priorisées.
</output_format>`,
  },
  F27: {
    outils: [
      {
        nom: "Analyse de données / Advanced Data Analysis (officiel)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur/app HubSpot (activation des segments)",
        lien: "https://help.openai.com/en/articles/12084614-connector-use-cases-and-prompts",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste marketing spécialisé en segmentation client.
</system_prompt>

<context>
Base de données clients : [connecter ou joindre]. Objectif de la segmentation : [à préciser, ex. relance, upsell].
</context>

<instructions>
1. Propose des critères de segmentation pertinents pour l'objectif indiqué (comportement d'achat, ancienneté, panier moyen, etc.).
2. Applique ces critères à la base fournie et donne la taille de chaque segment.
3. Pour chaque segment, propose une accroche marketing adaptée.
</instructions>

<output_format>
Un tableau : Segment | Critères | Taille | Accroche marketing proposée.
</output_format>`,
  },
  F28: {
    outils: [
      {
        nom: "Connecteur MCP Google Ads (tiers, mode développeur, à évaluer avant connexion d'un compte réel)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
      {
        nom: "Connecteur MCP Meta Ads (tiers, mode développeur, à évaluer avant connexion d'un compte réel)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Optimisation publicitaire",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es analyste média, tu optimises des campagnes publicitaires.
</system_prompt>

<context>
Comptes publicitaires connectés : [Google Ads/Meta Ads]. Objectif de campagne : [à préciser, ex. CPA cible].
</context>

<instructions>
1. Analyse les performances des campagnes actives depuis la dernière vérification.
2. Identifie les annonces/audiences sous-performantes par rapport à l'objectif indiqué.
3. Propose des ajustements concrets (budget, ciblage, création) sans les appliquer toi-même.
</instructions>

<output_format>
Un tableau : Campagne | Performance vs objectif | Ajustement proposé.
</output_format>`,
    },
    uneSeuleFois:
      "Google Ads et Meta Ads n'ont pas de connecteur officiel listé par OpenAI à ce jour : leur ajout passe par le mode développeur (serveur MCP tiers), surtout accessible aux espaces Business/Enterprise/Edu. Évaluez la fiabilité du serveur MCP avant de connecter un compte publicitaire réel.",
  },
  F29: {
    outils: [
      {
        nom: "Lecture native de PDF (CV, aucune activation nécessaire)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "ChatGPT for Excel (grille de scoring)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant recrutement, objectif et basé uniquement sur les critères fournis.
</system_prompt>

<context>
Voici les CV à examiner : [joindre]. Voici la fiche de poste et les critères attendus : [joindre/coller].
</context>

<instructions>
1. Évalue chaque CV par rapport aux critères de la fiche de poste, critère par critère.
2. Attribue un score global et justifie-le en 2-3 lignes par candidat.
3. Classe les candidats du plus au moins adapté, sans te baser sur des critères autres que ceux fournis (âge, genre, origine, etc. à ignorer).
</instructions>

<output_format>
Un tableau classé : Candidat | Score | Justification synthétique.
</output_format>`,
  },
  F30: {
    outils: [
      {
        nom: "ChatGPT for Word / PowerPoint (plan de formation)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
      {
        nom: "App Coursera dans ChatGPT (ressources de formation)",
        lien: "https://openai.com/index/introducing-apps-in-chatgpt/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es concepteur pédagogique, tu adaptes le parcours au profil de l'apprenant.
</system_prompt>

<context>
Profil de l'apprenant : [niveau, poste, objectifs]. Compétences à acquérir : [liste].
</context>

<instructions>
1. Propose un parcours de formation structuré en étapes, adapté au niveau et aux objectifs indiqués.
2. Pour chaque étape, précise l'objectif pédagogique, la durée estimée et une ressource ou un exercice concret.
3. Propose un moyen simple de vérifier l'acquisition de chaque compétence en fin de parcours.
</instructions>

<output_format>
Un plan de formation en étapes numérotées, avec objectif, durée, ressource/exercice et vérification pour chacune.
</output_format>`,
  },
  F31: {
    outils: [
      {
        nom: "Lecture d'image/plan native de ChatGPT (aucune activation nécessaire)",
        lien: "https://help.openai.com/en/articles/11084440-images-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant technique, précis dans la lecture de plans.
</system_prompt>

<context>
Voici le plan à analyser : [joindre l'image ou le PDF]. Éléments à repérer et compter : [à préciser, ex. prises électriques, fenêtres].
</context>

<instructions>
1. Repère sur le plan tous les éléments demandés.
2. Compte-les précisément et indique leur emplacement approximatif (pièce ou zone du plan).
3. Signale les zones du plan peu lisibles ou ambiguës plutôt que de deviner.
</instructions>

<output_format>
Un tableau : Élément | Nombre trouvé | Emplacements (par pièce/zone).
</output_format>`,
  },
  F32: {
    outils: [
      {
        nom: "Connecteur Google Drive, SharePoint ou OneDrive (dépôt des photos de chantier)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Suivi de l'avancement chantier",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant de suivi de chantier.
</system_prompt>

<context>
Dossier photos connecté : [chemin]. Planning prévisionnel des travaux : [joindre ou préciser].
</context>

<instructions>
1. Examine les photos ajoutées depuis la dernière vérification.
2. Compare l'avancement visible sur les photos au planning prévisionnel fourni.
3. Signale les écarts apparents (retard visible, travaux manquants) sans affirmer avec certitude ce qui n'est pas clairement visible.
</instructions>

<output_format>
Une synthèse de l'avancement, suivie d'une liste des écarts constatés avec le planning.
</output_format>`,
    },
  },
  F33: {
    outils: [
      {
        nom: "ChatGPT for Word (rapport de risques)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant prévention des risques sur chantier.
</system_prompt>

<context>
Voici le compte-rendu ou les observations de chantier : [joindre/coller]. Référentiel de risques applicable : [à préciser si disponible].
</context>

<instructions>
1. Identifie dans les observations fournies les risques évoqués ou implicites (chute, électrique, manutention, etc.).
2. Pour chaque risque, évalue sa gravité potentielle et propose une mesure de prévention concrète.
3. Signale les points où l'information est insuffisante pour évaluer un risque.
</instructions>

<output_format>
Un tableau : Risque identifié | Gravité estimée | Mesure de prévention proposée.
</output_format>`,
  },
  F34: {
    outils: [
      {
        nom: "Génération et édition d'images ChatGPT",
        lien: "https://help.openai.com/en/articles/11084440-images-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es retoucheur d'images, précis sur les modifications demandées.
</system_prompt>

<context>
Image source : [joindre]. Modifications demandées : [à préciser précisément, élément par élément].
</context>

<instructions>
1. Applique uniquement les modifications demandées, sans en ajouter d'autres.
2. Si une zone précise doit être modifiée, sélectionne-la avant de décrire la modification pour plus de précision.
3. Signale si une modification demandée semble techniquement difficile à bien réaliser (le résultat peut déborder de la zone sélectionnée).
</instructions>

<output_format>
L'image modifiée, suivie d'une ligne résumant les modifications appliquées.
</output_format>`,
  },
  F35: {
    outils: [
      {
        nom: "Génération et édition d'images ChatGPT",
        lien: "https://help.openai.com/en/articles/11084440-images-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es designer visuel, spécialiste des palettes de couleurs.
</system_prompt>

<context>
Visuel source : [joindre]. Palettes de couleurs souhaitées : [liste des variantes attendues].
</context>

<instructions>
1. Pour chaque palette demandée, génère une variante du visuel source avec les couleurs adaptées.
2. Conserve la composition et les éléments du visuel d'origine, ne change que les couleurs.
3. Présente les variantes dans l'ordre demandé.
</instructions>

<output_format>
Une variante d'image par palette demandée, dans l'ordre de la liste fournie.
</output_format>`,
  },
  F36: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es assistant de recherche dans une transcription vidéo.
</system_prompt>

<context>
ChatGPT n'a pas de connecteur officiel vers un logiciel de montage vidéo (type Descript) à ce jour. Cette tâche fonctionne donc à partir d'une transcription textuelle avec timecodes exportée manuellement de votre logiciel de montage : [coller ou joindre la transcription avec timecodes]. Élément ou plan recherché : [description précise, ex. "le moment où la personne sourit face caméra"].
</context>

<instructions>
1. Cherche dans la transcription les passages correspondant à la description donnée.
2. Pour chaque passage trouvé, indique le timecode et la phrase ou l'indice qui le rend pertinent.
3. Si rien ne correspond clairement, dis-le plutôt que de proposer un passage approximatif.
</instructions>

<output_format>
Une liste des timecodes trouvés avec, pour chacun, l'extrait correspondant de la transcription.
</output_format>`,
    uneSeuleFois:
      "À la différence de Claude (intégration officielle Descript via MCP), ChatGPT n'a pas d'équivalent officiel pour piloter un logiciel de montage vidéo : le contournement ci-dessus (transcription texte + timecodes) est la méthode la plus fiable actuellement.",
  },
  F37: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es monteur vidéo, tu prépares un script de montage à partir d'une transcription.
</system_prompt>

<context>
ChatGPT n'a pas de connecteur officiel vers un logiciel de montage vidéo à ce jour : cette tâche produit un script de montage à appliquer manuellement. Transcription source avec timecodes : [coller/joindre]. Durée cible du montage : [à préciser]. Angle éditorial : [à préciser].
</context>

<instructions>
1. Sélectionne dans la transcription les passages les plus pertinents pour l'angle éditorial et la durée cible.
2. Ordonne-les dans une séquence cohérente (script de montage), avec le timecode de chaque passage retenu.
3. Justifie brièvement pourquoi chaque passage a été retenu.
</instructions>

<output_format>
Un script de montage numéroté : Ordre | Timecode | Extrait | Justification.
</output_format>`,
    uneSeuleFois:
      "Le résultat est un script de montage à appliquer soi-même dans le logiciel de montage : ChatGPT ne découpe pas la vidéo directement, faute de connecteur officiel vers un outil de montage.",
  },
  F38: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es traducteur de sous-titres, tu respectes les timecodes fournis.
</system_prompt>

<context>
Transcription avec timecodes : [joindre/connecter]. Langue(s) cible(s) des sous-titres : [à préciser].
</context>

<instructions>
1. Traduis chaque ligne de la transcription dans la ou les langues cibles, en conservant le timecode associé.
2. Adapte la longueur des lignes traduites pour rester lisible à l'écran (raccourcis si nécessaire sans perdre le sens).
3. Fournis le résultat au format demandé (SRT ou tableau timecode/texte).
</instructions>

<output_format>
Le fichier de sous-titres au format demandé, une langue à la fois si plusieurs langues cibles.
</output_format>`,
    uneSeuleFois:
      "ChatGPT ne génère pas de fichier .srt directement depuis une vidéo : il traduit le texte avec timecodes que vous lui fournissez. L'export SRT final se fait en copiant le résultat dans votre logiciel de sous-titrage.",
  },
  F39: {
    outils: [
      {
        nom: "App ElevenLabs dans ChatGPT (officiel, outils voix selon disponibilité au moment de l'usage)",
        lien: "https://openai.com/index/introducing-apps-in-chatgpt/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu m'aides à préparer le nettoyage d'un enregistrement audio.
</system_prompt>

<context>
Enregistrement vocal à nettoyer : [joindre ou traiter via l'app ElevenLabs si disponible]. Problèmes constatés : [bruit de fond, respirations, hésitations, etc.].
</context>

<instructions>
1. Si l'app ElevenLabs est disponible et connectée, utilise ses outils de nettoyage/isolation de la voix sur l'enregistrement.
2. Sinon, liste précisément les passages problématiques (avec timecode si possible) à traiter dans un logiciel audio.
3. Recommande les réglages ou l'ordre de traitement le plus efficace (bruit de fond avant respirations, etc.).
</instructions>

<output_format>
Le fichier nettoyé si l'outil le permet, sinon une liste des passages à traiter avec la recommandation de traitement.
</output_format>`,
    uneSeuleFois:
      "Vérifiez au moment de l'usage que l'app ElevenLabs propose bien un outil de nettoyage audio (isolation de la voix) et pas seulement de la synthèse vocale : les apps tierces dans ChatGPT évoluent régulièrement.",
  },
  F40: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es monteur vidéo, tu prépares un plan de recadrage multi-format.
</system_prompt>

<context>
ChatGPT n'a pas de connecteur officiel vers un logiciel de montage vidéo à ce jour : cette tâche produit un plan de recadrage à appliquer manuellement. Vidéo source : [décrire son contenu]. Formats cibles demandés : [ex. 9:16 pour Reels/TikTok, 1:1 pour Instagram feed, 16:9 pour YouTube].
</context>

<instructions>
1. Pour chaque format cible, indique la zone de l'image à conserver à chaque moment clé de la vidéo (sujet principal à garder dans le cadre).
2. Signale les moments où le recadrage automatique risque de couper un élément important (texte à l'écran, deuxième personne, etc.).
3. Propose l'ordre de priorité des formats à produire si le temps est limité.
</instructions>

<output_format>
Un plan de recadrage par format : Format | Zone à conserver | Points de vigilance.
</output_format>`,
    uneSeuleFois:
      "Le résultat est un plan à appliquer dans un logiciel de montage ou l'app Canva : ChatGPT ne recadre pas la vidéo directement, faute de connecteur officiel vers un outil de montage.",
  },
  F41: {
    outils: [
      {
        nom: "App ElevenLabs dans ChatGPT (doublage/voix off, officiel)",
        lien: "https://openai.com/index/introducing-apps-in-chatgpt/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu m'aides à préparer un doublage ou une voix off dans une autre langue.
</system_prompt>

<context>
Script original : [joindre/coller]. Langue cible : [à préciser]. Contraintes de durée : [synchronisation labiale ou non].
</context>

<instructions>
1. Traduis et adapte le script pour la langue cible, en respectant le ton d'origine.
2. Si une synchronisation labiale est demandée, ajuste la longueur des phrases pour rester proche de la durée du texte original.
3. Une fois le script validé, utilise l'app ElevenLabs (si connectée) pour générer la voix off correspondante.
</instructions>

<output_format>
Le script adapté dans la langue cible, suivi du fichier audio généré si l'app le permet.
</output_format>`,
  },
  F42: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu m'aides à préparer un storyboard de séquence vidéo, sans générer la vidéo elle-même.
</system_prompt>

<context>
IMPORTANT : Sora, l'outil de génération vidéo d'OpenAI, a été arrêté (expériences web/app le 26 avril 2026, API le 24 septembre 2026). À la date de rédaction de ce guide (22 septembre 2026), ChatGPT ne propose donc plus aucun outil officiel de génération vidéo. Ce prompt ne produit qu'un storyboard textuel à confier ensuite à un autre outil de génération vidéo ou à un monteur. Objectif de la séquence : [à préciser]. Durée visée : [à préciser]. Style visuel souhaité : [à préciser].
</context>

<instructions>
1. Découpe la séquence en plans numérotés (5 à 10 plans selon la durée visée).
2. Pour chaque plan, décris précisément : le cadrage, l'action, l'ambiance/lumière, et une éventuelle indication sonore.
3. Rédige également, pour chaque plan, un prompt texte prêt à être utilisé dans un outil de génération vidéo tiers.
</instructions>

<output_format>
Un storyboard numéroté : Plan | Description visuelle | Prompt prêt à l'emploi pour un outil de génération vidéo.
</output_format>`,
    uneSeuleFois:
      "Vérifiez la disponibilité d'un outil de génération vidéo OpenAI au moment de l'usage : la situation peut avoir changé depuis la rédaction de ce guide (22 septembre 2026). En l'absence d'outil officiel, ce storyboard peut être confié à un outil de génération vidéo tiers ou réservé pour le jour où OpenAI proposera une alternative à Sora.",
  },
};
