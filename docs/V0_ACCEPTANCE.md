# Aceite observado da V0

Esta matriz distingue implementação/teste local de implantação remota. Não equivale a declaração de site publicado ou backend de produção pronto.

| Rota/recurso | Evidência | Estado |
|---|---|---|
| `/` | Hero editorial abstrato, CTAs, pesquisa, Jornada, Manifesto, notícias com fallback | Implementado; desktop/mobile revisados |
| `/instituto` | História citada, origem do nome, pilares e integração de textos publicados | Implementado; Missão/Visão não inventadas |
| `/pesquisa` e detalhes | Cinco áreas com textos educativos e ressalvas de atribuição | Implementado; sexta frente depende de validação |
| `/jornada` | Trajetórias intergeracionais e percurso ilustrativo | Implementado; sem inscrição/bolsa simulada |
| `/manifesto` | Cinco Cartas, 11 ODQs literais, metodologia, âncoras e detalhes | Implementado; imagens omitidas porque assets não foram enviados |
| `/noticias` e artigo | Busca/filtros/ordem/paginação Supabase, Markdown seguro, vazio/erro/404 | Implementado; nenhum artigo real disponível para importar |
| `/apresentacao` | PDF real, 7 páginas, navegação, zoom, PNG e download | Validado no navegador com arquivo fornecido; fullscreen depende do navegador |
| `/transparencia` | Documentos publicados via RLS, estados e indicadores documentais datados | Implementado; sem estatuto falso |
| `/apoie` | Sete modalidades, modais acessíveis, foco/ESC/retorno | Validado; sem pagamento, Pix ou campanha ativa |
| `/contato`, privacidade, termos | Link ao site oficial, aviso do funcionamento real | Implementado; sem email/telefone inventado ou formulário simulado |
| `/entrar`, callback, admin | Cliente Google/Supabase, PKCE e membership; estados de falha e negação | Implementado; acesso anônimo bloqueado localmente; login real remoto não testado |
| SQL/RLS/Storage | Migration e seed reexecutáveis, funções e policies; testes PGlite | Validação PostgreSQL local; aplicação no Supabase remoto pendente |
| Pages e rotas profundas | Build com base configurável e fallback 404 que preserva query/hash | Workflow criado; publicação/verificação remota depende de acesso |

## Verificações executadas

- `npm run typecheck`, `npm run lint`, `npm test` e build executados.
- 14 testes de segurança/configuração e PostgreSQL local passaram: anon, autenticado sem membership, Marketing, Diretor, upload negado, RPC negada, revogação e auditoria.
- Playwright: 13 testes passaram, incluindo fallback Pages com query/hash e callback, 320/360/390/768/1440 px, modais, 404, ausência de dashboard anônimo e PDF/PNG.
- Axe automatizado sem violações nas páginas testadas e no modal. Isso não certifica integralmente WCAG ou acessibilidade interna do PDF rasterizado.
- Capturas desktop/mobile em `test-results/`; amostras de revisão em `docs/screenshots/` quando incluídas.
- `npm audit --omit=dev --audit-level=moderate`: nenhuma vulnerabilidade de produção encontrada na execução.

## Bloqueios externos observados

O proxy retornou CONNECT 403 para API GitHub, host Pages e site comercial. As adições de rede foram salvas em rascunho, sem aplicação automática. Não há credencial administrativa Supabase no ambiente informado; secrets de Actions citados no prompt não são prova de binding local ou de aplicação do SQL. Testes Google OAuth, sessões reais, RLS remoto e Storage HTTP permanecem pendentes.

Reaproveitamento possível: todo Manifesto textual e logos originais inspecionados. Pendente: assets do `src/assets`, export editorial, contatos e governança atuais, declaração aprovada literal de Missão/Visão. O Manual controlado e configurações comerciais não entram no repositório/site.
