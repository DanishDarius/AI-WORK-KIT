import "server-only";

import type { FichierRendu } from "@/lib/attestations";
import { lireFil } from "@/lib/contenu";
import { limitePurge, PURGES_MAX } from "@/lib/correction";
import { emailsClientsConfigures, envoyerEmailsClients, type EmailClient } from "@/lib/email";
import { emailDeLaSemaine, emailRappelEcheance, type LigneEmail } from "@/lib/emails-abonnes";
import { LIBELLE_TYPE, publicationsParues } from "@/lib/fil";
import { SITE } from "@/lib/marque";
import { configR2, supprimerFichier } from "@/lib/r2";
import { createAdminClient } from "@/lib/supabase/admin";

// Le travail de chaque matin (plan produit, chantier 5), lancé par la route
// /api/planifie/quotidien :
// 1. l'e-mail de la semaine, aux abonnés qui ne l'ont pas encore reçu ;
// 2. les rappels d'échéance : 5 jours avant la fin d'un abonnement au mois ou
//    à l'année, puis le jour même ;
// 3. la purge des rendus d'attestation, 2 mois après l'attestation
//    (purgerRendus, plus bas).
//
// Un même e-mail ne part jamais deux fois : chaque envoi est d'abord inscrit
// au journal (table envois_notifications, une ligne par type, période et
// adresse), puis envoyé. Relancer le travail le même jour ne renvoie donc
// rien. Un envoi refusé par Resend est marqué « echec » et repris au passage
// suivant.
//
// Règle S13 : le nombre d'e-mails d'un passage est borné. Le reste part au
// passage suivant.

/** Nombre d'e-mails envoyés au plus par passage, tous types confondus. */
export const ENVOIS_MAX = 200;
const ABONNES_LUS = 2000;
const SEPT_JOURS_MS = 7 * 86_400_000;

type Admin = ReturnType<typeof createAdminClient>;
type Abonnement = { email: string; periode: "mensuel" | "annuel" | "a_vie"; statut: string; fin_le: string };

/** La semaine d'une date, au format ISO : 2026-W41. */
export function semaineIso(date: Date) {
  const jour = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  // Le jeudi de la semaine décide de son année.
  jour.setUTCDate(jour.getUTCDate() + 4 - (jour.getUTCDay() || 7));
  const debutAnnee = Date.UTC(jour.getUTCFullYear(), 0, 1);
  const semaine = Math.ceil(((jour.getTime() - debutAnnee) / 86_400_000 + 1) / 7);
  return `${jour.getUTCFullYear()}-W${String(semaine).padStart(2, "0")}`;
}

const jourIso = (date: Date) => date.toISOString().slice(0, 10);

/** Les abonnements en cours : le plus lointain par adresse. */
export function abonnementsEnCours(lignes: Abonnement[], maintenant: number): Map<string, Abonnement> {
  const parEmail = new Map<string, Abonnement>();
  for (const a of lignes) {
    if (a.statut === "expire" || !(Date.parse(a.fin_le) > maintenant - 86_400_000)) continue;
    const connu = parEmail.get(a.email);
    if (!connu || Date.parse(a.fin_le) > Date.parse(connu.fin_le)) parEmail.set(a.email, a);
  }
  return parEmail;
}

/**
 * Les rappels à envoyer aujourd'hui : l'abonnement le plus lointain de chaque
 * adresse, au mois ou à l'année, qui se termine dans 5 jours ou aujourd'hui.
 * Un client qui a déjà renouvelé n'est donc pas relancé.
 */
export function rappelsDuJour(lignes: Abonnement[], maintenant: Date) {
  const aujourdHui = jourIso(maintenant);
  const dans5Jours = jourIso(new Date(maintenant.getTime() + 5 * 86_400_000));
  const rappels: { email: string; jours: 5 | 0; fin_le: string; formule: "mensuel" | "annuel" }[] = [];
  for (const a of abonnementsEnCours(lignes, maintenant.getTime()).values()) {
    if (a.periode !== "mensuel" && a.periode !== "annuel") continue;
    const fin = a.fin_le.slice(0, 10);
    if (fin === dans5Jours) rappels.push({ email: a.email, jours: 5, fin_le: a.fin_le, formule: a.periode });
    else if (fin === aujourdHui) rappels.push({ email: a.email, jours: 0, fin_le: a.fin_le, formule: a.periode });
  }
  return rappels;
}

