import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
import { createHash } from 'node:crypto';

const dist = resolve('dist');
const inventory = JSON.parse(await readFile('scripts/data/asset-inventory.json', 'utf8'));
if (inventory.count !== 49 || inventory.items.length !== 49)
  throw Error('Inventário dos 49 pares ausente');
const expected = new Set(inventory.items.flatMap((i) => [i.pngPath, i.webpPath]));
// Pré-visualizações autorizadas: primeiras duas páginas do PDF institucional público.
expected.add('assets/WebP/apresentacao/apresentacao-foton-pagina-01.webp');
expected.add('assets/WebP/apresentacao/apresentacao-foton-pagina-02.webp');
// Fotografias institucionais autorizadas para o dashboard Nossa Equipe.
const teamPhotos = [
  'FotoPerfilClaudioDias.webp',
  'FotoPerfilCynthiaMichels.webp',
  'FotoPerfilDanielaPellin.webp',
  'FotoPerfilDanielliSanderi.webp',
  'FotoPerfilDenicezarBaldo.webp',
  'FotoPerfilHeberLopes.webp',
  'FotoPerfilJorgeKrug.webp',
  'FotoPerfilJorgeVerschoore.webp',
  'FotoPerfilLarissaCrestani.webp',
  'FotoPerfilLeonardoRossato.webp',
  'FotoPerfilLesterFaria.webp',
  'FotoPerfilLucasFriedrich.webp',
  'FotoPerfilMarceloSchiller.webp',
  'FotoPerfilRosangelaMaraschin.webp',
  'FotoPerfilSuzielliMendonca.webp',
  'FotoPerfilVivianeStamm.webp',
  'FotoPerfilWilsonFonseca.webp',
];
for (const name of teamPhotos) expected.add('assets/img-diretoria/' + name);
// Nove pares documentais autorizados: capa e carrossel da fundação do Instituto.
for (let number = 1; number <= 9; number++) {
  const name = 'Img-Fundacao-Foton-' + String(number).padStart(2, '0');
  expected.add('assets/WebP/instituto/fundacao/' + name + '.webp');
  expected.add('assets/PNG/instituto/fundacao/' + name + '.png');
}
const partnerSnapshot = JSON.parse(await readFile('src/content/partners.json', 'utf8'));
const logoFilenames = JSON.parse(await readFile('scripts/data/partner-logo-names.json', 'utf8'));
const svgNames = new Set();
const groupCounts = new Map();
if (partnerSnapshot.length !== 31) throw Error('Exatamente 31 parceiros SVG são obrigatórios');
for (const legacy of Object.values(logoFilenames)) {
  expected.add('assets/PNG/parceiros/' + legacy + '.png');
  expected.add('assets/WebP/parceiros/' + legacy + '.webp');
}
for (const partner of partnerSnapshot) {
  if (partner.status !== 'publicado' || partner.locale !== 'pt-br')
    throw Error('Parceiro não publicado na seleção pública: ' + partner.id);
  if (partner.logo_slug) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(partner.logo_slug))
      throw Error('Slug de logo inválido: ' + partner.id);
    const filename = logoFilenames[partner.logo_slug];
    if (!filename || !/^Logo[A-Za-z0-9]+$/.test(filename))
      throw Error('Logo sem nome PascalCase canônico: ' + partner.id);
    if (filename === 'LogoRede40') throw Error('Rede 4.0 não autorizada na nova seleção');
    if (partner.logo_filename !== filename + '.svg')
      throw Error('Logo SVG diverge do cadastro: ' + partner.id);
    svgNames.add(filename + '.svg');
    groupCounts.set(partner.partner_tier, (groupCounts.get(partner.partner_tier) || 0) + 1);
    expected.add('assets/img-logos-parceiros-foton/assets-svg/' + filename + '.svg');
    expected.add('assets/img-logos-parceiros-foton/display-svg/' + filename + '.svg');
  }
}

const expectedGroups = [
  ['Ciência e Pesquisa', 8],
  ['Ecossistema e Instituições', 9],
  ['Foton: Tecnologias Quânticas', 5],
  ['Empresas Parceiras', 9],
];
if (
  expected.size !== 98 + 64 + 31 + 31 + 2 + teamPhotos.length + 18 ||
  svgNames.size !== 31 ||
  expectedGroups.some(([group, n]) => groupCounts.get(group) !== n) ||
  groupCounts.size !== 4
)
  throw Error('A seleção SVG deve ter quatro grupos 8/9/5/9 sem duplicados');
// Derivados precisam corresponder exatamente aos 31 SVGs aprovados.
const displayReport = JSON.parse(
  await readFile('scripts/data/partner-svg-display-report.json', 'utf8'),
);
const displayFiles = new Set(displayReport.records.map((record) => record.file));
if (
  displayReport.count !== 31 ||
  displayReport.records.length !== 31 ||
  displayFiles.size !== 31 ||
  [...svgNames].some((filename) => !displayFiles.has(filename)) ||
  displayReport.sourceBytes <= displayReport.displayBytes
) {
  throw Error('Derivados SVG devem ter exatamente 31 correspondências aprovadas e ser mais leves');
}
const slideAsset =
  'assets/img-logos-parceiros-foton/EcossistemasEParceirosSlideApresentacaoInstitucionalFoton.svg';
