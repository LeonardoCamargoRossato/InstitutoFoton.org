# ADR — Suspensão temporária do backend do portal, 12/11/2026

**Status:** proposta implementada em branch; requer Auditor Quality & Security e aprovação humana.

## Contexto
Antes: GitHub Pages + consultas públicas, autenticação e arquivos do Supabase. Desenvolvimento do site institucional prioriza disponibilidade estática, desempenho, integridade editorial e manutenção simples.

## Decisão
Renderizar o portal exclusivamente a partir de arquivos e catálogos locais versionados no GitHub Pages. Imagens WebP para preview e PNG para zoom. Manter PDF aprovado em /documents. Desativar temporariamente autenticação, painel e callback operacional. Preservar migrações e seed de banco como legado não utilizado. Nenhum projeto, bucket, conta ou tabela é excluído.

## Consequências
Notícias e relatórios institucionais cuja publicação só foi registrada no banco não são considerados migrados: catálogo local vazio até exportação e aprovação. Textos oficiais devem vir de fontes verificáveis no repositório; não inventar missão e visão. Estáticos não fornecem atualização editorial automática nem login.

## Retorno ao Supabase
Somente após nova decisão humana, revisão de permissões, inventário completo do Storage e dos documentos, implementação em branch nova, testes RLS/Auth e auditoria independente. Não reutilizar sem revisão chaves antigas. Arquivos administrativos privados devem ficar fora do repositório público.

## Limitações
Exportação visual de 49 arquivos públicos não equivale a inventário integral de buckets ou documentos. documentation/private é publicamente acessível. Esta ADR não contém segredos ou acesso operacional.