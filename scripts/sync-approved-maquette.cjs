// Snapshot the approved local maquette without changing its layout or motion.
// Run from AI-WORK-KIT with: node scripts/sync-approved-maquette.cjs
const fs = require('node:fs');
const path = require('node:path');

const project = path.resolve(__dirname, '..');
const prototype = path.resolve(project, '..', 'maquette-experience-iaw');
const sourceHtml = fs.readFileSync(path.join(prototype, 'index.html'), 'utf8');
const sourceCss = fs.readFileSync(path.join(prototype, 'style.css'), 'utf8');
const main = sourceHtml.match(/<main id="contenu">([\s\S]*?)<\/main>/);
if (!main) throw new Error('The approved maquette main element was not found.');

const markup = main[1]
  .replaceAll('http://localhost:3001', '')
  .replaceAll('./assets/boite-ia-centre.png', '/experience/boite-ia-centre.png')
  .replaceAll('MAQUETTE · AUCUN ENVOI', 'APERÇU DU PARCOURS')
  .replaceAll('Démonstration de maquette · aucune donnée réelle', 'Aperçu du parcours AI WORK KIT')
  .replaceAll('Cette proposition illustre le futur parcours. Aucun formulaire n’est envoyé et aucun rendez-vous n’est réservé depuis cette maquette.', 'Choisissez le service correspondant à votre projet pour poursuivre.');

fs.writeFileSync(
  path.join(project, 'src', 'components', 'approved-home-markup.ts'),
  '// Generated from the approved maquette. Re-run scripts/sync-approved-maquette.cjs to sync.\n' +
    'export const approvedHomeMarkup = ' + JSON.stringify(markup) + ';\n',
);

const pnpmRoot = path.join(project, 'node_modules', '.pnpm');
const postcssPackage = fs.readdirSync(pnpmRoot).filter((name) => name.startsWith('postcss@')).sort().at(-1);
if (!postcssPackage) throw new Error('PostCSS was not found in the project dependencies.');
const postcss = require(path.join(pnpmRoot, postcssPackage, 'node_modules', 'postcss'));
const css = postcss.parse(sourceCss);
const localFamilies = new Map([
  ["'Outfit'", 'var(--font-outfit)'],
  ["'Geist'", 'var(--font-geist)'],
  ["'Plus Jakarta Sans'", 'var(--font-plus-jakarta)'],
  ["'DM Mono'", 'var(--font-dm-mono)'],
  ["'Bricolage Grotesque'", 'var(--font-bricolage)'],
]);
css.walkDecls((decl) => {
  for (const [family, localVariable] of localFamilies) {
    decl.value = decl.value.replaceAll(family, localVariable);
  }
});
css.walkRules((rule) => {
  if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
  rule.selectors = rule.selectors.map((selector) => {
    const clean = selector.trim();
    if (clean === ':root' || clean === 'body' || clean === 'html') return '#awk-studio .aw-maquette';
    if (clean.startsWith(':root')) return clean.replace(/^:root/, '#awk-studio .aw-maquette');
    if (clean.startsWith('body')) return clean.replace(/^body/, '#awk-studio .aw-maquette');
    if (clean.startsWith('html')) return clean.replace(/^html/, '#awk-studio .aw-maquette');
    return `#awk-studio .aw-maquette ${clean}`;
  });
});
fs.writeFileSync(
  path.join(project, 'src', 'app', 'approved-home.css'),
  '/* Exact approved maquette styles, scoped to its homepage markup. */\n' + css.toString() + '\n',
);
fs.mkdirSync(path.join(project, 'public', 'experience'), { recursive: true });
fs.copyFileSync(
  path.join(prototype, 'assets', 'boite-ia-centre.png'),
  path.join(project, 'public', 'experience', 'boite-ia-centre.png'),
);