expected.add(slideAsset);
const researchMedia = JSON.parse(await readFile('src/content/research-media.json', 'utf8'));
const photoPaths = [1, 2, 3, 4, 5, 6, 8, 9].map(
  (number) => `assets/img-haquantum/HaQuantum${String(number).padStart(2, '0')}.jpg`,
);
if (
  researchMedia.haquantum.map(({ path }) => path).join() !== photoPaths.join() ||
  researchMedia.pulso.path !== 'assets/img-jornada/EtapaPulsoYouTube.jpg'
) {
  throw Error('Sequência de fotografias do HaQuantum ou miniatura da Etapa Pulso divergente');
}
const eventMedia = new Map(
  [researchMedia.pulso, ...researchMedia.haquantum].map(({ path, sha256 }) => [path, sha256]),
);
const researchLines = JSON.parse(await readFile('src/content/research-lines.json', 'utf8'));
const routeDirectories = new Set([
  'instituto',
  'pesquisa',
  'pesquisa/jornada',
  'pesquisa/haquantum',
  ...researchLines.map(({ slug }) => `pesquisa/${slug}`),
  'parceiros',
  'jornada',
  'manifesto',
  'noticias',
  'noticias/fundacao-instituto-foton',
  'apresentacao',
  'transparencia',
  'apoie',
  'contato',
  'privacidade',
  'termos',
]);
const rootFiles = new Set([
  '.nojekyll',
  '404.html',
  'index.html',
  'robots.txt',
  'sitemap.xml',
  'version.json',
]);
const expectedDocuments = new Set(['documents/apresentacao-institucional-2026-09-10.pdf']);
const prohibited =
  /\b(?:supabase\.co|storage\/v1|auth\/v1|VITE_SUPABASE_URL|VITE_SUPABASE_ANON_KEY|sb_secret_|service_role)\b/i;
const otherSensitive =
  /github_pat_[A-Za-z0-9_]{25,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;
const forbiddenSegments = new Set([
  '.github',
  'documentation',
  'docs',
  'tests',
  'test-results',
  'scripts',
  'supabase',
  'agents-archive',
  'decision-archive',
  'reports',
  'prompts',
  'prompt-templates',
]);
const forbiddenExt =
  /\.(?:md|sql|zip|tar|gz|bak|dump|db|sqlite|pem|key|p12|pfx|log|map|ts|tsx|ya?ml)$/i;
const textTypes = new Set(['.html', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.svg']);
const seen = new Set(),
  violations = [];

async function walk(dir, prefix = '') {
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? prefix + '/' + ent.name : ent.name;
    const parts = rel.split('/'),
      top = parts[0];
    if (ent.isSymbolicLink()) {
      violations.push('symlink ' + rel);
      continue;
    }
    if (parts.some((p) => forbiddenSegments.has(p))) {
      violations.push('private ' + rel);
      continue;
    }
    if (ent.isDirectory()) {
      if (
        !prefix &&
        !routeDirectories.has(top) &&
        !['assets', 'documents', 'licenses'].includes(top)
      ) {
        violations.push('unexpected folder ' + rel);
        continue;
      }
      await walk(join(dir, ent.name), rel);
      continue;
    }
    if (!ent.isFile()) {
      violations.push('not file ' + rel);
      continue;
    }
    seen.add(rel);
    if (forbiddenExt.test(rel)) {
      violations.push('sensitive extension ' + rel);
      continue;
    }
    if (routeDirectories.has(top) && !routeDirectories.has(parts.slice(0, -1).join('/')))
      violations.push('route file ' + rel);
    else if (routeDirectories.has(top) && parts.at(-1) !== 'index.html')
      violations.push('route file ' + rel);
    else if (top === 'documents' && !expectedDocuments.has(rel))
      violations.push('document not approved ' + rel);
    else if (top === 'assets' && ['PNG', 'WebP'].includes(parts[1]) && !expected.has(rel))
      violations.push('image not inventoried ' + rel);
    else if (top === 'assets' && parts[1] === 'img-logos-parceiros-foton' && !expected.has(rel))
      violations.push('SVG não autorizado ' + rel);
    else if (
      top === 'assets' &&
      !['PNG', 'WebP', 'img-logos-parceiros-foton'].includes(parts[1]) &&
      !expected.has(rel) &&
      !eventMedia.has(rel) &&
      !/^assets\/[^/]+\.(?:js|mjs|css|woff2?|ttf|svg)$/i.test(rel)
    )
      violations.push('unexpected bundler asset ' + rel);
    else if (top === 'licenses' && rel !== 'licenses/raleway-OFL.txt')
      violations.push('license ' + rel);
    else if (parts.length === 1 && !rootFiles.has(rel))
      violations.push('unexpected root file ' + rel);
    if (textTypes.has(extname(rel))) {
      const content = await readFile(join(dir, ent.name), 'utf8');
      if (prohibited.test(content) || otherSensitive.test(content))
        violations.push('forbidden runtime content ' + rel);
    }
  }
}
await walk(dist);
for (const a of expected) {
  if (!seen.has(a)) violations.push('missing asset ' + a);
}
for (const d of expectedDocuments) {
  if (!seen.has(d)) violations.push('missing public pdf ' + d);
}
for (const route of routeDirectories) {
  if (!seen.has(route + '/index.html')) violations.push('missing route ' + route);
}
for (const [path, hash] of eventMedia) {
  if (!seen.has(path)) violations.push('missing event image ' + path);
  else if (
    createHash('sha256')
      .update(await readFile(join(dist, path)))
      .digest('hex') !== hash
  )
    violations.push('event image differs from original ' + path);
}
if (!seen.has('index.html')) violations.push('missing index');
for (const a of expected) {
  if (seen.has(a) && (await stat(join(dist, a))).size < 100) violations.push('empty asset ' + a);
}
if (violations.length) {
  console.error('Site estático reprovado:', violations);
  process.exitCode = 1;
} else
  console.log(
    'Pages validado: 31 logos SVG, slide separado, 4 grupos 8/9/5/9, mídias históricas preservadas e nenhuma referência runtime Supabase.',
  );
