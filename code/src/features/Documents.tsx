import { lazy, Suspense, useCallback } from 'react';
import { FileText } from 'lucide-react';
import { Intro, Heading, Status, Empty, External, TextLink } from '../components/UI';
import { documents, documentUrl } from '../lib/backend';
import { useResource } from '../lib/useResource';
import { dateLabel } from '../lib/config';
const PdfViewer = lazy(() => import('./PdfViewer'));

export function Transparency() {
  const resource = useResource(documents);
  return (
    <>
      <Intro eyebrow="Transparência" title="Confiança se constrói com clareza.">
        <p>
          Documentos, fontes e responsabilidade pelo que compartilhamos. Um espaço para acompanhar a
          atuação institucional.
        </p>
      </Intro>
      <section className="section">
        <div className="container">
          <Heading
            eyebrow="Documentos institucionais"
            title="Informação pública, com responsabilidade."
          />
          <Status {...resource} />
          {!resource.loading &&
            !resource.error &&
            (resource.data?.length ? (
              <div className="document-list">
                {resource.data.map((doc) => (
                  <article key={doc.id}>
                    <FileText aria-hidden="true" />
                    <div>
                      <h3>{doc.title}</h3>
                      <p>{doc.description}</p>
                      <span className="source-note">
                        {doc.category} · {doc.version_label} · {dateLabel(doc.document_date)}
                      </span>
                    </div>
                    <External className="text-link" href={documentUrl(doc)}>
                      Visualizar PDF
                    </External>
                  </article>
                ))}
              </div>
            ) : (
              <Empty title="Documentos públicos em preparação.">
                Estatuto, relatórios e prestação de contas serão disponibilizados após aprovação
                para divulgação. Nenhum documento fictício ou privado é publicado aqui.
              </Empty>
            ))}
          <div className="three-grid transparency-cards">
            <div className="info-card">
              <h3>Governança</h3>
              <p>
                A identificação da Diretoria e os documentos de governança serão publicados conforme
                validação institucional e autorização.
              </p>
            </div>
            <div className="info-card">
              <h3>Prestação de contas</h3>
              <p>
                Relatórios aprovados poderão apresentar a destinação de recursos e evidências
                publicáveis, preservando dados pessoais.
              </p>
            </div>
            <div className="info-card">
              <h3>Parcerias</h3>
              <p>
                Vínculos e instrumentos serão descritos com escopo, fonte e informação adequada à
                divulgação pública.
              </p>
            </div>
          </div>
          <div className="notice">
            <h2>Nossa rede</h2>
            <p>
              Em setembro de 2026, nossa rede reunia <strong>15 estados</strong> e{' '}
              <strong>mais de 140 membros</strong>.
            </p>
            <TextLink to="/apresentacao">Conheça nossa apresentação</TextLink>
          </div>
        </div>
      </section>
    </>
  );
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
