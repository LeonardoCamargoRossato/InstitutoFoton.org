# 08 — Páginas auxiliares

[← Todas as páginas](../) · [Mapa técnico](./8A-RotasAuxiliares.ts) · [Rotas React](../../main.tsx)

| ID  | Página/seção                        | Ver página                                                                                                                                                            | Código                                         | Copy/dados                                      | Status            |
| --- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------- | ----------------- |
| 8.1 | Contato institucional               | [Abrir](https://leonardocamargorossato.github.io/InstitutoFoton.org/contato#contato-intro)                                                                            | [Contact](../../features/PublicPages.tsx)      | [estrutura](../../content/siteStructure.ts)     | Publicada         |
| 8.2 | Transparência — documentos públicos | —                                                                                                                                                                     | [painel](../../features/TransparencyBoard.tsx) | [documentos](../../content/public-documents.ts) | **Não publicada** |
| 8.3 | Apresentação institucional          | [Abrir](https://leonardocamargorossato.github.io/InstitutoFoton.org/apresentacao)                                                                                     | [visualizador](../../features/Documents.tsx)   | [documentos](../../content/public-documents.ts) | Publicada         |
| 8.4 | Privacidade e termos                | [Privacidade](https://leonardocamargorossato.github.io/InstitutoFoton.org/privacidade) · [Termos](https://leonardocamargorossato.github.io/InstitutoFoton.org/termos) | [Legal](../../features/PublicPages.tsx)        | [estrutura](../../content/siteStructure.ts)     | Publicadas        |

## Rotas operacionais

Estas rotas aparecem no React Router, mas não são conteúdo editorial do menu:

- [Entrar](../../features/Access.tsx)
- `/auth/callback`
- `/admin/*`

## Implementation files

| File                    | Description                                  |
| ----------------------- | -------------------------------------------- |
| `8A-RotasAuxiliares.ts` | Technical map for auxiliary routes.          |
| `PAGE.ts`               | Page-level technical map and route metadata. |

The page map above is the editorial navigation mirror; this section documents the files directly stored in the page folder.
