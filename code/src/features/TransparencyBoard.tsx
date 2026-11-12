import { useMemo, useState } from 'react';
import { Download, Eye, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FotonPhoto } from './FotonPhoto';
import { TRANSPARENCY_CATEGORIES, transparencyCategory, type TransparencyCategory } from './TransparencyCategories';
import { backendError, documentUrl, documents, type PublicDocument } from '../lib/backend';
import { dateLabel } from '../lib/config';
import { useResource } from '../lib/useResource';
import { Intro, Status } from '../components/UI';

type Entry = {
  id: string;
  title: string;
  category: TransparencyCategory;
  categoryLabel: string;
  description: string;
  version: string;
  date: string | null;
  size?: string;
  url?: string;
};

const presentation: Entry = {
  id: 'institutional-presentation-static',
  title: 'Apresentação institucional — setembro de 2026',
  category: 'other',
  categoryLabel: 'Apresentação institucional',
  description: 'Apresentação institucional de 10 de setembro de 2026, disponibilizada no portal.',
  version: 'Setembro de 2026',
  date: '2026-09-10',
  size: '7,3 MB',
  url: import.meta.env.BASE_URL + 'documents/apresentacao-institucional-2026-09-10.pdf',
};

const textMatches = (entry: Entry, search: string) =>
  [entry.title, entry.description, entry.categoryLabel, entry.version]
    .join(' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR'));

function entryFromBackend(doc: PublicDocument): Entry {
  const group = transparencyCategory(doc.category);
  return {
    id: doc.id,
    title: doc.title,
    category: group,
    categoryLabel: TRANSPARENCY_CATEGORIES.find((c) => c.id === group)?.title || doc.category,
    description: doc.description,
    version: doc.version_label,
    date: doc.document_date,
    url: documentUrl(doc),
  };
}

function DocumentCard({ entry }: { entry: Entry }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const filename = entry.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) + '.pdf';

  async function downloadPdf() {
    if (!entry.url) return;
    setDownloading(true);
    setDownloadError('');
    try {
      const response = await fetch(entry.url);
      if (!response.ok) throw new Error('Arquivo indisponível');
      const blob = await response.blob();
      if (!blob.size) throw new Error('Arquivo vazio');
      const temporaryUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = temporaryUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(temporaryUrl), 60_000);
    } catch {
      setDownloadError('O download não foi concluído. Experimente abrir o documento para salvá-lo pelo navegador.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <article className="transparency-document">
      <span className="document-symbol" aria-hidden="true"><FileText size={22} /></span>
      <div className="document-content">
        <h3>{entry.title}</h3>
        <p>{entry.description}</p>
        <div className="document-meta">
          <span>{entry.categoryLabel}</span>
          {entry.date && <span>{dateLabel(entry.date)}</span>}
          {entry.version && <span>{entry.version}</span>}
          <span>{entry.size ? 'PDF · ' + entry.size : 'PDF'}</span>
        </div>
        {downloadError && <p className="document-error" role="alert">{downloadError}</p>}
      </div>
      {entry.url ? (
        <div className="document-actions">
          <a href={entry.url} target="_blank" rel="noopener noreferrer" className="document-action">
            <Eye size={17} aria-hidden="true" /> Visualizar
            <span className="sr-only"> {entry.title} (abre em nova aba)</span>
          </a>
          <button type="button" className="document-action" onClick={downloadPdf} disabled={downloading}>
            <Download size={17} aria-hidden="true" />
            {downloading ? 'Baixando…' : 'Baixar'}
            <span className="sr-only"> {entry.title}</span>
          </button>
        </div>
      ) : (
        <p className="document-unavailable" role="status">Arquivo indisponível para acesso público.</p>
      )}
    </article>
  );
}

