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
    await expect(card.locator('img')).toHaveCount(
      [
        'lancamento-lacq-pucrs-instituto-foton',
        'foton-mobi-quantum-festival-2026',
        'uniso-quantum-day-entrega-projeto-leonti',
      ].includes(story.slug)
        ? 1
        : 0,
    );
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

test('Mobi Quantum: nove fotos, PNG no zoom e mobile', async ({ page }) => {
  await page.goto('./noticias/foton-mobi-quantum-festival-2026');
  const carousel = page.getByRole('region', { name: 'Carrossel de fotos do Mobi Quantum' });
  await expect(carousel).toBeVisible();
  const photos = carousel.getByRole('button', { name: /Selecionar foto/ });
  await expect(photos).toHaveCount(9);
  await expect(carousel.getByText('1 de 9')).toBeVisible();
  const preview = carousel.locator('.news-mobi-image-button img');
  await expect(preview).toHaveAttribute('src', /QuantumBusiness1\.webp$/);
  await carousel.getByRole('button', { name: 'Próxima foto' }).click();
  await expect(carousel.getByText('2 de 9')).toBeVisible();
  await carousel.getByRole('button', { name: 'Ampliar foto 2 do Mobi Quantum' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const zoomImage = dialog.locator('img');
  await expect(zoomImage).toHaveAttribute('src', /QuantumBusiness2\.png$/);
  await expect(zoomImage).toHaveJSProperty('naturalWidth', 1280);
  await page.getByRole('button', { name: /Fechar/i }).click();
  await carousel.getByRole('button', { name: 'Selecionar foto 9' }).click();
  await expect(carousel.getByText('9 de 9')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('Quantum Day: dois carrosséis com o mesmo componente e zoom PNG', async ({ page }) => {
  await page.goto('./noticias/uniso-quantum-day-entrega-projeto-leonti');
  const sections = [
    { label: 'Quantum Day 1', count: 5, first: 'MobiQuantumUnisoQuantumDay02' },
    { label: 'Quantum Day 2', count: 10, first: 'MobiQuantumUnisoQuantumDay01' },
  ];
  for (const { label, count, first } of sections) {
    const carousel = page.getByRole('region', { name: 'Carrossel de fotos do ' + label });
    await expect(carousel).toBeVisible();
    await expect(carousel.getByRole('button', { name: /Selecionar foto/ })).toHaveCount(count);
    await expect(carousel.getByText('1 de ' + count)).toBeVisible();
    const preview = carousel.locator('.news-carousel-image-button img');
    await expect(preview).toHaveAttribute('src', new RegExp(first + '\\.webp$'));
    await preview.scrollIntoViewIfNeeded();
    await expect
      .poll(() => preview.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    await carousel.getByRole('button', { name: 'Ampliar foto 1 do ' + label }).click();
    const zoom = page.getByRole('dialog').locator('img');
    await expect(zoom).toHaveAttribute('src', new RegExp(first + '\\.png$'));
    await expect
      .poll(() => zoom.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await carousel.getByRole('button', { name: 'Próxima foto' }).click();
    await expect(carousel.getByText('2 de ' + count)).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('Projeto Leonti: capa e duas fotografias no artigo, WebP inicial e PNG no zoom', async ({
  page,
}) => {
  await page.goto('./noticias');
  const card = page.locator('.publication-card').filter({ hasText: 'Uniso Quantum Day' });
  await expect(card.locator('img')).toHaveAttribute('src', /ProjetoLeonti1\.webp$/);

  await page.goto('./noticias/uniso-quantum-day-entrega-projeto-leonti');
  const gallery = page.getByRole('region', { name: 'Fotografias do Projeto Leonti' });
  const photos = gallery.locator('.news-highlight-figure');
  await expect(photos).toHaveCount(2);
  for (const [index, width] of [1024, 800].entries()) {
    const name = `ProjetoLeonti${index + 1}`;
    const photo = photos.nth(index);
    const preview = photo.locator('img');
    await expect(preview).toHaveAttribute('src', new RegExp(name + '\\.webp$'));
    await preview.scrollIntoViewIfNeeded();
    await expect(preview).toHaveJSProperty('naturalWidth', width);
    await photo.getByRole('button', { name: `Ampliar Projeto Leonti ${index + 1}` }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('img')).toHaveAttribute('src', new RegExp(name + '\\.png$'));
    await expect(dialog.locator('img')).toHaveJSProperty('naturalWidth', width);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
  }
  await expect(
    page.getByRole('region', { name: 'Carrossel de fotos do Quantum Day 1' }),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Carrossel de fotos do Quantum Day 2' }),
  ).toBeVisible();
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('LACQ PUCRS: 13 fotos WebP com zoom PNG e capa em 16:9', async ({ page }) => {
  await page.goto('./noticias');
  const cards = page.locator('.publication-card');
  await expect(cards).toHaveCount(8);
  for (const card of await cards.all()) {
    const cover = card.locator('.publication-art');
    const ratio = await cover.evaluate((node) => {
      const bounds = node.getBoundingClientRect();
      return bounds.width / bounds.height;
    });
    expect(ratio).toBeCloseTo(16 / 9, 1);
  }
  const lacqCard = cards.filter({ hasText: 'LACQ PUCRS' });
  await expect(lacqCard.locator('img')).toHaveAttribute('src', /LacqPucrs01\.webp$/);

  await page.goto('./noticias/lancamento-lacq-pucrs-instituto-foton');
  const carousel = page.getByRole('region', {
    name: 'Carrossel de fotos do lançamento da LACQ PUCRS',
  });
  await expect(carousel).toBeVisible();
  await expect(carousel.getByRole('button', { name: /Selecionar foto/ })).toHaveCount(13);
  await expect(carousel.getByText('1 de 13')).toBeVisible();
  const preview = carousel.locator('.news-carousel-image-button img');
  await expect(preview).toHaveAttribute('src', /LacqPucrs01\.webp$/);
  await carousel
    .getByRole('button', { name: 'Ampliar foto 1 do lançamento da LACQ PUCRS' })
    .click();
  const zoom = page.getByRole('dialog').locator('img');
  await expect(zoom).toHaveAttribute('src', /LacqPucrs01\.png$/);
  await expect
    .poll(() => zoom.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await carousel.getByRole('button', { name: 'Selecionar foto 13' }).click();
  await expect(carousel.getByText('13 de 13')).toBeVisible();
  await expect(preview).toHaveAttribute('src', /LacqPucrs13\.webp$/);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('todos os títulos de carrossel mantêm folga óptica proporcional à fonte', async ({ page }) => {
  const news = [
    { slug: 'lancamento-lacq-pucrs-instituto-foton', count: 1 },
    { slug: 'foton-mobi-quantum-festival-2026', count: 1 },
    { slug: 'uniso-quantum-day-entrega-projeto-leonti', count: 2 },
  ];
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 840 });
    const visibleGaps: number[] = [];
    for (const { slug, count } of news) {
      await page.goto('./noticias/' + slug);
      const carousels = page.locator('.news-carousel');
      await expect(carousels).toHaveCount(count);
      for (const carousel of await carousels.all()) {
        await expect(carousel.locator('h2')).toBeVisible();
        await expect(carousel.locator('.news-carousel-stage')).toBeVisible();
        const metrics = await carousel.evaluate((section) => {
          const heading = section.querySelector('h2');
          const stage = section.querySelector('.news-carousel-stage');
          if (!heading || !stage) throw new Error('Título ou palco ausente');
          const style = getComputedStyle(heading);
          const range = document.createRange();
          range.selectNodeContents(heading);
          return {
            fontSize: parseFloat(style.fontSize),
            paddingBottom: parseFloat(style.paddingBottom),
            visibleGap: stage.getBoundingClientRect().top - range.getBoundingClientRect().bottom,
          };
        });
        // O recuo acompanha o tamanho da fonte e deve ser visível até o início das fotos.
        expect(metrics.paddingBottom).toBeCloseTo(metrics.fontSize * 0.8, 0);
        expect(metrics.visibleGap).toBeGreaterThanOrEqual(metrics.fontSize * 0.45);
        visibleGaps.push(metrics.visibleGap);
      }
    }
    // Mesmo componente e mesma distância entre os quatro carrosséis em cada viewport.
    expect(Math.max(...visibleGaps) - Math.min(...visibleGaps)).toBeLessThanOrEqual(3);
  }
});

test('notícias exibem prévias 16:9 centralizadas e preservam PNG inteiro no zoom', async ({
  page,
}) => {
  const groups = [
    { slug: 'lancamento-lacq-pucrs-instituto-foton', count: 1 },
    { slug: 'foton-mobi-quantum-festival-2026', count: 1 },
    { slug: 'uniso-quantum-day-entrega-projeto-leonti', count: 2 },
  ];
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 840 });
    for (const { slug, count } of groups) {
      await page.goto('./noticias/' + slug);
      const carousels = page.locator('.news-carousel');
      await expect(carousels).toHaveCount(count);
      for (const carousel of await carousels.all()) {
        const button = carousel.locator('.news-carousel-image-button');
        const preview = button.locator('img');
        const ratio = await button.evaluate((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width / rect.height;
        });
        expect(ratio).toBeCloseTo(16 / 9, 1);
        await expect(preview).toHaveCSS('object-fit', 'cover');
        await expect(preview).toHaveCSS('object-position', '50% 50%');
        await expect(preview).toHaveAttribute('src', /\\.webp$/);
        await button.click();
        const dialog = page.getByRole('dialog');
        await expect(dialog.locator('img')).toHaveAttribute('src', /\\.png$/);
        await expect(dialog.locator('img')).not.toHaveCSS('object-fit', 'cover');
        await page.getByRole('button', { name: 'Fechar galeria' }).click();
      }
    }
  }
});

test('fotografias editoriais e antigas mantêm corte 16:9 na leitura e zoom PNG', async ({
  page,
}) => {
  const stories = [
    { slug: 'uniso-quantum-day-entrega-projeto-leonti', selector: '.news-highlight-image-button' },
    { slug: 'foton-softsul-cooperacao-tecnologias-quanticas', selector: '.news-media-photo' },
    { slug: 'foton-assespro-rs-termo-cooperacao', selector: '.news-media-photo' },
    { slug: 'seminario-cubotech-direito-computacao-quantica', selector: '.news-media-photo' },
  ];
  for (const { slug, selector } of stories) {
    await page.goto('./noticias/' + slug);
    const preview = page.locator(selector).first();
    await expect(preview).toBeVisible();
    const box = await preview.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width / rect.height;
    });
    expect(box).toBeCloseTo(16 / 9, 1);
    const photo = (await preview.getAttribute('src')) ? preview : preview.locator('img');
    await expect(photo).toHaveCSS('object-fit', 'cover');
    await expect(photo).toHaveCSS('object-position', '50% 50%');
    await preview.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('img')).toHaveAttribute('src', /\\.png$/);
    await expect(dialog.locator('img')).not.toHaveCSS('object-fit', 'cover');
    await page.getByRole('button', { name: 'Fechar galeria' }).click();
  }
});
