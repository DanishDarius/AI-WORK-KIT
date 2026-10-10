import { NextResponse } from "next/server";
import { echeanceCorrection } from "@/lib/attestations";
import { lireCatalogue, metierParId } from "@/lib/contenu";
import { exigerCorrecteur } from "@/lib/correction";
import { erreurServeur } from "@/lib/reponses-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

// GET /api/correction : les rendus d'attestation à corriger, du plus ancien
// au plus récent, puis les 20 dernières décisions. Réservée au correcteur
// (variable CORRECTEUR_EMAILS, src/lib/correction.ts), après l'accès payé
// (règle S1).
//
// Règle C2 : 2 requêtes (les rendus en attente, les dernières décisions),
// lancées ensemble ; les métiers viennent du cache. Règle C4 : rien n'est écrit.
// Règle C5 : les deux listes sont bornées.
export async function GET() {
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const refus = exigerCorrecteur(access);
  if (refus) return refus;

  const admin = createAdminClient();
  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("correction", erreur);
  }
  const [attente, decisions] = await Promise.all([
    admin
      .from("rendus_attestation")
      .select("id, metier_id, nom_attestation, fichiers, rendu_le")
      .eq("statut", "en_attente")
      .order("rendu_le", { ascending: true })
      .limit(100),
    admin
      .from("rendus_attestation")
      .select("id, metier_id, nom_attestation, statut, corrige_le")
      .in("statut", ["valide", "a_refaire"])
      .order("corrige_le", { ascending: false })
      .limit(20),
  ]);
  if (attente.error) return erreurServeur("correction", attente.error);
  if (decisions.error) return erreurServeur("correction", decisions.error);

  const maintenant = Date.now();
  const nomMetier = (id: string) => metierParId(catalogue, id)?.nom ?? "Métier retiré";
  type Attente = { id: string; metier_id: string; nom_attestation: string | null; fichiers: unknown; rendu_le: string };
  type Faite = { id: string; metier_id: string; nom_attestation: string | null; statut: string; corrige_le: string };
  return NextResponse.json(
    {
      a_corriger: ((attente.data ?? []) as Attente[]).map((r) => ({
        id: r.id,
        metier: nomMetier(r.metier_id),
        nom: r.nom_attestation,
        nb_fichiers: Array.isArray(r.fichiers) ? r.fichiers.length : 0,
        rendu_le: r.rendu_le,
        echeance: echeanceCorrection(r.rendu_le).toISOString(),
        en_retard: echeanceCorrection(r.rendu_le).getTime() < maintenant,
      })),
      decisions: ((decisions.data ?? []) as Faite[]).map((r) => ({
        id: r.id,
        metier: nomMetier(r.metier_id),
        nom: r.nom_attestation,
        statut: r.statut,
        corrige_le: r.corrige_le,
      })),
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
