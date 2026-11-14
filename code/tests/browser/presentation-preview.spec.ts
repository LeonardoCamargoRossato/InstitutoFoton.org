import { test, expect } from '@playwright/test';

test('Home exibe duas páginas WebP oficiais em composição ampla e clicável', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const failed: string[] = [];
  page.on('requestfailed', (request) => {
    if (request.url().includes('/assets/WebP/apresentacao/')) failed.push(request.url());
  });

  await page.goto('./');
  const section = page.locator('#apresentacao');
  await section.scrollIntoViewIfNeeded();
  await expect(
    section.getByRole('heading', { name: 'Conheça a apresentação do Foton.' }),
  ).toBeVisible();

  const link = section.getByRole('link', {
    name: 'Visualizar o PDF da apresentação institucional do Foton',
  });
  await expect(link).toHaveAttribute('href', /\/apresentacao$/);
  const images = link.locator('img');
  await expect(images).toHaveCount(2);
  await expect(images.nth(0)).toHaveAttribute(
    'src',
    /assets\/WebP\/apresentacao\/apresentacao-foton-pagina-02\.webp$/,
  );
  await expect(images.nth(1)).toHaveAttribute(
    'src',
    /assets\/WebP\/apresentacao\/apresentacao-foton-pagina-01\.webp$/,
  );
  for (const image of await images.all()) {
    await expect
      .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect(image).toBeVisible();
  }
  expect(failed).toEqual([]);

  const distance = await section.evaluate((element) => {
    const copy = element.querySelector('.presentation-feature-copy')!.getBoundingClientRect();
    const media = element.querySelector('.presentation-feature-media')!.getBoundingClientRect();
    const stack = element.querySelector('.presentation-preview-stack')!.getBoundingClientRect();
    return {
      gap: media.left - copy.right,
      mediaWidth: media.width,
      stackHeight: stack.height,
    };
  });
  expect(distance.gap).toBeGreaterThan(60);
  expect(distance.mediaWidth).toBeGreaterThan(400);
  expect(distance.stackHeight).toBeGreaterThan(290);
  await expect(section.getByText(/Clique na imagem para acessar o PDF/)).toBeVisible();

  await link.hover();
  const front = link.locator('.presentation-preview-front');
  await expect(front).toHaveCSS('transform', /matrix/);
  await section.screenshot({
    path: 'test-results/home-apresentacao-desktop.png',
    animations: 'disabled',
  });

  await link.click();
  await expect(page).toHaveURL(/\/apresentacao\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Conheça o Foton');
});

test('Composição permanece visível, acessível e sem overflow em celular', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const section = page.locator('#apresentacao');
  const link = section.getByRole('link', {
    name: 'Visualizar o PDF da apresentação institucional do Foton',
  });
  await link.scrollIntoViewIfNeeded();
  await expect(link).toBeVisible();
  await expect(link.locator('img')).toHaveCount(2);
  await expect(link.locator('.presentation-preview-front')).toBeVisible();
  await expect(link.locator('.presentation-preview-back')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await section.screenshot({
    path: 'test-results/home-apresentacao-mobile.png',
    animations: 'disabled',
  });
});

test('Sem animação de hover para quem prefere movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const link = page.locator('.presentation-preview-link');
  await link.scrollIntoViewIfNeeded();
  await expect(link.locator('.presentation-preview-front')).toHaveCSS('transition-duration', '0s');
});
