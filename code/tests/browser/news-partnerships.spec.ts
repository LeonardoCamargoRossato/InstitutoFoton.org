import { expect, test } from '@playwright/test';

const stories = [
  {
    slug: 'foton-softsul-cooperacao-tecnologias-quanticas',
    name: 'SOFTSUL',
    original: 'AcordoFotonSoftsul.png',
    preview: 'AcordoFotonSoftsul.webp',
    photos: 2,
  },
  {
    slug: 'foton-assespro-rs-termo-cooperacao',
    name: 'Assespro-RS',
    original: 'ParceriaFotonAssesproRS.png',
    preview: 'ParceriaFotonAssesproRS.webp',
    photos: 1,
  },
  {
    slug: 'seminario-cubotech-direito-computacao-quantica',
    name: 'CUBOTECH',
    original: 'SeminarioCubotechDireitoComputacaoQuantica.png',
    preview: 'SeminarioCubotechDireitoComputacaoQuantica.webp',
    photos: 1,
  },
];

test('as três reportagens estão em Notícias e cada card abre sua página', async ({ page }) => {
  await page.goto('./noticias');
  for (const story of stories) {
    const card = page.locator('.publication-card').filter({ hasText: story.name });
    await expect(card).toHaveCount(1);
    await expect(card.locator('img')).toHaveAttribute('src', new RegExp(story.preview + '$'));
    await card.locator('img').click();
    await expect(page).toHaveURL(new RegExp('/noticias/' + story.slug + '$'));
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('.news-media-photo')).toHaveCount(story.photos);
    await page.goto('./noticias');
  }
});

test('imagens de notícias usam WebP inicialmente e originais apenas na ampliação', async ({
  page,
}) => {
  for (const story of stories) {
    const originalRequests: string[] = [];
    const onRequest = (request: { url: () => string }) => {
      if (request.url().includes('/assets/') && request.url().endsWith(story.original)) {
        originalRequests.push(request.url());
      }
    };
    page.on('request', onRequest);
    await page.goto('./noticias/' + story.slug);
    const image = page.locator('.news-media-photo').first();
    await expect(image).toHaveAttribute('src', new RegExp(story.preview + '$'));
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
      .toBeGreaterThan(0);
    expect(originalRequests).toHaveLength(0);
    await image.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect.poll(() => originalRequests.length).toBeGreaterThan(0);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    page.off('request', onRequest);
  }
});

test('quatro imagens de notícias: WebP na página, PNG no zoom', async ({ page }) => {
  const galleries = [
    {
      slug: 'foton-softsul-cooperacao-tecnologias-quanticas',
      folder: '01-Foton-SOFTSUL',
      names: ['AcordoFotonSoftsul', 'FotonSoftsulAcervo20250314WA0021'],
      widths: [1024, 1280],
    },
    {
      slug: 'foton-assespro-rs-termo-cooperacao',
      folder: '03-Foton-Assespro-RS',
      names: ['ParceriaFotonAssesproRS'],
      widths: [1207],
    },
    {
      slug: 'seminario-cubotech-direito-computacao-quantica',
      folder: '04-Seminario-CUBOTECH',
      names: ['SeminarioCubotechDireitoComputacaoQuantica'],
      widths: [3780],
    },
  ];

  for (const gallery of galleries) {
    await page.goto('./noticias/' + gallery.slug);
    const photos = page.locator('.news-media-photo');
    await expect(photos).toHaveCount(gallery.names.length);
    for (const [index, name] of gallery.names.entries()) {
      const image = photos.nth(index);
      const root = 'assets/06 - Notícias/Reportagens/' + gallery.folder;
      const preview = root + '/WebP/' + name + '.webp';
      const original = root + '/PNG/' + name + '.png';
      const pngName = new RegExp('/PNG/' + name + '\\.png$');

      expect((await image.getAttribute('src'))?.endsWith(preview)).toBe(true);
      expect((await image.getAttribute('data-full-image'))?.endsWith(original)).toBe(true);
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('naturalWidth', gallery.widths[index]);

      await image.click();
      const dialog = page.getByRole('dialog');
      const zoomImage = dialog.locator('img');
      await expect(zoomImage).toHaveAttribute('src', pngName);
      await expect(zoomImage).toHaveJSProperty('naturalWidth', gallery.widths[index]);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
    }
  }
});

