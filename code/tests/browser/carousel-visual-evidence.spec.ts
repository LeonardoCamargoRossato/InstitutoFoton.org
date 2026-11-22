import { expect, test } from '@playwright/test';

const routes = [
  {
    key: 'noticias',
    url: './noticias/lancamento-lacq-pucrs-instituto-foton',
    selector: '.news-carousel',
  },
  { key: 'fundacao', url: './noticias/fundacao-instituto-foton', selector: '.foundation-carousel' },
  { key: 'haquantum', url: './pesquisa/haquantum', selector: '.haquantum-gallery .base-carousel' },
  { key: 'visitas', url: './manifesto#visitas', selector: '.visits-carousel' },
];

test('registros visuais das quatro experiências em desktop e mobile', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route.url);
      const gallery = page.locator(route.selector).first();
      await expect(gallery).toBeVisible();
      await gallery.scrollIntoViewIfNeeded();
      await page.screenshot({ path: `test-results/carousel-${route.key}-${width}.png` });
    }
  }
});

test('hover aplica zoom discreto ao WebP mantendo o recorte dentro das bordas', async ({
  page,
}) => {
  await page.goto('./noticias/lancamento-lacq-pucrs-instituto-foton');
  const button = page.locator('.base-carousel-primary').first();
  const image = button.locator('img');
  await button.scrollIntoViewIfNeeded();
  await button.hover();
  await expect
    .poll(async () => {
      const transform = await image.evaluate((element) => getComputedStyle(element).transform);
      return Number(transform.match(/matrix\(([^,]+)/)?.[1] ?? 1);
    })
    .toBeGreaterThan(1.01);
  await expect(button).toHaveCSS('overflow', 'hidden');
});
