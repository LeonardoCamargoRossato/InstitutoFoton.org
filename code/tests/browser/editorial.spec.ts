import { test, expect } from '@playwright/test';

test('transparência apresenta cinco categorias sem inventar documentos', async ({ page }) => {
  await page.goto('./transparencia');
  for (const title of [
    'Estatuto social',
    'Atas das assembleias',
    'Relatórios anuais',
    'Relatórios periódicos de atividades',
    'Documentos contábeis e demonstrações financeiras',
  ]) {
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
  }
  const presentation = page.getByRole('article').filter({ hasText: 'Apresentação institucional — setembro de 2026' });
  await expect(presentation.getByRole('link', { name: /Visualizar/ })).toHaveAttribute('href', /documents\/apresentacao-institucional-2026-09-10\.pdf$/);
  await expect(presentation.getByRole('button', { name: /Baixar/ })).toBeVisible();
});


test('Visita Técnica 03 está em WebP e todas as fotografias abrem com zoom', async ({ page }) => {
  await page.goto('./');
  const hero = page.locator('[data-asset-id="home-hero-community"] img');
  await expect(hero).toHaveAttribute('src', /assets\/WebP\/home\/home-hero-community\.webp$/);
  const spotlight = page.locator('.technical-visit-photo img');
  await spotlight.scrollIntoViewIfNeeded();
  await expect(spotlight).toHaveAttribute('src', /assets\/WebP\/visitas-tecnicas\/visita-03\.webp$/);
  await expect.poll(() => spotlight.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await spotlight.click();
  const dialog = page.getByRole('dialog', { name: /Visita Técnica 03/ });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Ampliar imagem' }).click();
  await expect(dialog.locator('.foton-zoom-level')).toHaveText('150%');
  await dialog.getByRole('button', { name: 'Ajustar imagem à tela' }).click();
  await expect(dialog.locator('.foton-zoom-level')).toHaveText('100%');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await hero.click();
  await expect(page.getByRole('dialog', { name: /Composição fictícia/ })).toBeVisible();
});

test('Manifesto utiliza miniaturas WebP e mantém galeria navegável com zoom', async ({ page }) => {
  await page.goto('./manifesto#visitas');
  const first = page.locator('.gallery-track img').first();
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveAttribute('src', /assets\/WebP\/visitas-tecnicas\/visita-01\.webp$/);
  await expect.poll(() => first.evaluate(img => (img as HTMLImageElement).naturalWidth), {
    timeout: 15000,
  }).toBeGreaterThan(0);
  const overview=page.locator('.manifesto-image img').first();
  await overview.scrollIntoViewIfNeeded();
  await expect.poll(() => overview.evaluate(img => (img as HTMLImageElement).naturalWidth), {
    timeout: 15000,
  }).toBeGreaterThan(0);
  await page.locator('.gallery-track > button').first().click();
  const modal = page.getByRole('dialog', { name: 'Visita técnica 01' });
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: 'Próxima imagem' }).click();
  await expect(page.getByRole('dialog', { name: 'Visita técnica 02' })).toBeVisible();
  await page.getByRole('button', { name: 'Ampliar imagem' }).click();
  await expect(page.locator('.foton-zoom-level')).toHaveText('150%');
});

