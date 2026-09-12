import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// POST /api/webhooks/chariow — reçoit le Pulse "successful.sale" de Chariow.
//
// À configurer côté Chariow (Automatisation → Pulses → Ajouter un Pulse) :
// - Événement : Successful Sale
// - Produit : AI WORK KIT uniquement (si le filtrage par produit est possible)
// - URL de destination : https://<ton-domaine>/api/webhooks/chariow
//
// Ce point d'entrée est volontairement tolérant sur la forme exacte du payload
// Chariow (elle sera ajustée dès qu'on aura un exemple réel de Pulse reçu) —
// il cherche l'email du client et l'identifiant de vente sous plusieurs noms
// de champs possibles.
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
  }

  // Optionnel : si Chariow fournit un secret de signature pour ce Pulse,
  // on le vérifie ici avant tout traitement (variable CHARIOW_WEBHOOK_SECRET).
  const secretAttendu = process.env.CHARIOW_WEBHOOK_SECRET;
  if (secretAttendu) {
    const secretRecu =
      request.headers.get("x-chariow-signature") ??
      request.headers.get("x-webhook-secret");
    if (secretRecu !== secretAttendu) {
      return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    }
  }

  // Extraction tolérante — à préciser dès qu'on a un exemple réel de payload.
  const email: string | undefined =
    payload.customer?.email ?? payload.client?.email ?? payload.email;
  const saleId: string | undefined =
    payload.sale?.id ?? payload.id ?? payload.sale_id;
  const productId: string | undefined =
    payload.product?.id ?? payload.product_id;
  const status: string | undefined = payload.status ?? payload.sale?.status;

  if (!email || !saleId) {
    return NextResponse.json(
      { error: "Champs requis manquants (email / identifiant de vente)" },
      { status: 400 }
    );
  }

  const produitAttendu = process.env.CHARIOW_PRODUIT_ID_AI_WORK_KIT;
  if (produitAttendu && productId && productId !== produitAttendu) {
    // Vente d'un autre produit Chariow : on l'ignore proprement.
    return NextResponse.json({ ok: true, ignore: true });
  }

  if (status && status !== "successful" && status !== "completed") {
    return NextResponse.json({ ok: true, ignore: true, raison: "statut non finalisé" });
  }

  const supabaseAdmin = createAdminClient();

  // Anti-doublon : si cette vente a déjà été traitée, on ne recrée rien.
  const { data: dejaTraite } = await supabaseAdmin
    .from("acces_clients")
    .select("id")
    .eq("chariow_sale_id", saleId)
    .maybeSingle();

  if (dejaTraite) {
    return NextResponse.json({ ok: true, deja_traite: true });
  }

  const { error: erreurInsertion } = await supabaseAdmin
    .from("acces_clients")
    .insert({ email, chariow_sale_id: saleId, statut: "actif" });

  if (erreurInsertion) {
    return NextResponse.json({ error: erreurInsertion.message }, { status: 500 });
  }

  // Crée le compte (ou récupère le compte existant) et envoie le lien magique
  // de connexion à l'acheteur.
  const { error: erreurInvitation } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(email);

  if (erreurInvitation && !erreurInvitation.message?.includes("already been registered")) {
    return NextResponse.json({ error: erreurInvitation.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
