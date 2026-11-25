# ADR — Arquitetura estática do portal institucional

**Decisão:** 12/11/2026. **Estado:** adotada no portal público (revisão de 16/11/2026).

## Contexto

O portal institucional precisa apresentar informações verificáveis, com navegação acessível, boa disponibilidade e manutenção rastreável.

## Decisão

Manter a experiência pública em **React, TypeScript e Vite**, com arquivos de conteúdo e mídias aprovadas publicados no **GitHub Pages**. O site institucional não exige login de visitantes ou banco de dados em tempo de execução.

## Justificativa e consequências

Uma arquitetura estática simplifica a revisão editorial e permite validação automatizada das alterações antes da publicação. Atualizações exigem revisão de conteúdo, arquivos e novo deploy. Funcionalidades que dependam de dados privados ou processamento dinâmico requerem decisão técnica própria.

O histórico operacional, as validações técnicas detalhadas e os procedimentos de infraestrutura foram preservados integralmente em ambiente privado autorizado, separados deste documento resumido.