test('home e Instituto apresentam mídia editorial sem disparar toda a galeria', async ({ page }) => {
  let visitRequests = 0;
  page.on('request', (request) => {
    if (request.url().includes('/img-visitas-tecnicas/visita-')) visitRequests++;
  });
  await page.goto('./');
  await expect(page.locator('.home-hero .foton-photo')).toBeVisible();
  await expect(page.locator('.home-hero .foton-photo')).toHaveAttribute('data-media-kind', 'ai-illustration');
  const hero = page.locator('[data-asset-id="home-hero-community"] img');
  await expect(hero).toHaveAttribute('src', /assets\/WebP\/home\/home-hero-community\.webp$/);
  await expect.poll(() => hero.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(1000);
  await expect(page.getByRole('link', { name: 'Consultar transparência' })).toBeVisible();
  await expect(page.locator('.human-mosaic-tile')).toHaveCount(6);
  await page.goto('./instituto');
  await expect(page.locator('.institute-people .foton-photo')).toBeVisible();
  const people = page.locator('[data-asset-id="instituto-community"] img');
  await people.scrollIntoViewIfNeeded();
  await expect.poll(() => people.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.goto('./transparencia');
  const transparencyImage = page.locator('.transparency-photo img');
  await transparencyImage.scrollIntoViewIfNeeded();
  await expect.poll(() => transparencyImage.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(visitRequests).toBeLessThan(12);
});

test('mobile não apresenta deslocamento horizontal nas seções alteradas', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['./', './instituto', './transparencia']) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('transparência oferece download da apresentação pública estática', async ({ page }) => {
  await page.goto('./transparencia');
  const presentation = page.getByRole('article').filter({ hasText: 'Apresentação institucional — setembro de 2026' });
  const download = page.waitForEvent('download');
  await presentation.getByRole('button', { name: /Baixar/ }).click();
  expect((await download).suggestedFilename()).toContain('apresentacao-institucional');
});


test('Home, Apoie, Jornada e Pesquisa carregam as novas imagens reais do artefato', async ({ page }) => {
  for (const [route, id] of [
    ['./', 'home-hero-community'],
    ['./apoie', 'apoie-hero-scientists'],
    ['./jornada', 'jornada-hero-pathways'],
    ['./pesquisa', 'pesquisa-collaboration'],
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const photo = page.locator('[data-asset-id="' + id + '"] img');
    await photo.scrollIntoViewIfNeeded();
    await expect.poll(() => photo.evaluate((img) => (img as HTMLImageElement).naturalWidth), { timeout: 15000 })
      .toBeGreaterThan(1000);
  }
});

test('mobile utiliza enquadramentos específicos sem perder o título nem os botões', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, id] of [
    ['./', 'home-hero-community'],
    ['./apoie', 'apoie-hero-scientists'],
    ['./jornada', 'jornada-hero-pathways'],
  ] as const) {
    await page.goto(route);
    const photo = page.locator('[data-asset-id="' + id + '"] img').first();
    await photo.scrollIntoViewIfNeeded();
    await expect.poll(() => photo.evaluate((img) => (img as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    expect(await photo.evaluate((img) => (img as HTMLImageElement).currentSrc)).toMatch(/-mobile\.webp$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});


test('o portal público não requisita Supabase em nenhuma rota principal', async ({ page }) => {
  const requests:string[]=[];
  page.on('request',request=>{
    if (/supabase\.co|storage\/v1|auth\/v1/i.test(request.url()))requests.push(request.url());
  });
  for(const path of ['./','./instituto','./pesquisa','./jornada','./manifesto','./noticias',
    './apoie','./transparencia','./apresentacao','./contato','./entrar','./admin/diretoria']) {
    await page.goto(path);
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
    const remote=await page.locator('img[src*="supabase"],img[data-full-image*="supabase"]').count();
    expect(remote).toBe(0);
  }
  expect(requests).toEqual([]);
});
test('o navegador usa WebP local e PNG local ao ampliar, sem redes externas', async ({ page }) => {
  await page.goto('./');
  const hero=page.locator('[data-asset-id="home-hero-community"] img');
  await expect(hero).toHaveAttribute('src',/assets\/WebP\/home\/home-hero-community\.webp$/);
  await expect(hero).toHaveAttribute('data-full-image',/assets\/PNG\/home\/home-hero-community\.png$/);
  await hero.click();
  const dialog=page.getByRole('dialog',{name:/Composição fictícia/});
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('src',/assets\/PNG\/home\/home-hero-community\.png$/);
  await page.keyboard.press('Escape');
  const visit=page.locator('.technical-visit-photo img');
  await visit.scrollIntoViewIfNeeded();
  await expect(visit).toHaveAttribute('data-full-image',/assets\/PNG\/visitas-tecnicas\/visita-03\.png$/);
});
