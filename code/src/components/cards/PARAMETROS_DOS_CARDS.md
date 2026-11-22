# Galeria de Cards — parâmetros e exemplos

**Biblioteca:** `code/src/components/cards/` · **Projeto:** InstitutoFoton.org · **LCR Workflow**.

A base técnica é compartilhada, mas mantém conteúdo, identidade, composição e dimensões das páginas. Nenhum pacote npm independente é criado.

## Estrutura e importação

- `base/BaseCard.tsx`: contêiner informativo com semântica `article`, `section` ou `div`.
- `informative/InfoCard.tsx`: alias explícito para conteúdo não clicável.
- `interactive/ActionCard.tsx`: link interno por `react-router-dom` ou externo por `safeExternalUrl`.
- `interactive/ProfileCard.tsx`: botão que chama um callback; consumidor preserva diálogo e foco.
- `interactive/ImageCard.tsx`: botão com WebP e callback; consumidor preserva `ImageZoomDialog` e PNG original.
- `base/card.types.ts`: contrato tipado; `card.presets.ts`: presets; `card.styles.css`: tokens e efeitos; `card.appearance.ts`: atributos semânticos.
- `index.ts`: importação pública.

```tsx
import { InfoCard, ActionCard, cardPresets } from '../components/cards';

<InfoCard estiloGrafico={cardPresets.informativo}>
  <h3>Pesquisa interdisciplinar</h3>
  <p>Conteúdo institucional sem ação de clique.</p>
</InfoCard>;

<ActionCard to="/pesquisa" estiloGrafico={cardPresets.pesquisa}>
  <h3>Conheça nossas linhas</h3>
</ActionCard>;
```

## Estilo gráfico — parâmetros humanizados

Os componentes aceitam `estiloGrafico` com as propriedades abaixo:

| Campo | Valores válidos | Efeito |
|---|---|---|
| `tema` | `claro`, `escuro`, `institucional` | Cor base e contraste do contorno |
| `borda` | `nenhuma`, `suave`, `destacada`, `organica` | Presença, cor e formato do contorno |
| `raio` | `sm`, `md`, `lg`, `xl` | Arredondamento; `organica` tem prioridade |
| `sombra` | `nenhuma`, `leve`, `media` | Profundidade sem deslocar vizinhos |
| `hover` | `none`, `lift`, `image-zoom`, `border-highlight`, `image-swap` | Interatividade ou ausência dela |
| `espacamento` | `compacto`, `padrao`, `amplo` | Token CSS `--foton-card-padding` para uso pelo layout do consumidor |

**Tokens CSS centrais:** `--foton-card-border`, `--foton-card-border-highlight`, `--foton-card-radius-*`, `--foton-card-shadow-*`, `--foton-card-motion`, `--foton-card-padding`. A API não sobrescreve indiscriminadamente padding, tipografia ou imagens das páginas existentes. Para aplicar espaçamento, a classe editorial consome `var(--foton-card-padding)`.

**Presets reais:** `informativo`, `institucionalInformativo`, `pesquisa`, `fotografia`, `perfil`, `parceiroInformativo`. Não criar novos presets para cada página sem demonstrar necessidade.

## Hover e teclado

- `none`: obrigatório para cards sem clique, mesmo quando recebido indevidamente `hover='lift'`; sem cursor ou sombra de botão no hover.
- `lift`: sobe 4 px por transform, sem alterar fluxo dos irmãos, com sombra suave.
- `image-zoom`: escala 1.04 na imagem dentro do recorte, sem ampliar contêiner.
- `border-highlight`: destaca a borda sem mudar dimensões.
- `image-swap`: só ativa quando `ImageCard` recebe `imagemAlternativa` aprovada. Sem alternativa, o componente regride para `image-zoom`.
- `prefers-reduced-motion: reduce`: transições e movimentação removidas, sem perder foco, texto ou ação.
- Botões e links possuem `:focus-visible` perceptível. Os cards informativos são estruturalmente não focáveis.

## Imagens

```tsx
<ImageCard
  imagem={{ src: assetUrl(image.preview), alt: image.alt, width: image.width, height: image.height }}
  label="Ampliar fotografia do projeto"
  onOpen={() => setActive(index)}
/>
```

Carregar **WebP otimizado** no card. Manter PNG oficial na estrutura de dados e abrir o original por `ImageZoomDialog` no componente da página. Não fazer download automático do PNG quando carrega a lista; não duplicar arquivos nem inventar versões. A alternativa de `image-swap` deve ser aprovada, e no mobile a imagem principal permanece acessível.

## Interações

- `InfoCard`: `article`, `div` ou `section`. Nunca `onClick`.
- `ActionCard to="/rota"`: link interno via Router; o caminho deve existir.
- `ActionCard href="https://..."`: valida URL; abre nova aba com `noopener noreferrer`. URL inválida gera apresentação não interativa.
- `ProfileCard label="..." onOpen={...}`: botão e acessibilidade; abertura/fechamento/foco do modal continuam onde os dados são tratados.
- `ImageCard label="..." onOpen={...}`: botão e imagem; zoom e navegação permanecem no visualizador institucional.
- **Não aninhar links em links nem botões em botões.** Card informativo não recebe cursor `pointer`.

## Preservação e implementação gradual

Consumidores iniciais migrados: `InstitutePurpose`, cards informativos de `OfficialStatements` e `PublicPages`, links de Pesquisa e Home, `InstituteTeamDashboard` e `NewsPhotoHighlights`. O CSS editorial original continua aplicando layouts, tipografia e acabamentos particulares; só comportamento e tokens passam à biblioteca.

Parceiros, cartas, cartões de publicação e doação permanecem fora deste lote por dependências ou layout sensíveis. Os quatro carrosséis de fotos e suas APIs não são alterados. A animação aprovada de identidade também não é modificada.

### Adicionar um novo card

1. Classificar informativo/interativo no `INVENTARIO_DOS_CARDS.md`.
2. Encontrar a origem do conteúdo, asset, CSS, testes e todos os consumidores.
3. Reutilizar preset existente e escolher o componente semântico correto.
4. Preservar classes legadas durante a migração para evitar regressões.
5. Executar testes de teclado, screenshot, 360/390/768/1024/1440 px, lint, TypeScript e build.
6. Somente após CI verde e validação visual, remover duplicações com inventário atualizado.

### Comandos (pasta `code/`)

```bash
npm ci
npm run format:check
npm run check
npm run assets:verify
npm run artifact:check
npm run test:e2e
npm run scan:secrets
npm run audit:ci
```

**Referências de teste:** `tests/cards.test.tsx`, `tests/browser/cards-standardization.spec.ts`, `tests/browser/institute-mobile.spec.ts`, `tests/browser/news-partnerships.spec.ts`, `tests/browser/partners-performance.spec.ts`. A CI também valida o resto das páginas e o manifesto.

### Estratégia de rollback

Reverter a PR e publicar novamente a `main`; os arquivos originais de dados, assets, bibliotecas de animação e carrosséis permanecem rastreáveis. Não há exclusões de imagens nem mudança em pagamentos.
