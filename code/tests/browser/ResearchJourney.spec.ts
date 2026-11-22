import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

const researchLines = JSON.parse(readFileSync('src/content/research-lines.json', 'utf8')) as {
  slug: string;
  title: string;
  summary: string;
  topics: string[];
}[];
const researchMedia = JSON.parse(readFileSync('src/content/research-media.json', 'utf8')) as {
  haquantum: { path: string; previewPath: string; width: number; height: number }[];
};

const title = 'Pesquisa e Jornada do Cientista Inovador';
const journey = 'Jornada do Cientista Inovador';
const haQuantum = 'HaQuantum — Hackathon de Tecnologias Quânticas';
const pulso = 'Quantum Pathway — Encerramento da Etapa Pulso';

test('menu unificado e seis áreas de pesquisa abrem suas páginas canônicas', async ({ page }) => {
  await page.goto('./pesquisa');
  const mainNav = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(
    mainNav.locator('summary').filter({ hasText: 'P&D - Cientista Inovador' }),
  ).toHaveCount(1);
  await expect(mainNav.getByRole('link', { name: 'Pesquisa', exact: true })).toHaveCount(0);
  await expect(
    mainNav
      .locator('details.nav-dropdown')
      .filter({ hasText: 'P&D - Cientista Inovador' })
      .locator('.nav-dropdown-links a'),
  ).toHaveCount(3);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await expect(page.getByRole('main').getByRole('heading', { level: 2 })).toHaveText([
    'Áreas de pesquisa',
    journey,
    'A ciência ganha força quando é compartilhada.',
    pulso,
    haQuantum,
  ]);
  const cards = page.locator('.research-areas .research-card');
  await expect(cards).toHaveCount(6);
  for (const line of researchLines) {
    const card = cards.filter({
      has: page.getByRole('heading', { name: line.title, exact: true }),
    });
    await expect(card).toContainText(line.summary);
    await card.click();
    await expect(page).toHaveURL(new RegExp(`/pesquisa/${line.slug}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(line.title);
    await expect(page.locator('.topic-list li')).toHaveText(line.topics);
    await page.getByRole('link', { name: 'Todas as áreas' }).click();
    await expect(page).toHaveURL(/\/pesquisa#areas-de-pesquisa$/);
  }
});

test('Jornada detalha a trilha, e /jornada redireciona preservando query e âncora', async ({
  page,
}) => {
  await page.goto('./pesquisa');
  await page.getByRole('link', { name: 'Conheça a Jornada', exact: true }).click();
  await expect(page).toHaveURL(/\/pesquisa\/jornada$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(journey);
  await expect(
    page.getByRole('list', { name: 'Etapas do Quantum Pathway' }).getByRole('heading'),
  ).toHaveText(['Pulso', 'Lumina', 'Ressonância', 'Superposição', 'Entrelace']);
  await expect(
    page.getByText(/participação é educacional, colaborativa e voluntária/i),
  ).toBeVisible();
  await page.goto('./jornada?origem=link-antigo#quantum-pathway');
  await expect(page).toHaveURL(/\/pesquisa\/jornada\?origem=link-antigo#quantum-pathway$/);
  await expect(
    page.getByRole('heading', { name: 'Quantum Pathway', exact: true }),
  ).toBeInViewport();
});

test('Etapa Pulso mostra a miniatura oficial e abre a transmissão no YouTube só após o clique', async ({
  page,
  context,
}) => {
  const watchUrl = 'https://www.youtube.com/watch?v=zxOZy4FIk-c';
  const playerRequests: string[] = [];
  await context.route(/youtube(?:-nocookie)?\.com\//, (route) => {
    playerRequests.push(route.request().url());
    return route.fulfill({ body: 'YouTube', contentType: 'text/plain' });
  });
  await page.goto('./pesquisa');
  const section = page.locator('#etapa-pulso');
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByRole('heading', { name: pulso })).toBeVisible();
  await expect(section.locator('time')).toHaveText('28 de março de 2026');
  await expect(section.locator('iframe')).toHaveCount(0);
  expect(playerRequests).toEqual([]);
  await expect(section.locator('img')).toHaveAttribute('src', /\/EtapaPulsoYouTube\.webp$/);
  await expect(section.locator('img')).toHaveJSProperty('naturalWidth', 1280);
  await expect(
    section.getByRole('link', { name: /Assistir à transmissão completa/ }),
  ).toHaveAttribute('href', watchUrl);
  const [video] = await Promise.all([
    page.waitForEvent('popup'),
    section.getByRole('link', { name: /Abrir o vídeo da Etapa Pulso/ }).click(),
  ]);
  await expect(video).toHaveURL(watchUrl);
  await expect.poll(() => playerRequests.includes(watchUrl)).toBe(true);
  await video.close();
});

test('HaQuantum tem registro histórico, WebP no carrossel, PNG no zoom e regulamento oficial', async ({
  page,
}) => {
  const pngRequests: string[] = [];
  page.on('request', (request) => {
    const url = decodeURIComponent(request.url());
    if (url.includes('/04C - HaQuantum/Galeria HaQuantum/PNG/') && url.endsWith('.png')) {
      pngRequests.push(url);
    }
  });
  await page.goto('./pesquisa');
  const gallery = page.getByRole('region', { name: 'Galeria do HaQuantum' });
  await gallery.scrollIntoViewIfNeeded();
  const primary = gallery.locator('.base-carousel-primary img');
  await expect(primary).toHaveCount(1);
  await expect(gallery.locator('.base-carousel-count')).toHaveText('1 / 8');

  // A vitrine carrega apenas a foto ativa; as outras WebP entram por navegação.
  for (const [index, photo] of researchMedia.haquantum.entries()) {
    await expect(primary).toHaveAttribute('src', new RegExp(photo.previewPath.split('/').at(-1) + '$'));
    await expect(primary).toHaveAttribute('width', String(photo.width));
    await expect(primary).toHaveAttribute('height', String(photo.height));
    if (index < researchMedia.haquantum.length - 1) {
      await gallery.getByRole('button', { name: 'Próxima foto' }).click();
    }
  }
  await expect(gallery.locator('.base-carousel-count')).toHaveText('8 / 8');
  expect(pngRequests).toEqual([]);

  await gallery.getByRole('button', { name: 'Próxima foto' }).click();
  await expect(gallery.locator('.base-carousel-count')).toHaveText('1 / 8');
  await gallery.getByRole('button', { name: 'Foto anterior' }).click();
  await expect(gallery.locator('.base-carousel-count')).toHaveText('8 / 8');
  await gallery.getByRole('button', { name: 'Mostrar miniaturas' }).click();
  await expect(gallery.getByRole('button', { name: /Selecionar foto/ })).toHaveCount(8);

  const last = gallery.getByRole('button', { name: /^Ampliar foto 8\./ });
  await last.click();
  const dialog = page.getByRole('dialog', { name: 'HaQuantum · Foto 8' });
  await expect(dialog.getByRole('img')).toHaveAttribute('src', /\/HaQuantum9\.png$/);
  await expect.poll(() => pngRequests.some((url) => url.endsWith('/HaQuantum9.png'))).toBe(true);
  await expect(dialog.getByRole('img')).toHaveJSProperty('naturalWidth', 960);
  await dialog.getByRole('button', { name: 'Ampliar imagem' }).click();
  await expect(dialog.getByRole('textbox', { name: 'Percentual do zoom' })).toHaveValue('125%');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(last).toBeFocused();

  await page.getByRole('link', { name: 'Saiba mais sobre o HaQuantum' }).click();
  await expect(page).toHaveURL(/\/pesquisa\/haquantum$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(haQuantum);
  await expect(page.locator('.page-intro .research-date')).toHaveText(
    '9 de maio a 11 de junho de 2026',
  );
  await expect(page.getByRole('link', { name: /Consultar regulamento oficial/ })).toHaveAttribute(
    'href',
    'https://drive.google.com/file/d/1O-z8Br-EllIzKcj0cNmUPer1jfKGPmnl/view',
  );
  await expect(page.getByRole('link', { name: /inscreva|inscriç/i })).toHaveCount(0);
});

test('navegação e layout cabem em desktop, tablet e celular', async ({ page }) => {
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['./pesquisa', './pesquisa/jornada', './pesquisa/haquantum']) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        width,
      );
    }
    const toggle = page.getByRole('button', { name: 'Abrir menu' });
    if (await toggle.isVisible()) await toggle.click();
    const mainNav = page.getByRole('navigation', { name: 'Navegação principal' });
    await expect(
      mainNav.locator('summary').filter({ hasText: 'P&D - Cientista Inovador' }),
    ).toBeVisible();
    const navWidth = await mainNav.evaluate((nav) => nav.getBoundingClientRect().right);
    expect(navWidth).toBeLessThanOrEqual(width);
  }
});

test('as novas páginas passam nas verificações automatizadas de acessibilidade', async ({
  page,
}) => {
  for (const path of ['./pesquisa', './pesquisa/jornada', './pesquisa/haquantum']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map(({ id, nodes }) => [id, nodes.map((node) => node.target)]),
    ).toEqual([]);
  }
});
