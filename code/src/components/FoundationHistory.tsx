import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { ImageZoomDialog } from './ImageZoomDialog';
import { BaseCarousel, carouselPresets } from './carousel';
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
  const name = `ImgFundacaoFoton${String(index + 1).padStart(2, '0')}`;
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
      data-lcr-section-id="2.A.4"
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
  return (
    <section className="foundation-gallery" aria-labelledby="foundation-gallery-heading">
      <div className="foundation-gallery-heading">
        <p className="eyebrow">Acervo da fundação</p>
        <h2 id="foundation-gallery-heading">Nove registros do primeiro capítulo</h2>
        <p>Explore os registros aprovados da assembleia. Toque em uma imagem para ampliá-la.</p>
      </div>
      <BaseCarousel
        label="Registros históricos da fundação"
        listaWebP={foundationCards.map((image) => ({
          id: String(image.number),
          src: image.webp,
          alt: image.title,
          title: image.title,
          caption: image.caption,
          width: 1080,
          height: 1350,
        }))}
        listaPNG={foundationCards.map((image) => ({
          id: String(image.number),
          src: image.png,
          downloadName: image.png.split('/').at(-1),
        }))}
        estiloGrafico={carouselPresets.fundacao}
        classNames={{
          root: 'foundation-carousel',
          stage: 'foundation-stage',
          image: 'foundation-stage-image',
          controls: 'foundation-carousel-controls',
          position: 'foundation-carousel-position',
          caption: 'foundation-carousel-caption',
        }}
        previousLabel="Imagem anterior"
        nextLabel="Próxima imagem"
        imageLabel={(index, total, image) =>
          `Ampliar imagem ${index + 1} de ${total}: ${image.title}`
        }
      />
      <p className="foundation-historical-note">
        Gabriel Albuquerque aparece no terceiro registro como presidente da LACQ Feynman,
        instituição irmã, e não integrava a Diretoria estatutária do Instituto Foton. Os cargos
        descritos referem-se à fundação, não à composição atual da equipe.
      </p>
    </section>
  );
}
