import { expect, test } from '@playwright/test';

test('Manifesto hero mantém F de vidro, Brasil e título acessível', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./manifesto');
    const hero = page.locator('.manifesto-hero');
    await expect(hero).toBeVisible();
    await expect(hero.getByRole('heading', { level: 1 })).toContainText('Quântico Nacional');
    await expect(hero.locator('.manifesto-hero-brazil path').first()).toBeAttached();
    const glass = hero.locator('img.manifesto-hero-glass-f');
    await expect(glass).toHaveAttribute(
      'src',
      /05 - Manifesto\/Imagens do Manifesto\/PNG\/HeroManifestoFGlass\.png$/,
    );
    await expect(hero.locator('picture > source')).toHaveAttribute(
      'srcset',
      /05 - Manifesto\/Imagens do Manifesto\/WebP\/HeroManifestoFGlass\.webp$/,
    );
    await expect
      .poll(() => glass.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect(page.locator('#contribuir-manifesto')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.getByRole('link', { name: 'Venha contribuir' }).click();
  await expect(page).toHaveURL(/#contribuir-manifesto$/);
  expect(errors).toEqual([]);
});

test('Manifesto hero respeita preferência por movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./manifesto');
  const img = page.locator('.manifesto-hero-glass-f');
  await expect(img).toBeVisible();
  const animation = await img.evaluate((node) => getComputedStyle(node).animationName);
  expect(animation).toBe('none');
});
