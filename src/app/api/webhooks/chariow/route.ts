import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

// POST /api/webhooks/chariow — reçoit le Pulse "successful.sale" de Chariow.
//
// À configurer côté Chariow (Automatisation → Pulses → Ajouter un Pulse) :
// - Événement : Vente réussie (successful.sale)
// - Produit : AI WORK KIT uniquement (filtrage par produit "Appliquer à un produit")
// - URL de destination : https://<ton-domaine>/api/webhooks/chariow
//
// Sécurité (voir https://chariow.dev/en/guides/pulse-security.md) : Chariow
// signe chaque requête en HMAC-SHA256 sur le corps BRUT (avant tout parsing
// JSON), au format "sha256=<hex>", dans l'en-tête x-chariow-signature. Le
// secret utilisé est celui du Pulse ("Secret de signature", préfixe
// whsec_...), à renseigner dans la variable d'environnement
// CHARIOW_WEBHOOK_SECRET. Il faut impérativement vérifier la signature sur
// le texte brut reçu, sans le re-sérialiser, sous peine de ne jamais faire
// correspondre le digest.
//
// Ce point d'entrée reste tolérant sur la forme exacte du payload Chariow :
// il cherche l'email du client et l'identifiant de vente sous plusieurs noms
// de champs possibles.
export async function POST(request: Request) {
  const corpsBrut = await request.text();

  // Vérification de la signature HMAC-SHA256 (si le secret est configuré).
  const secretAttendu = process.env.CHARIOW_WEBHOOK_SECRET;
  if (secretAttendu) {
    const signatureRecue = request.headers.get("x-chariow-signature") ?? "";
    const signatureCalculee =
      "sha256=" +
      createHmac("sha256", secretAttendu).update(corpsBrut).digest("hex");

    const bufferRecu = Buffer.from(signatureRecue);
    const bufferCalcule = Buffer.from(signatureCalculee);

    const signatureValide =
      bufferRecu.length === bufferCalcule.length &&
      timingSafeEqual(bufferRecu, bufferCalcule);

    if (!signatureValide) {
      return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    }
  }

  let payload: any = null;
  try {
    payload = corpsBrut ? JSON.parse(corpsBrut) : null;
  } catch {
    payload = null;
  }
  if (!payload) {
    return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
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
