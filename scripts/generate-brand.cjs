// Run with NODE_PATH pointing to a runtime containing sharp.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'public/brand/atelier');
fs.mkdirSync(out, { recursive: true });
const faces = [
  'M58.1 8.5a12 12 0 0 1 11.8 0l39.2 22.7a8 8 0 0 1 0 13.8L69.9 67.6a12 12 0 0 1-11.8 0L18.9 45a8 8 0 0 1 0-13.8L58.1 8.5Z',
  'M12 55.1a8 8 0 0 1 12-6.9l31.8 18.4a8 8 0 0 1 4 6.9v39.1a8 8 0 0 1-12 6.9L16 101.1a8 8 0 0 1-4-6.9V55.1Z',
  'M68.2 73.5a8 8 0 0 1 4-6.9L104 48.2a8 8 0 0 1 12 6.9v39.1a8 8 0 0 1-4 6.9l-31.8 18.4a8 8 0 0 1-12-6.9V73.5Z'
];
function symbol(colors, wire) {
  return faces.map((d, i) => `<path fill="${colors[i]}" d="${d}"/>`).join('') + `<g fill="none" stroke="${wire}" stroke-linecap="round" stroke-linejoin="round" stroke-width="7"><path d="M64 52V31M64 49 43 37M64 49l21-12"/></g><g fill="${wire}"><circle cx="64" cy="25" r="6.5"/><circle cx="37.8" cy="34" r="6.5"/><circle cx="90.2" cy="34" r="6.5"/></g>`;
}
const palettes = {
  primary: { faces: ['#0B6B5E', '#17211F', '#24564B'], wire: '#FFFDFC', text: '#17211F', sub: '#0B6B5E' },
  reverse: { faces: ['#FFFDFC', '#FFFDFC', '#FFFDFC'], wire: '#17211F', text: '#FFFDFC', sub: '#FFFDFC' },
  mono: { faces: ['#17211F', '#17211F', '#17211F'], wire: '#FFFDFC', text: '#17211F', sub: '#17211F' }
};
function svg(body, w = 128, h = 128) { return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>AI WORK KIT — Atelier intelligent</title>${body}</svg>`; }
async function asset(name, source, width) {
  fs.writeFileSync(path.join(out, `${name}.svg`), source);
  await sharp(Buffer.from(source)).resize(width).png().toFile(path.join(out, `${name}.png`));
}
async function main() {
  for (const [name, p] of Object.entries(palettes)) {
    const mark = symbol(p.faces, p.wire);
    await asset(`symbol-${name}`, svg(mark), 1024);
    const type = `<text x="154" y="78" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="800" letter-spacing="-2" fill="${p.text}">AIW</text><text x="157" y="108" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="3.6" fill="${p.sub}">AI WORK KIT</text>`;
    await asset(`logo-${name}`, svg(mark + type, 370, 128), 1480);
  }
  const white = symbol(palettes.reverse.faces, '#0B6B5E');
  const app = svg(`<rect width="128" height="128" rx="28" fill="#0B6B5E"/><g transform="translate(18 18) scale(.71875)">${white}</g>`);
  await asset('app-icon', app, 512);
  for (const size of [16, 32, 192, 512]) {
    await sharp(Buffer.from(app)).resize(size).png().toFile(path.join(out, `icon-${size}.png`));
  }
  // All essential artwork fits within the central 80% diameter safe circle.
  const maskable = svg(`<rect width="128" height="128" fill="#0B6B5E"/><g transform="translate(28 28) scale(.5625)">${white}</g>`);
  await asset('icon-maskable', maskable, 512);
  const apple = svg(`<rect width="128" height="128" fill="#0B6B5E"/><g transform="translate(18 18) scale(.71875)">${white}</g>`);
  await sharp(Buffer.from(apple)).resize(180).png().toFile(path.join(root, 'src/app/apple-icon.png'));
  // Transparent network cut-outs make this a real single-alpha monochrome icon.
  const monoMask = `<defs><mask id="m"><rect width="128" height="128" fill="white"/>${symbol(['white','white','white'], 'black')}</mask></defs>`;
  await asset('icon-monochrome', svg(monoMask + `<g mask="url(#m)">${faces.map(d => `<path fill="#17211F" d="${d}"/>`).join('')}</g>`), 512);
  fs.writeFileSync(path.join(root, 'src/app/icon.svg'), app);
  // PNG-compressed ICO entries supported by current desktop browsers.
  const images = await Promise.all([16, 32, 48].map(s => sharp(Buffer.from(app)).resize(s).png().toBuffer()));
  const header = Buffer.alloc(6 + images.length * 16); header.writeUInt16LE(1, 2); header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach((buf, i) => { const at = 6 + i * 16; header[at] = [16,32,48][i]; header[at+1] = header[at]; header.writeUInt16LE(1,at+4); header.writeUInt16LE(32,at+6); header.writeUInt32LE(buf.length,at+8); header.writeUInt32LE(offset,at+12); offset += buf.length; });
  fs.writeFileSync(path.join(root, 'src/app/favicon.ico'), Buffer.concat([header, ...images]));
  console.log('Brand assets generated:', fs.readdirSync(out).length);
}
main().catch(err => { console.error(err); process.exitCode = 1; });
