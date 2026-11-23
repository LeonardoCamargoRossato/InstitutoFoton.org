import { expect, test } from '@playwright/test';

test('Valores: animação de entrada permanece, mas o hover não altera cor, sombra ou escala', async ({ page }) => {
  await page.goto('./instituto');
  await expect(page.locator('#valores')).toBeVisible();
  const values = page.locator('.values-keywords .value-keyword');
  await expect(values).toHaveCount(7);
  const first = values.first();
  await first.scrollIntoViewIfNeeded();
  await expect(first).toBeVisible();
  await expect(first).toHaveClass(/reveal-item/);
  await expect(first).toHaveClass(/is-revealed/);
  await expect(first).toHaveCSS('cursor', 'auto');
  // A transição de entrada termina antes de comparar estilos de hover.
  await expect.poll(async () => first.evaluate((node) => getComputedStyle(node).transform)).toBe('none');
  const before = await first.evaluate((node) => {
    const style = getComputedStyle(node);
    return { background: style.backgroundImage, shadow: style.boxShadow, transform: style.transform };
  });
  await first.hover();
  await page.waitForTimeout(350);
  const after = await first.evaluate((node) => {
    const style = getComputedStyle(node);
    return { background: style.backgroundImage, shadow: style.boxShadow, transform: style.transform };
  });
  expect(after).toEqual(before);
});

test('Missão, Visão, Propósito e três frentes não fingem clique no hover', async ({ page }) => {
  await page.goto('./instituto');
  const cards = page.locator('.institute-purpose-card, .section > .container > .three-grid > .info-card');
  await expect(cards).toHaveCount(6);
  for (const card of await cards.all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveAttribute('data-card-hover', 'none');
    await expect(card).toHaveCSS('cursor', 'default');
    await card.hover();
    await expect(card).toHaveCSS('transform', 'none');
  }
});
