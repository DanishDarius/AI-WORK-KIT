// Faux client Supabase pour les tests : il enregistre chaque opération et
// renvoie la réponse décidée par le test. Aucun appel réseau.

export type Operation = {
  table: string;
  action: "select" | "insert" | "update" | "delete" | "upsert" | "rpc";
  valeurs?: unknown;
  filtres: [methode: string, colonne: string, valeur: unknown][];
};

export type Reponse = { data?: unknown; error?: { message: string } | null; count?: number };

const ECRITURES = ["insert", "update", "delete", "upsert"] as const;
type Ecriture = (typeof ECRITURES)[number];
const estEcriture = (v: string): v is Ecriture => (ECRITURES as readonly string[]).includes(v);

export function creerSupabaseFactice(repondre: (op: Operation) => Reponse = () => ({})) {
  const operations: Operation[] = [];
  const invitations: string[] = [];
  const etat: { erreurInvitation: { message: string } | null; utilisateur: { id: string; email: string } | null } = {
    erreurInvitation: null,
    utilisateur: null,
  };

  function requete(table: string) {
    const op: Operation = { table, action: "select", filtres: [] };
    let enregistree = false;
    const terminer = () => {
      if (!enregistree) {
        operations.push(op);
        enregistree = true;
      }
      const reponse = repondre(op);
      return Promise.resolve({ data: reponse.data ?? null, error: reponse.error ?? null, count: reponse.count ?? null });
    };
    const chaine: unknown = new Proxy(
      {},
      {
        get(_cible, prop) {
          const nom = String(prop);
          if (nom === "then") {
            return (ok: (v: unknown) => unknown, ko: (e: unknown) => unknown) => terminer().then(ok, ko);
          }
          if (nom === "maybeSingle" || nom === "single") return () => terminer();
          return (...args: unknown[]) => {
            if (estEcriture(nom)) {
              op.action = nom;
              op.valeurs = args[0];
            } else if (nom !== "select") {
              op.filtres.push([nom, String(args[0]), args[1]]);
            }
            return chaine;
          };
        },
      },
    );
    return chaine;
  }

  const client = {
    from: (table: string) => requete(table),
    // Fonction de la base (« rpc ») : enregistrée comme une écriture, sous son nom.
    rpc: (nom: string, args?: unknown) => {
      const op: Operation = { table: nom, action: "rpc", valeurs: args, filtres: [] };
      operations.push(op);
      const reponse = repondre(op);
      return Promise.resolve({ data: reponse.data ?? null, error: reponse.error ?? null });
    },
    auth: {
      // La session se lit dans le jeton (getClaims), sans appel réseau. Le faux
      // client n'a volontairement PAS de getUser : un code serveur qui
      // l'appellerait ferait échouer son test (règle C2).
      getClaims: async () => ({
        data: etat.utilisateur
          ? { claims: { sub: etat.utilisateur.id, email: etat.utilisateur.email, role: "authenticated", is_anonymous: false } }
          : null,
        error: null,
      }),
      verifyOtp: async () => ({ data: {}, error: null }),
      admin: {
        inviteUserByEmail: async (email: string) => {
          invitations.push(email);
          return { data: {}, error: etat.erreurInvitation };
        },
        generateLink: async (params: { email: string }) => {
          invitations.push(params.email);
          return {
            data: { properties: { action_link: "https://exemple.test/lien", hashed_token: "jeton" } },
            error: etat.erreurInvitation,
          };
        },
      },
    },
  };

  const ecritures = (table?: string) =>
    operations.filter((op) => op.action !== "select" && (!table || op.table === table));

  return { client, operations, invitations, etat, ecritures };
}
