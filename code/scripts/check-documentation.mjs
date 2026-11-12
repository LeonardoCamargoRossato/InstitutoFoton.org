import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const expectedPrivate =
  "# Documentação técnica classificada como interna\n\n**Aviso de segurança:** este repositório GitHub é público. A pasta `documentation/private/` e todos os documentos nela disponíveis **também são públicos**, inclusive via Git, API e histórico. A palavra *private* indica somente classificação documental, **não** permissão de acesso.\n\nO conteúdo de `docs/` foi reorganizado abaixo em `docs/` para manter a estrutura visual LCR e preservar os arquivos originais. Esta movimentação não torna nenhum documento confidencial, não elimina exposição anterior e não substitui uma cópia num ambiente verdadeiramente privado.\n\nDocumentação que exija confidencialidade real deverá ser migrada mediante autorização para um repositório privado ou Google Drive institucional com permissões verificadas. Não adicione novos segredos, registros sensíveis ou documentos restritos a esta pasta.";
const approvedPrivateFiles = new Set([
  'README.md',
  "docs/ARCHITECTURE.md",
  "docs/CONTENT_VALIDATION.md",
  "docs/DEPLOYMENT.md",
  "docs/HOSTING_MIGRATION.md",
  "docs/MEDIA_MANIFEST.md",
  "docs/REFERENCE_INVENTORY.md",
  "docs/ROADMAP.md",
  "docs/SECURITY.md",
  "docs/SUPABASE_SETUP.md",
  "docs/V0_ACCEPTANCE.md",
  "docs/screenshots/apoie-1440.png",
  "docs/screenshots/apresentacao-1440.png",
  "docs/screenshots/home-1440.png",
  "docs/screenshots/home-390.png",
]);
const approvedPublicFiles = new Set([
  'README.md',
  'institution/README.md',
  'content-policy/README.md',
  'release-notes/README.md',
  'lcr-overview/README.md',
  'release-notes/RefinamentoVisualTransparencia20261111.md',
  'release-notes/InventarioMigracaoEstatica20261112.md',
  'architecture/ADR-20261112-Portal-Estatico.md',
]);

async function listFiles(folder, prefix = '') {
  const files = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const relative = prefix ? prefix + '/' + entry.name : entry.name;
    if (entry.isSymbolicLink()) throw new Error('Link simbólico não aprovado: ' + relative);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(join(folder, entry.name), relative)));
    } else if (entry.isFile()) {
      files.push(relative);
    } else {
      throw new Error('Entrada documental não aprovada: ' + relative);
    }
  }
  return files;
}

const readme = await readFile(join(repoRoot, 'README.md'), 'utf8');
if (!readme.startsWith('# Instituto Foton\n')) {
  throw new Error('README institucional com título inesperado.');
}
if (!readme.includes('https://leonardocamargorossato.github.io/InstitutoFoton.org/')) {
  throw new Error('README sem link público oficial.');
}
const operationalTerms =
  /\bnpm\s+(?:ci|run)\b|\bnpx\b|VITE_|Supabase|OAuth|\bRLS\b|GitHub Actions|\/workspace\/|\.env|docs\/|\/admin\b|migrations|service_role/i;
if (operationalTerms.test(readme)) {
  throw new Error('README contém referência operacional; revisar antes de publicar.');
}

const index = await readFile(join(repoRoot, 'documentation/README.md'), 'utf8');
if (!index.includes('**atualmente públicos no GitHub**')) {
  throw new Error('Índice deve esclarecer que private/ no GitHub público não é controle de acesso.');
}

const privateFiles = await listFiles(join(repoRoot, 'documentation/private'));
if (privateFiles.length !== approvedPrivateFiles.size ||
    privateFiles.some((file) => !approvedPrivateFiles.has(file))) {
  throw new Error('Conteúdo inesperado em documentation/private; revisão humana obrigatória.');
}
const rootFiles = await readdir(repoRoot);
if (rootFiles.includes('docs')) {
  throw new Error('A pasta docs/ não deve continuar na raiz do repositório.');
}
const placeholder = await readFile(join(repoRoot, 'documentation/private/README.md'), 'utf8');
if (placeholder.trim() !== expectedPrivate) {
  throw new Error('Aviso de exposição pública em private/ foi alterado; revisão humana obrigatória.');
}

const publicFiles = await listFiles(join(repoRoot, 'documentation/public'));
for (const file of publicFiles) {
  if (!approvedPublicFiles.has(file)) {
    throw new Error('Novo documento público ainda não aprovado: ' + file);
  }
  const content = await readFile(join(repoRoot, 'documentation/public', file), 'utf8');
  if (
    /sb_secret_|github_pat_|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|supabase\.co|dashboard\.supabase\.com|\/workspace\/|service_role/i.test(
      content,
    )
  ) {
    throw new Error('Possível conteúdo operacional em: documentation/public/' + file);
  }
}
for (const expected of approvedPublicFiles) {
  if (!publicFiles.includes(expected)) {
    throw new Error('Documento público ausente: ' + expected);
  }
}
console.log('README institucional e separação documental pública verificados.');
