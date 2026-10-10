"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { dateAttestation, MESSAGE_NOM, NOM_ECRIVABLE, texteAttestation } from "@/lib/attestation-publique";
import { api, kitHref, useResource } from "@/lib/kit-api";
import { Icon } from "./icon";
import { Page } from "./shell";
import { Chip, PageHead, ResourceState } from "./ui";

// L'attestation d'un métier, côté abonné (étape B) : les conditions,
// l'exercice final et l'envoi du rendu. Les fichiers partent directement du
// navigateur vers l'espace privé de Cloudflare R2, par des liens signés par
// le serveur. Les images sont d'abord réduites ici, dans le navigateur
// (décision du 10 octobre 2026) : le texte reste lisible, l'envoi consomme
// moins de forfait.

type Etat = {
  metier: { slug: string; nom: string };
  conditions: { abonne: boolean; kit_installe: boolean; taches_faites: number; taches_requises: number };
  exercice: { numero: number; cas: string; titre_donnees: string; donnees: string[]; travail: string[]; a_rendre: string } | null;
  rendu: { statut: "en_attente" | "a_refaire" | "valide"; rendu_le: string | null; echeance: string | null; commentaire: string | null; nb_fichiers: number } | null;
  attestation: { numero: string; nom: string | null; delivree_le: string; linkedin_url: string } | null;
  envoi_ouvert: boolean;
  max_fichiers: number;
};

const COTE_MAX = 2000; // pixels du plus grand côté d'une image envoyée
const QUALITE = 0.85;
const PDF_MAX = 20 * 1024 * 1024;
const TYPES_IMAGE = ["image/jpeg", "image/png", "image/webp"];

const date = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" }) : "";
const taille = (octets: number) =>
  octets < 1024 * 1024 ? `${Math.max(1, Math.round(octets / 1024))} Ko` : `${(octets / 1024 / 1024).toFixed(1).replace(".", ",")} Mo`;

type Piece = { nom: string; blob: Blob; type: string };

/** Réduit une image (photo, capture d'écran) avant l'envoi. Un PDF part tel quel. */
async function preparer(fichier: File): Promise<Piece> {
  if (fichier.type === "application/pdf") {
    if (fichier.size > PDF_MAX) throw new Error(`« ${fichier.name} » dépasse 20 Mo. Envoyez un PDF plus léger ou une capture d’écran.`);
    return { nom: fichier.name, blob: fichier, type: "application/pdf" };
  }
  if (!fichier.type.startsWith("image/")) {
    throw new Error(`« ${fichier.name} » n’est ni une image ni un PDF.`);
  }
  let image: ImageBitmap | null = null;
  try {
    image = await createImageBitmap(fichier, { imageOrientation: "from-image" });
  } catch {
    image = null;
  }
  if (!image) {
    if (TYPES_IMAGE.includes(fichier.type)) return { nom: fichier.name, blob: fichier, type: fichier.type };
    throw new Error(`« ${fichier.name} » n’est pas lisible ici. Faites une capture d’écran de ce fichier et envoyez-la.`);
  }
  const ratio = Math.min(1, COTE_MAX / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * ratio);
  canvas.height = Math.round(image.height * ratio);
  const contexte = canvas.getContext("2d");
  if (!contexte) throw new Error("Votre navigateur ne peut pas préparer cette image.");
  // Fond blanc : une capture transparente reste lisible en JPEG.
  contexte.fillStyle = "#fff";
  contexte.fillRect(0, 0, canvas.width, canvas.height);
  contexte.drawImage(image, 0, 0, canvas.width, canvas.height);
  image.close();
  const reduite = await new Promise<Blob | null>((ok) => canvas.toBlob(ok, "image/jpeg", QUALITE));
  if (!reduite) throw new Error(`« ${fichier.name} » n’a pas pu être préparée.`);
  // Une petite image déjà légère reste telle quelle.
  const blob = reduite.size < fichier.size || !TYPES_IMAGE.includes(fichier.type) ? reduite : fichier;
  return { nom: fichier.name, blob, type: blob === reduite ? "image/jpeg" : fichier.type };
}

