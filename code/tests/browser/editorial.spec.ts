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
  await expect(page.getByText(/seis linhas temáticas/)).toBeVisible();
  await expect(page.getByText(/cinco áreas editoriais/)).toBeVisible();
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
  await expect(page.getByText(/não oferece inscrições, mentorias, bolsas/)).toBeVisible();
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