// Inscrit les envois au journal, envoie, puis marque les refus. Ne renvoie
// rien à qui est déjà inscrit comme « envoye » pour ce type et cette période.
async function envoyerUneFois(admin: Admin, type: "semaine" | "rappel_j5" | "rappel_j0", periode: string, messages: EmailClient[], reste: number) {
  if (!messages.length || reste <= 0) return { envoyes: 0, echecs: 0, reportes: messages.length };
  const { data: deja, error } = await admin
    .from("envois_notifications")
    .select("email")
    .eq("type", type)
    .eq("periode", periode)
    .eq("etat", "envoye")
    .limit(ABONNES_LUS);
  if (error) throw new Error(`Lecture du journal des envois impossible : ${error.message}`);
  const faits = new Set(((deja ?? []) as { email: string }[]).map((l) => l.email));
  const aFaire = messages.filter((m) => !faits.has(m.to));
  const lot = aFaire.slice(0, reste);
  if (!lot.length) return { envoyes: 0, echecs: 0, reportes: 0 };

  // Inscription AVANT l'envoi : si le serveur s'arrête en route, l'e-mail
  // n'est pas renvoyé au passage suivant.
  const maintenant = new Date().toISOString();
  const inscription = await admin
    .from("envois_notifications")
    .upsert(lot.map((m) => ({ type, periode, email: m.to, etat: "envoye", envoye_le: maintenant })), { onConflict: "type,periode,email" });
  if (inscription.error) throw new Error(`Inscription au journal des envois impossible : ${inscription.error.message}`);

  const resultats = await envoyerEmailsClients(lot, `email-${type}`);
  const refuses = lot.filter((_, i) => !resultats[i]).map((m) => m.to);
  if (refuses.length) {
    const marque = await admin.from("envois_notifications").update({ etat: "echec" }).eq("type", type).eq("periode", periode).in("email", refuses);
    if (marque.error) console.error("[planifie] échecs non marqués", marque.error.message);
  }
  return { envoyes: lot.length - refuses.length, echecs: refuses.length, reportes: aFaire.length - lot.length };
}

/** Le travail du matin. Renvoie ce qui a été fait, pour les journaux du serveur. */
export async function travailQuotidien(maintenant = new Date()) {
  if (!emailsClientsConfigures()) return { etat: "non-configure" as const };
  const admin = createAdminClient();
  const instant = maintenant.getTime();

  const [abonnements, refus, fil] = await Promise.all([
    admin.from("abonnements").select("email, periode, statut, fin_le").gt("fin_le", new Date(instant - 86_400_000).toISOString()).limit(ABONNES_LUS),
    admin.from("preferences_notifications").select("email, email_semaine, rappels_echeance").or("email_semaine.eq.false,rappels_echeance.eq.false").limit(5000),
    lireFil(),
  ]);
  if (abonnements.error) throw new Error(`Lecture des abonnements impossible : ${abonnements.error.message}`);
  if (refus.error) throw new Error(`Lecture des préférences impossible : ${refus.error.message}`);
  const lignes = (abonnements.data ?? []) as Abonnement[];
  const sansSemaine = new Set<string>();
  const sansRappel = new Set<string>();
  for (const p of (refus.data ?? []) as { email: string; email_semaine: boolean; rappels_echeance: boolean }[]) {
    if (p.email_semaine === false) sansSemaine.add(p.email);
    if (p.rappels_echeance === false) sansRappel.add(p.email);
  }

  let reste = ENVOIS_MAX;

  // 1. Les rappels d'échéance d'abord : ils ont une date.
  const rappels = rappelsDuJour(lignes, maintenant).filter((r) => !sansRappel.has(r.email));
  const bilanRappels = { envoyes: 0, echecs: 0, reportes: 0 };
  for (const jours of [0, 5] as const) {
    const duJour = rappels.filter((r) => r.jours === jours);
    // Une période par date d'échéance : un abonnement prolongé aura son propre rappel.
    for (const fin of new Set(duJour.map((r) => r.fin_le.slice(0, 10)))) {
      const messages = duJour
        .filter((r) => r.fin_le.slice(0, 10) === fin)
        .map((r) => ({ to: r.email, ...emailRappelEcheance({ jours, finLe: r.fin_le, formule: r.formule }) }));
      const bilan = await envoyerUneFois(admin, jours === 0 ? "rappel_j0" : "rappel_j5", fin, messages, reste);
      reste -= bilan.envoyes + bilan.echecs;
      bilanRappels.envoyes += bilan.envoyes;
      bilanRappels.echecs += bilan.echecs;
      bilanRappels.reportes += bilan.reportes;
    }
  }

  // 2. L'e-mail de la semaine : ce qui est paru ces sept derniers jours.
  const parues = publicationsParues(fil, instant).filter((p) => Date.parse(p.publie_le) > instant - SEPT_JOURS_MS);
  const lignesEmail: LigneEmail[] = parues.slice(0, 8).map((p) => ({ libelle: LIBELLE_TYPE[p.type], titre: p.titre, lien: `${SITE}/nouveau` }));
  let bilanSemaine = { envoyes: 0, echecs: 0, reportes: 0 };
  if (lignesEmail.length) {
    const destinataires = [...abonnementsEnCours(lignes, instant).values()]
      .filter((a) => Date.parse(a.fin_le) > instant && !sansSemaine.has(a.email))
      .map((a) => a.email);
    if (destinataires.length) {
      // Chaque destinataire a une ligne de préférences, donc un jeton pour le
      // lien « ne plus recevoir ». Une ligne existante n'est pas modifiée.
      const creation = await admin.from("preferences_notifications").upsert(destinataires.map((email) => ({ email })), { onConflict: "email", ignoreDuplicates: true });
      if (creation.error) throw new Error(`Préparation des préférences impossible : ${creation.error.message}`);
      const { data: jetons, error } = await admin.from("preferences_notifications").select("email, jeton").in("email", destinataires).limit(ABONNES_LUS);
      if (error) throw new Error(`Lecture des jetons impossible : ${error.message}`);
      const jetonDe = new Map(((jetons ?? []) as { email: string; jeton: string }[]).map((l) => [l.email, l.jeton]));
      const messages = destinataires
        .filter((email) => jetonDe.has(email))
        .map((email) => {
          const lienDesabonnement = `${SITE}/desabonnement?j=${jetonDe.get(email)}`;
          return { to: email, desabonnement: lienDesabonnement, ...emailDeLaSemaine({ lignes: lignesEmail, lienDesabonnement }) };
        });
      bilanSemaine = await envoyerUneFois(admin, "semaine", semaineIso(maintenant), messages, reste);
    }
  }

  return { etat: "fait" as const, semaine: semaineIso(maintenant), publications: lignesEmail.length, email_semaine: bilanSemaine, rappels: bilanRappels };
}

