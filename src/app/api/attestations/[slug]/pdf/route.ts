import { NextResponse } from "next/server";
import { fabriquerAttestationPdf } from "@/lib/attestation-pdf";
import { lireCatalogue, metierParSlug } from "@/lib/contenu";
import { erreurServeur } from "@/lib/reponses-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

export const runtime = "nodejs";

// GET /api/attestations/[slug]/pdf : le PDF de l'attestation obtenue pour ce
// métier, à télécharger depuis le compte (étape D). Il se fabrique à la
// demande à partir du rendu validé : nom, métier, date et numéro.
//
// Règle S1 : accès payé vérifié. L'abonnement n'est pas demandé : une
// attestation obtenue reste au titulaire, même après la fin de l'abonnement.
// Règle C2 : 1 requête propre au compte ; le métier vient du cache.
// Règle C4 : rien n'est écrit.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;

  let catalogue;
  try {
    catalogue = await lireCatalogue();
  } catch (erreur) {
    return erreurServeur("attestation-pdf", erreur);
  }
  const metier = metierParSlug(catalogue, slug);
  if (!metier) return NextResponse.json({ error: "Métier introuvable" }, { status: 404 });

  const { data, error } = await createAdminClient()
    .from("rendus_attestation")
    .select("numero, nom_attestation, corrige_le")
    .eq("user_id", access.user.id)
    .eq("metier_id", metier.id)
    .eq("statut", "valide")
    .maybeSingle();
  if (error) return erreurServeur("attestation-pdf", error);
  const ligne = data as { numero: string | null; nom_attestation: string | null; corrige_le: string | null } | null;
  if (!ligne?.numero || !ligne.nom_attestation || !ligne.corrige_le) {
    return NextResponse.json({ error: "Aucune attestation obtenue pour ce métier." }, { status: 404 });
  }

  let pdf;
  try {
    pdf = await fabriquerAttestationPdf({ nom: ligne.nom_attestation, metier: metier.nom, numero: ligne.numero, delivreeLe: ligne.corrige_le });
  } catch (erreur) {
    return erreurServeur("attestation-pdf", erreur);
  }

  return new Response(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(pdf.length),
      "Content-Disposition": `attachment; filename="AIW-attestation-${metier.slug}-${ligne.numero}.pdf"`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
