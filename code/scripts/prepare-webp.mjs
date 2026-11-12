import { mkdir, readdir, readFile, copyFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { basename, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const root = fileURLToPath(new URL('..', import.meta.url));
const publicDir = join(root, 'public');
const outDir = join(publicDir, 'images/webp');
const workDir = join(root, '.asset-staging');
const originals = join(workDir, 'originais');
const source = 'https://qvyrromhazssofombhem.supabase.co/storage/v1/object/public/foton-public';
const remote = [
  ...Array.from({ length: 20 }, (_, i) => ({
    path: 'img-visitas-tecnicas/visita-' + String(i + 1).padStart(2, '0') + '.png',
    dest: 'visits',
  })),
  ...[
    'Thumb_CartaSudeste.jpg', 'Thumb_CartaNorte.jpeg', 'Carta_Nordeste.jpg',
    'Carta_CentroOeste.jpeg', 'Carta_Sul.jpg', 'thumb_PorqueIssoEImportante.jpg',
    'OqueeoManifestoQuanticoNacional.png', 'ComoFaremosIsso.jpg',
  ].map(name => ({ path: 'img-manifesto-quantico/' + name, dest: 'manifesto' })),
];
const manifest = [];
const missing = [];

async function walk(dir) {
  const files = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) files.push(...await walk(join(dir, e.name)));
    else if (e.isFile()) files.push(join(dir, e.name));
  }
  return files;
}

async function toWebP(input, output, maxWidth) {
  await mkdir(join(output, '..'), { recursive: true });
  const result = await run('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries',
    'stream=width,height', '-of', 'csv=p=0', input,
  ]);
  const width = Number(result.stdout.split(',')[0]);
  if (!width) throw new Error('Cannot read dimensions: ' + input);
  const args = ['-y', '-hide_banner', '-loglevel', 'error', '-i', input];
  if (width > maxWidth) args.push('-vf', 'scale=' + maxWidth + ':-2:flags=lanczos');
  args.push('-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', '-compression_level', '5', output);
  await run('ffmpeg', args, { maxBuffer: 10 * 1024 * 1024 });
}

await mkdir(originals, { recursive: true });
await mkdir(outDir, { recursive: true });
const local = (await walk(publicDir)).filter(path =>
  /\.(avif|png|jpe?g)$/i.test(path) && !path.includes('/images/webp/'));
for (const path of local) {
  const rel = relative(publicDir, path);
  const target = join(originals, 'site', rel);
  await mkdir(join(target, '..'), { recursive: true });
  await copyFile(path, target);
  const group = rel.startsWith('images/illustrative/') ? 'illustrative' : 'branding';
  const out = join(outDir, group, basename(path, extname(path)) + '.webp');
  await toWebP(path, out, group === 'illustrative' ? 1440 : 1280);
  manifest.push({ source: rel, preview: relative(publicDir, out), origin: 'GitHub' });
}

for (const entry of remote) {
  const url = source + '/' + entry.path;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const raw = Buffer.from(await response.arrayBuffer());
    if (raw.length < 100) throw new Error('Image is empty');
    const localPath = join(originals, 'storage', entry.path);
    await mkdir(join(localPath, '..'), { recursive: true });
    await writeFile(localPath, raw);
    const output = join(outDir, entry.dest, basename(entry.path, extname(entry.path)) + '.webp');
    await toWebP(localPath, output, entry.dest === 'visits' ? 1200 : 1400);
    manifest.push({ source: entry.path, preview: relative(publicDir, output), origin: 'Storage público Foton' });
    console.log('Converted ' + entry.path + ' (' + raw.length + ' bytes)');
  } catch (error) {
    missing.push({ path: entry.path, reason: String(error) });
    console.warn('Unconfirmed source ' + entry.path + ': ' + String(error));
  } finally {
    clearTimeout(timeout);
  }
}
await writeFile(join(workDir, 'inventory.json'), JSON.stringify({ manifest, missing }, null, 2));
await mkdir(join(workDir, 'pacotes'), { recursive: true });
await run('zip', ['-q', '-r', join(workDir, 'pacotes/Assets-do-site-originais.zip'), '.'], { cwd: originals });
await run('zip', ['-q', '-r', join(workDir, 'pacotes/Assets-WebPG-otimizados.zip'), '.'], { cwd: outDir });
console.log(JSON.stringify({ total: manifest.length, unavailable: missing.length }));
if (!manifest.some(e => e.source === 'img-visitas-tecnicas/visita-03.png')) {
  throw new Error('A Visita Técnica 03 não pôde ser recuperada: não publicar como foto local.');
}
