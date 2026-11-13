import { test, expect } from '@playwright/test';

test('Home enxuta apresenta propósito comprovado sem fotografias artificiais', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 }))
    .toContainText('Transformar ciência de fronteira');
  await expect(page.locator('.home-hero img, .human-mosaic-tile, .manifesto-feature')).toHaveCount(0);
  await expect(page.locator('.home-hero .hero-identity')).toBeVisible();
  await expect(page.locator('.institutional-programs .research-card')).toHaveCount(4);
  await expect(page.getByText('Setembro de 2026', { exact: false }).first()).toBeVisible();
  for (const path of ['/instituto','/apresentacao','/manifesto','/jornada','/contato']) {
    await expect(page.locator('a[href$="' + path + '"]').first()).toBeAttached();
  }
});

test('páginas internas não exibem imagens de pessoas geradas por IA', async ({ page }) => {
  for (const path of ['./instituto','./pesquisa','./jornada','./apoie','./transparencia','./noticias']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('.foton-photo, [data-media-kind="ai-illustration"], .human-mosaic-tile'))
      .toHaveCount(0);
  }
  await page.goto('./pesquisa');
  await expect(page.getByText(/Explore cinco agrupamentos de temas científicos/)).toBeVisible();
});

test('Manifesto preserva vinte registros reais, WebP e zoom PNG local', async ({ page }) => {
  await page.goto('./manifesto#visitas');
  await expect(page.locator('.gallery-track > button')).toHaveCount(20);
  const third=page.locator('.gallery-track img').nth(2);
  await third.scrollIntoViewIfNeeded();
  await expect(third).toHaveAttribute('src', /assets\/WebP\/visitas-tecnicas\/visita-03\.webp$/);
  await expect.poll(() => third.evaluate(img => (img as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  await page.locator('.gallery-track > button').nth(2).click();
  const dialog=page.getByRole('dialog', { name: 'Visita técnica 03' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img'))
    .toHaveAttribute('src', /assets\/PNG\/visitas-tecnicas\/visita-03\.png$/);
  await dialog.getByRole('button', { name: 'Ampliar imagem' }).click();
  await expect(dialog.locator('.foton-zoom-level')).toHaveText('150%');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});

test('Transparência permanece acessível e não fabrica documentos', async ({ page }) => {
  await page.goto('./transparencia');
  for (const title of [
    'Estatuto social','Atas das assembleias','Relatórios anuais',
    'Relatórios periódicos de atividades','Documentos contábeis e demonstrações financeiras',
  ]) await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
  const item=page.getByRole('article').filter({ hasText: 'Apresentação institucional — setembro de 2026' });
  await expect(item.getByRole('link', { name: /Visualizar/ }))
    .toHaveAttribute('href', /documents\/apresentacao-institucional-2026-09-10\.pdf$/);
  await expect(item.getByRole('button', { name: /Baixar/ })).toBeVisible();
});

test('Apoie e Jornada mantêm informação objetiva sem inscrições, bolsas ou cobranças', async ({ page }) => {
  await page.goto('./apoie');
  await expect(page.locator('.support-card, .pix-panel, .human-page-hero-photo')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Canais de contato' })).toBeVisible();
  await page.goto('./jornada');
  await expect(page.locator('.journey-steps, .journey-photo-grid, .human-page-hero-photo')).toHaveCount(0);
  await expect(page.getByText(/Para conhecer atividades e oportunidades de participação/)).toBeVisible();
});

test('Home e páginas essenciais sem rolagem lateral em mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for(const route of ['./','./instituto','./pesquisa','./jornada','./apoie','./manifesto','./transparencia','./contato']) {
    await page.goto(route);
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
    const overflow=await page.evaluate(() => document.documentElement.scrollWidth-innerWidth);
    expect(overflow,route).toBeLessThanOrEqual(1);
  }
});

test('nenhuma página pública requisita Storage ou banco Supabase', async ({ page }) => {
  const requests:string[]=[];
  page.on('request',request=>{
    if(/supabase\.co|storage\/v1|auth\/v1/i.test(request.url()))requests.push(request.url());
  });
  for(const route of ['./','./instituto','./pesquisa','./jornada','./apoie','./manifesto','./transparencia','./noticias','./contato']) {
    await page.goto(route);
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
  }
  expect(requests).toEqual([]);
});

test('PDF público possui visualizador e download disponíveis', async ({ page }) => {
  await page.goto('./apresentacao');
  await expect(page.getByText('Página 1 de 7', { exact: true })).toBeVisible({timeout:30000});
  await expect(page.getByRole('button', { name: 'Salvar página em PNG' })).toBeEnabled();
});


test('todo o conteúdo público mantém linguagem institucional definitiva', async ({ page }) => {
  const blocked = /\b(?:versão|versões|V0|V1|protótipo|provisório|fictíci[oa]s?|simulação|simulado|em estruturação|em revisão|não implica contrato|fase pública estática|nesta etapa)\b/i;
  const routes = [
    './', './instituto', './pesquisa', './pesquisa/computacao-quantica',
    './jornada', './manifesto', './apoie', './transparencia', './apresentacao',
    './noticias', './contato', './privacidade', './termos', './entrar',
    './admin/diretoria', './pagina-inexistente',
  ];
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const text = await page.locator('#conteudo').innerText();
    expect(text, 'Expressão inadequada exibida em ' + route).not.toMatch(blocked);
  }
});

test('indicadores datados possuem apresentação discreta e sem ressalvas defensivas', async ({ page }) => {
  await page.goto('./');
  const metrics=page.locator('.institutional-metrics');
  await expect(metrics.getByText('15', {exact:true})).toBeVisible();
  await expect(metrics.getByText('140+', {exact:true})).toBeVisible();
  await expect(metrics.locator('.metrics-source')).toHaveText('Dados institucionais · setembro de 2026.');
  await expect(metrics).not.toContainText(/parceria vigente|não implica|não atualizados/i);
  const source=metrics.locator('.metrics-source');
  const fontSize=await source.evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
  expect(fontSize).toBeLessThanOrEqual(17);
});


test('todas as imagens do Manifesto carregam WebP, PNG só no zoom', async ({ page }) => {
  const assetRequests: string[] = [];
  page.on('request', request => {
    if (/\/assets\/(?:PNG|WebP)\/(?:visitas-tecnicas|manifesto-quantico)\//.test(request.url())) {
      assetRequests.push(request.url());
    }
  });
  await page.goto('./manifesto');
  const thumbnails = page.locator(
    '.manifesto-image img, .manifesto-video img, .gallery-track img',
  );
  await expect(thumbnails).toHaveCount(28); // 4 cartas, 2 imagens explicativas, 2 capas de vídeo e 20 visitas
  for (let index = 0; index < await thumbnails.count(); index++) {
    const img = thumbnails.nth(index);
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute('data-full-image', /\/assets\/PNG\/.+\.png$/);
    await expect(img).toHaveAttribute('src', /\/assets\/WebP\/.+\.webp$/);
    await expect.poll(() => img.evaluate(element => (element as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
  expect(assetRequests.filter(url => /\/assets\/PNG\//.test(url))).toEqual([]);

  const letter = page.locator('.manifesto-image').first();
  await letter.click();
  const modal = page.getByRole('dialog');
  await expect(modal.locator('img')).toHaveAttribute('src', /\/assets\/PNG\/.+\.png$/);
  await expect.poll(() => modal.locator('img').evaluate(img => (img as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  await modal.getByRole('button', { name: 'Ampliar imagem' }).click();
  await expect(modal.locator('.foton-zoom-level')).toHaveText('150%');
  await page.keyboard.press('Escape');
  await expect(modal).toHaveCount(0);

  const videoPoster = page.locator('.manifesto-video-block').first();
  await videoPoster.getByRole('button', { name: /Ampliar imagem de capa/ }).click();
  const posterModal = page.getByRole('dialog', { name: /Imagem de capa/ });
  await expect(posterModal.locator('img')).toHaveAttribute('src', /\/assets\/PNG\/.+\.png$/);
  await expect(videoPoster.locator('iframe')).toHaveCount(0);
  await posterModal.getByRole('button', { name: 'Fechar galeria' }).click();

  const gallery = page.locator('.gallery-track');
  await expect(gallery.locator('img')).toHaveCount(20);
  await gallery.locator('button').last().click();
  const visitModal = page.getByRole('dialog', { name: 'Visita técnica 20' });
  await expect(visitModal.locator('img')).toHaveAttribute(
    'src', /\/assets\/PNG\/visitas-tecnicas\/visita-20\.png$/,
  );
  await visitModal.getByRole('button', { name: 'Imagem anterior' }).click();
  await expect(page.getByRole('dialog', { name: 'Visita técnica 19' })).toBeVisible();
});
