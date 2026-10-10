import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, type PDFFont, type PDFPage, rgb } from "pdf-lib";
import { dateAttestation, lienVerification, texteAttestation } from "@/lib/attestation-publique";
import { NOM, SIGLE, SLOGAN } from "@/lib/marque";

// Le PDF d'une attestation obtenue : A4 couché, polices du site (Nunito pour
// les titres, Varela Round pour le texte, fabriquées par
// scripts/build-attestation-polices.py) et logo de la marque. Il se fabrique
// à la demande, sans rien écrire : le même rendu redonne le même fichier.

const DOSSIER = path.join(process.cwd(), "private", "attestation");
const LOGO = path.join(process.cwd(), "public", "brand", "atelier", "logo-primary.png");

const ENCRE = rgb(0x17 / 255, 0x21 / 255, 0x1f / 255);
const GRIS = rgb(0x56 / 255, 0x61 / 255, 0x5e / 255);
const VERT = rgb(0x0b / 255, 0x6b / 255, 0x5e / 255);
const MENTHE = rgb(0xb9 / 255, 0xf2 / 255, 0xd6 / 255);
const FOND = rgb(0xe9 / 255, 0xf7 / 255, 0xf0 / 255);
const TRAIT = rgb(0xe2 / 255, 0xe8 / 255, 0xe5 / 255);

type Fichiers = { titre: Uint8Array; etiquette: Uint8Array; texte: Uint8Array; logo: Uint8Array };
let fichiers: Promise<Fichiers> | null = null;

/** Polices et logo, lus une fois par instance du serveur. */
function lireFichiers() {
  fichiers ??= Promise.all([
    readFile(path.join(DOSSIER, "nunito-900.ttf")),
    readFile(path.join(DOSSIER, "nunito-800.ttf")),
    readFile(path.join(DOSSIER, "varela-round-400.ttf")),
    readFile(LOGO),
  ])
    .then(([titre, etiquette, texte, logo]) => ({ titre, etiquette, texte, logo }))
    .catch((erreur) => {
      fichiers = null;
      throw erreur;
    });
  return fichiers;
}

/** Taille la plus grande (jusqu'à `max`) qui fait tenir le texte dans `largeur`. */
function ajuster(police: PDFFont, texte: string, max: number, largeur: number, min = 10) {
  let taille = max;
  while (taille > min && police.widthOfTextAtSize(texte, taille) > largeur) taille -= 1;
  return taille;
}

/** Coupe un texte en lignes qui tiennent dans `largeur`. */
function lignes(police: PDFFont, texte: string, taille: number, largeur: number) {
  const sortie: string[] = [];
  let ligne = "";
  for (const mot of texte.split(" ")) {
    const essai = ligne ? `${ligne} ${mot}` : mot;
    if (ligne && police.widthOfTextAtSize(essai, taille) > largeur) {
      sortie.push(ligne);
      ligne = mot;
    } else {
      ligne = essai;
    }
  }
  if (ligne) sortie.push(ligne);
  return sortie;
}

function ecrire(page: PDFPage, texte: string, x: number, y: number, police: PDFFont, taille: number, couleur = ENCRE, interlettre = 0) {
  if (!interlettre) return page.drawText(texte, { x, y, size: taille, font: police, color: couleur });
  let position = x;
  for (const signe of texte) {
    page.drawText(signe, { x: position, y, size: taille, font: police, color: couleur });
    position += police.widthOfTextAtSize(signe, taille) + interlettre;
  }
}

export type AttestationPdf = { nom: string; metier: string; numero: string; delivreeLe: string };

