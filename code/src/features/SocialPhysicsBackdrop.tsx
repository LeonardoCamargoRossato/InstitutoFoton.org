type SocialPhysicsRegion = 'intro' | 'instagram' | 'linkedin' | 'youtube';

// Expressões científicas decorativas, sem bibliotecas externas nem animações.
const equationsByRegion = {
  intro: {
    first: 'iℏ ∂ψ/∂t = Ĥψ',
    second: 'Ĥ = −(ℏ²/2m)∇² + V(r)',
    third: '⟨ψ|Ĥ|ψ⟩ = E',
  },
  instagram: {
    first: '∫ ψ*(r) Ĥψ(r) d³r',
    second: '∂²ψ/∂x² + k²ψ = 0',
    third: 'ℏω = E₂ − E₁',
  },
  linkedin: {
    first: 'H = −J∑⟨i,j⟩ sᵢsⱼ − h∑ᵢ sᵢ',
    second: 'dqᵢ/dt = ∂H/∂pᵢ',
    third: 'dpᵢ/dt = −∂H/∂qᵢ',
  },
  youtube: {
    first: 'Z = Tr(exp(−βĤ))',
    second: 'S[q] = ∫ L(q, q̇, t) dt',
    third: '∫ D[q] exp(iS[q]/ℏ)',
  },
} as const;

export default function SocialPhysicsBackdrop({ region }: { region: SocialPhysicsRegion }) {
  const equations = equationsByRegion[region];

  return (
    <div className={`social-physics-symbols social-physics-symbols--${region}`} aria-hidden="true">
      <span>{equations.first}</span>
      <span>{equations.second}</span>
      <span>{equations.third}</span>
    </div>
  );
}
