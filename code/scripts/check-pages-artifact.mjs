import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';
import { createHash } from 'node:crypto';

const dist = resolve('dist');
const inventory = JSON.parse(await readFile('scripts/data/asset-inventory.json', 'utf8'));
if (inventory.count !== 34 || inventory.items.length !== 34)
  throw Error('Inventário dos 34 pares ausente');
const expected = new Set(inventory.items.flatMap((i) => [i.pngPath, i.webpPath]));
// Hero oficial do Manifesto: WebP leve na renderização, PNG como original.
const manifestoHeroMedia = new Map([
  [
    'assets/05 - Manifesto/Imagens do Manifesto/PNG/HeroManifestoFGlass.png',
    '556011e60cbbfa00fa9f2e112b4ef612067a5328630acf92b54903f754e701b1',
  ],
  [
    'assets/05 - Manifesto/Imagens do Manifesto/WebP/HeroManifestoFGlass.webp',
    '6eeed41c926a2dab9c6573626d26c1fc32519f426a2ce2a4c63391d9ff579ebd',
  ],
]);
for (const path of manifestoHeroMedia.keys()) expected.add(path);
// Pré-visualizações autorizadas: primeiras duas páginas do PDF institucional público.
expected.add('assets/WebP/apresentacao/ApresentacaoFotonPagina01.webp');
expected.add('assets/WebP/apresentacao/ApresentacaoFotonPagina02.webp');
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
  const name = 'ImgFundacaoFoton' + String(number).padStart(2, '0');
  expected.add('assets/WebP/instituto/fundacao/' + name + '.webp');
  expected.add('assets/PNG/instituto/fundacao/' + name + '.png');
}
const partnerSnapshot = JSON.parse(await readFile('src/content/partners.json', 'utf8'));
const logoFilenames = JSON.parse(await readFile('scripts/data/partner-logo-names.json', 'utf8'));
const partnerAssetRoot = 'assets/03 - Ecossistema de Parceiros/Logos dos Parceiros';
const svgNames = new Set();
const groupCounts = new Map();
if (partnerSnapshot.length !== 31) throw Error('Exatamente 31 parceiros SVG são obrigatórios');
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
    expected.add(partnerAssetRoot + '/SVG/assets-svg/' + filename + '.svg');
  }
}

const expectedGroups = [
  ['Ciência e Pesquisa', 8],
  ['Ecossistema e Instituições', 9],
  ['Foton: Tecnologias Quânticas', 5],
  ['Empresas Parceiras', 9],
];
if (
  expected.size !==
    inventory.count * 2 + 31 + 2 + teamPhotos.length + 18 + manifestoHeroMedia.size ||
  svgNames.size !== 31 ||
  expectedGroups.some(([group, n]) => groupCounts.get(group) !== n) ||
  groupCounts.size !== 4
)
  throw Error('A seleção SVG deve ter quatro grupos 8/9/5/9 sem duplicados');
const instagramMockup = JSON.parse(await readFile('src/content/social-mockup-assets.json', 'utf8'));
const instagramAssetRoot = 'assets/06 - Notícias/Redes Sociais/Instagram/';
if (
  instagramMockup.id !== 'instagram-phone-hand' ||
  instagramMockup.platform !== 'instagram' ||
  instagramMockup.origin.path !==
    'public/' + instagramAssetRoot + 'SVG/InstagramPhoneHand.svg' ||
  instagramMockup.svg.path !== instagramAssetRoot + 'SVG/InstagramPhoneHand.svg' ||
  instagramMockup.svg.sha256 !== instagramMockup.origin.sha256 ||
  instagramMockup.png.path !== instagramAssetRoot + 'PNG/InstagramPhoneHand.png' ||
  instagramMockup.webp.path !== instagramAssetRoot + 'WebP/InstagramPhoneHand.webp'
)
  throw Error('Inventário do mockup Instagram não corresponde aos caminhos aprovados');
