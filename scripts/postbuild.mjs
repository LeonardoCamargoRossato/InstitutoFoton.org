import { readFile, writeFile } from 'node:fs/promises';

const base = process.env.VITE_BASE_PATH || '/';
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(base)) throw new Error('VITE_BASE_PATH inválido');
const origin = process.env.VITE_SITE_ORIGIN || '';
const pages = [
  '',
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
];
const html = await readFile('dist/index.html', 'utf8');
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
const publicOrigin = origin ? new URL(origin).origin : '';
await writeFile(
  'dist/robots.txt',
  `User-agent: *\nDisallow: ${base}admin\nDisallow: ${base}entrar\nDisallow: ${base}auth/\n${publicOrigin ? `Sitemap: ${publicOrigin}${base}sitemap.xml\n` : ''}`,
);
if (publicOrigin) {
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${publicOrigin}${base}${p}</loc></url>`).join('')}</urlset>`,
  );
  await writeFile(
    'dist/index.html',
    html.replace(
      '</head>',
      `<meta property="og:type" content="website"><meta property="og:title" content="Instituto Foton — Tecnologia através da ciência."><meta property="og:description" content="Ciência, pessoas e possibilidades."><meta property="og:url" content="${publicOrigin}${base}"><meta property="og:image" content="${publicOrigin}${base}favicon.png"></head>`,
    ),
  );
}
