import { Suspense, lazy, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowDown,
  MoveUpRight,
  Network,
  Compass,
  BookOpen,
  HeartHandshake,
} from 'lucide-react';
import { Action, TextLink, Intro, Heading, External } from '../components/UI';
import Constellation from '../components/Constellation';
import { FotonPhoto } from './FotonPhoto';
import { HumanMosaic } from './HumanMosaic';
import { HumanPageHero } from './HumanPageHero';
import { researchLines, journeySteps } from './content';
import { odqs, cartas, methodology } from './manifesto-content';
import OfficialStatements from './OfficialStatements';
const LatestNews = lazy(() => import('./LatestNews'));
const ManifestoMedia = lazy(() => import('./ManifestoMedia'));

export function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              Ciência. Pessoas. Possibilidades.
            </p>
            <h1>
              A ciência
              <br />
              não tem idade.
              <br />
              <em>
                O futuro
                <br />
                também é seu.
              </em>
            </h1>
            <p className="hero-description">
              Conectamos conhecimento, pessoas e oportunidades para aproximar a ciência da vida. Há
              um lugar nessa conversa para você.
            </p>
            <div className="actions">
              <Action to="/instituto">Conheça o Instituto</Action>
              <TextLink to="/apoie">Apoie a Ciência</TextLink>
            </div>
            <a className="scroll-hint" href="#nossa-rede">
              <ArrowDown size={15} aria-hidden="true" />
              Descubra o que nos conecta
            </a>
          </div>
          <FotonPhoto
            id="home-hero-community"
            priority
            className="hero-photography"
            fallback={<Constellation />}
          />
        </div>
      </section>
      <div className="values-strip">
        <div className="container">
          <span>Da curiosidade ao impacto.</span>
          <span>Conhecimento sem fronteiras.</span>
          <span>Gerações que se encontram.</span>
        </div>
      </div>
      <HumanMosaic />
      <section className="section spectral-divider" id="nossa-rede">
        <div className="container split">
          <Heading
            eyebrow="Nossa razão de existir"
            title="O conhecimento ganha força quando é compartilhado."
          />
          <div className="body-copy">
            <blockquote>
              “Transformar ciência de fronteira em decisões, soluções e oportunidades.”
            </blockquote>
            <p>
              O Instituto Foton articula pessoas e instituições em torno da ciência e das
              tecnologias quânticas. Nosso portal científico e social aproxima pesquisa, educação e
              sociedade.
            </p>
            <p>
              Trabalhamos em rede. Diferentes áreas, experiências e gerações se encontram para
              transformar perguntas em caminhos de investigação.
            </p>
            <TextLink to="/instituto">Uma ciência que conecta</TextLink>
          </div>
        </div>
        <div className="container documentary-metrics">
          <div>
            <strong>15</strong>
            <span>estados</span>
          </div>
          <div>
            <strong>140+</strong>
            <span>membros</span>
          </div>
          <p>
            Uma rede de muitas trajetórias.
            <br />
            <span>Setembro de 2026.</span>
            <br />
            <TextLink to="/apresentacao">Conheça nossa apresentação</TextLink>
          </p>
        </div>
      </section>
      <section className="section human-story-section spectral-divider">
        <div className="container human-story-layout">
          <FotonPhoto
            id="home-science-network"
            className="story-photography"
          />
          <div className="human-story-copy">
            <p className="eyebrow"><span /> Encontros que fazem ciência</p>
            <h2>Por trás de cada descoberta, existem pessoas.</h2>
            <p>
              O conhecimento avança quando pesquisadores, estudantes e pessoas de diferentes
              trajetórias podem conversar, compartilhar dúvidas e abrir caminhos em conjunto.
            </p>
            <p>
              Nesta demonstração, as fotografias de pessoas foram geradas por inteligência
              artificial. Elas ilustram encontros e descobertas, mas não retratam eventos,
              integrantes ou resultados reais do Instituto.
            </p>
            <div className="actions">
              <Action to="/instituto">Conheça nossa história</Action>
              <TextLink to="/transparencia">Consultar transparência</TextLink>
            </div>
          </div>
        </div>
      </section>
      <section className="section home-legacy-section spectral-divider">
        <div className="container home-legacy-layout">
          <div>
            <p className="eyebrow"><span /> Experiência e novos olhares</p>
            <h2>O conhecimento não tem idade.</h2>
            <p>
              Pesquisadores experientes e jovens talentos podem aprender uns com os outros.
              Essa diversidade de trajetórias faz parte do futuro que queremos construir.
            </p>
            <TextLink to="/instituto">Conheça nossa trajetória</TextLink>
          </div>
          <FotonPhoto id="home-generational-legacy" className="home-legacy-photo" />
        </div>
      </section>
      <section className="section section-gray spectral-divider">
        <div className="container">
          <div className="heading-row">
            <Heading eyebrow="Pesquisa em rede" title="Grandes perguntas pedem muitos olhares." />
            <TextLink to="/pesquisa">Explore nossas áreas</TextLink>
          </div>
          <div className="research-grid">
            {researchLines.slice(0, 3).map((line, i) => (
              <Link to={`/pesquisa/${line.slug}`} className="research-card" key={line.slug}>
                <div className="card-top">
                  <span className="number">{line.label}</span>
                  {i === 0 ? (
                    <Network aria-hidden="true" />
                  ) : i === 1 ? (
                    <Compass aria-hidden="true" />
                  ) : (
                    <MoveUpRight aria-hidden="true" />
                  )}
                </div>
                <h3>{line.title}</h3>
                <p>{line.summary}</p>
                <span className="card-link">
                  Conheça essa área
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="journey-feature section spectral-divider">
        <div className="container split">
          <div>
            <p className="eyebrow">
              <span />
              Jornada do Cientista Inovador
            </p>
            <h2>
              Não existe uma
              <br />
              única maneira
              <br />
              de <em>começar.</em>
            </h2>
            <p>
              Na escola, na universidade ou depois de uma longa carreira: a curiosidade pode abrir
              um novo capítulo em qualquer momento da vida.
            </p>
            <Action to="/jornada">Encontre seu ponto de partida</Action>
          </div>
          <div className="journey-visual" aria-label="Etapas ilustrativas da jornada científica">
            {journeySteps.map(([title], i) => (
              <div key={title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <ArrowUpRight aria-hidden="true" size={21} />
              </div>
            ))}
            <p>Uma jornada de possibilidades. Cada trajetória é única.</p>
          </div>
        </div>
      </section>
      <section className="manifesto-feature spectral-divider">
        <div className="container">
          <div>
            <p className="eyebrow">
              <span />
              Manifesto Quântico Nacional
            </p>
            <h2>
              O futuro da ciência
              <br />é uma construção
              <br />
              <em>coletiva.</em>
            </h2>
            <p>
              Por um Brasil mais competitivo, conectado e soberano. Conheça o movimento, as Cartas
              Macrorregionais e os 11 Objetivos de Desenvolvimento Quântico.
            </p>
            <Action to="/manifesto">Conheça o Manifesto</Action>
          </div>
          <div className="manifesto-graphic" aria-hidden="true">
            <span>BR</span>
            <div className="region-names">
              Norte · Nordeste
              <br />
              Centro-Oeste
              <br />
              Sudeste · Sul
            </div>
            <span className="manifesto-note">
              Diferentes territórios.
              <br />
              Um horizonte em comum.
            </span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="heading-row">
            <Heading eyebrow="Notícias e histórias" title="Conhecimento em movimento." />
            <TextLink to="/noticias">Acompanhe as publicações</TextLink>
          </div>
          <Suspense fallback={<p role="status">Carregando publicações…</p>}>
            <LatestNews />
          </Suspense>
        </div>
      </section>
      <SupportCTA />
    </>
  );
}

export function SupportCTA() {
  return (
    <section className="support-cta">
      <div className="container">
        <HeartHandshake size={44} strokeWidth={1.3} aria-hidden="true" />
        <div>
          <p className="eyebrow">Apoie a Ciência</p>
          <h2>
            Uma oportunidade pode
            <br />
            mudar uma trajetória.
          </h2>
          <p>Conheça as formas de apoiar o desenvolvimento científico.</p>
        </div>
        <Action to="/apoie">Ajude um Cientista Inovador</Action>
      </div>
    </section>
  );
}

function InstituteLightPath() {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const pulse = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const wrapper = root.current?.parentElement;
    const drawing = svg.current;
    const line = path.current;
    const light = pulse.current;
    if (
      !wrapper ||
      !drawing ||
      !line ||
      !light ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    let frame = 0;
    let arrived = false;
    let wordCenterY = 0;
    const layoutPath = () => {
      const bounds = wrapper.getBoundingClientRect();
      const title = wrapper.querySelector<HTMLElement>('.page-intro h1');
      const history = wrapper.querySelector<HTMLElement>(':scope > section:nth-of-type(2) h2');
      const word = wrapper.querySelector<HTMLElement>('.large-word');
      if (!title || !history || !word) return;
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
      const historyAt = relative(history);
      const wordAt = relative(word);
      wordCenterY = wordAt.y;
      const wordEntranceX = Math.max(22, wordAt.x - word.offsetWidth / 2 - 26);
      drawing.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
      line.setAttribute(
        'd',
        `M ${Math.max(26, titleAt.x - title.offsetWidth / 2)} 10
         C ${bounds.width * 0.04} ${titleAt.y * 0.18}, ${bounds.width * 0.98} ${titleAt.y * 0.34}, ${bounds.width * 0.9} ${titleAt.y}
         C ${bounds.width * 1.08} ${historyAt.y * 0.5}, ${bounds.width * 0.08} ${historyAt.y * 0.58}, ${historyAt.x} ${historyAt.y}
         C ${bounds.width * 0.02} ${(historyAt.y + wordAt.y) / 2}, ${Math.max(8, wordEntranceX - bounds.width * 0.18)} ${wordAt.y * 0.93}, ${wordEntranceX} ${wordAt.y}`,
      );
    };
    const update = () => {
      frame = 0;
      const rect = wrapper.getBoundingClientRect();
      const top = scrollY + rect.top;
      const start = top - innerHeight * 0.12;
      const end = top + wordCenterY - innerHeight * 0.55;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / Math.max(end - start, 1)));
      line.style.strokeDashoffset = String(1 - progress);
      line.style.opacity = String(Math.min(0.28, 0.05 + progress * 0.24));
      const point = line.getPointAtLength(line.getTotalLength() * progress);
      light.setAttribute('cx', String(point.x));
      light.setAttribute('cy', String(point.y));
      light.style.opacity = progress > 0.015 && progress < 0.995 ? '1' : '0';
      if (!arrived && progress >= 0.985) {
        arrived = true;
        wrapper.classList.add('pulse-arrived');
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      layoutPath();
      schedule();
    };
    layoutPath();
    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', resize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', resize);
    };
  }, []);

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
        <path
          ref={path}
          pathLength="1"
          d="M0 0"
        />
        <circle ref={pulse} r="7" cx="70" cy="35" />
      </svg>
    </div>
  );
}

