// Fabrique le logo d'AIW : la mallette à l'étincelle (piste 4, décision du 9 octobre 2026).
// Lancer depuis la racine du dépôt : node scripts/generate-brand.cjs
// Écrit public/brand/atelier/*, src/app/icon.svg, src/app/apple-icon.png,
// src/app/favicon.ico et src/app/opengraph-image.png.
// Le mot « AIW » et « AI WORK KIT » sont des tracés (scripts/marque/mot.json, Nunito) :
// le logo s'affiche pareil partout, sans police à charger.
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const racine = path.resolve(__dirname, "..");
const sortie = path.join(racine, "public/brand/atelier");
const mot = JSON.parse(fs.readFileSync(path.join(__dirname, "marque/mot.json"), "utf8"));
const VERT = "#0b6b5e", ENCRE = "#17211f", MENTHE = "#b9f2d6", BLANC = "#ffffff";

// La mallette : une poignée, un corps aux coins arrondis, l'étincelle de l'IA au centre.
const POIGNEE = "M45,38 V31 a9,9 0 0 1 9,-9 h20 a9,9 0 0 1 9,9 V38";
const ETINCELLE = "M64,48 Q68.0,69.0 89,73 Q68.0,77.0 64,98 Q60.0,77.0 39,73 Q60.0,69.0 64,48 Z";

function mallette(corps, etincelle) {
  return `<path d="${POIGNEE}" fill="none" stroke="${corps}" stroke-width="10" stroke-linecap="round"/>`
    + `<rect x="12" y="36" width="104" height="74" rx="18" fill="${corps}"/>`
    + `<path d="${ETINCELLE}" fill="${etincelle}" stroke="${etincelle}" stroke-width="3.5" stroke-linejoin="round"/>`;
}
// Une seule couleur : l'étincelle est découpée dans le corps (transparente), pour un tampon ou une impression.
function malletteDecoupee(couleur, id) {
  return `<mask id="${id}"><rect width="128" height="128" fill="#fff"/><path d="${ETINCELLE}" fill="#000" stroke="#000" stroke-width="3.5" stroke-linejoin="round"/></mask>`
    + `<g mask="url(#${id})"><path d="${POIGNEE}" fill="none" stroke="${couleur}" stroke-width="10" stroke-linecap="round"/><rect x="12" y="36" width="104" height="74" rx="18" fill="${couleur}"/></g>`;
}
function svg(corps, l = 128, h = 128) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${l}" height="${h}" viewBox="0 0 ${l} ${h}" role="img"><title>AI WORK KIT</title>${corps}</svg>`;
}
function texte(aiw, sous) { return `<path d="${mot.aiw}" fill="${aiw}"/><path d="${mot.sous_titre}" fill="${sous}"/>`; }
function centre(dessin, echelle) { return `<g transform="translate(64 64) scale(${echelle}) translate(-64 -64)">${dessin}</g>`; }

async function ecrire(nom, source, largeur) {
  fs.writeFileSync(path.join(sortie, `${nom}.svg`), source);
  await sharp(Buffer.from(source), { density: 600 }).resize(largeur).png().toFile(path.join(sortie, `${nom}.png`));
}
const png = (source, taille) => sharp(Buffer.from(source), { density: 600 }).resize(taille, taille).png();

async function main() {
  fs.mkdirSync(sortie, { recursive: true });
  const symboles = {
    primary: mallette(VERT, BLANC),
    reverse: mallette(BLANC, VERT),
    mono: malletteDecoupee(ENCRE, "m"),
  };
  const mots = { primary: texte(ENCRE, VERT), reverse: texte(BLANC, MENTHE), mono: texte(ENCRE, ENCRE) };
  for (const nom of Object.keys(symboles)) {
    await ecrire(`symbol-${nom}`, svg(symboles[nom]), 1024);
    await ecrire(`logo-${nom}`, svg(symboles[nom] + mots[nom], 370, 128), 1480);
  }
  // Logo court (mallette et AIW, sans « AI WORK KIT ») pour les petites tailles, comme le coin de
  // l'affiche des vidéos : la ligne du dessous y serait trop petite pour se lire. Le mot AIW
  // descend de 9 pour se centrer sur la mallette.
  fs.writeFileSync(path.join(sortie, "logo-court-reverse.svg"),
    svg(symboles.reverse + `<path d="${mot.aiw}" fill="${BLANC}" transform="translate(0 9)"/>`, 337, 128));
  // Icône d'application : carré vert aux coins arrondis, mallette blanche.
  const icone = svg(`<rect width="128" height="128" rx="28" fill="${VERT}"/>` + centre(mallette(BLANC, VERT), 0.7));
  await ecrire("app-icon", icone, 512);
  for (const t of [16, 32, 192, 512]) await png(icone, t).toFile(path.join(sortie, `icon-${t}.png`));
  // Icône « maskable » : tout le dessin tient dans le cercle central (80 % du diamètre).
  const masquable = svg(`<rect width="128" height="128" fill="${VERT}"/>` + centre(mallette(BLANC, VERT), 0.58));
  await ecrire("icon-maskable", masquable, 512);
  await sharp(Buffer.from(masquable), { density: 600 }).resize(512).flatten({ background: VERT }).png().toFile(path.join(sortie, "icon-maskable.png"));
  await ecrire("icon-monochrome", svg(centre(malletteDecoupee(ENCRE, "m"), 0.72)), 512);
  // Écran d'accueil de l'iPhone : carré plein, iOS arrondit lui-même les coins.
  await png(svg(`<rect width="128" height="128" fill="${VERT}"/>` + centre(mallette(BLANC, VERT), 0.7)), 180).toFile(path.join(racine, "src/app/apple-icon.png"));
  fs.writeFileSync(path.join(racine, "src/app/icon.svg"), icone);
  // favicon.ico : trois images PNG (16, 32, 48), lues par les navigateurs actuels.
  const tailles = [16, 32, 48];
  const images = await Promise.all(tailles.map((t) => png(icone, t).toBuffer()));
  const entete = Buffer.alloc(6 + images.length * 16);
  entete.writeUInt16LE(1, 2); entete.writeUInt16LE(images.length, 4);
  let decalage = entete.length;
  images.forEach((b, i) => {
    const a = 6 + i * 16; entete[a] = tailles[i]; entete[a + 1] = tailles[i];
    entete.writeUInt16LE(1, a + 4); entete.writeUInt16LE(32, a + 6); entete.writeUInt32LE(b.length, a + 8); entete.writeUInt32LE(decalage, a + 12);
    decalage += b.length;
  });
  fs.writeFileSync(path.join(racine, "src/app/favicon.ico"), Buffer.concat([entete, ...images]));
  // Image d'un lien partagé (1200 x 630) : le fond porte déjà le slogan et l'adresse
  // (scripts/marque/og-fond.png) ; on y pose le petit logo en haut à gauche et la grande mallette à droite.
  const petit = await sharp(Buffer.from(svg(symboles.reverse)), { density: 600 }).resize(92).png().toBuffer();
  const grand = await sharp(Buffer.from(svg(symboles.reverse)), { density: 600 }).resize(300).png().toBuffer();
  await sharp(path.join(__dirname, "marque/og-fond.png"))
    .composite([{ input: petit, left: 82, top: 70 }, { input: grand, left: 814, top: 167 }])
    .png().toFile(path.join(racine, "src/app/opengraph-image.png"));
  console.log("Logo fabriqué :", fs.readdirSync(sortie).length, "fichiers dans public/brand/atelier");
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
