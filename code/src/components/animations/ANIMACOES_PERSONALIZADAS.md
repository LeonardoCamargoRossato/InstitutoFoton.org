# Animações personalizadas — inventário e governança

**Projeto:** InstitutoFoton.org · **LCR Workflow** · Auditoria da `main` `413728bef4929541d55b2b16a028d52e212b5930`.

Esta área distingue **animações exclusivas do Instituto Foton** dos **efeitos genéricos de hover** que pertencem à biblioteca `cards/`. A migração de código é progressiva: nenhuma animação aprovada deve ser recriada apenas para mudar de pasta.

## Inventário com dependências

| ID      | Objetivo e página                                     | TSX de origem, CSS e recursos                                                                                                              | Inicialização / eventos / temporização                                                                                                                                       | Mobile e movimento reduzido                                                           | Estado e risco                                       |
| ------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| ANIM-01 | Identidade quântica da Home, formação do grafo Foton  | `components/animations/custom/HomeAtomEntrance.tsx`; `styles/home-atom-entrance.css`; `assetUrl` do favicon WebP                           | `IntersectionObserver`, visibilidade da aba, Media Query, Web Animations API, `useLayoutEffect`; rede final com transições CSS 500–950 ms; placas em movimento 16–22 s       | Pausa em background e reduz movimento; eventos testados                               | **Movido e validado**; risco alto                    |
| ANIM-02 | Partícula encontra estrela, SVG aprovado no Instituto | `components/animations/custom/PhotonIdentityAnimation.tsx`; `styles/photon-identity.css`; `code/public/assets/AnimacaoIdentidadeFoton.svg` | `phase` `approach / playing / static`; gatilho de chegada da partícula em `PublicPages`; `fetch` com integridade SHA-256 e Shadow DOM; sincronização controlada externamente | CSS e SVG incluem regra para movimento reduzido; o fallback permanece visível sem SVG | **Movido sem alterar o SVG**; risco crítico          |
| ANIM-03 | Composição editorial abstrata de órbitas/gerações     | `components/animations/custom/Constellation.tsx`; seletores `.constellation`, `.orbit`, `.orb` em `styles/site.css`                        | Renderização declarativa; efeitos CSS                                                                                                                                        | Depende de CSS do site                                                                | **Preservado; uso direto não confirmado**            |
| ANIM-04 | Onda eletromagnética decorativa na área YouTube       | `features/ElectromagneticWaveDivider.tsx` → `components/animations/custom/ElectromagneticWaveDivider.tsx`; `features/YouTubeHighlight.css` | Coordenadas de E/B calculadas ao importar; SVG puramente decorativo; sem timer próprio                                                                                       | CSS do YouTube define responsive e movimento; sem mídia externa                       | **Migrado com shim de compatibilidade**; risco baixo |
| ANIM-05 | Fórmulas/partículas decorativas nas redes sociais     | `features/SocialPhysicsBackdrop.tsx`; `features/SocialMediaPage.css` e `YouTubeHighlight.css`                                              | Símbolos de física renderizados por região `intro / instagram / linkedin / youtube`; depende de layout da página                                                             | CSS controla posicionamento e redução de movimento                                    | **Preservado na origem**; risco médio                |
| ANIM-06 | Constelação do mapa brasileiro, Manifesto             | `features/ManifestoHero.tsx` (função local `BrazilConstellation`); `styles/manifesto-hero.css`                                             | Composição local e transformação da página; parte do hero                                                                                                                    | Comportamento específico do Manifesto                                                 | **Identificado, não migra**; risco alto              |

## Organização física

```text
code/src/components/animations/
  ANIMACOES_PERSONALIZADAS.md
  index.ts
  custom/
    Constellation.tsx
    ElectromagneticWaveDivider.tsx
    HomeAtomEntrance.tsx
    PhotonIdentityAnimation.tsx
    index.ts
```

O arquivo histórico `features/ElectromagneticWaveDivider.tsx` foi convertido em **reexportação de compatibilidade**, preservando o import existente em `YouTubeHighlight`. O SVG renderizado e a geometria da onda não foram modificados. Não duplicar o módulo como duas implementações independentes.

`HomeAtomEntrance`, `PhotonIdentityAnimation` e `Constellation` estão consolidados em `custom/`. `SocialPhysicsBackdrop` continua em `features/` por ser uma composição específica da página social. O diretório `custom/` é funcional, não um conjunto de pastas vazias.

## Política de alteração segura

1. Inventariar o componente, consumidores, importações, classes CSS, SVG e arquivos derivados.
2. Registrar as condições de inicialização, tempo, eventos, pause/resume e regras de acessibilidade.
3. Preservar o componente aprovado byte a byte durante uma transferência física. Manter shim no caminho legado enquanto houver referências.
4. Nunca mover ou duplicar `AnimacaoIdentidadeFoton.svg` para `components/`; sua fonte única é `code/public/assets/`.
5. Testar a origem e o destino da importação, desktop/mobile, redução de movimento, Console e integridade dos assets.
6. Só eliminar shim ou seletor antigo se todos os consumidores foram verificados e o responsável autorizou a limpeza.

## Verificações

- `tests/browser/home-atom-entrance.spec.ts`: fases, visibilidade, motion e composição da Home.
- `tests/browser/PhotonIdentity.spec.ts`: colisão da partícula, integridade e sincronização do SVG aprovado.
- `tests/browser/social-media.spec.ts`: navegação e área social, inclusive YouTube.
- `tests/browser/ManifestoHero.spec.ts`: efeitos específicos do Manifesto.
- `npm run check`, `npm run test:e2e`, `npm run assets:verify` e `npm run scan:secrets`.

## Estados de migração

**Identificado** não equivale a **implementado**; **implementado** não equivale a **testado**; **CI verde e deploy confirmado** são necessários para registrar a variante como validada. Não excluir arquivos de animações apenas por aparente desuso sem auditoria completa.
