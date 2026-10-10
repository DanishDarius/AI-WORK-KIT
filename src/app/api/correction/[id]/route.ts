import { NextResponse } from "next/server";
import { echeanceCorrection, type FichierRendu } from "@/lib/attestations";
import { lireCatalogue, lireExercicesFinaux, metierParId } from "@/lib/contenu";
import { COMMENTAIRE_MAX, erreurDecision, exigerCorrecteur, GRILLE, notesValides, SEUIL, total } from "@/lib/correction";
import { envoyerEmailsClients } from "@/lib/email";
import { emailDecisionAttestation } from "@/lib/emails-abonnes";
import { estUuid, texteBorne } from "@/lib/normaliser";
import { configR2, lienLecture } from "@/lib/r2";
import { erreurServeur } from "@/lib/reponses-api";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireActiveUser } from "@/lib/supabase/active-access";

// /api/correction/[id] : un rendu d'attestation, pour le correcteur seul
// (variable CORRECTEUR_EMAILS, après l'accès payé, règle S1).
//
// GET : le rendu, ses fichiers (un lien de lecture chez Cloudflare R2 par
// fichier, valable 10 minutes), l'exercice du métier avec sa réponse type
// (pour_le_correcteur : seul écran où elle sort, règle S2), et le nombre
// d'essais « à refaire » faits avant celui-ci (le rendu ouvert ne se compte
// pas lui-même). Règle C2 : 2 requêtes, lancées ensemble ; le contenu vient
// du cache. Règle C4 : rien n'est écrit.
//
// POST : la décision. Body : { "decision": "valide" | "a_refaire",
// "notes": [0-2 × 5], "commentaire": "…" }. Seul un rendu « en_attente »
// change d'état, une fois (règle S13 : une décision par rendu). L'abonné
// reçoit un e-mail ; un e-mail qui échoue n'annule pas la décision. À la
// validation, la base donne le numéro de l'attestation (migration 0055), que
// l'e-mail reprend.

type Ligne = {
  id: string;
  user_id: string;
  metier_id: string;
  statut: string;
  fichiers: unknown;
  nom_attestation: string | null;
  verification: string | null;
  notes: unknown;
  commentaire: string | null;
  cree_le: string;
  rendu_le: string | null;
  corrige_le: string | null;
  purge_le: string | null;
};

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const refus = exigerCorrecteur(access);
  if (refus) return refus;
  if (!estUuid(id)) return NextResponse.json({ error: "Rendu introuvable" }, { status: 404 });

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("rendus_attestation")
    .select("id, user_id, metier_id, statut, fichiers, nom_attestation, verification, notes, commentaire, cree_le, rendu_le, corrige_le, purge_le")
    .eq("id", id)
    .maybeSingle();
  if (error) return erreurServeur("correction", error);
  const rendu = data as Ligne | null;
  if (!rendu || rendu.statut === "brouillon") return NextResponse.json({ error: "Rendu introuvable" }, { status: 404 });

  let catalogue, exercices, essais;
  try {
    [catalogue, exercices, essais] = await Promise.all([
      lireCatalogue(),
      lireExercicesFinaux(),
      admin
        .from("rendus_attestation")
        .select("id", { count: "exact", head: true })
        .eq("user_id", rendu.user_id)
        .eq("metier_id", rendu.metier_id)
        .eq("statut", "a_refaire")
        .lt("cree_le", rendu.cree_le),
    ]);
  } catch (erreur) {
    return erreurServeur("correction", erreur);
  }
  if (essais.error) return erreurServeur("correction", essais.error);
  const metier = metierParId(catalogue, rendu.metier_id);
  const exercice = exercices[rendu.metier_id];

  const config = configR2();
  const fichiers = (Array.isArray(rendu.fichiers) ? (rendu.fichiers as FichierRendu[]) : []).map((f, i) => ({
    numero: i + 1,
    type: f.type,
    taille: f.taille,
    url: config && typeof f.cle === "string" ? lienLecture(config, f.cle) : null,
  }));

  return NextResponse.json(
    {
      id: rendu.id,
      statut: rendu.statut,
      metier: metier ? { nom: metier.nom, slug: metier.slug } : null,
      nom: rendu.nom_attestation,
      verification: rendu.verification,
      fichiers,
      notes: notesValides(rendu.notes),
      commentaire: rendu.commentaire,
      rendu_le: rendu.rendu_le,
      echeance: rendu.rendu_le ? echeanceCorrection(rendu.rendu_le).toISOString() : null,
      corrige_le: rendu.corrige_le,
      purge_le: rendu.purge_le,
      essais_a_refaire: essais.count ?? 0,
      grille: GRILLE,
      seuil: SEUIL,
      exercice: exercice
        ? {
            numero: exercice.numero,
            cas: exercice.cas,
            titre_donnees: exercice.titre_donnees,
            donnees: exercice.donnees,
            travail: exercice.travail,
            a_rendre: exercice.a_rendre,
            pour_le_correcteur: exercice.pour_le_correcteur,
          }
        : null,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await requireActiveUser();
  if ("response" in access) return access.response;
  const refus = exigerCorrecteur(access);
  if (refus) return refus;
  if (!estUuid(id)) return NextResponse.json({ error: "Rendu introuvable" }, { status: 404 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const decision = body?.decision;
  const notes = notesValides(body?.notes);
  const commentaire = texteBorne(body?.commentaire, COMMENTAIRE_MAX);
  const erreur = erreurDecision(decision, notes, commentaire);
  if (erreur || !notes) return NextResponse.json({ error: erreur }, { status: 400 });

  // Une seule requête, gardée par l'état : deux clics, ou deux onglets, ne
  // décident pas deux fois.
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("rendus_attestation")
    .update({ statut: decision, notes, commentaire: commentaire || null, corrige_le: new Date().toISOString() })
    .eq("id", id)
    .eq("statut", "en_attente")
    .select("user_id, metier_id, numero");
  if (error) {
    // Index unique : ce compte a déjà une attestation validée pour ce métier.
    if (error.code === "23505") return NextResponse.json({ error: "Ce compte a déjà son attestation pour ce métier." }, { status: 409 });
    return erreurServeur("correction-decision", error);
  }
  const ligne = (data?.[0] ?? null) as { user_id: string; metier_id: string; numero: string | null } | null;
  if (!ligne) return NextResponse.json({ error: "Ce rendu n’attend plus de correction." }, { status: 409 });

  // L'e-mail à l'abonné. Un échec n'annule pas la décision : il est signalé.
  let emailEnvoye = false;
  try {
    const [compte, catalogue] = await Promise.all([admin.auth.admin.getUserById(ligne.user_id), lireCatalogue()]);
    const email = compte.data.user?.email;
    const metier = metierParId(catalogue, ligne.metier_id);
    if (email && metier) {
      const message = emailDecisionAttestation({
        decision: decision as "valide" | "a_refaire",
        metier: metier.nom,
        slug: metier.slug,
        points: total(notes),
        commentaire,
        numero: ligne.numero,
      });
      [emailEnvoye] = await envoyerEmailsClients([{ to: email, ...message }], "attestation-decision");
    }
  } catch (e) {
    console.error("[correction-decision] e-mail non envoyé", e instanceof Error ? e.message : e);
  }

  return NextResponse.json({ ok: true, statut: decision, email_envoye: emailEnvoye });
}
