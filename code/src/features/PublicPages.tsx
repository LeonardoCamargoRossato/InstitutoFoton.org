import { Suspense, lazy, useEffect, useRef, useState, type RefObject } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Network, Compass, BookOpen } from 'lucide-react';
import { Action, TextLink, Intro, Heading, External } from '../components/ui';
import { ActionCard, InfoCard } from '../components/cards';
import { CardGallery } from '../components/galleries/cards/CardGallery';
import { assetUrl } from '../lib/siteAssets';
import PartnerEcosystem from './PartnerEcosystem';
import {
  HomeAtomEntrance,
  PhotonIdentityAnimation,
  type PhotonIdentityPhase,
} from '../components/animations';
import InstituteTeamDashboard from '../pages/02-instituto/sections/InstituteTeamDashboard';
import InstitutePurpose from '../pages/02-instituto/sections/InstitutePurpose';
import { FoundationTeaser } from './foundation';
import { odqs, cartas, methodology } from './manifesto-content';
import OfficialStatements from './OfficialStatements';
import ManifestoHero from './ManifestoHero';
const ManifestoMedia = lazy(() => import('./ManifestoMedia'));

export function Home() {
  const programs = [
    {
      title: 'Pesquisa, Desenvolvimento e Inovação',
      description: 'Investigação científica e pesquisa aplicada em tecnologias quânticas.',
      to: '/pesquisa',
    },
    {
      title: 'Quantum for Business',
      description: 'Diálogo entre conhecimento científico, estratégia e organizações.',
      to: '/contato',
    },
    {
      title: 'Manifesto Quântico Nacional',
      description: 'Articulação de uma agenda nacional e acesso às cartas e registros públicos.',
      to: '/manifesto',
    },
    {
      title: 'Jornada do Cientista Inovador',
      description: 'Formação, conexões e aproximação de pessoas com a ciência.',
      to: '/pesquisa/jornada',
    },
  ];
  return (
    <>
      <section className="home-hero home-hero-minimal" id="inicio-capa" data-lcr-section-id="1.1">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> Instituto Foton · Ciências e Tecnologias Quânticas
            </p>
            <h1>
              Transformar ciência de fronteira em <em>decisões, soluções e oportunidades.</em>
            </h1>
            <p className="hero-description">
              Tecnologia através da ciência. Articulamos conhecimento, formação e pesquisa para
              aproximar as tecnologias quânticas de desafios reais da sociedade.
            </p>
            <div className="actions">
              <Action to="/instituto">Conheça o Foton</Action>
              <TextLink to="/apresentacao">Apresentação institucional</TextLink>
            </div>
            <a className="scroll-hint" href="#porque-existe">
              <ArrowDown size={15} aria-hidden="true" /> Entenda nosso propósito
            </a>
          </div>
          <HomeAtomEntrance />
        </div>
      </section>

      <section className="section spectral-divider" id="porque-existe" data-lcr-section-id="1.2">
        <div className="container split">
          <Heading eyebrow="Por que o Foton existe?" title="A Era Quântica Já Começou." />
          <div className="body-copy">
            <blockquote>
              “Transformar ciência de fronteira em decisões, soluções e oportunidades.”
            </blockquote>
            <p>
              O Foton busca articular inteligência estratégica, educação, pesquisa aplicada e
              diálogo entre ciência, organizações e sociedade.
            </p>
            <p>
              As tecnologias quânticas abrem novas perspectivas para comunicação, segurança, saúde,
              energia e indústria. O Foton articula conhecimento, pesquisa e diálogo em torno dessas
              transformações.
            </p>
          </div>
        </div>
      </section>

      <section
        className="section section-gray spectral-divider"
        id="ecossistema"
        data-lcr-section-id="1.3"
      >
        <div className="container">
          <div className="heading-row">
            <Heading eyebrow="Ecossistema Foton" title="Ciência conectada em diferentes regiões." />
            <TextLink to="/instituto">Sobre a rede</TextLink>
          </div>
          <p className="section-description">
            O Foton reúne trajetórias de diferentes áreas do conhecimento e conecta pessoas,
            pesquisadores e instituições em diferentes regiões do Brasil.
          </p>
          <div className="documentary-metrics institutional-metrics">
            <InfoCard as="div" inheritVisuals catalogId="1.3.C1">
              <strong>15</strong>
              <span>estados representados</span>
            </InfoCard>
            <InfoCard as="div" inheritVisuals catalogId="1.3.C2">
              <strong>140+</strong>
              <span>membros registrados</span>
            </InfoCard>
            <p className="metrics-source">Indicadores institucionais da rede Foton.</p>
          </div>
        </div>
      </section>

      <section className="section spectral-divider" id="frentes" data-lcr-section-id="1.4">
        <div className="container">
          <div className="heading-row">
            <Heading eyebrow="Frentes e programas" title="Do conhecimento à articulação." />
          </div>
          <p className="section-description">
            Conheça as frentes de pesquisa, formação, inovação e articulação do Foton.
          </p>
          <CardGallery
            className="research-grid institutional-programs"
            items={programs}
            renderItem={(program, index) => (
              <ActionCard className="research-card" to={program.to} catalogId={`1.4.C${index + 1}`}>
                <div className="card-top">
                  <span className="number">{String(index + 1).padStart(2, '0')}</span>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <span className="card-link">
                  Saiba mais <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </ActionCard>
            )}
          />
        </div>
      </section>

      <section
        className="section section-gray institutional-presentation"
        id="apresentacao"
        data-lcr-section-id="1.5"
      >
        <div className="container presentation-feature-layout">
          <div className="presentation-feature-copy">
            <Heading eyebrow="Documento institucional" title="Conheça a apresentação do Foton." />
          </div>
          <div className="presentation-feature-media">
            <Link
              to="/apresentacao"
              data-lcr-card-id="1.5.C1"
              className="presentation-preview-link"
              aria-label="Visualizar o PDF da apresentação institucional do Foton"
            >
              <span className="presentation-preview-stack">
                <img
                  className="presentation-preview-image presentation-preview-back"
                  src={assetUrl('assets/WebP/apresentacao/ApresentacaoFotonPagina02.webp')}
                  alt="Segunda página da apresentação institucional do Foton"
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="presentation-preview-image presentation-preview-front"
                  src={assetUrl('assets/WebP/apresentacao/ApresentacaoFotonPagina01.webp')}
                  alt="Capa oficial da apresentação institucional do Foton"
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                />
                <span className="presentation-preview-action" aria-hidden="true">
                  Visualizar apresentação <ArrowUpRight size={20} />
                </span>
              </span>
            </Link>
            <p className="presentation-preview-caption">
              Clique na imagem para acessar o PDF da apresentação institucional do Foton.
            </p>
          </div>
        </div>
      </section>

      <PartnerEcosystem home />

      <section
        className="section institutional-contact"
        id="contato-foton"
        data-lcr-section-id="1.7"
      >
        <div className="container split">
          <Heading eyebrow="Contato" title="Converse com o Foton." />
          <div className="body-copy">
            <p>
              Converse com o Foton sobre ciência, pesquisa, colaboração e novas conexões pelos
              nossos canais de contato.
            </p>
            <div className="institutional-contact-actions">
              <Action to="/contato">Canais de contato</Action>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InstituteLightPath({
  artwork,
  onPhaseChange,
}: {
  artwork: RefObject<HTMLDivElement | null>;
  onPhaseChange: (phase: PhotonIdentityPhase) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const pulse = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const wrapper = root.current?.parentElement;
    const drawing = svg.current;
    const line = path.current;
    const light = pulse.current;
    const mark = artwork.current;
    const title = wrapper?.querySelector<HTMLElement>('.page-intro h1');
    const historyTitle = wrapper?.querySelector<HTMLElement>('.institute-history h2');
    if (!wrapper || !drawing || !line || !light || !mark || !title || !historyTitle) return;

    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let needsLayout = true;
    let needsInitialPosition = true;
    let arrived = motion.matches;
    let restoreScroll = false;
    let length = 0;
    let start = 0;
    let end = 0;
    let restoreFrom = 0;
    let impactDocumentY = 0;

    const layoutPath = () => {
      const bounds = wrapper.getBoundingClientRect();
      const relative = (element: HTMLElement) => {
        let x = element.offsetWidth / 2;
        let y = element.offsetHeight / 2;
        let current: HTMLElement | null = element;
        while (current && current !== wrapper) {
          x += current.offsetLeft;
          y += current.offsetTop;
          current = current.offsetParent as HTMLElement | null;
        }
        return { x, y };
      };
      const titleAt = relative(title);
      const historyAt = relative(historyTitle);
      drawing.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);

      // Enquanto carrega, calcula a mesma projeção xMidYMid meet do SVG aprovado.
      const stageBounds = mark.getBoundingClientRect();
      const scale = Math.min(stageBounds.width / 2512, stageBounds.height / 750);
      const artworkToScreen = mark.shadowRoot?.querySelector('svg')?.getScreenCTM();
      const impactOnScreen = artworkToScreen
        ? new DOMPoint(161, 160).matrixTransform(artworkToScreen)
        : new DOMPoint(
            stageBounds.left + (stageBounds.width - 2512 * scale) / 2 + (161 + 66) * scale,
            stageBounds.top + (stageBounds.height - 750 * scale) / 2 + (160 + 79) * scale,
          );
      const drawingToScreen = drawing.getScreenCTM();
      if (!drawingToScreen) return;
      const impact = impactOnScreen.matrixTransform(drawingToScreen.inverse());
      const approachX = Math.max(8, stageBounds.left - bounds.left - bounds.width * 0.18);

      line.setAttribute(
        'd',
        `M ${Math.max(26, titleAt.x - title.offsetWidth / 2)} 10
         C ${bounds.width * 0.04} ${titleAt.y * 0.18}, ${bounds.width * 0.98} ${titleAt.y * 0.34}, ${bounds.width * 0.9} ${titleAt.y}
         C ${bounds.width * 1.08} ${historyAt.y * 0.5}, ${bounds.width * 0.08} ${historyAt.y * 0.58}, ${historyAt.x} ${historyAt.y}
         C ${bounds.width * 0.02} ${(historyAt.y + impact.y) / 2}, ${approachX} ${impact.y - 24}, ${impact.x} ${impact.y}`,
      );
      length = line.getTotalLength();
      impactDocumentY = scrollY + impactOnScreen.y;
      start = scrollY + bounds.top - innerHeight * 0.12;
      end = impactDocumentY - innerHeight * 0.55;
      restoreFrom = end - innerHeight * 0.08;
    };

    const update = () => {
      frame = 0;
      if (motion.matches) return;
      const initialPosition = needsInitialPosition;
      needsInitialPosition = false;
      if (needsLayout) {
        layoutPath();
        needsLayout = false;
      }
      if (!length) return;

      const saved = Number(history.state?.instituteIdentityScroll);
      const resumeAtIdentity = saved >= restoreFrom;
      if (restoreScroll || initialPosition) {
        restoreScroll = false;
        if (!location.hash && resumeAtIdentity) {
          // A posição pode ser restaurada antes de a rota React ter altura suficiente.
          window.scrollTo({ top: saved, behavior: 'instant' });
        }
      }
      const scrollTop = scrollY;
      if (initialPosition && (location.hash === '#identidade-foton' || resumeAtIdentity)) {
        arrived = true;
        onPhaseChange('static');
      }
      const reachedImpact = scrollTop >= end;
      const impactInView =
        impactDocumentY >= scrollTop && impactDocumentY < scrollTop + innerHeight;
      const artworkStatus = mark.dataset.artworkStatus;
      const waitingForArtwork =
        !initialPosition &&
        !arrived &&
        reachedImpact &&
        impactInView &&
        artworkStatus === undefined;
      const progress = Math.max(0, Math.min(1, (scrollTop - start) / Math.max(end - start, 1)));
      // Mantém o último trecho em espera se o scroll chegar antes dos bytes do SVG.
      const travelled = waitingForArtwork ? Math.max(0, length - 8) : length * progress;
      line.style.strokeDashoffset = String(1 - travelled / length);
      line.style.opacity = String(Math.min(0.28, 0.05 + progress * 0.24));
      const point = line.getPointAtLength(travelled);
      light.setAttribute('cx', String(point.x));
      light.setAttribute('cy', String(point.y));

      const impact = !arrived && travelled === length;
      if (impact || (scrollTop >= restoreFrom && !resumeAtIdentity)) {
        // Guarda a posição deste item de navegação antes de um possível recarregamento.
        history.replaceState({ ...history.state, instituteIdentityScroll: scrollTop }, '');
      }
      if (impact) {
        arrived = true;
        const phase =
          !initialPosition && impactInView && artworkStatus === 'ready' ? 'playing' : 'static';
        // Aplica a fase antes do quadro que esconde a partícula no centro da estrela.
        flushSync(() => onPhaseChange(phase));
      }
      light.style.opacity = !arrived && progress > 0.015 ? '1' : '0';
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const relayout = () => {
      needsLayout = true;
      schedule();
    };
    const motionChanged = () => {
      if (motion.matches) {
        arrived = true;
        onPhaseChange('static');
      }
      relayout();
    };
    const restorePosition = () => {
      needsInitialPosition = true;
      restoreScroll = true;
      relayout();
    };
    const savePosition = () => {
      if (Number.isFinite(history.state?.instituteIdentityScroll)) {
        history.replaceState({ ...history.state, instituteIdentityScroll: scrollY }, '');
      }
    };
    const resize = new ResizeObserver(relayout);
    [wrapper, title, historyTitle, mark].forEach((element) => resize.observe(element));
    const load = new MutationObserver(relayout);
    load.observe(mark, { attributeFilter: ['data-artwork-status'] });
    if (document.readyState === 'complete') restoreScroll = true;
    schedule();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', relayout);
    addEventListener('pageshow', restorePosition);
    addEventListener('pagehide', savePosition);
    motion.addEventListener('change', motionChanged);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      resize.disconnect();
      load.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', relayout);
      removeEventListener('pageshow', restorePosition);
      removeEventListener('pagehide', savePosition);
      motion.removeEventListener('change', motionChanged);
    };
  }, [artwork, onPhaseChange]);

  return (
    <div ref={root} className="institute-light-path" aria-hidden="true">
      <svg ref={svg} preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="institute-light-spectrum" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".24" stopColor="#00c5d8" />
            <stop offset=".52" stopColor="#006cff" />
            <stop offset=".76" stopColor="#6f36ff" />
            <stop offset="1" stopColor="#ef3d7d" />
          </linearGradient>
        </defs>
        <path ref={path} pathLength="1" d="M0 0" />
        <circle ref={pulse} r="7" cx="70" cy="35" />
      </svg>
    </div>
  );
}

