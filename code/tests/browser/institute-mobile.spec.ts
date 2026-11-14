import { expect, test } from '@playwright/test';

test('O Instituto mantém a equipe dentro da largura mobile', async ({ page }) => {
  for (const width of [320, 360, 390, 430]) {
    await page.setViewportSize({ width, height: 820 });
    await page.goto('./instituto#equipe');
    const metrics = await page.evaluate(() => {
      const selectors = [
        'html',
        'body',
        '#root',
        '#conteudo',
        '.institute-purpose',
        '.institute-team-section',
        '.institute-team-section > .container',
        '.team-intro',
        '.team-stats',
        '.team-level',
        '.team-grid',
        '.team-person',
      ];
      return selectors.map((selector) => {
        const element = document.querySelector(selector);
        const bounds = element?.getBoundingClientRect();
        return {
          selector,
          x: Math.round(bounds?.x ?? 0),
          right: Math.round(bounds?.right ?? 0),
          width: Math.round(bounds?.width ?? 0),
          scrollWidth: element?.scrollWidth ?? 0,
        };
      });
    });
    console.log('MOBILE_TEAM_DIAGNOSTICS', width, JSON.stringify(metrics));
    const result = metrics.find((metric) => metric.selector === '.institute-team-section > .container');
    expect(result?.width).toBeLessThanOrEqual(width);
    expect(result?.right).toBeLessThanOrEqual(width);
  }
});
