import { expect, test } from '@playwright/test';

const stories = [
  {
    slug: 'foton-softsul-cooperacao-tecnologias-quanticas',
    name: 'SOFTSUL',
    original: 'AcordoFotonSoftsul.png',
    preview: 'AcordoFotonSoftsul.webp',
    photos: 17,
  },
  {
    slug: 'foton-assespro-rs-termo-cooperacao',
    name: 'Assespro-RS',
    original: 'ParceriaFotonAssesproRS.jpg',
    preview: 'ParceriaFotonAssesproRS.webp',
    photos: 1,
  },
  {
    slug: 'seminario-cubotech-direito-computacao-quantica',
    name: 'CUBOTECH',
    original: 'SeminarioCubotechDireitoComputacaoQuantica.png',
    preview: 'SeminarioCubotechDireitoComputacaoQuantica.webp',
    photos: 1,
  },
];

test('as três reportagens estão em Notícias e cada card abre sua página', async ({ page }) => {
  await page.goto('./noticias');
  for (const story of stories) {
    const card = page.locator('.publication-card').filter({ hasText: story.name });
    await expect(card).toHaveCount(1);
    await expect(card.locator('img')).toHaveAttribute('src', new RegExp(story.preview + '$'));
    await card.locator('img').click();
    await expect(page).toHaveURL(new RegExp('/noticias/' + story.slug + '$'));
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('.news-media-photo')).toHaveCount(story.photos);
    await page.goto('./noticias');
  }
});

test('imagens de notícias usam WebP inicialmente e originais apenas na ampliação', async ({
  page,
}) => {
  for (const story of stories) {
    const originalRequests: string[] = [];
    const onRequest = (request: { url: () => string }) => {
      if (request.url().includes('/assets/noticias/') && request.url().endsWith(story.original)) {
        originalRequests.push(request.url());
      }
    };
    page.on('request', onRequest);
    await page.goto('./noticias/' + story.slug);
    const image = page.locator('.news-media-photo').first();
    await expect(image).toHaveAttribute('src', new RegExp(story.preview + '$'));
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
    expect(originalRequests).toHaveLength(0);
    await image.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect.poll(() => originalRequests.length).toBeGreaterThan(0);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    page.off('request', onRequest);
  }
});

test('notícias mantêm largura de tela em celular, tablet e desktop', async ({ page }) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 840 });
    await page.goto('./noticias/seminario-cubotech-direito-computacao-quantica');
    const difference = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(difference).toBeLessThanOrEqual(1);
  }
});
