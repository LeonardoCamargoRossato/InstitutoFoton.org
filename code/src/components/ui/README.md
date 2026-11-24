# Componentes de interface

Esta pasta reúne peças pequenas e reutilizáveis da interface.

| Arquivo | Função |
|---|---|
| `actions.tsx` | Links internos, links externos seguros e variações de ação com classes combináveis. |
| `layout.tsx` | Introduções e títulos de seção com hierarquia consistente. |
| `feedback.tsx` | Estados vazios, carregamento e erro com semântica acessível. |
| `Modal.tsx` | Janela `dialog`, fechamento controlado e retorno de foco. |
| `index.ts` | Ponto de entrada dos componentes. |

Os ícones decorativos usam `aria-hidden`, botões têm `type="button"`, links externos usam `noopener noreferrer` e estados usam papéis ARIA apropriados.
