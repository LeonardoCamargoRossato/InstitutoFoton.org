import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const expectedPrivate =
  'Documentação de operação e governança institucional é mantida em ambientes de acesso controlado. Esta pasta contém apenas esta orientação pública e não armazena dados internos.';
const approvedPublicFiles = new Set([
  'README.md',
  'institution/README.md',
  'content-policy/README.md',
  'release-notes/README.md',
  'lcr-overview/README.md',
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

const readme = await readFile('README.md', 'utf8');
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

const index = await readFile('documentation/README.md', 'utf8');
if (!index.includes('marcador **conceitual**')) {
  throw new Error('Índice deve esclarecer que private/ não é controle de acesso.');
}

const privateFiles = await listFiles('documentation/private');
if (privateFiles.length !== 1 || privateFiles[0] !== 'README.md') {
  throw new Error('documentation/private deve conter exclusivamente o placeholder público.');
}
const placeholder = await readFile('documentation/private/README.md', 'utf8');
if (placeholder.trim() !== expectedPrivate) {
  throw new Error('Placeholder private/ alterado; revisão humana obrigatória.');
}

const publicFiles = await listFiles('documentation/public');
for (const file of publicFiles) {
  if (!approvedPublicFiles.has(file)) {
    throw new Error('Novo documento público ainda não aprovado: ' + file);
  }
  const content = await readFile(join('documentation/public', file), 'utf8');
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
