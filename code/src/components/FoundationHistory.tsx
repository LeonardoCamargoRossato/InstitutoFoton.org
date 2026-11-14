import { useState, type TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ImageZoomDialog } from './ImageZoomDialog';
import { assetUrl } from '../lib/siteAssets';
import './FoundationHistory.css';

export const foundationRoute = '/noticias/fundacao-instituto-foton';
const titles = [
  '30 de janeiro de 2025 — O dia em que o Instituto Foton nasceu',
  'Presencial e online — Conectados desde o início',
  'Primeira diretoria estatutária do Foton',
  'Ciência também é encontro',
  'Assinaturas e decisões',
  'Uma assembleia híbrida',
  'Cada voz contou',
  'Conexões que sustentam',
  'O primeiro capítulo',
] as const;
export const foundationCaption03 =
  'Da esquerda para a direita: Natan Feijó Tristão — Conselho Fiscal; Cláudio Dias — Secretário-Geral; Leonardo Rossato — Presidente; Gabriel Albuquerque — Presidente da LACQ Feynman; Marco Aurélio — Vice-Presidente; Danielli Sanderi — Tesoureira; Rosângela Maraschin — Conselho Fiscal; Luiz Brito — Conselho Fiscal.';

export const foundationCards = titles.map((title, index) => {
  const name = `Img-Fundacao-Foton-${String(index + 1).padStart(2, '0')}`;
  return {
    title,
    number: index + 1,
    webp: assetUrl(`assets/WebP/instituto/fundacao/${name}.webp`),
    png: assetUrl(`assets/PNG/instituto/fundacao/${name}.png`),
    caption: index === 2 ? foundationCaption03 : title,
  };
});

export function FoundationTeaser() {
  const [open, setOpen] = useState(false);
  const cover = foundationCards[0];
  return (
    <section
      className="section foundation-teaser"
      id="fundacao"
      aria-labelledby="foundation-teaser-heading"
    >
      <div className="container foundation-teaser-layout">
        <div className="foundation-teaser-copy">
          <p className="eyebrow">Nossa história · Fundação</p>
          <p className="foundation-event-date">30 de janeiro de 2025 · Porto Alegre, RS</p>
          <h2 id="foundation-teaser-heading">O dia em que nasceu o Instituto Foton</h2>
          <p>
            Em 30 de janeiro de 2025, pesquisadores e profissionais ligados às ciências e
            tecnologias quânticas reuniram-se no NAU Live Spaces, em Porto Alegre, e também de forma
            online, conectando participantes de diferentes regiões do Brasil.
          </p>
          <p>
            Naquela assembleia, nasceu formalmente o Instituto Foton, uma iniciativa construída em
            torno de um propósito coletivo: aproximar pessoas, conhecimentos e oportunidades para
            fortalecer o desenvolvimento das tecnologias quânticas.
          </p>
          <p>
            Mais do que a criação de uma instituição, aquele encontro marcou o início de uma jornada
            de colaboração científica, formação e inovação.
          </p>
          <Link className="button foundation-link" to={foundationRoute}>
            Saiba mais sobre nossa fundação <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <button
          className="foundation-cover-button"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ampliar primeiro registro da fundação do Instituto Foton"
        >
          <img src={cover.webp} width={1080} height={1350} loading="lazy" alt={cover.title} />
          <span className="foundation-zoom-hint">
            <Maximize2 size={17} /> Ampliar imagem
          </span>
        </button>
      </div>
      {open && (
        <ImageZoomDialog
          src={cover.png}
          fallback={cover.webp}
          title={cover.title}
          previewUntilLoaded
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}

export function FoundationGallery() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const slide = foundationCards[active];
  const show = (delta: number) =>
    setActive((current) => (current + delta + foundationCards.length) % foundationCards.length);
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 50) show(distance < 0 ? 1 : -1);
    setTouchStart(null);
  };
  return (
    <section className="foundation-gallery" aria-labelledby="foundation-gallery-heading">
      <div className="foundation-gallery-heading">
        <p className="eyebrow">Acervo da fundação</p>
        <h2 id="foundation-gallery-heading">Nove registros do primeiro capítulo</h2>
        <p>Explore os registros aprovados da assembleia. Toque em uma imagem para ampliá-la.</p>
      </div>
      <div
        className="foundation-carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Registros históricos da fundação"
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            show(1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            show(-1);
          }
        }}
      >
        <div className="foundation-stage">
          <button
            className="foundation-stage-image"
            type="button"
            aria-label={`Ampliar imagem ${active + 1} de 9: ${slide.title}`}
            onClick={() => setZoom(true)}
          >
            <img
              src={slide.webp}
              width={1080}
              height={1350}
              alt={slide.title}
              loading={active === 0 ? 'eager' : 'lazy'}
            />
            <span className="foundation-zoom-hint">
              <Maximize2 size={17} /> Ampliar imagem
            </span>
          </button>
        </div>
        <div className="foundation-carousel-controls">
          <button
            className="foundation-carousel-arrow"
            type="button"
            onClick={() => show(-1)}
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={23} />
          </button>
          <span className="foundation-carousel-position" aria-live="polite">
            {active + 1} / {foundationCards.length}
          </span>
          <button
            className="foundation-carousel-arrow"
            type="button"
            onClick={() => show(1)}
            aria-label="Próxima imagem"
          >
            <ChevronRight size={23} />
          </button>
        </div>
        <p className="foundation-carousel-caption">{slide.caption}</p>
      </div>
      <p className="foundation-historical-note">
        Gabriel Albuquerque aparece no terceiro registro como presidente da LACQ Feynman,
        instituição irmã, e não integrava a Diretoria estatutária do Instituto Foton. Os cargos
        descritos referem-se à fundação, não à composição atual da equipe.
      </p>
      {zoom && (
        <ImageZoomDialog
          key={slide.number}
          src={slide.png}
          fallback={slide.webp}
          title={slide.title}
          caption={slide.caption}
          previewUntilLoaded
          onClose={() => setZoom(false)}
          onPrevious={() => show(-1)}
          onNext={() => show(1)}
        />
      )}
    </section>
  );
}
