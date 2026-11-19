type SocialPhysicsRegion = 'intro' | 'instagram' | 'linkedin' | 'youtube';

// Fórmulas clássicas e quânticas verificáveis; decoração sem bibliotecas, animações ou imagens.
// A camada é ignorada por tecnologias assistivas e não interfere com os links da página.
const equationsByRegion: Record<SocialPhysicsRegion, readonly string[]> = {
  intro: ['iℏ ∂ψ/∂t = Ĥψ', 'Ĥ = −(ℏ²/2m)∇² + V(r)', '⟨ψ|Ĥ|ψ⟩ = E'],
  instagram: ['∫ ψ*(r) Ĥψ(r) d³r', '∂²ψ/∂x² + k²ψ = 0', 'ℏω = E₂ − E₁'],
  linkedin: [
    'H = −J∑⟨i,j⟩ sᵢsⱼ − h∑ᵢ sᵢ',
    'dqᵢ/dt = ∂H/∂pᵢ',
    'dpᵢ/dt = −∂H/∂qᵢ',
  ],
  youtube: [
    'Z = Tr(exp(−βĤ))',
    'S[q] = ∫ L(q, q̇, t) dt',
    '∫ D[q] exp(iS[q]/ℏ)',
  ],
};

export default function SocialPhysicsBackdrop({ region }: { region: SocialPhysicsRegion }) {
  return (
    <div className={`social-physics-symbols social-physics-symbols--${region}`} aria-hidden="true">
      {equationsByRegion[region].map((equation, index) => (
        <span
          className={`social-physics-symbol social-physics-symbol--${index + 1}`}
          key={equation}
        >
          {equation}
        </span>
      ))}
    </div>
  );
}