const instagramAssetVersions = [instagramMockup.svg, instagramMockup.png, instagramMockup.webp];
const instagramAssetHashes = new Map(
  instagramAssetVersions.map(({ path, sha256 }) => [path, sha256]),
);
for (const [path, hash] of instagramAssetHashes) {
  if (!/^[a-f0-9]{64}$/.test(hash)) throw Error('SHA-256 do mockup Instagram inválido: ' + path);
  expected.add(path);
}
const originalSvg = await readFile(instagramMockup.origin.path);
if (
  createHash('sha256').update(originalSvg).digest('hex') !== instagramMockup.origin.sha256 ||
  /<script\b|onload\s*=|https?:\/\//i.test(
    originalSvg.toString('utf8').replace(/xmlns(?::xlink)?="[^"]*"/g, ''),
  )
)
  throw Error('SVG original do Instagram divergente ou com referência remota não autorizada');

const linkedinMockup = JSON.parse(
  await readFile('src/content/linkedin-mockup-assets.json', 'utf8'),
);
const linkedinAssetRoot = 'assets/06 - Notícias/Redes Sociais/LinkedIn/';
if (
  linkedinMockup.id !== 'linkedin-tablet' ||
  linkedinMockup.platform !== 'linkedin' ||
  linkedinMockup.origin.path !== 'public/' + linkedinAssetRoot + 'PNG/LinkedInTablet.png' ||
  linkedinMockup.svg.path !== linkedinAssetRoot + 'SVG/LinkedInTablet.svg' ||
  linkedinMockup.png.path !== linkedinAssetRoot + 'PNG/LinkedInTablet.png' ||
  linkedinMockup.webp.path !== linkedinAssetRoot + 'WebP/LinkedInTablet.webp' ||
  linkedinMockup.png.sha256 !== linkedinMockup.origin.sha256
)
  throw Error('Inventário do tablet LinkedIn não corresponde aos caminhos aprovados');
const linkedinAssetHashes = new Map();
for (const kind of ['svg', 'png', 'webp']) {
  const asset = linkedinMockup[kind];
  if (!/^[a-f0-9]{64}$/.test(asset.sha256))
    throw Error('SHA-256 do LinkedIn inválido: ' + asset.path);
  linkedinAssetHashes.set(asset.path, asset.sha256);
  expected.add(asset.path);
}
const originalLinkedinPng = await readFile(linkedinMockup.origin.path);
const originalLinkedinHash = createHash('sha256').update(originalLinkedinPng).digest('hex');
if (originalLinkedinHash !== linkedinMockup.origin.sha256)
  throw Error('PNG original do LinkedIn divergente do inventário');
const linkedinSvgPath = join('public', linkedinMockup.svg.path);
const linkedinSvgSource = await readFile(linkedinSvgPath, 'utf8');
const cleanLinkedinSvg = linkedinSvgSource.replace(/xmlns(?::xlink)?="[^"]*"/g, '');
const forbiddenLinkedinSvg = /<script\b|<foreignObject\b|onload\s*=|href="https?:/i;
const hasEmbeddedPng = cleanLinkedinSvg.includes('href="data:image/png;base64,');
if (forbiddenLinkedinSvg.test(cleanLinkedinSvg) || !hasEmbeddedPng)
  throw Error('Contêiner SVG do LinkedIn contém conteúdo não permitido');

const newsMedia = JSON.parse(await readFile('src/content/news-media.json', 'utf8'));
const newsFolders = {
  softsul: '01-Foton-SOFTSUL',
  'lacq-pucrs': '02-LACQ-PUCRS',
  'assespro-rs': '03-Foton-Assespro-RS',
  cubotech: '04-Seminario-CUBOTECH',
  'uniso-leonti': '05-Uniso-Quantum-Day',
  'mobi-quantum': '07-Mobi-Quantum',
  'quantum-day-1': '07-Mobi-Quantum',
  'quantum-day-2': '07-Mobi-Quantum',
};
if (newsMedia.length !== 43 || new Set(newsMedia.map((m) => m.original)).size !== 43)
  throw Error('Inventário de notícias deve conter 43 imagens distintas');
