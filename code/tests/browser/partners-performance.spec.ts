import { expect, test } from '@playwright/test';

test('Parceiros: 31 SVGs leves, sem animação de entrada, preenchimento e estabilidade', async ({
  page,
}) => {
  const failedAssets: string[] = [];
  page.on('requestfailed', (request) => {
    if (request.url().includes('/display-svg/')) failedAssets.push(request.url());
  });

  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto('./parceiros');
  const section = page.locator('.partner-ecosystem-page');
  await expect(section).toBeVisible();
  await expect(section).not.toHaveClass(/reveal-section|reveal-depth|reveal-rise/);
  const cards = page.locator('.partner-card');
  await expect(cards).toHaveCount(31);
  const images = cards.locator('img');
  await expect(images).toHaveCount(31);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute('src', /\/display-svg\/Logo[A-Za-z0-9]+\.svg$/);
    await expect(image).toHaveAttribute('loading', 'eager');
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth), {
        timeout: 15000,
      })
      .toBeGreaterThan(0);
  }
  expect(failedAssets).toEqual([]);

  const desktopStyle = await cards.first().evaluate((card) => {
    const style = getComputedStyle(card);
    const img = card.querySelector('img')!;
    const imageStyle = getComputedStyle(img);
    const outer = card.getBoundingClientRect();
    const inner = img.getBoundingClientRect();
    return {
      padding: Number.parseFloat(style.paddingLeft),
      imageWidthFraction: inner.width / outer.width,
      objectFit: imageStyle.objectFit,
      overflow: style.overflow,
    };
  });
  expect(desktopStyle.padding).toBeLessThanOrEqual(7);
  expect(desktopStyle.imageWidthFraction).toBeGreaterThan(0.85);
  expect(desktopStyle.objectFit).toBe('contain');
  expect(desktopStyle.overflow).toBe('hidden');
  await page.screenshot({
    path: 'test-results/partner-hotfix-desktop.png',
    fullPage: true,
    animations: 'disabled',
  });

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(mobileOverflow).toBeLessThanOrEqual(1);
  const mobilePadding = await cards
    .first()
    .evaluate((el) => Number.parseFloat(getComputedStyle(el).paddingLeft));
  expect(mobilePadding).toBeLessThanOrEqual(6);
  await page.screenshot({
    path: 'test-results/partner-hotfix-mobile.png',
    fullPage: true,
    animations: 'disabled',
  });
});

test('Home não baixa antecipadamente as 31 logos do ecossistema', async ({ page }) => {
  await page.goto('./');
  const images = page.locator('#parceiros .partner-card img');
  await expect(images).toHaveCount(31);
  await expect(images.first()).toHaveAttribute('loading', 'lazy');
});
