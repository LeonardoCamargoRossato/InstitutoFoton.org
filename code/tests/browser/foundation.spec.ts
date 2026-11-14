import { expect, test } from '@playwright/test';

const articleRoute = './noticias/fundacao-instituto-foton';
const caption =
  'Da esquerda para a direita: Natan Feijó Tristão — Conselho Fiscal; Cláudio Dias — Secretário-Geral; Leonardo Rossato — Presidente; Gabriel Albuquerque — Presidente da LACQ Feynman; Marco Aurélio — Vice-Presidente; Danielli Sanderi — Tesoureira; Rosângela Maraschin — Conselho Fiscal; Luiz Brito — Conselho Fiscal.';

test('fundação aparece no Instituto e abre a única reportagem canônica', async ({ page }) => {
  await page.goto('./instituto');
  const teaser = page.locator('#fundacao');
  await expect(teaser.getByRole('heading', { name: 'O dia em que nasceu o Instituto Foton' })).toBeVisible();
  await expect(teaser).toContainText('30 de janeiro de 2025 · Porto Alegre, RS');
  await expect(teaser.locator('img')).toHaveAttribute('src', /\/assets\/WebP\/instituto\/fundacao\/Img-Fundacao-Foton-01\.webp$/);
  await teaser.getByRole('link', { name: 'Saiba mais sobre nossa fundação' }).click();
  await expect(page).toHaveURL(/\/noticias\/fundacao-instituto-foton$/);
  await expect(page.locator('.markdown')).toContainText('NAU Live Spaces');
  await expect(page.locator('.foundation-gallery')).toBeVisible();
});

test('a notícia consta na listagem e o card navega sem abrir o visualizador', async ({ page }) => {
  await page.goto('./noticias');
  const card = page.locator('.publication-card').filter({ hasText: 'O dia em que nasceu o Instituto Foton' });
  await expect(card).toHaveCount(1);
  await expect(card.locator('img')).toHaveAttribute('src', /Img-Fundacao-Foton-01\.webp$/);
  await card.locator('img').click();
  await expect(page).toHaveURL(/\/noticias\/fundacao-instituto-foton$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('galeria mantém nove registros na ordem, legenda histórica e PNG somente ao ampliar', async ({ page }) => {
  const pngRequests: string[] = [];
  page.on('request', (request) => {
    if (/\/assets\/PNG\/instituto\/fundacao\/Img-Fundacao-Foton-\d\d\.png/.test(request.url())) {
      pngRequests.push(request.url());
    }
  });
  await page.goto(articleRoute);
  const gallery = page.locator('.foundation-carousel');
  await expect(gallery).toBeVisible();
  await expect(gallery.locator('.foundation-carousel-position')).toHaveText('1 / 9');
  for (let index = 1; index <= 9; index++) {
    await expect(gallery.locator('.foundation-stage-image img')).toHaveAttribute(
      'src',
      new RegExp(`Img-Fundacao-Foton-${String(index).padStart(2, '0')}\\.webp$`),
    );
    if (index < 9) await gallery.getByRole('button', { name: 'Próxima imagem' }).click();
  }
  await expect(gallery.locator('.foundation-carousel-position')).toHaveText('9 / 9');
  expect(pngRequests).toHaveLength(0);
  await gallery.getByRole('button', { name: 'Imagem anterior' }).click();
  for (let index = 8; index > 3; index--) {
    await gallery.getByRole('button', { name: 'Imagem anterior' }).click();
  }
  await expect(gallery.locator('.foundation-carousel-position')).toHaveText('3 / 9');
  await expect(gallery.locator('.foundation-carousel-caption')).toHaveText(caption);
  await expect(page.locator('.foundation-historical-note')).toContainText('não integrava a Diretoria estatutária');
  await gallery.getByRole('button', { name: /^Ampliar imagem 3 de 9/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect.poll(() => pngRequests.length).toBe(1);
  await expect(dialog.locator('img')).toHaveAttribute('src', /Img-Fundacao-Foton-03\.png$/);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(gallery.getByRole('button', { name: /^Ampliar imagem 3 de 9/ })).toBeFocused();
});

test('fundação não causa largura excedente em mobile e tablet', async ({ page }) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('./instituto#fundacao');
    const section = page.locator('#fundacao');
    await expect(section).toBeVisible();
    const bounds = await section.boundingBox();
    expect(bounds?.width).toBeLessThanOrEqual(width + 1);
    await page.goto(articleRoute);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});
