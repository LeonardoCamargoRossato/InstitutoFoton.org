import { expect, test } from '@playwright/test';

const fronts = [
  'Formação de ecossistema',
  'Conexão de talentos',
  'Pesquisa e educação',
  'Geração de novas startups',
];

test('partículas discretas chegam de todas as direções e revelam a rede Foton', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  const graph = page.getByTestId('home-foton-network');
  const flight = page.getByTestId('home-atom-orbitals');
  await expect(graph).toBeAttached();
  await expect(flight).toBeAttached();
  await expect(flight.locator('.home-field-particle')).toHaveCount(16);
  await expect(flight.locator('ellipse, .home-atom-burst')).toHaveCount(0);
  const paths = await flight.locator('.home-field-particle').evaluateAll((particles) =>
    particles.map((particle) => {
      const animation = particle.getAnimations()[0];
      const frames = (animation.effect as KeyframeEffect).getKeyframes();
      const point = (frame: ComputedKeyframe) =>
        String(frame.transform)
          .match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/)!
          .slice(1)
          .map(Number);
      return {
        start: point(frames[0]),
        end: point(frames[frames.length - 1]),
        peak: Math.max(...frames.map((frame) => Number(frame.opacity))),
      };
    }),
  );
  expect(paths.some(({ start: [x] }) => x < 0)).toBe(true);
  expect(paths.some(({ start: [x] }) => x > 1440)).toBe(true);
  expect(paths.some(({ start: [, y] }) => y < 0)).toBe(true);
  expect(paths.some(({ start: [, y] }) => y > 900)).toBe(true);
  const bounds = await graph.boundingBox();
  expect(
    paths.every(
      ({ end: [x, y], peak }) =>
        Math.abs(x - (bounds!.x + bounds!.width / 2)) <= 5 &&
        Math.abs(y - (bounds!.y + bounds!.height / 2)) <= 7 &&
        peak <= 0.4,
    ),
  ).toBe(true);
  await expect(flight).toHaveCSS('pointer-events', 'none');
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
  expect(duration).toBe(3800);

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

test('rolagem encerra a entrada e revela a rede sem partículas sobre o conteúdo', async ({
  page,
}) => {
  await page.goto('./');
  await expect(page.getByTestId('home-atom-orbitals')).toBeAttached();
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
  await expect(page.getByTestId('home-atom-orbitals')).toHaveCount(0);
  await expect(page.getByTestId('home-foton-network')).toHaveClass(/is-settled/);
});
