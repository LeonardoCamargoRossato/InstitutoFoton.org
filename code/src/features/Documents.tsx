import { lazy, Suspense, useCallback } from 'react';
import { Intro, TextLink } from '../components/UI';
import { documents, documentUrl } from '../lib/backend';
import { useResource } from '../lib/useResource';
import TransparencyBoard from './TransparencyBoard';
const PdfViewer = lazy(() => import('./PdfViewer'));

export function Transparency() {
  return <TransparencyBoard />;
}

export function Presentation() {
  const loader = useCallback(() => documents('presentation'), []);
  const resource = useResource(loader);
  const doc = resource.data?.[0];
  const remoteUrl = doc ? documentUrl(doc) : undefined;
  // Cópia local aprovada da apresentação fornecida para este portal. Manual da marca permanece privado.
  const url =
    remoteUrl || `${import.meta.env.BASE_URL}documents/apresentacao-institucional-2026-09-10.pdf`;
  return (
    <>
      <Intro eyebrow="Apresentação institucional" title="Conheça o Foton mais de perto.">
        <p>Ciência, propósito e conexões. Apresentação institucional de 10 de setembro de 2026.</p>
      </Intro>
      <section className="section section-gray">
        <div className="container">
          <Suspense fallback={<p role="status">Preparando o visualizador…</p>}>
            <PdfViewer key={url} url={url} allowExport={doc?.allow_page_export ?? true} />
          </Suspense>
          <TextLink to="/transparencia">Documentos e transparência</TextLink>
        </div>
      </section>
    </>
  );
}
