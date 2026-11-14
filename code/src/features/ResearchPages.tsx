import { Link, useParams } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { Action, External, Heading, Intro, TextLink } from '../components/UI';
import researchMedia from '../content/research-media.json';
import { assetUrl } from '../lib/siteAssets';
import { haQuantumTitle, journeyTitle, researchLines, researchTitle } from './content';
import HaQuantumGallery from './HaQuantumGallery';
import { NotFound } from './PublicPages';
import '../styles/research-journey.css';

const pathway = [
  { name: 'Pulso', summary: 'Acolhimento e integração às atividades da Jornada.' },
  {
    name: 'Lumina',
    summary:
      'Exploração dos temas, participação nos encontros e criação de materiais de divulgação.',
  },
  {
    name: 'Ressonância',
    summary:
      'Curadoria de conteúdos e contribuição para eventos e ações de disseminação da ciência.',
  },
  {
    name: 'Superposição',
    summary: 'Facilitação de atividades, apoio científico e acolhimento de novos participantes.',
  },
  {
    name: 'Entrelace',
    summary: 'Articulação entre iniciativas e acompanhamento de novos pesquisadores.',
  },
];

const pulso = {
  title: 'Quantum Pathway — Encerramento da Etapa Pulso',
  watch: 'https://www.youtube.com/watch?v=zxOZy4FIk-c',
  event: 'https://www.even3.com.br/e/quantum-pathway-etapa-pulso-692193',
};

const haQuantum = {
  summary:
    'O hackathon reuniu estudantes, pesquisadores, desenvolvedores e profissionais para desenvolver soluções para problemas reais com técnicas de otimização quântica.',
  partnership:
    'O Instituto Foton realizou o HaQuantum em parceria com a Liga Acadêmica de Computação Quântica da Universidade de Sorocaba, na trilha Mobi Quantum do MOBI Festival 2026.',
  event: 'https://www.even3.com.br/e/hackathon-quantum-731810',
  rules: 'https://drive.google.com/file/d/1O-z8Br-EllIzKcj0cNmUPer1jfKGPmnl/view',
};

function PulsoVideo() {
  // O responsável pelo vídeo desativou a reprodução incorporada no YouTube.
  return (
    <a
      className="pulso-player"
      href={pulso.watch}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir o vídeo da Etapa Pulso no YouTube (nova aba)"
    >
      <img
        src={assetUrl(researchMedia.pulso.path)}
        width={researchMedia.pulso.width}
        height={researchMedia.pulso.height}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="pulso-play-icon" aria-hidden="true">
        <Play fill="currentColor" size={24} />
      </span>
    </a>
  );
}

function HaQuantumDate() {
  return (
    <p className="research-date">
      <time dateTime="2026-05-09">9 de maio</time> a{' '}
      <time dateTime="2026-06-11">11 de junho de 2026</time>
    </p>
  );
}

