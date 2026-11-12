import { readFile, readdir } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const dist = resolve('dist');
const rootFiles = new Set([
  '.nojekyll',
  '404.html',
  'index.html',
  'robots.txt',
  'sitemap.xml',
  'version.json',
  'favicon.png',
  'foton-logo.png',
  'foton-logo-light.png',
]);
const routeDirectories = new Set([
  'instituto',
  'pesquisa',
  'jornada',
  'manifesto',
  'noticias',
  'apresentacao',
  'transparencia',
  'apoie',
  'contato',
  'privacidade',
  'termos',
]);
const approvedDocuments = new Set(['documents/apresentacao-institucional-2026-09-10.pdf']);
const approvedIllustrations = new Set([
  'images/illustrative/apoie-hero-scientists.avif',
  'images/illustrative/apoie-researcher-support.avif',
  'images/illustrative/home-generational-legacy.avif',
  'images/illustrative/home-hero-community.avif',
  'images/illustrative/home-science-network.avif',
  'images/illustrative/instituto-community.avif',
  'images/illustrative/jornada-hero-pathways.avif',
  'images/illustrative/mosaic-collaborators.avif',
  'images/illustrative/mosaic-community.avif',
  'images/illustrative/mosaic-partners.avif',
  'images/illustrative/mosaic-society.avif',
  'images/illustrative/mosaic-students.avif',
  'images/illustrative/mosaic-training.avif',
  'images/illustrative/pesquisa-collaboration.avif',
  'images/illustrative/apoie-hero-scientists-mobile.avif',
  'images/illustrative/home-hero-community-mobile.avif',
  'images/illustrative/instituto-community-mobile.avif',
  'images/illustrative/jornada-hero-pathways-mobile.avif',
]);
const forbiddenDirectories = new Set([
  '.github',
  'documentation',
  'docs',
  'tests',
  'test-results',
  'playwright-report',
  'scripts',
  'supabase',
  'agents-archive',
  'decision-archive',
  'reports',
  'prompts',
  'prompt-templates',
]);
const forbiddenName = /^(?:AGENTS|README)\.md$|(?:^|\/)\.env(?:\.|$)|\.(?:md|sql|zip|tar|gz|bak|dump|db|sqlite|pem|key|p12|pfx|log|map|ts|tsx|ya?ml)$/i;
const textExtensions = new Set(['.html', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.svg']);
const sensitiveText =
  /\bsb_secret_[A-Za-z0-9_-]{12,}|\bgh[pousr]_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/;
const checked = [];
const violations = [];

async function inspect(folder, prefix = '') {
  for (const item of await readdir(folder, { withFileTypes: true })) {
    const rel = prefix ? prefix + '/' + item.name : item.name;
    const parts = rel.split('/');
    const top = parts[0];
    if (item.isSymbolicLink()) {
      violations.push(rel + ' (link simbólico)');
      continue;
    }
    if (parts.some((part) => forbiddenDirectories.has(part))) {
      violations.push(rel + ' (diretório restrito)');
      continue;
    }
    if (item.isDirectory()) {
      if (prefix === '' && !routeDirectories.has(top) && !['assets', 'documents', 'licenses', 'images'].includes(top)) {
        violations.push(rel + ' (diretório não aprovado)');
        continue;
      }
      await inspect(join(folder, item.name), rel);
      continue;
    }
    if (!item.isFile()) {
      violations.push(rel + ' (entrada não regular)');
      continue;
    }
    checked.push(rel);
    if (forbiddenName.test(rel)) {
      violations.push(rel + ' (extensão ou nome restrito)');
      continue;
    }
    if (routeDirectories.has(top) && rel !== top + '/index.html') {
      violations.push(rel + ' (arquivo inesperado em rota)');
    } else if (top === 'documents' && !approvedDocuments.has(rel)) {
      violations.push(rel + ' (documento sem aprovação explícita)');
    } else if (top === 'images' && !approvedIllustrations.has(rel)) {
      violations.push(rel + ' (ilustração não inventariada)');
    } else if (top === 'licenses' && rel !== 'licenses/raleway-OFL.txt') {
      violations.push(rel + ' (licença não inventariada)');
    } else if (top === 'assets' && !/\.(?:js|mjs|css|svg|png|jpe?g|webp|gif|woff2?|ttf|otf)$/i.test(rel)) {
      violations.push(rel + ' (asset inesperado)');
    } else if (parts.length === 1 && !rootFiles.has(rel)) {
      violations.push(rel + ' (arquivo raiz inesperado)');
    }
    if (textExtensions.has(extname(rel))) {
      const text = await readFile(join(folder, item.name), 'utf8');
      if (sensitiveText.test(text)) violations.push(rel + ' (padrão suspeito de credencial)');
    }
  }
}

await inspect(dist);
if (!checked.includes('index.html')) violations.push('index.html ausente');
for (const doc of approvedDocuments) {
  if (!checked.includes(doc)) violations.push('PDF institucional aprovado ausente: ' + doc);
}
for (const image of approvedIllustrations) {
  if (!checked.includes(image)) violations.push('Imagem ilustrativa ausente: ' + image);
}
if (violations.length) {
  console.error('Artefato Pages reprovado. Arquivos para revisão:', violations);
  process.exitCode = 1;
} else {
  console.log('Artefato Pages aprovado: ' + checked.length + ' arquivos analisados, somente saídas previstas.');
}
