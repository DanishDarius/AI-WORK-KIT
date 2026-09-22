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
        nom: "Application connectee Gmail (compte personnel)",
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
      nom: "Tri de la boite mail",
      frequence: "Quotidien (matin)",
      prompt: `<system_prompt>
Tu es mon assistant de gestion de boite mail.
</system_prompt>

<context>
Je recois de nombreux e-mails chaque jour sur ma boite Gmail connectee. Je veux garder le controle sans tout lire moi-meme.
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
      "Gemini n'a pas de reglage d'approbation automatique/manuelle comme Cowork : le prompt interdit explicitement l'envoi automatique, ce qui joue le meme role.",
  },
  F02: {
    outils: [
      {
        nom: "Nano Banana Pro (generation de visuels, natif)",
        lien: "https://gemini.google/overview/image-generation/",
        type: "officiel",
      },
      {
        nom: "Application personnalisee MCP Buffer ou Hootsuite (planification multi-reseaux)",
        lien: "https://support.google.com/gemini/answer/17209137",
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
      "Genere les visuels avec Nano Banana Pro, puis programme leur envoi vers Buffer/Hootsuite via l'application personnalisee MCP (frequence : hebdomadaire, jour de preparation du calendrier de la semaine suivante).",
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
Tu es assistant de prise de notes en reunion.
</system_prompt>

<context>
Voici la transcription ou l'enregistrement de la reunion : [coller/joindre]. Participants : [liste]. Objectif de la reunion : [a preciser].
</context>

<instructions>
1. Resume les points cles discutes, dans l'ordre chronologique.
2. Liste les decisions prises.
3. Liste les actions a faire avec, si mentionne, le responsable et l'echeance.
4. Signale les points restes en suspens.
</instructions>

<output_format>
Quatre sections : Resume, Decisions, Actions (tableau Action | Responsable | Echeance), Points en suspens.
</output_format>`,
  },
  F05: {
    outils: [
      {
        nom: "Application connectee Google Calendar",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Preparation de l'agenda",
      frequence: "Quotidien (veille au soir ou matin)",
      prompt: `<system_prompt>
Tu es mon assistant de gestion d'agenda.
</system_prompt>

<context>
Mon calendrier Google est connecte. Je veux anticiper ma journee/semaine et eviter les conflits.
</context>

<instructions>
1. Verifie les rendez-vous du jour/de la semaine a venir.
2. Signale tout conflit d'horaires ou rendez-vous sans lieu/lien de visio renseigne.
3. Propose des creneaux libres pour les demandes de rendez-vous en attente, sans creer d'evenement toi-meme.
</instructions>

<output_format>
Une liste chronologique des rendez-vous avec alertes en gras pour les conflits, suivie des creneaux libres proposes.
</output_format>`,
    },
    uneSeuleFois:
      "Le prompt interdit explicitement la creation automatique d'evenements, faute de reglage d'approbation natif sur les actions planifiees Gemini.",
  },
  F06: {
    outils: [
      {
        nom: "Gem dedie support client (FAQ en source permanente)",
        lien: "https://support.google.com/gemini/answer/15146780",
        type: "officiel",
      },
      {
        nom: "Application personnalisee MCP Zendesk ou Intercom (si ticketing hors Google)",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es agent de support client de premier niveau, courtois et precis.
</system_prompt>

<context>
Voici notre base de connaissances / FAQ : [coller ou joindre en source du Gem]. Voici la question du client : [coller le message].
</context>

<instructions>
1. Identifie si la question a une reponse directe dans la base de connaissances.
2. Si oui, redige une reponse claire et complete en te basant uniquement sur ces informations.
3. Si non, indique que la question doit etre escaladee et resume ce qui manque pour y repondre.
</instructions>

<output_format>
La reponse au client (pret a envoyer), ou la mention "A escalader" suivie du motif.
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
      frequence: "Hebdomadaire (debut de semaine)",
      prompt: `<system_prompt>
Tu es analyste de veille sectorielle.
</system_prompt>

<context>
Secteur a surveiller : [a preciser]. Concurrents/sources a suivre en priorite : [liste].
</context>

<instructions>
1. Utilise la Recherche Approfondie pour identifier les actualites, lancements et mouvements marquants de la semaine ecoulee dans ce secteur.
2. Classe les informations par niveau d'importance pour mon activite.
3. Pour chaque information retenue, indique la source et un lien.
</instructions>

<output_format>
Une liste triee par importance : Titre | Resume en 2 lignes | Impact potentiel | Source (lien).
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
Tu es analyste de donnees, precis et pedagogue.
</system_prompt>

<context>
Voici les donnees a analyser : [joindre le fichier ou preciser la feuille Sheets]. Question metier a laquelle repondre : [a preciser].
</context>

<instructions>
1. Identifie les tendances et anomalies principales dans les donnees.
2. Reponds precisement a la question metier posee, avec les chiffres a l'appui.
3. Propose 2 a 3 visualisations pertinentes (graphique a creer dans Sheets) pour illustrer les resultats.
</instructions>

<output_format>
Un resume en 5 lignes maximum, suivi des chiffres cles en tableau, puis les graphiques suggeres avec leur type (barres, courbe, camembert).
</output_format>`,
  },
  F09: {
    outils: [
      {
        nom: "Nano Banana Pro (generation d'image native)",
        lien: "https://gemini.google/overview/image-generation/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es directeur artistique specialise dans les visuels marketing.
</system_prompt>

<context>
Objectif du visuel : [a preciser]. Charte graphique / couleurs de marque : [a preciser]. Format cible : [carre Instagram / bandeau LinkedIn / story 9:16 / etc.].
</context>

<instructions>
1. Genere un visuel correspondant a l'objectif et au format demandes.
2. Respecte la charte graphique indiquee (couleurs, style).
3. Propose 2 variantes si le brief laisse une marge d'interpretation.
</instructions>

<output_format>
Le ou les visuels generes, avec une courte explication du choix de composition pour chacun.
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
        nom: "Application personnalisee MCP HubSpot ou Salesforce",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de qualification de donnees CRM.
</system_prompt>

<context>
Voici l'export de la base CRM : [joindre le fichier]. Champs obligatoires attendus : [liste].
</context>

<instructions>
1. Repere les doublons (meme entreprise/contact avec des variantes d'orthographe).
2. Signale les fiches avec des champs obligatoires manquants ou visiblement errones (email invalide, telephone incomplet).
3. Propose une normalisation des intitules (secteur d'activite, taille d'entreprise) selon une liste de reference si fournie.
</instructions>

<output_format>
Un tableau des anomalies : Ligne | Probleme detecte | Correction proposee, suivi d'un resume chiffre (nombre de doublons, de champs manquants).
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
Tu es assistant de saisie de donnees, precis et exhaustif.
</system_prompt>

<context>
Voici le ou les documents source : [joindre]. Champs a extraire pour la saisie : [liste precise].
</context>

<instructions>
1. Extrais chaque champ demande depuis les documents fournis.
2. Si une information est absente ou ambigue, indique-le clairement au lieu de l'inventer.
3. Presente le resultat au format directement copiable dans l'outil de saisie cible.
</instructions>

<output_format>
Un tableau : Champ | Valeur extraite | Source (nom du document) | Fiabilite (certaine / a verifier).
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
Mon Google Drive est connecte. Nouveaux documents deposes dans le dossier [a preciser] chaque semaine, a classer selon la nomenclature : [regles de nommage et arborescence].
</context>

<instructions>
1. Identifie les nouveaux documents deposes depuis la derniere verification.
2. Propose pour chacun un nom conforme a la nomenclature et un dossier de destination.
3. Signale les documents dont le contenu ne permet pas de determiner clairement le classement.
</instructions>

<output_format>
Un tableau : Document | Nom propose | Dossier de destination propose | A verifier (oui/non).
</output_format>`,
    },
  },
  F13: {
    outils: [
      {
        nom: "Gemini Notebook (analyse ancree sur les sources fournies)",
        lien: "https://workspace.google.com/products/notebooklm/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste documentaire rigoureux.
</system_prompt>

<context>
Voici les documents du dossier a analyser et comparer : [joindre ou ajouter comme sources]. Point de comparaison recherche : [a preciser].
</context>

<instructions>
1. Resume le contenu de chaque document en 3 lignes maximum.
2. Compare les documents sur le point demande, en citant precisement les passages concernes.
3. Signale les contradictions ou incoherences entre documents si tu en releves.
</instructions>

<output_format>
Un resume par document, suivi d'un tableau comparatif sur le point demande, et enfin la liste des incoherences relevees.
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
Tu es traducteur professionnel specialise dans les documents d'entreprise.
</system_prompt>

<context>
Voici le document a traduire : [coller/joindre]. Langue cible : [a preciser]. Registre attendu : [formel / familier / technique].
</context>

<instructions>
1. Traduis integralement le document dans la langue cible.
2. Adapte les formulations idiomatiques et les unites (dates, devises, mesures) a la langue et au pays cibles.
3. Signale les termes techniques ou noms propres qui n'ont pas d'equivalent direct et la solution retenue.
</instructions>

<output_format>
Le document traduit en entier, suivi d'une liste des termes signales avec la solution retenue.
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
Tu es consultant en communication, specialiste des presentations professionnelles.
</system_prompt>

<context>
Voici le brief de la presentation : [objectif, public, message cle, duree]. Charte graphique : [a preciser].
</context>

<instructions>
1. Propose un plan de diapositives (titre de chaque diapositive et son contenu principal).
2. Redige le texte de chaque diapositive, concis et oriente message.
3. Suggere pour chaque diapositive un visuel ou un type de graphique pertinent.
</instructions>

<output_format>
Une diapositive par section : Numero | Titre | Texte | Visuel suggere.
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
        nom: "Application personnalisee MCP Asana, Jira ou Monday",
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
Voici la liste des taches et leur statut : [connecter la source ou coller l'export]. Echeance du projet : [a preciser].
</context>

<instructions>
1. Identifie les taches en retard par rapport a leur echeance.
2. Identifie les taches bloquantes pour la suite du projet.
3. Propose un point de suivi synthetique.
</instructions>

<output_format>
Trois sections : Taches en retard, Taches bloquantes, Point de suivi synthetique (5 lignes maximum).
</output_format>`,
    },
  },
  F17: {
    outils: [
      {
        nom: "Gem dedie prospection commerciale",
        lien: "https://support.google.com/gemini/answer/15146780",
        type: "officiel",
      },
      {
        nom: "Application connectee Gmail (brouillons uniquement)",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es commercial specialise dans la prospection B2B personnalisee.
</system_prompt>

<context>
Voici la fiche du prospect : [informations disponibles]. Notre offre : [a preciser]. Dernier contact avec ce prospect : [date et contenu si relance].
</context>

<instructions>
1. Redige un message de prospection ou de relance personnalise a partir des informations du prospect.
2. Mets en avant le benefice le plus pertinent pour son profil/secteur.
3. Termine par un appel a l'action clair et simple.
</instructions>

<output_format>
Le message pret a copier (objet + corps), en brouillon uniquement, jamais envoye automatiquement.
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
Tu es assistant commercial charge de preparer des devis.
</system_prompt>

<context>
Voici le besoin du client : [a preciser]. Grille tarifaire / prestations disponibles : [joindre ou coller].
</context>

<instructions>
1. Selectionne les prestations correspondant au besoin exprime.
2. Calcule le total avec, si pertinent, les remises applicables.
3. Redige les conditions habituelles (validite de l'offre, delais, modalites de paiement) a partir des elements fournis.
</instructions>

<output_format>
Le devis structure : Prestation | Quantite | Prix unitaire | Total, suivi des conditions et du total general.
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
        nom: "Application personnalisee MCP QuickBooks ou Xero",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Categorisation des transactions",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant comptable charge de la categorisation des transactions.
</system_prompt>

<context>
Voici l'export des transactions de la periode : [joindre]. Plan de comptes / categories a utiliser : [liste].
</context>

<instructions>
1. Categorise chaque transaction selon le plan de comptes fourni.
2. Signale les transactions ambigues ou inhabituelles necessitant une verification humaine.
3. Ne valide aucune ecriture definitive toi-meme.
</instructions>

<output_format>
Un tableau : Date | Libelle | Montant | Categorie proposee | A verifier (oui/non).
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
        nom: "Application personnalisee MCP du logiciel comptable utilise",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Rapprochement bancaire",
      frequence: "Hebdomadaire ou mensuel selon le volume",
      prompt: `<system_prompt>
Tu es assistant comptable charge du rapprochement bancaire.
</system_prompt>

<context>
Voici le releve bancaire de la periode : [joindre]. Voici le grand livre / journal correspondant : [joindre].
</context>

<instructions>
1. Rapproche chaque ligne du releve bancaire avec l'ecriture comptable correspondante.
2. Liste les ecarts : operations bancaires sans ecriture, ecritures sans operation bancaire, montants differents.
3. Propose une explication probable pour chaque ecart quand c'est possible (delai d'encaissement, frais bancaires, etc.).
</instructions>

<output_format>
Un tableau des ecarts : Operation | Montant | Type d'ecart | Explication probable, suivi du solde final rapproche.
</output_format>`,
    },
  },
  F21: {
    outils: [
      {
        nom: "Application connectee Gmail",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
      {
        nom: "Gemini dans Google Sheets (suivi des echeances)",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Suivi des impayes",
      frequence: "Hebdomadaire",
      prompt: `<system_prompt>
Tu es assistant de recouvrement, ferme mais courtois.
</system_prompt>

<context>
Voici la liste des factures avec leur statut et leur echeance : [joindre]. Politique de relance : [ex. relance a J+7, J+15, J+30].
</context>

<instructions>
1. Identifie les factures en retard selon la politique de relance.
2. Redige pour chacune un brouillon de relance adapte au niveau de retard (ton progressif).
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
        nom: "Application connectee Gmail et Google Sheets",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
      {
        nom: "Application personnalisee MCP de l'ERP utilise (si applicable)",
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
Voici la liste des commandes en cours avec fournisseur et statut : [joindre]. Notifications fournisseurs recues : [connecter Gmail ou coller].
</context>

<instructions>
1. Identifie les commandes dont le statut a change (retard, expedition, annulation) d'apres les notifications recues.
2. Signale les commandes dont la date de livraison prevue est depassee sans nouvelle.
3. Resume les changements a repercuter dans le suivi.
</instructions>

<output_format>
Un tableau : Commande | Fournisseur | Ancien statut | Nouveau statut | Action a faire.
</output_format>`,
    },
  },
  F23: {
    outils: [
      {
        nom: "Gemini dans Google Sheets (formules de prevision)",
        lien: "https://support.google.com/docs/answer/14218565",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Prevision des approvisionnements",
      frequence: "Mensuel",
      prompt: `<system_prompt>
Tu es assistant logistique charge des previsions d'approvisionnement.
</system_prompt>

<context>
Voici l'historique des ventes/sorties de stock par reference : [joindre]. Stock actuel : [joindre ou preciser].
</context>

<instructions>
1. Identifie les tendances et saisonnalites par reference sur l'historique fourni.
2. Etablis une prevision de la demande pour la periode a venir.
3. Propose des quantites d'approvisionnement recommandees par reference.
</instructions>

<output_format>
Un tableau : Reference | Prevision de demande | Stock actuel | Quantite a commander recommandee.
</output_format>`,
    },
  },
  F24: {
    outils: [
      {
        nom: "Informations Google Maps utilisees automatiquement par Gemini",
        lien: "https://support.google.com/gemini/answer/13695044",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Planification de tournee",
      frequence: "Quotidien (veille ou matin du jour de tournee)",
      prompt: `<system_prompt>
Tu es assistant logistique charge de la planification des tournees.
</system_prompt>

<context>
Livraisons/interventions du jour : [liste des adresses et contraintes horaires]. Point de depart : [adresse].
</context>

<instructions>
1. Determine un ordre de passage optimise pour minimiser le temps de trajet total, en te basant sur les informations Google Maps disponibles.
2. Estime la duree de chaque trajet et l'heure d'arrivee prevue a chaque etape.
3. Signale les contraintes horaires qui semblent difficiles a tenir.
</instructions>

<output_format>
Un tableau ordonne : Ordre | Adresse | Heure d'arrivee estimee | Alerte eventuelle.
</output_format>`,
    },
  },
  F25: {
    outils: [
      {
        nom: "Gem dedie triage support client",
        lien: "https://support.google.com/gemini/answer/15146780",
        type: "officiel",
      },
      {
        nom: "Application connectee Gmail ou application personnalisee MCP du ticketing utilise",
        lien: "https://support.google.com/gemini/answer/17209137",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de triage des demandes clients.
</system_prompt>

<context>
Voici la demande client recue : [coller]. Services disponibles pour orientation : [liste : SAV, commercial, facturation, technique].
</context>

<instructions>
1. Identifie le sujet principal de la demande.
2. Determine le service le plus adapte pour la traiter.
3. Evalue le niveau d'urgence (faible / moyen / eleve).
</instructions>

<output_format>
Sujet | Service d'orientation propose | Urgence | Justification en une ligne.
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
Voici les avis/reponses a l'enquete de satisfaction : [joindre]. Periode couverte : [a preciser].
</context>

<instructions>
1. Identifie les themes recurrents positifs et negatifs.
2. Calcule ou estime un score de satisfaction global si les donnees le permettent.
3. Propose 2 a 3 actions d'amelioration prioritaires a partir des retours negatifs.
</instructions>

<output_format>
Score global (si calculable), suivi de deux listes (points forts / points faibles recurrents) et des actions recommandees.
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
Tu es analyste marketing specialise dans la segmentation client.
</system_prompt>

<context>
Voici la base clients avec leurs caracteristiques (achats, frequence, panier moyen, secteur...) : [joindre]. Objectif de la segmentation : [a preciser].
</context>

<instructions>
1. Propose 3 a 5 segments pertinents par rapport a l'objectif indique.
2. Decris le profil type de chaque segment avec les criteres qui le definissent.
3. Suggere une action marketing adaptee a chaque segment.
</instructions>

<output_format>
Un tableau : Segment | Profil type | Criteres | Action marketing suggeree.
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
Campagne concernee : [nom/ID]. Objectif : [notoriete / conversions / ROAS cible]. Budget actuel : [a preciser].
</context>

<instructions>
1. Analyse la performance actuelle de la campagne (CTR, cout par conversion, ROAS).
2. Identifie les leviers d'optimisation prioritaires (encheres, mots-cles, audiences, creations).
3. Propose des ajustements concrets et chiffres quand c'est possible.
</instructions>

<output_format>
Un diagnostic en 3 points, suivi d'un tableau : Levier | Ajustement propose | Impact attendu.
</output_format>`,
    uneSeuleFois:
      "Ask Advisor n'est pas disponible pour les comptes Manager (MCC) au moment de la redaction de ce guide.",
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
Voici la fiche de poste : [coller]. Voici le ou les CV a examiner : [joindre].
</context>

<instructions>
1. Resume le profil de chaque candidat en quelques lignes.
2. Evalue l'adequation avec la fiche de poste, critere par critere.
3. Signale les points a eclaircir en entretien, sans emettre de jugement sur des criteres non professionnels.
</instructions>

<output_format>
Un tableau : Candidat | Points forts | Points d'attention | Adequation (faible / moyenne / forte), suivi des questions suggerees pour l'entretien.
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
Tu es concepteur pedagogique specialise dans la formation professionnelle.
</system_prompt>

<context>
Public a former : [profil, niveau actuel]. Objectif d'apprentissage : [a preciser]. Duree disponible : [a preciser].
</context>

<instructions>
1. Decoupe le parcours en modules progressifs adaptes au niveau du public.
2. Pour chaque module, precise l'objectif, le contenu principal et une activite pratique.
3. Propose une modalite d'evaluation finale des acquis.
</instructions>

<output_format>
Un tableau : Module | Objectif | Contenu | Activite pratique, suivi de la modalite d'evaluation proposee.
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
Tu es assistant technique specialise dans la lecture de plans.
</system_prompt>

<context>
Voici le plan a analyser : [joindre l'image ou le PDF]. Element(s) a reperer et compter : [a preciser, ex. fenetres, prises electriques, poteaux].
</context>

<instructions>
1. Repere tous les elements demandes visibles sur le plan.
2. Compte-les et indique leur emplacement approximatif (zone du plan).
3. Signale les zones illisibles ou ambigues ou le comptage est incertain.
</instructions>

<output_format>
Un total par type d'element, suivi d'un tableau : Element | Emplacement approximatif | Certitude (certain / a verifier).
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
Photos de chantier deposees chaque semaine dans le dossier : [a preciser]. Planning previsionnel des jalons : [a preciser].
</context>

<instructions>
1. Compare les nouvelles photos deposees depuis le dernier passage au planning previsionnel.
2. Estime l'avancement visible par rapport aux jalons prevus.
3. Signale tout ecart apparent avec le planning.
</instructions>

<output_format>
Un point d'avancement synthetique (5 a 10 lignes) avec, si pertinent, les ecarts identifies.
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
Tu es assistant HSE (hygiene, securite, environnement) sur chantier.
</system_prompt>

<context>
Voici le compte-rendu ou les observations de chantier : [joindre/coller]. Referentiel de risques applicable : [a preciser si disponible].
</context>

<instructions>
1. Identifie les points de risque mentionnes ou observables dans le compte-rendu.
2. Classe-les par niveau de gravite et de probabilite.
3. Propose une action corrective pour chaque risque identifie.
</instructions>

<output_format>
Un tableau : Risque | Gravite | Probabilite | Action corrective proposee, trie du plus critique au moins critique.
</output_format>`,
  },
  F34: {
    outils: [
      {
        nom: "Nano Banana Pro (edition d'une photo existante)",
        lien: "https://gemini.google/overview/image-generation/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de retouche image.
</system_prompt>

<context>
Image source : [joindre]. Modifications demandees : [a preciser precisement, element par element].
</context>

<instructions>
1. Applique chaque modification demandee en conservant la coherence globale de l'image (eclairage, perspective, style).
2. Si une modification demandee est ambigue, applique l'interpretation la plus probable et signale-le.
3. Propose une variante alternative si plusieurs interpretations sont raisonnables.
</instructions>

<output_format>
L'image modifiee, suivie d'une courte note sur les choix faits en cas d'ambiguite.
</output_format>`,
    uneSeuleFois:
      "Point fort reconnu de Gemini : l'edition de photo existante en langage naturel (Nano Banana Pro) est plus aboutie que les outils generalistes equivalents.",
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
Tu es assistant de deploiement graphique.
</system_prompt>

<context>
Visuel source : [joindre]. Palettes de couleurs souhaitees : [liste des variantes attendues].
</context>

<instructions>
1. Genere une variante du visuel pour chaque palette demandee.
2. Conserve la composition et les textes du visuel d'origine.
3. Indique pour chaque variante si le rendu est fidele ou approximatif.
</instructions>

<output_format>
Une variante par palette demandee, avec la mention de fidelite pour chacune.
</output_format>`,
  },
  F36: {
    outils: [
      {
        nom: "Comprehension video native Gemini (upload direct des rushes)",
        lien: "https://ai.google.dev/gemini-api/docs/video-understanding",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es monteur video assistant, charge de reperer des plans dans des rushes.
</system_prompt>

<context>
Voici le ou les fichiers de rushes : [joindre]. Type de plan recherche : [a preciser, ex. plan large exterieur, personne souriante, produit en gros plan].
</context>

<instructions>
1. Parcours les rushes et repere les passages correspondant a la description donnee.
2. Indique le timecode de debut et de fin de chaque passage retenu.
3. Classe les passages retenus par pertinence par rapport a la demande.
</instructions>

<output_format>
Un tableau trie par pertinence : Fichier | Timecode debut | Timecode fin | Description du plan.
</output_format>`,
    uneSeuleFois:
      "Point fort reconnu de Gemini : l'upload direct de fichiers video et leur analyse de contenu sont nativement geres.",
  },
  F37: {
    outils: [
      {
        nom: "Google Vids (montage assiste a partir d'un script)",
        lien: "https://workspace.google.com/products/vids/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es monteur video assistant.
</system_prompt>

<context>
Voici la transcription horodatee du tournage : [joindre]. Angle editorial souhaite : [a preciser]. Duree cible du montage : [a preciser].
</context>

<instructions>
1. Selectionne dans la transcription les passages qui servent l'angle editorial indique.
2. Ordonne-les de facon coherente pour respecter la duree cible.
3. Effectue un premier assemblage dans Google Vids a partir de cette selection.
</instructions>

<output_format>
La liste ordonnee des passages retenus avec timecodes, suivie de la confirmation de l'assemblage effectue dans Google Vids.
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
Transcription avec timecodes : [joindre/connecter]. Langue(s) cible(s) des sous-titres : [a preciser].
</context>

<instructions>
1. Decoupe la transcription en sous-titres respectant une longueur lisible (environ 40 caracteres par ligne, 2 lignes maximum).
2. Aligne chaque sous-titre sur les timecodes fournis.
3. Traduis dans la ou les langues cibles demandees si differentes de la langue source.
</instructions>

<output_format>
Un fichier de sous-titres au format SRT (numero, timecode, texte) pour chaque langue demandee.
</output_format>`,
    uneSeuleFois:
      "Aucune activation necessaire au-dela de la transcription (voir F04) ; le doublage automatique YouTube peut completer le sous-titrage pour une video deja publiee.",
  },
  F39: {
    outils: [
      {
        nom: "Outil audio dedie tiers (ex. Adobe Podcast Enhance Speech, Audo Studio)",
        lien: "https://podcast.adobe.com/enhance",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de post-production audio.
</system_prompt>

<context>
Voici la transcription de l'enregistrement a nettoyer : [joindre]. Problemes constates : [bruit de fond, respirations, hesitations, etc.].
</context>

<instructions>
1. Identifie dans la transcription les passages correspondant aux defauts signales (hesitations, repetitions, silences trop longs).
2. Indique les timecodes approximatifs de ces passages si disponibles.
3. Recommande l'outil de nettoyage audio dedie a utiliser en complement (Gemini ne traite pas le fichier audio lui-meme).
</instructions>

<output_format>
Une liste des passages a traiter avec leur timecode, suivie de la recommandation d'outil.
</output_format>`,
    uneSeuleFois:
      "Limite connue : Google ne propose pas d'outil natif Gemini de nettoyage audio. Gemini identifie les passages a traiter et transcrit, mais le nettoyage du fichier audio lui-meme passe par un outil dedie (Adobe Podcast Enhance Speech, Audo Studio).",
  },
  F40: {
    outils: [
      {
        nom: "Google Vids (formats verticaux, carres, horizontaux)",
        lien: "https://support.google.com/docs/answer/16545758",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de deploiement video multi-format.
</system_prompt>

<context>
Video source : [joindre ou connecter]. Formats cibles demandes : [ex. 9:16 pour Reels/TikTok, 1:1 pour Instagram feed, 16:9 pour YouTube].
</context>

<instructions>
1. Pour chaque format cible, determine le recadrage qui garde le sujet principal dans le cadre.
2. Genere un export par format demande dans Google Vids.
3. Signale les formats ou le recadrage entraine une perte d'information importante.
</instructions>

<output_format>
Un export par format demande, suivi de la liste des formats necessitant une verification manuelle.
</output_format>`,
  },
  F41: {
    outils: [
      {
        nom: "Synthese vocale native Gemini (voix off multilingue)",
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
Script ou transcription source : [joindre]. Langue(s) cible(s) de la voix off/doublage : [a preciser]. Ton attendu : [a preciser].
</context>

<instructions>
1. Adapte le texte source pour un rendu naturel a l'oral dans la langue cible (pas une traduction mot a mot).
2. Genere la voix off correspondante avec le ton demande.
3. Signale les passages ou la duree de la voix off genere risque de ne plus correspondre au montage image d'origine.
</instructions>

<output_format>
Le texte adapte pour chaque langue, suivi de la voix off generee, et des passages a verifier pour la synchronisation.
</output_format>`,
    uneSeuleFois:
      "Point fort reconnu de Gemini sur cette tache. Pour un doublage integre directement a une video deja publiee sur YouTube, le doublage automatique natif de YouTube est une alternative complementaire.",
  },
  F42: {
    outils: [
      {
        nom: "Veo (generation video native dans Gemini et Google Vids)",
        lien: "https://gemini.google/overview/video-generation/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant de creation video.
</system_prompt>

<context>
Sequence a illustrer : [decrire precisement : decor, action, mouvement de camera, ambiance]. Duree cible : [a preciser]. Format cible : [a preciser].
</context>

<instructions>
1. Decris precisement la sequence attendue : decor, action, mouvement de camera, ambiance.
2. Decoupe la description en plans distincts si la sequence depasse quelques secondes.
3. Genere la sequence video correspondante avec Veo.
</instructions>

<output_format>
La sequence video generee, precedee du brief plan par plan utilise pour la generer.
</output_format>`,
    uneSeuleFois:
      "Point fort reconnu de Gemini sur cette tache : generation video texte-vers-video native, directement dans l'app Gemini ou dans Google Vids.",
  },
};