export function Research() {
  return (
    <div className="research-experience">
      <Intro eyebrow="Instituto Foton" title={researchTitle}>
        <p>
          Explore as áreas de pesquisa em tecnologias quânticas do Foton e conheça as iniciativas
          que aproximam pesquisadores, estudantes e profissionais.
        </p>
        <nav className="research-jump-links" aria-label="Nesta página">
          <a href="#areas-de-pesquisa">
            Áreas de pesquisa <ArrowDown size={15} aria-hidden="true" />
          </a>
          <a href="#jornada-do-cientista">
            Jornada <ArrowDown size={15} aria-hidden="true" />
          </a>
          <a href="#eventos">
            Eventos <ArrowDown size={15} aria-hidden="true" />
          </a>
        </nav>
      </Intro>

      <section className="section research-areas" id="areas-de-pesquisa">
        <div className="container">
          <Heading title="Áreas de pesquisa" />
          <p className="section-description">
            Explore cinco grandes áreas de pesquisa e desenvolvimento em tecnologias quânticas
            articuladas pelo Foton.
          </p>
          <div className="research-grid full-research">
            {researchLines.map((line) => (
              <Link className="research-card" to={`/pesquisa/${line.slug}`} key={line.slug}>
                <h3>{line.title}</h3>
                <p>{line.summary}</p>
                <span className="card-link">
                  Explorar essa área <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray research-journey-intro" id="jornada-do-cientista">
        <div className="container split">
          <div className="body-copy">
            <Heading title={journeyTitle}>Conectando ciência, pessoas e inovação.</Heading>
            <p>
              A Jornada reúne pesquisadores e profissionais de diferentes áreas em uma trajetória
              colaborativa de formação continuada, desenvolvimento científico e inovação.
            </p>
            <p>
              Grupos temáticos, encontros e eventos científicos abrem espaço para estudar em
              conjunto, compartilhar resultados e desenvolver projetos.
            </p>
            <div className="actions">
              <Action to="/pesquisa/jornada">Conheça a Jornada</Action>
            </div>
          </div>
          <div className="pathway-preview">
            <h3>Quantum Pathway</h3>
            <p>A trilha organiza a participação em cinco etapas de envolvimento progressivo.</p>
            <ol>
              {pathway.map(({ name }) => (
                <li key={name}>{name}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section research-events-intro" id="eventos">
        <div className="container split">
          <Heading
            eyebrow="Nossos eventos e iniciativas"
            title="A ciência ganha força quando é compartilhada."
          />
          <p>
            O Foton promove encontros, apresentações e desafios em que pesquisadores, estudantes e
            profissionais trocam experiências e exploram aplicações das tecnologias quânticas.
          </p>
        </div>
      </section>

      <section className="section research-pulso" id="etapa-pulso">
        <div className="container split">
          <PulsoVideo />
          <div className="body-copy">
            <Heading title={pulso.title} />
            <p className="research-date">
              <time dateTime="2026-03-28">28 de março de 2026</time>
            </p>
            <p>
              O encontro encerrou o primeiro ciclo formativo da Jornada. Os Cientistas Inovadores
              apresentaram trabalhos sobre computação, comunicação e criptografia quânticas,
              algoritmos, sensores e materiais, além de aplicações da quântica aos negócios.
            </p>
            <p>A transmissão permitiu ao público acompanhar os trabalhos dos grupos temáticos.</p>
            <div className="actions research-event-actions">
              <External className="button" href={pulso.watch}>
                Assistir à transmissão completa
              </External>
              <External className="text-link" href={pulso.event}>
                Página do evento
              </External>
            </div>
          </div>
        </div>
      </section>

      <section className="section research-haquantum" id="haquantum">
        <div className="container">
          <div className="split research-haquantum-intro">
            <Heading title={haQuantumTitle} />
            <div className="body-copy">
              <HaQuantumDate />
              <p>{haQuantum.summary}</p>
              <p>{haQuantum.partnership}</p>
            </div>
          </div>
          <HaQuantumGallery />
          <div className="actions">
            <Action to="/pesquisa/haquantum">Saiba mais sobre o HaQuantum</Action>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ResearchArea() {
  const { slug } = useParams();
  const selected = researchLines.find((line) => line.slug === slug);
  if (!selected) return <NotFound />;
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
            <Action to="/pesquisa#areas-de-pesquisa">Todas as áreas</Action>
            <TextLink to="/pesquisa/jornada">Conheça a Jornada</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}

export function Journey() {
  return (
    <div className="research-experience">
      <Intro eyebrow="Pesquisa e formação" title={journeyTitle}>
        <p>Conectando ciência, pessoas e inovação.</p>
        <TextLink to="/pesquisa">Pesquisa e Jornada do Cientista Inovador</TextLink>
      </Intro>

      <section className="section">
        <div className="container split">
          <Heading title="Aprender e pesquisar em colaboração." />
          <div className="body-copy">
            <p>
              A Jornada é uma iniciativa do Instituto Foton que conecta pessoas de diferentes
              formações para estudar tecnologias quânticas, desenvolver projetos e comunicar
              ciência. O programa estimula o pensamento crítico e a troca de experiências entre
              áreas.
            </p>
            <p>
              A participação é educacional, colaborativa e voluntária, sem vínculo de emprego ou
              garantia de bolsa ou remuneração.
            </p>
          </div>
        </div>
      </section>

      <section className="section research-pathway" id="quantum-pathway">
        <div className="container">
          <Heading title="Quantum Pathway">
            A trilha avança em ciclos semestrais. As etapas indicam como o envolvimento e as
            responsabilidades podem crescer ao longo da Jornada.
          </Heading>
          <ol className="pathway-steps" aria-label="Etapas do Quantum Pathway">
            {pathway.map(({ name, summary }) => (
              <li key={name}>
                <h3>{name}</h3>
                <p>{summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section research-groups">
        <div className="container split">
          <div className="body-copy">
            <Heading title="Grupos temáticos e atividades" />
            <p>
              Os encontros são principalmente on-line. Os grupos contam com apoio de coordenação e
              podem conduzir estudos, desenvolver iniciativas e preparar materiais técnicos ou de
              divulgação.
            </p>
          </div>
          <ul className="topic-list">
            {researchLines.map((line) => (
              <li key={line.slug}>
                <Link to={`/pesquisa/${line.slug}`}>
                  {line.title} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container split">
          <Heading title="Eventos e comunicação científica" />
          <div className="body-copy">
            <p>
              Cada etapa se encerra com um evento científico. Os grupos podem apresentar estudos,
              compartilhar experiências em seminários e demonstrações e receber contribuições para
              seus trabalhos.
            </p>
            <p>
              Para conhecer oportunidades de participação na Jornada, converse com o Foton pelos
              canais institucionais.
            </p>
            <div className="actions">
              <Action to="/pesquisa#etapa-pulso">Veja o encerramento da Etapa Pulso</Action>
              <TextLink to="/contato">Canais de contato</TextLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function HaQuantum() {
  return (
    <div className="research-experience">
      <Intro eyebrow="Eventos do Instituto Foton" title={haQuantumTitle}>
        <HaQuantumDate />
        <p>{haQuantum.partnership}</p>
        <TextLink to="/pesquisa#eventos">Eventos e iniciativas</TextLink>
      </Intro>

      <section className="section">
        <div className="container split">
          <Heading title="Da otimização quântica a desafios reais." />
          <div className="body-copy">
            <p>{haQuantum.summary}</p>
            <p>
              O desafio propôs aplicar técnicas de otimização quântica para decidir entre várias
              soluções possíveis de um problema complexo. Os grupos reuniram conhecimentos de
              computação, ciência e inovação para testar e comunicar suas propostas.
            </p>
            <div className="actions research-event-actions">
              <External className="button" href={haQuantum.rules}>
                Consultar regulamento oficial
              </External>
              <External className="text-link" href={haQuantum.event}>
                Página oficial do evento
              </External>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <Heading title="Da preparação à apresentação final" />
          <div className="research-event-stages">
            <div>
              <h3>Workshops</h3>
              <p>
                Encontros on-line abordaram computação e otimização quânticas, a plataforma Ket,
                inovação, negócios e comunicação de soluções.
              </p>
            </div>
            <div>
              <h3>Desenvolvimento em equipes</h3>
              <p>
                As equipes elaboraram suas propostas e submeteram os trabalhos a uma avaliação
                técnica.
              </p>
            </div>
            <div>
              <h3>Final no MOBI Festival</h3>
              <p>
                As equipes finalistas apresentaram suas soluções em 11 de junho de 2026, na
                Universidade de Sorocaba.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section research-haquantum">
        <div className="container">
          <Heading title="Registros do HaQuantum" />
          <HaQuantumGallery />
        </div>
      </section>
    </div>
  );
}
