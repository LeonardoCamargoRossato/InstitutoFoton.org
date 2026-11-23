# Base dos cards

| Arquivo              | Descrição sucinta      | Descrição detalhada                                                                              |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| `BaseCard.tsx`       | Componente estrutural  | Fornece a estrutura visual e os estados comuns usados pelos diferentes tipos de card.            |
| `card.types.ts`      | Contratos e tipos      | Define propriedades, variantes e dados aceitos pela família de cards. Não renderiza tela.        |
| `card.appearance.ts` | Regras de aparência    | Centraliza a transformação das propriedades do card em classes e atributos visuais.              |
| `card.presets.ts`    | Configurações prontas  | Reúne combinações de aparência reutilizáveis para manter consistência entre páginas.             |
| `card.styles.css`    | Estilos compartilhados | Define superfícies, bordas, tipografia, espaçamento, responsividade e estados visuais dos cards. |

Esta pasta é a fundação técnica; os cards finais ficam em `informative/` e `interactive/`.
