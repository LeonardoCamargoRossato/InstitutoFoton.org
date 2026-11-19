import { createElement, type ReactNode } from 'react';

type MathTagName = 'math' | 'mi' | 'mn' | 'mo' | 'mfrac' | 'mrow' | 'msub' | 'msup';

function M({
  tag,
  children,
  mathvariant,
}: {
  tag: MathTagName;
  children?: ReactNode;
  mathvariant?: string;
}) {
  return createElement(tag, mathvariant ? { mathvariant } : null, children);
}

type SocialPhysicsRegion = 'intro' | 'linkedin' | 'youtube';

// MathML conserva índices, expoentes, frações e somatórios de forma semântica.
// Equações decorativas: o contexto visível do site já explica a área científica.
function SchrodingerEquation() {
  return (
    <M tag="math">
      <M tag="mi">i</M>
      <M tag="mi">ℏ</M>
      <M tag="mfrac">
        <M tag="mrow">
          <M tag="mo">∂</M>
          <M tag="mi">ψ</M>
        </M>
        <M tag="mrow">
          <M tag="mo">∂</M>
          <M tag="mi">t</M>
        </M>
      </M>
      <M tag="mo">=</M>
      <M tag="mi">Ĥ</M>
      <M tag="mi">ψ</M>
    </M>
  );
}

function HamiltonianEquation() {
  return (
    <M tag="math">
      <M tag="mi">Ĥ</M>
      <M tag="mo">=</M>
      <M tag="mo">−</M>
      <M tag="mfrac">
        <M tag="msup">
          <M tag="mi">ℏ</M>
          <M tag="mn">2</M>
        </M>
        <M tag="mrow">
          <M tag="mn">2</M>
          <M tag="mi">m</M>
        </M>
      </M>
      <M tag="msup">
        <M tag="mo">∇</M>
        <M tag="mn">2</M>
      </M>
      <M tag="mo">+</M>
      <M tag="mi">V</M>
      <M tag="mo">(</M>
      <M tag="mi">r</M>
      <M tag="mo">)</M>
    </M>
  );
}

function IsingEquation() {
  return (
    <M tag="math">
      <M tag="mi">H</M>
      <M tag="mo">=</M>
      <M tag="mo">−</M>
      <M tag="mi">J</M>
      <M tag="msub">
        <M tag="mo">∑</M>
        <M tag="mrow">
          <M tag="mo">⟨</M>
          <M tag="mi">i</M>
          <M tag="mo">,</M>
          <M tag="mi">j</M>
          <M tag="mo">⟩</M>
        </M>
      </M>
      <M tag="msub">
        <M tag="mi">s</M>
        <M tag="mi">i</M>
      </M>
      <M tag="msub">
        <M tag="mi">s</M>
        <M tag="mi">j</M>
      </M>
      <M tag="mo">−</M>
      <M tag="mi">h</M>
      <M tag="msub">
        <M tag="mo">∑</M>
        <M tag="mi">i</M>
      </M>
      <M tag="msub">
        <M tag="mi">s</M>
        <M tag="mi">i</M>
      </M>
    </M>
  );
}

function PartitionEquation() {
  return (
    <M tag="math">
      <M tag="mi">Z</M>
      <M tag="mo">=</M>
      <M tag="mi" mathvariant="normal">Tr</M>
      <M tag="mo">(</M>
      <M tag="msup">
        <M tag="mi">e</M>
        <M tag="mrow">
          <M tag="mo">−</M>
          <M tag="mi">β</M>
          <M tag="mi">Ĥ</M>
        </M>
      </M>
      <M tag="mo">)</M>
    </M>
  );
}

function ActionEquation() {
  return (
    <M tag="math">
      <M tag="mi">S</M>
      <M tag="mo">[</M>
      <M tag="mi">q</M>
      <M tag="mo">]</M>
      <M tag="mo">=</M>
      <M tag="mo">∫</M>
      <M tag="mi">L</M>
      <M tag="mo">(</M>
      <M tag="mi">q</M>
      <M tag="mo">,</M>
      <M tag="mi">q̇</M>
      <M tag="mo">,</M>
      <M tag="mi">t</M>
      <M tag="mo">)</M>
      <M tag="mi">d</M>
      <M tag="mi">t</M>
    </M>
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
