import { useState, type ReactNode } from 'react';

// As imagens já são referenciadas pela galeria pública do Manifesto.
// Não presumir a presença do arquivo nem a identidade das pessoas fotografadas.
const configuredSupabase = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, '');
const storage = (configuredSupabase || 'https://qvyrromhazssofombhem.supabase.co') +
  '/storage/v1/object/public/foton-public/img-visitas-tecnicas';

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
  const src = storage + '/visita-' + String(index).padStart(2, '0') + '.png';

  return (
    <figure className={'foton-photo ' + className} data-photo-status={failed ? 'unavailable' : 'requested'}>
      {failed ? (
        fallback || (
          <div className="foton-photo-placeholder" role="status">
            <span>Instituto Foton</span>
            <strong>Ciência. Pessoas. Possibilidades.</strong>
            <small>Registro fotográfico temporariamente indisponível.</small>
          </div>
        )
      ) : (
        <img
          src={src}
          width={1200}
          height={900}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          sizes="(max-width: 700px) 100vw, 50vw"
          onError={() => setFailed(true)}
        />
      )}
      {!failed && (
        <figcaption>
          <span className="photo-caption-mark" aria-hidden="true" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
