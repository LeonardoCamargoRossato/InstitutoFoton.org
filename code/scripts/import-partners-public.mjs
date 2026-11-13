import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

// Coleta somente o que está visível no site comercial, em modo público.
// Não usa credenciais, consultas a banco ou endpoints administrativos.
const source = 'https://institutofoton.com.br/';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
let groups;
let page;
try {
  page = await browser.newPage({ locale: 'pt-BR', viewport: { width: 1440, height: 900 } });
  const res = await page.goto(source, { waitUntil: 'domcontentloaded', timeout: 90000 });
  if (!res?.ok()) throw Error('Falha ao abrir o site comercial: HTTP ' + res?.status());
  await page.locator('#parceiros').scrollIntoViewIfNeeded({ timeout: 30000 });
  await page.waitForFunction(() => {
    const section = document.querySelector('#parceiros');
    return section && ([...section.querySelectorAll('h3')]
      .some(h => h.nextElementSibling?.querySelector('[title]')) ||
      section.textContent?.includes('Nenhum parceiro publicado ainda.'));
  }, null, { timeout: 90000 });
  groups = await page.locator('#parceiros').evaluate(section =>
    Array.from(section.querySelectorAll('h3')).map(heading => ({
      tier: heading.textContent?.trim() || '',
      items: Array.from(heading.nextElementSibling?.children || [])
        .filter(element => element instanceof HTMLElement && element.hasAttribute('title'))
        .map(element => ({
          title: element.getAttribute('title')?.trim() || '',
          url: element instanceof HTMLAnchorElement ? element.href : null,
          logo: element.querySelector('img')?.src || null
        }))
    })).filter(group => group.items.length > 0)
  );
  if (!groups.length) throw Error('Sem registros públicos acessíveis no site de origem.');
  const total = groups.reduce((sum,g) => sum + g.items.length, 0);
  if (total < 2) throw Error('Apenas um registro encontrado; revisar a origem antes de importar.');
  console.log('Categorias públicas:', groups.map(g => g.tier + '=' + g.items.length).join('; '));
  await Promise.all([
    'public/assets/PNG/parceiros', 'public/assets/WebP/parceiros',
    'assets/partner-source-originals'
  ].map(folder => mkdir(folder, { recursive: true })));
  const sha = bytes => createHash('sha256').update(bytes).digest('hex');
  const slugOf = name => name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const secureLink = value => {
    if (!value) return null;
    try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) &&
      !url.username && !url.password ? url.href : null; } catch { return null; }
  };
  const records = [], audit = [], slugs = new Set(), repeated = new Map();
  let order = 0, found = 0, missing = 0;
  for (const group of groups) for (const item of group.items) {
    order++;
    if (!item.title || !group.tier) throw Error('Card público sem nome ou categoria');
    const id = sha(Buffer.from(group.tier + '::' + item.title)).slice(0, 20);
    let slug = slugOf(item.title) || 'organizacao';
    if (slugs.has(slug)) slug += '-' + id.slice(0, 8);
    slugs.add(slug);
    const logoUrl = item.logo ? new URL(item.logo, source) : null;
    const record = {
      id, title: item.title, slug, partner_tier: group.tier, display_order: order,
      partner_url: secureLink(item.url), logo_slug: null,
      status: 'publicado', locale: 'pt-br'
    };
    let status = 'Sem logo na origem', sourceHash = null;
    if (logoUrl) {
      try {
        if (!['http:', 'https:'].includes(logoUrl.protocol) ||
          /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[)/i.test(logoUrl.hostname) ||
          logoUrl.username || logoUrl.password ||
          [...logoUrl.searchParams.keys()].some(key => /token|secret|signature|apikey|jwt/i.test(key)))
          throw Error('Endereço de mídia não público');
        const response = await page.request.get(logoUrl.href, {
          timeout: 30000, headers: { Referer: source }
        });
        if (!response.ok()) throw Error('HTTP ' + response.status());
        const bytes = await response.body();
        if (bytes.length < 90 || bytes.length > 8_000_000)
          throw Error('Mídia vazia ou acima de 8 MB');
        const meta = await sharp(bytes, { limitInputPixels: 40_000_000 }).metadata();
        if (!meta.width || !meta.height) throw Error('Imagem inválida');
        sourceHash = sha(bytes);
        let canonical = repeated.get(sourceHash);
        if (!canonical) {
          canonical = slug;
          const extension = meta.format === 'jpeg' ? 'jpg' :
            ['png','webp','svg','gif','avif'].includes(meta.format) ? meta.format : 'bin';
          await writeFile(join('assets/partner-source-originals', canonical + '.' + extension), bytes);
          const pipeline = () => sharp(bytes, { limitInputPixels: 40_000_000 })
            .rotate().resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true });
          await pipeline().png({ compressionLevel: 9 })
            .toFile(join('public/assets/PNG/parceiros', canonical + '.png'));
          await pipeline().webp({ quality: 88, effort: 6 })
            .toFile(join('public/assets/WebP/parceiros', canonical + '.webp'));
          repeated.set(sourceHash, canonical);
        }
        record.logo_slug = canonical;
        found++;
        status = 'Logo local PNG/WebP';
      } catch (error) {
        missing++;
        status = 'Mídia indisponível: ' + String(error.message).slice(0, 100);
      }
    }
    records.push(record);
    audit.push({
      position: order, category: group.tier, title: item.title,
      partner_url: record.partner_url,
      logo_original: logoUrl ? logoUrl.origin + logoUrl.pathname : null,
      logo_sha256: sourceHash,
      png: record.logo_slug ? 'assets/PNG/parceiros/' + record.logo_slug + '.png' : null,
      webp: record.logo_slug ? 'assets/WebP/parceiros/' + record.logo_slug + '.webp' : null,
      status, source
    });
  }
  await writeFile('src/content/partners.json', JSON.stringify(records, null, 2) + '\n');
  await writeFile('assets/partners-source-inventory.json', JSON.stringify({
    source, categories: groups.map(g => ({ name: g.tier, count: g.items.length })),
    count: records.length, logos_available: found, logos_missing: missing, entries: audit
  }, null, 2) + '\n');
  console.log('Parcerias recuperadas:', records.length, 'logos:', found, 'pendentes:', missing);
  for (const group of groups) console.log(group.tier + ': ' + group.items.map(i => i.title).join('; '));
} finally { await browser.close(); }
