import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

// Fixtures de rede só no runner: o E2E de frontend não valida o Supabase remoto
// nem deve depender de migrations/credenciais de produção para ser determinístico.
test.beforeEach(async ({ page }) => {
  await page.route('https://qwyrnomazssofombhem.supabase.co/rest/v1/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }),
  );
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
      pathname === 'manifesto' ? 'Manifesto Quântico Nacional' : 'Acesso institucional',
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
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A ciência');
  await page.getByRole('link', { name: 'Conheça o Instituto', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Ciência que aproxima. Conhecimento que transforma.',
  );
  await page.goto('./manifesto');
  await expect(page.locator('.odq-card')).toHaveCount(11);
  await page.getByText('Carta do Sudeste', { exact: true }).click();
  await expect(page.getByText(/A Carta de Sorocaba marcou/)).toBeVisible();
  await page.goto('./pesquisa/computacao-quantica');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Computação quântica');
  expect(errors).toEqual([]);
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

test('modal de apoio: detalhes, foco, escape e retorno ao botão', async ({ page }) => {
  await page.goto('./apoie');
  const trigger = page.getByRole('button', { name: /01 Materiais e educação/ });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Modalidade em estruturação', { exact: true })).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Fechar detalhes' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
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
      name: /Acesso temporariamente indisponível|Entre com sua conta institucional/,
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
  await page.goto('./apoie');
  await page.locator('.support-card').first().click();
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});

test('screenshots para revisão desktop e mobile', async ({ page }, testInfo) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    for (const [path, name] of [
      ['./', 'home'],
      ['./apoie', 'apoie'],
      ['./manifesto', 'manifesto'],
      ['./apresentacao', 'apresentacao'],
      ['./entrar', 'entrar'],
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      if (name === 'apresentacao')
        await expect(page.getByRole('button', { name: 'Salvar página em PNG' })).toBeEnabled({
          timeout: 30000,
        });
      await page.screenshot({ path: testInfo.outputPath(`${name}-${width}.png`), fullPage: true });
    }
  }
});