export async function fabriquerAttestationPdf({ nom, metier, numero, delivreeLe }: AttestationPdf): Promise<Uint8Array> {
  const f = await lireFichiers();
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const [titre, etiquette, texte] = await Promise.all([
    doc.embedFont(f.titre, { subset: true }),
    doc.embedFont(f.etiquette, { subset: true }),
    doc.embedFont(f.texte, { subset: true }),
  ]);
  const logo = await doc.embedPng(f.logo);

  const date = dateAttestation(delivreeLe);
  const fixe = new Date(delivreeLe);
  doc.setTitle(`${texteAttestation(metier)} : ${nom}`);
  doc.setAuthor(SIGLE);
  doc.setCreator(NOM);
  doc.setProducer(NOM);
  doc.setSubject(`Attestation numéro ${numero}`);
  doc.setLanguage("fr-FR");
  doc.setCreationDate(fixe);
  doc.setModificationDate(fixe);

  // A4 couché : 842 × 595 points.
  const page = doc.addPage([841.89, 595.28]);
  const { width: L, height: H } = page.getSize();
  const marge = 64;
  const utile = L - 2 * marge;

  // Cadre : bande verte à gauche, filet clair autour.
  page.drawRectangle({ x: 0, y: 0, width: 14, height: H, color: VERT });
  page.drawRectangle({ x: 14, y: 0, width: 4, height: H, color: MENTHE });
  page.drawRectangle({ x: 28, y: 22, width: L - 50, height: H - 44, borderColor: TRAIT, borderWidth: 1 });

  // En-tête : le logo, et le numéro à droite.
  const hauteurLogo = 44;
  const largeurLogo = (logo.width / logo.height) * hauteurLogo;
  page.drawImage(logo, { x: marge, y: H - 58 - hauteurLogo, width: largeurLogo, height: hauteurLogo });
  const libelleNumero = `N° ${numero}`;
  page.drawText(libelleNumero, {
    x: L - marge - etiquette.widthOfTextAtSize(libelleNumero, 11),
    y: H - 58 - hauteurLogo / 2 - 4,
    size: 11,
    font: etiquette,
    color: GRIS,
  });

  // Le titre, le nom, le texte de l'attestation.
  let y = H - 190;
  ecrire(page, "ATTESTATION DE COMPÉTENCES IA", marge, y, etiquette, 13, VERT, 1.6);
  y -= 62;
  const tailleNom = ajuster(titre, nom, 44, utile, 22);
  page.drawText(nom, { x: marge, y, size: tailleNom, font: titre, color: ENCRE });
  y -= 22;
  page.drawRectangle({ x: marge, y, width: 72, height: 4, color: VERT });
  y -= 40;
  for (const ligne of lignes(texte, `${texteAttestation(metier)}.`, 17, utile)) {
    page.drawText(ligne, { x: marge, y, size: 17, font: texte, color: ENCRE });
    y -= 26;
  }
  y -= 2;
  const precision = "Exercice final réussi : un cas pratique du métier, traité avec l’IA puis corrigé selon une grille de 5 critères.";
  for (const ligne of lignes(texte, precision, 12, utile)) {
    page.drawText(ligne, { x: marge, y, size: 12, font: texte, color: GRIS });
    y -= 18;
  }

  // Les trois repères : la date, le numéro, l'adresse de vérification.
  const bas = 128;
  page.drawRectangle({ x: marge - 16, y: bas - 22, width: utile + 32, height: 70, color: FOND });
  const colonnes = [
    { titre: "DÉLIVRÉE LE", valeur: date, largeur: 0.25 },
    { titre: "NUMÉRO", valeur: numero, largeur: 0.25 },
    { titre: "VÉRIFIER EN LIGNE", valeur: lienVerification(numero).replace(/^https:\/\//, ""), largeur: 0.5 },
  ];
  let x = marge;
  for (const c of colonnes) {
    const place = utile * c.largeur - 12;
    ecrire(page, c.titre, x, bas + 20, etiquette, 9, VERT, 1);
    page.drawText(c.valeur, { x, y: bas, size: ajuster(etiquette, c.valeur, 13, place, 8), font: etiquette, color: ENCRE });
    x += utile * c.largeur;
  }

  // Pied : ce que l'attestation n'est pas, et le slogan.
  const avertissement = "Ce document n’est ni un diplôme ni une certification officielle.";
  page.drawText(avertissement, { x: marge, y: 48, size: 9.5, font: texte, color: GRIS });
  const tailleSlogan = ajuster(texte, SLOGAN, 9.5, utile - texte.widthOfTextAtSize(avertissement, 9.5) - 24, 7);
  page.drawText(SLOGAN, { x: L - marge - texte.widthOfTextAtSize(SLOGAN, tailleSlogan), y: 48, size: tailleSlogan, font: texte, color: GRIS });

  return doc.save({ useObjectStreams: true });
}
