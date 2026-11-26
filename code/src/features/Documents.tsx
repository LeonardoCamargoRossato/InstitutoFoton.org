import { lazy, Suspense, useCallback } from 'react';
import { Intro } from '../components/ui';
import { documents, documentUrl } from '../lib/backend';
import { useResource } from '../lib/useResource';
import { useLanguage } from '../i18n';
import { localizedCopy } from '../i18n/localizedCopy';
const PdfViewer = lazy(() => import('./PdfViewer'));

export function Presentation() {
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  const loader = useCallback(() => documents('presentation'), []);
  const resource = useResource(loader);
  const doc = resource.data?.[0];
  const remoteUrl = doc ? documentUrl(doc) : undefined;
  const url =
    remoteUrl || `${import.meta.env.BASE_URL}documents/apresentacao-institucional-2026-09-10.pdf`;
  return (
    <>
      <Intro
        eyebrow={copy('Apresentação institucional', 'Institutional presentation')}
        title={copy('Conheça o Foton mais de perto.', 'Discover Foton up close.')}
      >
        <p>
          {copy('Ciência, propósito e conexões. Conheça a identidade e as iniciativas do Foton.', 'Science, purpose, and connections. Discover Foton’s identity and initiatives.')}
        </p>
      </Intro>
      <section className="section section-gray">
        <div className="container">
          <Suspense
            fallback={
              <p role="status">
                {copy('Preparando o visualizador…', 'Preparing the viewer…')}
              </p>
            }
          >
            <PdfViewer key={url} url={url} allowExport={doc?.allow_page_export ?? true} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
