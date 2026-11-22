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
});