test('notícias mantêm largura de tela em celular, tablet e desktop', async ({ page }) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 840 });
    await page.goto('./noticias/seminario-cubotech-direito-computacao-quantica');
    const difference = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(difference).toBeLessThanOrEqual(1);
  }
});

test('quatro novas matérias têm fontes e não inventam fotos', async ({ page }) => {
  const newStories = [
    {
      slug: 'lancamento-lacq-pucrs-instituto-foton',
      title: 'Instituto Foton participa do lançamento da LACQ PUCRS',
      source: 'brasilinovador.com.br',
    },
    {
      slug: 'uniso-quantum-day-entrega-projeto-leonti',
      title: 'Uniso Quantum Day destaca a entrega do Projeto Leonti',
      source: 'focas.uniso.br',
    },
    {
      slug: 'parceria-instituto-foton-gravatai-inovacao',
      title: 'Instituto Foton e Gravataí registram parceria em inovação',
      source: 'licitapncp.com.br',
    },
    {
      slug: 'foton-mobi-quantum-festival-2026',
      title: 'Foton conecta computação quântica e negócios no Mobi Festival',
      source: 'ictqfoton.org',
    },
  ];

  await page.goto('./noticias');
  await expect(page.locator('.publication-card')).toHaveCount(8);
  const headings = await page.locator('.publication-card h2').allTextContents();
  expect(headings[0]).toContain('CUBOTECH');
  expect(headings[1]).toContain('Mobi Festival');
  expect(headings[2]).toContain('Gravataí');
  expect(headings[3]).toContain('Uniso Quantum Day');

  for (const story of newStories) {
    const card = page.locator('.publication-card').filter({ hasText: story.title });
    await expect(card).toHaveCount(1);
    await expect(card.locator('img')).toHaveCount(story.slug === 'foton-mobi-quantum-festival-2026' ? 1 : 0);
    await card.locator('a').click();
    await expect(page).toHaveURL(new RegExp('/noticias/' + story.slug + '$'));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(story.title);
    await expect(page.getByRole('link', { name: /Ler publicação original/ })).toHaveAttribute(
      'href',
      new RegExp(story.source),
    );
    await expect(page.locator('.news-media-photo')).toHaveCount(0);
    await page.goto('./noticias');
  }
});

test('CUBOTECH continua único e tem a fonte oficial da Unisinos', async ({ page }) => {
  await page.goto('./noticias');
  await expect(page.locator('.publication-card').filter({ hasText: 'CUBOTECH' })).toHaveCount(1);
  await page.goto('./noticias/seminario-cubotech-direito-computacao-quantica');
  await expect(page.getByRole('link', { name: /Ler publicação original/ })).toHaveAttribute(
    'href',
    'https://eventos.unisinos.br/primeiroseminariocubotech/',
  );
  await expect(page.locator('.news-media-figure figcaption')).toContainText([
    'crédito de criação não informado',
  ]);
});

test('novas páginas de Notícias mantêm layout sem rolagem horizontal', async ({ page }) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 840 });
    for (const slug of [
      'lancamento-lacq-pucrs-instituto-foton',
      'uniso-quantum-day-entrega-projeto-leonti',
      'parceria-instituto-foton-gravatai-inovacao',
      'foton-mobi-quantum-festival-2026',
    ]) {
      await page.goto('./noticias/' + slug);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, slug + ' ' + width).toBeLessThanOrEqual(1);
    }
  }
});

test('Mobi Quantum: seis imagens, navegação, ampliação e mobile', async ({ page }) => {
  await page.goto('./noticias/foton-mobi-quantum-festival-2026');
  const carousel = page.getByRole('region', { name: 'Carrossel de fotos do Mobi Quantum' });
  await expect(carousel).toBeVisible();
  await expect(carousel.getByRole('button', { name: /Selecionar foto/ })).toHaveCount(6);
  await expect(carousel.getByText('1 de 6')).toBeVisible();
  await carousel.getByRole('button', { name: 'Próxima foto' }).click();
  await expect(carousel.getByText('2 de 6')).toBeVisible();
  await carousel.getByRole('button', { name: 'Ampliar foto 2 do Mobi Quantum' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: /Fechar/i }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
