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

  it('separa os dois carrosséis do Quantum Day e preserva os pares PNG/WebP', () => {
    const day1 = newsMedia.filter((media) => media.group === 'quantum-day-1');
    const day2 = newsMedia.filter((media) => media.group === 'quantum-day-2');
    expect(day1).toHaveLength(5);
    expect(day2).toHaveLength(10);
    for (const [group, images] of [
      ['QuantumDay1', day1],
      ['QuantumDay2', day2],
    ] as const) {
      for (const image of images) {
        expect(image.original).toContain('/PNG/' + group + '/');
        expect(image.preview).toContain('/WebP/' + group + '/');
        expect(image.original.endsWith(image.name)).toBe(true);
        expect(image.preview.endsWith(image.name.replace('.png', '.webp'))).toBe(true);
      }
      expect(new Set(images.map((image) => image.name)).size).toBe(images.length);
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
