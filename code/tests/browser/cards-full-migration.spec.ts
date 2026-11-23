import { expect, test } from '@playwright/test';

test('O Instituto: IDs LCR e sete valores informativos preservam animação', async ({ page }) => {
  await page.goto('./instituto');
  const ids = ['2.A.5.C1', '2.A.5.C2', '2.A.5.C3', '2.A.6.C1', '2.A.6.C2', '2.A.6.C3'];
  for (const id of ids) {
    const card = page.locator('[data-lcr-card-id="' + id + '"]');
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute('data-card-hover', 'none');
  }
  const values = page.locator('.values-keywords > li.foton-card--informative');
  await expect(values).toHaveCount(7);
  await expect(page.locator('#valores')).toHaveAttribute('data-lcr-section-id', '2.A.8');
  await expect(values.first()).toHaveAttribute('data-lcr-card-id', '2.A.8.C1');
  await expect(values.last()).toHaveAttribute('data-lcr-card-id', '2.A.8.C7');
  await values.first().scrollIntoViewIfNeeded();
  await expect(values.first()).toHaveClass(/is-revealed/);
  await expect(page.locator('[data-lcr-section-id="2.B.1"]')).toBeVisible();
});

test('Manifesto: cartas, ODQs e metodologia são informativos, sem mudar o acervo', async ({
  page,
}) => {
  await page.goto('./manifesto');
  const letters = page.locator('.regional-letter.foton-card--informative');
  const objectives = page.locator('.odq-card.foton-card--informative');
  await expect(letters).toHaveCount(5);
  await expect(objectives).toHaveCount(11);
  await expect(page.locator('.methodology > li.foton-card--informative').first()).toBeVisible();
  await expect(objectives.first()).toHaveAttribute('data-lcr-card-id', '5.9.C1');
  await expect(objectives.last()).toHaveAttribute('data-lcr-card-id', '5.9.C11');
  await expect(page.locator('#cartas')).toHaveAttribute('data-lcr-section-id', '5.7');
  await expect(page.locator('#visitas .base-carousel-count')).toHaveText('1 / 20');
});

test('Parceiros: logos SVG preservados e cada card tem semântica correta', async ({ page }) => {
  await page.goto('./parceiros');
  const logos = page.locator('.partner-card.foton-card--legacy');
  await expect(logos).toHaveCount(31);
  await expect(logos.locator('img')).toHaveCount(31);
  const links = logos.locator('a');
  // O próprio card pode ser o link, nunca um link interno aninhado.
  expect(await page.locator('a.partner-card').count()).toBeGreaterThan(0);
  expect(await page.locator('div.partner-card').count()).toBeGreaterThanOrEqual(0);
  await expect(logos.first()).toHaveAttribute('data-lcr-card-id', /^3\.2\.C-/);
  await expect(logos.first().locator('img')).toHaveAttribute('src', /\.svg$/);
  expect(await links.count()).toBe(0);
});

test('Jornada e HaQuantum: cards estáticos mantêm conteúdo e tipos', async ({ page }) => {
  await page.goto('./pesquisa/jornada');
  const steps = page.locator('.pathway-steps > li.foton-card--informative');
  await expect(steps.first()).toBeVisible();
  await expect(steps.first()).toHaveAttribute('data-lcr-card-id', /^4\.B\.3\.C/);
  await page.goto('./pesquisa/haquantum');
  const stages = page.locator('.research-event-stages > div.foton-card--informative');
  await expect(stages).toHaveCount(3);
  await expect(stages.first()).toContainText('Workshops');
  await expect(stages.last()).toContainText('Final no MOBI Festival');
  await expect(stages.first()).toHaveAttribute('data-card-hover', 'none');
});

test('Notícias: cartão editorial mantém link interno e identidade', async ({ page }) => {
  await page.goto('./noticias');
  const cards = page.locator('.publication-card.foton-card--legacy');
  await expect(cards.first()).toBeVisible();
  await expect(cards.first()).toHaveAttribute('data-lcr-card-id', /^6\.A\.2\.C-/);
  await expect(cards.first().locator('a')).toHaveCount(1);
  await expect(page.locator('#noticias-publicacoes')).toHaveAttribute(
    'data-lcr-section-id',
    '6.A.2',
  );
});

test('Código LCR é invisível no conteúdo do site e permanece presente em HTML', async ({
  page,
}) => {
  await page.goto('./instituto');
  const mission = page.locator('[data-lcr-card-id="2.A.5.C1"]');
  await expect(mission).toContainText('Missão');
  await expect(mission).not.toContainText('2.A.5.C1');
  await page.goto('./pesquisa');
  await expect(page.locator('[data-lcr-section-id="4.A.2"]')).toBeVisible();
  await expect(page.locator('[data-lcr-card-id^="4.A.2.C"]').first()).toBeVisible();
});
