# Fundamentos do Design System

Esta pasta contém as decisões visuais globais do Instituto Foton. Ela não renderiza componentes e não contém conteúdo editorial.

| Arquivo       | Descrição sucinta    | Descrição detalhada                                                                                              |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------- |
| `tokens.css` | Tokens visuais globais | Centraliza cores, superfícies, espaçamentos, tipografia, raios, sombras, transições e limites de layout usados pelas demais camadas. |

## Regra de uso

Novos componentes devem preferir os tokens desta pasta. Um valor específico só deve ser escrito diretamente quando representar uma exceção intencional do componente e estiver documentado no seu README.

A migração dos estilos existentes deve ser gradual: primeiro o token é criado, depois os consumidores são migrados e, por fim, valores duplicados são removidos após validação visual e CI.