export function Institute() {
  const identityArtwork = useRef<HTMLDivElement>(null);
  const [identityPhase, setIdentityPhase] = useState<PhotonIdentityPhase>(() =>
    matchMedia('(prefers-reduced-motion: reduce)').matches || location.hash === '#identidade-foton'
      ? 'static'
      : 'approach',
  );

  return (
    <>
      <div className="institute-story">
        <InstituteLightPath artwork={identityArtwork} onPhaseChange={setIdentityPhase} />
        <Intro
          eyebrow="O Instituto"
          title="Ciência que aproxima. Conhecimento que transforma."
          id="instituto-inicio"
          sectionCode="2.A.1"
        >
          <p>
            Somos uma rede que conecta pessoas, instituições e diferentes áreas do conhecimento em
            torno da ciência quântica.
          </p>
        </Intro>
        <section
          className="section institute-history"
          id="nossa-historia"
          data-lcr-section-id="2.A.2"
        >
          <div className="container split">
            <Heading eyebrow="Nossa história" title="Uma inquietação que se tornou encontro." />
            <div className="body-copy">
              <p>
                O Instituto de Ciências e Tecnologias Quânticas articula pesquisadores,
                profissionais e organizações para aproximar ciência de fronteira de decisões,
                soluções e oportunidades.
              </p>
              <p>
                A atuação multidisciplinar do Foton conecta ciência, educação e articulação
                institucional, aproximando diferentes áreas do conhecimento.
              </p>
            </div>
          </div>
        </section>
        <section className="section section-gray photon-section" data-lcr-section-id="2.A.3">
          <div className="quantum-signature" aria-hidden="true">
            <span className="quantum-equation equation-wave">iℏ ∂|ψ⟩/∂t = Ĥ|ψ⟩</span>
            <span className="quantum-equation equation-photon">E = hν</span>
            <svg className="spectrum-wave" viewBox="0 0 720 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="foton-spectrum" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#6f36ff" />
                  <stop offset=".2" stopColor="#006cff" />
                  <stop offset=".4" stopColor="#00c5d8" />
                  <stop offset=".6" stopColor="#6ed35d" />
                  <stop offset=".8" stopColor="#ffb000" />
                  <stop offset="1" stopColor="#ef3d7d" />
                </linearGradient>
              </defs>
              <path
                d="M0 60 C60 4 120 4 180 60 S300 116 360 60 480 4 540 60 660 116 720 60"
                fill="none"
                stroke="url(#foton-spectrum)"
                strokeWidth="2"
              />
            </svg>
            <i className="quantum-particle particle-one" />
            <i className="quantum-particle particle-two" />
            <i className="quantum-particle particle-three" />
          </div>
          <div className="container split">
            <PhotonIdentityAnimation artwork={identityArtwork} phase={identityPhase} />
            <div>
              <Heading
                eyebrow="Por que Foton?"
                title="Um nome que carrega uma ideia de movimento."
              />
