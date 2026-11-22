import { expect, test } from '@playwright/test';

const news = './noticias/lancamento-lacq-pucrs-instituto-foton';
const foundation = './noticias/fundacao-instituto-foton';
const haquantum = './pesquisa/haquantum';
const manifesto = './manifesto';

test('Notícias: motor comum, peek, circularidade, grade recolhível e PNG', async ({ page }) => {
  await page.goto(news);
  const carousel = page.getByRole('region', {
    name: 'Carrossel de fotos do lançamento da LACQ PUCRS',
  });
  await expect(carousel).toHaveCount(1);
  await expect(carousel.locator('.base-carousel-primary img')).toHaveAttribute(
    'src',
    /LacqPucrs01\.webp$/,
  );
  await expect(carousel.locator('.base-carousel-peek img')).toHaveAttribute(
    'src',
    /LacqPucrs02\.webp$/,
  );
  await expect(carousel.locator('.base-carousel-count')).toHaveText('1 / 13');
  const thumbnails = carousel.locator('.base-carousel-thumbnails');
  await expect(thumbnails).toBeHidden();
  const toggle = carousel.getByRole('button', { name: 'Mostrar miniaturas' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(thumbnails).toBeVisible();
  await expect(carousel.getByRole('button', { name: /Selecionar foto/ })).toHaveCount(13);
  await carousel.getByRole('button', { name: 'Selecionar foto 13' }).click();
  await expect(carousel.locator('.base-carousel-count')).toHaveText('13 / 13');
  await carousel.getByRole('button', { name: 'Próxima foto' }).click();
  await expect(carousel.locator('.base-carousel-count')).toHaveText('1 / 13');
  await carousel.getByRole('button', { name: 'Foto anterior' }).click();
  await expect(carousel.locator('.base-carousel-count')).toHaveText('13 / 13');
  await carousel.getByRole('button', { name: 'Ocultar miniaturas' }).click();
  await expect(thumbnails).toBeHidden();
  await expect(carousel.locator('.base-carousel-count')).toHaveText('13 / 13');
  await carousel.getByRole('button', { name: /Ampliar foto 13/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.foton-zoom-panel')).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('src', /LacqPucrs13\.png$/);
  await expect(dialog.getByRole('link', { name: 'Baixar PNG original' })).toHaveAttribute(
    'href',
    /LacqPucrs13\.png$/,
  );
  await expect(dialog).toHaveCSS('backdrop-filter', /blur\(6px\)/);
  await dialog.getByRole('button', { name: 'Fechar galeria' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(carousel.getByRole('button', { name: /Ampliar foto 13/ })).toBeFocused();
});

test('Visualizador: percentual livre, fullscreen real, reduzir, Escape e X', async ({ page }) => {
  await page.goto(foundation);
  const carousel = page.locator('.foundation-carousel');
  await carousel.getByRole('button', { name: /^Ampliar imagem 1 de 9/ }).click();
  const dialog = page.getByRole('dialog');
  const percent = dialog.getByRole('textbox', { name: 'Percentual do zoom' });
  await expect(percent).toHaveValue('100%');
  await percent.fill('73%');
  await percent.press('Enter');
  await expect(percent).toHaveValue('73%');
  await expect(dialog.locator('.foton-zoom-stage > img')).toHaveCSS('transform', /matrix\(0\.73/);
  await dialog.getByRole('button', { name: 'Expandir para tela cheia' }).click();
  await expect(
    dialog.getByRole('button', { name: 'Reduzir para visualização intermediária' }),
  ).toBeVisible();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  await dialog.getByRole('button', { name: 'Reduzir para visualização intermediária' }).click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Expandir para tela cheia' }).click();
  await page.keyboard.press('Escape');
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Expandir para tela cheia' }).click();
  await dialog.getByRole('button', { name: 'Fechar galeria' }).click();
  await expect(dialog).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
});

test('Fundação, HaQuantum e Manifesto: mesmo motor e preservação de acervo', async ({ page }) => {
  await page.goto(foundation);
  const gallery = page.locator('.foundation-carousel');
  await gallery.getByRole('button', { name: 'Imagem anterior' }).click();
  await expect(gallery.locator('.foundation-carousel-position')).toHaveText('9 / 9');
  await gallery.getByRole('button', { name: 'Próxima imagem' }).click();
  await expect(gallery.locator('.foundation-carousel-position')).toHaveText('1 / 9');
  await gallery.getByRole('button', { name: 'Próxima imagem' }).click();
  await gallery.getByRole('button', { name: 'Próxima imagem' }).click();
  await expect(gallery.locator('.foundation-carousel-caption')).toContainText(
    'Natan Feijó Tristão',
  );

  await page.goto(haquantum);
  const ha = page.getByRole('region', { name: 'Galeria do HaQuantum' });
  await expect(ha.locator('.base-carousel-primary img')).toHaveAttribute(
    'src',
    /HaQuantum1\.webp$/,
  );
  await ha.getByRole('button', { name: 'Próxima foto' }).click();
  await expect(ha.locator('.base-carousel-primary img')).toHaveAttribute(
    'src',
    /HaQuantum2\.webp$/,
  );

  await page.goto(manifesto);
  const visits = page.getByRole('region', {
    name: 'Galeria de Visitas Técnicas do Instituto Foton',
  });
  await expect(visits).toBeVisible();
  await expect(visits.locator('.base-carousel-count')).toHaveText('1 / 20');
  await visits.getByRole('button', { name: 'Mostrar miniaturas' }).click();
  await expect(visits.getByRole('button', { name: /Selecionar visita/ })).toHaveCount(20);
  await visits.getByRole('button', { name: 'Selecionar visita 20' }).click();
  await expect(visits.locator('.base-carousel-count')).toHaveText('20 / 20');
  await visits.getByRole('button', { name: 'Próximas visitas' }).click();
  await expect(visits.locator('.base-carousel-count')).toHaveText('1 / 20');
  await visits.getByRole('button', { name: 'Ampliar Visita técnica 01' }).click();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', /Visita01\.png$/);
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Baixar PNG original' })).toHaveAttribute('href', /Visita01\.png$/);
  await page.getByRole('button', { name: 'Fechar galeria' }).click();
});

test('Carrosséis migrados: breakpoints sem overflow horizontal', async ({ page }) => {
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const url of [news, foundation, haquantum, manifesto]) {
      await page.goto(url);
      await expect(page.locator('.base-carousel').first()).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(overflow, url + ' em ' + width + 'px').toBeLessThanOrEqual(1);
    }
  }
});
