import { expect, test } from '@playwright/test';

const fronts = [
  'Formação de ecossistema',
  'Conexão de talentos',
  'Pesquisa e educação',
  'Geração de novas startups',
];

test('orbitais independentes descem, colapsam em um átomo e revelam o grafo Foton', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');

  const graph = page.getByTestId('home-foton-network');
  const flight = page.getByTestId('home-atom-orbitals');

  await expect(graph).toBeAttached();
  await expect(flight).toBeAttached();
  await expect(flight.locator('.home-arriving-orbit')).toHaveCount(3);
  await expect(flight.locator('.home-orbit-electron')).toHaveCount(4);
  await expect(flight.locator('.home-singular-atom')).toHaveCount(1);
  await expect(flight.locator('.home-atom-burst')).toHaveCount(1);

  const choreography = await flight.evaluate((element) => {
    const animation = element.getAnimations()[0];
    if (!animation) throw new Error('Animação de entrada não iniciou');
    const firstOrbit = element.querySelector('.home-arriving-orbit-one')!;
    const orbit = firstOrbit.getAnimations()[0];
    if (!orbit) throw new Error('Órbita não está animada');
    const frames = (orbit.effect as KeyframeEffect).getKeyframes();
    const earliest = frames[0];
    return {
      duration: animation.effect?.getComputedTiming().duration,
      orbitAnimation: getComputedStyle(firstOrbit).animationName,
      orbitalTransform: String(earliest.transform),
      background: getComputedStyle(element).backgroundColor,
    };
  });

  expect(choreography.duration).toBe(3850);
  expect(choreography.orbitAnimation).toBe('home-orbit-one-arrive');
  expect(choreography.orbitalTransform).toContain('orbital-fall');
  expect(choreography.background).toBe('rgba(0, 0, 0, 0)');

  await expect(graph).toHaveClass(/is-settled/, { timeout: 10000 });
  await expect(flight).toHaveCount(0);
  await expect(graph.locator('.home-network-node')).toHaveCount(4);
  await expect(graph.locator('.home-network-edges path')).toHaveCount(4);
  for (const front of fronts) {
    await expect(graph.getByText(front, { exact: true })).toBeVisible();
  }
  await expect(graph.locator('.home-network-center strong')).toHaveText('Foton');
  await expect
    .poll(() =>
      graph
        .locator('.home-network-center img')
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(graph).toHaveCSS('opacity', '1', { timeout: 5000 });
  await graph.screenshot({
    path: 'test-results/home-foton-grafo-desktop.png',
    animations: 'disabled',
  });
});

test('no celular o grafo permanece legível, sem corte ou rolagem lateral', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const flight = page.getByTestId('home-atom-orbitals');
  await expect(flight).toBeAttached();
  const duration = await flight.evaluate(
    (element) => element.getAnimations()[0]?.effect?.getComputedTiming().duration,
  );
  expect(duration).toBe(3150);

  const graph = page.getByTestId('home-foton-network');
  await expect(graph).toHaveClass(/is-settled/, { timeout: 9000 });
  await expect(graph.locator('.home-network-node')).toHaveCount(4);
  await expect(graph.locator('.home-network-center strong')).toHaveText('Foton');
  for (const front of fronts) await expect(graph.getByText(front, { exact: true })).toBeVisible();
  const boxes = await graph.locator('.home-network-node').evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { left: box.left, right: box.right, width: box.width };
    }),
  );
  expect(boxes.every((box) => box.left >= 0 && box.right <= 390 && box.width > 100)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await graph.screenshot({
    path: 'test-results/home-foton-grafo-mobile.png',
    animations: 'disabled',
  });
});

test('movimento reduzido mostra imediatamente o grafo acessível sem orbitais', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const graph = page.getByTestId('home-foton-network');
  await expect(graph).toHaveClass(/is-settled/);
  await expect(page.getByTestId('home-atom-orbitals')).toHaveCount(0);
  await expect(graph).toHaveCSS('opacity', '1');
  await expect(graph.locator('.home-network-node')).toHaveCount(4);
  await expect(graph).toHaveAttribute('aria-label', /formação de ecossistema/i);
});
