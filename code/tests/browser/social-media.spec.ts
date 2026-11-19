import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const instagramProfile = 'https://www.instagram.com/institutofoton?bqrl=MW54N3RiZjU1a3hncA==';
const linkedInProfile = 'https://www.linkedin.com/company/fotonictq/';

test('submenu Notícias mantém as rotas de notícias e abre Redes sociais no desktop e celular', async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const target of [
      { name: 'Notícias', path: /\/noticias$/ },
      { name: 'Redes sociais', path: /\/redes-sociais$/ },
    ]) {
      await page.goto('./');
      if (width < 1000) await page.getByRole('button', { name: 'Abrir menu' }).click();
      const nav = page.getByRole('navigation', { name: 'Navegação principal' });
      const dropdown = nav.locator('details.nav-dropdown').filter({ hasText: 'Redes sociais' });
      await expect(dropdown.locator('summary')).toHaveText('Notícias');
      await dropdown.locator('summary').focus();
      await page.keyboard.press('Enter');
      await expect(dropdown).toHaveAttribute('open', '');
      await expect(dropdown.locator('.nav-dropdown-links a')).toHaveText([
        'Notícias',
        'Redes sociais',
      ]);
      await dropdown.getByRole('link', { name: target.name, exact: true }).click();
      await expect(page).toHaveURL(target.path);
    }
  }
});

test('Redes sociais: links, imagens e navegação simplificada', async ({ page }) => {
  await page.goto('./redes-sociais');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Acompanhe o Foton nas redes sociais',
  );
  const instagram = page.locator('.social-network--instagram');
  const linkedIn = page.locator('.social-network--linkedin');
  const youtube = page.locator('.social-network--youtube');
  await expect(instagram.getByRole('link', { name: /Seguir no Instagram/ })).toHaveAttribute(
    'href',
    instagramProfile,
  );
  await expect(linkedIn.getByRole('link', { name: /Acompanhar no LinkedIn/ })).toHaveAttribute(
    'href',
    linkedInProfile,
  );
  await expect(instagram.getByRole('button', { name: /Visualizar prévia/ })).toHaveCount(0);
  await expect(instagram.locator('iframe')).toHaveCount(0);
  await expect(linkedIn.locator('.social-gallery')).toHaveCount(0);
  await expect(linkedIn.locator('iframe')).toHaveCount(0);
  await expect(youtube.getByRole('heading', { name: 'Instituto Foton no YouTube' })).toBeVisible();
  const anchors = page.locator('.social-quick-links a');
  await expect(anchors).toHaveCount(3);
  await expect(anchors).toHaveText(['Instagram', 'LinkedIn', 'YouTube']);
  await expect(anchors.nth(0)).toHaveAttribute('href', '#social-instagram-title');
  await expect(anchors.nth(1)).toHaveAttribute('href', '#social-linkedin-title');
  await expect(anchors.nth(2)).toHaveAttribute('href', '#social-youtube-title');
});

test('Instagram: SVG original sem card nem arte sobreposta, texto à esquerda e mão à direita', async ({
  page,
}) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./redes-sociais');
    const section = page.locator('.social-network--instagram');
    const layout = section.locator('.social-instagram-highlight');
    const copy = section.locator('.social-instagram-highlight__content');
    const visual = section.locator('.social-instagram-highlight__visual');
    const image = section.locator('img.social-instagram-highlight__phone');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('src', /InstagramPhoneHand\.svg$/);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('naturalWidth', 1080, { timeout: 15000 });
    await expect(layout).toHaveCSS('border-top-width', '0px');
    await expect(layout).toHaveCSS('background-image', 'none');
    await expect(section.locator('.social-instagram-highlight__phone-mark')).toHaveCount(0);
    const metrics = await image.evaluate((node) => {
      const imageElement = node as HTMLImageElement;
      return {
        complete: imageElement.complete,
        width: imageElement.naturalWidth,
        height: imageElement.naturalHeight,
      };
    });
    expect(metrics.complete).toBe(true);
    expect(metrics.width).toBe(1080);
    expect(metrics.height).toBe(1920);
    const copyBox = await copy.boundingBox();
    const visualBox = await visual.boundingBox();
    const imageBox = await image.boundingBox();
    expect(copyBox).not.toBeNull();
    expect(visualBox).not.toBeNull();
    expect(imageBox).not.toBeNull();
    if (width <= 880) {
      expect(copyBox!.y + copyBox!.height).toBeLessThanOrEqual(visualBox!.y + 1);
    } else {
      expect(copyBox!.x + copyBox!.width).toBeLessThanOrEqual(visualBox!.x + 1);
      expect(imageBox!.x + imageBox!.width).toBeGreaterThan(visualBox!.x + visualBox!.width);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(section.getByText('@institutofoton').first()).toBeVisible();
  }
});

test('LinkedIn: tablet à esquerda e textos à direita, com WebP e PNG ampliável', async ({
  page,
}) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./redes-sociais');
    const section = page.locator('.social-network--linkedin');
    const content = section.locator('.social-linkedin-highlight__content');
    const visual = section.locator('.social-linkedin-highlight__visual');
    const image = visual.locator('img.social-linkedin-highlight__tablet');
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty('naturalWidth', 1448);
    await expect(image).toHaveJSProperty('naturalHeight', 1086);
    expect(await visual.locator('source').getAttribute('srcset')).toContain('LinkedInTablet.webp');
    expect(
      await visual.getByRole('link', { name: /Ampliar imagem ilustrativa/ }).getAttribute('href'),
    ).toContain('LinkedInTablet.png');
    const contentBox = await content.boundingBox();
    const visualBox = await visual.boundingBox();
    expect(contentBox).not.toBeNull();
    expect(visualBox).not.toBeNull();
    if (width > 880) {
      expect(visualBox!.x + visualBox!.width).toBeLessThanOrEqual(contentBox!.x + 1);
    } else {
      expect(contentBox!.y + contentBox!.height).toBeLessThanOrEqual(visualBox!.y + 1);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('Redes sociais: responsividade e acessibilidade', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('./redes-sociais');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(result.violations.map((v) => v.id)).toEqual([]);
  }
});

test('artigo continua acessível na rota existente de Notícias', async ({ page }) => {
  await page.goto('./noticias/lancamento-lacq-pucrs-instituto-foton');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('LACQ PUCRS');
});
