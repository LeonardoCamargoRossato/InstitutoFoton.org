# Exceção temporária de segurança — picomatch

**Registrada em:** 2026-11-17  
**Revisão obrigatória até:** 2026-12-17  
**Estado:** risco residual não corrigido; não equivale a uma correção da vulnerabilidade.

## Origem

O `npm audit --audit-level=high` apontou o aviso **GHSA-fc5q-39xc-vjpf /
CVE-2026-112366** (ReDoS em `picomatch` até 4.0.7). Em 17/11/2026,
o aviso oficial não indicava versão corrigida. O lockfile utiliza
`picomatch@4.0.7` como dependência **transitiva de desenvolvimento**, junto
com `vite`, `vitest`, `tinyglobby` e `typescript-eslint`.

Fonte: https://github.com/advisories/GHSA-fc5q-39xc-vjpf

## Decisão provisória e controles

- `npm run audit:prod` permanece disponível sem exceções; o CI executa
  obrigatoriamente `npm audit --omit=dev --audit-level=high` e falha se
  houver vulnerabilidades altas/críticas em produção.
- A auditoria **completa** continua obrigatória, mas o gate
  `npm run audit:ci` tolera temporariamente **somente** a advisory acima
  e suas dependências transitivas comprovadas. Vulnerabilidades altas/críticas
  novas ou não relacionadas causam falha.
- A exceção é automaticamente encerrada em **17/12/2026**.
- O site publicado é estático e não deve processar padrões glob externos
  fornecidos por visitantes. Não encaminhar globs não confiáveis às ferramentas
  de build, lint ou teste.
- `npm run audit:all` continua executando a auditoria npm sem exceções e
  deve ser usado para revisão completa dos avisos.

## Critérios para eliminar a exceção

1. Monitorar uma versão upstream de `picomatch` com correção comprovada.
2. Atualizar o lockfile, executar CI completo e verificar ausência do aviso.
3. Remover a exceção, os testes específicos e a referência no CI quando o
   pacote estiver corrigido; registrar a decisão na PR.

**Não interpretar CI verde como declaração de ausência de vulnerabilidades
de desenvolvimento.** A aceitação definitiva do risco é uma decisão humana.
