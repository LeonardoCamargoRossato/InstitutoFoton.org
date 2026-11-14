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

test('animação do fóton possui estado final acessível para movimento reduzido', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./instituto');
  const identity = page.locator('.photon-identity');
  await identity.scrollIntoViewIfNeeded();
  await expect(identity).toHaveClass(/is-active/);
  await expect(identity.locator('.photon-identity-initial')).toHaveCSS('display', 'none');
  await expect(identity.locator('.photon-identity-final')).toHaveCSS('opacity', '1');
  await expect(identity.locator('.photon-identity-type-letter')).toHaveCount(5);
  await expect(identity.locator('.photon-identity-type-letter').first()).toHaveCSS('opacity', '1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
