// Contenu du guide "Mettre en place" : outils reels, prompts prets a copier (squelette
// officiel Claude) et configuration des taches planifiees Cowork, tache par tache.
// Source : guide-complet-42-taches-claude.md (sources officielles Claude verifiees).
export type Outil = {
  nom: string;
  lien: string;
  type: "officiel" | "tiers";
};

export type ModeApprobation = "Automatique" | "Manuelle";

export type TachePlanifiee = {
  nom: string;
  frequence: string;
  prompt: string;
  modeApprobation: ModeApprobation;
  raisonApprobation: string;
  optionnelle?: boolean;
};

export type MiseEnPlace = {
  outils: Outil[];
  promptPonctuel?: string;
  tachePlanifiee?: TachePlanifiee;
  uneSeuleFois?: string;
};

export const miseEnPlace: Partial<Record<string, MiseEnPlace>> = {
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
      nom: "Tri de la boite mail",
      frequence: "Quotidien (matin)",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Classe et redige des brouillons, n'envoie rien automatiquement.",
      prompt: `<system_prompt>
Tu es mon assistant de gestion de boite mail.
</system_prompt>

<context>
Je recois de nombreux e-mails chaque jour sur ma boite connectee. Je veux garder le controle sans tout lire moi-meme.
</context>

<instructions>
1. Parcours les e-mails non lus recus depuis ma derniere verification.
2. Classe-les en trois categories : Urgent (reponse attendue sous 24h), A traiter (pas urgent mais actionnable), Information (rien a faire).
3. Pour chaque e-mail "Urgent", redige un brouillon de reponse court et professionnel, sans l'envoyer.
4. Signale les e-mails qui ressemblent a du spam ou du phishing sans les supprimer.
</instructions>

<output_format>
Une liste groupee par categorie, avec pour chaque e-mail : expediteur, objet en une ligne, et pour les "Urgent" le brouillon de reponse propose.
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
        nom: "MCP Buffer (publication programmee)",
        lien: "https://buffer.com/mcp",
        type: "tiers",
      },
      {
        nom: "MCP Hootsuite (publication programmee)",
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
      "Une fois les publications validees, programmez leur envoi vers Buffer ou Hootsuite via le connecteur MCP (frequence conseillee : hebdomadaire, au moment de preparer le calendrier de la semaine suivante).",
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
Tu es assistant redactionnel professionnel, rigoureux sur l'orthographe, la grammaire et le ton.
</system_prompt>

<context>
Voici le document a corriger ou a rediger : [coller le texte ou joindre le fichier]. Contexte : [type de document, destinataire, objectif].
</context>

<instructions>
1. Corrige l'orthographe, la grammaire et la ponctuation.
2. Ameliore la clarte et la fluidite sans changer le sens.
3. Adapte le ton au destinataire indique.
4. Liste en fin de reponse les changements de fond que tu as faits (pas les fautes corrigees).
</instructions>

<output_format>
Le document corrige en entier, suivi d'une liste a puces des changements de fond.
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
        nom: "Integration Fireflies (capture automatique de reunions, optionnelle)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "tiers",
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
    tachePlanifiee: {
      nom: "Compte-rendu de reunion recurrente",
      frequence: "Chaque semaine, le jour de la reunion recurrente",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Lit un enregistrement et redige un compte-rendu, n'envoie rien automatiquement.",
      optionnelle: true,
      prompt: `Chaque semaine, prends le dernier enregistrement de la reunion recurrente dans le dossier partage et produis le compte-rendu au format habituel (Resume, Decisions, Actions, Points en suspens).`,
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
        "Cree ou modifie des evenements et invitations visibles par d'autres personnes.",
      prompt: `<system_prompt>
Tu es mon assistant de gestion d'agenda.
</system_prompt>

<context>
Mon calendrier est connecte. Je veux anticiper ma journee/semaine et eviter les conflits.
</context>

<instructions>
1. Verifie les rendez-vous du jour/de la semaine a venir.
2. Signale tout conflit d'horaires ou rendez-vous sans lieu/lien de visio renseigne.
3. Propose des creneaux libres pour les demandes de rendez-vous en attente.
</instructions>

<output_format>
Une liste chronologique des rendez-vous avec alertes en gras pour les conflits, suivie des creneaux libres proposes.
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
        nom: "MCP communautaire Zendesk (a verifier avant mise en prod)",
        lien: "https://github.com/michaelrice/zendesk-mcp",
        type: "tiers",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es agent de support client de premier niveau, courtois et precis.
</system_prompt>

<context>
Voici notre base de connaissances / FAQ : [coller ou connecter la source]. Voici la question du client : [coller le message].
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
        nom: "Recherche web native de Claude (aucune activation necessaire)",
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
        "Ne fait que lire et synthetiser des informations publiques, aucune action externe.",
      prompt: `<system_prompt>
Tu es analyste de veille sectorielle.
</system_prompt>

<context>
Secteur a surveiller : [a preciser]. Sources prioritaires : [sites, concurrents, mots-cles].
</context>

<instructions>
1. Recherche les actualites publiees depuis la derniere veille sur le secteur et les mots-cles indiques.
2. Ecarte les doublons et les sources peu fiables.
3. Classe les resultats par importance pour l'activite.
</instructions>

<output_format>
Une liste a puces : titre de l'actualite, source (avec lien), une phrase de resume, et pourquoi c'est pertinent.
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
Tu es analyste de donnees.
</system_prompt>

<context>
Voici les donnees a analyser : [joindre le fichier ou connecter la source]. Objectif du rapport : [a preciser].
</context>

<instructions>
1. Identifie les tendances et chiffres cles pertinents pour l'objectif indique.
2. Construis les tableaux et calculs necessaires.
3. Redige une synthese en langage clair, sans jargon technique inutile.
</instructions>

<output_format>
Un fichier Excel avec les donnees et graphiques, plus une synthese de 5 a 10 lignes en debut de reponse.
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
Tu es assistant de creation visuelle marketing.
</system_prompt>

<context>
Objectif du visuel : [a preciser]. Format cible : [post Instagram, banniere, etc.]. Charte graphique : [couleurs, police, logo].
</context>

<instructions>
1. Propose un brief visuel detaille : composition, textes a inclure, style.
2. Genere le visuel via Canva en respectant la charte graphique.
3. Propose 2 variantes de mise en page.
</instructions>

<output_format>
Le brief ecrit, suivi des visuels generes.
</output_format>`,
    uneSeuleFois:
      "La generation d'images native de Claude reste en retrait sur ce type de visuel. Pour un rendu marketing fiable, privilegiez Gemini en complement.",
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
        "Modifie des fiches CRM partagees avec l'equipe commerciale.",
      prompt: `<system_prompt>
Tu es assistant de gestion de base CRM.
</system_prompt>

<context>
Base CRM connectee : [HubSpot / Salesforce]. Criteres de qualite attendus : [champs obligatoires, format des numeros, doublons a eviter].
</context>

<instructions>
1. Identifie les fiches contact/entreprise incompletes ou en doublon.
2. Complete les champs manquants a partir des informations disponibles dans le CRM (sans inventer de donnees).
3. Signale les fiches necessitant une verification humaine.
</instructions>

<output_format>
Un tableau : Fiche | Probleme detecte | Action prise ou suggestion.
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
Tu es assistant de saisie de donnees.
</system_prompt>

<context>
Voici le(s) document(s) source(s) : [joindre]. Voici les champs a extraire : [liste des champs].
</context>

<instructions>
1. Extrait chaque champ demande depuis le document source.
2. Si un champ est absent ou illisible, indique-le explicitement au lieu de le deviner.
3. Structure le resultat pour import direct dans un tableur.
</instructions>

<output_format>
Un tableau avec une ligne par document et une colonne par champ demande.
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
        "Classement et rangement de documents, reversible, aucune suppression.",
      prompt: `<system_prompt>
Tu es assistant de classement documentaire.
</system_prompt>

<context>
Dossier a organiser : [chemin/nom du dossier connecte]. Regle de classement souhaitee : [par date, par client, par type de document].
</context>

<instructions>
1. Parcours les nouveaux documents deposes depuis le dernier passage.
2. Renomme-les selon la convention indiquee si elle existe, sinon propose-en une.
3. Deplace ou tague chaque document selon la regle de classement.
4. Signale les documents ambigus sans les deplacer.
</instructions>

<output_format>
Un journal des actions effectuees (Document | Action | Destination) et la liste des cas ambigus.
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
        nom: "Connecteur Google Drive (pour recuperer les pieces si besoin)",
        lien: "https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es analyste documentaire, rigoureux et factuel.
</system_prompt>

<context>
Voici les documents du dossier a analyser ou comparer : [joindre/connecter]. Points de comparaison attendus : [a preciser].
</context>

<instructions>
1. Lis l'ensemble des documents fournis.
2. Releve les points communs, les differences et les incoherences entre les documents.
3. Cite le document source pour chaque element releve.
</instructions>

<output_format>
Un tableau comparatif par critere, suivi d'une liste des incoherences identifiees avec reference au document source.
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
Tu es traducteur professionnel specialise dans les documents d'entreprise.
</system_prompt>

<context>
Document a traduire : [joindre/coller]. Langue source : [a preciser]. Langue cible : [a preciser]. Registre attendu : [formel/informel].
</context>

<instructions>
1. Traduis le document integralement en conservant la mise en forme.
2. Adapte les expressions idiomatiques et les unites (dates, devises) a la langue et au pays cibles.
3. Signale les termes techniques qui n'ont pas d'equivalent direct et explique le choix fait.
</instructions>

<output_format>
Le document traduit en entier, suivi d'une note sur les choix de traduction delicats.
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
Tu es concepteur de presentations professionnelles.
</system_prompt>

<context>
Voici le brief : [coller le brief]. Public : [a preciser]. Duree de presentation visee : [a preciser]. Charte graphique : [a preciser].
</context>

<instructions>
1. Structure la presentation en sections logiques (introduction, developpement, conclusion/appel a l'action).
2. Redige le contenu de chaque diapositive : titre, points cles, note oratoire courte.
3. Limite le texte a l'essentiel par diapositive (une idee par diapositive).
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
        nom: "Plugin Atlassian (Jira/Confluence, si utilise)",
        lien: "https://github.com/anthropics/claude-plugins-official",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Point de suivi de projet",
      frequence: "Quotidien ou hebdomadaire selon le rythme du projet",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Modifie un outil de suivi de projet visible par toute l'equipe.",
      prompt: `<system_prompt>
Tu es assistant de suivi de projet.
</system_prompt>

<context>
Outil de gestion de projet connecte : [Asana / Jira / Linear / autre]. Projet a suivre : [nom du projet].
</context>

<instructions>
1. Liste les taches en retard et celles arrivant a echeance sous 48h.
2. Identifie les taches bloquees sans mise a jour recente.
3. Redige un point d'avancement synthetique du projet.
</instructions>

<output_format>
Trois sections : Taches en retard, Taches bloquees, Point d'avancement (5 lignes maximum).
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
      frequence: "Hebdomadaire (jour de relance defini)",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Envoie des messages de prospection a des tiers externes.",
      prompt: `<system_prompt>
Tu es commercial charge de la prospection.
</system_prompt>

<context>
Cible : [type de prospect]. CRM connecte : [HubSpot/autre]. Offre a presenter : [a preciser].
</context>

<instructions>
1. Identifie les prospects du CRM n'ayant pas eu de contact depuis plus de 15 jours.
2. Redige pour chacun un message de relance personnalise, en te basant sur les echanges precedents enregistres.
3. Ne genere pas de message pour les prospects marques "ne pas contacter".
</instructions>

<output_format>
Un tableau : Prospect | Dernier contact | Message de relance propose.
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
        nom: "Plugin Sales (donnees client, si CRM connecte)",
        lien: "https://github.com/anthropics/knowledge-work-plugins",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant commercial charge des devis.
</system_prompt>

<context>
Client : [nom/infos]. Prestations/produits demandes : [liste avec quantites]. Grille tarifaire : [joindre ou preciser].
</context>

<instructions>
1. Etablis le detail du devis ligne par ligne avec les prix de la grille tarifaire fournie.
2. Calcule les totaux HT, TVA et TTC.
3. Redige un texte d'accompagnement professionnel adapte au client.
</instructions>

<output_format>
Un document (Word ou Excel selon le format demande) pret a envoyer, avec le detail chiffre et le texte d'accompagnement.
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
        nom: "Connecteur Xero (tiers, non verifie officiellement)",
        lien: "https://xero-connector.meridian.pilot.com/",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Categorisation des transactions",
      frequence: "Hebdomadaire",
      modeApprobation: "Manuelle",
      raisonApprobation: "Touche des donnees comptables sensibles.",
      prompt: `<system_prompt>
Tu es assistant comptable.
</system_prompt>

<context>
Logiciel comptable connecte : [QuickBooks/Xero]. Plan comptable en vigueur : [joindre ou preciser].
</context>

<instructions>
1. Liste les transactions non categorisees depuis le dernier passage.
2. Propose une categorie pour chacune, en te basant sur le libelle et les categorisations passees similaires.
3. Signale les transactions ambigues pour verification humaine.
</instructions>

<output_format>
Un tableau : Transaction | Montant | Categorie proposee | Confiance (haute/moyenne/a verifier).
</output_format>`,
    },
    uneSeuleFois:
      "Deja connecte votre logiciel comptable pour une autre tache ? Vous n'avez rien a refaire.",
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
        nom: "Connecteur QuickBooks ou Xero (meme mise en place que F19)",
        lien: "https://github.com/intuit/quickbooks-online-mcp-server",
        type: "officiel",
      },
    ],
    tachePlanifiee: {
      nom: "Rapprochement bancaire",
      frequence: "Hebdomadaire ou mensuelle selon la cloture",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Touche des donnees financieres sensibles ; les ecarts doivent etre valides avant correction.",
      prompt: `<system_prompt>
Tu es assistant comptable charge du rapprochement bancaire.
</system_prompt>

<context>
Releve bancaire : [joindre ou connecter]. Ecritures comptables : [connecter le logiciel comptable].
</context>

<instructions>
1. Compare le releve bancaire aux ecritures comptables enregistrees.
2. Identifie les ecarts (transactions bancaires sans ecriture, ecritures sans transaction correspondante).
3. Propose une explication probable pour chaque ecart quand c'est possible (delai d'encaissement, frais bancaires, etc.).
</instructions>

<output_format>
Un tableau des ecarts : Date | Montant | Cote concerne (banque/comptabilite) | Explication probable.
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
Factures impayees : [connecter le logiciel comptable ou joindre le fichier]. Delai de paiement contractuel : [a preciser].
</context>

<instructions>
1. Liste les factures dont l'echeance est depassee, classees par anciennete.
2. Redige un message de relance adapte au niveau de retard (rappel courtois sous 15 jours, ton plus ferme au-dela).
3. Ne genere pas de relance pour les factures deja signalees en litige.
</instructions>

<output_format>
Un tableau : Client | Facture | Jours de retard | Message de relance propose.
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
        nom: "Connecteur communautaire Dynamics 365 (a valider avant prod, si ERP Dynamics)",
        lien: "https://github.com/zhound420/D365FO-claude-connector",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Suivi des commandes fournisseurs",
      frequence: "Quotidien",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Touche des donnees partagees avec des fournisseurs externes.",
      prompt: `<system_prompt>
Tu es assistant logistique charge du suivi des commandes.
</system_prompt>

<context>
Systeme de commande/ERP connecte : [a preciser]. Fournisseurs prioritaires : [liste].
</context>

<instructions>
1. Liste les commandes en retard de livraison par rapport a la date prevue.
2. Signale tout changement de fournisseur ou de delai communique depuis le dernier passage.
3. Propose les relances a envoyer aux fournisseurs concernes.
</instructions>

<output_format>
Un tableau : Commande | Fournisseur | Statut | Action proposee.
</output_format>`,
    },
  },
  F23: {
    outils: [
      {
        nom: "Plugin Data (requetes SQL, analyse de tendances)",
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
      nom: "Prevision de la demande",
      frequence: "Mensuelle",
      modeApprobation: "Automatique",
      raisonApprobation:
        "Produit un rapport de prevision, ne passe aucune commande.",
      prompt: `<system_prompt>
Tu es analyste supply chain.
</system_prompt>

<context>
Historique des ventes/consommations : [connecter la source ou joindre le fichier]. Horizon de prevision : [a preciser].
</context>

<instructions>
1. Analyse les tendances de consommation sur l'historique fourni.
2. Etablis une prevision de la demande pour la periode a venir, en signalant les saisonnalites identifiees.
3. Propose des quantites d'approvisionnement recommandees par reference.
</instructions>

<output_format>
Un tableau Excel : Reference | Prevision de demande | Stock actuel | Quantite a commander recommandee.
</output_format>`,
    },
  },
  F24: {
    outils: [
      {
        nom: "MCP Google Maps (serveur de reference, a heberger soi-meme ou via un hebergeur MCP)",
        lien: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/google-maps",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant logistique charge de la planification des tournees.
</system_prompt>

<context>
Livraisons/interventions du jour : [liste des adresses et contraintes horaires]. Point de depart : [adresse].
</context>

<instructions>
1. Determine un ordre de passage optimise pour minimiser le temps de trajet total.
2. Estime la duree de chaque trajet et l'heure d'arrivee prevue a chaque etape.
3. Signale les contraintes horaires qui semblent difficiles a tenir.
</instructions>

<output_format>
Un tableau ordonne : Ordre | Adresse | Heure d'arrivee estimee | Alerte eventuelle.
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
      frequence: "Quotidien, plusieurs fois par jour si volume eleve",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Oriente des demandes clients, contact potentiellement visible par le client.",
      prompt: `<system_prompt>
Tu es assistant de tri des demandes clients.
</system_prompt>

<context>
Canal(aux) surveille(s) : [ticketing/boite mail connectee]. Equipes disponibles : [liste avec leur domaine].
</context>

<instructions>
1. Classe chaque nouvelle demande par sujet et par urgence.
2. Oriente chaque demande vers l'equipe la plus pertinente parmi celles listees.
3. Signale les demandes en double avec un ticket existant.
</instructions>

<output_format>
Un tableau : Demande | Sujet | Urgence | Equipe assignee.
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
        nom: "Skill native Excel (synthese chiffree)",
        lien: "https://support.claude.com/en/articles/12650343-use-claude-for-excel",
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
1. Identifie les themes recurrents, positifs et negatifs.
2. Quantifie la part de chaque theme dans l'ensemble des avis.
3. Propose 3 actions concretes a partir des points negatifs les plus frequents.
</instructions>

<output_format>
Un tableau des themes avec leur frequence, suivi de 3 recommandations d'action.
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
Tu es analyste marketing specialise en segmentation client.
</system_prompt>

<context>
Base de donnees clients : [connecter ou joindre]. Objectif de la segmentation : [a preciser, ex. relance, upsell].
</context>

<instructions>
1. Propose des criteres de segmentation pertinents pour l'objectif indique.
2. Constitue les segments a partir des donnees disponibles.
3. Decris chaque segment en une phrase et sa taille.
</instructions>

<output_format>
Un tableau : Segment | Criteres | Taille | Description courte.
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
        nom: "MCP tiers Google Ads (a evaluer avant connexion d'un compte reel)",
        lien: "https://mcp-ads.com/",
        type: "tiers",
      },
      {
        nom: "MCP tiers Meta Ads (a evaluer avant connexion d'un compte reel)",
        lien: "https://pasqualepillitteri.it/en/news/1707/official-meta-ads-mcp-claude-29-tools-2026",
        type: "tiers",
      },
    ],
    tachePlanifiee: {
      nom: "Optimisation publicitaire",
      frequence: "Hebdomadaire",
      modeApprobation: "Manuelle",
      raisonApprobation:
        "Modifie des budgets publicitaires reels sur des plateformes externes.",
      prompt: `<system_prompt>
Tu es assistant en optimisation publicitaire.
</system_prompt>

<context>
Comptes publicitaires connectes : [Google Ads/Meta Ads]. Objectif de campagne : [a preciser, ex. CPA cible].
</context>

<instructions>
1. Analyse les performances des campagnes actives depuis le dernier passage.
2. Identifie les campagnes/annonces sous-performantes par rapport a l'objectif.
3. Propose des ajustements concrets (budget, ciblage, enchere) sans les appliquer automatiquement.
</instructions>

<output_format>
Un tableau : Campagne | Indicateur cle | Ecart a l'objectif | Ajustement propose.
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
Voici les CV a examiner : [joindre]. Voici la fiche de poste et les criteres attendus : [joindre/coller].
</context>

<instructions>
1. Evalue chaque candidature par rapport aux criteres de la fiche de poste.
2. Attribue une note ou un niveau d'adequation par critere, sans porter de jugement sur des elements hors criteres professionnels.
3. Classe les candidatures de la plus a la moins adequate.
</instructions>

<output_format>
Un tableau : Candidat | Note par critere | Score global | Points forts | Points de vigilance.
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
Tu es concepteur pedagogique.
</system_prompt>

<context>
Profil de l'apprenant : [niveau, poste, objectifs]. Competences a acquerir : [liste].
</context>

<instructions>
1. Decoupe le parcours en modules progressifs.
2. Pour chaque module, precise l'objectif, le contenu et la duree estimee.
3. Propose un format d'evaluation pour chaque module.
</instructions>

<output_format>
Un plan de formation structure par module (Objectif | Contenu | Duree | Evaluation).
</output_format>`,
  },
  F31: {
    outils: [
      {
        nom: "Lecture d'image/plan native de Claude (aucune activation necessaire)",
        lien: "https://claude.ai/",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es assistant technique specialise dans la lecture de plans.
</system_prompt>

<context>
Voici le plan a analyser : [joindre l'image ou le PDF]. Elements a reperer et compter : [a preciser, ex. prises electriques, fenetres].
</context>

<instructions>
1. Repere chaque occurrence de l'element demande sur le plan.
2. Compte le nombre total d'occurrences.
3. Signale les zones ou la lecture est incertaine (qualite d'image, symboles ambigus).
</instructions>

<output_format>
Le total par element demande, suivi d'une liste des zones incertaines.
</output_format>`,
  },
  F32: {
    outils: [
      {
        nom: "Connecteur Google Drive ou Microsoft 365 (depot des photos de chantier)",
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
Dossier photos connecte : [chemin]. Planning previsionnel des travaux : [joindre ou preciser].
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
        nom: "Skill native PDF/Word (rapport de risques)",
        lien: "https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude",
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
        nom: "Plugin Canva ou Adobe for creativity",
        lien: "https://github.com/anthropics/claude-plugins-official",
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
1. Decris precisement chaque modification a apporter, element par element.
2. Applique les modifications realisables via Canva/Adobe.
3. Signale les modifications qui depassent les capacites de l'outil et necessitent Gemini ou un graphiste.
</instructions>

<output_format>
L'image modifiee (ou le brief detaille si la retouche doit etre faite ailleurs), suivie de la liste des limites rencontrees.
</output_format>`,
    uneSeuleFois:
      "La retouche d'image fine reste une limite connue de Claude : privilegiez Gemini pour ce cas precis, Claude pouvant rediger le brief de retouche et piloter Canva/Adobe pour les modifications simples.",
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
Tu es assistant de deploiement graphique.
</system_prompt>

<context>
Visuel source : [joindre]. Palettes de couleurs souhaitees : [liste des variantes attendues].
</context>

<instructions>
1. Genere une variante du visuel pour chaque palette demandee, via Canva.
2. Conserve la composition et les textes du visuel d'origine.
3. Indique pour chaque variante si le rendu est fidele ou approximatif.
</instructions>

<output_format>
Une variante par palette demandee, avec une note de fidelite pour chacune.
</output_format>`,
    uneSeuleFois:
      "Meme limite que la retouche d'image : Gemini est recommande pour un rendu fiable sur des variantes colorimetriques complexes.",
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
Tu es assistant monteur video.
</system_prompt>

<context>
Projet Descript connecte : [nom du projet]. Element ou plan recherche : [description precise, ex. "le moment ou la personne sourit face camera"].
</context>

<instructions>
1. Parcours la transcription des rushes pour reperer les passages correspondant a la description.
2. Indique le code temporel (timecode) de chaque passage trouve.
3. Classe les passages du plus au moins pertinent.
</instructions>

<output_format>
Un tableau : Rush | Timecode | Description du plan | Pertinence.
</output_format>`,
  },
  F37: {
    outils: [
      {
        nom: "MCP officiel Descript (meme mise en place que F36)",
        lien: "https://help.descript.com/api-and-mcp/mcp",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es monteur video assistant.
</system_prompt>

<context>
Projet Descript connecte : [nom]. Transcription source : [connectee via Descript]. Duree cible du montage : [a preciser]. Angle editorial : [a preciser].
</context>

<instructions>
1. Selectionne dans la transcription les passages qui servent l'angle editorial indique.
2. Ordonne-les de facon coherente pour respecter la duree cible.
3. Effectue un premier assemblage dans Descript a partir de cette selection.
</instructions>

<output_format>
La liste ordonnee des passages retenus avec timecodes, suivie de la confirmation de l'assemblage effectue dans Descript.
</output_format>`,
  },
  F38: {
    outils: [
      {
        nom: "MCP officiel Descript (utile si le fichier video est deja dans ce projet)",
        lien: "https://help.descript.com/api-and-mcp/mcp",
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
3. Traduis dans la ou les langues cibles demandees si different de la langue source.
</instructions>

<output_format>
Un fichier de sous-titres au format SRT (numero, timecode, texte) pour chaque langue demandee.
</output_format>`,
    uneSeuleFois:
      "Aucune activation necessaire au-dela de la transcription (voir F04).",
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
Enregistrement vocal a nettoyer : [joindre ou connecter via ElevenLabs]. Problemes constates : [bruit de fond, respirations, hesitations, etc.].
</context>

<instructions>
1. Identifie les defauts a corriger (bruit de fond, respirations, silences trop longs, hesitations).
2. Applique le nettoyage via ElevenLabs.
3. Confirme les traitements appliques.
</instructions>

<output_format>
Le fichier audio nettoye, suivi de la liste des traitements appliques.
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
        nom: "MCP Descript (si le montage est deja dans ce projet)",
        lien: "https://help.descript.com/api-and-mcp/mcp",
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
2. Genere un export par format demande.
3. Signale les formats ou le recadrage entraine une perte d'information importante.
</instructions>

<output_format>
Un export video par format demande, avec une note pour chaque format sur la qualite du recadrage.
</output_format>`,
  },
  F41: {
    outils: [
      {
        nom: "MCP officiel ElevenLabs (meme mise en place que F39)",
        lien: "https://github.com/elevenlabs/elevenlabs-mcp",
        type: "officiel",
      },
    ],
    promptPonctuel: `<system_prompt>
Tu es adaptateur de doublage.
</system_prompt>

<context>
Script original : [joindre/coller]. Langue cible : [a preciser]. Contraintes de duree : [synchronisation labiale ou non].
</context>

<instructions>
1. Traduis et adapte le script pour la langue cible, en respectant le rythme et la duree des repliques d'origine.
2. Indique pour chaque replique le timecode d'origine.
3. Prepare le texte final au format attendu par ElevenLabs pour la generation vocale.
</instructions>

<output_format>
Un tableau : Timecode | Texte original | Texte adapte pour le doublage.
</output_format>`,
    uneSeuleFois:
      "Limite connue de Claude sur la generation vocale native : ElevenLabs (via le MCP) ou Gemini restent les solutions fiables, Claude servant a preparer et structurer le texte a doubler.",
  },
  F42: {
    outils: [],
    promptPonctuel: `<system_prompt>
Tu es scenariste de contenus video courts.
</system_prompt>

<context>
Objectif de la sequence : [a preciser]. Duree visee : [a preciser]. Style visuel souhaite : [a preciser].
</context>

<instructions>
1. Decris precisement la sequence attendue : decor, action, mouvement de camera, ambiance.
2. Decoupe la description en plans distincts si la sequence depasse quelques secondes.
3. Redige le prompt final au format attendu par un outil de generation video.
</instructions>

<output_format>
Le brief plan par plan, suivi du prompt final pret a copier dans Gemini.
</output_format>`,
    uneSeuleFois:
      "Aucun outil natif Claude pour la generation video. Gemini (Veo) est la solution recommandee ; Claude peut en revanche rediger le brief/scenario detaille a fournir a Gemini.",
  },
};

export const outilsCount = (code: string) => miseEnPlace[code]?.outils.length ?? 0;
