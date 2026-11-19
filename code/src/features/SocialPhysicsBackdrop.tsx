type SocialPhysicsRegion = 'intro' | 'linkedin' | 'youtube';

// MathML conserva índices, expoentes, frações e somatórios de forma semântica.
// Equações decorativas: o contexto visível do site já explica a área científica.
function SchrodingerEquation() {
  return (
    <math>
      <mi>i</mi>
      <mi>ℏ</mi>
      <mfrac>
        <mrow>
          <mo>∂</mo>
          <mi>ψ</mi>
        </mrow>
        <mrow>
          <mo>∂</mo>
          <mi>t</mi>
        </mrow>
      </mfrac>
      <mo>=</mo>
      <mi>Ĥ</mi>
      <mi>ψ</mi>
    </math>
  );
}

function HamiltonianEquation() {
  return (
    <math>
      <mi>Ĥ</mi>
      <mo>=</mo>
      <mo>−</mo>
      <mfrac>
        <msup>
          <mi>ℏ</mi>
          <mn>2</mn>
        </msup>
        <mrow>
          <mn>2</mn>
          <mi>m</mi>
        </mrow>
      </mfrac>
      <msup>
        <mo>∇</mo>
        <mn>2</mn>
      </msup>
      <mo>+</mo>
      <mi>V</mi>
      <mo>(</mo>
      <mi>r</mi>
      <mo>)</mo>
    </math>
  );
}

function IsingEquation() {
  return (
    <math>
      <mi>H</mi>
      <mo>=</mo>
      <mo>−</mo>
      <mi>J</mi>
      <msub>
        <mo>∑</mo>
        <mrow>
          <mo>⟨</mo>
          <mi>i</mi>
          <mo>,</mo>
          <mi>j</mi>
          <mo>⟩</mo>
        </mrow>
      </msub>
      <msub>
        <mi>s</mi>
        <mi>i</mi>
      </msub>
      <msub>
        <mi>s</mi>
        <mi>j</mi>
      </msub>
      <mo>−</mo>
      <mi>h</mi>
      <msub>
        <mo>∑</mo>
        <mi>i</mi>
      </msub>
      <msub>
        <mi>s</mi>
        <mi>i</mi>
      </msub>
    </math>
  );
}

function PartitionEquation() {
  return (
    <math>
      <mi>Z</mi>
      <mo>=</mo>
      <mi mathvariant="normal">Tr</mi>
      <mo>(</mo>
      <msup>
        <mi>e</mi>
        <mrow>
          <mo>−</mo>
          <mi>β</mi>
          <mi>Ĥ</mi>
        </mrow>
      </msup>
      <mo>)</mo>
    </math>
  );
}

function ActionEquation() {
  return (
    <math>
      <mi>S</mi>
      <mo>[</mo>
      <mi>q</mi>
      <mo>]</mo>
      <mo>=</mo>
      <mo>∫</mo>
      <mi>L</mi>
      <mo>(</mo>
      <mi>q</mi>
      <mo>,</mo>
      <mi>q̇</mi>
      <mo>,</mo>
      <mi>t</mi>
      <mo>)</mo>
      <mi>d</mi>
      <mi>t</mi>
    </math>
  );
}

export default function SocialPhysicsBackdrop({ region }: { region: SocialPhysicsRegion }) {
  return (
    <div className={`social-physics-symbols social-physics-symbols--${region}`} aria-hidden="true">
      {region === 'intro' && (
        <>
          <span>
            <SchrodingerEquation />
          </span>
          <span>
            <HamiltonianEquation />
          </span>
        </>
      )}
      {region === 'linkedin' && (
        <span>
          <IsingEquation />
        </span>
      )}
      {region === 'youtube' && (
        <>
          <span>
            <PartitionEquation />
          </span>
          <span>
            <ActionEquation />
          </span>
        </>
      )}
    </div>
  );
}
