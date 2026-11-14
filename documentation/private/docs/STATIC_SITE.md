# Operação técnica — site estático

O frontend reside em `code/` e é publicado por GitHub Pages.

- Conteúdo: `src/content/` e arquivos de mídia aprovados.
- Mídia publicada: `public/assets/`; metadados de manutenção e validação: `scripts/data/`.
- Execução: `npm ci`, `npm run dev`, `npm run check` e demais verificações do workflow.
- Não existe configuração ativa de banco, login ou upload remoto no portal.
- Publicação: Builder → Auditor independente → aprovação humana → merge na `main`.
- Uma nova integração externa deve ter especificação e análise de segurança próprias.
