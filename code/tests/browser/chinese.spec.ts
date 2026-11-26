import { test, expect } from '@playwright/test';

test('compact picker enables Chinese and preserves the language across routes', async ({
  page,
}) => {
  await page.goto('./');
  await page.locator('.language-control').click();
  await expect(page.locator('.language-menu button')).toHaveCount(4);
  await page.getByRole('button', { name: '简体中文' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('将前沿科学转化为');
  await page.goto('./pesquisa/computacao-quantica');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('量子计算');
  await page.goto('./noticias/fundacao-instituto-foton');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Foton 研究院成立之日');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await page.locator('.language-control').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('.language-control')).toHaveAttribute('aria-expanded', 'false');
});
