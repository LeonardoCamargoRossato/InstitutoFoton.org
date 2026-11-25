import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { ArrowDown, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { Action, External, Heading, Intro, TextLink } from '../components/ui';
import researchMedia from '../content/research-media.json';
import researchMediaEnglish from '../content/research-media.en.json';
import { assetUrl } from '../lib/siteAssets';
import {
  haQuantumTitle,
  haQuantumTitleEnglish,
  journeyTitle,
  journeyTitleEnglish,
  researchLines,
  researchLinesEnglish,
  researchTitle,
  researchTitleEnglish,
} from './content';
import HaQuantumGallery from './HaQuantumGallery';
import { ActionCard, InfoCard } from '../components/cards';
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

const pathwayEnglish = [
  { name: 'Pulse', summary: 'Welcoming and integrating participants into the Journey activities.' },
  { name: 'Lumina', summary: 'Exploring themes, participating in meetings, and creating outreach materials.' },
  { name: 'Resonance', summary: 'Curating content and contributing to science dissemination events and actions.' },
  { name: 'Superposition', summary: 'Facilitating activities, providing scientific support, and welcoming new participants.' },
  { name: 'Entanglement', summary: 'Connecting initiatives and following the development of new researchers.' },
];

const pulsoEnglish = {
  title: 'Quantum Pathway — Pulse Stage Closing',
  watch: pulso.watch,
  event: pulso.event,
};

const haQuantumEnglish = {
  summary:
    'The hackathon brought together students, researchers, developers, and professionals to develop solutions to real problems using quantum optimization techniques.',
  partnership:
    'Instituto Foton held HaQuantum in partnership with the Academic League of Quantum Computing at the University of Sorocaba, as part of the Mobi Quantum track at MOBI Festival 2026.',
  event: haQuantum.event,
  rules: haQuantum.rules,
};

function PulsoVideo() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const media = english ? researchMediaEnglish : researchMedia;
  return (
    <a
      className="pulso-player"
      href={pulso.watch}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={english ? 'Open the Pulse Stage video on YouTube (new tab)' : 'Abrir o vídeo da Etapa Pulso no YouTube (nova aba)'}
    >
      <img
        src={assetUrl(media.pulso.previewPath)}
        width={media.pulso.width}
        height={media.pulso.height}
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
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  return (
    <p className="research-date">
      <time dateTime="2026-05-09">{english ? 'May 9' : '9 de maio'}</time>{' '}
      {english ? 'to' : 'a'}{' '}
      <time dateTime="2026-06-11">{english ? 'June 11, 2026' : '11 de junho de 2026'}</time>
    </p>
  );
}

export function Research() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = (pt: string, en: string) => (english ? en : pt);
  const lines = english ? researchLinesEnglish : researchLines;
  const pathwayItems = english ? pathwayEnglish : pathway;
  const pulsoInfo = english ? pulsoEnglish : pulso;
  const hq = english ? haQuantumEnglish : haQuantum;
  return (
    <div className="research-experience">
      <Intro
        eyebrow="Instituto Foton"
        title={english ? researchTitleEnglish : researchTitle}
        id="pesquisa-inicio"
        sectionCode="4.A.1"
      >
        <p>
          {copy(
            'Explore as áreas de pesquisa em tecnologias quânticas do Foton e conheça as iniciativas que aproximam pesquisadores, estudantes e profissionais.',
            'Explore Foton’s quantum technology research areas and the initiatives bringing researchers, students, and professionals closer together.',
          )}
        </p>
        <nav className="research-jump-links" aria-label={english ? 'On this page' : 'Nesta página'}>
          <a href="#areas-de-pesquisa">
            {copy('Áreas de pesquisa', 'Research areas')} <ArrowDown size={15} aria-hidden="true" />
          </a>
          <a href="#jornada-do-cientista">
            {copy('Jornada', 'Journey')} <ArrowDown size={15} aria-hidden="true" />
          </a>
          <a href="#eventos">
            {copy('Eventos', 'Events')} <ArrowDown size={15} aria-hidden="true" />
          </a>
        </nav>
      </Intro>

      <section className="section research-areas" id="areas-de-pesquisa" data-lcr-section-id="4.A.2">
        <div className="container">
          <Heading title={copy('Áreas de pesquisa', 'Research areas')} />
          <p className="section-description">
            {copy(
              'Explore seis grandes áreas de pesquisa e desenvolvimento em tecnologias quânticas articuladas pelo Foton.',
              'Explore six major research and development areas in quantum technologies coordinated by Foton.',
            )}
          </p>
          <div className="research-grid full-research">
            {lines.map((line, index) => (
              <ActionCard
                className="research-card"
                to={'/pesquisa/' + line.slug}
                key={line.slug}
                catalogId={'4.A.2.C' + (index + 1)}
              >
                <h3>{line.title}</h3>
                <p>{line.summary}</p>
                <span className="card-link">
                  {copy('Explorar essa área', 'Explore this area')} <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </ActionCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gray research-journey-intro" id="jornada-do-cientista" data-lcr-section-id="4.A.3">
        <div className="container split">
          <div className="body-copy">
            <Heading title={english ? journeyTitleEnglish : journeyTitle}>
              {copy('Conectando ciência, pessoas e inovação.', 'Connecting science, people, and innovation.')}
            </Heading>
            <p>
              {copy(
                'A Jornada reúne pesquisadores e profissionais de diferentes áreas em uma trajetória colaborativa de formação continuada, desenvolvimento científico e inovação.',
                'The Journey brings together researchers and professionals from different fields in a collaborative path of continuing education, scientific development, and innovation.',
              )}
            </p>
            <p>
              {copy(
                'Grupos temáticos, encontros e eventos científicos abrem espaço para estudar em conjunto, compartilhar resultados e desenvolver projetos.',
                'Thematic groups, meetings, and scientific events create space to study together, share results, and develop projects.',
              )}
            </p>
            <div className="actions">
              <Action to="/pesquisa/jornada">{copy('Conheça a Jornada', 'Discover the Journey')}</Action>
            </div>
          </div>
          <div className="pathway-preview">
            <h3>Quantum Pathway</h3>
            <p>{copy('A trilha organiza a participação em cinco etapas de envolvimento progressivo.', 'The pathway organizes participation into five stages of progressive involvement.')}</p>
            <ol>{pathwayItems.map(({ name }) => <li key={name}>{name}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section research-events-intro" id="eventos" data-lcr-section-id="4.A.4">
        <div className="container split">
          <Heading
            eyebrow={copy('Nossos eventos e iniciativas', 'Our events and initiatives')}
            title={copy('A ciência ganha força quando é compartilhada.', 'Science grows stronger when it is shared.')}
          />
          <p>
            {copy(
              'O Foton promove encontros, apresentações e desafios em que pesquisadores, estudantes e profissionais trocam experiências e exploram aplicações das tecnologias quânticas.',
              'Foton promotes meetings, presentations, and challenges where researchers, students, and professionals exchange experiences and explore applications of quantum technologies.',
            )}
          </p>
        </div>
      </section>

      <section className="section research-pulso" id="etapa-pulso" data-lcr-section-id="4.A.5">
        <div className="container split">
          <PulsoVideo />
          <div className="body-copy">
            <Heading title={pulsoInfo.title} />
            <p className="research-date"><time dateTime="2026-03-28">{copy('28 de março de 2026', 'March 28, 2026')}</time></p>
            <p>
              {copy(
                'O encontro encerrou o primeiro ciclo formativo da Jornada. Os Cientistas Inovadores apresentaram trabalhos sobre computação, comunicação e criptografia quânticas, algoritmos, sensores e materiais, além de aplicações da quântica aos negócios.',
                'The meeting closed the Journey’s first training cycle. Innovative Scientists presented work on quantum computing, communication and cryptography, algorithms, sensors and materials, and applications of quantum technology to business.',
              )}
            </p>
            <p>{copy('A transmissão permitiu ao público acompanhar os trabalhos dos grupos temáticos.', 'The broadcast allowed the public to follow the thematic groups’ work.')}</p>
            <div className="actions research-event-actions">
              <External className="button" href={pulsoInfo.watch}>{copy('Assistir à transmissão completa', 'Watch the full broadcast')}</External>
              <External className="text-link" href={pulsoInfo.event}>{copy('Página do evento', 'Event page')}</External>
            </div>
          </div>
        </div>
      </section>

      <section className="section research-haquantum" id="haquantum" data-lcr-section-id="4.A.6">
        <div className="container">
          <div className="split research-haquantum-intro">
            <Heading title={english ? haQuantumTitleEnglish : haQuantumTitle} />
            <div className="body-copy">
              <HaQuantumDate />
              <p>{hq.summary}</p>
              <p>{hq.partnership}</p>
            </div>
          </div>
          <HaQuantumGallery />
          <div className="actions">
            <Action to="/pesquisa/haquantum">{copy('Saiba mais sobre o HaQuantum', 'Learn more about HaQuantum')}</Action>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ResearchArea() {
  const { slug } = useParams();
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = (pt: string, en: string) => (english ? en : pt);
  const lines = english ? researchLinesEnglish : researchLines;
  const selected = lines.find((line) => line.slug === slug);
  if (!selected) return <NotFound />;
  return (
    <>
      <Intro
        eyebrow={(english ? 'Research · Area ' : 'Pesquisa · Área ') + selected.label}
        title={selected.title}
      >
        <p>{selected.summary}</p>
      </Intro>
      <section className="section">
        <div className="container reading">
          <p className="lead">{selected.description}</p>
          <h2>{copy('Perspectivas de investigação', 'Research perspectives')}</h2>
          <ul className="topic-list">
            {selected.topics.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
          <div className="notice">
            <h3>{copy('Pesquisa se faz em rede', 'Research is built as a network')}</h3>
            <p>
              {copy(
                'O Instituto articula temas de investigação que conectam diferentes especialidades e instituições em torno das tecnologias quânticas.',
                'The Institute coordinates research themes connecting different specialties and institutions around quantum technologies.',
              )}
            </p>
          </div>
          <div className="actions">
            <Action to="/pesquisa#areas-de-pesquisa">{copy('Todas as áreas', 'All research areas')}</Action>
            <TextLink to="/pesquisa/jornada">{copy('Conheça a Jornada', 'Discover the Journey')}</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}

export function Journey() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = (pt: string, en: string) => (english ? en : pt);
  const lines = english ? researchLinesEnglish : researchLines;
  const pathwayItems = english ? pathwayEnglish : pathway;
  return (
    <div className="research-experience">
      <Intro
        eyebrow={copy('Pesquisa e formação', 'Research and education')}
        title={english ? journeyTitleEnglish : journeyTitle}
        id="jornada-inicio"
        sectionCode="4.B.1"
      >
        <p>{copy('Conectando ciência, pessoas e inovação.', 'Connecting science, people, and innovation.')}</p>
        <TextLink to="/pesquisa">{copy('Pesquisa e Jornada do Cientista Inovador', 'Research and Innovative Scientist Journey')}</TextLink>
      </Intro>

      <section className="section" id="jornada-colaboracao" data-lcr-section-id="4.B.2">
        <div className="container split">
          <Heading title={copy('Aprender e pesquisar em colaboração.', 'Learning and researching together.')} />
          <div className="body-copy">
            <p>
              {copy(
                'A Jornada é uma iniciativa do Instituto Foton que conecta pessoas de diferentes formações para estudar tecnologias quânticas, desenvolver projetos e comunicar ciência. O programa estimula o pensamento crítico e a troca de experiências entre áreas.',
                'The Journey is an Instituto Foton initiative connecting people from different backgrounds to study quantum technologies, develop projects, and communicate science. The program encourages critical thinking and exchange across fields.',
              )}
            </p>
            <p>
              {copy(
                'A participação é educacional, colaborativa e voluntária, sem vínculo de emprego ou garantia de bolsa ou remuneração.',
                'Participation is educational, collaborative, and voluntary, with no employment relationship or guarantee of a scholarship or compensation.',
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section research-pathway" id="quantum-pathway" data-lcr-section-id="4.B.3">
        <div className="container">
          <Heading title="Quantum Pathway">
            {copy(
              'A trilha avança em ciclos semestrais. As etapas indicam como o envolvimento e as responsabilidades podem crescer ao longo da Jornada.',
              'The pathway advances in six-month cycles. The stages show how involvement and responsibilities can grow throughout the Journey.',
            )}
          </Heading>
          <ol className="pathway-steps" aria-label={copy('Etapas do Quantum Pathway', 'Quantum Pathway stages')}>
            {pathwayItems.map(({ name, summary }, index) => (
              <InfoCard
                as="li"
                className="pathway-step"
                key={name}
                catalogId={'4.B.3.C' + (index + 1)}
                inheritVisuals
              >
                <h3>{name}</h3>
                <p>{summary}</p>
              </InfoCard>
            ))}
          </ol>
        </div>
      </section>

      <section className="section research-groups" id="jornada-grupos" data-lcr-section-id="4.B.4">
        <div className="container split">
          <div className="body-copy">
            <Heading title={copy('Grupos temáticos e atividades', 'Thematic groups and activities')} />
            <p>
              {copy(
                'Os encontros são principalmente on-line. Os grupos contam com apoio de coordenação e podem conduzir estudos, desenvolver iniciativas e preparar materiais técnicos ou de divulgação.',
                'Meetings are primarily online. Groups receive coordination support and may conduct studies, develop initiatives, and prepare technical or outreach materials.',
              )}
            </p>
          </div>
          <ul className="topic-list">
            {lines.map((line) => (
              <li key={line.slug}>
                <Link to={'/pesquisa/' + line.slug}>
                  {line.title} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-gray" id="jornada-eventos" data-lcr-section-id="4.B.5">
        <div className="container split">
          <Heading title={copy('Eventos e comunicação científica', 'Events and science communication')} />
          <div className="body-copy">
            <p>
              {copy(
                'Cada etapa se encerra com um evento científico. Os grupos podem apresentar estudos, compartilhar experiências em seminários e demonstrações e receber contribuições para seus trabalhos.',
                'Each stage closes with a scientific event. Groups can present studies, share experiences in seminars and demonstrations, and receive feedback on their work.',
              )}
            </p>
            <p>
              {copy(
                'Para conhecer oportunidades de participação na Jornada, converse com o Foton pelos canais institucionais.',
                'To learn about participation opportunities in the Journey, contact Foton through the institutional channels.',
              )}
            </p>
            <div className="actions">
              <Action to="/pesquisa#etapa-pulso">{copy('Veja o encerramento da Etapa Pulso', 'See the Pulse Stage closing')}</Action>
              <TextLink to="/contato">{copy('Canais de contato', 'Contact channels')}</TextLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function HaQuantum() {
  const { locale } = useLanguage();
  const english = locale === 'en-US';
  const copy = (pt: string, en: string) => (english ? en : pt);
  const hq = english ? haQuantumEnglish : haQuantum;
  return (
    <div className="research-experience">
      <Intro
        eyebrow={copy('Eventos do Instituto Foton', 'Instituto Foton events')}
        title={english ? haQuantumTitleEnglish : haQuantumTitle}
        id="haquantum-inicio"
        sectionCode="4.C.1"
      >
        <HaQuantumDate />
        <p>{hq.partnership}</p>
        <TextLink to="/pesquisa#eventos">{copy('Eventos e iniciativas', 'Events and initiatives')}</TextLink>
      </Intro>

      <section className="section" id="haquantum-desafios" data-lcr-section-id="4.C.2">
        <div className="container split">
          <Heading title={copy('Da otimização quântica a desafios reais.', 'From quantum optimization to real challenges.')} />
          <div className="body-copy">
            <p>{hq.summary}</p>
            <p>
              {copy(
                'O desafio propôs aplicar técnicas de otimização quântica para decidir entre várias soluções possíveis de um problema complexo. Os grupos reuniram conhecimentos de computação, ciência e inovação para testar e comunicar suas propostas.',
                'The challenge proposed using quantum optimization techniques to choose among possible solutions to a complex problem. Groups combined knowledge of computing, science, and innovation to test and communicate their proposals.',
              )}
            </p>
            <div className="actions research-event-actions">
              <External className="button" href={hq.rules}>{copy('Consultar regulamento oficial', 'View official rules')}</External>
              <External className="text-link" href={hq.event}>{copy('Página oficial do evento', 'Official event page')}</External>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray" id="haquantum-etapas" data-lcr-section-id="4.C.3">
        <div className="container">
          <Heading title={copy('Da preparação à apresentação final', 'From preparation to the final presentation')} />
          <div className="research-event-stages">
            <InfoCard as="div" inheritVisuals catalogId="4.C.3.C1">
              <h3>Workshops</h3>
              <p>
                {copy(
                  'Encontros on-line abordaram computação e otimização quânticas, a plataforma Ket, inovação, negócios e comunicação de soluções.',
                  'Online meetings covered quantum computing and optimization, the Ket platform, innovation, business, and communicating solutions.',
                )}
              </p>
            </InfoCard>
            <InfoCard as="div" inheritVisuals catalogId="4.C.3.C2">
              <h3>{copy('Desenvolvimento em equipes', 'Team development')}</h3>
              <p>
                {copy(
                  'As equipes elaboraram suas propostas e submeteram os trabalhos a uma avaliação técnica.',
                  'Teams developed their proposals and submitted their work for technical evaluation.',
                )}
              </p>
            </InfoCard>
            <InfoCard as="div" inheritVisuals catalogId="4.C.3.C3">
              <h3>{copy('Final no MOBI Festival', 'MOBI Festival final')}</h3>
              <p>
                {copy(
                  'As equipes finalistas apresentaram suas soluções em 11 de junho de 2026, na Universidade de Sorocaba.',
                  'Finalist teams presented their solutions on June 11, 2026, at the University of Sorocaba.',
                )}
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      <section className="section research-haquantum" id="haquantum-registros" data-lcr-section-id="4.C.4">
        <div className="container">
          <Heading title={copy('Registros do HaQuantum', 'HaQuantum records')} />
          <HaQuantumGallery />
        </div>
      </section>
    </div>
  );
}
