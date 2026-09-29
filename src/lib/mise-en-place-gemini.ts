// Contenu du guide "Mettre en place" pour Gemini : outils reels, prompts prets a
// copier et configuration des actions planifiees Gemini, tache par tache.
// Source : guide-complet-42-taches-gemini.md (sources officielles Google verifiees,
// recherches menees en septembre 2026). Gemini n'a pas de reglage d'approbation
// automatique/manuelle sur les actions planifiees (contrairement a Cowork) : quand
// une tache planifiee touche a de l'envoi ou de la creation, le prompt l'interdit
// explicitement plutot que de s'appuyer sur un reglage dedie (voir modeApprobation
// absent sur les entrees ci-dessous).
import { MiseEnPlace } from "./mise-en-place-types";

export const miseEnPlaceGemini: Partial<Record<string, MiseEnPlace>> = {
  F01: {
    outils: [
      {
        nom: "Application connectée Gmail (compte personnel)",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
      {
        nom: "Gemini dans Gmail (compte Workspace)",
        lien: "https://support.google.com/mail/answer/13952129",
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
Je reçois de nombreux e-mails chaque jour sur ma boîte Gmail connectée. Je veux garder le contrôle sans tout lire moi-même.
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
      "Gemini n'a pas de réglage d'approbation automatique/manuelle comme Cowork : le prompt interdit explicitement l'envoi automatique, ce qui joue le même rôle.",
  },
  F02: {
    outils: [
      {
        nom: "Nano Banana Pro (génération de visuels, natif)",
        lien: "https://gemini.google/overview/image-generation/",
        type: "officiel",
      },
      {
        nom: "Application personnalisée MCP Buffer ou Hootsuite (planification multi-réseaux)",
        lien: "https://support.google.com/gemini/answer/17209137",
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
      "Générez les visuels avec Nano Banana Pro, puis programmez leur envoi vers Buffer/Hootsuite via l'application personnalisée MCP (fréquence : hebdomadaire, jour de préparation du calendrier de la semaine suivante).",
  },
  F03: {
    outils: [
      {
        nom: "Gemini dans Google Docs",
        lien: "https://support.google.com/docs/answer/15123226",
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
        nom: "Gemini dans Google Meet (notes et transcript automatiques)",
        lien: "https://support.google.com/docs/answer/15123226",
        type: "officiel",
      },
      {
        nom: "Gemini Notebook (analyse d'un enregistrement fourni)",
        lien: "https://workspace.google.com/products/notebooklm/",
        type: "officiel",
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
  },
  F05: {
    outils: [
      {
        nom: "Application connectée Google Calendar",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Préparation de l'agenda",
      frequence: "Quotidien (veille au soir ou matin)",
      prompt: `<system_prompt>
Tu es mon assistant de gestion d'agenda.
</system_prompt>

<context>
Mon calendrier Google est connecté. Je veux anticiper ma journée/semaine et éviter les conflits.
</context>

<instructions>
1. Vérifie les rendez-vous du jour/de la semaine à venir.
2. Signale tout conflit d'horaires ou rendez-vous sans lieu/lien de visio renseigné.
3. Propose des créneaux libres pour les demandes de rendez-vous en attente, sans créer d'événement toi-même.
</instructions>

<output_format>
Une liste chronologique des rendez-vous avec alertes en gras pour les conflits, suivie des créneaux libres proposés.
</output_format>`,
    },
    uneSeuleFois:
      "Le prompt interdit explicitement la création automatique d'événements, faute de réglage d'approbation natif sur les actions planifiées Gemini.",
  },
  F06: {
    outils: [
      {
        nom: "Gem dédié support client (FAQ en source permanente)",
        lien: "https://support.google.com/gemini/answer/15146780",
        type: "officiel",
      },
      {
        nom: "Application personnalisée MCP Zendesk ou Intercom (si ticketing hors Google)",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es agent de support client de premier niveau, courtois et précis.
</system_prompt>

<context>
Voici notre base de connaissances / FAQ : [coller ou joindre en source du Gem]. Voici la question du client : [coller le message].
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
        nom: "Recherche Approfondie (Deep Research)",
        lien: "https://support.google.com/gemini/answer/15719111",
        type: "officiel",
      },
      {
        nom: "Gemini dans Chrome (Auto Browse)",
        lien: "https://gemini.google/overview/gemini-in-chrome/",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Veille sectorielle hebdomadaire",
      frequence: "Hebdomadaire (début de semaine)",
      prompt: `<system_prompt>
Tu es analyste de veille sectorielle.
</system_prompt>

<context>
Secteur à surveiller : [à préciser]. Concurrents/sources à suivre en priorité : [liste].
</context>

<instructions>
1. Utilise la Recherche Approfondie pour identifier les actualités, lancements et mouvements marquants de la semaine écoulée dans ce secteur.
2. Classe les informations par niveau d'importance pour mon activité.
3. Pour chaque information retenue, indique la source et un lien.
</instructions>

<output_format>
Une liste triée par importance : Titre | Résumé en 2 lignes | Impact potentiel | Source (lien).
</output_format>`,
    },
  },
  F08: {
    outils: [
      {
        nom: "Gemini dans Google Sheets (analyse multi-tableaux, formules)",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste de données, précis et pédagogue.
</system_prompt>

<context>
Voici les données à analyser : [joindre le fichier ou préciser la feuille Sheets]. Question métier à laquelle répondre : [à préciser].
</context>

<instructions>
1. Identifie les tendances et anomalies principales dans les données.
2. Réponds précisément à la question métier posée, avec les chiffres à l'appui.
3. Propose 2 à 3 visualisations pertinentes (graphique à créer dans Sheets) pour illustrer les résultats.
</instructions>

<output_format>
Un résumé en 5 lignes maximum, suivi des chiffres clés en tableau, puis les graphiques suggérés avec leur type (barres, courbe, camembert).
</output_format>`,
  },
  F09: {
    outils: [
      {
        nom: "Nano Banana Pro (génération d'image native)",
        lien: "https://gemini.google/overview/image-generation/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es directeur artistique spécialisé dans les visuels marketing.
</system_prompt>

<context>
Objectif du visuel : [à préciser]. Charte graphique / couleurs de marque : [à préciser]. Format cible : [carré Instagram / bandeau LinkedIn / story 9:16 / etc.].
</context>

<instructions>
1. Génère un visuel correspondant à l'objectif et au format demandés.
2. Respecte la charte graphique indiquée (couleurs, style).
3. Propose 2 variantes si le brief laisse une marge d'interprétation.
</instructions>

<output_format>
Le ou les visuels générés, avec une courte explication du choix de composition pour chacun.
</output_format>`,
  },
  F10: {
    outils: [
      {
        nom: "Gemini dans Google Sheets (export CRM)",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
      {
        nom: "Application personnalisée MCP HubSpot ou Salesforce",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de qualification de données CRM.
</system_prompt>

<context>
Voici l'export de la base CRM : [joindre le fichier]. Champs obligatoires attendus : [liste].
</context>

<instructions>
1. Repère les doublons (même entreprise/contact avec des variantes d'orthographe).
2. Signale les fiches avec des champs obligatoires manquants ou visiblement erronés (email invalide, téléphone incomplet).
3. Propose une normalisation des intitulés (secteur d'activité, taille d'entreprise) selon une liste de référence si fournie.
</instructions>

<output_format>
Un tableau des anomalies : Ligne | Problème détecté | Correction proposée, suivi d'un résumé chiffré (nombre de doublons, de champs manquants).
</output_format>`,
  },
  F11: {
    outils: [
      {
        nom: "Analyse native de fichiers Gemini (PDF, image, tableau)",
        lien: "https://support.google.com/gemini/answer/14903178",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de saisie de données, précis et exhaustif.
</system_prompt>

<context>
Voici le ou les documents source : [joindre]. Champs à extraire pour la saisie : [liste précise].
</context>

<instructions>
1. Extrais chaque champ demandé depuis les documents fournis.
2. Si une information est absente ou ambiguë, indique-le clairement au lieu de l'inventer.
3. Présente le résultat au format directement copiable dans l'outil de saisie cible.
</instructions>

<output_format>
Un tableau : Champ | Valeur extraite | Source (nom du document) | Fiabilité (certaine / à vérifier).
</output_format>`,
  },
  F12: {
    outils: [
      {
        nom: "Gemini dans Google Drive (recherche et organisation)",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Classement des nouveaux documents",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant de classement documentaire.
</system_prompt>

<context>
Mon Google Drive est connecté. Nouveaux documents déposés dans le dossier [à préciser] chaque semaine, à classer selon la nomenclature : [règles de nommage et arborescence].
</context>

<instructions>
1. Identifie les nouveaux documents déposés depuis la dernière vérification.
2. Propose pour chacun un nom conforme à la nomenclature et un dossier de destination.
3. Signale les documents dont le contenu ne permet pas de déterminer clairement le classement.
</instructions>

<output_format>
Un tableau : Document | Nom proposé | Dossier de destination proposé | À vérifier (oui/non).
</output_format>`,
    },
  },
  F13: {
    outils: [
      {
        nom: "Gemini Notebook (analyse ancrée sur les sources fournies)",
        lien: "https://workspace.google.com/products/notebooklm/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste documentaire rigoureux.
</system_prompt>

<context>
Voici les documents du dossier à analyser et comparer : [joindre ou ajouter comme sources]. Point de comparaison recherché : [à préciser].
</context>

<instructions>
1. Résume le contenu de chaque document en 3 lignes maximum.
2. Compare les documents sur le point demandé, en citant précisément les passages concernés.
3. Signale les contradictions ou incohérences entre documents si tu en relèves.
</instructions>

<output_format>
Un résumé par document, suivi d'un tableau comparatif sur le point demandé, et enfin la liste des incohérences relevées.
</output_format>`,
  },
  F14: {
    outils: [
      {
        nom: "Traduction native multilingue Gemini",
        lien: "https://gemini.google/overview/apps/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es traducteur professionnel spécialisé dans les documents d'entreprise.
</system_prompt>

<context>
Voici le document à traduire : [coller/joindre]. Langue cible : [à préciser]. Registre attendu : [formel / familier / technique].
</context>

<instructions>
1. Traduis intégralement le document dans la langue cible.
2. Adapte les formulations idiomatiques et les unités (dates, devises, mesures) à la langue et au pays cibles.
3. Signale les termes techniques ou noms propres qui n'ont pas d'équivalent direct et la solution retenue.
</instructions>

<output_format>
Le document traduit en entier, suivi d'une liste des termes signalés avec la solution retenue.
</output_format>`,
  },
  F15: {
    outils: [
      {
        nom: "Gemini dans Google Slides",
        lien: "https://support.google.com/docs/answer/15123226",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es consultant en communication, spécialiste des présentations professionnelles.
</system_prompt>

<context>
Voici le brief de la présentation : [objectif, public, message clé, durée]. Charte graphique : [à préciser].
</context>

<instructions>
1. Propose un plan de diapositives (titre de chaque diapositive et son contenu principal).
2. Rédige le texte de chaque diapositive, concis et orienté message.
3. Suggère pour chaque diapositive un visuel ou un type de graphique pertinent.
</instructions>

<output_format>
Une diapositive par section : Numéro | Titre | Texte | Visuel suggéré.
</output_format>`,
  },
  F16: {
    outils: [
      {
        nom: "Gemini dans Google Tasks / Google Keep",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
      {
        nom: "Application personnalisée MCP Asana, Jira ou Monday",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Point de suivi de projet",
      frequence: "Quotidien ou hebdomadaire selon le rythme du projet",
      prompt: `<system_prompt>
Tu es assistant de gestion de projet.
</system_prompt>

<context>
Voici la liste des tâches et leur statut : [connecter la source ou coller l'export]. Échéance du projet : [à préciser].
</context>

<instructions>
1. Identifie les tâches en retard par rapport à leur échéance.
2. Identifie les tâches bloquantes pour la suite du projet.
3. Propose un point de suivi synthétique.
</instructions>

<output_format>
Trois sections : Tâches en retard, Tâches bloquantes, Point de suivi synthétique (5 lignes maximum).
</output_format>`,
    },
  },
  F17: {
    outils: [
      {
        nom: "Gem dédié prospection commerciale",
        lien: "https://support.google.com/gemini/answer/15146780",
        type: "officiel",
      },
      {
        nom: "Application connectée Gmail (brouillons uniquement)",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es commercial spécialisé dans la prospection B2B personnalisée.
</system_prompt>

<context>
Voici la fiche du prospect : [informations disponibles]. Notre offre : [à préciser]. Dernier contact avec ce prospect : [date et contenu si relance].
</context>

<instructions>
1. Rédige un message de prospection ou de relance personnalisé à partir des informations du prospect.
2. Mets en avant le bénéfice le plus pertinent pour son profil/secteur.
3. Termine par un appel à l'action clair et simple.
</instructions>

<output_format>
Le message prêt à copier (objet + corps), en brouillon uniquement, jamais envoyé automatiquement.
</output_format>`,
  },
  F18: {
    outils: [
      {
        nom: "Gemini dans Google Docs / Google Sheets",
        lien: "https://support.google.com/docs/answer/15123226",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant commercial chargé de préparer des devis.
</system_prompt>

<context>
Voici le besoin du client : [à préciser]. Grille tarifaire / prestations disponibles : [joindre ou coller].
</context>

<instructions>
1. Sélectionne les prestations correspondant au besoin exprimé.
2. Calcule le total avec, si pertinent, les remises applicables.
3. Rédige les conditions habituelles (validité de l'offre, délais, modalités de paiement) à partir des éléments fournis.
</instructions>

<output_format>
Le devis structuré : Prestation | Quantité | Prix unitaire | Total, suivi des conditions et du total général.
</output_format>`,
  },
  F19: {
    outils: [
      {
        nom: "Gemini dans Google Sheets",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
      {
        nom: "Application personnalisée MCP QuickBooks ou Xero",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Catégorisation des transactions",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant comptable chargé de la catégorisation des transactions.
</system_prompt>

<context>
Voici l'export des transactions de la période : [joindre]. Plan de comptes / catégories à utiliser : [liste].
</context>

<instructions>
1. Catégorise chaque transaction selon le plan de comptes fourni.
2. Signale les transactions ambiguës ou inhabituelles nécessitant une vérification humaine.
3. Ne valide aucune écriture définitive toi-même.
</instructions>

<output_format>
Un tableau : Date | Libellé | Montant | Catégorie proposée | À vérifier (oui/non).
</output_format>`,
    },
  },
  F20: {
    outils: [
      {
        nom: "Gemini dans Google Sheets",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
      {
        nom: "Application personnalisée MCP du logiciel comptable utilisé",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Rapprochement bancaire",
      frequence: "Hebdomadaire ou mensuel selon le volume",
      prompt: `<system_prompt>
Tu es assistant comptable chargé du rapprochement bancaire.
</system_prompt>

<context>
Voici le relevé bancaire de la période : [joindre]. Voici le grand livre / journal correspondant : [joindre].
</context>

<instructions>
1. Rapproche chaque ligne du relevé bancaire avec l'écriture comptable correspondante.
2. Liste les écarts : opérations bancaires sans écriture, écritures sans opération bancaire, montants différents.
3. Propose une explication probable pour chaque écart quand c'est possible (délai d'encaissement, frais bancaires, etc.).
</instructions>

<output_format>
Un tableau des écarts : Opération | Montant | Type d'écart | Explication probable, suivi du solde final rapproché.
</output_format>`,
    },
  },
  F21: {
    outils: [
      {
        nom: "Application connectée Gmail",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
      {
        nom: "Gemini dans Google Sheets (suivi des échéances)",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Suivi des impayés",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant de recouvrement, ferme mais courtois.
</system_prompt>

<context>
Voici la liste des factures avec leur statut et leur échéance : [joindre]. Politique de relance : [ex. relance à J+7, J+15, J+30].
</context>

<instructions>
1. Identifie les factures en retard selon la politique de relance.
2. Rédige pour chacune un brouillon de relance adapté au niveau de retard (ton progressif).
3. Ne les envoie jamais automatiquement.
</instructions>

<output_format>
Un tableau : Client | Facture | Montant | Jours de retard | Niveau de relance, suivi des brouillons de message correspondants.
</output_format>`,
    },
  },
  F22: {
    outils: [
      {
        nom: "Application connectée Gmail et Google Sheets",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
      {
        nom: "Application personnalisée MCP de l'ERP utilisé (si applicable)",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Suivi des commandes fournisseurs",
      frequence: "Quotidien ou hebdomadaire selon le volume",
      prompt: `<system_prompt>
Tu es assistant de suivi des achats et approvisionnements.
</system_prompt>

<context>
Voici la liste des commandes en cours avec fournisseur et statut : [joindre]. Notifications fournisseurs reçues : [connecter Gmail ou coller].
</context>

<instructions>
1. Identifie les commandes dont le statut a changé (retard, expédition, annulation) d'après les notifications reçues.
2. Signale les commandes dont la date de livraison prévue est dépassée sans nouvelle.
3. Résume les changements à répercuter dans le suivi.
</instructions>

<output_format>
Un tableau : Commande | Fournisseur | Ancien statut | Nouveau statut | Action à faire.
</output_format>`,
    },
  },
  F23: {
    outils: [
      {
        nom: "Gemini dans Google Sheets (formules de prévision)",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Prévision des approvisionnements",
      frequence: "Mensuel",
      prompt: `<system_prompt>
Tu es assistant logistique chargé des prévisions d'approvisionnement.
</system_prompt>

<context>
Voici l'historique des ventes/sorties de stock par référence : [joindre]. Stock actuel : [joindre ou préciser].
</context>

<instructions>
1. Identifie les tendances et saisonnalités par référence sur l'historique fourni.
2. Établis une prévision de la demande pour la période à venir.
3. Propose des quantités d'approvisionnement recommandées par référence.
</instructions>

<output_format>
Un tableau : Référence | Prévision de demande | Stock actuel | Quantité à commander recommandée.
</output_format>`,
    },
  },
  F24: {
    outils: [
      {
        nom: "Informations Google Maps utilisées automatiquement par Gemini",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Planification de tournée",
      frequence: "Quotidien (veille ou matin du jour de tournée)",
      prompt: `<system_prompt>
Tu es assistant logistique chargé de la planification des tournées.
</system_prompt>

<context>
Livraisons/interventions du jour : [liste des adresses et contraintes horaires]. Point de départ : [adresse].
</context>

<instructions>
1. Détermine un ordre de passage optimisé pour minimiser le temps de trajet total, en te basant sur les informations Google Maps disponibles.
2. Estime la durée de chaque trajet et l'heure d'arrivée prévue à chaque étape.
3. Signale les contraintes horaires qui semblent difficiles à tenir.
</instructions>

<output_format>
Un tableau ordonné : Ordre | Adresse | Heure d'arrivée estimée | Alerte éventuelle.
</output_format>`,
    },
  },
  F25: {
    outils: [
      {
        nom: "Gem dédié triage support client",
        lien: "https://support.google.com/gemini/answer/15146780",
        type: "officiel",
      },
      {
        nom: "Application connectée Gmail ou application personnalisée MCP du ticketing utilisé",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de triage des demandes clients.
</system_prompt>

<context>
Voici la demande client reçue : [coller]. Services disponibles pour orientation : [liste : SAV, commercial, facturation, technique].
</context>

<instructions>
1. Identifie le sujet principal de la demande.
2. Détermine le service le plus adapté pour la traiter.
3. Évalue le niveau d'urgence (faible / moyen / élevé).
</instructions>

<output_format>
Sujet | Service d'orientation proposé | Urgence | Justification en une ligne.
</output_format>`,
  },
  F26: {
    outils: [
      {
        nom: "Gemini dans Google Sheets",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
      {
        nom: "Recherche Approfondie (collecte d'avis publics en ligne)",
        lien: "https://support.google.com/gemini/answer/15719111",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste de la satisfaction client.
</system_prompt>

<context>
Voici les avis/réponses à l'enquête de satisfaction : [joindre]. Période couverte : [à préciser].
</context>

<instructions>
1. Identifie les thèmes récurrents positifs et négatifs.
2. Calcule ou estime un score de satisfaction global si les données le permettent.
3. Propose 2 à 3 actions d'amélioration prioritaires à partir des retours négatifs.
</instructions>

<output_format>
Score global (si calculable), suivi de deux listes (points forts / points faibles récurrents) et des actions recommandées.
</output_format>`,
  },
  F27: {
    outils: [
      {
        nom: "Gemini dans Google Sheets",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste marketing spécialisé dans la segmentation client.
</system_prompt>

<context>
Voici la base clients avec leurs caractéristiques (achats, fréquence, panier moyen, secteur...) : [joindre]. Objectif de la segmentation : [à préciser].
</context>

<instructions>
1. Propose 3 à 5 segments pertinents par rapport à l'objectif indiqué.
2. Décris le profil type de chaque segment avec les critères qui le définissent.
3. Suggère une action marketing adaptée à chaque segment.
</instructions>

<output_format>
Un tableau : Segment | Profil type | Critères | Action marketing suggérée.
</output_format>`,
  },
  F28: {
    outils: [
      {
        nom: "Ask Advisor dans Google Ads (assistant Gemini natif)",
        lien: "https://support.google.com/google-ads/answer/16574983",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es conseiller en optimisation de campagnes publicitaires.
</system_prompt>

<context>
Campagne concernée : [nom/ID]. Objectif : [notoriété / conversions / ROAS cible]. Budget actuel : [à préciser].
</context>

<instructions>
1. Analyse la performance actuelle de la campagne (CTR, coût par conversion, ROAS).
2. Identifie les leviers d'optimisation prioritaires (enchères, mots-clés, audiences, créations).
3. Propose des ajustements concrets et chiffrés quand c'est possible.
</instructions>

<output_format>
Un diagnostic en 3 points, suivi d'un tableau : Levier | Ajustement proposé | Impact attendu.
</output_format>`,
    uneSeuleFois:
      "Ask Advisor n'est pas disponible pour les comptes Manager (MCC) au moment de la rédaction de ce guide.",
  },
  F29: {
    outils: [
      {
        nom: "Analyse native de fichiers Gemini (CV en PDF/Word)",
        lien: "https://support.google.com/gemini/answer/14903178",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant recrutement, objectif et factuel.
</system_prompt>

<context>
Voici la fiche de poste : [coller]. Voici le ou les CV à examiner : [joindre].
</context>

<instructions>
1. Résume le profil de chaque candidat en quelques lignes.
2. Évalue l'adéquation avec la fiche de poste, critère par critère.
3. Signale les points à éclaircir en entretien, sans émettre de jugement sur des critères non professionnels.
</instructions>

<output_format>
Un tableau : Candidat | Points forts | Points d'attention | Adéquation (faible / moyenne / forte), suivi des questions suggérées pour l'entretien.
</output_format>`,
  },
  F30: {
    outils: [
      {
        nom: "Gemini dans Google Docs / Google Slides",
        lien: "https://support.google.com/docs/answer/15123226",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es concepteur pédagogique spécialisé dans la formation professionnelle.
</system_prompt>

<context>
Public à former : [profil, niveau actuel]. Objectif d'apprentissage : [à préciser]. Durée disponible : [à préciser].
</context>

<instructions>
1. Découpe le parcours en modules progressifs adaptés au niveau du public.
2. Pour chaque module, précise l'objectif, le contenu principal et une activité pratique.
3. Propose une modalité d'évaluation finale des acquis.
</instructions>

<output_format>
Un tableau : Module | Objectif | Contenu | Activité pratique, suivi de la modalité d'évaluation proposée.
</output_format>`,
  },
  F31: {
    outils: [
      {
        nom: "Analyse native d'image/PDF Gemini (lecture de plans)",
        lien: "https://support.google.com/gemini/answer/14903178",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant technique spécialisé dans la lecture de plans.
</system_prompt>

<context>
Voici le plan à analyser : [joindre l'image ou le PDF]. Élément(s) à repérer et compter : [à préciser, ex. fenêtres, prises électriques, poteaux].
</context>

<instructions>
1. Repère tous les éléments demandés visibles sur le plan.
2. Compte-les et indique leur emplacement approximatif (zone du plan).
3. Signale les zones illisibles ou ambiguës où le comptage est incertain.
</instructions>

<output_format>
Un total par type d'élément, suivi d'un tableau : Élément | Emplacement approximatif | Certitude (certain / à vérifier).
</output_format>`,
  },
  F32: {
    outils: [
      {
        nom: "Gemini dans Google Drive (photos de chantier)",
        lien: "https://support.google.com/gemini/answer/13695044",
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
Photos de chantier déposées chaque semaine dans le dossier : [à préciser]. Planning prévisionnel des jalons : [à préciser].
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
        nom: "Gemini dans Google Docs",
        lien: "https://support.google.com/docs/answer/15123226",
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
        nom: "Nano Banana Pro (édition d'une photo existante)",
        lien: "https://gemini.google/overview/image-generation/",
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
1. Applique chaque modification demandée en conservant la cohérence globale de l'image (éclairage, perspective, style).
2. Si une modification demandée est ambiguë, applique l'interprétation la plus probable et signale-le.
3. Propose une variante alternative si plusieurs interprétations sont raisonnables.
</instructions>

<output_format>
L'image modifiée, suivie d'une courte note sur les choix faits en cas d'ambiguïté.
</output_format>`,
    uneSeuleFois:
      "Point fort reconnu de Gemini : l'édition de photo existante en langage naturel (Nano Banana Pro) est plus aboutie que les outils généralistes équivalents.",
  },
  F35: {
    outils: [
      {
        nom: "Nano Banana Pro",
        lien: "https://gemini.google/overview/image-generation/",
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
1. Génère une variante du visuel pour chaque palette demandée.
2. Conserve la composition et les textes du visuel d'origine.
3. Indique pour chaque variante si le rendu est fidèle ou approximatif.
</instructions>

<output_format>
Une variante par palette demandée, avec la mention de fidélité pour chacune.
</output_format>`,
  },
  F36: {
    outils: [
      {
        nom: "Compréhension vidéo native Gemini (upload direct des rushes)",
        lien: "https://ai.google.dev/gemini-api/docs/video-understanding",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es monteur vidéo assistant, chargé de repérer des plans dans des rushes.
</system_prompt>

<context>
Voici le ou les fichiers de rushes : [joindre]. Type de plan recherché : [à préciser, ex. plan large extérieur, personne souriante, produit en gros plan].
</context>

<instructions>
1. Parcours les rushes et repère les passages correspondant à la description donnée.
2. Indique le timecode de début et de fin de chaque passage retenu.
3. Classe les passages retenus par pertinence par rapport à la demande.
</instructions>

<output_format>
Un tableau trié par pertinence : Fichier | Timecode début | Timecode fin | Description du plan.
</output_format>`,
    uneSeuleFois:
      "Point fort reconnu de Gemini : l'upload direct de fichiers vidéo et leur analyse de contenu sont nativement gérés.",
  },
  F37: {
    outils: [
      {
        nom: "Google Vids (montage assisté à partir d'un script)",
        lien: "https://workspace.google.com/products/vids/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es monteur vidéo assistant.
</system_prompt>

<context>
Voici la transcription horodatée du tournage : [joindre]. Angle éditorial souhaité : [à préciser]. Durée cible du montage : [à préciser].
</context>

<instructions>
1. Sélectionne dans la transcription les passages qui servent l'angle éditorial indiqué.
2. Ordonne-les de façon cohérente pour respecter la durée cible.
3. Effectue un premier assemblage dans Google Vids à partir de cette sélection.
</instructions>

<output_format>
La liste ordonnée des passages retenus avec timecodes, suivie de la confirmation de l'assemblage effectué dans Google Vids.
</output_format>`,
  },
  F38: {
    outils: [
      {
        nom: "Google Vids (sous-titres automatiques)",
        lien: "https://support.google.com/docs/answer/16545758",
        type: "officiel",
      },
      {
        nom: "Doublage automatique YouTube (traduction lors de la publication)",
        lien: "https://support.google.com/youtube/answer/15569972",
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
3. Traduis dans la ou les langues cibles demandées si différentes de la langue source.
</instructions>

<output_format>
Un fichier de sous-titres au format SRT (numéro, timecode, texte) pour chaque langue demandée.
</output_format>`,
    uneSeuleFois:
      "Aucune activation nécessaire au-delà de la transcription (voir F04) ; le doublage automatique YouTube peut compléter le sous-titrage pour une vidéo déjà publiée.",
  },
  F39: {
    outils: [
      {
        nom: "Outil audio dédié tiers (ex. Adobe Podcast Enhance Speech, Audo Studio)",
        lien: "https://podcast.adobe.com/enhance",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de post-production audio.
</system_prompt>

<context>
Voici la transcription de l'enregistrement à nettoyer : [joindre]. Problèmes constatés : [bruit de fond, respirations, hésitations, etc.].
</context>

<instructions>
1. Identifie dans la transcription les passages correspondant aux défauts signalés (hésitations, répétitions, silences trop longs).
2. Indique les timecodes approximatifs de ces passages si disponibles.
3. Recommande l'outil de nettoyage audio dédié à utiliser en complément (Gemini ne traite pas le fichier audio lui-même).
</instructions>

<output_format>
Une liste des passages à traiter avec leur timecode, suivie de la recommandation d'outil.
</output_format>`,
    uneSeuleFois:
      "Limite connue : Google ne propose pas d'outil natif Gemini de nettoyage audio. Gemini identifie les passages à traiter et transcrit, mais le nettoyage du fichier audio lui-même passe par un outil dédié (Adobe Podcast Enhance Speech, Audo Studio).",
  },
  F40: {
    outils: [
      {
        nom: "Google Vids (formats verticaux, carrés, horizontaux)",
        lien: "https://support.google.com/docs/answer/16545758",
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
2. Génère un export par format demandé dans Google Vids.
3. Signale les formats où le recadrage entraîne une perte d'information importante.
</instructions>

<output_format>
Un export par format demandé, suivi de la liste des formats nécessitant une vérification manuelle.
</output_format>`,
  },
  F41: {
    outils: [
      {
        nom: "Synthèse vocale native Gemini (voix off multilingue)",
        lien: "https://gemini.google/overview/video-generation/",
        type: "officiel",
      },
      {
        nom: "Doublage automatique YouTube",
        lien: "https://support.google.com/youtube/answer/15569972",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de post-production audio.
</system_prompt>

<context>
Script ou transcription source : [joindre]. Langue(s) cible(s) de la voix off/doublage : [à préciser]. Ton attendu : [à préciser].
</context>

<instructions>
1. Adapte le texte source pour un rendu naturel à l'oral dans la langue cible (pas une traduction mot à mot).
2. Génère la voix off correspondante avec le ton demandé.
3. Signale les passages où la durée de la voix off générée risque de ne plus correspondre au montage image d'origine.
</instructions>

<output_format>
Le texte adapté pour chaque langue, suivi de la voix off générée, et des passages à vérifier pour la synchronisation.
</output_format>`,
    uneSeuleFois:
      "Point fort reconnu de Gemini sur cette tâche. Pour un doublage intégré directement à une vidéo déjà publiée sur YouTube, le doublage automatique natif de YouTube est une alternative complémentaire.",
  },
  F42: {
    outils: [
      {
        nom: "Veo (génération vidéo native dans Gemini et Google Vids)",
        lien: "https://gemini.google/overview/video-generation/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de création vidéo.
</system_prompt>

<context>
Séquence à illustrer : [décrire précisément : décor, action, mouvement de caméra, ambiance]. Durée cible : [à préciser]. Format cible : [à préciser].
</context>

<instructions>
1. Décris précisément la séquence attendue : décor, action, mouvement de caméra, ambiance.
2. Découpe la description en plans distincts si la séquence dépasse quelques secondes.
3. Génère la séquence vidéo correspondante avec Veo.
</instructions>

<output_format>
La séquence vidéo générée, précédée du brief plan par plan utilisé pour la générer.
</output_format>`,
    uneSeuleFois:
      "Point fort reconnu de Gemini sur cette tâche : génération vidéo texte-vers-vidéo native, directement dans l'app Gemini ou dans Google Vids.",
  },
};
