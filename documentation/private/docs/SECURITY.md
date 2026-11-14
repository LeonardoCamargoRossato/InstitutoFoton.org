# Segurança — portal público estático

O InstitutoFoton.org não oferece login, gerência de papéis, banco, upload ou transações financeiras em runtime.

- Este repositório GitHub é público: `documentation/private/` **não tem controle de acesso**, apesar do nome.
- O pacote publicado deve conter apenas HTML, JS, CSS, mídias e documentos explicitamente aprovados; scripts, fontes intermediárias, inventários técnicos, segredos, SQL e backups permanecem fora de `dist/`.
- `scripts/check-pages-artifact.mjs` rejeita extensões e diretórios não autorizados, detecta padrões de credenciais e endpoints de serviços retirados, valida 31 logos SVG, 49 pares PNG/WebP, fotografias e documentos.
- `scripts/scan-secrets.mjs` permanece ativo em CI.
- Atualizações editoriais precisam de aprovação antes de se tornarem públicas; não é possível revogar arquivos já copiados por terceiros.
- Links e Markdown devem seguir revisão de esquemas/HTML. Dependências seguem o lockfile auditável.

Os testes Vitest e Playwright verificam segurança negativa, navegação, rotas, imagens, apresentação e comportamento mobile. **Não existem testes RLS operacionais**, pois não existe banco neste portal.

GitHub Pages não permite personalizar livremente os cabeçalhos HTTP. Hospedagem própria deverá configurar CSP e demais políticas; comentários não substituem cabeçalhos.
