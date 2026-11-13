import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

// Auditoria negativa: registrar qualquer tentativa de acesso ao serviço desativado.
const remoteRequests = new WeakMap<object,string[]>();
test.beforeEach(({ page }) => {
  const hits: string[] = [];
  remoteRequests.set(page,hits);
  page.on('request', req => {
    if (/supabase\.co|storage\/v1|auth\/v1/i.test(req.url())) hits.push(req.url());
  });
});
test.afterEach(({ page }) => {
  expect(remoteRequests.get(page) || []).toEqual([]);
});

test('fallback Pages preserva URL limpa, query e hash, inclusive callback', async ({ page }) => {
  const fallback = await readFile('dist/404.html', 'utf8');
  const base = process.env.VITE_BASE_PATH || '/';
  for (const path of [
    'manifesto?origem=teste#odqs',
    'auth/callback?error=access_denied&returnTo=%2Fadmin',
  ]) {
    const pathname = path.split('?')[0];
    await page.route(
      `**${base}${pathname}?**`,
      async (route) => {
        if (route.request().isNavigationRequest())
          await route.fulfill({ status: 404, contentType: 'text/html', body: fallback });
        else await route.continue();
      },
      { times: 1 },
    );
    await page.goto(`./${path}`);
    await expect(page).toHaveURL(new RegExp(`${pathname}\\?`));
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      pathname === 'manifesto' ? 'Manifesto Quântico Nacional' : 'Acesso restrito',
    );
    expect(await page.evaluate(() => location.search.includes('__foton_route'))).toBe(false);
    if (pathname === 'manifesto') expect(await page.evaluate(() => location.hash)).toBe('#odqs');
    else
      expect(await page.evaluate(() => new URLSearchParams(location.search).get('error'))).toBe(
        'access_denied',
      );
  }
});

test('home, pesquisa, manifesto e navegação sem erros de aplicação', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Transformar ciência');
  await page.getByRole('link', { name: 'Conheça o Instituto', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Ciência que aproxima. Conhecimento que transforma.',
  );
  await expect(page.locator('.value-keyword')).toHaveCount(7);
  await page.goto('./manifesto');
  await expect(page.locator('.odq-card')).toHaveCount(11);
  await page.getByText('Carta do Sudeste', { exact: true }).click();
  await expect(page.getByText(/A Carta de Sorocaba marcou/)).toBeVisible();
  await page.goto('./pesquisa/computacao-quantica');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Computação quântica');
  expect(errors).toEqual([]);
});

test('movimento progressivo alterna seções e respeita desempenho', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.reveal-section').first()).toHaveClass(/is-revealed/);
  await expect(page.locator('.reveal-right').first()).toBeAttached();
  await expect(page.locator('.reveal-left').first()).toBeAttached();
  await expect(page.locator('.reveal-depth').first()).toBeAttached();
  await expect(page.locator('.ambient-particles > span')).toHaveCount(5);

  const research = page.locator('.research-grid').locator('..');
  await research.scrollIntoViewIfNeeded();
  await expect(research.locator('.research-card').first()).toHaveClass(/is-revealed/);

  await page.goto('./instituto');
  const photon = page.locator('.photon-section');
  const lightPath = page.locator('.institute-light-path path');
  const story = page.locator('.institute-story');
  await expect(lightPath).toBeAttached();
  await expect(story).not.toHaveClass(/pulse-arrived/);
  await expect(photon.locator('.photon-wave > span').first()).toHaveCSS('animation-name', 'none');
  const arrival = await lightPath.evaluate((element) => {
    const path = element as SVGPathElement;
    const wrapper = path.closest('.institute-story')?.getBoundingClientRect();
    const word = document.querySelector<HTMLElement>('.photon-section .large-word');
    const end = path.getPointAtLength(path.getTotalLength());
    const story = path.closest<HTMLElement>('.institute-story');
    if (!wrapper || !word || !story) throw new Error('Institute light-path geometry is unavailable');
    let wordLeft = 0;
    let current: HTMLElement | null = word;
    while (current && current !== story) {
      wordLeft += current.offsetLeft;
      current = current.offsetParent as HTMLElement | null;
    }
    return {
      endX: end.x,
      wordLeft,
    };
  });
  expect(arrival.endX).toBeLessThan(arrival.wordLeft);
  expect(arrival.wordLeft - arrival.endX).toBeGreaterThanOrEqual(24);
  expect(arrival.wordLeft - arrival.endX).toBeLessThanOrEqual(28);
  await photon.scrollIntoViewIfNeeded();
  // A animação termina quando o trajeto luminoso alcança a palavra, e não
  // quando apenas o topo da seção entra na viewport.
  await page.evaluate(() => {
    const story = document.querySelector('.institute-story');
    if (!story) throw new Error('Percurso do Instituto indisponível');
    const bottom = scrollY + story.getBoundingClientRect().bottom;
    scrollTo({ top: bottom - innerHeight * 0.35, behavior: 'instant' });
  });
  await expect(photon).toHaveClass(/is-revealed/);
  await expect(story).toHaveClass(/pulse-arrived/);
  await expect(photon.locator('.photon-wave > span')).toHaveCount(5);
  expect(
    await photon.locator('.photon-wave > span').first().evaluate((element) =>
      `${getComputedStyle(element).animationName}:${getComputedStyle(element).animationDelay}`,
    ),
  ).toBe('photon-word-wave:0s');
});