export default function TransparencyBoard() {
  const resource = useResource(documents);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('todos');

  const entries = useMemo(() => {
    const backend = (resource.data || []).map(entryFromBackend);
    // O PDF institucional está no próprio repositório, independentemente do backend.
    const hasPresentation = backend.some((entry) =>
      entry.category === 'other' && Boolean(entry.url) && entry.title.toLowerCase().includes('apresentação institucional'));
    return hasPresentation ? backend : [...backend, presentation];
  }, [resource.data]);
  const years = useMemo(() => [...new Set(entries.map((d) => d.date?.slice(0, 4)).filter((y): y is string => Boolean(y)))].sort().reverse(), [entries]);
  const hasFilters = entries.length >= 8;
  const filtered = entries.filter((d) => (!hasFilters || (year === 'todos' || d.date?.startsWith(year))) &&
    (!hasFilters || !search.trim() || textMatches(d, search.trim())));
  const hasQuery = hasFilters && (Boolean(search.trim()) || year !== 'todos');
  const unavailable = Boolean(backendError) || Boolean(resource.error);
  const categories = [
    ...TRANSPARENCY_CATEGORIES,
    ...(entries.some((d) => d.category === 'other')
      ? [{ id: 'other' as const, title: 'Outros documentos públicos', description: 'Materiais institucionais complementares disponibilizados para consulta.' }]
      : []),
  ];

  return (
    <>
      <Intro eyebrow="Transparência" title="Confiança se constrói com clareza.">
        <p>Documentos e informações institucionais para consulta pública, com responsabilidade.</p>
      </Intro>
      <section className="transparency-lead section">
        <div className="container transparency-lead-grid">
          <div className="transparency-lead-copy">
            <p className="eyebrow"><span /> Prestação de contas</p>
            <h2>Informação acessível, organizada e verificável.</h2>
            <p>
              Consulte os materiais institucionais efetivamente publicados. Quando uma categoria ainda
              não tem arquivos, deixamos isso claro — sem documentos ou dados fictícios.
            </p>
            <a href="#documentos-publicos" className="text-link">Consultar documentos <span aria-hidden="true">↓</span></a>
          </div>
          <FotonPhoto
            index={4}
            className="transparency-photo"
            alt="Cena ilustrativa gerada por IA com pesquisadores fictícios em trabalho colaborativo"
            caption="Imagem ilustrativa gerada por IA · pessoas fictícias"
          />
        </div>
      </section>
      <section className="section section-gray transparency-section" id="documentos-publicos">
        <div className="container">
          <div className="transparency-section-heading">
            <div>
              <p className="eyebrow"><span /> Arquivo institucional</p>
              <h2>Documentos para consulta</h2>
            </div>
            <p>Organizados por finalidade, com referência temporal quando informada na fonte.</p>
          </div>
          {backendError && (
            <p className="transparency-alert" role="status">
              A consulta ao acervo dinâmico está indisponível nesta sessão. Apenas os arquivos públicos
              incorporados ao próprio portal podem ser confirmados.
            </p>
          )}
          {!backendError && <Status {...resource} />}
          {hasFilters && (
            <div className="transparency-filters">
              <label>
                Buscar documentos
                <span className="search-field"><Search size={18} aria-hidden="true" />
                  <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Título, descrição ou categoria" />
                </span>
              </label>
              <label>
                Ano
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="todos">Todos os anos</option>
                  {years.map((value) => <option value={value} key={value}>{value}</option>)}
                </select>
              </label>
            </div>
          )}
          <div className="transparency-groups">
            {categories.map((category, index) => {
              const allDocs = entries.filter((d) => d.category === category.id);
              const visible = filtered.filter((d) => d.category === category.id);
              return (
                <section className={'transparency-group ' + (index === 0 ? 'featured' : '')} key={category.id}
                  aria-labelledby={'category-' + category.id}>
                  <div className="transparency-group-header">
                    <span className="transparency-group-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h2 id={'category-' + category.id}>{category.title}</h2>
                      <p>{category.description}</p>
                    </div>
                    {(!unavailable && !resource.loading) && (
                      <span className="document-count">{allDocs.length} {allDocs.length === 1 ? 'documento' : 'documentos'}</span>
                    )}
                  </div>
                  {visible.length ? (
                    <div className="transparency-document-list">{visible.map((entry) =>
                      <DocumentCard key={entry.id} entry={entry} />)}</div>
                  ) : (
                    <p className="transparency-empty">
                      {hasQuery && allDocs.length ? 'Nenhum documento corresponde à busca ou ao ano selecionado.' :
                        (unavailable && category.id !== 'other') || resource.loading
                          ? 'Ainda não foi possível confirmar os documentos desta categoria.'
                          : 'Nenhum documento publicado nesta categoria.'}
                    </p>
                  )}
                </section>
              );
            })}
          </div>
          <div className="transparency-bottom">
            <div>
              <h2>Apresentação institucional</h2>
              <p>Conheça o Instituto em um documento público já disponível no portal.</p>
            </div>
            <Link className="button" to="/apresentacao">Abrir apresentação <Eye size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
