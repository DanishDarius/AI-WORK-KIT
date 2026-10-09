import "server-only";

import { createHash, createHmac } from "node:crypto";

// Cloudflare R2 : l'espace privé où sont gardés les fichiers des rendus
// d'attestation (décision du 10 octobre 2026). R2 parle le langage de
// stockage d'Amazon (S3) : un lien d'envoi ou de lecture est une adresse
// signée (« présignée ») avec la clé secrète, valable quelques minutes. Le
// navigateur envoie le fichier directement chez R2 ; il ne passe pas par
// nos serveurs.
//
// La signature (AWS Signature Version 4) est calculée ici, sans bibliothèque :
// le test tests/unitaires/r2.test.ts la vérifie sur l'exemple publié par
// Amazon. Aucun appel réseau pour signer.
//
// Variables (règle S10 : sans elles, l'envoi est fermé, jamais « optionnel ») :
// - R2_ACCOUNT_ID : identifiant du compte Cloudflare (32 caractères, non secret) ;
// - R2_BUCKET : nom de l'espace (bucket), créé dans la juridiction « European Union » ;
// - R2_ACCESS_KEY_ID et R2_SECRET_ACCESS_KEY : la clé d'API R2, secrète,
//   créée et collée dans Vercel par l'utilisateur (Claude ne manipule pas les clés).

export type ConfigR2 = { compte: string; espace: string; cle: string; secret: string };

const COMPTE = /^[0-9a-f]{32}$/;
const ESPACE = /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/;

export function configR2(env: Record<string, string | undefined> = process.env): ConfigR2 | null {
  const compte = env.R2_ACCOUNT_ID?.trim() ?? "";
  const espace = env.R2_BUCKET?.trim() ?? "";
  const cle = env.R2_ACCESS_KEY_ID?.trim() ?? "";
  const secret = env.R2_SECRET_ACCESS_KEY?.trim() ?? "";
  if (!COMPTE.test(compte) || !ESPACE.test(espace) || !cle || !secret) return null;
  return { compte, espace, cle, secret };
}

// Encodage des adresses exigé par la signature (RFC 3986).
function encoder(valeur: string) {
  return encodeURIComponent(valeur).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

const sha256 = (texte: string) => createHash("sha256").update(texte, "utf8").digest("hex");
const hmac = (cle: Buffer | string, texte: string) => createHmac("sha256", cle).update(texte, "utf8").digest();

export type DemandeSignee = {
  methode: "GET" | "PUT" | "HEAD" | "DELETE";
  hote: string;
  chemin: string; // déjà découpé en segments, encodés ici un par un
  region: string;
  cle: string;
  secret: string;
  expireEnSecondes: number;
  maintenant: Date;
  // En-têtes signés en plus de « host » (ex. content-type d'un envoi).
  entetes?: Record<string, string>;
};

/** Adresse présignée (AWS Signature Version 4, signature dans l'adresse). */
export function adressePresignee(d: DemandeSignee): string {
  const amzDate = d.maintenant.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const jour = amzDate.slice(0, 8);
  const portee = `${jour}/${d.region}/s3/aws4_request`;
  const entetes: Record<string, string> = { host: d.hote };
  for (const [nom, valeur] of Object.entries(d.entetes ?? {})) entetes[nom.toLowerCase()] = valeur.trim();
  const noms = Object.keys(entetes).sort();
  const signes = noms.join(";");

  const parametres: [string, string][] = [
    ["X-Amz-Algorithm", "AWS4-HMAC-SHA256"],
    ["X-Amz-Credential", `${d.cle}/${portee}`],
    ["X-Amz-Date", amzDate],
    ["X-Amz-Expires", String(d.expireEnSecondes)],
    ["X-Amz-SignedHeaders", signes],
  ];
  const requete = parametres
    .map(([k, v]) => [encoder(k), encoder(v)] as const)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  const chemin = "/" + d.chemin.split("/").map(encoder).join("/");

  const canonique = [
    d.methode,
    chemin,
    requete,
    noms.map((n) => `${n}:${entetes[n]}\n`).join(""),
    signes,
    "UNSIGNED-PAYLOAD",
  ].join("\n");
  const aSigner = ["AWS4-HMAC-SHA256", amzDate, portee, sha256(canonique)].join("\n");
  const cleSignature = hmac(hmac(hmac(hmac(`AWS4${d.secret}`, jour), d.region), "s3"), "aws4_request");
  const signature = createHmac("sha256", cleSignature).update(aSigner, "utf8").digest("hex");
  return `https://${d.hote}${chemin}?${requete}&X-Amz-Signature=${signature}`;
}

// R2 : région « auto ». L'espace est créé dans la juridiction « Union
// européenne » de Cloudflare (les fichiers ne quittent pas l'Union
// européenne, comme la base chez Supabase) : son adresse est alors
// « compte.eu.r2.cloudflarestorage.com/espace/clé ».
export const hoteR2 = (compte: string) => `${compte}.eu.r2.cloudflarestorage.com`;

function demandeR2(config: ConfigR2, methode: DemandeSignee["methode"], cle: string, expire: number, entetes?: Record<string, string>) {
  return adressePresignee({
    methode,
    hote: hoteR2(config.compte),
    chemin: `${config.espace}/${cle}`,
    region: "auto",
    cle: config.cle,
    secret: config.secret,
    expireEnSecondes: expire,
    maintenant: new Date(),
    entetes,
  });
}

/** Lien d'envoi d'un fichier, valable 15 minutes. Le type et la taille
 *  annoncés sont signés : le navigateur doit envoyer exactement ce fichier
 *  (sinon R2 refuse). Un fichier plus gros que prévu ne peut donc pas être
 *  déposé ; la route /rendu revérifie quand même ce qui est arrivé. */
export function lienEnvoi(config: ConfigR2, cle: string, type: string, taille: number) {
  return demandeR2(config, "PUT", cle, 900, { "content-type": type, "content-length": String(taille) });
}

/** Lien de lecture d'un fichier, valable 10 minutes (correction, étape C). */
export function lienLecture(config: ConfigR2, cle: string) {
  return demandeR2(config, "GET", cle, 600);
}

export type InfosFichier = { present: boolean; taille: number; type: string };

/** Ce que R2 sait d'un fichier : présent ou non, taille réelle, type. */
export async function infosFichier(config: ConfigR2, cle: string): Promise<InfosFichier> {
  const reponse = await fetch(demandeR2(config, "HEAD", cle, 60), { method: "HEAD", cache: "no-store" });
  if (reponse.status === 404) return { present: false, taille: 0, type: "" };
  if (!reponse.ok) throw new Error(`R2 HEAD ${reponse.status}`);
  return {
    present: true,
    taille: Number(reponse.headers.get("content-length") ?? "0"),
    type: (reponse.headers.get("content-type") ?? "").split(";")[0].trim(),
  };
}

/** Retire un fichier refusé (trop lourd, mauvais type) que l'abonné vient d'envoyer. */
export async function supprimerFichier(config: ConfigR2, cle: string) {
  const reponse = await fetch(demandeR2(config, "DELETE", cle, 60), { method: "DELETE", cache: "no-store" });
  if (!reponse.ok && reponse.status !== 404) throw new Error(`R2 DELETE ${reponse.status}`);
}
