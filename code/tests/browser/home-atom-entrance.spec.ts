import { expect, test, type Page } from '@playwright/test';

const fronts = [
  'Formação de ecossistema',
  'Conexão de talentos',
  'Pesquisa e educação',
  'Geração de novas startups',
];

// Freeze only the finite entrance before navigation; inspection cannot race load/CI.
async function freezeEntrance(page: Page) {
  await page.addInitScript(() => {
    const animate = Element.prototype.animate;
    const play = Animation.prototype.play;
    const frozen = new WeakSet<Animation>();
    Element.prototype.animate = function (frames, options) {
      const animation = animate.call(this, frames, options);
      if (this.matches('.home-atom-flight') || this.closest('.home-atom-flight')) {
        frozen.add(animation);
        animation.pause();
      }
      return animation;
    };
    Animation.prototype.play = function () {
      if (!frozen.has(this)) play.call(this);
    };
    document.addEventListener(
      'home-test-resume',
      () => {
        document
          .querySelector('.home-atom-flight')
          ?.getAnimations({ subtree: true })
          .forEach((animation) => {
            frozen.delete(animation);
            play.call(animation);
          });
      },
      { once: true },
    );
  });
}
async function resumeEntrance(page: Page) {
  await page.evaluate(() => document.dispatchEvent(new Event('home-test-resume')));
}

test('campo multidirecional, duas partículas com profundidade e colisão formam a rede Foton', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await freezeEntrance(page);
  await page.goto('./');
  const graph = page.getByTestId('home-foton-network');
  const flight = page.getByTestId('home-atom-orbitals');
  await expect(flight.locator('.home-field-particle')).toHaveCount(18);
  expect(
    await flight.evaluate((element) =>
      element
        .getAnimations({ subtree: true })
        .every((animation) => animation.playState === 'paused'),
    ),
  ).toBe(true);
  await expect(flight.locator('.home-primary-trail')).toHaveCount(2);
  await expect(flight.locator('.home-glass-fracture path')).toHaveCount(8);
  await expect(flight.locator('.home-impact-wave')).toHaveCount(3);
  const paths = await flight.locator('.home-field-particle').evaluateAll((particles) =>
    particles.map((particle) => {
      const frames = (particle.getAnimations()[0].effect as KeyframeEffect).getKeyframes();
      const point = (frame: ComputedKeyframe) =>
        String(frame.transform)
          .match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/)!
          .slice(1)
          .map(Number);
      return {
        start: point(frames[0]),
        end: point(frames[frames.length - 1]),
        firstScale: String(frames[0].transform),
        lastScale: String(frames[frames.length - 1].transform),
        peak: Math.max(...frames.map((frame) => Number(frame.opacity))),
      };
    }),
  );
  const area = await page.locator('.home-hero').boundingBox();
  const bounds = await graph.boundingBox();
  expect(paths.some(({ start: [x] }) => x < 0)).toBe(true);
  expect(paths.some(({ start: [x] }) => x > area!.width)).toBe(true);
  expect(paths.some(({ start: [, y] }) => y < 0)).toBe(true);
  expect(paths.some(({ start: [, y] }) => y > area!.height)).toBe(true);
  expect(
    paths
      .slice(0, 2)
      .every(
        ({ end: [x, y], peak, firstScale, lastScale }) =>
          Math.abs(x - (bounds!.x - area!.x + bounds!.width / 2)) < 1 &&
          Math.abs(y - (bounds!.y - area!.y + bounds!.height / 2)) < 1 &&
          peak >= 0.8 &&
          firstScale.includes('scale(1.65)') &&
          lastScale.includes('scale(0.47'),
      ),
  ).toBe(true);
  await expect(flight).toHaveCSS('pointer-events', 'none');
  await resumeEntrance(page);
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
  await freezeEntrance(page);
  await page.goto('./');
  const flight = page.getByTestId('home-atom-orbitals');
  await expect(flight).toBeAttached();
  const duration = await flight.evaluate((element) =>
    Math.max(
      ...element
        .getAnimations()
        .map((animation) => Number(animation.effect?.getComputedTiming().duration)),
    ),
  );
  expect(duration).toBe(4300);
  await expect(flight.locator('.home-field-particle')).toHaveCount(12);
  await resumeEntrance(page);

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

test('o movimento vítreo pode ser pausado sem afetar botões ou o grafo', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Pausar movimento' }).click();
  await expect(page.getByTestId('home-atom-orbitals')).toHaveCount(0);
  const glass = page.locator('.home-quantum-glass');
  await expect(glass).toHaveAttribute('data-paused', 'true');
  await expect(glass.locator('.home-glass-drift')).toHaveCSS('animation-play-state', 'paused');
  await expect(page.getByRole('link', { name: 'Conheça o Foton', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ativar movimento' }).click();
  await expect(glass).toHaveAttribute('data-paused', 'false');
  await expect(glass.locator('.home-glass-drift')).toHaveCSS('animation-play-state', 'running');
});
