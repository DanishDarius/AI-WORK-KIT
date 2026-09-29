// Contenu du guide "Mettre en place" pour Claude : outils reels, prompts prets a
// copier (squelette officiel Claude) et configuration des taches planifiees Cowork,
// tache par tache. Source : guide-complet-42-taches-claude.md (sources officielles
// Claude verifiees).
import { MiseEnPlace } from "./mise-en-place-types";

export const miseEnPlaceClaude: Partial<Record<string, MiseEnPlace>> = {
  F01: {
    outils: [
      {
        nom: "Connecteur Gmail ou Microsoft 365 (Outlook)",
        lien: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities",
        type: "officiel",
      },
      {
        nom: "Plugin Productivity",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Tri de la boîte mail",
      frequence: "Quotidien (matin)",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Classe et rédige des brouillons, n'envoie rien automatiquement.",
      prompt: `<system_prompt>
Tu es mon assistant de gestion de boîte mail.
</system_prompt>

<context>
Je reçois de nombreux e-mails chaque jour sur ma boîte connectée. Je veux garder le contrôle sans tout lire moi-même.
</context>

<instructions>
1. Parcours les e-mails non lus reçus depuis ma dernière vérification.
2. Classe-les en trois catégories : Urgent (réponse attendue sous 24h), À traiter (pas urgent mais actionnable), Information (rien à faire).
3. Pour chaque e-mail "Urgent", rédige un brouillon de réponse court et professionnel, sans l'envoyer.
4. Signale les e-mails qui ressemblent à du spam ou du phishing sans les supprimer.
</instructions>

<output_format>
Une liste groupée par catégorie, avec pour chaque e-mail : expéditeur, objet en une ligne, et pour les "Urgent" le brouillon de réponse proposé.
</output_format>`,
    },
  },
  F02: {
    outils: [
      {
        nom: "Plugin Marketing (inclut Canva)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "MCP Buffer (publication programmée)",
        lien: "https://buffer.com/mcp",
        type: "tiers",
      },
      {
        nom: "MCP Hootsuite (publication programmée)",
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
      "Une fois les publications validées, programmez leur envoi vers Buffer ou Hootsuite via le connecteur MCP (fréquence conseillée : hebdomadaire, au moment de préparer le calendrier de la semaine suivante).",
  },
  F03: {
    outils: [
      {
        nom: "Skill native Word (.docx)",
        lien: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",
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
        nom: "Skill native Word (.docx)",
        lien: "https://support.claude.com/en/articles/12111783-using-the-word-skill",
        type: "officiel",
      },
      {
        nom: "Intégration Fireflies (capture automatique de réunions, optionnelle)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de prise de notes en réunion.
</system_prompt>

<context>
Voici la transcription ou l'enregistrement de la réunion : [coller/joindre]. Participants : [liste]. Objectif de la réunion : [à préciser].
</context>

<instructions>
1. Résume les points clés discutés, dans l'ordre chronologique.
2. Liste les décisions prises.
3. Liste les actions à faire avec, si mentionné, le responsable et l'échéance.
4. Signale les points restés en suspens.
</instructions>

<output_format>
Quatre sections : Résumé, Décisions, Actions (tableau Action | Responsable | Échéance), Points en suspens.
</output_format>`,
    tachePlanifiee: {
      nom: "Compte-rendu de réunion récurrente",
      frequence: "Chaque semaine, le jour de la réunion récurrente",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Lit un enregistrement et rédige un compte-rendu, n'envoie rien automatiquement.",
      optionnelle: true,
      prompt: `Chaque semaine, prends le dernier enregistrement de la réunion récurrente dans le dossier partagé et produis le compte-rendu au format habituel (Résumé, Décisions, Actions, Points en suspens).`,
    },
  },
  F05: {
    outils: [
      {
        nom: "Connecteur Google Calendar ou Microsoft 365",
        lien: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities",
        type: "officiel",
      },
      {
        nom: "Plugin Productivity",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Point d'agenda",
      frequence: "Quotidien (veille au soir ou matin)",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Crée ou modifie des événements et invitations visibles par d'autres personnes.",
      prompt: `<system_prompt>
Tu es mon assistant de gestion d'agenda.
</system_prompt>

<context>
Mon calendrier est connecté. Je veux anticiper ma journée/semaine et éviter les conflits.
</context>

<instructions>
1. Vérifie les rendez-vous du jour/de la semaine à venir.
2. Signale tout conflit d'horaires ou rendez-vous sans lieu/lien de visio renseigné.
3. Propose des créneaux libres pour les demandes de rendez-vous en attente.
</instructions>

<output_format>
Une liste chronologique des rendez-vous avec alertes en gras pour les conflits, suivie des créneaux libres proposés.
</output_format>`,
    },
  },
  F06: {
    outils: [
      {
        nom: "Plugin Customer Support (Intercom, HubSpot, Guru, Jira)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "MCP communautaire Zendesk (à vérifier avant mise en prod)",
        lien: "https://github.com/michaelrice/zendesk-mcp",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es agent de support client de premier niveau, courtois et précis.
</system_prompt>

<context>
Voici notre base de connaissances / FAQ : [coller ou connecter la source]. Voici la question du client : [coller le message].
</context>

<instructions>
1. Identifie si la question a une réponse directe dans la base de connaissances.
2. Si oui, rédige une réponse claire et complète en te basant uniquement sur ces informations.
3. Si non, indique que la question doit être escaladée et résume ce qui manque pour y répondre.
</instructions>

<output_format>
La réponse au client (prêt à envoyer), ou la mention "À escalader" suivie du motif.
</output_format>`,
  },
  F07: {
    outils: [
      {
        nom: "Recherche web native de Claude (aucune activation nécessaire)",
        lien: "https://claude.ai/",
        type: "officiel",
      },
      {
        nom: "Claude in Chrome (sites sans flux/API)",
        lien: "https://claude.com/claude-in-chrome",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Veille sectorielle",
      frequence: "Hebdomadaire",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Ne fait que lire et synthétiser des informations publiques, aucune action externe.",
      prompt: `<system_prompt>
Tu es analyste de veille sectorielle.
</system_prompt>

<context>
Secteur à surveiller : [à préciser]. Sources prioritaires : [sites, concurrents, mots-clés].
</context>

<instructions>
1. Recherche les actualités publiées depuis la dernière veille sur le secteur et les mots-clés indiqués.
2. Écarte les doublons et les sources peu fiables.
3. Classe les résultats par importance pour l'activité.
</instructions>

<output_format>
Une liste à puces : titre de l'actualité, source (avec lien), une phrase de résumé, et pourquoi c'est pertinent.
</output_format>`,
    },
  },
  F08: {
    outils: [
      {
        nom: "Skill native Excel (.xlsx) avec formules",
        lien: "https://support.claude.com/en/articles/12650343-use-claude-for-excel",
        type: "officiel",
      },
      {
        nom: "Plugin Data (Snowflake, BigQuery, Databricks, Hex)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste de données.
</system_prompt>

<context>
Voici les données à analyser : [joindre le fichier ou connecter la source]. Objectif du rapport : [à préciser].
</context>

<instructions>
1. Identifie les tendances et chiffres clés pertinents pour l'objectif indiqué.
2. Construis les tableaux et calculs nécessaires.
3. Rédige une synthèse en langage clair, sans jargon technique inutile.
</instructions>

<output_format>
Un fichier Excel avec les données et graphiques, plus une synthèse de 5 à 10 lignes en début de réponse.
</output_format>`,
  },
  F09: {
    outils: [
      {
        nom: "Plugin Canva",
        lien: "https://github.com/anthropics/claude-plugins-official",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de création visuelle marketing.
</system_prompt>

<context>
Objectif du visuel : [à préciser]. Format cible : [post Instagram, bannière, etc.]. Charte graphique : [couleurs, police, logo].
</context>

<instructions>
1. Propose un brief visuel détaillé : composition, textes à inclure, style.
2. Génère le visuel via Canva en respectant la charte graphique.
3. Propose 2 variantes de mise en page.
</instructions>

<output_format>
Le brief écrit, suivi des visuels générés.
</output_format>`,
    uneSeuleFois:
      "La génération d'images native de Claude reste en retrait sur ce type de visuel. Pour un rendu marketing fiable, privilégiez Gemini en complément.",
  },
  F10: {
    outils: [
      {
        nom: "Plugin Sales (HubSpot, Clay, ZoomInfo)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Connecteur MCP Salesforce (si CRM Salesforce)",
        lien: "https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/claude.html",
        type: "officiel",
      },
      {
        nom: "Connecteur HubSpot (si CRM HubSpot)",
        lien: "https://knowledge.hubspot.com/integrations/set-up-and-use-the-hubspot-connector-for-claude",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Nettoyage de la base CRM",
      frequence: "Hebdomadaire",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Modifie des fiches CRM partagées avec l'équipe commerciale.",
      prompt: `<system_prompt>
Tu es assistant de gestion de base CRM.
</system_prompt>

<context>
Base CRM connectée : [HubSpot / Salesforce]. Critères de qualité attendus : [champs obligatoires, format des numéros, doublons à éviter].
</context>

<instructions>
1. Identifie les fiches contact/entreprise incomplètes ou en doublon.
2. Complète les champs manquants à partir des informations disponibles dans le CRM (sans inventer de données).
3. Signale les fiches nécessitant une vérification humaine.
</instructions>

<output_format>
Un tableau : Fiche | Problème détecté | Action prise ou suggestion.
</output_format>`,
    },
  },
  F11: {
    outils: [
      {
        nom: "Skill native PDF (lecture, y compris formulaires)",
        lien: "https://support.claude.com/en/articles/12111827-using-the-pdf-skill",
        type: "officiel",
      },
      {
        nom: "Skill native Excel",
        lien: "https://support.claude.com/en/articles/12650343-use-claude-for-excel",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de saisie de données.
</system_prompt>

<context>
Voici le(s) document(s) source(s) : [joindre]. Voici les champs à extraire : [liste des champs].
</context>

<instructions>
1. Extrait chaque champ demandé depuis le document source.
2. Si un champ est absent ou illisible, indique-le explicitement au lieu de le deviner.
3. Structure le résultat pour import direct dans un tableur.
</instructions>

<output_format>
Un tableau avec une ligne par document et une colonne par champ demandé.
</output_format>`,
  },
  F12: {
    outils: [
      {
        nom: "Connecteur Google Drive ou Microsoft 365",
        lien: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities",
        type: "officiel",
      },
      {
        nom: "Plugin Box (si stockage Box)",
        lien: "https://github.com/anthropics/claude-plugins-official",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Classement des documents",
      frequence: "Hebdomadaire",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Classement et rangement de documents, réversible, aucune suppression.",
      prompt: `<system_prompt>
Tu es assistant de classement documentaire.
</system_prompt>

<context>
Dossier à organiser : [chemin/nom du dossier connecté]. Règle de classement souhaitée : [par date, par client, par type de document].
</context>

<instructions>
1. Parcours les nouveaux documents déposés depuis le dernier passage.
2. Renomme-les selon la convention indiquée si elle existe, sinon propose-en une.
3. Déplace ou tague chaque document selon la règle de classement.
4. Signale les documents ambigus sans les déplacer.
</instructions>

<output_format>
Un journal des actions effectuées (Document | Action | Destination) et la liste des cas ambigus.
</output_format>`,
    },
  },
  F13: {
    outils: [
      {
        nom: "Skill native PDF",
        lien: "https://support.claude.com/en/articles/12111827-using-the-pdf-skill",
        type: "officiel",
      },
      {
        nom: "Connecteur Google Drive (pour récupérer les pièces si besoin)",
        lien: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste documentaire, rigoureux et factuel.
</system_prompt>

<context>
Voici les documents du dossier à analyser ou comparer : [joindre/connecter]. Points de comparaison attendus : [à préciser].
</context>

<instructions>
1. Lis l'ensemble des documents fournis.
2. Relève les points communs, les différences et les incohérences entre les documents.
3. Cite le document source pour chaque élément relevé.
</instructions>

<output_format>
Un tableau comparatif par critère, suivi d'une liste des incohérences identifiées avec référence au document source.
</output_format>`,
  },
  F14: {
    outils: [
      {
        nom: "Skill native Word (.docx)",
        lien: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es traducteur professionnel spécialisé dans les documents d'entreprise.
</system_prompt>

<context>
Document à traduire : [joindre/coller]. Langue source : [à préciser]. Langue cible : [à préciser]. Registre attendu : [formel/informel].
</context>

<instructions>
1. Traduis le document intégralement en conservant la mise en forme.
2. Adapte les expressions idiomatiques et les unités (dates, devises) à la langue et au pays cibles.
3. Signale les termes techniques qui n'ont pas d'équivalent direct et explique le choix fait.
</instructions>

<output_format>
Le document traduit en entier, suivi d'une note sur les choix de traduction délicats.
</output_format>`,
  },
  F15: {
    outils: [
      {
        nom: "Skill native PowerPoint (.pptx)",
        lien: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",
        type: "officiel",
      },
      {
        nom: "Plugin Canva (habillage visuel)",
        lien: "https://github.com/anthropics/claude-plugins-official",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es concepteur de présentations professionnelles.
</system_prompt>

<context>
Voici le brief : [coller le brief]. Public : [à préciser]. Durée de présentation visée : [à préciser]. Charte graphique : [à préciser].
</context>

<instructions>
1. Structure la présentation en sections logiques (introduction, développement, conclusion/appel à l'action).
2. Rédige le contenu de chaque diapositive : titre, points clés, note oratoire courte.
3. Limite le texte à l'essentiel par diapositive (une idée par diapositive).
</instructions>

<output_format>
Un fichier PowerPoint complet, diapositive par diapositive.
</output_format>`,
  },
  F16: {
    outils: [
      {
        nom: "Plugin Productivity (Asana, Linear, Jira, Monday, ClickUp)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Plugin Atlassian (Jira/Confluence, si utilisé)",
        lien: "https://github.com/anthropics/claude-plugins-official",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Point de suivi de projet",
      frequence: "Quotidien ou hebdomadaire selon le rythme du projet",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Modifie un outil de suivi de projet visible par toute l'équipe.",
      prompt: `<system_prompt>
Tu es assistant de suivi de projet.
</system_prompt>

<context>
Outil de gestion de projet connecté : [Asana / Jira / Linear / autre]. Projet à suivre : [nom du projet].
</context>

<instructions>
1. Liste les tâches en retard et celles arrivant à échéance sous 48h.
2. Identifie les tâches bloquées sans mise à jour récente.
3. Rédige un point d'avancement synthétique du projet.
</instructions>

<output_format>
Trois sections : Tâches en retard, Tâches bloquées, Point d'avancement (5 lignes maximum).
</output_format>`,
    },
  },
  F17: {
    outils: [
      {
        nom: "Plugin Sales (HubSpot, Close, Clay, ZoomInfo)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Relances commerciales",
      frequence: "Hebdomadaire (jour de relance défini)",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Envoie des messages de prospection à des tiers externes.",
      prompt: `<system_prompt>
Tu es commercial chargé de la prospection.
</system_prompt>

<context>
Cible : [type de prospect]. CRM connecté : [HubSpot/autre]. Offre à présenter : [à préciser].
</context>

<instructions>
1. Identifie les prospects du CRM n'ayant pas eu de contact depuis plus de 15 jours.
2. Rédige pour chacun un message de relance personnalisé, en te basant sur les échanges précédents enregistrés.
3. Ne génère pas de message pour les prospects marqués "ne pas contacter".
</instructions>

<output_format>
Un tableau : Prospect | Dernier contact | Message de relance proposé.
</output_format>`,
    },
  },
  F18: {
    outils: [
      {
        nom: "Skill native Word/Excel",
        lien: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",
        type: "officiel",
      },
      {
        nom: "Plugin Sales (données client, si CRM connecté)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant commercial chargé des devis.
</system_prompt>

<context>
Client : [nom/infos]. Prestations/produits demandés : [liste avec quantités]. Grille tarifaire : [joindre ou préciser].
</context>

<instructions>
1. Établis le détail du devis ligne par ligne avec les prix de la grille tarifaire fournie.
2. Calcule les totaux HT, TVA et TTC.
3. Rédige un texte d'accompagnement professionnel adapté au client.
</instructions>

<output_format>
Un document (Word ou Excel selon le format demandé) prêt à envoyer, avec le détail chiffré et le texte d'accompagnement.
</output_format>`,
  },
  F19: {
    outils: [
      {
        nom: "Plugin Finance (Snowflake, Databricks, BigQuery)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Serveur MCP QuickBooks (Intuit)",
        lien: "https://github.com/intuit/quickbooks-online-mcp-server",
        type: "officiel",
      },
      {
        nom: "Connecteur Xero (tiers, non vérifié officiellement)",
        lien: "https://xero-connector.meridian.pilot.com/",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Catégorisation des transactions",
      frequence: "Hebdomadaire",
      modeApprobation: "Manuelle",
      raisonApprobation: "Touche des données comptables sensibles.",
      prompt: `<system_prompt>
Tu es assistant comptable.
</system_prompt>

<context>
Logiciel comptable connecté : [QuickBooks/Xero]. Plan comptable en vigueur : [joindre ou préciser].
</context>

<instructions>
1. Liste les transactions non catégorisées depuis le dernier passage.
2. Propose une catégorie pour chacune, en te basant sur le libellé et les catégorisations passées similaires.
3. Signale les transactions ambiguës pour vérification humaine.
</instructions>

<output_format>
Un tableau : Transaction | Montant | Catégorie proposée | Confiance (haute/moyenne/à vérifier).
</output_format>`,
    },
    uneSeuleFois:
      "Déjà connecté votre logiciel comptable pour une autre tâche ? Vous n'avez rien à refaire.",
  },
  F20: {
    outils: [
      {
        nom: "Plugin Finance",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Skill native Excel (tableaux de rapprochement)",
        lien: "https://support.claude.com/en/articles/12650343-use-claude-for-excel",
        type: "officiel",
      },
      {
        nom: "Connecteur QuickBooks ou Xero (même mise en place que F19)",
        lien: "https://github.com/intuit/quickbooks-online-mcp-server",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Rapprochement bancaire",
      frequence: "Hebdomadaire ou mensuelle selon la clôture",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Touche des données financières sensibles ; les écarts doivent être validés avant correction.",
      prompt: `<system_prompt>
Tu es assistant comptable chargé du rapprochement bancaire.
</system_prompt>

<context>
Relevé bancaire : [joindre ou connecter]. Écritures comptables : [connecter le logiciel comptable].
</context>

<instructions>
1. Compare le relevé bancaire aux écritures comptables enregistrées.
2. Identifie les écarts (transactions bancaires sans écriture, écritures sans transaction correspondante).
3. Propose une explication probable pour chaque écart quand c'est possible (délai d'encaissement, frais bancaires, etc.).
</instructions>

<output_format>
Un tableau des écarts : Date | Montant | Côté concerné (banque/comptabilité) | Explication probable.
</output_format>`,
    },
  },
  F21: {
    outils: [
      {
        nom: "Plugin Finance",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Plugin Sales",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Connecteur Gmail ou Microsoft 365 (envoi des relances)",
        lien: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Relances de paiement",
      frequence: "Hebdomadaire",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Contacte directement des clients sur un sujet financier.",
      prompt: `<system_prompt>
Tu es assistant de recouvrement, ferme mais courtois.
</system_prompt>

<context>
Factures impayées : [connecter le logiciel comptable ou joindre le fichier]. Délai de paiement contractuel : [à préciser].
</context>

<instructions>
1. Liste les factures dont l'échéance est dépassée, classées par ancienneté.
2. Rédige un message de relance adapté au niveau de retard (rappel courtois sous 15 jours, ton plus ferme au-delà).
3. Ne génère pas de relance pour les factures déjà signalées en litige.
</instructions>

<output_format>
Un tableau : Client | Facture | Jours de retard | Message de relance proposé.
</output_format>`,
    },
  },
  F22: {
    outils: [
      {
        nom: "Plugin Productivity",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Connecteur Microsoft 365 (Outlook/SharePoint/Teams)",
        lien: "https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector",
        type: "officiel",
      },
      {
        nom: "Connecteur communautaire Dynamics 365 (à valider avant prod, si ERP Dynamics)",
        lien: "https://github.com/zhound420/D365FO-claude-connector",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Suivi des commandes fournisseurs",
      frequence: "Quotidien",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Touche des données partagées avec des fournisseurs externes.",
      prompt: `<system_prompt>
Tu es assistant logistique chargé du suivi des commandes.
</system_prompt>

<context>
Système de commande/ERP connecté : [à préciser]. Fournisseurs prioritaires : [liste].
</context>

<instructions>
1. Liste les commandes en retard de livraison par rapport à la date prévue.
2. Signale tout changement de fournisseur ou de délai communiqué depuis le dernier passage.
3. Propose les relances à envoyer aux fournisseurs concernés.
</instructions>

<output_format>
Un tableau : Commande | Fournisseur | Statut | Action proposée.
</output_format>`,
    },
  },
  F23: {
    outils: [
      {
        nom: "Plugin Data (requêtes SQL, analyse de tendances)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Skill native Excel (restitution)",
        lien: "https://support.claude.com/en/articles/12650343-use-claude-for-excel",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Prévision de la demande",
      frequence: "Mensuelle",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Produit un rapport de prévision, ne passe aucune commande.",
      prompt: `<system_prompt>
Tu es analyste supply chain.
</system_prompt>

<context>
Historique des ventes/consommations : [connecter la source ou joindre le fichier]. Horizon de prévision : [à préciser].
</context>

<instructions>
1. Analyse les tendances de consommation sur l'historique fourni.
2. Établis une prévision de la demande pour la période à venir, en signalant les saisonnalités identifiées.
3. Propose des quantités d'approvisionnement recommandées par référence.
</instructions>

<output_format>
Un tableau Excel : Référence | Prévision de demande | Stock actuel | Quantité à commander recommandée.
</output_format>`,
    },
  },
  F24: {
    outils: [
      {
        nom: "MCP Google Maps (serveur de référence, à héberger soi-même ou via un hébergeur MCP)",
        lien: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/google-maps",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant logistique chargé de la planification des tournées.
</system_prompt>

<context>
Livraisons/interventions du jour : [liste des adresses et contraintes horaires]. Point de départ : [adresse].
</context>

<instructions>
1. Détermine un ordre de passage optimisé pour minimiser le temps de trajet total.
2. Estime la durée de chaque trajet et l'heure d'arrivée prévue à chaque étape.
3. Signale les contraintes horaires qui semblent difficiles à tenir.
</instructions>

<output_format>
Un tableau ordonné : Ordre | Adresse | Heure d'arrivée estimée | Alerte éventuelle.
</output_format>`,
  },
  F25: {
    outils: [
      {
        nom: "Plugin Customer Support (Intercom, HubSpot, Guru, Jira)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Tri des demandes clients",
      frequence: "Quotidien, plusieurs fois par jour si volume élevé",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Orienté des demandes clients, contact potentiellement visible par le client.",
      prompt: `<system_prompt>
Tu es assistant de tri des demandes clients.
</system_prompt>

<context>
Canal(aux) surveillé(s) : [ticketing/boîte mail connectée]. Équipes disponibles : [liste avec leur domaine].
</context>

<instructions>
1. Classe chaque nouvelle demande par sujet et par urgence.
2. Oriente chaque demande vers l'équipe la plus pertinente parmi celles listées.
3. Signale les demandes en double avec un ticket existant.
</instructions>

<output_format>
Un tableau : Demande | Sujet | Urgence | Équipe assignée.
</output_format>`,
    },
  },
  F26: {
    outils: [
      {
        nom: "Plugin Data ou Marketing (Amplitude)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "Skill native Excel (synthèse chiffrée)",
        lien: "https://support.claude.com/en/articles/12650343-use-claude-for-excel",
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
1. Identifie les thèmes récurrents, positifs et négatifs.
2. Quantifie la part de chaque theme dans l'ensemble des avis.
3. Propose 3 actions concrètes à partir des points négatifs les plus fréquents.
</instructions>

<output_format>
Un tableau des thèmes avec leur fréquence, suivi de 3 recommandations d'action.
</output_format>`,
  },
  F27: {
    outils: [
      {
        nom: "Plugin Data ou Marketing (Klaviyo pour l'activation des segments)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
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
1. Propose des critères de segmentation pertinents pour l'objectif indiqué.
2. Constitue les segments à partir des données disponibles.
3. Décris chaque segment en une phrase et sa taille.
</instructions>

<output_format>
Un tableau : Segment | Critères | Taille | Description courte.
</output_format>`,
  },
  F28: {
    outils: [
      {
        nom: "Plugin Marketing (Klaviyo, Amplitude, SimilarWeb, Ahrefs)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
      {
        nom: "MCP tiers Google Ads (à évaluer avant connexion d'un compte réel)",
        lien: "https://mcp-ads.com/",
        type: "tiers",
      },
      {
        nom: "MCP tiers Meta Ads (à évaluer avant connexion d'un compte réel)",
        lien: "https://pasqualepillitteri.it/en/news/1707/official-meta-ads-mcp-claude-29-tools-2026",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Optimisation publicitaire",
      frequence: "Hebdomadaire",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Modifie des budgets publicitaires réels sur des plateformes externes.",
      prompt: `<system_prompt>
Tu es assistant en optimisation publicitaire.
</system_prompt>

<context>
Comptes publicitaires connectés : [Google Ads/Meta Ads]. Objectif de campagne : [à préciser, ex. CPA cible].
</context>

<instructions>
1. Analyse les performances des campagnes actives depuis le dernier passage.
2. Identifie les campagnes/annonces sous-performantes par rapport à l'objectif.
3. Propose des ajustements concrets (budget, ciblage, enchère) sans les appliquer automatiquement.
</instructions>

<output_format>
Un tableau : Campagne | Indicateur clé | Écart à l'objectif | Ajustement proposé.
</output_format>`,
    },
  },
  F29: {
    outils: [
      {
        nom: "Skill native PDF (lecture des CV)",
        lien: "https://support.claude.com/en/articles/12111827-using-the-pdf-skill",
        type: "officiel",
      },
      {
        nom: "Skill native Excel (grille de scoring)",
        lien: "https://support.claude.com/en/articles/12650343-use-claude-for-excel",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant recrutement.
</system_prompt>

<context>
Voici les CV à examiner : [joindre]. Voici la fiche de poste et les critères attendus : [joindre/coller].
</context>

<instructions>
1. Évalue chaque candidature par rapport aux critères de la fiche de poste.
2. Attribue une note ou un niveau d'adéquation par critère, sans porter de jugement sur des éléments hors critères professionnels.
3. Classe les candidatures de la plus à la moins adéquate.
</instructions>

<output_format>
Un tableau : Candidat | Note par critère | Score global | Points forts | Points de vigilance.
</output_format>`,
  },
  F30: {
    outils: [
      {
        nom: "Skill native PowerPoint/Word",
        lien: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",
        type: "officiel",
      },
      {
        nom: "Plugin Productivity (Notion, pour le suivi si besoin)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es concepteur pédagogique.
</system_prompt>

<context>
Profil de l'apprenant : [niveau, poste, objectifs]. Compétences à acquérir : [liste].
</context>

<instructions>
1. Découpe le parcours en modules progressifs.
2. Pour chaque module, précise l'objectif, le contenu et la durée estimée.
3. Propose un format d'évaluation pour chaque module.
</instructions>

<output_format>
Un plan de formation structuré par module (Objectif | Contenu | Durée | Évaluation).
</output_format>`,
  },
  F31: {
    outils: [
      {
        nom: "Lecture d'image/plan native de Claude (aucune activation nécessaire)",
        lien: "https://claude.ai/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant technique spécialisé dans la lecture de plans.
</system_prompt>

<context>
Voici le plan à analyser : [joindre l'image ou le PDF]. Éléments à repérer et compter : [à préciser, ex. prises électriques, fenêtres].
</context>

<instructions>
1. Repère chaque occurrence de l'élément demandé sur le plan.
2. Compte le nombre total d'occurrences.
3. Signale les zones où la lecture est incertaine (qualité d'image, symboles ambigus).
</instructions>

<output_format>
Le total par élément demandé, suivi d'une liste des zones incertaines.
</output_format>`,
  },
  F32: {
    outils: [
      {
        nom: "Connecteur Google Drive ou Microsoft 365 (dépôt des photos de chantier)",
        lien: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Suivi de chantier",
      frequence: "Hebdomadaire",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Produit un rapport de suivi interne, aucune action externe.",
      prompt: `<system_prompt>
Tu es assistant de suivi de chantier.
</system_prompt>

<context>
Dossier photos connecté : [chemin]. Planning prévisionnel des travaux : [joindre ou préciser].
</context>

<instructions>
1. Compare les nouvelles photos déposées depuis le dernier passage au planning prévisionnel.
2. Estime l'avancement visible par rapport aux jalons prévus.
3. Signale tout écart apparent avec le planning.
</instructions>

<output_format>
Un point d'avancement synthétique (5 à 10 lignes) avec, si pertinent, les écarts identifiés.
</output_format>`,
    },
  },
  F33: {
    outils: [
      {
        nom: "Skill native PDF/Word (rapport de risques)",
        lien: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant HSE (hygiène, sécurité, environnement) sur chantier.
</system_prompt>

<context>
Voici le compte-rendu ou les observations de chantier : [joindre/coller]. Référentiel de risques applicable : [à préciser si disponible].
</context>

<instructions>
1. Identifie les points de risque mentionnés ou observables dans le compte-rendu.
2. Classe-les par niveau de gravité et de probabilité.
3. Propose une action corrective pour chaque risque identifié.
</instructions>

<output_format>
Un tableau : Risque | Gravité | Probabilité | Action corrective proposée, trié du plus critique au moins critique.
</output_format>`,
  },
  F34: {
    outils: [
      {
        nom: "Plugin Canva ou Adobe for creativity",
        lien: "https://github.com/anthropics/claude-plugins-official",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de retouche image.
</system_prompt>

<context>
Image source : [joindre]. Modifications demandées : [à préciser précisément, élément par élément].
</context>

<instructions>
1. Décris précisément chaque modification à apporter, élément par élément.
2. Applique les modifications réalisables via Canva/Adobe.
3. Signale les modifications qui dépassent les capacités de l'outil et nécessitent Gemini ou un graphiste.
</instructions>

<output_format>
L'image modifiée (ou le brief détaillé si la retouche doit être faite ailleurs), suivie de la liste des limites rencontrées.
</output_format>`,
    uneSeuleFois:
      "La retouche d'image fine reste une limite connue de Claude : privilégiez Gemini pour ce cas précis, Claude pouvant rédiger le brief de retouche et piloter Canva/Adobe pour les modifications simples.",
  },
  F35: {
    outils: [
      {
        nom: "Plugin Canva",
        lien: "https://github.com/anthropics/claude-plugins-official",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de déploiement graphique.
</system_prompt>

<context>
Visuel source : [joindre]. Palettes de couleurs souhaitées : [liste des variantes attendues].
</context>

<instructions>
1. Génère une variante du visuel pour chaque palette demandée, via Canva.
2. Conserve la composition et les textes du visuel d'origine.
3. Indique pour chaque variante si le rendu est fidèle ou approximatif.
</instructions>

<output_format>
Une variante par palette demandée, avec une note de fidélité pour chacune.
</output_format>`,
    uneSeuleFois:
      "Même limite que la retouche d'image : Gemini est recommandé pour un rendu fiable sur des variantes colorimétriques complexes.",
  },
  F36: {
    outils: [
      {
        nom: "MCP officiel Descript",
        lien: "https://help.descript.com/api-and-mcp/mcp",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant monteur vidéo.
</system_prompt>

<context>
Projet Descript connecté : [nom du projet]. Élément ou plan recherché : [description précise, ex. "le moment où la personne sourit face caméra"].
</context>

<instructions>
1. Parcours la transcription des rushes pour repérer les passages correspondant à la description.
2. Indique le code temporel (timecode) de chaque passage trouvé.
3. Classe les passages du plus au moins pertinent.
</instructions>

<output_format>
Un tableau : Rush | Timecode | Description du plan | Pertinence.
</output_format>`,
  },
  F37: {
    outils: [
      {
        nom: "MCP officiel Descript (même mise en place que F36)",
        lien: "https://help.descript.com/api-and-mcp/mcp",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es monteur vidéo assistant.
</system_prompt>

<context>
Projet Descript connecté : [nom]. Transcription source : [connectée via Descript]. Durée cible du montage : [à préciser]. Angle éditorial : [à préciser].
</context>

<instructions>
1. Sélectionne dans la transcription les passages qui servent l'angle éditorial indiqué.
2. Ordonne-les de façon cohérente pour respecter la durée cible.
3. Effectue un premier assemblage dans Descript à partir de cette sélection.
</instructions>

<output_format>
La liste ordonnée des passages retenus avec timecodes, suivie de la confirmation de l'assemblage effectué dans Descript.
</output_format>`,
  },
  F38: {
    outils: [
      {
        nom: "MCP officiel Descript (utile si le fichier vidéo est déjà dans ce projet)",
        lien: "https://help.descript.com/api-and-mcp/mcp",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es sous-titreur professionnel.
</system_prompt>

<context>
Transcription avec timecodes : [joindre/connecter]. Langue(s) cible(s) des sous-titres : [à préciser].
</context>

<instructions>
1. Découpe la transcription en sous-titres respectant une longueur lisible (environ 40 caractères par ligne, 2 lignes maximum).
2. Aligne chaque sous-titre sur les timecodes fournis.
3. Traduis dans la ou les langues cibles demandées si différent de la langue source.
</instructions>

<output_format>
Un fichier de sous-titres au format SRT (numéro, timecode, texte) pour chaque langue demandée.
</output_format>`,
    uneSeuleFois:
      "Aucune activation nécessaire au-delà de la transcription (voir F04).",
  },
  F39: {
    outils: [
      {
        nom: "MCP officiel ElevenLabs",
        lien: "https://github.com/elevenlabs/elevenlabs-mcp",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de post-production audio.
</system_prompt>

<context>
Enregistrement vocal à nettoyer : [joindre ou connecter via ElevenLabs]. Problèmes constatés : [bruit de fond, respirations, hésitations, etc.].
</context>

<instructions>
1. Identifie les défauts à corriger (bruit de fond, respirations, silences trop longs, hésitations).
2. Applique le nettoyage via ElevenLabs.
3. Confirme les traitements appliqués.
</instructions>

<output_format>
Le fichier audio nettoyé, suivi de la liste des traitements appliqués.
</output_format>`,
  },
  F40: {
    outils: [
      {
        nom: "Plugin Adobe for creativity",
        lien: "https://github.com/anthropics/claude-plugins-official",
        type: "officiel",
      },
      {
        nom: "MCP Descript (si le montage est déjà dans ce projet)",
        lien: "https://help.descript.com/api-and-mcp/mcp",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de déploiement vidéo multi-format.
</system_prompt>

<context>
Vidéo source : [joindre ou connecter]. Formats cibles demandés : [ex. 9:16 pour Reels/TikTok, 1:1 pour Instagram feed, 16:9 pour YouTube].
</context>

<instructions>
1. Pour chaque format cible, détermine le recadrage qui garde le sujet principal dans le cadre.
2. Génère un export par format demandé.
3. Signale les formats où le recadrage entraîne une perte d'information importante.
</instructions>

<output_format>
Un export vidéo par format demandé, avec une note pour chaque format sur la qualité du recadrage.
</output_format>`,
  },
  F41: {
    outils: [
      {
        nom: "MCP officiel ElevenLabs (même mise en place que F39)",
        lien: "https://github.com/elevenlabs/elevenlabs-mcp",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es adaptateur de doublage.
</system_prompt>

<context>
Script original : [joindre/coller]. Langue cible : [à préciser]. Contraintes de durée : [synchronisation labiale ou non].
</context>

<instructions>
1. Traduis et adapte le script pour la langue cible, en respectant le rythme et la durée des répliques d'origine.
2. Indique pour chaque réplique le timecode d'origine.
3. Prépare le texte final au format attendu par ElevenLabs pour la génération vocale.
</instructions>

<output_format>
Un tableau : Timecode | Texte original | Texte adapté pour le doublage.
</output_format>`,
    uneSeuleFois:
      "Limite connue de Claude sur la génération vocale native : ElevenLabs (via le MCP) ou Gemini restent les solutions fiables, Claude servant à préparer et structurer le texte à doubler.",
  },
  F42: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es scénariste de contenus vidéo courts.
</system_prompt>

<context>
Objectif de la séquence : [à préciser]. Durée visée : [à préciser]. Style visuel souhaité : [à préciser].
</context>

<instructions>
1. Décris précisément la séquence attendue : décor, action, mouvement de caméra, ambiance.
2. Découpe la description en plans distincts si la séquence dépasse quelques secondes.
3. Rédige le prompt final au format attendu par un outil de génération vidéo.
</instructions>

<output_format>
Le brief plan par plan, suivi du prompt final prêt à copier dans Gemini.
</output_format>`,
    uneSeuleFois:
      "Aucun outil natif Claude pour la génération vidéo. Gemini (Veo) est la solution recommandée ; Claude peut en revanche rédiger le brief/scénario détaillé à fournir à Gemini.",
  },
};
