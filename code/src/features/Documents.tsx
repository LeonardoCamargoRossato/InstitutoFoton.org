import { lazy, Suspense, useCallback } from 'react';
import { Intro } from '../components/ui';
import { documents, documentUrl } from '../lib/backend';
import { useResource } from '../lib/useResource';
import { useLanguage } from '../i18n';
const PdfViewer = lazy(() => import('./PdfViewer'));

export function Presentation() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const loader = useCallback(() => documents('presentation'), []);
  const resource = useResource(loader);
  const doc = resource.data?.[0];
  const remoteUrl = doc ? documentUrl(doc) : undefined;
  const url =
    remoteUrl || `${import.meta.env.BASE_URL}documents/apresentacao-institucional-2026-09-10.pdf`;
  return (
    <>
      <Intro
        eyebrow={english ? 'Institutional presentation' : 'Apresentação institucional'}
        title={english ? 'Discover Foton up close.' : 'Conheça o Foton mais de perto.'}
      >
        <p>
          {english
            ? 'Science, purpose, and connections. Discover Foton’s identity and initiatives.'
            : 'Ciência, propósito e conexões. Conheça a identidade e as iniciativas do Foton.'}
        </p>
      </Intro>
      <section className="section section-gray">
        <div className="container">
          <Suspense fallback={<p role="status">{english ? 'Preparing the viewer…' : 'Preparando o visualizador…'}</p>}>
            <PdfViewer key={url} url={url} allowExport={doc?.allow_page_export ?? true} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
