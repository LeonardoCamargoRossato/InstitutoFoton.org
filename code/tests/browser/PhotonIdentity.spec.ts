import { expect, test, type Locator, type Page } from '@playwright/test';

const svgPath = '/assets/AnimacaoIdentidadeFoton.svg';
const artworkSelector = '.photon-identity-artwork';
const particleSelector = '.institute-light-path circle';
const viewports = [
  { width: 1440, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

async function openInstitute(page: Page, path = './instituto') {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  return page.locator(artworkSelector);
}

async function readImpact(artwork: Locator) {
  return artwork.evaluate((host) => {
    const svg = host.shadowRoot!.querySelector('svg')!;
    const particle = document.querySelector<SVGCircleElement>('.institute-light-path circle')!;
    const path = document.querySelector<SVGPathElement>('.institute-light-path path')!;
    const impact = new DOMPoint(161, 160).matrixTransform(svg.getScreenCTM()!);
    const pulse = svg.querySelector<SVGCircleElement>('.pulso')!;
    const center = new DOMPoint(
      particle.cx.baseVal.value,
      particle.cy.baseVal.value,
    ).matrixTransform(particle.getScreenCTM()!);
    const end = path.getPointAtLength(path.getTotalLength()).matrixTransform(path.getScreenCTM()!);
    const flash = new DOMPoint(pulse.cx.baseVal.value, pulse.cy.baseVal.value).matrixTransform(
      svg.getScreenCTM()!,
    );
    return {
      endDistance: Math.hypot(end.x - impact.x, end.y - impact.y),
      particleDistance: Math.hypot(center.x - impact.x, center.y - impact.y),
      flashDistance: Math.hypot(flash.x - impact.x, flash.y - impact.y),
      scroll: Math.ceil(window.scrollY + impact.y - window.innerHeight * 0.55),
      animationCount: svg.getAnimations({ subtree: true }).length,
    };
  });
}

async function scrollTo(page: Page, top: number) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);
}

