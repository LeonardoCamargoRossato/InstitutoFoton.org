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

test('home e Instituto apresentam mídia editorial sem disparar toda a galeria', async ({ page }) => {
  let visitRequests = 0;
  page.on('request', (request) => {
    if (request.url().includes('/img-visitas-tecnicas/visita-')) visitRequests++;
  });
  await page.goto('./');
  await expect(page.locator('.home-hero .foton-photo')).toBeVisible();
  await expect(page.locator('.home-hero .foton-photo')).toHaveAttribute('data-media-kind', 'ai-illustration');
  const hero = page.locator('[data-asset-id="home-hero-community"] img');
  await expect(hero).toHaveAttribute('src', /images\/illustrative\/home-hero-community\.avif$/);
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
    expect(await photo.evaluate((img) => (img as HTMLImageElement).currentSrc)).toMatch(/-mobile\.avif$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});
