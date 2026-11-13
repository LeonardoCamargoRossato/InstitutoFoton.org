import { expect, test } from '@playwright/test';
import sharp from 'sharp';

test('Parceiros: 31 SVGs originais, sem animação de entrada, preenchimento e estabilidade', async ({
  page,
}) => {
  test.setTimeout(90_000);
  const failedAssets: string[] = [];
  page.on('requestfailed', (request) => {
    if (request.url().includes('/assets-svg/')) failedAssets.push(request.url());
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
    await expect(image).toHaveAttribute('src', /\/assets-svg\/Logo[A-Za-z0-9]+\.svg$/);
    await expect(image).toHaveAttribute('loading', 'eager');
    await expect
      .poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth), {
        timeout: 15000,
      })
      .toBeGreaterThan(0);
  }
  expect(failedAssets).toEqual([]);
  await expect(page.locator('.partner-card-dark')).toHaveCount(0);
  await expect(page.locator('.partner-card-contrast')).toHaveCount(2);
  for (const title of ['UnisoTech', 'RC']) {
    const card = page.locator(`.partner-card[title="${title}"]`);
    await expect(card).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(card.locator('img')).toHaveCSS('filter', 'invert(1)');
  }
  await page.locator('.partner-card[title="UnisoTech"]').screenshot({
    path: 'test-results/partner-unisotech-legivel.png',
    animations: 'disabled',
  });
  await page.locator('.partner-card[title="RC"]').screenshot({
    path: 'test-results/partner-rc-legivel.png',
    animations: 'disabled',
  });
  for (const card of await cards.all()) {
    await expect(card).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  }
  // Teste de pixels da captura real do Chromium (não do canvas SVG):
  // comprova que o desenho existe, não apenas que o arquivo/carregamento existe.
  const blankLogos: string[] = [];
  let ihrArtworkWidth = 0;
  for (const card of await cards.all()) {
    const title = await card.getAttribute('title');
    const logoImage = card.locator('img');
    const screenshot = await logoImage.screenshot({ animations: 'disabled' });
    const { data, info } = await sharp(screenshot)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let left = info.width;
    let right = -1;
    let painted = 0;
    for (let y = 1; y < info.height - 1; y++) {
      for (let x = 1; x < info.width - 1; x++) {
        const offset = (y * info.width + x) * info.channels;
        const visiblyColored =
          data[offset + 3] > 70 && Math.min(data[offset], data[offset + 1], data[offset + 2]) < 220;
        if (!visiblyColored) continue;
        painted++;
        left = Math.min(left, x);
        right = Math.max(right, x);
      }
    }
    if (painted < 12) blankLogos.push(title || 'sem nome');
    if (title === 'IHR' && right >= left) {
      ihrArtworkWidth = (right - left + 1) / info.width;
    }
  }
  expect(blankLogos, 'Nenhuma das 31 logos deve parecer vazia na captura real').toEqual([]);
  expect(ihrArtworkWidth, 'IHR não pode ficar visualmente vazio').toBeGreaterThan(0.08);

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
  expect(desktopStyle.padding).toBeLessThanOrEqual(3);
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
  expect(mobilePadding).toBeLessThanOrEqual(3);
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
