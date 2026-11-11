# Segurança V0

- Identidade Google via Supabase não concede autorização. Membership ativa é a fonte do papel.
- Tabelas `site_*` com RLS e grants explícitos. `anon`/`authenticated` não escrevem dados na V0. Marketing vê conteúdo público e seu membership; Diretor pode ler documentos privados/auditoria e usar RPC validada para papéis.
- `site_set_membership` deriva ator de `auth.uid()`, valida papel e estado, serializa mudanças e preserva ao menos um Diretor ativo. Não usa `user_metadata`, email ou localStorage como autorização.
- Funções definer com `search_path` fixo, REVOKE/GRANT específicos e auditoria sem payloads. Nenhuma escrita de logs por clientes. Conteúdo futuro exige fluxo de revisão separado.
- Storage: público contém somente arquivos efetivamente aprovados. Bucket privado permite leitura apenas ao Diretor. Nenhuma policy de upload/alteração por cliente na V0. Aprovação da linha no banco não protege objeto já público: a revisão precisa ocorrer **antes do upload público**.
- Conteúdo de artigo não renderiza HTML e bloqueia esquemas de URL perigosos. Nenhuma incorporação arbitrária, `dangerouslySetInnerHTML` ou integração de IA.
- Sem cadastro público de pessoas, formulário com envio simulado, transações, Pix, tracking ou campanhas financeiras ativas.
- `.env`/credenciais comerciais não portados. Chaves anon/publishable são públicas; chaves administrativas nunca devem entrar em `VITE_*`.

## Evidência de testes

`tests/rls.test.ts` executa migration duas vezes e testa anon, usuário sem papel, Marketing e Diretor no PostgreSQL WASM PGlite. Verifica leitura pública/rascunho/agendamento, autoelevação negada, RPC negada, documentos privados, upload negado, revogação, último Diretor e auditoria. Auth/Storage têm schemas de teste; isso **não certifica** Auth, Storage HTTP ou RLS do Supabase remoto.

Os testes E2E usam fixtures de leitura pública vazia para tornar a UI determinística; não representam disponibilidade ou registros no backend remoto. Playwright testa acesso anônimo direto ao admin, retorno ao site e ausência de dashboard; o fluxo Google remoto e sessões institucionais reais dependem de infraestrutura autorizada. Nunca substituir essa validação por afirmação de login funcional.

## Limites e operação

GitHub Pages não oferece configuração livre de headers HTTP/CSP. Recomenda-se hosting com CSP e cabeçalhos de segurança controlados na migração; nenhuma proteção é simulada em comentários. Dependências de produção auditadas via npm; lockfile fixa integridade. A biblioteca oficial mantém a sessão SPA no navegador, que permanece sensível a XSS; revisão de dependências e conteúdo continua necessária.

Antes de habilitar V1, revisar políticas existentes no projeto remoto, executar matriz com JWTs reais autorizados e validar revogação/Storage/expiração. Sem testes remotos não se declara backend de produção pronto.
