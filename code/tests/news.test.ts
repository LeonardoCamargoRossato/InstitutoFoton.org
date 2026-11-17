import { describe, expect, it } from 'vitest';
import publications from '../src/content/publications.json';
import newsMedia from '../src/content/news-media.json';

const newSlugs = [
  'lancamento-lacq-pucrs-instituto-foton',
  'uniso-quantum-day-entrega-projeto-leonti',
  'parceria-instituto-foton-gravatai-inovacao',
  'foton-mobi-quantum-festival-2026',
];

describe('notícias institucionais verificáveis', () => {
  it('publica oito matérias únicas, ordenadas por data decrescente', () => {
    const slugs = publications.map((p) => p.slug);
    expect(publications).toHaveLength(8);
    expect(new Set(slugs).size).toBe(8);
    expect(publications.map((p) => p.published_at)).toEqual(
      [...publications.map((p) => p.published_at)].sort().reverse(),
    );
    expect(slugs.filter((slug) => slug.includes('cubotech'))).toHaveLength(1);
  });

  it('não inventa fotografias e exige fontes públicas nas novas notícias', () => {
    for (const slug of newSlugs) {
      const item = publications.find((p) => p.slug === slug);
      expect(item).toBeDefined();
      if (slug === 'foton-mobi-quantum-festival-2026') {
        expect(item?.main_image_path).toContain('QuantumBusiness1.webp');
      } else {
        expect(item?.main_image_path).toBeNull();
      }
      expect(item?.source_url).toMatch(/^https:\/\//);
      expect(item?.source_name).toBeTruthy();
      expect(item?.body.length).toBeGreaterThan(500);
    }
  });

  it('mantém nove pares PNG/WebP Quantum Business na ordem correta', () => {
    const images = newsMedia.filter((media) => media.group === 'mobi-quantum');
    expect(images).toHaveLength(9);
    for (const [index, media] of images.entries()) {
      const name = `QuantumBusiness${index + 1}`;
      expect(media.name).toBe(`${name}.png`);
      expect(media.original).toContain(`/PNG/${name}.png`);
      expect(media.preview).toContain(`/WebP/${name}.webp`);
      expect(media.alt).toContain('Mobi Festival');
    }
  });

  it('separa protótipo Leonti, contratação sem repasses e anúncio do Mobi', () => {
    const uniso = publications.find((p) => p.slug === newSlugs[1]);
    const gravatai = publications.find((p) => p.slug === newSlugs[2]);
    const mobi = publications.find((p) => p.slug === newSlugs[3]);
    expect(uniso?.body).toContain('protótipo de computador quântico fotônico');
    expect(uniso?.body).toContain('não comprova');
    expect(gravatai?.body).toContain('não possui vinculação financeira');
    expect(mobi?.body).toContain('anunciado');
  });
});
