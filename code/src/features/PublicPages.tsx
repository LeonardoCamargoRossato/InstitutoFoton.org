import { Suspense, lazy, useEffect, useRef, useState, type RefObject } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Network, Compass, BookOpen } from 'lucide-react';
import { Action, TextLink, Intro, Heading, External } from '../components/ui';
import { ActionCard, InfoCard } from '../components/cards';
import { assetUrl } from '../lib/siteAssets';
import { useLanguage } from '../i18n';
import PartnerEcosystem from './PartnerEcosystem';
import {
  HomeAtomEntrance,
  PhotonIdentityAnimation,
  type PhotonIdentityPhase,
} from '../components/animations';
import InstituteTeamDashboard from '../pages/02-instituto/sections/InstituteTeamDashboard';
import InstitutePurpose from '../pages/02-instituto/sections/InstitutePurpose';
import { FoundationTeaser } from './foundation';
import {
  odqs,
  cartas,
  methodology,
  odqsEnglish,
  cartasEnglish,
  methodologyEnglish,
} from './manifesto-content';
import OfficialStatements from './OfficialStatements';
import ManifestoHero from './ManifestoHero';
const ManifestoMedia = lazy(() => import('./ManifestoMedia'));

export function Home() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = (pt: string, en: string) => (english ? en : pt);
  const programs = english
    ? [
        {
          title: 'Research, Development and Innovation',
          description: 'Scientific investigation and applied research in quantum technologies.',
          to: '/pesquisa',
        },
        {
          title: 'Quantum for Business',
          description: 'Dialogue between scientific knowledge, strategy and organizations.',
          to: '/contato',
        },
        {
          title: 'National Quantum Manifesto',
          description: 'A national agenda and access to public letters and records.',
          to: '/manifesto',
        },
        {
          title: 'Innovative Scientist Journey',
          description: 'Training, connections and bringing people closer to science.',
          to: '/pesquisa/jornada',
        },
      ]
    : [
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
          description:
            'Articulação de uma agenda nacional e acesso às cartas e registros públicos.',
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
              <span />{' '}
              {copy(
                'Instituto Foton · Ciências e Tecnologias Quânticas',
                'Instituto Foton · Quantum Sciences and Technologies',
              )}
            </p>
            <h1>
              {copy('Transformar ciência de fronteira em ', 'Turning frontier science into ')}
              <em>
                {copy(
                  'decisões, soluções e oportunidades.',
                  'decisions, solutions and opportunities.',
                )}
              </em>
            </h1>
            <p className="hero-description">
              {copy(
                'Tecnologia através da ciência. Articulamos conhecimento, formação e pesquisa para aproximar as tecnologias quânticas de desafios reais da sociedade.',
                'Technology through science. We connect knowledge, education and research to bring quantum technologies closer to real challenges in society.',
              )}
            </p>
            <div className="actions">
              <Action to="/instituto">{copy('Conheça o Foton', 'Discover Foton')}</Action>
              <TextLink to="/apresentacao">
                {copy('Apresentação institucional', 'Institutional presentation')}
              </TextLink>
            </div>
            <a className="scroll-hint" href="#porque-existe">
              <ArrowDown size={15} aria-hidden="true" />{' '}
              {copy('Entenda nosso propósito', 'Understand our purpose')}
            </a>
          </div>
          <HomeAtomEntrance />
        </div>
      </section>

      <section className="section spectral-divider" id="porque-existe" data-lcr-section-id="1.2">
        <div className="container split">
          <Heading
            eyebrow={copy('Por que o Foton existe?', 'Why does Foton exist?')}
            title={copy('A Era Quântica Já Começou.', 'The Quantum Era Has Begun.')}
          />
          <div className="body-copy">
            <blockquote>
              {copy(
                '“Transformar ciência de fronteira em decisões, soluções e oportunidades.”',
                '“Turning frontier science into decisions, solutions and opportunities.”',
              )}
            </blockquote>
            <p>
              {copy(
                'O Foton busca articular inteligência estratégica, educação, pesquisa aplicada e diálogo entre ciência, organizações e sociedade.',
                'Foton connects strategic intelligence, education, applied research, and dialogue between science, organizations, and society.',
              )}
            </p>
            <p>
              {copy(
                'As tecnologias quânticas abrem novas perspectivas para comunicação, segurança, saúde, energia e indústria. O Foton articula conhecimento, pesquisa e diálogo em torno dessas transformações.',
                'Quantum technologies open new perspectives for communication, security, health, energy, and industry. Foton connects knowledge, research, and dialogue around these transformations.',
              )}
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
            <Heading
              eyebrow={copy('Ecossistema Foton', 'Foton Ecosystem')}
              title={copy(
                'Ciência conectada em diferentes regiões.',
                'Connected science across different regions.',
              )}
            />
            <TextLink to="/instituto">{copy('Sobre a rede', 'About the network')}</TextLink>
          </div>
          <p className="section-description">
            {copy(
              'O Foton reúne trajetórias de diferentes áreas do conhecimento e conecta pessoas, pesquisadores e instituições em diferentes regiões do Brasil.',
              'Foton brings together paths from different fields of knowledge and connects people, researchers, and institutions across Brazil.',
            )}
          </p>
          <div className="documentary-metrics institutional-metrics">
            <InfoCard as="div" inheritVisuals catalogId="1.3.C1">
              <strong>15</strong>
              <span>{copy('estados representados', 'states represented')}</span>
            </InfoCard>
            <InfoCard as="div" inheritVisuals catalogId="1.3.C2">
              <strong>140+</strong>
              <span>{copy('membros registrados', 'registered members')}</span>
            </InfoCard>
            <p className="metrics-source">
              {copy(
                'Indicadores institucionais da rede Foton.',
                'Institutional indicators of the Foton network.',
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section spectral-divider" id="frentes" data-lcr-section-id="1.4">
        <div className="container">
          <div className="heading-row">
            <Heading
              eyebrow={copy('Frentes e programas', 'Programs and initiatives')}
              title={copy('Do conhecimento à articulação.', 'From knowledge to collaboration.')}
            />
          </div>
          <p className="section-description">
            {copy(
              'Conheça as frentes de pesquisa, formação, inovação e articulação do Foton.',
              'Explore Foton’s research, education, innovation, and collaboration initiatives.',
            )}
          </p>
          <div className="research-grid institutional-programs">
            {programs.map((program, index) => (
              <ActionCard
                className="research-card"
                to={program.to}
                key={program.title}
                catalogId={`1.4.C${index + 1}`}
              >
                <div className="card-top">
                  <span className="number">{String(index + 1).padStart(2, '0')}</span>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <span className="card-link">
                  {copy('Saiba mais', 'Learn more')} <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </ActionCard>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section-gray institutional-presentation"
        id="apresentacao"
        data-lcr-section-id="1.5"
      >
        <div className="container presentation-feature-layout">
          <div className="presentation-feature-copy">
            <Heading
              eyebrow={copy('Documento institucional', 'Institutional document')}
              title={copy('Conheça a apresentação do Foton.', 'Discover Foton’s presentation.')}
            />
          </div>
          <div className="presentation-feature-media">
            <Link
              to="/apresentacao"
              data-lcr-card-id="1.5.C1"
              className="presentation-preview-link"
              aria-label={copy(
                'Visualizar o PDF da apresentação institucional do Foton',
                'View Foton’s institutional presentation PDF',
              )}
            >
              <span className="presentation-preview-stack">
                <img
                  className="presentation-preview-image presentation-preview-back"
                  src={assetUrl('assets/WebP/apresentacao/ApresentacaoFotonPagina02.webp')}
                  alt={copy(
                    'Segunda página da apresentação institucional do Foton',
                    'Second page of Foton’s institutional presentation',
                  )}
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="presentation-preview-image presentation-preview-front"
                  src={assetUrl('assets/WebP/apresentacao/ApresentacaoFotonPagina01.webp')}
                  alt={copy(
                    'Capa oficial da apresentação institucional do Foton',
                    'Official cover of Foton’s institutional presentation',
                  )}
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                />
                <span className="presentation-preview-action" aria-hidden="true">
                  {copy('Visualizar apresentação', 'View presentation')} <ArrowUpRight size={20} />
                </span>
              </span>
            </Link>
            <p className="presentation-preview-caption">
              {copy(
                'Clique na imagem para acessar o PDF da apresentação institucional do Foton.',
                'Click the image to open Foton’s institutional presentation PDF.',
              )}
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
          <Heading
            eyebrow={copy('Contato', 'Contact')}
            title={copy('Converse com o Foton.', 'Talk to Foton.')}
          />
          <div className="body-copy">
            <p>
              {copy(
                'Converse com o Foton sobre ciência, pesquisa, colaboração e novas conexões pelos nossos canais de contato.',
                'Talk to Foton about science, research, collaboration, and new connections through our contact channels.',
              )}
            </p>
            <div className="institutional-contact-actions">
              <Action to="/contato">{copy('Canais de contato', 'Contact channels')}</Action>
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
              <p>
                O fóton é a partícula elementar da luz. Para o Foton, o nome simboliza ciência,
                conexão e transformação.
              </p>
              <blockquote>
                “Foton é luz. É ciência em movimento. É tecnologia com direção.”
              </blockquote>
            </div>
          </div>
        </section>
      </div>
      <FoundationTeaser />
      <InstitutePurpose />
      <section className="section" id="frentes-articulacao" data-lcr-section-id="2.A.6">
        <div className="container">
          <Heading eyebrow="Frentes de articulação" title="Ciência, formação e estratégia." />
          <div className="three-grid">
            <InfoCard as="div" className="info-card" catalogId="2.A.6.C1">
              <BookOpen aria-hidden="true" />
              <h3>Educação e formação</h3>
              <p>Promover a aproximação entre conhecimento científico, formação e sociedade.</p>
            </InfoCard>
            <InfoCard as="div" className="info-card" catalogId="2.A.6.C2">
              <Compass aria-hidden="true" />
              <h3>Pesquisa aplicada</h3>
              <p>Articular temas de investigação e colaboração entre diferentes áreas.</p>
            </InfoCard>
            <InfoCard as="div" className="info-card" catalogId="2.A.6.C3">
              <Network aria-hidden="true" />
              <h3>Inteligência estratégica</h3>
              <p>Conectar conhecimento e análise a decisões de organizações e sociedade.</p>
            </InfoCard>
          </div>
        </div>
      </section>
      <InstituteTeamDashboard />
      <OfficialStatements />
    </>
  );
}

const manifestoFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeYr2fuajfrVqG4fnEH4Gitja26eao_7hf7ybqRWfB98pgNgg/viewform';

function ManifestoParticipation({ placement }: { placement: 'top' | 'bottom' }) {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = (pt: string, en: string) => (english ? en : pt);
  return (
    <section
      className={`section manifesto-participation manifesto-participation--${placement}`}
      id={placement === 'top' ? 'contribuir-manifesto' : 'contribuir-manifesto-final'}
      data-lcr-section-id={placement === 'top' ? '5.2' : '5.10'}
      aria-labelledby={`manifesto-participation-${placement}`}
    >
      <div className="container manifesto-participation-layout">
        <div className="manifesto-participation-copy">
          <span className="eyebrow">
            {copy('Sua voz faz parte dessa construção', 'Your voice is part of this endeavor')}
          </span>
          <h2 id={`manifesto-participation-${placement}`}>
            {copy('Venha contribuir com o Manifesto.', 'Contribute to the Manifesto.')}
          </h2>
          <p>
            {copy(
              'Você também pode participar. Você também pode contribuir com o Manifesto Quântico Nacional. Basta clicar no formulário e compartilhar suas ideias.',
              'You can take part and contribute to the National Quantum Manifesto. Click the form and share your ideas.',
            )}
          </p>
          <p className="manifesto-participation-hint">
            <span>{copy('Consulta pública e gratuita', 'Free public consultation')}</span>
            <span aria-hidden="true">·</span>
            <span>
              {copy(
                'Reserve cerca de 5 a 10 minutos (estimativa)',
                'Allow approximately 5 to 10 minutes (estimate)',
              )}
            </span>
          </p>
          <p className="manifesto-participation-note">
            {copy(
              'O tempo de preenchimento pode variar conforme o conteúdo das suas respostas. O formulário abre em uma nova aba do Google Forms.',
              'Completion time may vary depending on your answers. The form opens in a new Google Forms tab.',
            )}
          </p>
        </div>
        <a
          className="manifesto-form-link"
          data-lcr-card-id={placement === 'top' ? '5.2.C1' : '5.10.C1'}
          href={manifestoFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy(
            'Responder ao formulário de contribuição para o Manifesto Quântico Nacional (abre em nova aba)',
            'Answer the contribution form for the National Quantum Manifesto (opens in a new tab)',
          )}
        >
          <span className="manifesto-form-stack" aria-hidden="true">
            <span className="manifesto-form-sheet manifesto-form-sheet--back">
              <span className="manifesto-form-sheet-top" />
              <span className="manifesto-form-line" />
              <span className="manifesto-form-line manifesto-form-line--short" />
              <span className="manifesto-form-radio" />
              <span className="manifesto-form-radio manifesto-form-radio--second" />
            </span>
            <span className="manifesto-form-sheet manifesto-form-sheet--front">
              <span className="manifesto-form-sheet-top" />
              <span className="manifesto-form-icon">✦</span>
              <span className="manifesto-form-title">
                {copy('Sua contribuição importa.', 'Your contribution matters.')}
              </span>
              <span className="manifesto-form-caption">
                {copy('Manifesto Quântico Nacional', 'National Quantum Manifesto')}
              </span>
              <span className="manifesto-form-line" />
              <span className="manifesto-form-line manifesto-form-line--short" />
              <span className="manifesto-form-radio" />
            </span>
            <span className="manifesto-form-action">
              {copy('Responder ao formulário', 'Answer the form')}{' '}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </span>
          <span className="manifesto-form-link-caption">
            {copy(
              'Clique no cartão para contribuir pelo Google Forms',
              'Click the card to contribute through Google Forms',
            )}
          </span>
        </a>
      </div>
    </section>
  );
}

export function Manifesto() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = (pt: string, en: string) => (english ? en : pt);
  const manifestoOdqs = english ? odqsEnglish : odqs;
  const manifestoMethodology = english ? methodologyEnglish : methodology;
  const manifestoCartas = english ? cartasEnglish : cartas;

  return (
    <>
      <ManifestoHero />
      <ManifestoParticipation placement="top" />
      <div className="anchor-bar">
        <div className="container">
          <a href="#sobre-manifesto">{copy('O movimento', 'The movement')}</a>
          <a href="#metodologia">{copy('Metodologia', 'Methodology')}</a>
          <a href="#cartas">{copy('Cartas regionais', 'Regional letters')}</a>
          <a href="#visitas">{copy('Visitas técnicas', 'Technical visits')}</a>
          <a href="#odqs">11 ODQs</a>
        </div>
      </div>
      <section className="section" id="sobre-manifesto" data-lcr-section-id="5.4">
        <div className="container split manifesto-overview">
          <div className="body-copy">
            <Heading
              eyebrow={copy('O movimento', 'The movement')}
              title={copy(
                'Ciência, governo, empresas e sociedade em diálogo.',
                'Science, government, companies, and society in dialogue.',
              )}
            />
            <p>
              {copy(
                'O Manifesto Quântico Nacional é um movimento que une ciência, governo, empresas e sociedade para construir uma agenda estratégica de tecnologias quânticas no Brasil.',
                'The National Quantum Manifesto is a movement that brings together science, government, companies, and society to build a strategic agenda for quantum technologies in Brazil.',
              )}
            </p>
            <p>
              {copy(
                'É uma iniciativa colaborativa, conduzida pelo Foton, para transformar conhecimento em direção, impacto e soberania tecnológica.',
                'It is a collaborative initiative led by Foton to turn knowledge into direction, impact, and technological sovereignty.',
              )}
            </p>
          </div>
          <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
            <ManifestoMedia kind="overview" />
          </Suspense>
        </div>
      </section>
      <section
        className="section section-gray manifesto-importance spectral-divider"
        id="manifesto-importancia"
        data-lcr-section-id="5.5"
      >
        <div className="container split">
          <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
            <ManifestoMedia kind="importance" />
          </Suspense>
          <div className="body-copy">
            <Heading
              eyebrow={copy('O futuro já começou', 'The future has already begun')}
              title={copy('Por que isso é importante?', 'Why does this matter?')}
            />
            <p>
              {copy(
                'Tecnologias quânticas já moldam segurança, economia e inovação no mundo. O Brasil tem base científica forte, mas falta integrar esforços.',
                'Quantum technologies are already shaping security, the economy, and innovation worldwide. Brazil has a strong scientific base, but its efforts still need to be integrated.',
              )}
            </p>
            <p>
              {copy(
                'O Manifesto organiza essa convergência para que o país lidere, e não apenas acompanhe, a nova era tecnológica.',
                'The Manifesto organizes this convergence so that Brazil can lead, rather than merely follow, the new technological era.',
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="section section-gray" id="metodologia" data-lcr-section-id="5.6">
        <div className="container">
          <div className="split manifesto-method-intro">
            <div>
              <Heading
                eyebrow={copy('Como faremos isso', 'How will we do it?')}
                title={copy(
                  'Escuta regional. Articulação nacional.',
                  'Regional listening. National coordination.',
                )}
              />
              <p className="section-description">
                {copy(
                  'A construção é coletiva e nacional, com escuta ativa em todas as regiões do país. As contribuições de especialistas conduzem a criação das Cartas Macrorregionais e orientam os 11 Objetivos de Desenvolvimento Quântico, que guiam a ação do Manifesto.',
                  'The process is collective and national, with active listening in every region of the country. Expert contributions guide the creation of the Macroregional Letters and the 11 Quantum Development Objectives that guide the Manifesto’s action.',
                )}
              </p>
            </div>
            <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
              <ManifestoMedia kind="method" />
            </Suspense>
          </div>
          <ol className="methodology">
            {manifestoMethodology.map((step, index) => (
              <InfoCard as="li" inheritVisuals key={step.num} catalogId={`5.6.C${index + 1}`}>
                <span className="number">0{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </InfoCard>
            ))}
          </ol>
        </div>
      </section>
      <section className="section" id="cartas" data-lcr-section-id="5.7">
        <div className="container">
          <Heading
            eyebrow={copy('Cinco macrorregiões', 'Five macro-regions')}
            title={copy('O Brasil em muitas vozes.', 'Brazil in many voices.')}
          />
          <p className="section-description">
            {copy(
              'As Cartas reúnem perspectivas regionais na construção do Manifesto. Conheça os relatos de cada região.',
              'The Letters bring regional perspectives into the Manifesto. Explore each region’s account.',
            )}
          </p>
          <div className="regional-letters">
            {manifestoCartas.map((carta, index) => (
              <InfoCard
                as="article"
                inheritVisuals
                className="regional-letter"
                key={carta.region}
                catalogId={`5.7.C${index + 1}`}
              >
                <div>
                  <span className="number">0{index + 1}</span>
                  <h3>{carta.region}</h3>
                  <p>{carta.text}</p>
                </div>
                <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
                  <ManifestoMedia
                    kind="letter"
                    region={cartas[index].region}
                    caption={carta.text}
                  />
                </Suspense>
              </InfoCard>
            ))}
          </div>
        </div>
      </section>
      <section
        className="section visits-section spectral-divider"
        id="visitas"
        data-lcr-section-id="5.8"
      >
        <div className="container">
          <Heading
            eyebrow={copy('Conexões em campo', 'Connections in the field')}
            title={copy(
              'Visitas técnicas que aproximam o ecossistema.',
              'Technical visits that bring the ecosystem closer.',
            )}
          />
          <p className="section-description">
            {copy(
              'Registros de encontros com pesquisadores, instituições, empresas e ambientes de inovação em diferentes regiões do país.',
              'Records of meetings with researchers, institutions, companies, and innovation environments across the country.',
            )}
          </p>
          <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
            <ManifestoMedia kind="visits" />
          </Suspense>
        </div>
      </section>
      <section className="section section-gray" id="odqs" data-lcr-section-id="5.9">
        <div className="container">
          <Heading
            eyebrow={copy(
              'Objetivos de Desenvolvimento Quântico',
              'Quantum Development Objectives',
            )}
            title={copy(
              '11 objetivos. Um horizonte compartilhado.',
              '11 objectives. A shared horizon.',
            )}
          />
          <p className="section-description">
            {copy(
              'Conheça os objetivos que orientam a construção do Manifesto.',
              'Explore the objectives that guide the Manifesto.',
            )}
          </p>
          <div className="odq-grid">
            {manifestoOdqs.map((odq) => (
              <InfoCard
                as="article"
                inheritVisuals
                catalogId={`5.9.C${odq.id}`}
                className={`odq-card ${[6, 10].includes(odq.id) ? 'odq-highlight' : ''}`}
                key={odq.id}
              >
                <span className="number">ODQ {String(odq.id).padStart(2, '0')}</span>
                <h3>{odq.title}</h3>
                <p>{odq.desc}</p>
              </InfoCard>
            ))}
          </div>
        </div>
      </section>
      <ManifestoParticipation placement="bottom" />
    </>
  );
}

export function Contact() {
  return (
    <>
      <Intro
        eyebrow="Contato"
        title="Boas conexões começam com uma conversa."
        id="contato-intro"
        sectionCode="8.1"
      >
        <p>
          Pesquisa, educação, apoio à ciência, patrocínio ou imprensa: encontre os canais do
          Instituto.
        </p>
      </Intro>
      <section className="section">
        <div className="container reading">
          <Heading title="Fale com o Foton" />
          <p>
            Encontre os canais oficiais para conversar com a equipe sobre pesquisa, educação,
            colaboração e iniciativas institucionais.
          </p>
          <External href="https://institutofoton.com.br/" className="button">
            Acessar canais institucionais
          </External>
          <div className="notice">
            <h2>Como podemos nos conectar?</h2>
            <ul className="topic-list">
              <li>Quero conhecer o Instituto</li>
              <li>Pesquisa e colaboração</li>
              <li>Apoio à ciência</li>
              <li>Patrocínio empresarial</li>
              <li>Imprensa</li>
            </ul>
            <p>Escolha o assunto e converse com o Foton pelos canais oficiais.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Legal({ terms = false }: { terms?: boolean }) {
  return (
    <>
      <Intro
        eyebrow={terms ? 'Uso do portal' : 'Privacidade'}
        title={terms ? 'Informação com responsabilidade.' : 'Respeito às pessoas e seus dados.'}
      />
      <section className="section">
        <div className="container reading">
          {terms ? (
            <>
              <h2>Sobre o conteúdo</h2>
              <p>
                O portal reúne informações institucionais e científicas do Instituto Foton. As
                informações educativas têm finalidade de divulgação e comunicação científica.
              </p>
              <h2>Iniciativas e colaboração</h2>
              <p>
                Para informações sobre atividades, cooperação e apoio à ciência, utilize os canais
                oficiais do Instituto.
              </p>
              <h2>Fontes e referências</h2>
              <p>
                A apresentação institucional está disponível para consulta pública. Conteúdos de
                terceiros são identificados por suas fontes quando aplicável.
              </p>
            </>
          ) : (
            <>
              <h2>Navegação e informações técnicas</h2>
              <p>
                O site disponibiliza páginas e documentos institucionais públicos. O serviço de
                hospedagem pode processar registros técnicos necessários ao funcionamento e à
                segurança da navegação.
              </p>
              <h2>Contato institucional</h2>
              <p>
                Questões sobre privacidade e tratamento de informações podem ser encaminhadas pelos
                canais oficiais do Instituto Foton.
              </p>
              <h2>Sites e serviços externos</h2>
              <p>
                Links para serviços externos seguem as políticas de privacidade e os termos próprios
                de seus responsáveis.
              </p>
              <TextLink to="/contato">Canais institucionais</TextLink>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <Intro eyebrow="Página não encontrada · 404" title="Vamos encontrar outro caminho.">
        <p>Confira o endereço ou utilize o menu para conhecer as páginas do Instituto.</p>
      </Intro>
      <section className="section">
        <div className="container">
          <Action to="/">Voltar para o início</Action>
        </div>
      </section>
    </>
  );
}
