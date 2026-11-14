import { mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = process.env.VITE_BASE_PATH || '/';
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(base)) throw new Error('VITE_BASE_PATH inválido');
const origin = process.env.VITE_SITE_ORIGIN || '';
const researchLines = JSON.parse(await readFile('src/content/research-lines.json', 'utf8'));
const pages = [
  '',
  'instituto',
  'pesquisa',
  'pesquisa/jornada',
  'pesquisa/haquantum',
  ...researchLines.map(({ slug }) => `pesquisa/${slug}`),
  'parceiros',
  'jornada',
  'manifesto',
  'noticias',
  'apresentacao',
  'transparencia',
  'apoie',
  'contato',
  'privacidade',
  'termos',
];
const html = await readFile('dist/index.html', 'utf8');
const version = createHash('sha256').update(html).digest('hex').slice(0, 12);
await writeFile('dist/version.json', JSON.stringify({ version }));
const publicOrigin = origin ? new URL(origin).origin : '';
const metadata = `${
  publicOrigin
    ? `<meta property="og:type" content="website"><meta property="og:title" content="Instituto Foton — Tecnologia através da ciência."><meta property="og:description" content="Ciência, pessoas e possibilidades."><meta property="og:url" content="${publicOrigin}${base}"><meta property="og:image" content="${publicOrigin}${base}assets/PNG/branding/favicon.png">`
    : ''
}<meta name="foton-version" content="${version}">`;
const finalHtml = html.replace('</head>', `${metadata}</head>`);
await writeFile('dist/index.html', finalHtml);
// Rotas públicas reais evitam o 404.html e seu cache no GitHub Pages.
for (const page of pages.filter(Boolean)) {
  await mkdir(`dist/${page}`, { recursive: true });
  await writeFile(`dist/${page}/index.html`, finalHtml);
}
// GitHub Pages responde 404 em rotas desconhecidas. O pequeno documento redireciona
// para index e preserva path/query/hash; index restaura a URL antes do React.
const fallback = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Instituto Foton</title><script>
const base=${JSON.stringify(base)};
const path=location.pathname.startsWith(base)?location.pathname.slice(base.length):'';
const route='/'+path+location.search;
location.replace(base+'?__foton_route='+encodeURIComponent(route)+location.hash);
</script><noscript><a href="${base}">Ir ao início do Instituto Foton</a></noscript></html>`;
await writeFile('dist/404.html', fallback);
await writeFile('dist/.nojekyll', '');
// Sem domínio inventado. Sitemap só existe se a origem real foi configurada.
await writeFile(
  'dist/robots.txt',
  `User-agent: *\nDisallow: ${base}admin\nDisallow: ${base}entrar\nDisallow: ${base}auth/\n${publicOrigin ? `Sitemap: ${publicOrigin}${base}sitemap.xml\n` : ''}`,
);
if (publicOrigin) {
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .filter((p) => p !== 'jornada')
      .map((p) => `<url><loc>${publicOrigin}${base}${p}</loc></url>`)
      .join('')}</urlset>`,
  );
}

// Manter diretorias vazias no Git sem publicar placeholders .gitkeep no Pages.
async function removePlaceholders(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = dir + '/' + entry.name;
    if (entry.isDirectory()) await removePlaceholders(full);
    else if (entry.name === '.gitkeep') await rm(full);
  }
}
await removePlaceholders('dist/assets');