for (const media of newsMedia) {
  const folder = newsFolders[media.group];
  const prefix = 'assets/06 - Notícias/Reportagens/' + folder + '/';
  const subfolder =
    media.group === 'quantum-day-1'
      ? 'QuantumDay1/'
      : media.group === 'quantum-day-2'
        ? 'QuantumDay2/'
        : '';
  const isMobi = media.group === 'mobi-quantum';
  const isDay1 = media.group === 'quantum-day-1';
  const isDay2 = media.group === 'quantum-day-2';
  const dayTwoName = /^(MobiQuantumUnisoQuantumDay01|QuantumDayDois(?:[1-8]|7VariantB))\.png$/;
  const validName =
    media.group === 'lacq-pucrs'
      ? /^LacqPucrs(?:0[1-9]|1[0-3])\.png$/.test(media.name)
      : isMobi
        ? /^QuantumBusiness[1-9]\.png$/.test(media.name)
        : isDay1
          ? /^MobiQuantumUnisoQuantumDay0[2-6]\.png$/.test(media.name)
          : isDay2
            ? dayTwoName.test(media.name)
            : /^[A-Za-z0-9]+\.png$/.test(media.name);
  if (
    !folder ||
    !validName ||
    media.original !== prefix + 'PNG/' + subfolder + media.name ||
    media.preview !== prefix + 'WebP/' + subfolder + media.name.replace(/\.png$/, '.webp')
  )
    throw Error('Caminho de imagem de notícia não padronizado: ' + media.name);
  expected.add(media.original);
  expected.add(media.preview);
}
// Preservação temporária: seis WebP do acervo anterior até classificação curatorial,
// sem exibí-los como fotos do Mobi Festival.
for (let number = 1; number <= 6; number++) {
  const name = 'MobiQuantumUnisoQuantumDay' + String(number).padStart(2, '0') + '.webp';
  expected.add('assets/06 - Notícias/Reportagens/07-Mobi-Quantum/WebP/' + name);
}
const mobi = newsMedia.filter(({ group }) => group === 'mobi-quantum');
if (mobi.length !== 9 || mobi.some((m, i) => m.name !== `QuantumBusiness${i + 1}.png`))
  throw Error('Carrossel Mobi Quantum deve usar as nove fotografias QuantumBusiness em ordem');
const dayOne = newsMedia.filter(({ group }) => group === 'quantum-day-1');
const dayTwo = newsMedia.filter(({ group }) => group === 'quantum-day-2');
if (dayOne.length !== 5 || dayTwo.length !== 10)
  throw Error('Quantum Day exige 5 fotografias do Dia 1 e 10 do Dia 2');
const leontiPhotos = newsMedia.filter(({ group }) => group === 'uniso-leonti');
if (
  leontiPhotos.length !== 2 ||
  leontiPhotos.some((media, index) => media.name !== `ProjetoLeonti${index + 1}.png`)
)
  throw Error('Projeto Leonti exige duas fotos em destaque com pares PNG/WebP');
const researchMedia = JSON.parse(await readFile('src/content/research-media.json', 'utf8'));
const photoPaths = [1, 2, 3, 4, 5, 6, 8, 9].map(
  (number) =>
    `assets/04 - P&D - Cientista Inovador/04C - HaQuantum/Galeria HaQuantum/PNG/HaQuantum${number}.png`,
);
const photoPreviewPaths = photoPaths.map((path) =>
  path.replace('/PNG/', '/WebP/').replace(/\.png$/, '.webp'),
);
if (
  researchMedia.haquantum.map(({ path }) => path).join() !== photoPaths.join() ||
  researchMedia.haquantum.map(({ previewPath }) => previewPath).join() !==
    photoPreviewPaths.join() ||
  researchMedia.pulso.path !==
    'assets/04 - P&D - Cientista Inovador/04B - Jornadas do Cientista Inovador/Imagens da Jornada/PNG/EtapaPulsoYouTube.png' ||
  researchMedia.pulso.previewPath !==
    'assets/04 - P&D - Cientista Inovador/04B - Jornadas do Cientista Inovador/Imagens da Jornada/WebP/EtapaPulsoYouTube.webp'
) {
  throw Error('Sequência de fotografias do HaQuantum ou miniatura da Etapa Pulso divergente');
}
const eventMedia = new Map([
  ...[researchMedia.pulso, ...researchMedia.haquantum].map(({ path, sha256 }) => [path, sha256]),
  ...researchMedia.haquantum.map(({ previewPath, previewSha256 }) => [previewPath, previewSha256]),
]);
if (eventMedia.size !== 17 || [...eventMedia.values()].some((hash) => !/^[a-f0-9]{64}$/.test(hash)))
  throw Error('As oito prévias WebP da galeria devem ter SHA-256 válido');
