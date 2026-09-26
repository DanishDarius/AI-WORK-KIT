// Champs des deux formulaires de contact, partagés entre les composants
// (navigateur) et la route /api/contact (serveur) : un seul endroit pour les
// noms techniques et les libellés repris dans l'email.

export type Formulaire = "systemes-ia" | "transformation-ia";

export const formulaireLabels: Record<Formulaire, string> = {
  "systemes-ia": "Systèmes IA sur mesure",
  "transformation-ia": "Transformation IA",
};

// Ordre et libellés des réponses dans l'email reçu.
export const champsReponses: Record<Formulaire, [string, string][]> = {
  "systemes-ia": [
    ["secteur", "Secteur"],
    ["taille", "Taille de l'entreprise"],
    ["besoin", "Besoin"],
    ["budget", "Budget envisagé"],
  ],
  "transformation-ia": [
    ["activite", "Activité à améliorer"],
    ["resultat", "Résultat attendu"],
    ["outils", "Outils et données concernés"],
    ["contraintes", "Contraintes"],
    ["nb_personnes", "Nombre de personnes"],
    ["equipe", "Équipe concernée"],
    ["usage_ia", "Usage actuel de l'IA"],
  ],
};

export type DemandeContact = {
  formulaire: Formulaire;
  nom: string;
  email: string;
  entreprise?: string;
  fonction?: string;
  reponses: Record<string, string>;
  // Champ piège invisible : rempli uniquement par les robots.
  site?: string;
};

export async function envoyerDemande(demande: DemandeContact) {
  let response: Response;
  try {
    response = await fetch("/api/contact", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(demande),
    });
  } catch {
    throw new Error(
      "Connexion impossible. Vérifiez votre réseau puis réessayez.",
    );
  }
  if (response.ok) return;
  if (response.status === 401)
    throw new Error("Votre session a expiré. Reconnectez-vous pour envoyer votre demande.");
  if (response.status === 429)
    throw new Error("Vous avez déjà envoyé plusieurs demandes. Réessayez dans une heure ou écrivez-nous à support@parlonsads.com.");
  if (response.status === 400) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Certaines informations sont incomplètes.");
  }
  throw new Error(
    "L'envoi a échoué. Réessayez dans un instant ou écrivez-nous à support@parlonsads.com.",
  );
}