function Conditions({ c, slug }: { c: Etat["conditions"]; slug: string }) {
  const lignes = [
    { ok: c.abonne, texte: "Un abonnement actif", lien: c.abonne ? null : { href: "/abonnement", texte: "Voir les formules" } },
    { ok: c.kit_installe, texte: "Votre kit installé : toutes les étapes de «\u00a0Mon kit\u00a0» cochées", lien: c.kit_installe ? null : { href: kitHref(slug), texte: "Ouvrir Mon kit" } },
    {
      ok: c.taches_faites >= c.taches_requises,
      texte: `${c.taches_requises} tâches du métier faites (${Math.min(c.taches_faites, c.taches_requises)} sur ${c.taches_requises})`,
      lien: c.taches_faites >= c.taches_requises ? null : { href: `/metiers/${encodeURIComponent(slug)}`, texte: "Continuer le parcours" },
    },
  ];
  return (
    <section className="card stack" aria-labelledby="conditions-titre">
      <h2 id="conditions-titre" className="h2">Pour passer l’exercice final</h2>
      <ul className="stack-sm" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {lignes.map((l) => (
          <li key={l.texte} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span className={`check-dot${l.ok ? "" : " is-empty"}`} aria-hidden="true" style={{ flex: "none" }}>{l.ok && <Icon name="check" size={14} strokeWidth={3} />}</span>
            <span style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
              {l.texte}
              <span className="sr-only">{l.ok ? " : fait" : " : à faire"}</span>
              {l.lien && <> · <Link className="strong" href={l.lien.href}>{l.lien.texte}</Link></>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Exercice({ e }: { e: NonNullable<Etat["exercice"]> }) {
  return (
    <section className="card stack" aria-labelledby="exercice-titre">
      <h2 id="exercice-titre" className="h2">L’exercice final</h2>
      <div className="stack-sm">
        <h3 className="h3">Le cas</h3>
        <p>{e.cas}</p>
      </div>
      <div className="stack-sm">
        <h3 className="h3">{e.titre_donnees}</h3>
        <ul className="steps" style={{ listStyle: "disc" }}>{e.donnees.map((d, i) => <li key={i}>{d}</li>)}</ul>
      </div>
      <div className="stack-sm">
        <h3 className="h3">Le travail</h3>
        <ol className="steps">{e.travail.map((t, i) => <li key={i}>{t}</li>)}</ol>
      </div>
      <div className="stack-sm">
        <h3 className="h3">À rendre</h3>
        <p>{e.a_rendre}</p>
        <p className="muted small">Ajoutez aussi une capture de votre conversation avec l’IA. Votre rendu est corrigé sous 72 heures, avec une grille de 5 critères : chaque point du travail traité, des faits et des chiffres justes, un résultat prêt à servir, le kit bien utilisé, et votre propre vérification.</p>
      </div>
    </section>
  );
}

function Formulaire({ slug, max, apres }: { slug: string; max: number; apres: () => void }) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [nom, setNom] = useState("");
  const [verification, setVerification] = useState("");
  const [etape, setEtape] = useState("");
  const [erreur, setErreur] = useState("");
  const [occupe, setOccupe] = useState(false);
  const entree = useRef<HTMLInputElement>(null);

  async function ajouter(liste: FileList | null) {
    if (!liste?.length) return;
    setErreur("");
    const place = max - pieces.length;
    if (liste.length > place) {
      setErreur(`${max} fichiers au plus par rendu.`);
      return;
    }
    setOccupe(true);
    setEtape("Préparation des fichiers…");
    try {
      const prets: Piece[] = [];
      for (const f of Array.from(liste)) prets.push(await preparer(f));
      setPieces((p) => [...p, ...prets]);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Un fichier n’a pas pu être préparé.");
    } finally {
      setOccupe(false);
      setEtape("");
      if (entree.current) entree.current.value = "";
    }
  }

  async function envoyer(evenement: React.FormEvent) {
    evenement.preventDefault();
    if (occupe) return;
    setErreur("");
    if (!pieces.length) return setErreur("Ajoutez au moins un fichier : votre résultat et la capture de votre conversation.");
    const nomPropre = nom.trim().normalize("NFC").replace(/\s+/g, " ");
    if (nomPropre.length < 2) return setErreur("Écrivez le nom à porter sur l’attestation.");
    if (!NOM_ECRIVABLE.test(nomPropre)) return setErreur(MESSAGE_NOM);
    if (verification.trim().length < 20) return setErreur("Dites en quelques lignes ce que vous avez vérifié et corrigé vous-même.");
    setOccupe(true);
    try {
      setEtape("Préparation de l’envoi…");
      const base = `/api/attestations/${encodeURIComponent(slug)}`;
      const { rendu_id, envois } = await api<{ rendu_id: string; envois: { url: string; type: string }[] }>(`${base}/fichiers`, {
        method: "POST",
        body: JSON.stringify({ fichiers: pieces.map((p) => ({ type: p.type, taille: p.blob.size })) }),
      });
      for (let i = 0; i < envois.length; i += 1) {
        setEtape(`Envoi du fichier ${i + 1} sur ${envois.length}…`);
        // Une coupure du réseau (« Failed to fetch ») et un refus de R2 donnent le même message.
        const reponse = await fetch(envois[i].url, { method: "PUT", headers: { "Content-Type": envois[i].type }, body: pieces[i].blob, credentials: "omit" }).catch(() => null);
        if (!reponse?.ok) throw new Error("Un fichier n’a pas pu être envoyé. Vérifiez votre connexion et réessayez.");
      }
      setEtape("Envoi du rendu…");
      await api(`${base}/rendu`, { method: "POST", body: JSON.stringify({ rendu_id, nom: nomPropre, verification: verification.trim() }) });
      apres();
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "L’envoi a échoué. Réessayez.");
    } finally {
      setOccupe(false);
      setEtape("");
    }
  }

  return (
    <form className="card stack" onSubmit={envoyer} aria-labelledby="rendu-titre">
      <h2 id="rendu-titre" className="h2">Rendre mon travail</h2>
      <div className="field">
        <span className="field-label">Vos fichiers ({pieces.length} sur {max})</span>
        <p className="muted small">Images (photo ou capture d’écran) ou PDF de 20 Mo au plus. Les images sont réduites avant l’envoi : leur texte reste lisible.</p>
        {pieces.length > 0 && (
          <ul className="stack-sm" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {pieces.map((p, i) => (
              <li key={`${p.nom}-${i}`} className="row-between card pad-sm" style={{ gap: 12 }}>
                <span className="row" style={{ gap: 8, minWidth: 0 }}>
                  <Icon name={p.type === "application/pdf" ? "file" : "eye"} size={18} />
                  <span style={{ overflowWrap: "anywhere" }}>{p.nom}</span>
                  <span className="muted small">{taille(p.blob.size)}</span>
                </span>
                <button type="button" className="btn btn-secondary btn-plain btn-sm" disabled={occupe} onClick={() => setPieces((l) => l.filter((_, j) => j !== i))} aria-label={`Retirer ${p.nom}`}>Retirer</button>
              </li>
            ))}
          </ul>
        )}
        {pieces.length < max && (
          <label className="btn btn-secondary" style={{ alignSelf: "flex-start" }}>
            <Icon name="plus" size={18} /> Ajouter des fichiers
            <input ref={entree} type="file" accept="image/*,application/pdf" multiple className="sr-only" disabled={occupe} onChange={(e) => ajouter(e.target.files)} />
          </label>
        )}
      </div>
      <div className="field">
        <label className="field-label" htmlFor="nom-attestation">Nom à écrire sur l’attestation</label>
        <input id="nom-attestation" className="input" value={nom} maxLength={120} autoComplete="name" onChange={(e) => setNom(e.target.value)} />
        <p className="muted small">Il est visible par toute personne à qui vous donnerez le numéro de votre attestation.</p>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="verification">Ce que vous avez vérifié et corrigé vous-même</label>
        <textarea id="verification" className="textarea" value={verification} maxLength={1500} onChange={(e) => setVerification(e.target.value)} placeholder="Trois lignes : un chiffre ou une date que vous avez contrôlé, une erreur de l’IA que vous avez corrigée, ce que vous avez ajouté." />
      </div>
      {erreur && <p className="form-error" role="alert">{erreur}</p>}
      {etape && <p className="muted small" role="status">{etape}</p>}
      <button type="submit" className="btn btn-block" disabled={occupe}>{occupe ? "Envoi en cours…" : "Envoyer mon rendu"}</button>
    </form>
  );
}

function Obtenue({ a, metier }: { a: Etat["attestation"]; metier: Etat["metier"] }) {
  if (!a) {
    return (
      <section className="card stack-sm" role="status" style={{ background: "var(--mint-bg)" }}>
        <Chip tone="green" icon="award">Validé</Chip>
        <p>Votre exercice final est validé.</p>
      </section>
    );
  }
  return (
    <section className="card stack" aria-labelledby="obtenue-titre" style={{ background: "var(--mint-bg)" }}>
      <Chip tone="green" icon="award">Attestation obtenue</Chip>
      <div className="stack-sm">
        <h2 id="obtenue-titre" className="h2">{a.nom}</h2>
        <p>{texteAttestation(metier.nom)}, le {dateAttestation(a.delivree_le)}.</p>
        <p className="small">Numéro <b>{a.numero}</b>. Toute personne qui a ce numéro peut vérifier votre attestation en ligne, sur sa page publique : elle y voit votre nom, le métier et la date.</p>
      </div>
      <div className="row">
        <a className="btn" href={`/api/attestations/${encodeURIComponent(metier.slug)}/pdf`} download>
          <Icon name="download" size={18} /> Télécharger le PDF
        </a>
        <a className="btn btn-secondary" href={a.linkedin_url} target="_blank" rel="noreferrer">
          <Icon name="external" size={18} /> Ajouter à LinkedIn
        </a>
        <Link className="btn btn-secondary btn-plain" href={`/attestation/${a.numero}`}>
          <Icon name="eye" size={18} /> Voir la page de vérification
        </Link>
      </div>
    </section>
  );
}

export function Attestation({ slug }: { slug: string }) {
  const { data, error, retry } = useResource<Etat>(`/api/attestations/${encodeURIComponent(slug)}`);
  const [envoye, setEnvoye] = useState(false);

  if (!data) return <Page width="single"><ResourceState error={error} retry={retry} /></Page>;
  const { metier, conditions, exercice, rendu } = data;
  const enAttente = envoye || rendu?.statut === "en_attente";

  return (
    <Page width="single">
      <PageHead kicker="Attestation de compétences IA" title={`Attestation : ${metier.nom}`}>
        Montrez ce que vous savez faire avec l’IA dans votre métier. Réussissez l’exercice final : vous recevez une attestation à votre nom, avec un numéro que tout employeur peut vérifier en ligne. Ce n’est ni un diplôme ni une certification officielle.
      </PageHead>

      <p className="small"><Link className="strong" href={`/metiers/${encodeURIComponent(metier.slug)}`}>← Retour au parcours {metier.nom}</Link></p>

      {rendu?.statut === "valide" && <Obtenue a={data.attestation} metier={metier} />}

      {enAttente && (
        <section className="card stack-sm" role="status">
          <Chip icon="clock">En correction</Chip>
          <p>{envoye ? "Votre rendu est envoyé." : `Votre rendu est envoyé le ${date(rendu?.rendu_le ?? null)}.`} Il est corrigé sous 72 heures{rendu?.echeance && !envoye ? `, avant le ${date(rendu.echeance)}` : ""}. Vous recevrez un e-mail.</p>
        </section>
      )}

      {!enAttente && rendu?.statut === "a_refaire" && (
        <section className="card stack-sm is-orange" role="status">
          <Chip tone="orange">À refaire</Chip>
          {rendu.commentaire && <p><b>Le mot du correcteur.</b> {rendu.commentaire}</p>}
          <p className="muted small">Corrigez ce qui est signalé, puis rendez à nouveau votre travail.</p>
        </section>
      )}

      {rendu?.statut !== "valide" && !enAttente && <Conditions c={conditions} slug={metier.slug} />}

      {exercice && rendu?.statut !== "valide" && <Exercice e={exercice} />}

      {exercice && rendu?.statut !== "valide" && !enAttente && (
        data.envoi_ouvert ? (
          <Formulaire slug={metier.slug} max={data.max_fichiers} apres={() => setEnvoye(true)} />
        ) : (
          <div className="notice" role="note">
            <span style={{ flex: "none", display: "inline-flex" }}><Icon name="help" size={20} /></span>
            <p>L’envoi des rendus ouvre bientôt. Vous pouvez déjà faire l’exercice.</p>
          </div>
        )
      )}
    </Page>
  );
}
