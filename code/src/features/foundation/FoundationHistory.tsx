import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { ImageZoomDialog } from '../../components/viewers';
import { BaseCarousel, carouselPresets } from '../../components/carousel';
import { assetUrl } from '../../lib/siteAssets';
import { useLanguage } from '../../i18n';
import { localizedCopy } from '../../i18n/localizedCopy';
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

const titlesEnglish = [
  'January 30, 2025 — The day Instituto Foton was founded',
  'On site and online — Connected from the beginning',
  'Foton’s first statutory board',
  'Science is also about meeting',
  'Signatures and decisions',
  'A hybrid assembly',
  'Every voice counted',
  'Connections that sustain',
  'The first chapter',
] as const;

export const foundationCaption03 =
  'Da esquerda para a direita: Natan Feijó Tristão — Conselho Fiscal; Cláudio Dias — Secretário-Geral; Leonardo Rossato — Presidente; Gabriel Albuquerque — Presidente da LACQ Feynman; Marco Aurélio — Vice-Presidente; Danielli Sanderi — Tesoureira; Rosângela Maraschin — Conselho Fiscal; Luiz Brito — Conselho Fiscal.';

const foundationCaption03English =
  'From left to right: Natan Feijó Tristão — Fiscal Council; Cláudio Dias — Secretary-General; Leonardo Rossato — President; Gabriel Albuquerque — President of LACQ Feynman; Marco Aurélio — Vice President; Danielli Sanderi — Treasurer; Rosângela Maraschin — Fiscal Council; Luiz Brito — Fiscal Council.';

const createCards = (cardTitles: readonly string[], caption: string) =>
  cardTitles.map((title, index) => {
    const name = `ImgFundacaoFoton${String(index + 1).padStart(2, '0')}`;
    return {
      title,
      number: index + 1,
      webp: assetUrl(`assets/WebP/instituto/fundacao/${name}.webp`),
      png: assetUrl(`assets/PNG/instituto/fundacao/${name}.png`),
      caption: index === 2 ? caption : title,
    };
  });

export const foundationCards = createCards(titles, foundationCaption03);
const foundationCardsEnglish = createCards(titlesEnglish, foundationCaption03English);
const spanish = localizedCopy('es-ES');
const foundationCardsSpanish = createCards(
  titles.map((title) => spanish(title, title)),
  spanish(foundationCaption03, foundationCaption03English),
);

const chinese = localizedCopy('zh-CN');
const foundationCardsChinese = createCards(
  titles.map((title) => chinese(title, title)),
  chinese(foundationCaption03, foundationCaption03English),
);