for (const viewport of [
  { width: 320, height: 800 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
]) {
  test(`layout, menu e foco em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const path of ['./', './apoie', './manifesto', './noticias', './entrar']) {
      await page.goto(path);
      await page.getByRole('heading', { level: 1 }).waitFor();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    await page.goto('./');
    if (viewport.width <= 1000) {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
      await page
        .getByRole('navigation')
        .getByRole('link', { name: 'Pesquisa', exact: true })
        .click();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        'Diferentes saberes. Perguntas em comum.',
      );
      await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    }
  });
}

test('apoie a ciência oferece contato, não modalidades ou pagamentos fictícios', async ({ page }) => {
  await page.goto('./apoie');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Apoiar a ciência começa com uma conversa.',
  );
  await expect(page.locator('.support-card, .support-researcher-photo, .human-page-hero-photo'))
    .toHaveCount(0);
  await expect(page.getByText(/O apoio à ciência começa com diálogo/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Canais de contato' })).toBeVisible();
});

test('notícias: estado vazio, busca e artigo ausente', async ({ page }) => {
  await page.goto('./noticias');
  await page.getByLabel('Buscar publicações').fill('pergunta inexistente');
  await expect(page.getByRole('heading', { name: 'Nenhuma publicação encontrada.' })).toBeVisible();
  await page.goto('./noticias/nao-existe');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Vamos encontrar outro caminho.',
  );
});

test('manifesto: mídias progressivas, vídeos e galeria navegável', async ({ page }) => {
  const response = await page.goto('./manifesto/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('.regional-letter')).toHaveCount(5);
  await expect(page.locator('.gallery-track > button')).toHaveCount(20);
  await expect(page.locator('.regional-letter').nth(1).locator('.manifesto-video')).toHaveCount(0);
  const cartaNorte = page.locator('.regional-letter').nth(1).locator('.manifesto-image img');
  await expect(cartaNorte).toHaveAttribute('src', /assets\/WebP\/manifesto-quantico\/Thumb_CartaNorte\.webp$/);
  await expect(cartaNorte).toHaveAttribute(
    'data-full-image',
    /assets\/PNG\/manifesto-quantico\/Thumb_CartaNorte\.png$/,
  );

  const alesp = page.getByRole('button', {
    name: 'Reproduzir Por que o Manifesto Quântico Nacional é importante',
  });
  await alesp.click();
  await expect(page.locator('.manifesto-importance iframe')).toHaveAttribute('src', /start=4615/);

  await page.locator('.regional-letter').nth(2).locator('.manifesto-image').click();
  await expect(page.getByRole('dialog', { name: 'Carta do Nordeste' })).toBeVisible();
  await expect(page.getByRole('dialog').getByText(/Jornada conectou polos de inovação/i)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);

  await page.locator('.gallery-track > button').first().click();
  await expect(page.getByRole('dialog', { name: 'Visita técnica 01' })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog', { name: 'Visita técnica 02' })).toBeVisible();
});

test('PDF real: sete páginas, navegação, zoom e exportação PNG', async ({ page }) => {
  await page.goto('./apresentacao');
  await expect(page.getByText('Página 1 de 7', { exact: true })).toBeVisible({ timeout: 30000 });
  await expect(page.getByRole('button', { name: 'Salvar página em PNG' })).toBeEnabled({
    timeout: 30000,
  });
  await page.getByRole('button', { name: 'Próxima página' }).click();
  await expect(page.getByText('Página 2 de 7', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Salvar página em PNG' })).toBeEnabled();
  await page.getByRole('button', { name: 'Aumentar zoom' }).click();
  await expect(page.getByRole('button', { name: 'Ajustar à largura' })).toHaveText('125%');
  await expect(page.getByRole('button', { name: 'Salvar página em PNG' })).toBeEnabled();
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Salvar página em PNG' }).click();
  expect((await download).suggestedFilename()).toBe('foton-apresentacao-2026-pagina-2.png');
});

test('admin anônimo nunca mostra o dashboard; rotas desconhecidas têm 404', async ({ page }) => {
  await page.goto('./admin/diretoria');
  await expect(page.getByText('Bem-vindo ao espaço institucional.')).toHaveCount(0);
  await expect(
    page.getByRole('heading', {
      name: /Acesso restrito/,
    }),
  ).toBeVisible();
  await page.goto('./pagina-inexistente');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Vamos encontrar outro caminho.',
  );
});

test('WCAG automatizada nas principais páginas e modal', async ({ page }) => {
  for (const route of [
    './',
    './apoie',
    './manifesto',
    './noticias',
    './entrar',
    './transparencia',
  ]) {
    await page.goto(route);
    await page.getByRole('heading', { level: 1 }).waitFor();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      result.violations,
      JSON.stringify(
        result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      ),
    ).toEqual([]);
  }
});

test('screenshots para revisão desktop e mobile', async ({ page }, testInfo) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    for (const [path, name] of [
      ['./', 'home'],
      ['./instituto', 'instituto'],
      ['./pesquisa', 'pesquisa'],
      ['./jornada', 'jornada'],
      ['./apoie', 'apoie'],
      ['./noticias', 'noticias'],
      ['./contato', 'contato'],
      ['./manifesto', 'manifesto'],
      ['./apresentacao', 'apresentacao'],
      ['./transparencia', 'transparencia'],
      ['./entrar', 'entrar'],
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      if (name === 'apresentacao')
        await expect(page.getByRole('button', { name: 'Salvar página em PNG' })).toBeEnabled({
          timeout: 30000,
        });
      if (name === 'manifesto') {
        // Em capturas fullPage a imagem lazy pode não ter terminado de carregar.
        // Verificar bytes renderizados antes da captura, sem desativar lazy-loading em produção.
        const overview=page.locator('.manifesto-image img').first();
        await overview.scrollIntoViewIfNeeded();
        await expect.poll(() => overview.evaluate(img => (img as HTMLImageElement).naturalWidth), {
          timeout: 15000,
        }).toBeGreaterThan(0);
      }
      await page.screenshot({ path: testInfo.outputPath(`${name}-${width}.png`), fullPage: true });
    }
  }
});
