import { test, expect } from '@playwright/test';

test('Spanish locale switches, persists, and serves translated pages', async ({ page }) => {
  await page.goto('./');
  await page.locator('.language-control').click();
  await page.getByRole('button', { name: 'Español (España)' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Transformar la ciencia');
  await page.goto('./pesquisa/computacao-quantica');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Computación cuántica');
  await page.goto('./noticias/fundacao-instituto-foton');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('El día en que nació');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES');
  await page.locator('.language-control').click();
  await page.getByRole('button', { name: 'Português (Brasil)' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
});