for (const viewport of viewports) {
  test(`a partícula toca a estrela, inicia o SVG e mantém a marca em ${viewport.width} px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    const artwork = await openInstitute(page);
    await expect(artwork).toHaveAttribute('data-artwork-status', 'ready');
    await expect(artwork).toHaveAttribute('data-phase', 'approach');
    const pulse = artwork.locator('.pulso');
    const particle = page.locator(particleSelector);
    await expect(pulse).toHaveCount(1);
    await expect(pulse).toBeHidden();
    const initial = await readImpact(artwork);
    expect(initial.animationCount).toBe(0);
    await expect.poll(async () => (await readImpact(artwork)).endDistance).toBeLessThan(0.25);

    // Registra o quadro de início no navegador, inclusive o tempo da animação CSS do ativo.
    await artwork.evaluate((host) => {
      const svg = host.shadowRoot!.querySelector('svg')!;
      svg.addEventListener('animationstart', (event) => {
        if (event.animationName !== 'pulso') return;
        const pulse = event.target as SVGCircleElement;
        const particle = document.querySelector<SVGCircleElement>('.institute-light-path circle')!;
        const a = new DOMPoint(pulse.cx.baseVal.value, pulse.cy.baseVal.value).matrixTransform(
          svg.getScreenCTM()!,
        );
        const b = new DOMPoint(
          particle.cx.baseVal.value,
          particle.cy.baseVal.value,
        ).matrixTransform(particle.getScreenCTM()!);
        host.dataset.observedImpact = JSON.stringify({
          distance: Math.hypot(a.x - b.x, a.y - b.y),
          time: pulse.getAnimations()[0]?.currentTime,
          opacity: getComputedStyle(pulse).opacity,
        });
        host.dataset.observedStarts = String(Number(host.dataset.observedStarts || 0) + 1);
      });
    });

    await scrollTo(page, initial.scroll - 14);
    await expect(particle).toHaveCSS('opacity', '1');
    await expect.poll(async () => (await readImpact(artwork)).particleDistance).toBeLessThan(80);
    expect((await readImpact(artwork)).particleDistance).toBeGreaterThan(8);
    await expect(artwork).toHaveAttribute('data-phase', 'approach');
    expect((await readImpact(artwork)).animationCount).toBe(0);
    const before = await artwork.boundingBox();

    await scrollTo(page, initial.scroll + 2);
    await expect(artwork).toHaveAttribute('data-phase', 'playing');
    await expect(artwork).toHaveAttribute('data-observed-starts', '1');
    const atImpact = JSON.parse((await artwork.getAttribute('data-observed-impact'))!);
    expect(atImpact.distance).toBeLessThan(0.25);
    expect(atImpact.time).toBeGreaterThanOrEqual(0);
    expect(atImpact.time).toBeLessThan(100);
    expect(Number(atImpact.opacity)).toBeGreaterThan(0.7);
    expect((await readImpact(artwork)).flashDistance).toBeLessThan(0.01);
    await expect(particle).toHaveCSS('opacity', '0');
    const after = await artwork.boundingBox();
    expect(after!.x).toBeCloseTo(before!.x, 1);
    expect(after!.width).toBeCloseTo(before!.width, 1);
    expect(after!.height).toBeCloseTo(before!.height, 1);
    await expect(page.locator('.photon-identity-caption')).toHaveText('luz · conexão · ciência');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);

    const svg = artwork.locator('svg');
    await svg.evaluate(async (element) => {
      // Aguarda a duração real do ativo, inclusive os últimos reflexos.
      await Promise.all(
        element.getAnimations({ subtree: true }).map((animation) => animation.finished),
      );
    });
    await expect(pulse).toHaveCSS('opacity', '0');
    await expect(svg.locator('.ondas')).toHaveCSS('opacity', '0');
    await expect(svg.locator('#RevelarLetraN .janela-revelacao').last()).toHaveCSS('opacity', '1');
    await expect(svg.locator('#RevelarLetraN .traco').last()).toHaveCSS('stroke-dashoffset', '0px');
    await expect(svg.locator('#Marca use[href="#LetraN"].marca-escura')).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath('FotonIdentidadeFinal.png') });

    await scrollTo(page, 0);
    await scrollTo(page, initial.scroll + 2);
    await expect(artwork).toHaveAttribute('data-observed-starts', '1');
    await expect(particle).toHaveCSS('opacity', '0');
    await expect(pulse).toHaveCSS('opacity', '0');
  });
}

test('acesso direto à identidade começa com a marca completa, sem reproduzir o impacto', async ({
  page,
}) => {
  const artwork = await openInstitute(page, './instituto#identidade-foton');
  await expect(artwork).toHaveAttribute('data-artwork-status', 'ready');
  await expect(artwork).toHaveAttribute('data-phase', 'static');
  await expect(artwork.locator('.pulso')).toBeHidden();
  await expect(artwork.locator('#Marca use[href="#LetraN"].marca-escura')).toBeInViewport();
  expect((await readImpact(artwork)).animationCount).toBe(0);
});

for (const offset of [-30, 30]) {
  const before = offset < 0;
  test(`recarregar ${before ? 'perto do ponto de chegada' : 'após a colisão'} exibe a marca completa`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const artwork = await openInstitute(page);
    await expect(artwork).toHaveAttribute('data-artwork-status', 'ready');
    const { scroll } = await readImpact(artwork);
    await scrollTo(page, scroll + offset);
    await expect(artwork).toHaveAttribute('data-phase', before ? 'approach' : 'playing');
    await expect
      .poll(() => page.evaluate(() => history.state?.instituteIdentityScroll))
      .toBe(scroll + offset);
    await page.reload();
    await expect(artwork).toHaveAttribute('data-artwork-status', 'ready');
    await expect(artwork).toHaveAttribute('data-phase', 'static');
    await expect(artwork.locator('.pulso')).toBeHidden();
    await expect(artwork.locator('#Marca use[href="#LetraN"].marca-escura')).toBeInViewport();
    expect((await readImpact(artwork)).animationCount).toBe(0);
  });
}

test('movimento reduzido apresenta a marca completa imediatamente', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await page.setViewportSize({ width: 390, height: 844 });
  const artwork = await openInstitute(page);
  await expect(artwork).toHaveAttribute('data-artwork-status', 'ready');
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute('data-phase', 'static');
  await expect(page.locator('.institute-light-path')).toBeHidden();
  await expect(artwork.locator('.pulso')).toBeHidden();
  await expect(artwork.locator('#Marca use[href="#LetraN"].marca-escura')).toBeVisible();
  expect((await readImpact(artwork)).animationCount).toBe(0);
});

test('falha no SVG usa a marca institucional estática', async ({ page }) => {
  await page.route(`**${svgPath}`, (route) => route.abort());
  const artwork = await openInstitute(page);
  await artwork.scrollIntoViewIfNeeded();
  await expect(artwork).toHaveAttribute('data-artwork-status', 'failed');
  await expect(artwork.locator('svg')).toHaveCount(0);
  const fallback = artwork.locator('img');
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveJSProperty('naturalWidth', 329);
  await expect(page.getByRole('img', { name: 'Instituto Foton', exact: true })).toBeAttached();
});

test('download lento preserva a chegada e só inicia o SVG quando os bytes estão prontos', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let release!: () => void;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(`**${svgPath}`, async (route) => {
    await blocked;
    await route.continue();
  });
  const artwork = await openInstitute(page);
  const scroll = await artwork.evaluate((stage) => {
    const box = stage.getBoundingClientRect();
    const scale = Math.min(box.width / 2512, box.height / 750);
    return Math.ceil(
      window.scrollY + box.top + (box.height - 750 * scale) / 2 + 239 * scale - innerHeight * 0.55,
    );
  });
  try {
    await scrollTo(page, scroll + 2);
    await expect(artwork).toHaveAttribute('data-phase', 'approach');
    await expect(artwork.locator('img')).toBeVisible();
    await expect(page.locator(particleSelector)).toHaveCSS('opacity', '1');
  } finally {
    release();
  }
  await expect(artwork).toHaveAttribute('data-artwork-status', 'ready');
  await expect(artwork).toHaveAttribute('data-phase', 'playing');
  await expect.poll(async () => (await readImpact(artwork)).particleDistance).toBeLessThan(0.25);
  await expect(page.locator(particleSelector)).toHaveCSS('opacity', '0');
});
