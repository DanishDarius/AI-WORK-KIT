import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { estEmail, normaliserEmail } from "@/lib/normaliser";
import { erreurServeur } from "@/lib/reponses-api";
import { createAdminClient } from "@/lib/supabase/admin";

// Forme du Pulse « successful.sale », d'après la documentation Chariow
// (https://chariow.dev/en/guides/pulses.md). Seuls les champs utilisés ici
// sont décrits. Tout est « unknown » : rien n'est cru sans validation.
type ChariowPayload = {
  event?: unknown;
  sale?: { id?: unknown; status?: unknown };
  product?: { id?: unknown };
  customer?: { email?: unknown };
};

const STATUTS_PAYES = new Set(["completed", "successful"]);

const chaine = (valeur: unknown, max = 200) =>
  typeof valeur === "string" && valeur.length > 0 && valeur.length <= max ? valeur : null;

const ignorer = (raison: string) => NextResponse.json({ ok: true, ignore: true, raison });

// POST /api/webhooks/chariow : reçoit le Pulse "successful.sale" de Chariow.
//
// À configurer côté Chariow (Automatisation → Pulses → Ajouter un Pulse) :
// - Événement : Vente réussie (successful.sale)
// - Produits : AI WORK KIT et les trois produits d'abonnement
//   (variables CHARIOW_PRODUIT_ID_ABONNEMENT_MENSUEL, _ANNUEL et _A_VIE)
// - URL de destination : https://<domaine>/api/webhooks/chariow
//
// Sécurité (règle S5, voir https://chariow.dev/en/guides/pulse-security.md) :
// Chariow signe chaque requête en HMAC-SHA256 sur le corps BRUT, au format
// "sha256=<hex>", dans l'en-tête x-chariow-signature. Le secret est celui du
// Pulse (préfixe whsec_...), dans la variable CHARIOW_WEBHOOK_SECRET.
// - Sans secret configuré, la route refuse tout : jamais d'accès sans signature.
// - Seule une vente « successful.sale », payée, d'un produit connu, avec une
//   adresse e-mail valide, ouvre un accès. Le reste est ignoré ou refusé.
// - Une vente déjà traitée n'est jamais rejouée (identifiant de vente unique).
//
// Chariow réessaie 5 fois une livraison qui reçoit une erreur, puis désactive
// le Pulse. Un événement qui ne nous concerne pas reçoit donc toujours 200.
export async function POST(request: Request) {
  const corpsBrut = await request.text();

  const secretAttendu = process.env.CHARIOW_WEBHOOK_SECRET;
  if (!secretAttendu) {
    console.error("[chariow] CHARIOW_WEBHOOK_SECRET manquant : requête refusée");
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 503 });
  }

  const signatureRecue = request.headers.get("x-chariow-signature") ?? "";
  const signatureCalculee =
    "sha256=" + createHmac("sha256", secretAttendu).update(corpsBrut).digest("hex");
  const bufferRecu = Buffer.from(signatureRecue);
  const bufferCalcule = Buffer.from(signatureCalculee);
  const signatureValide =
    bufferRecu.length === bufferCalcule.length && timingSafeEqual(bufferRecu, bufferCalcule);
  if (!signatureValide) {
    return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
  }

  let payload: ChariowPayload | null = null;
  try {
    const lu: unknown = corpsBrut ? JSON.parse(corpsBrut) : null;
    payload = lu && typeof lu === "object" && !Array.isArray(lu) ? (lu as ChariowPayload) : null;
  } catch {
    payload = null;
  }
  if (!payload) {
    return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
  }

  if (payload.event !== "successful.sale") return ignorer("événement non traité");

  const saleId = chaine(payload.sale?.id, 100);
  const emailBrut = payload.customer?.email;
  if (!saleId || !estEmail(emailBrut)) {
    return NextResponse.json(
      { error: "Champs requis manquants (e-mail / identifiant de vente)" },
      { status: 400 },
    );
  }
  const normalizedEmail = normaliserEmail(emailBrut);

  const status = chaine(payload.sale?.status, 40);
  if (!status || !STATUTS_PAYES.has(status)) return ignorer("statut non finalisé");

  const productId = chaine(payload.product?.id, 100);
  if (!productId) {
    console.error("[chariow] vente sans identifiant de produit", saleId);
    return ignorer("produit absent");
  }

  // Abonnement : un produit Chariow à paiement unique par formule. Chariow ne
  // prélève pas de façon récurrente : chaque achat ouvre ou prolonge la période.
  const formule = formuleDuProduit(productId);
  if (formule) {
    return enregistrerAbonnement(normalizedEmail, saleId, formule);
  }

  const produitAttendu = process.env.CHARIOW_PRODUIT_ID_AI_WORK_KIT;
  if (!produitAttendu) {
    console.error("[chariow] CHARIOW_PRODUIT_ID_AI_WORK_KIT manquant : vente non traitée", saleId);
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 503 });
  }
  if (productId !== produitAttendu) return ignorer("autre produit");

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
    .insert({
      email: normalizedEmail,
      chariow_sale_id: saleId,
      statut: "actif",
    });

  if (erreurInsertion) {
    return erreurServeur("chariow", erreurInsertion.message, "Enregistrement impossible");
  }

  // Pour un premier achat, l'invitation confirme l'email puis conduit à la
  // création du mot de passe. Un client déjà inscrit conserve son mot de passe.
  const activationUrl = `${new URL(request.url).origin}/activation`;
  const { error: erreurInvitation } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(normalizedEmail, {
      redirectTo: activationUrl,
    });

  const compteExistant =
    erreurInvitation &&
    /already (been )?registered|already exists/i.test(erreurInvitation.message);

  if (erreurInvitation && !compteExistant) {
    // L'accès et l'invitation forment une seule opération logique. En cas
    // d'échec d'envoi, on retire la ligne afin que Chariow puisse retenter.
    await supabaseAdmin
      .from("acces_clients")
      .delete()
      .eq("chariow_sale_id", saleId);
    return erreurServeur("chariow", erreurInvitation.message, "Invitation impossible");
  }

  return NextResponse.json({ ok: true });
}

