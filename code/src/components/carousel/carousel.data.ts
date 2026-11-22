import type { CarouselItem, CarouselPNGImage, CarouselWebPImage } from './carousel.types';

/** Pareamento obrigatório por ID, nunca pela posição das duas listas. */
export function pairCarouselItems(
  listaWebP: readonly CarouselWebPImage[],
  listaPNG: readonly CarouselPNGImage[],
): CarouselItem[] {
  const originals = new Map<string, CarouselPNGImage>();
  for (const original of listaPNG) {
    if (!original.id || !original.src || originals.has(original.id)) {
      throw new Error('PNG ausente ou identificador original duplicado no carrossel');
    }
    originals.set(original.id, original);
  }
  const seen = new Set<string>();
  return listaWebP.map((preview) => {
    if (!preview.id || !preview.src || !preview.alt || seen.has(preview.id)) {
      throw new Error('WebP incompleto ou identificador duplicado no carrossel');
    }
    seen.add(preview.id);
    const original = originals.get(preview.id);
    if (!original) throw new Error('Carrossel sem PNG original para o ID: ' + preview.id);
    return { preview, original };
  });
}

export function carouselIndex(index: number, total: number): number {
  return total > 0 ? ((index % total) + total) % total : 0;
}
