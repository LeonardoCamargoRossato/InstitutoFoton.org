import { mkdir, copyFile, stat, writeFile } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
import sharp from 'sharp';
const root = resolve('code'),
  source = join(root, '.asset-staging/extracted'),
  dest = join(root, 'public/assets');
const cats = [
  'branding',
  'home',
  'instituto',
  'pesquisa',
  'jornada',
  'manifesto-quantico',
  'visitas-tecnicas',
  'apoie',
  'noticias',
  'institucional',
];
const illustrative = [
  'apoie-hero-scientists-mobile',
  'apoie-hero-scientists',
  'apoie-researcher-support',
  'home-generational-legacy',
  'home-hero-community-mobile',
  'home-hero-community',
  'home-science-network',
  'instituto-community-mobile',
  'instituto-community',
  'jornada-hero-pathways-mobile',
  'jornada-hero-pathways',
  'mosaic-collaborators',
  'mosaic-community',
  'mosaic-partners',
  'mosaic-society',
  'mosaic-students',
  'mosaic-training',
  'pesquisa-collaboration',
];
const manifest = {
  Thumb_CartaSudeste: 'Thumb_CartaSudeste.jpg',
  Thumb_CartaNorte: 'Thumb_CartaNorte.jpeg',
  Carta_Nordeste: 'Carta_Nordeste.jpg',
  Carta_CentroOeste: 'Carta_CentroOeste.jpeg',
  Carta_Sul: 'Carta_Sul.jpg',
  thumb_PorqueIssoEImportante: 'thumb_PorqueIssoEImportante.jpg',
  OqueeoManifestoQuanticoNacional: 'OqueeoManifestoQuanticoNacional.png',
  ComoFaremosIsso: 'ComoFaremosIsso.jpg',
};
const group = (n) =>
  n.startsWith('home-') || n.startsWith('mosaic-')
    ? 'home'
    : n.startsWith('apoie-')
      ? 'apoie'
      : n.startsWith('instituto-')
        ? 'instituto'
        : n.startsWith('jornada-')
          ? 'jornada'
          : n.startsWith('pesquisa-')
            ? 'pesquisa'
            : (() => {
                throw Error('Categoria ausente: ' + n);
              })();
const items = [];
for (const fmt of ['PNG', 'WebP'])
  for (const cat of cats) {
    const p = join(dest, fmt, cat);
    await mkdir(p, { recursive: true });
    await writeFile(join(p, '.gitkeep'), '');
  }
async function add(id, original, webp, cat, kind) {
  const src = join(source, original),
    preview = join(root, 'public/images/webp', webp);
  const [a, b] = await Promise.all([stat(src), stat(preview)]);
  if (!a.size || !b.size) throw Error('Fonte vazia: ' + original);
  const info = await sharp(src, { failOn: 'error' }).metadata();
  if (!info.width || !info.height) throw Error('Dimensões inválidas: ' + original);
  const png = join(dest, 'PNG', cat, id + '.png'),
    wp = join(dest, 'WebP', cat, id + '.webp');
  const extension = extname(original).toLowerCase();
  if (extension === '.png') await copyFile(src, png);
  else await sharp(src, { failOn: 'error' }).rotate().png({ compressionLevel: 9 }).toFile(png);
  await copyFile(preview, wp);
  items.push({
    id,
    category: cat,
    sourceType: kind,
    source: original,
    originalFormat: extension.slice(1),
    pngDerived: extension !== '.png',
    width: info.width,
    height: info.height,
    hasAlpha: !!info.hasAlpha,
    pngPath: 'assets/PNG/' + cat + '/' + id + '.png',
    webpPath: 'assets/WebP/' + cat + '/' + id + '.webp',
    originalBytes: a.size,
    webpBytes: b.size,
  });
}
for (const n of ['favicon', 'foton-logo', 'foton-logo-light'])
  await add(n, 'site/' + n + '.png', 'branding/' + n + '.webp', 'branding', 'brand');
for (const n of illustrative)
  await add(
    n,
    'site/images/illustrative/' + n + '.avif',
    'illustrative/' + n + '.webp',
    group(n),
    'ai-illustration',
  );
for (const [n, sourceName] of Object.entries(manifest))
  await add(
    n,
    'storage/img-manifesto-quantico/' + sourceName,
    'manifesto/' + n + '.webp',
    'manifesto-quantico',
    'documentary',
  );
for (let i = 1; i <= 20; i++) {
  const n = 'visita-' + String(i).padStart(2, '0');
  await add(
    n,
    'storage/img-visitas-tecnicas/' + n + '.png',
    'visits/' + n + '.webp',
    'visitas-tecnicas',
    'documentary',
  );
}
if (items.length !== 49 || new Set(items.map((x) => x.pngPath)).size !== 49)
  throw Error('Inventário incompleto');
await mkdir(join(root, 'assets'), { recursive: true });
await writeFile(
  join(root, 'assets/asset-inventory.json'),
  JSON.stringify(
    {
      count: items.length,
      scope: 'Exportação de imagens públicas; buckets não integralmente auditados',
      items,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  'Inventário concluído: ' +
    items.length +
    ' PNG e ' +
    items.length +
    ' WebP, sem requisições remotas.',
);
