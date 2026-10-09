import { NextResponse } from "next/server";
import { conditionsRemplies, contexteAttestation, echeanceCorrection, lireConditions, MAX_FICHIERS, type StatutRendu } from "@/lib/attestations";
import { configR2 } from "@/lib/r2";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/attestations/[slug] : où en est l'abonné pour l'attestation d'un
// métier. Les conditions, l'exercice final quand elles sont remplies, et son
// dernier rendu.
//
// Règle S2 : l'exercice est un contenu payant, réservé aux abonnés qui
// remplissent les conditions ; la réponse type du correcteur ne sort jamais.
// Règle C2 : 3 requêtes propres au compte (tâches faites, ressources
// installées, dernier rendu), lancées ensemble. Le contenu vient du cache.
// Règle C4 : rien n'est écrit.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const ctx = await contexteAttestation(access, slug);
  if ("response" in ctx) return ctx.response;
  const { supabase, user, metier, kit, exercice, taches, abonne } = ctx;

  const [conditions, dernier] = await Promise.all([
    lireConditions(supabase, user.id, abonne, kit, taches),
    createAdminClient()
      .from("rendus_attestation")
      .select("statut, fichiers, commentaire, cree_le, rendu_le, corrige_le")
      .eq("user_id", user.id)
      .eq("metier_id", metier.id)
      .order("cree_le", { ascending: false })
      .limit(1),
  ]);
  if (dernier.error) return NextResponse.json({ error: "Chargement impossible." }, { status: 500 });

  const ligne = (dernier.data?.[0] ?? null) as
    | { statut: StatutRendu; fichiers: unknown; commentaire: string | null; rendu_le: string | null; corrige_le: string | null }
    | null;
  const ouvert = conditionsRemplies(conditions);
  // Un brouillon (fichiers en cours d'envoi) ne compte pas encore comme un rendu.
  const rendu = ligne && ligne.statut !== "brouillon"
    ? {
        statut: ligne.statut,
        rendu_le: ligne.rendu_le,
        echeance: ligne.rendu_le ? echeanceCorrection(ligne.rendu_le).toISOString() : null,
        corrige_le: ligne.corrige_le,
        commentaire: ligne.statut === "a_refaire" ? ligne.commentaire : null,
        nb_fichiers: Array.isArray(ligne.fichiers) ? ligne.fichiers.length : 0,
      }
    : null;

  return NextResponse.json(
    {
      metier: { slug: metier.slug, nom: metier.nom },
      conditions,
      exercice: ouvert
        ? {
            numero: exercice.numero,
            cas: exercice.cas,
            titre_donnees: exercice.titre_donnees,
            donnees: exercice.donnees,
            travail: exercice.travail,
            a_rendre: exercice.a_rendre,
          }
        : null,
      rendu,
      envoi_ouvert: configR2() !== null,
      max_fichiers: MAX_FICHIERS,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