type Formule = "mensuel" | "annuel" | "a_vie";

function formuleDuProduit(productId: string): Formule | null {
  const produits: [string | undefined, Formule][] = [
    [process.env.CHARIOW_PRODUIT_ID_ABONNEMENT_MENSUEL, "mensuel"],
    [process.env.CHARIOW_PRODUIT_ID_ABONNEMENT_ANNUEL, "annuel"],
    [process.env.CHARIOW_PRODUIT_ID_ABONNEMENT_A_VIE, "a_vie"],
  ];
  return produits.find(([id]) => id && id === productId)?.[1] ?? null;
}

// La formule à vie n'a pas d'échéance : on lui donne une date de fin lointaine,
// ce qui garde une seule règle de lecture (actif tant que fin_le est à venir).
const FIN_A_VIE = "2100-01-01T00:00:00.000Z";

// Enregistre un achat d'abonnement. Si une période est encore en cours, la
// nouvelle commence à sa fin : racheter avant l'échéance ne fait rien perdre.
async function enregistrerAbonnement(email: string, saleId: string, formule: Formule) {
  const admin = createAdminClient();

  const { data: dejaTraite } = await admin
    .from("abonnements")
    .select("id")
    .eq("reference_paiement", saleId)
    .maybeSingle();
  if (dejaTraite) {
    return NextResponse.json({ ok: true, deja_traite: true });
  }

  const maintenant = new Date();
  let debut = maintenant;
  if (formule !== "a_vie") {
    const { data: enCours } = await admin
      .from("abonnements")
      .select("fin_le")
      .eq("email", email)
      .neq("statut", "expire")
      .order("fin_le", { ascending: false })
      .limit(1);
    const finActuelle = enCours?.[0]?.fin_le ? new Date(enCours[0].fin_le as string) : null;
    if (finActuelle && finActuelle > maintenant) debut = finActuelle;
  }

  let fin: string;
  if (formule === "a_vie") {
    fin = FIN_A_VIE;
  } else {
    const d = new Date(debut);
    if (formule === "mensuel") d.setUTCMonth(d.getUTCMonth() + 1);
    else d.setUTCFullYear(d.getUTCFullYear() + 1);
    fin = d.toISOString();
  }

  const { error } = await admin.from("abonnements").insert({
    email,
    periode: formule,
    statut: "actif",
    debut_le: debut.toISOString(),
    fin_le: fin,
    fournisseur: "chariow",
    reference_paiement: saleId,
  });
  if (error) {
    return erreurServeur("chariow", error.message, "Enregistrement impossible");
  }
  return NextResponse.json({ ok: true, abonnement: formule, fin_le: fin });
}
