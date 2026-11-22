import { expect, test } from '@playwright/test';

test('Instituto: cards informativos sem falso clique e perfis com modal acessível', async ({
  page,
}) => {
  await page.goto('./instituto');
  const purpose = page.locator('.institute-purpose .foton-card--informative');
  await expect(purpose).toHaveCount(3);
  await expect(purpose.first()).toHaveAttribute('data-card-hover', 'none');
  await expect(purpose.first()).toHaveCSS('cursor', 'default');
  const info = page.locator('.info-card.foton-card--informative');
  await expect(info).toHaveCount(3);
  const profile = page.locator('.team-person.foton-card--interactive').first();
  await expect(profile).toBeVisible();
  await profile.focus();
  await expect(profile).toBeFocused();
  await profile.click();
  const dialog = page.getByRole('dialog', { name: undefined }).first();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(profile).toBeFocused();
});

test('Pesquisa: ActionCards preservam links, títulos e foco', async ({ page }) => {
  await page.goto('./pesquisa');
  const cards = page.locator('.research-areas a.research-card.foton-card--interactive');
  await expect(cards.first()).toBeVisible();
  await expect(cards.first()).toHaveAttribute('href', /\/pesquisa\//);
  await cards.first().focus();
  await expect(cards.first()).toBeFocused();
  await expect(cards.first()).toHaveCSS('cursor', 'pointer');
});

test('Notícias: ImageCard mantém WebP e amplia PNG sem alterar carrossel', async ({ page }) => {
  await page.goto('./noticias/uniso-quantum-day-entrega-projeto-leonti');
  const image = page.locator('.news-highlight-image-button.foton-card--interactive').first();
  await expect(image).toBeVisible();
  await expect(image.locator('img')).toHaveAttribute('src', /\.webp$/);
  await image.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('src', /\.png$/);
  await page.getByRole('button', { name: 'Fechar galeria' }).click();
  await expect(image).toBeFocused();
});

test('Regressão: parceiros mantêm semântica e imagens originais', async ({ page }) => {
  await page.goto('./parceiros');
  await expect(page.locator('.partner-card')).toHaveCount(31);
  await expect(page.locator('.partner-card img').first()).toHaveAttribute('src', /\.svg$/);
});

test('Layout: cards em cinco breakpoints sem transbordamento horizontal', async ({ page }) => {
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['./instituto', './pesquisa']) {
      await page.goto(path);
      await expect(page.locator('.foton-card').first()).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
      ).toBeLessThanOrEqual(1);
    }
  }
});

test('Redução de movimento: card não desloca nem anima', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./pesquisa');
  const card = page.locator('.research-card.foton-card--interactive').first();
  await card.hover();
  await expect(card).toHaveCSS('transform', 'none');
  await expect(card).toHaveCSS('transition-duration', '0s');
});