export function Institute() {
  return (
    <>
      <div className="institute-story">
        <InstituteLightPath />
        <Intro eyebrow="O Instituto" title="Ciência que aproxima. Conhecimento que transforma.">
          <p>
            Somos uma rede que conecta pessoas, instituições e diferentes áreas do conhecimento em
            torno da ciência quântica.
          </p>
        </Intro>
        <section className="section institute-banner-section">
          <div className="container institute-banner-layout">
            <div>
              <p className="eyebrow"><span /> Uma ciência construída em rede</p>
              <h2>Pessoas, gerações e conhecimento em diálogo.</h2>
              <p>
                A tecnologia ganha significado quando conecta diferentes experiências e ideias.
                As cenas ilustrativas mostram essa intenção, sem representar encontros reais do Foton.
              </p>
            </div>
            <FotonPhoto id="instituto-community" priority className="institute-banner-photo" />
          </div>
        </section>
        <section className="section">
          <div className="container split">
            <Heading eyebrow="Nossa história" title="Uma inquietação que se tornou encontro." />
            <div className="body-copy">
              <p>
                O percurso de articulação do Foton começou em 2023. Em 2024, conexões com
                pesquisadores e iniciativas acadêmicas ampliaram a formação científica e a
                construção de uma rede nacional.
              </p>
              <p>
                O Instituto foi fundado em <strong>14 de abril de 2025</strong>, com o apoio de 35
                membros de diferentes estados brasileiros.
              </p>
            </div>
          </div>
        </section>
        <section className="section section-gray photon-section">
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
            <div className="large-word" aria-label="fóton">
              <span className="photon-wave" aria-hidden="true">
                {'fóton'.split('').map((letter, index) => (
                  <span key={`${letter}-${index}`}>{letter}</span>
                ))}
              </span>
              <span className="large-word-caption">luz · conexão · ciência</span>
            </div>
            <div>
              <Heading eyebrow="Por que Foton?" title="Um nome que carrega uma ideia de movimento." />
              <p>
                O fóton é a partícula elementar da luz. Para o Instituto, o nome simboliza ciência,
                conexão e transformação.
              </p>
              <blockquote>
                “Foton é luz. É ciência em movimento. É tecnologia com direção.”
              </blockquote>
            </div>
          </div>
        </section>
      </div>
      <section className="section">
        <div className="container">
          <Heading eyebrow="O que nos conecta" title="Conhecimento, formação e colaboração." />
          <div className="three-grid">
            <div className="info-card">
              <BookOpen aria-hidden="true" />
              <h3>Ensino</h3>
              <p>Aproximar pessoas do conhecimento e valorizar trajetórias de aprendizado.</p>
            </div>
            <div className="info-card">
              <Compass aria-hidden="true" />
              <h3>Pesquisa</h3>
              <p>
                Investigar questões científicas por meio de articulação entre especialidades e
                instituições.
              </p>
            </div>
            <div className="info-card">
              <Network aria-hidden="true" />
              <h3>Negócios e Inovação</h3>
              <p>Conectar o conhecimento científico a desafios e oportunidades da sociedade.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section institute-people spectral-divider">
        <div className="container institute-people-grid">
          <div>
            <p className="eyebrow"><span /> O encontro entre gerações</p>
            <h2>O futuro da ciência se constrói em conjunto.</h2>
            <p>
              A trajetória do Instituto também se revela nos momentos de troca,
              colaboração e aproximação com diferentes ambientes de ciência e inovação.
            </p>
            <TextLink to="/manifesto">Conheça as iniciativas</TextLink>
          </div>
          <FotonPhoto
            id="home-generational-legacy"
            className="institute-photography"
          />
        </div>
      </section>
      <OfficialStatements />
      <section className="section section-gray">
        <div className="container split">
          <Heading
            eyebrow="Um legado entre gerações"
            title="Experiência e novos olhares têm muito a compartilhar."
          />
          <div>
            <p>
              A ciência se fortalece quando diferentes trajetórias se encontram. Acolher quem está
              começando e quem traz décadas de experiência é parte da proposta deste portal.
            </p>
            <p>
              Conheça a estrutura de transparência e os documentos institucionais disponíveis para
              divulgação pública.
            </p>
            <div className="actions">
              <Action to="/transparencia">Transparência</Action>
              <TextLink to="/apresentacao">Apresentação institucional</TextLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Research() {
  const { slug } = useParams();
  const selected = researchLines.find((l) => l.slug === slug);
  if (slug && !selected) return <NotFound />;
  if (selected)
    return (
      <>
        <Intro eyebrow={`Pesquisa · Área ${selected.label}`} title={selected.title}>
          <p>{selected.summary}</p>
        </Intro>
        <section className="section">
          <div className="container reading">
            <p className="lead">{selected.description}</p>
            <h2>Perspectivas de investigação</h2>
            <ul className="topic-list">
              {selected.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <div className="notice">
              <h3>Pesquisa se faz em rede</h3>
              <p>
                As áreas apresentadas são campos de investigação. Elas não representam laboratórios
                próprios, produtos disponíveis ou garantia de resultados.
              </p>
            </div>
            <div className="actions">
              <Action to="/pesquisa">Todas as áreas</Action>
              <TextLink to="/jornada">Conheça a Jornada</TextLink>
            </div>
          </div>
        </section>
        <SupportCTA />
      </>
    );
  return (
    <>
      <HumanPageHero
        eyebrow="Pesquisa e ecossistema"
        title="Diferentes saberes. Perguntas em comum."
        description="Tecnologias quânticas são um campo de investigação que pede colaboração. Conheça as áreas que conectam nossa rede."
        photoId="pesquisa-collaboration"
      >
        <Action to="/jornada">Conheça a Jornada</Action>
      </HumanPageHero>
      <section className="section">
        <div className="container">
          <div className="research-grid full-research">
            {researchLines.map((line) => (
              <Link className="research-card" to={`/pesquisa/${line.slug}`} key={line.slug}>
                <div className="card-top">
                  <span className="number">{line.label}</span>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <h2>{line.title}</h2>
                <p>{line.summary}</p>
                <span className="card-link">
                  Explorar essa área
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-gray">
        <div className="container split">
          <Heading
            eyebrow="Ciência acontece em rede"
            title="Conexões que respeitam a contribuição de cada parte."
          />
          <div>
            <p>
              Universidades, instituições de pesquisa, profissionais e organizações podem reunir
              conhecimentos complementares. Projetos, instalações e resultados devem ser atribuídos
              a seus responsáveis.
            </p>
            <p>
              O catálogo de parceiros e projetos será disponibilizado com vínculos, fontes e
              informações institucionais validados.
            </p>
            <TextLink to="/contato">Conheça os canais institucionais</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}

export function Journey() {
  return (
    <>
      <HumanPageHero
        eyebrow="Jornada do Cientista Inovador"
        title="A próxima pergunta pode ser sua."
        description="A curiosidade pode surgir na escola, amadurecer na universidade ou ganhar novo sentido depois de uma carreira inteira."
        photoId="jornada-hero-pathways"
      >
        <Action to="/pesquisa">Explore a pesquisa</Action>
        <TextLink to="/instituto">Conheça o Instituto</TextLink>
      </HumanPageHero>
      <section className="section">
        <div className="container">
          <Heading
            eyebrow="Cada trajetória tem seu tempo"
            title="Você não precisa ter todas as respostas para começar."
          />
          <div className="three-grid journey-photo-grid">
            {([
              { id: 'mosaic-students', title: 'Estou começando',
                text: 'Observe, pergunte e construa repertório. A ciência também começa nas questões que surgem no cotidiano.' },
              { id: 'mosaic-training', title: 'Quero me aproximar da pesquisa',
                text: 'Conheça áreas de investigação, aprofunde fundamentos e descubra a importância da colaboração científica.' },
              { id: 'mosaic-collaborators', title: 'Tenho experiência e quero contribuir',
                text: 'Seu percurso profissional pode trazer perspectivas valiosas. Novos caminhos também se abrem a partir da experiência.' },
            ] as const).map(({ id, title, text }) => (
              <div className="info-card journey-photo-card" key={title}>
                <FotonPhoto id={id} className="journey-step-photo" showCaption={false} />
                <h3>{title}</h3>
                <p>{text}</p>
                <TextLink to="/pesquisa">Explore a pesquisa</TextLink>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-gray">
        <div className="container">
          <Heading
            eyebrow="Uma trajetória possível"
            title="Da curiosidade ao conhecimento compartilhado."
          />
          <p className="section-description">
            Este percurso é ilustrativo. Cada pessoa e cada pesquisa têm seu próprio caminho.
          </p>
          <ol className="journey-steps">
            {journeySteps.map(([title, text], i) => (
              <li key={title}>
                <span className="number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="notice">
            <h3>Acompanhe os próximos passos</h3>
            <p>
              Esta página apresenta a proposta da Jornada. Cadastros individuais, mentorias e bolsas
              não estão disponíveis aqui. Oportunidades serão comunicadas pelos canais
              institucionais quando houver chamadas oficiais.
            </p>
            <TextLink to="/noticias">Notícias e atualizações</TextLink>
          </div>
        </div>
      </section>
      <SupportCTA />
    </>
  );
}

export function Manifesto() {
  return (
    <>
      <Intro eyebrow="Uma construção coletiva" title="Manifesto Quântico Nacional">
        <p>Por um Brasil mais competitivo, conectado e soberano.</p>
      </Intro>
      <div className="anchor-bar">
        <div className="container">
          <a href="#sobre-manifesto">O movimento</a>
          <a href="#metodologia">Metodologia</a>
          <a href="#cartas">Cartas regionais</a>
          <a href="#visitas">Visitas técnicas</a>
          <a href="#odqs">11 ODQs</a>
        </div>
      </div>
      <section className="section" id="sobre-manifesto">
        <div className="container split manifesto-overview">
          <div className="body-copy">
            <Heading
              eyebrow="O movimento"
              title="Ciência, governo, empresas e sociedade em diálogo."
            />
            <p>
              O Manifesto Quântico Nacional é um movimento que une ciência, governo, empresas e
              sociedade para construir uma agenda estratégica de tecnologias quânticas no Brasil.
            </p>
            <p>
              É uma iniciativa colaborativa, conduzida pelo Foton, para transformar conhecimento em
              direção, impacto e soberania tecnológica.
            </p>
          </div>
          <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
            <ManifestoMedia kind="overview" />
          </Suspense>
        </div>
      </section>
      <section className="section section-gray manifesto-importance spectral-divider">
        <div className="container split">
          <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
            <ManifestoMedia kind="importance" />
          </Suspense>
          <div className="body-copy">
            <Heading eyebrow="O futuro já começou" title="Por que isso é importante?" />
            <p>
              Tecnologias quânticas já moldam segurança, economia e inovação no mundo. O Brasil tem
              base científica forte, mas falta integrar esforços.
            </p>
            <p>
              O Manifesto organiza essa convergência para que o país lidere, e não apenas acompanhe,
              a nova era tecnológica.
            </p>
          </div>
        </div>
      </section>
      <section className="section section-gray" id="metodologia">
        <div className="container">
          <div className="split manifesto-method-intro">
            <div>
              <Heading eyebrow="Como faremos isso" title="Escuta regional. Articulação nacional." />
              <p className="section-description">
                A construção é coletiva e nacional, com escuta ativa em todas as regiões do país.
                As contribuições de especialistas conduzem a criação das Cartas Macrorregionais e
                orientam os 11 Objetivos de Desenvolvimento Quântico, que guiam a ação do Manifesto.
              </p>
            </div>
            <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
              <ManifestoMedia kind="method" />
            </Suspense>
          </div>
          <ol className="methodology">
            {methodology.map((step) => (
              <li key={step.num}>
                <span className="number">0{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section" id="cartas">
        <div className="container">
          <Heading eyebrow="Cinco macrorregiões" title="O Brasil em muitas vozes." />
          <p className="section-description">
            As Cartas reúnem perspectivas regionais na construção do Manifesto. Conheça os relatos
            de cada região.
          </p>
          <div className="regional-letters">
            {cartas.map((carta, index) => (
              <article className="regional-letter" key={carta.region}>
                <div>
                  <span className="number">0{index + 1}</span>
                  <h3>{carta.region}</h3>
                  <p>{carta.text}</p>
                </div>
                <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
                  <ManifestoMedia kind="letter" region={carta.region} caption={carta.text} />
                </Suspense>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section visits-section spectral-divider" id="visitas">
        <div className="container">
          <Heading
            eyebrow="Conexões em campo"
            title="Visitas técnicas que aproximam o ecossistema."
          />
          <p className="section-description">
            Registros de encontros com pesquisadores, instituições, empresas e ambientes de
            inovação em diferentes regiões do país.
          </p>
          <Suspense fallback={<div className="media-placeholder" aria-hidden="true" />}>
            <ManifestoMedia kind="visits" />
          </Suspense>
        </div>
      </section>
      <section className="section section-gray" id="odqs">
        <div className="container">
          <Heading
            eyebrow="Objetivos de Desenvolvimento Quântico"
            title="11 objetivos. Um horizonte compartilhado."
          />
          <p className="section-description">
            Conheça os objetivos que orientam a construção do Manifesto.
          </p>
          <div className="odq-grid">
            {odqs.map((odq) => (
              <article
                className={`odq-card ${[6, 10].includes(odq.id) ? 'odq-highlight' : ''}`}
                key={odq.id}
              >
                <span className="number">ODQ {String(odq.id).padStart(2, '0')}</span>
                <h3>{odq.title}</h3>
                <p>{odq.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SupportCTA />
    </>
  );
}

export function Contact() {
  return (
    <>
      <Intro eyebrow="Contato" title="Boas conexões começam com uma conversa.">
        <p>
          Pesquisa, educação, apoio à ciência, patrocínio ou imprensa: encontre os canais do
          Instituto.
        </p>
      </Intro>
      <section className="section">
        <div className="container reading">
          <Heading title="Fale com o Instituto Foton" />
          <p>
            Consulte os canais publicados no site institucional comercial para conversar com a
            equipe sobre sua área de interesse.
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
            <p>
              Este portal não recebe mensagens por formulário nesta versão. Não solicitamos dados
              pessoais ou financeiros por aqui.
            </p>
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
        title={terms ? 'Informação com responsabilidade.' : 'Respeito pelas pessoas e seus dados.'}
      />
      <section className="section">
        <div className="container reading">
          {terms ? (
            <>
              <h2>Sobre este portal</h2>
              <p>
                O portal apresenta informações científicas e institucionais. Conteúdo educativo não
                representa promessa de resultado científico, orientação profissional individualizada
                ou oferta de investimento.
              </p>
              <h2>Apoio à ciência</h2>
              <p>
                As modalidades apresentadas são informativas e estão em estruturação. Este site não
                processa doações, Pix, pagamentos ou inscrições em bolsas.
              </p>
              <h2>Fontes e links</h2>
              <p>
                Conteúdo de terceiros permanece sob responsabilidade de sua fonte. Consulte a origem
                indicada para verificar atualizações e condições de uso.
              </p>
            </>
          ) : (
            <>
              <h2>Navegação pública</h2>
              <p>
                Esta versão não inclui ferramentas de publicidade, rastreamento de visitantes,
                formulário de contato ou processamento de pagamentos. A hospedagem e os serviços de
                infraestrutura podem tratar registros técnicos necessários à entrega e à proteção do
                site.
              </p>
              <h2>Acesso institucional</h2>
              <p>
                O login é destinado a Marketing e Diretoria e utiliza Google e Supabase.
                Identificadores de conta e sessão são usados para autenticar a pessoa e verificar
                sua autorização institucional. A biblioteca oficial mantém a sessão no navegador;
                ela pode ser encerrada pelo botão de sair.
              </p>
              <h2>Serviços externos</h2>
              <p>
                Links externos e o login levam a serviços com políticas próprias. Este portal não
                recebe sua senha Google.
              </p>
              <h2>Contato e direitos</h2>
              <p>
                Para questões sobre dados e identificação dos responsáveis institucionais, consulte
                os canais oficiais do Instituto. Uma política institucional completa será
                disponibilizada após aprovação; este aviso descreve os recursos desta versão.
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
        <p>Esta página não existe ou o conteúdo ainda não está disponível para publicação.</p>
      </Intro>
      <section className="section">
        <div className="container">
          <Action to="/">Voltar para o início</Action>
        </div>
      </section>
    </>
  );
}
