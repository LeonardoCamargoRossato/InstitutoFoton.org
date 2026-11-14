import { expect, test } from '@playwright/test';

test('texto institucional permanece atemporal nas principais páginas', async ({ page }) => {
  for (const route of ['./', './instituto', './pesquisa', './jornada', './apresentacao']) {
    await page.goto(route);
    const text = await page.locator('#conteudo').innerText();
    expect(text).not.toMatch(/setembro de 2026|10 de setembro de 2026|conforme a apresentaç[aã]o/i);
  }
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Converse com o Foton.' })).toBeVisible();
  const cta = page.locator('.institutional-contact-actions');
  await expect(cta).toBeAttached();
  const spacing = await cta.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).marginTop),
  );
  expect(spacing).toBeGreaterThanOrEqual(30);
});
