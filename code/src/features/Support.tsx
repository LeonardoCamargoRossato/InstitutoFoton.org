import { useState } from 'react';
import { ArrowUpRight, HeartHandshake } from 'lucide-react';
import { Heading, Modal, Action, TextLink } from '../components/UI';
import { FotonPhoto } from './FotonPhoto';
import { HumanPageHero } from './HumanPageHero';
import { supportModalities } from './content';

export default function Support() {
  const [selected, setSelected] = useState<(typeof supportModalities)[number] | null>(null);
  return (
    <>
      <HumanPageHero
        eyebrow="Apoie a Ciência"
        title="Ajude um Cientista Inovador."
        description="Por trás de cada avanço existe uma pessoa que fez uma pergunta. Conheça as possibilidades de apoio às trajetórias de quem pesquisa, aprende e compartilha."
        photoId="apoie-hero-scientists"
        badge={<span className="badge">Modalidades em estruturação · sem pagamentos nesta versão</span>}
      >
        <Action to="/contato">Converse com o Instituto</Action>
        <TextLink to="/transparencia">Conheça a transparência</TextLink>
      </HumanPageHero>
      <section className="section">
        <div className="container">
          <div className="heading-row">
            <Heading
              eyebrow="Muitas maneiras de fazer parte"
              title="Qual conexão faz sentido para você?"
            />
            <p className="section-description">
              Aprendizado, pesquisa, encontros ou continuidade. Explore as propostas e como o apoio
              poderá ser acompanhado.
            </p>
          </div>
          <div className="support-grid">
            {supportModalities.map((item) => (
              <button
                className="support-card"
                key={item.slug}
                onClick={() => setSelected(item)}
                aria-haspopup="dialog"
              >
                <div className="card-top">
                  <span className="number">{item.number}</span>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <span className="eyebrow">{item.subtitle}</span>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <span className="card-link">
                  Saiba como funciona
                  <ArrowUpRight aria-hidden="true" size={18} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section support-researcher-section spectral-divider">
        <div className="container support-researcher-layout">
          <div>
            <p className="eyebrow"><span /> Incentivo ao pesquisador</p>
            <h2>Por trás de uma pesquisa, existe uma trajetória.</h2>
            <p>
              A formação e a continuidade da pesquisa dependem de tempo, encontros,
              colaboração e oportunidades. Conheça as modalidades propostas pelo Instituto.
            </p>
            <p className="badge">Proposta em estruturação · contribuições financeiras indisponíveis</p>
            <TextLink to="/contato">Fale com o Instituto</TextLink>
          </div>
          <FotonPhoto id="apoie-researcher-support" className="support-researcher-photo" />
        </div>
      </section>
      <section className="section section-gray">
        <div className="container split">
          <Heading eyebrow="Confiança para construir juntos" title="Apoiar também é acompanhar." />
          <div>
            <p>
              O modelo proposto conecta a finalidade do apoio à responsabilidade pela sua
              utilização. A ativação de cada modalidade depende de regras e aprovação institucional.
            </p>
            <ol className="simple-steps">
              <li>Definição e aprovação do projeto e do orçamento</li>
              <li>Divulgação dos critérios de apoio e acompanhamento</li>
              <li>Execução com atualizações e evidências autorizadas</li>
              <li>Prestação de contas e comunicação dos resultados</li>
            </ol>
            <TextLink to="/transparencia">Conheça a transparência</TextLink>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div>
            <HeartHandshake size={42} strokeWidth={1.3} aria-hidden="true" />
            <Heading title="O primeiro passo é conversar." />
            <p>
              Interessado em apoiar a ciência ou discutir uma parceria institucional? Consulte os
              canais oficiais do Instituto.
            </p>
            <Action to="/contato">Canais de contato</Action>
          </div>
          <div className="pix-panel">
            <span className="eyebrow">Apoio financeiro</span>
            <h2>Uma estrutura para apoiar com confiança.</h2>
            <p>
              Pix, contribuições e recorrência serão disponibilizados após a aprovação dos canais
              financeiros e das regras de apoio.
            </p>
            <p className="badge">Captação ainda não disponível</p>
          </div>
        </div>
      </section>
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <span className="badge">Modalidade em estruturação</span>
          <h3>O que esse apoio possibilita</h3>
          <p>{selected.purpose}</p>
          <h3>Como poderá ser utilizado</h3>
          <p>{selected.use}</p>
          <h3>Como acompanhar</h3>
          <p>{selected.evidence}</p>
          <h3>O que ainda será definido</h3>
          <p>{selected.condition}</p>
          <p className="source-note">
            Proposta informativa. Nenhum pagamento, inscrição ou compromisso financeiro é realizado
            aqui.
          </p>
          <Action to="/contato">Canais institucionais</Action>
        </Modal>
      )}
    </>
  );
}
