import { describe, expect, it } from 'vitest';
import { carouselIndex, pairCarouselItems } from '../src/components/carousel/carousel.data';

const image = (id: string) => ({ id, src: `preview-${id}.webp`, alt: `Foto ${id}` });
const original = (id: string) => ({ id, src: `original-${id}.png` });

describe('carrossel universal: identidade e navegação', () => {
  it.each([1, 2, 13])('associa %i imagens pelo ID e não pela posição', (count) => {
    const ids = Array.from({ length: count }, (_, index) => String(index + 1));
    const result = pairCarouselItems(ids.map(image), [...ids].reverse().map(original));
    expect(result).toHaveLength(count);
    expect(result.map((entry) => entry.original.id)).toEqual(ids);
    expect(result.every((entry) => entry.original.src.endsWith('.png'))).toBe(true);
  });

  it('navega circularmente nos dois sentidos, inclusive nas bordas', () => {
    expect(carouselIndex(-1, 13)).toBe(12);
    expect(carouselIndex(13, 13)).toBe(0);
    expect(carouselIndex(2, 2)).toBe(0);
    expect(carouselIndex(-1, 1)).toBe(0);
    expect(carouselIndex(0, 0)).toBe(0);
  });

  it('rejeita IDs ausentes e duplicados e jamais substitui um original por posição', () => {
    expect(() => pairCarouselItems([image('a')], [original('b')])).toThrow(/sem PNG/);
    expect(() => pairCarouselItems([image('a'), image('a')], [original('a')])).toThrow(/duplicado/);
    expect(() => pairCarouselItems([image('a')], [original('a'), original('a')])).toThrow(
      /duplicado/,
    );
  });
});
