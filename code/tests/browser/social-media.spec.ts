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
      await expect(dropdown.locator('.nav-dropdown-links a')).toHaveText(['Notícias', 'Redes sociais']);
      await dropdown.getByRole('link', { name: target.name, exact: true }).click();
      await expect(page).toHaveURL(target.path);
    }
  }
});

test('Redes sociais: títulos, links oficiais e catálogo verificado', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    if (/instagram\.com|linkedin\.com/.test(request.url())) externalRequests.push(request.url());
  });
  await page.goto('./redes-sociais');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Acompanhe o Foton nas redes sociais',
  );
  await expect(page.getByText(/A ciência também acontece nos encontros/)).toBeVisible();
  const instagram = page.locator('.social-network--instagram');
  const linkedIn = page.locator('.social-network--linkedin');
  await expect(instagram.getByRole('link', { name: /Seguir no Instagram/ })).toHaveAttribute(
    'href', instagramProfile,
  );
  await expect(linkedIn.getByRole('link', { name: /Acompanhar no LinkedIn/ })).toHaveAttribute(
    'href', linkedInProfile,
  );
  for (const link of await page.locator('.social-network .social-profile-link').all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener noreferrer/);
  }
  await expect(instagram.getByText('Publicações do Instagram em preparação')).toBeVisible();
  await expect(instagram.locator('img, iframe')).toHaveCount(0);
  await expect(linkedIn.locator('.social-post-tile')).toHaveCount(3);
  await expect(linkedIn.getByText('Publicação 1 de 3')).toBeVisible();
  expect(externalRequests).toEqual([]);
  await expect(page).toHaveTitle(/Acompanhe o Foton nas redes sociais/);
});

test('LinkedIn: navegar entre publicações reais e carregar embed apenas após clicar', async ({
  page,
}) => {
  await page.goto('./redes-sociais');
  const social = page.locator('.social-network--linkedin');
  await social.getByRole('button', { name: 'Próxima publicação' }).click();
  await expect(social.getByText('Publicação 2 de 3')).toBeVisible();
  await expect(social.getByRole('link', { name: /Abrir publicação original/ })).toHaveAttribute(
    'href', /linkedin\.com\/posts\/fotonictq_.*activity-7447012732123557889/,
  );
  await social.getByRole('button', { name: /Selecionar publicação 3/ }).click();
  await expect(social.getByText('Publicação 3 de 3')).toBeVisible();
  await expect(social.locator('iframe')).toHaveCount(0);
  await social.getByRole('button', { name: 'Visualizar publicação aqui' }).click();
  await expect(social.locator('iframe')).toHaveAttribute(
    'src',
    'https://www.linkedin.com/embed/feed/update/urn:li:activity:7440418796294754306',
  );
  await expect(social.getByRole('link', { name: /Abrir publicação original/ })).toHaveAttribute(
    'target', '_blank',
  );
  await social.getByRole('button', { name: 'Publicação anterior' }).click();
  await expect(social.locator('iframe')).toHaveCount(0);
});

test('Redes sociais: navegação por teclado, responsividade e acessibilidade', async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('./redes-sociais');
    const widthOverflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(widthOverflow).toBeLessThanOrEqual(1);
    const next = page.getByRole('button', { name: 'Próxima publicação' });
    await next.focus();
    await expect(next).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByText('Publicação 2 de 3')).toBeVisible();
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
