# Ecossistema de Parceiros — inventário e status (13/11/2026)

**Origem aprovada:** https://institutofoton.com.br/. Código de referência fornecido no ZIP `institutofoton(1).zip`, `src/components/PartnersSection.tsx`.

## Conferência
O site comercial apresenta as categorias “Ecossistema de Instituições” e “Ecossistema de Empresas de Quantum e Tecnologias Emergentes”. O componente original consulta `public.parceiros` com `status='publicado'` e `locale='pt-br'`, ordena por `display_order` e `title`, agrupa por `partner_tier`.

**Bloqueio de conteúdo:** o ZIP não contém registros exportados de `public.parceiros` nem logotipos do Storage. A conexão Supabase autorizada nesta sessão não oferece o projeto comercial. O site público consultado confirma categorias, mas não fornece uma lista nominal auditável. Os arquivos `parceiros_schema_referencia.md` e `consulta_parceiros_publicados.sql` citados no prompt também não constam deste ZIP. **Não afirmar inventário integral nem inventar parceiros.**

## Implementação preparada
- `src/content/partners.json`: snapshot inicial **vazio**, até exportação pública validada.
- `src/content/partners.ts`: filtro, ordenação e agrupamento fiéis ao componente fonte.
- `src/content/partnerAssets.ts`: `logo_slug` para URLs canônicas locais sob `assets/PNG/parceiros/` e `assets/WebP/parceiros/`.
- `src/features/PartnerEcosystem.tsx`: componente compartilhado pela Home e `/parceiros`; cards com `object-fit: contain`, fallback em texto e URL externa segura.
- `src/features/PartnersPage.tsx`: rota com cabeçalho institucional e grupos, quando aprovados.
- `scripts/check-pages-artifact.mjs`: bloqueia build quando um logo listado não existe ou o snapshot contém registros não publicados.

## Dados necessários para cobertura integral
Exportação CSV/JSON aprovada dos registros publicados e mídia original pública de cada marca; sem senhas, tokens, dados pessoais ou tabelas administrativas. Campos essenciais: `id,title,slug,partner_tier,partner_logo,main_image,partner_url,display_order,status,locale`. Revisar origem, direitos de uso e vigência; transcodificar PNG/WebP sem alterar a identidade das marcas; preencher `logo_slug` apenas após arquivos locais revisados.

## Segurança e publicação
O `.org` não consulta Supabase em execução. Nenhum dado do `.com.br` foi alterado. Branch separada, sem alteração na `main` ou Hostinger. **Não aprovar merge até que o inventário nominal e as logomarcas estejam conferidos e o Auditor LCR valide o conteúdo.**