// ---------------------------------------------------------------------------
// 3. La purge des rendus d'attestation (décision du 10 octobre 2026 : le rendu
// est gardé jusqu'à 2 mois après l'obtention de l'attestation).
//
// Pour chaque attestation obtenue il y a plus de 2 mois : les fichiers du
// rendu validé et des essais « à refaire » du même métier sont effacés chez
// Cloudflare R2, puis leur liste de fichiers et leur texte de vérification
// sont vidés en base. Restent le nom, le métier, les dates, la note et le
// commentaire, qui servent à l'attestation.
//
// Idempotente : un rendu purgé porte sa date de purge et n'est plus relu. Un
// fichier qui n'a pas pu être effacé garde son rendu tel quel : il est repris
// au passage suivant. Bornée : PURGES_MAX attestations par passage (règle S13).

type RenduAPurger = { id: string; user_id: string; metier_id: string; fichiers: unknown };

const clesDe = (r: RenduAPurger) =>
  (Array.isArray(r.fichiers) ? (r.fichiers as FichierRendu[]) : []).map((f) => f?.cle).filter((c): c is string => typeof c === "string");

export async function purgerRendus(maintenant = new Date()) {
  const config = configR2();
  if (!config) return { etat: "non-configure" as const };
  const admin = createAdminClient();

  const { data: valides, error } = await admin
    .from("rendus_attestation")
    .select("id, user_id, metier_id, fichiers")
    .eq("statut", "valide")
    .is("purge_le", null)
    .lt("corrige_le", limitePurge(maintenant).toISOString())
    .order("corrige_le", { ascending: true })
    .limit(PURGES_MAX);
  if (error) throw new Error(`Lecture des rendus à purger impossible : ${error.message}`);
  const attestations = (valides ?? []) as RenduAPurger[];
  if (!attestations.length) return { etat: "fait" as const, purges: 0, reportes: 0 };

  // Les essais « à refaire » des mêmes comptes, pour les mêmes métiers.
  const { data: essais, error: erreurEssais } = await admin
    .from("rendus_attestation")
    .select("id, user_id, metier_id, fichiers")
    .in("user_id", [...new Set(attestations.map((a) => a.user_id))])
    .eq("statut", "a_refaire")
    .is("purge_le", null)
    .limit(PURGES_MAX * 20);
  if (erreurEssais) throw new Error(`Lecture des essais à purger impossible : ${erreurEssais.message}`);
  const paires = new Set(attestations.map((a) => `${a.user_id}/${a.metier_id}`));
  const lignes = [...attestations, ...((essais ?? []) as RenduAPurger[]).filter((e) => paires.has(`${e.user_id}/${e.metier_id}`))];

  // Effacement chez R2, par paquets de 10 fichiers à la fois.
  const echecs = new Set<string>();
  const taches = lignes.flatMap((l) => clesDe(l).map((cle) => ({ id: l.id, cle })));
  for (let i = 0; i < taches.length; i += 10) {
    const paquet = taches.slice(i, i + 10);
    const resultats = await Promise.allSettled(paquet.map((t) => supprimerFichier(config, t.cle)));
    resultats.forEach((r, j) => {
      if (r.status === "rejected") echecs.add(paquet[j].id);
    });
  }
  const purgeables = lignes.filter((l) => !echecs.has(l.id)).map((l) => l.id);
  if (purgeables.length) {
    const { error: erreurMaj } = await admin
      .from("rendus_attestation")
      .update({ fichiers: [], verification: null, purge_le: maintenant.toISOString() })
      .in("id", purgeables)
      .is("purge_le", null);
    if (erreurMaj) throw new Error(`Purge des rendus impossible : ${erreurMaj.message}`);
  }
  if (echecs.size) console.error("[planifie] fichiers de rendu non effacés, repris demain", echecs.size);
  return { etat: "fait" as const, purges: purgeables.length, reportes: echecs.size };
}
