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
        nom: "Tasks (taches planifiees ChatGPT)",
        lien: "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Tri de la boite mail",
      frequence: "Quotidien (matin)",
      prompt: `<system_prompt>
Tu es mon assistant de gestion de boite mail.
</system_prompt>

<context>
Je recois de nombreux e-mails chaque jour sur ma boite connectee via le connecteur Gmail ou Outlook. Je veux garder le controle sans tout lire moi-meme.
</context>

<instructions>
1. Parcours les e-mails non lus recus depuis ma derniere verification.
2. Classe-les en trois categories : Urgent (reponse attendue sous 24h), A traiter (pas urgent mais actionnable), Information (rien a faire).
3. Pour chaque e-mail "Urgent", redige un brouillon de reponse court et professionnel, sans jamais l'envoyer toi-meme.
4. Signale les e-mails qui ressemblent a du spam ou du phishing sans les supprimer.
</instructions>

<output_format>
Une liste groupee par categorie, avec pour chaque e-mail : expediteur, objet en une ligne, et pour les "Urgent" le brouillon de reponse propose.
</output_format>`,
    },
    uneSeuleFois:
      "ChatGPT n'a pas de reglage d'approbation automatique/manuelle comme Cowork : le prompt interdit explicitement l'envoi automatique, ce qui joue le meme role. Si la tache modifie des donnees sensibles, ChatGPT peut aussi la mettre en pause de lui-meme pour demander une validation.",
  },
  F02: {
    outils: [
      {
        nom: "App Canva dans ChatGPT",
        lien: "https://openai.com/index/introducing-apps-in-chatgpt/",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Buffer (publication programmee, mode developpeur)",
        lien: "https://buffer.com/mcp",
        type: "tiers",
      },
      {
        nom: "Connecteur MCP Hootsuite (publication programmee, mode developpeur)",
        lien: "https://www.hootsuite.com/integrations/mcp",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es redacteur de contenu reseaux sociaux specialise dans [secteur].
</system_prompt>

<context>
Public cible : [a preciser]. Ton de marque : [a preciser]. Reseaux vises : [LinkedIn / Instagram / etc.].
</context>

<instructions>
1. Propose 5 idees de publications pour la semaine a venir, adaptees a chaque reseau vise.
2. Redige le texte complet de chaque publication, avec hashtags si pertinent.
3. Precise pour chaque publication le meilleur jour et creneau horaire de diffusion.
</instructions>

<output_format>
Un tableau : Jour | Reseau | Texte de la publication | Hashtags | Creneau conseille.
</output_format>`,
    uneSeuleFois:
      "Le mode developpeur (ajout de connecteurs MCP comme Buffer ou Hootsuite) est surtout accessible aux espaces ChatGPT Business/Enterprise/Edu, avec un acces lecture seule limite sur Pro. Sans ce mode, copiez simplement les publications validees dans Buffer ou Hootsuite manuellement, ou demandez a l'app Canva de preparer les visuels associes.",
  },
  F03: {
    outils: [
      {
        nom: "ChatGPT for Word (complement Office, gratuit sur tous les plans)",
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
        nom: "ChatGPT for Word (redaction du compte-rendu)",
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
      nom: "Compte-rendu de reunion recurrente",
      frequence: "Quotidien (fin de journee)",
      prompt: `<system_prompt>
Tu es assistant de reunion, tu rediges des comptes-rendus clairs et actionnables.
</system_prompt>

<context>
Verifie le dossier connecte des transcriptions de reunion pour toute nouvelle transcription deposee aujourd'hui. Participants et objectif de chaque reunion : a deduire de la transcription.
</context>

<instructions>
1. Pour chaque nouvelle transcription trouvee, produis un compte-rendu structure : objet, participants, decisions prises, actions a faire (avec responsable si mentionne), points en suspens.
2. Signale les points ou l'information est ambigue ou manquante plutot que de deviner.
3. Depose le compte-rendu dans le meme dossier, a cote de la transcription source.
</instructions>

<output_format>
Un compte-rendu par reunion traitee, avec les sections Decisions / Actions / Points en suspens.
</output_format>`,
    },
    uneSeuleFois:
      "Si aucun connecteur de stockage n'est disponible sur votre plan, collez simplement la transcription dans le chat au fil de l'eau : cette tache devient alors un prompt ponctuel plutot qu'une tache planifiee.",
  },
  F05: {
    outils: [
      {
        nom: "Connecteur Google Calendar ou Outlook Calendar",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Tasks (taches planifiees ChatGPT)",
        lien: "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Preparation de l'agenda",
      frequence: "Quotidien (matin)",
      prompt: `<system_prompt>
Tu es mon assistant d'organisation quotidienne.
</system_prompt>

<context>
Mon calendrier est connecte via le connecteur Google Calendar ou Outlook Calendar. Je veux anticiper ma journee et eviter les conflits.
</context>

<instructions>
1. Liste les rendez-vous du jour dans l'ordre chronologique, avec heure, duree et participants.
2. Signale tout conflit d'horaire ou enchainement trop serre (moins de 10 minutes entre deux rendez-vous).
3. Pour chaque rendez-vous important, rappelle le contexte utile s'il est disponible (objet, derniers echanges lies).
</instructions>

<output_format>
Un planning de la journee, suivi d'une section "Points de vigilance" pour les conflits ou enchainements serres.
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
Tu es assistant support client, tu reponds uniquement a partir de la base de connaissances fournie.
</system_prompt>

<context>
Voici notre base de connaissances / FAQ : [connecter la source via le connecteur ou la coller]. Voici la question du client : [coller le message].
</context>

<instructions>
1. Cherche la reponse dans la base de connaissances connectee.
2. Si l'information existe, redige une reponse claire et empathique au client.
3. Si l'information n'existe pas, dis-le explicitement plutot que d'inventer une reponse, et propose d'escalader vers un humain.
</instructions>

<output_format>
La reponse proposee au client, precedee d'une ligne "Source trouvee : oui/non".
</output_format>`,
    uneSeuleFois:
      "Les GPT personnalises (Custom GPTs) sont en cours de retrait progressif chez OpenAI : pour un bot de support reutilisable, preferez un Projet ChatGPT avec vos documents de FAQ attaches et ces instructions en instructions de projet, plutot que de creer un GPT dedie.",
  },
  F07: {
    outils: [
      {
        nom: "Recherche web native de ChatGPT (aucune activation necessaire)",
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
Secteur a surveiller : [a preciser]. Sources prioritaires : [sites, concurrents, mots-cles].
</context>

<instructions>
1. Recherche les actualites, annonces et mouvements concurrentiels marquants de la semaine ecoulee sur le secteur indique.
2. Pour chaque element retenu, resume l'information en 2-3 lignes et indique pourquoi elle est pertinente pour nous.
3. Cite systematiquement la source (nom et lien) de chaque information.
</instructions>

<output_format>
Une liste groupee par theme (concurrents / marche / reglementation), chaque entree avec resume et source citee.
</output_format>`,
    },
    uneSeuleFois:
      "Pour un rapport plus approfondi et sourcé ponctuellement (au-dela de la veille hebdomadaire courante), lancez Deep Research avec /deepresearch depuis le chat.",
  },
  F08: {
    outils: [
      {
        nom: "Analyse de donnees / Advanced Data Analysis (officiel)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "ChatGPT for Excel (complement Office)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste de donnees, rigoureux et pedagogue.
</system_prompt>

<context>
Voici les donnees a analyser : [joindre le fichier Excel/CSV]. Objectif du rapport : [a preciser].
</context>

<instructions>
1. Explore les donnees et identifie les tendances, anomalies et chiffres cles pertinents pour l'objectif indique.
2. Produis les tableaux et graphiques necessaires pour illustrer ces points.
3. Redige une synthese en langage clair, sans jargon statistique non explique.
</instructions>

<output_format>
Une synthese en 5 points cles maximum, suivie des tableaux/graphiques detailles.
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
        nom: "Generation et edition d'images ChatGPT",
        lien: "https://help.openai.com/en/articles/11084440-images-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es designer visuel specialise dans les supports marketing.
</system_prompt>

<context>
Objectif du visuel : [a preciser]. Format cible : [post Instagram, banniere, etc.]. Charte graphique : [couleurs, police, logo].
</context>

<instructions>
1. Propose 3 pistes de composition differentes pour le visuel demande.
2. Pour la piste retenue, genere le visuel en respectant la charte graphique donnee.
3. Precise les ajustements possibles si le rendu ne convient pas (couleur, texte, disposition).
</instructions>

<output_format>
Les 3 pistes decrites brievement, puis le visuel genere pour la piste retenue.
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
        nom: "Agentforce / serveur MCP Salesforce (officiel Salesforce, mode developpeur)",
        lien: "https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/chatgpt.html",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Nettoyage de la base CRM",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant CRM, tu identifies et corriges les incoherences de donnees.
</system_prompt>

<context>
Base CRM connectee : [HubSpot / Salesforce]. Criteres de qualite attendus : [champs obligatoires, format des numeros, doublons a eviter].
</context>

<instructions>
1. Parcours les fiches contacts/entreprises modifiees ou creees depuis la derniere verification.
2. Signale les doublons probables, les champs obligatoires manquants et les formats incoherents (telephone, email).
3. Propose les corrections mais ne modifie rien directement dans le CRM sans validation.
</instructions>

<output_format>
Un tableau : Fiche concernee | Probleme detecte | Correction proposee.
</output_format>`,
    },
  },
  F11: {
    outils: [
      {
        nom: "Lecture native de PDF et formulaires (aucune activation necessaire)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "ChatGPT for Excel (export des donnees extraites)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant d'extraction de donnees, precis et exhaustif.
</system_prompt>

<context>
Voici le(s) document(s) source(s) : [joindre]. Voici les champs a extraire : [liste des champs].
</context>

<instructions>
1. Extrait chaque champ demande pour chaque document fourni.
2. Si un champ est illisible ou absent, indique-le explicitement plutot que d'inventer une valeur.
3. Structure le resultat pour qu'il soit directement copiable dans un tableur.
</instructions>

<output_format>
Un tableau avec une ligne par document et une colonne par champ demande.
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
Dossier a organiser : [chemin/nom du dossier connecte]. Regle de classement souhaitee : [par date, par client, par type de document].
</context>

<instructions>
1. Repere les documents ajoutes ou non classes depuis la derniere verification.
2. Propose pour chacun un nom de fichier et un sous-dossier de destination conformes a la regle de classement.
3. N'effectue le deplacement/renommage que si l'action est possible via le connecteur ; sinon, liste les actions a faire manuellement.
</instructions>

<output_format>
Un tableau : Document | Nom propose | Dossier de destination propose.
</output_format>`,
    },
  },
  F13: {
    outils: [
      {
        nom: "Lecture native de PDF (aucune activation necessaire)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur Google Drive (recuperation des pieces si besoin)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant d'analyse documentaire, methodique et exhaustif.
</system_prompt>

<context>
Voici les documents du dossier a analyser ou comparer : [joindre/connecter]. Points de comparaison attendus : [a preciser].
</context>

<instructions>
1. Identifie dans chaque document les informations correspondant aux points de comparaison demandes.
2. Signale les incoherences ou ecarts entre les documents.
3. Indique les pieces manquantes par rapport a ce qui serait attendu dans un dossier complet.
</instructions>

<output_format>
Un tableau comparatif par point de comparaison, suivi d'une liste des pieces manquantes ou incoherentes.
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
Tu es traducteur professionnel, attentif au registre de langue et au contexte metier.
</system_prompt>

<context>
Document a traduire : [joindre/coller]. Langue source : [a preciser]. Langue cible : [a preciser]. Registre attendu : [formel/informel].
</context>

<instructions>
1. Traduis le document integralement en respectant le sens, le ton et le registre demande.
2. Adapte les expressions idiomatiques plutot que de les traduire mot a mot.
3. Signale les termes techniques ou noms propres pour lesquels plusieurs traductions etaient possibles, avec ton choix justifie.
</instructions>

<output_format>
Le document traduit en entier, suivi d'une liste des choix de traduction a valider.
</output_format>`,
  },
  F15: {
    outils: [
      {
        nom: "ChatGPT Work (creation de presentations PowerPoint)",
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
Tu es concepteur de presentations professionnelles, clair et synthetique.
</system_prompt>

<context>
Voici le brief : [coller le brief]. Public : [a preciser]. Duree de presentation visee : [a preciser]. Charte graphique : [a preciser].
</context>

<instructions>
1. Propose un plan de presentation (liste des diapositives avec leur titre et leur objectif).
2. Une fois le plan valide, redige le contenu detaille de chaque diapositive (titre, points cles, note orateur).
3. Cree le fichier de presentation correspondant, en respectant la charte graphique indiquee.
</instructions>

<output_format>
D'abord le plan sous forme de liste, puis le fichier de presentation genere une fois le plan valide.
</output_format>`,
    uneSeuleFois:
      "La creation directe de fichiers .pptx via ChatGPT Work depend du plan, de l'espace de travail et de la surface utilisee (elle n'etait pas incluse au lancement initial du flux Work) : verifiez la disponibilite au moment de l'usage, sinon demandez le contenu texte pret a coller dans PowerPoint ou Google Slides.",
  },
  F16: {
    outils: [
      {
        nom: "Connecteur GitHub, GitLab ou Notion (selon l'outil utilise)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Asana, Jira, Linear, Monday ou ClickUp (mode developpeur, non officiellement liste par OpenAI)",
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
Outil de gestion de projet connecte : [GitHub / Notion / Jira / autre]. Projet a suivre : [nom du projet].
</context>

<instructions>
1. Liste les taches en retard, les taches terminees cette semaine, et celles a venir dans les 7 prochains jours.
2. Signale les taches sans responsable assigne ou sans date d'echeance.
3. Resume l'avancement global du projet en une phrase.
</instructions>

<output_format>
Trois listes (Retard / Terminees / A venir), suivies du resume d'avancement en une phrase.
</output_format>`,
    },
    uneSeuleFois:
      "Asana, Jira, Linear, Monday et ClickUp n'ont pas de connecteur officiel liste par OpenAI a ce jour : leur ajout passe par le mode developpeur (serveur MCP du fournisseur), surtout accessible aux espaces Business/Enterprise/Edu. Sur un compte individuel, exportez plutot un etat du projet (CSV/liste) et collez-le dans le chat.",
  },
  F17: {
    outils: [
      {
        nom: "Connecteur/app HubSpot",
        lien: "https://help.openai.com/en/articles/12084614-connector-use-cases-and-prompts",
        type: "officiel",
      },
      {
        nom: "Agentforce / serveur MCP Salesforce (officiel Salesforce, mode developpeur)",
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
Tu es assistant commercial, tu prepares des relances personnalisees sans jamais les envoyer toi-meme.
</system_prompt>

<context>
Cible : [type de prospect]. CRM connecte : [HubSpot/autre]. Offre a presenter : [a preciser].
</context>

<instructions>
1. Identifie dans le CRM les prospects sans contact depuis plus de [X] jours et encore actifs dans le pipeline.
2. Pour chacun, redige un brouillon de relance personnalise (en te basant sur le dernier echange connu).
3. Ne programme et n'envoie jamais l'e-mail toi-meme : laisse le brouillon pret a etre valide.
</instructions>

<output_format>
Un tableau : Prospect | Dernier contact | Brouillon de relance propose.
</output_format>`,
    },
    uneSeuleFois:
      "ChatGPT n'a pas de reglage d'approbation automatique/manuelle comme Cowork : le prompt interdit explicitement l'envoi automatique, ce qui joue le meme role.",
  },
  F18: {
    outils: [
      {
        nom: "ChatGPT for Word / Excel (devis et facturation)",
        lien: "https://help.openai.com/en/articles/20001526-chatgpt-for-word",
        type: "officiel",
      },
      {
        nom: "Connecteur/app HubSpot (donnees client, si CRM connecte)",
        lien: "https://help.openai.com/en/articles/12084614-connector-use-cases-and-prompts",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de facturation, precis sur les montants et les mentions legales.
</system_prompt>

<context>
Client : [nom/infos]. Prestations/produits demandes : [liste avec quantites]. Grille tarifaire : [joindre ou preciser].
</context>

<instructions>
1. Calcule le montant de chaque ligne a partir de la grille tarifaire fournie, puis le total (avec taxes si applicable).
2. Redige le devis ou la facture au format habituel de l'entreprise, avec toutes les mentions obligatoires.
3. Verifie et signale toute incoherence entre la demande et la grille tarifaire (produit absent, quantite improbable).
</instructions>

<output_format>
Le document (devis ou facture) complet, pret a etre exporte en Word ou Excel.
</output_format>`,
  },
  F19: {
    outils: [
      {
        nom: "Connecter QuickBooks Online a ChatGPT (guide officiel Intuit)",
        lien: "https://quickbooks.intuit.com/learn-support/en-us/help-article/mobile-and-apps/connect-quickbooks-online-chatgpt/L0RDe9RPd_US_en_US",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Xero (tiers, mode developpeur, a verifier avant mise en prod)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Categorisation des transactions",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant comptable, tu categorises les transactions selon le plan comptable fourni.
</system_prompt>

<context>
Logiciel comptable connecte : [QuickBooks/Xero]. Plan comptable en vigueur : [joindre ou preciser].
</context>

<instructions>
1. Parcours les transactions non categorisees depuis la derniere verification.
2. Propose une categorie du plan comptable pour chacune, avec le niveau de confiance (haute/moyenne/faible).
3. Pour les transactions a faible confiance, explique pourquoi et demande une confirmation avant de les categoriser.
</instructions>

<output_format>
Un tableau : Transaction | Categorie proposee | Confiance | Remarque si faible confiance.
</output_format>`,
    },
  },
  F20: {
    outils: [
      {
        nom: "Connecter QuickBooks Online a ChatGPT (guide officiel Intuit, meme mise en place que F19)",
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
Tu es assistant comptable specialise dans le rapprochement bancaire.
</system_prompt>

<context>
Releve bancaire : [joindre ou connecter]. Ecritures comptables : [connecter le logiciel comptable].
</context>

<instructions>
1. Compare les lignes du releve bancaire aux ecritures comptables correspondantes.
2. Signale les ecarts : transactions bancaires sans ecriture correspondante, et inversement.
3. Propose un rapprochement pour chaque ecart quand c'est evident (meme montant, date proche).
</instructions>

<output_format>
Un tableau : Transaction bancaire | Ecriture correspondante (ou "aucune") | Ecart / remarque.
</output_format>`,
    },
  },
  F21: {
    outils: [
      {
        nom: "Connecter QuickBooks Online a ChatGPT (guide officiel Intuit)",
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
Factures impayees : [connecter le logiciel comptable ou joindre le fichier]. Delai de paiement contractuel : [a preciser].
</context>

<instructions>
1. Identifie les factures dont le delai de paiement est depasse.
2. Classe-les par anciennete de retard (moins de 15 jours / 15-30 jours / plus de 30 jours).
3. Redige un brouillon de relance adapte a chaque palier de retard (ton plus ferme si le retard est ancien), sans jamais l'envoyer toi-meme.
</instructions>

<output_format>
Un tableau : Client | Facture | Retard | Palier | Brouillon de relance propose.
</output_format>`,
    },
    uneSeuleFois:
      "ChatGPT n'a pas de reglage d'approbation automatique/manuelle comme Cowork : le prompt interdit explicitement l'envoi automatique, ce qui joue le meme role.",
  },
  F22: {
    outils: [
      {
        nom: "Connecteur Outlook, SharePoint ou Teams",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP de l'ERP utilise, ex. Dynamics 365 (tiers, mode developpeur, a valider avant prod)",
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
Systeme de commande/ERP connecte : [a preciser]. Fournisseurs prioritaires : [liste].
</context>

<instructions>
1. Liste les commandes en cours aupres des fournisseurs prioritaires et leur statut (confirmee, expediee, en retard).
2. Signale les commandes dont la date de livraison prevue est depassee.
3. Pour les retards, prepare un brouillon de message de relance au fournisseur concerne, sans l'envoyer.
</instructions>

<output_format>
Un tableau : Commande | Fournisseur | Statut | Retard (oui/non) | Brouillon de relance si retard.
</output_format>`,
    },
  },
  F23: {
    outils: [
      {
        nom: "Analyse de donnees / Advanced Data Analysis (officiel)",
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
      nom: "Prevision de la demande",
      frequence: "Mensuel",
      prompt: `<system_prompt>
Tu es analyste previsionniste, tu t'appuies sur les donnees historiques fournies.
</system_prompt>

<context>
Historique des ventes/consommations : [connecter la source ou joindre le fichier]. Horizon de prevision : [a preciser].
</context>

<instructions>
1. Analyse les tendances et la saisonnalite dans l'historique fourni.
2. Produis une prevision chiffree pour l'horizon demande, avec une fourchette basse/haute.
3. Explique en langage simple les hypotheses retenues pour la prevision.
</instructions>

<output_format>
Un tableau de prevision par periode, suivi des hypotheses en 3 points maximum.
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
Livraisons/interventions du jour : [liste des adresses et contraintes horaires]. Point de depart : [adresse].
</context>

<instructions>
1. Propose un ordre de passage minimisant les trajets, en tenant compte des contraintes horaires indiquees.
2. Si besoin de verifier des distances ou temps de trajet reels, utilise le navigateur cloud pour consulter un site de cartographie.
3. Signale les contraintes impossibles a tenir avec l'ordre propose.
</instructions>

<output_format>
La tournee proposee, adresse par adresse, avec l'heure de passage estimee.
</output_format>`,
    uneSeuleFois:
      "ChatGPT n'a pas de connecteur cartographique officiel dedie (contrairement au MCP Google Maps utilise par Claude) : l'estimation des trajets passe par le navigateur cloud de ChatGPT Work, qui consulte un site de cartographie a la demande, ou par un outil de tournee tiers pour un usage intensif.",
  },
  F25: {
    outils: [
      {
        nom: "Connecteur Gmail, Outlook ou Slack (canaux de reception des demandes)",
        lien: "https://help.openai.com/en/articles/11487775-connectors-in-chatgpt",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Zendesk ou Intercom (tiers, mode developpeur, non officiellement liste par OpenAI)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Tri des demandes clients",
      frequence: "Quotidien",
      prompt: `<system_prompt>
Tu es assistant de repartition des demandes clients.
</system_prompt>

<context>
Canal(aux) surveille(s) : [boite mail ou Slack connecte]. Equipes disponibles : [liste avec leur domaine].
</context>

<instructions>
1. Parcours les nouvelles demandes recues depuis la derniere verification.
2. Classe chaque demande par urgence (Urgent/Normal) et par equipe la plus adaptee pour y repondre.
3. Redige un court resume de chaque demande a l'attention de l'equipe assignee.
</instructions>

<output_format>
Un tableau : Demande (resume) | Urgence | Equipe assignee.
</output_format>`,
    },
  },
  F26: {
    outils: [
      {
        nom: "Analyse de donnees / Advanced Data Analysis (officiel)",
        lien: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste de la satisfaction client.
</system_prompt>

<context>
Voici les avis/reponses d'enquete a analyser : [joindre ou connecter la source].
</context>

<instructions>
1. Identifie les themes recurrents dans les avis, positifs comme negatifs.
2. Chiffre la part de chaque theme (nombre ou pourcentage de mentions).
3. Propose 3 pistes d'amelioration priorisees a partir des themes negatifs les plus frequents.
</instructions>

<output_format>
Un tableau des themes avec leur frequence, suivi des 3 pistes d'amelioration priorisees.
</output_format>`,
  },
  F27: {
    outils: [
      {
        nom: "Analyse de donnees / Advanced Data Analysis (officiel)",
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
Tu es analyste marketing specialise en segmentation client.
</system_prompt>

<context>
Base de donnees clients : [connecter ou joindre]. Objectif de la segmentation : [a preciser, ex. relance, upsell].
</context>

<instructions>
1. Propose des criteres de segmentation pertinents pour l'objectif indique (comportement d'achat, anciennete, panier moyen, etc.).
2. Applique ces criteres a la base fournie et donne la taille de chaque segment.
3. Pour chaque segment, propose une accroche marketing adaptee.
</instructions>

<output_format>
Un tableau : Segment | Criteres | Taille | Accroche marketing proposee.
</output_format>`,
  },
  F28: {
    outils: [
      {
        nom: "Connecteur MCP Google Ads (tiers, mode developpeur, a evaluer avant connexion d'un compte reel)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
      {
        nom: "Connecteur MCP Meta Ads (tiers, mode developpeur, a evaluer avant connexion d'un compte reel)",
        lien: "https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Optimisation publicitaire",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es analyste media, tu optimises des campagnes publicitaires.
</system_prompt>

<context>
Comptes publicitaires connectes : [Google Ads/Meta Ads]. Objectif de campagne : [a preciser, ex. CPA cible].
</context>

<instructions>
1. Analyse les performances des campagnes actives depuis la derniere verification.
2. Identifie les annonces/audiences sous-performantes par rapport a l'objectif indique.
3. Propose des ajustements concrets (budget, ciblage, creation) sans les appliquer toi-meme.
</instructions>

<output_format>
Un tableau : Campagne | Performance vs objectif | Ajustement propose.
</output_format>`,
    },
    uneSeuleFois:
      "Google Ads et Meta Ads n'ont pas de connecteur officiel liste par OpenAI a ce jour : leur ajout passe par le mode developpeur (serveur MCP tiers), surtout accessible aux espaces Business/Enterprise/Edu. Evaluez la fiabilite du serveur MCP avant de connecter un compte publicitaire reel.",
  },
  F29: {
    outils: [
      {
        nom: "Lecture native de PDF (CV, aucune activation necessaire)",
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
Tu es assistant recrutement, objectif et base uniquement sur les criteres fournis.
</system_prompt>

<context>
Voici les CV a examiner : [joindre]. Voici la fiche de poste et les criteres attendus : [joindre/coller].
</context>

<instructions>
1. Evalue chaque CV par rapport aux criteres de la fiche de poste, critere par critere.
2. Attribue un score global et justifie-le en 2-3 lignes par candidat.
3. Classe les candidats du plus au moins adapte, sans te baser sur des criteres autres que ceux fournis (age, genre, origine, etc. a ignorer).
</instructions>

<output_format>
Un tableau classe : Candidat | Score | Justification synthetique.
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
Tu es concepteur pedagogique, tu adaptes le parcours au profil de l'apprenant.
</system_prompt>

<context>
Profil de l'apprenant : [niveau, poste, objectifs]. Competences a acquerir : [liste].
</context>

<instructions>
1. Propose un parcours de formation structure en etapes, adapte au niveau et aux objectifs indiques.
2. Pour chaque etape, precise l'objectif pedagogique, la duree estimee et une ressource ou un exercice concret.
3. Propose un moyen simple de verifier l'acquisition de chaque competence en fin de parcours.
</instructions>

<output_format>
Un plan de formation en etapes numerotees, avec objectif, duree, ressource/exercice et verification pour chacune.
</output_format>`,
  },
  F31: {
    outils: [
      {
        nom: "Lecture d'image/plan native de ChatGPT (aucune activation necessaire)",
        lien: "https://help.openai.com/en/articles/11084440-images-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant technique, precis dans la lecture de plans.
</system_prompt>

<context>
Voici le plan a analyser : [joindre l'image ou le PDF]. Elements a reperer et compter : [a preciser, ex. prises electriques, fenetres].
</context>

<instructions>
1. Repere sur le plan tous les elements demandes.
2. Compte-les precisement et indique leur emplacement approximatif (piece ou zone du plan).
3. Signale les zones du plan peu lisibles ou ambigues plutot que de deviner.
</instructions>

<output_format>
Un tableau : Element | Nombre trouve | Emplacements (par piece/zone).
</output_format>`,
  },
  F32: {
    outils: [
      {
        nom: "Connecteur Google Drive, SharePoint ou OneDrive (depot des photos de chantier)",
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
Dossier photos connecte : [chemin]. Planning previsionnel des travaux : [joindre ou preciser].
</context>

<instructions>
1. Examine les photos ajoutees depuis la derniere verification.
2. Compare l'avancement visible sur les photos au planning previsionnel fourni.
3. Signale les ecarts apparents (retard visible, travaux manquants) sans affirmer avec certitude ce qui n'est pas clairement visible.
</instructions>

<output_format>
Une synthese de l'avancement, suivie d'une liste des ecarts constates avec le planning.
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
Tu es assistant prevention des risques sur chantier.
</system_prompt>

<context>
Voici le compte-rendu ou les observations de chantier : [joindre/coller]. Referentiel de risques applicable : [a preciser si disponible].
</context>

<instructions>
1. Identifie dans les observations fournies les risques evoques ou implicites (chute, electrique, manutention, etc.).
2. Pour chaque risque, evalue sa gravite potentielle et propose une mesure de prevention concrete.
3. Signale les points ou l'information est insuffisante pour evaluer un risque.
</instructions>

<output_format>
Un tableau : Risque identifie | Gravite estimee | Mesure de prevention proposee.
</output_format>`,
  },
  F34: {
    outils: [
      {
        nom: "Generation et edition d'images ChatGPT",
        lien: "https://help.openai.com/en/articles/11084440-images-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es retoucheur d'images, precis sur les modifications demandees.
</system_prompt>

<context>
Image source : [joindre]. Modifications demandees : [a preciser precisement, element par element].
</context>

<instructions>
1. Applique uniquement les modifications demandees, sans en ajouter d'autres.
2. Si une zone precise doit etre modifiee, selectionne-la avant de decrire la modification pour plus de precision.
3. Signale si une modification demandee semble techniquement difficile a bien realiser (le resultat peut deborder de la zone selectionnee).
</instructions>

<output_format>
L'image modifiee, suivie d'une ligne resumant les modifications appliquees.
</output_format>`,
  },
  F35: {
    outils: [
      {
        nom: "Generation et edition d'images ChatGPT",
        lien: "https://help.openai.com/en/articles/11084440-images-in-chatgpt",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es designer visuel, specialiste des palettes de couleurs.
</system_prompt>

<context>
Visuel source : [joindre]. Palettes de couleurs souhaitees : [liste des variantes attendues].
</context>

<instructions>
1. Pour chaque palette demandee, genere une variante du visuel source avec les couleurs adaptees.
2. Conserve la composition et les elements du visuel d'origine, ne change que les couleurs.
3. Presente les variantes dans l'ordre demande.
</instructions>

<output_format>
Une variante d'image par palette demandee, dans l'ordre de la liste fournie.
</output_format>`,
  },
  F36: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es assistant de recherche dans une transcription video.
</system_prompt>

<context>
ChatGPT n'a pas de connecteur officiel vers un logiciel de montage video (type Descript) a ce jour. Cette tache fonctionne donc a partir d'une transcription textuelle avec timecodes exportee manuellement de votre logiciel de montage : [coller ou joindre la transcription avec timecodes]. Element ou plan recherche : [description precise, ex. "le moment ou la personne sourit face camera"].
</context>

<instructions>
1. Cherche dans la transcription les passages correspondant a la description donnee.
2. Pour chaque passage trouve, indique le timecode et la phrase ou l'indice qui le rend pertinent.
3. Si rien ne correspond clairement, dis-le plutot que de proposer un passage approximatif.
</instructions>

<output_format>
Une liste des timecodes trouves avec, pour chacun, l'extrait correspondant de la transcription.
</output_format>`,
    uneSeuleFois:
      "A la difference de Claude (integration officielle Descript via MCP), ChatGPT n'a pas d'equivalent officiel pour piloter un logiciel de montage video : le contournement ci-dessus (transcription texte + timecodes) est la methode la plus fiable actuellement.",
  },
  F37: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es monteur video, tu prepares un script de montage a partir d'une transcription.
</system_prompt>

<context>
ChatGPT n'a pas de connecteur officiel vers un logiciel de montage video a ce jour : cette tache produit un script de montage a appliquer manuellement. Transcription source avec timecodes : [coller/joindre]. Duree cible du montage : [a preciser]. Angle editorial : [a preciser].
</context>

<instructions>
1. Selectionne dans la transcription les passages les plus pertinents pour l'angle editorial et la duree cible.
2. Ordonne-les dans une sequence coherente (script de montage), avec le timecode de chaque passage retenu.
3. Justifie brievement pourquoi chaque passage a ete retenu.
</instructions>

<output_format>
Un script de montage numerote : Ordre | Timecode | Extrait | Justification.
</output_format>`,
    uneSeuleFois:
      "Le resultat est un script de montage a appliquer soi-meme dans le logiciel de montage : ChatGPT ne decoupe pas la video directement, faute de connecteur officiel vers un outil de montage.",
  },
  F38: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es traducteur de sous-titres, tu respectes les timecodes fournis.
</system_prompt>

<context>
Transcription avec timecodes : [joindre/connecter]. Langue(s) cible(s) des sous-titres : [a preciser].
</context>

<instructions>
1. Traduis chaque ligne de la transcription dans la ou les langues cibles, en conservant le timecode associe.
2. Adapte la longueur des lignes traduites pour rester lisible a l'ecran (raccourcis si necessaire sans perdre le sens).
3. Fournis le resultat au format demande (SRT ou tableau timecode/texte).
</instructions>

<output_format>
Le fichier de sous-titres au format demande, une langue a la fois si plusieurs langues cibles.
</output_format>`,
    uneSeuleFois:
      "ChatGPT ne genere pas de fichier .srt directement depuis une video : il traduit le texte avec timecodes que vous lui fournissez. L'export SRT final se fait en copiant le resultat dans votre logiciel de sous-titrage.",
  },
  F39: {
    outils: [
      {
        nom: "App ElevenLabs dans ChatGPT (officiel, outils voix selon disponibilite au moment de l'usage)",
        lien: "https://openai.com/index/introducing-apps-in-chatgpt/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu m'aides a preparer le nettoyage d'un enregistrement audio.
</system_prompt>

<context>
Enregistrement vocal a nettoyer : [joindre ou traiter via l'app ElevenLabs si disponible]. Problemes constates : [bruit de fond, respirations, hesitations, etc.].
</context>

<instructions>
1. Si l'app ElevenLabs est disponible et connectee, utilise ses outils de nettoyage/isolation de la voix sur l'enregistrement.
2. Sinon, liste precisement les passages problematiques (avec timecode si possible) a traiter dans un logiciel audio.
3. Recommande les reglages ou l'ordre de traitement le plus efficace (bruit de fond avant respirations, etc.).
</instructions>

<output_format>
Le fichier nettoye si l'outil le permet, sinon une liste des passages a traiter avec la recommandation de traitement.
</output_format>`,
    uneSeuleFois:
      "Verifiez au moment de l'usage que l'app ElevenLabs propose bien un outil de nettoyage audio (isolation de la voix) et pas seulement de la synthese vocale : les apps tierces dans ChatGPT evoluent regulierement.",
  },
  F40: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es monteur video, tu prepares un plan de recadrage multi-format.
</system_prompt>

<context>
ChatGPT n'a pas de connecteur officiel vers un logiciel de montage video a ce jour : cette tache produit un plan de recadrage a appliquer manuellement. Video source : [decrire son contenu]. Formats cibles demandes : [ex. 9:16 pour Reels/TikTok, 1:1 pour Instagram feed, 16:9 pour YouTube].
</context>

<instructions>
1. Pour chaque format cible, indique la zone de l'image a conserver a chaque moment cle de la video (sujet principal a garder dans le cadre).
2. Signale les moments ou le recadrage automatique risque de couper un element important (texte a l'ecran, deuxieme personne, etc.).
3. Propose l'ordre de priorite des formats a produire si le temps est limite.
</instructions>

<output_format>
Un plan de recadrage par format : Format | Zone a conserver | Points de vigilance.
</output_format>`,
    uneSeuleFois:
      "Le resultat est un plan a appliquer dans un logiciel de montage ou l'app Canva : ChatGPT ne recadre pas la video directement, faute de connecteur officiel vers un outil de montage.",
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
Tu m'aides a preparer un doublage ou une voix off dans une autre langue.
</system_prompt>

<context>
Script original : [joindre/coller]. Langue cible : [a preciser]. Contraintes de duree : [synchronisation labiale ou non].
</context>

<instructions>
1. Traduis et adapte le script pour la langue cible, en respectant le ton d'origine.
2. Si une synchronisation labiale est demandee, ajuste la longueur des phrases pour rester proche de la duree du texte original.
3. Une fois le script valide, utilise l'app ElevenLabs (si connectee) pour generer la voix off correspondante.
</instructions>

<output_format>
Le script adapte dans la langue cible, suivi du fichier audio genere si l'app le permet.
</output_format>`,
  },
  F42: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu m'aides a preparer un storyboard de sequence video, sans generer la video elle-meme.
</system_prompt>

<context>
IMPORTANT : Sora, l'outil de generation video d'OpenAI, a ete arrete (experiences web/app le 26 avril 2026, API le 24 septembre 2026). A la date de redaction de ce guide (22 septembre 2026), ChatGPT ne propose donc plus aucun outil officiel de generation video. Ce prompt ne produit qu'un storyboard textuel a confier ensuite a un autre outil de generation video ou a un monteur. Objectif de la sequence : [a preciser]. Duree visee : [a preciser]. Style visuel souhaite : [a preciser].
</context>

<instructions>
1. Decoupe la sequence en plans numerotes (5 a 10 plans selon la duree visee).
2. Pour chaque plan, decris precisement : le cadrage, l'action, l'ambiance/lumiere, et une eventuelle indication sonore.
3. Redige egalement, pour chaque plan, un prompt texte pret a etre utilise dans un outil de generation video tiers.
</instructions>

<output_format>
Un storyboard numerote : Plan | Description visuelle | Prompt pret a l'emploi pour un outil de generation video.
</output_format>`,
    uneSeuleFois:
      "Verifiez la disponibilite d'un outil de generation video OpenAI au moment de l'usage : la situation peut avoir change depuis la redaction de ce guide (22 septembre 2026). En l'absence d'outil officiel, ce storyboard peut etre confie a un outil de generation video tiers ou reserve pour le jour ou OpenAI proposera une alternative a Sora.",
  },
};
é
