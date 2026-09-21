// Contenu du guide "Mettre en place" : outils reels, prompts prets a copier (squelette
// officiel Claude) et configuration des taches planifiees Cowork, tache par tache.
// Deploiement progressif : seules les taches listees ici affichent l'onglet rempli,
// les autres affichent un message "contenu a venir" (voir mise-en-place-panel.tsx).
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
};

export const outilsCount = (code: string) => miseEnPlace[code]?.outils.length ?? 0;
