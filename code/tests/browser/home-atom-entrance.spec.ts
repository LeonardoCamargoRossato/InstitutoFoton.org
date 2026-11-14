import { expect, test } from '@playwright/test';

test('o átomo entra pelo alto, gira, diminui e revela a versão estática da Home', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');

  const stationary = page.locator('.home-hero .hero-identity--static');
  const flight = page.getByTestId('hero-atom-flight');

  await expect(stationary).toBeAttached();
  await expect(flight).toBeAttached();
  await expect(flight.locator('.hero-identity-orbit')).toHaveCount(3);
  await expect(flight.locator('.hero-identity-nucleus')).toBeAttached();

  const choreography = await flight.evaluate((element) => {
    const animation = element.getAnimations()[0];
    if (!animation) throw new Error('A animação de entrada não iniciou');
    const frames = (animation.effect as KeyframeEffect).getKeyframes();
    const first = frames[0];
    const last = frames[frames.length - 1];
    return {
      duration: animation.effect?.getComputedTiming().duration,
      firstTransform: String(first.transform),
      lastTransform: String(last.transform),
      firstOpacity: Number(first.opacity),
      lastOpacity: Number(last.opacity),
    };
  });

  expect(choreography.duration).toBe(2900);
  expect(choreography.firstTransform).toContain('translate3d');
  expect(choreography.firstTransform).toContain('rotate(-115deg)');
  expect(choreography.firstTransform).toContain('scale(2.65)');
  expect(choreography.lastTransform).toContain('scale(1)');
  expect(choreography.firstOpacity).toBe(1);
  expect(choreography.lastOpacity).toBe(0);

  const before = await stationary.boundingBox();
  await expect(stationary).toHaveClass(/is-settled/, { timeout: 8000 });
  await expect(flight).toHaveCount(0);
  await expect(stationary).toHaveCSS('opacity', '1');
  const after = await stationary.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs(after!.x - before!.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(after!.y - before!.y)).toBeLessThanOrEqual(1);
  await page.screenshot({
    path: 'test-results/hero-atom-settled-desktop.png',
    animations: 'disabled',
  });
});

test('em celular a trajetória é menor e não cria rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const flight = page.getByTestId('hero-atom-flight');
  await expect(flight).toBeAttached();
  const duration = await flight.evaluate(
    (element) => element.getAnimations()[0]?.effect?.getComputedTiming().duration,
  );
  expect(duration).toBe(2200);
  await expect(page.locator('.home-hero .hero-identity--static')).toHaveClass(/is-settled/, {
    timeout: 8000,
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({
    path: 'test-results/hero-atom-settled-mobile.png',
    animations: 'disabled',
  });
});

test('preferência por movimento reduzido mostra somente o átomo original', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('.home-hero .hero-identity--static')).toHaveClass(/is-settled/);
  await expect(page.getByTestId('hero-atom-flight')).toHaveCount(0);
  await expect(page.locator('.hero-identity--static .hero-identity-orbit')).toHaveCount(3);
});