for (const path of photoPreviewPaths) expected.add(path);
const pulsoWebp = researchMedia.pulso.previewPath;
expected.add(pulsoWebp);
// Cópias de organização por aba mantidas na branch durante a migração Drive → GitHub.
// Cada cópia só é permitida se seu arquivo canônico estiver autorizado e tiver bytes idênticos.
const mirroredAssets = new Map();
function approveMirror(source, mirror) {
  if (!expected.has(source) || mirroredAssets.has(mirror)) {
    throw Error('Espelho de asset não autorizado: ' + mirror);
  }
  expected.add(mirror);
  mirroredAssets.set(mirror, source);
}
const instituteRoot = 'assets/02 - O Instituto/';
const instituteInfo = instituteRoot + '02A - Conheça o Instituto/';
const foundationRoot = instituteInfo + 'Fundação do Instituto Foton/';
const visitsRoot = instituteInfo + 'Visitas Técnicas/';
const teamRoot = instituteRoot + '02B - Nossa Equipe/WebP/';
const manifestoImagesRoot = 'assets/05 - Manifesto/Imagens da Página/';

for (let number = 1; number <= 2; number++) {
  const name = 'ApresentacaoFotonPagina' + String(number).padStart(2, '0') + '.webp';
  const original = 'assets/WebP/apresentacao/' + name;
  const copy = 'assets/01 - Início/Apresentação/WebP/' + name;
  approveMirror(original, copy);
}
for (let number = 1; number <= 9; number++) {
  const name = 'ImgFundacaoFoton' + String(number).padStart(2, '0');
  for (const [format, ext] of [
    ['PNG', 'png'],
    ['WebP', 'webp'],
  ]) {
    const original = `assets/${format}/instituto/fundacao/${name}.${ext}`;
    const copy = `${foundationRoot}${format}/${name}.${ext}`;
    approveMirror(original, copy);
  }
}
for (let number = 1; number <= 20; number++) {
  const name = 'Visita' + String(number).padStart(2, '0');
  for (const [format, ext] of [
    ['PNG', 'png'],
    ['WebP', 'webp'],
  ]) {
    const original = `assets/${format}/visitas-tecnicas/${name}.${ext}`;
    const copy = `${visitsRoot}${format}/${name}.${ext}`;
    approveMirror(original, copy);
  }
}
for (const name of teamPhotos) {
  approveMirror('assets/img-diretoria/' + name, teamRoot + name);
}
for (const format of ['PNG', 'WebP']) {
  for (const item of inventory.items.filter((item) => item.category === 'manifesto-quantico')) {
    const original = format === 'PNG' ? item.pngPath : item.webpPath;
    const copy = `${manifestoImagesRoot}${format}/${original.split('/').at(-1)}`;
    approveMirror(original, copy);
  }
}
// Registro documental da inauguração do Manifesto Quântico Nacional, em PNG e WebP.
const inaugurationRoot = 'assets/05 - Manifesto/Imagens do Manifesto/';
for (const [format, extension] of [
  ['PNG', 'png'],
  ['WebP', 'webp'],
]) {
  expected.add(
    inaugurationRoot + format + '/InauguracaoManifestoQuanticoFotonSaoPessoas.' + extension,
  );
}
// Apoie a Ciência: somente as três duplas já catalogadas.
const supportRoot = 'assets/08 - Apoie a Ciência/Imagens de Apoio/';
for (const asset of inventory.items.filter((item) => item.category === 'apoie')) {
  approveMirror(asset.pngPath, supportRoot + 'PNG/' + asset.pngPath.split('/').at(-1));
  approveMirror(asset.webpPath, supportRoot + 'WebP/' + asset.webpPath.split('/').at(-1));
}
// Identidade Visual: marcas raster e a animação SVG efetivamente aprovada.
const brandRoot = 'assets/09 - Identidade Visual/';
for (const asset of inventory.items.filter((item) => item.category === 'branding')) {
  approveMirror(asset.pngPath, brandRoot + 'PNG/' + asset.pngPath.split('/').at(-1));
  approveMirror(asset.webpPath, brandRoot + 'WebP/' + asset.webpPath.split('/').at(-1));
}
expected.add('assets/AnimacaoIdentidadeFoton.svg');
approveMirror(
  'assets/AnimacaoIdentidadeFoton.svg',
  'assets/09 - Identidade Visual/SVG/AnimacaoIdentidadeFoton.svg',
);
if (mirroredAssets.size !== 106) throw Error('Espelhos de assets esperados: 106');
const researchLines = JSON.parse(await readFile('src/content/research-lines.json', 'utf8'));
const newsRecords = JSON.parse(await readFile('src/content/publications.json', 'utf8'));
const newsSlugs = newsRecords.map(({ slug }) => slug);
if (
  newsSlugs.length !== 8 ||
  new Set(newsSlugs).size !== newsSlugs.length ||
  newsSlugs.some((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
)
  throw Error('Catálogo de notícias com slug repetido, inválido ou quantidade inesperada');
const newsRoutes = newsSlugs.map((slug) => 'noticias/' + slug);
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
  'redes-sociais',
  ...newsRoutes,
  'apresentacao',
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
    else if (top === 'assets' && parts[1] === 'noticias' && !expected.has(rel))
      violations.push('noticia sem inventário ' + rel);
    else if (
      top === 'assets' &&
      parts[1] === '03 - Ecossistema de Parceiros' &&
      parts[3] === 'SVG' &&
      !expected.has(rel)
    )
      violations.push('SVG não autorizado ' + rel);
    else if (
      top === 'assets' &&
      !['PNG', 'WebP', '03 - Ecossistema de Parceiros', 'noticias'].includes(parts[1]) &&
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
for (const [path, hash] of instagramAssetHashes) {
  if (!seen.has(path)) {
    violations.push('missing Instagram mockup asset ' + path);
    continue;
  }
  const current = createHash('sha256')
    .update(await readFile(join(dist, path)))
    .digest('hex');
  if (current !== hash) violations.push('Instagram mockup differs from approved asset ' + path);
}
for (const [path, hash] of linkedinAssetHashes) {
  if (!seen.has(path)) {
    violations.push('missing LinkedIn mockup asset ' + path);
    continue;
  }
  const current = createHash('sha256')
    .update(await readFile(join(dist, path)))
    .digest('hex');
  if (current !== hash) violations.push('LinkedIn mockup differs from approved asset ' + path);
}
for (const [path, hash] of manifestoHeroMedia) {
  if (!seen.has(path)) {
    violations.push('missing manifesto hero ' + path);
    continue;
  }
  const current = createHash('sha256')
    .update(await readFile(join(dist, path)))
    .digest('hex');
  if (current !== hash) violations.push('manifesto hero differs from approved asset ' + path);
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
if (seen.has(pulsoWebp)) {
  const header = await readFile(join(dist, pulsoWebp));
  if (header.toString('ascii', 0, 4) !== 'RIFF' || header.toString('ascii', 8, 12) !== 'WEBP') {
    violations.push('miniatura da Etapa Pulso não é um WebP válido');
  }
}
for (const [mirror, source] of mirroredAssets) {
  if (seen.has(mirror) && seen.has(source)) {
    const [original, copy] = await Promise.all([
      readFile(join(dist, source)),
      readFile(join(dist, mirror)),
    ]);
    if (!original.equals(copy)) violations.push('mirror differs from canonical asset ' + mirror);
  }
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
