// Composição editorial abstrata. Não representa pessoas, um laboratório ou o logo Foton.
export default function Constellation() {
  return (
    <div
      className="constellation"
      role="img"
      aria-label="Composição abstrata: curiosidade, experiência, pesquisa e novas gerações conectadas pela ciência"
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="orb orb-core">
        <span>Uma pergunta.</span>
        <strong>
          Infinitas
          <br />
          conexões.
        </strong>
      </div>
      <div className="orb orb-curiosity">
        curiosidade<span>O começo de tudo</span>
      </div>
      <div className="orb orb-experience">
        experiência<span>Conhecimento que conecta</span>
      </div>
      <div className="orb orb-future">
        novas gerações<span>Outras possibilidades</span>
      </div>
      <span className="star star-one" />
      <span className="star star-two" />
      <span className="star star-three" />
      <span className="art-caption">A ciência acontece em rede.</span>
    </div>
  );
}
