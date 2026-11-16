import { test, expect } from '@playwright/test';

const formUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeYr2fuajfrVqG4fnEH4Gitja26eao_7hf7ybqRWfB98pgNgg/viewform';
const linkName = 'Responder ao questionário do Manifesto Quântico Nacional (abre em nova aba)';

test('Manifesto mostra convite e questionário no início e no final', async ({ page }) => {
  const unexpectedRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('docs.google.com/forms')) unexpectedRequests.push(request.url());
  });
  await page.goto('./manifesto');
  const sections = page.locator('.manifesto-contribution');
  await expect(sections).toHaveCount(2);
  await expect(page.locator('#contribua-manifesto')).toBeAttached();
  await expect(page.locator('#contribua-manifesto-final')).toBeAttached();
  await expect(sections.first().getByRole('heading')).toContainText('Venha contribuir');
  await expect(sections.last().getByRole('heading')).toContainText('Sua voz');
  await expect(sections.first()).toContainText('Cerca de 5 a 10 minutos (estimativa)');
  const links = page.getByRole('link', { name: linkName });
  await expect(links).toHaveCount(2);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', formUrl);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
  expect(unexpectedRequests).toEqual([]);
  await expect(page.locator('.odq-card')).toHaveCount(11);
});

test('Cartão responde ao hover e permanece acessível no celular', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./manifesto');
  const link = page.getByRole('link', { name: linkName }).first();
  await link.scrollIntoViewIfNeeded();
  const front = link.locator('.manifesto-form-preview-front');
  const before = await front.evaluate((el) => getComputedStyle(el).transform);
  await link.hover();
  await expect.poll(() => front.evaluate((el) => getComputedStyle(el).transform)).not.toBe(before);
  await page.locator('#contribua-manifesto').screenshot({
    path: 'test-results/manifesto-convite-desktop.png',
    animations: 'disabled',
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('link', { name: linkName })).toHaveCount(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#contribua-manifesto-final').screenshot({
    path: 'test-results/manifesto-convite-mobile.png',
    animations: 'disabled',
  });
});

test('Movimento reduzido desativa transição do cartão', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./manifesto');
  await expect(page.locator('.manifesto-form-preview-front').first()).toHaveCSS(
    'transition-duration',
    '0s',
  );
});
