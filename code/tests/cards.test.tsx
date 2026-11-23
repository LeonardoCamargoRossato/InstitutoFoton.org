import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import {
  InfoCard,
  ActionCard,
  ProfileCard,
  ImageCard,
  cardAppearance,
} from '../src/components/cards';
import { cardPresets } from '../src/components/cards';

describe('LCR Card Library', () => {
  it('impede hover enganoso em todos os cards informativos', () => {
    const attr = cardAppearance('legacy-card', { hover: 'lift' }, false);
    expect(attr['data-card-hover']).toBe('none');
    const html = renderToStaticMarkup(
      <InfoCard className="legacy-card">
        <h3>Missão</h3>
      </InfoCard>,
    );
    expect(html).toContain('<article');
    expect(html).toContain('foton-card--informative');
    expect(html).toContain('data-card-hover="none"');
    expect(html).not.toContain('role="button"');
  });

  it('gera link interno nativo e mantém rótulo acessível', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <ActionCard to="/pesquisa" label="Conhecer pesquisa">
          Conhecer a pesquisa
        </ActionCard>
      </MemoryRouter>,
    );
    expect(html).toContain('href="/pesquisa"');
    expect(html).toContain('aria-label="Conhecer pesquisa"');
    expect(html).toContain('data-card-hover="lift"');
  });

  it('não cria link externo em endereço não autorizado', () => {
    const html = renderToStaticMarkup(<ActionCard href="javascript:alert(1)">Fonte</ActionCard>);
    expect(html).not.toContain('<a');
    expect(html).toContain('foton-card--informative');
  });

  it('perfil é botão com ação explícita e não aninha controles', () => {
    const html = renderToStaticMarkup(
      <ProfileCard label="Perfil da pesquisadora" onOpen={() => {}}>
        <strong>Pesquisadora</strong>
      </ProfileCard>,
    );
    expect(html).toContain('<button');
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-label="Perfil da pesquisadora"');
    expect(html).not.toContain('<a');
  });

  it('imagem preserva preview e nunca troca sem imagem alternativa aprovada', () => {
    const html = renderToStaticMarkup(
      <ImageCard
        label="Ampliar evento"
        onOpen={() => {}}
        imagem={{ src: '/preview.webp', alt: 'Evento', width: 1600, height: 900 }}
        estiloGrafico={{ ...cardPresets.fotografia, hover: 'image-swap' }}
      />,
    );
    expect(html).toContain('/preview.webp');
    expect(html).toContain('alt="Evento"');
    expect(html).toContain('data-card-hover="image-zoom"');
    expect(html).not.toContain('foton-card-image--alternate');
  });

  it('troca de imagem só é habilitada quando duas fontes existem', () => {
    const html = renderToStaticMarkup(
      <ImageCard
        label="Ver foto"
        onOpen={() => {}}
        imagem={{ src: '/principal.webp', alt: 'Principal' }}
        imagemAlternativa={{ src: '/alternativa.webp', alt: 'Alternativa' }}
        estiloGrafico={{ hover: 'image-swap' }}
      />,
    );
    expect(html).toContain('data-card-hover="image-swap"');
    expect(html).toContain('/alternativa.webp');
  });
  it('preserva o DOM e os estilos legados de uma etapa informativa', () => {
    const html = renderToStaticMarkup(
      <InfoCard
        as="li"
        inheritVisuals
        className="value-keyword"
        catalogId="2.A.8.C1"
      >
        <strong>Excelência</strong>
      </InfoCard>,
    );
    expect(html).toContain('<li');
    expect(html).toContain('data-lcr-card-id="2.A.8.C1"');
    expect(html).toContain('data-card-hover="none"');
    expect(html).toContain('class="foton-card foton-card--legacy foton-card--informative value-keyword"');
    expect(html).not.toContain('data-card-radius=');
    expect(html).not.toContain('href=');
  });

  it('preserva link de parceiro e título no modo CSS legado', () => {
    const html = renderToStaticMarkup(
      <ActionCard
        href="https://example.org/"
        title="Instituição parceira"
        label="Abrir instituição"
        className="partner-card"
        inheritVisuals
        catalogId="3.2.C-123"
      >
        <img alt="Instituição" src="/logo.svg" />
      </ActionCard>,
    );
    expect(html).toContain('<a');
    expect(html).toContain('href="https://example.org/"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('data-lcr-card-id="3.2.C-123"');
    expect(html).toContain('class="foton-card foton-card--legacy foton-card--legacy-interactive partner-card"');
    expect(html).not.toContain('data-card-shadow=');
  });

  it('documento informativo pode conter ações distintas sem aninhar links', () => {
    const html = renderToStaticMarkup(
      <InfoCard inheritVisuals className="transparency-document" catalogId="8.2.C-pdf">
        <h3>Documento</h3>
        <a href="/documento.pdf">Visualizar</a>
        <button type="button">Baixar</button>
      </InfoCard>,
    );
    expect(html).toContain('data-lcr-card-id="8.2.C-pdf"');
    expect(html).toContain('<article');
    expect(html).toContain('<a');
    expect(html).toContain('<button');
    expect(html).not.toContain('data-card-hover="lift"');
  });

});
