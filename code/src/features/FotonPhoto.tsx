import { useState, type ReactNode } from 'react';

// Apenas imagens provisórias de pessoas fictícias geradas por IA.
// Substituir o mapeamento por fotografias reais autorizadas quando disponíveis.
const illustrationByIndex: Record<number, { path: string; width: number; height: number }> = {
  1: { path: 'foton-pessoas-laboratorio.webp', width: 400, height: 145 },
  2: { path: 'foton-pessoas-formacao.webp', width: 400, height: 112 },
  3: { path: 'foton-pessoas-colaboracao.webp', width: 400, height: 121 },
  4: { path: 'foton-pessoas-colaboracao.webp', width: 400, height: 121 },
};

export function FotonPhoto({
  index,
  alt,
  caption,
  priority = false,
  className = '',
  fallback,
}: {
  index: number;
  alt: string;
  caption: string;
  priority?: boolean;
  className?: string;
  fallback?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const photo = illustrationByIndex[index];
  const src = photo ? import.meta.env.BASE_URL + 'images/illustrative/' + photo.path : '';

  return (
    <figure className={'foton-photo ' + className}
      data-photo-status={!photo || failed ? 'unavailable' : 'illustrative'}
      data-media-kind="ai-illustration">
      {!photo || failed ? (
        fallback || (
          <div className="foton-photo-placeholder" role="status">
            <span>Instituto Foton</span>
            <strong>Ciência. Pessoas. Possibilidades.</strong>
            <small>Imagem demonstrativa temporariamente indisponível.</small>
          </div>
        )
      ) : (
        <img
          src={src}
          width={photo.width}
          height={photo.height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          onError={() => setFailed(true)}
        />
      )}
      {!!photo && !failed && (
        <figcaption>
          <span className="photo-caption-mark" aria-hidden="true" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
