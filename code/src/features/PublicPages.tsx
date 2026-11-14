import { Suspense, lazy, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Network, Compass, BookOpen } from 'lucide-react';
import { Action, TextLink, Intro, Heading, External } from '../components/UI';
import { researchLines } from './content';
import PartnerEcosystem from './PartnerEcosystem';
import PhotonIdentityAnimation from '../components/PhotonIdentityAnimation';
import { odqs, cartas, methodology } from './manifesto-content';
import OfficialStatements from './OfficialStatements';
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
      to: '/jornada',
    },
  ];
  return (
    <>
      <section className="home-hero home-hero-minimal">
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
          <div className="hero-identity" aria-hidden="true">
            <span className="hero-identity-orbit hero-identity-orbit-one" />
            <span className="hero-identity-orbit hero-identity-orbit-two" />
            <span className="hero-identity-orbit hero-identity-orbit-three" />
            <span className="hero-identity-nucleus" />
            <span className="hero-identity-spark spark-one" />
            <span className="hero-identity-spark spark-two" />
            <span className="hero-identity-spark spark-three" />
            <span className="hero-identity-spark spark-four" />
            <span className="hero-identity-equation">E = hν</span>
          </div>
        </div>
      </section>

      <section className="section spectral-divider" id="porque-existe">
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

      <section className="section section-gray spectral-divider" id="ecossistema">
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
            <div>
              <strong>15</strong>
              <span>estados representados</span>
            </div>
            <div>
              <strong>140+</strong>
              <span>membros registrados</span>
            </div>
            <p className="metrics-source">Indicadores institucionais da rede Foton.</p>
          </div>
        </div>
      </section>

      <section className="section spectral-divider" id="frentes">
        <div className="container">
          <div className="heading-row">
            <Heading eyebrow="Frentes e programas" title="Do conhecimento à articulação." />
          </div>
          <p className="section-description">
            Conheça as frentes de pesquisa, formação, inovação e articulação do Foton.
          </p>
          <div className="research-grid institutional-programs">
            {programs.map((program, index) => (
              <Link className="research-card" to={program.to} key={program.title}>
                <div className="card-top">
                  <span className="number">{String(index + 1).padStart(2, '0')}</span>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <span className="card-link">
                  Saiba mais <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray institutional-presentation" id="apresentacao">
        <div className="container split">
          <Heading eyebrow="Documento institucional" title="Conheça a apresentação do Foton." />
          <div className="body-copy">
            <p>
              Explore a identidade, o propósito, o ecossistema e as iniciativas do Foton na
              apresentação institucional.
            </p>
            <Action to="/apresentacao">Visualizar apresentação</Action>
          </div>
        </div>
      </section>

      <PartnerEcosystem home />

      <section className="section institutional-contact">
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
      const history = wrapper.querySelector<HTMLElement>('.institute-history h2');
      const word = wrapper.querySelector<HTMLElement>('.photon-identity');
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
        <path ref={path} pathLength="1" d="M0 0" />
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
        <section className="section institute-history">
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
            <PhotonIdentityAnimation />
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
      <section className="section">
        <div className="container">
          <Heading eyebrow="Frentes de articulação" title="Ciência, formação e estratégia." />
          <div className="three-grid">
            <div className="info-card">
              <BookOpen aria-hidden="true" />
              <h3>Educação e formação</h3>
              <p>Promover a aproximação entre conhecimento científico, formação e sociedade.</p>
            </div>
            <div className="info-card">
              <Compass aria-hidden="true" />
              <h3>Pesquisa aplicada</h3>
              <p>Articular temas de investigação e colaboração entre diferentes áreas.</p>
            </div>
            <div className="info-card">
              <Network aria-hidden="true" />
              <h3>Inteligência estratégica</h3>
              <p>Conectar conhecimento e análise a decisões de organizações e sociedade.</p>
            </div>
          </div>
        </div>
      </section>
      <OfficialStatements />
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
                O Instituto articula temas de investigação que conectam diferentes especialidades e
                instituições em torno das tecnologias quânticas.
              </p>
            </div>
            <div className="actions">
              <Action to="/pesquisa">Todas as áreas</Action>
              <TextLink to="/jornada">Conheça a Jornada</TextLink>
            </div>
          </div>
        </section>
      </>
    );
  return (
    <>
      <Intro eyebrow="Pesquisa e ecossistema" title="Diferentes saberes. Perguntas em comum.">
        <p>
          Conheça campos de investigação em tecnologias quânticas e as conexões multidisciplinares
          do Instituto Foton.
        </p>
      </Intro>
      <section className="section">
        <div className="container">
          <p className="section-description">
            Explore cinco grandes áreas de pesquisa e desenvolvimento em tecnologias quânticas
            articuladas pelo Foton.
          </p>
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
      <Intro eyebrow="Programa institucional" title="Jornada do Cientista Inovador">
        <p>
          Uma iniciativa do Foton que aproxima formação científica, pesquisa, inovação e
          oportunidades de conexão entre pessoas.
        </p>
      </Intro>
      <section className="section">
        <div className="container split">
          <Heading eyebrow="Propósito" title="Formação científica e conexões entre pessoas." />
          <div className="body-copy">
            <p>
              A Jornada do Cientista Inovador aproxima pessoas da ciência e amplia possibilidades
              de formação, colaboração e articulação.
            </p>
            <p>
              Para conhecer oportunidades de participação na Jornada, converse com o Foton
              pelos canais institucionais.
            </p>
            <div className="actions">
              <Action to="/contato">Canais de contato</Action>
              <TextLink to="/apresentacao">Apresentação institucional</TextLink>
            </div>
          </div>
        </div>
      </section>
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
                A construção é coletiva e nacional, com escuta ativa em todas as regiões do país. As
                contribuições de especialistas conduzem a criação das Cartas Macrorregionais e
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
            Registros de encontros com pesquisadores, instituições, empresas e ambientes de inovação
            em diferentes regiões do país.
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
                Os documentos institucionais estão disponíveis nas páginas de apresentação e
                transparência. Conteúdos de terceiros são identificados por suas fontes quando
                aplicável.
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