export function FoundationTeaser() {
  const [open, setOpen] = useState(false);
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  const cards =
    locale === 'zh-CN'
      ? foundationCardsChinese
      : locale === 'es-ES'
        ? foundationCardsSpanish
        : locale === 'en-US'
          ? foundationCardsEnglish
          : foundationCards;
  const cover = cards[0];
  return (
    <section
      className="section foundation-teaser"
      id="fundacao"
      data-lcr-section-id="2.A.4"
      aria-labelledby="foundation-teaser-heading"
    >
      <div className="container foundation-teaser-layout">
        <div className="foundation-teaser-copy">
          <p className="eyebrow">{copy('Nossa história · Fundação', 'Our story · Foundation')}</p>
          <p className="foundation-event-date">
            {copy(
              '30 de janeiro de 2025 · Porto Alegre, RS',
              'January 30, 2025 · Porto Alegre, Brazil',
            )}
          </p>
          <h2 id="foundation-teaser-heading">
            {copy('O dia em que nasceu o Instituto Foton', 'The day Instituto Foton was founded')}
          </h2>
          <p>
            {copy(
              'Em 30 de janeiro de 2025, pesquisadores e profissionais ligados às ciências e tecnologias quânticas reuniram-se no NAU Live Spaces, em Porto Alegre, e também de forma online, conectando participantes de diferentes regiões do Brasil.',
              'On January 30, 2025, researchers and professionals connected to quantum sciences and technologies met at NAU Live Spaces in Porto Alegre and online, connecting participants from different regions of Brazil.',
            )}
          </p>
          <p>
            {copy(
              'Naquela assembleia, nasceu formalmente o Instituto Foton, uma iniciativa construída em torno de um propósito coletivo: aproximar pessoas, conhecimentos e oportunidades para fortalecer o desenvolvimento das tecnologias quânticas.',
              'At that assembly, Instituto Foton was formally established as an initiative built around a collective purpose: bringing people, knowledge, and opportunities together to strengthen the development of quantum technologies.',
            )}
          </p>
          <p>
            {copy(
              'Mais do que a criação de uma instituição, aquele encontro marcou o início de uma jornada de colaboração científica, formação e inovação.',
              'More than the creation of an institution, that meeting marked the beginning of a journey of scientific collaboration, education, and innovation.',
            )}
          </p>
          <Link className="button foundation-link" to={foundationRoute}>
            {copy('Saiba mais sobre nossa fundação', 'Learn more about our foundation')}{' '}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <button
          className="foundation-cover-button"
          data-lcr-card-id="2.A.4.C1"
          type="button"
          onClick={() => setOpen(true)}
          aria-label={copy(
            'Ampliar primeiro registro da fundação do Instituto Foton',
            'Enlarge the first record of Instituto Foton’s foundation',
          )}
        >
          <img src={cover.webp} width={1080} height={1350} loading="lazy" alt={cover.title} />
          <span className="foundation-zoom-hint">
            <Maximize2 size={17} /> {copy('Ampliar imagem', 'Enlarge image')}
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
  const { locale } = useLanguage();
  const copy = localizedCopy(locale);
  const cards =
    locale === 'zh-CN'
      ? foundationCardsChinese
      : locale === 'es-ES'
        ? foundationCardsSpanish
        : locale === 'en-US'
          ? foundationCardsEnglish
          : foundationCards;

  return (
    <section className="foundation-gallery" aria-labelledby="foundation-gallery-heading">
      <div className="foundation-gallery-heading">
        <p className="eyebrow">{copy('Acervo da fundação', 'Foundation archive')}</p>
        <h2 id="foundation-gallery-heading">
          {copy('Nove registros do primeiro capítulo', 'Nine records from the first chapter')}
        </h2>
        <p>
          {copy(
            'Explore os registros aprovados da assembleia. Toque em uma imagem para ampliá-la.',
            'Explore the approved assembly records. Select an image to enlarge it.',
          )}
        </p>
      </div>
      <BaseCarousel
        label={copy('Registros históricos da fundação', 'Historical foundation records')}
        listaWebP={cards.map((image) => ({
          id: String(image.number),
          src: image.webp,
          alt: image.title,
          title: image.title,
          caption: image.caption,
          width: 1080,
          height: 1350,
        }))}
        listaPNG={cards.map((image) => ({
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
        previousLabel={copy('Imagem anterior', 'Previous image')}
        nextLabel={copy('Próxima imagem', 'Next image')}
        imageLabel={(index, total, image) =>
          `${copy('Ampliar imagem', 'Enlarge image')} ${index + 1} ${copy('de', 'of')} ${total}: ${image.title}`
        }
      />
      <p className="foundation-historical-note">
        {copy(
          'Gabriel Albuquerque aparece no terceiro registro como presidente da LACQ Feynman, instituição irmã, e não integrava a Diretoria estatutária do Instituto Foton. Os cargos descritos referem-se à fundação, não à composição atual da equipe.',
          'Gabriel Albuquerque appears in the third record as president of LACQ Feynman, a sister institution, and was not part of Instituto Foton’s statutory board. The positions described refer to the founding moment, not the current team structure.',
        )}
      </p>
    </section>
  );
}
