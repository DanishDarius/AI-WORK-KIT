import { NextResponse } from "next/server";
import { MESSAGE_NOM, NOM_ECRIVABLE } from "@/lib/attestation-publique";
import { contexteAttestation, echeanceCorrection, type FichierRendu, TYPES_FICHIERS } from "@/lib/attestations";
import { echapperHtml, envoyerEmailEquipe } from "@/lib/email";
import { SITE } from "@/lib/marque";
import { estUuid, texteBorne } from "@/lib/normaliser";
import { configR2, infosFichier, supprimerFichier } from "@/lib/r2";
import { erreurServeur } from "@/lib/reponses-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

// POST /api/attestations/[slug]/rendu : envoie le rendu à la correction.
// Body : { "rendu_id": "…", "nom": "Nom sur l'attestation", "verification": "…" }.
//
// Les fichiers ont été envoyés par le navigateur chez Cloudflare R2. Avant
// d'accepter le rendu, le serveur demande à R2 ce qui est vraiment arrivé :
// chaque fichier doit être présent, du type annoncé et sous sa taille
// maximale (règle S7). Un fichier refusé est retiré de R2.
// L'équipe reçoit un e-mail : le rendu est à corriger sous 72 heures.
//
// Règle C2 : 2 requêtes propres au compte (le brouillon, puis son envoi).
// Règle S13 : seul un brouillon du compte passe en attente, une fois.
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const ctx = await contexteAttestation(access, slug);
  if ("response" in ctx) return ctx.response;
  const { user, metier, abonne } = ctx;

  if (!abonne) return NextResponse.json({ error: "L’attestation est réservée aux abonnés." }, { status: 403 });
  const config = configR2();
  if (!config) return NextResponse.json({ error: "L’envoi des fichiers n’est pas encore ouvert. Réessayez plus tard." }, { status: 503 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const renduId = body?.rendu_id;
  const nom = texteBorne(body?.nom, 120).normalize("NFC").replace(/\s+/g, " ");
  const verification = texteBorne(body?.verification, 1500);
  if (!estUuid(renduId)) return NextResponse.json({ error: "Rendu introuvable." }, { status: 404 });
  if (nom.length < 2) return NextResponse.json({ error: "Écrivez le nom à porter sur l’attestation." }, { status: 400 });
  // Le nom s'écrit sur le PDF : seulement les signes que ses polices savent écrire.
  if (!NOM_ECRIVABLE.test(nom)) return NextResponse.json({ error: MESSAGE_NOM }, { status: 400 });
  if (verification.length < 20) {
    return NextResponse.json({ error: "Dites en quelques lignes ce que vous avez vérifié et corrigé vous-même." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: ligne, error } = await admin
    .from("rendus_attestation")
    .select("id, statut, fichiers")
    .eq("id", renduId)
    .eq("user_id", user.id)
    .eq("metier_id", metier.id)
    .maybeSingle();
  if (error) return erreurServeur("attestation-rendu", error);
  if (!ligne) return NextResponse.json({ error: "Rendu introuvable." }, { status: 404 });
  if (ligne.statut !== "brouillon") return NextResponse.json({ error: "Ce rendu est déjà envoyé." }, { status: 409 });

  const prevus = (Array.isArray(ligne.fichiers) ? ligne.fichiers : []) as FichierRendu[];
  if (!prevus.length) return NextResponse.json({ error: "Ajoutez au moins un fichier." }, { status: 400 });

  let arrives;
  try {
    arrives = await Promise.all(prevus.map((f) => infosFichier(config, f.cle)));
  } catch (erreur) {
    return erreurServeur("attestation-rendu", erreur, "Vos fichiers n’ont pas pu être vérifiés. Réessayez dans un instant.");
  }
  if (arrives.some((a) => !a.present)) {
    return NextResponse.json({ error: "Un fichier n’est pas arrivé. Renvoyez vos fichiers." }, { status: 400 });
  }
  const refuses = prevus.filter((f, i) => arrives[i].type !== f.type || arrives[i].taille > (TYPES_FICHIERS[f.type]?.max ?? 0));
  if (refuses.length) {
    await Promise.allSettled(refuses.map((f) => supprimerFichier(config, f.cle)));
    return NextResponse.json({ error: "Un fichier est trop lourd ou n’est pas une image ni un PDF. Renvoyez vos fichiers." }, { status: 400 });
  }

  const renduLe = new Date();
  const { data: envoye, error: erreurEnvoi } = await admin
    .from("rendus_attestation")
    .update({
      statut: "en_attente",
      rendu_le: renduLe.toISOString(),
      nom_attestation: nom,
      verification,
      fichiers: prevus.map((f, i) => ({ ...f, taille: arrives[i].taille })),
    })
    .eq("id", renduId)
    .eq("user_id", user.id)
    .eq("statut", "brouillon")
    .select("id");
  if (erreurEnvoi) return erreurServeur("attestation-rendu", erreurEnvoi);
  if (!envoye?.length) return NextResponse.json({ error: "Ce rendu est déjà envoyé." }, { status: 409 });

  // L'e-mail à l'équipe ne bloque jamais le rendu : il est enregistré.
  const echeance = echeanceCorrection(renduLe).toLocaleString("fr-FR", { timeZone: "Europe/Paris", dateStyle: "full", timeStyle: "short" });
  const texte = `Un rendu de l'exercice final attend sa correction.\n\nMétier : ${metier.nom}\nNom sur l'attestation : ${nom}\nCompte : ${user.email}\nFichiers : ${prevus.length}\nÀ corriger avant le ${echeance} (heure de Paris).\n\nCorriger : ${SITE}/correction/${renduId}`;
  await envoyerEmailEquipe({
    subject: `Attestation à corriger : ${metier.nom}`,
    text: texte,
    html: `<p>${echapperHtml(texte).replace(/\n/g, "<br>")}</p>`,
    tag: "attestation-rendu",
  });

  return NextResponse.json({ ok: true, rendu_le: renduLe.toISOString(), echeance: echeanceCorrection(renduLe).toISOString() });
}
