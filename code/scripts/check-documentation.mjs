import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const approvedPublicFiles = new Set([
  'README.md',
  'institution/README.md',
  'content-policy/README.md',
  'release-notes/README.md',
  'lcr-overview/README.md',
  'security/README.md',
  'architecture/README.md',
  'audits/2026-11-24-international-compliance-baseline.md',
  'architecture/ADR-20261112-Portal-Estatico.md',
  'architecture/20261123-arquitetura-pages-fase1.md',
  'release-notes/RefinamentoVisualTransparencia20261111.md',
  'release-notes/InventarioMigracaoEstatica20261112.md',
  'release-notes/HotfixInstitucionalMinimal20261113.md',
  'release-notes/EcossistemaParceiros20261113.md',
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
if (
  !index.includes('only documentation authorized for publication') ||
  !index.includes('outside GitHub')
) {
  throw new Error('Documentation index must describe the public/private boundary.');
}
if (/\]\([^)]*(?:documentation\/private|private\/docs)/i.test(index)) {
  throw new Error('Índice contém links obsoletos para documentação interna.');
}
const agents = await readFile(join(repoRoot, 'AGENTS.md'), 'utf8');
if (!agents.includes('GUARDRAILS.md') || !agents.includes('prompt injection')) {
  throw new Error('Política pública mínima dos agentes incompleta.');
}

const tracked = execFileSync('git', ['ls-files', '--cached', '-z'], {
  cwd: repoRoot,
  encoding: 'utf8',
})
  .split('\0')
  .filter(Boolean);
const prohibited = tracked.filter(
  (p) =>
    /^privado\//i.test(p) ||
    /^documentation\/private(?:\/|$)/i.test(p) ||
    /^Documentation(?:\/|$)/.test(p) ||
    /^(?:code\/public|code\/dist)\/(?:.*\/)?privado(?:\/|$)/i.test(p),
);
if (prohibited.length) {
  throw new Error(
    'Documento interno versionado no Git (' + prohibited.length + ' arquivos; caminhos omitidos).',
  );
}
for (const folder of [
  'privado',
  'documentation/private',
  'Documentation',
  'docs',
  'code/public/privado',
  'code/dist/privado',
]) {
  if (existsSync(join(repoRoot, folder))) {
    throw new Error('Pasta privada ou legada presente no checkout público: ' + folder);
  }
}

const publicRoot = join(repoRoot, 'documentation');
const publicFiles = await listFiles(publicRoot);
const extra = publicFiles.filter((f) => !approvedPublicFiles.has(f));
const missing = [...approvedPublicFiles].filter((f) => !publicFiles.includes(f));
if (extra.length || missing.length) {
  throw new Error(
    'Inventário público inválido: ' + extra.length + ' extras, ' + missing.length + ' ausentes.',
  );
}
for (const file of publicFiles) {
  const absolute = join(publicRoot, file);
  const content = await readFile(absolute, 'utf8');
  if (
    /sb_secret_|github_pat_|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|supabase\.co|dashboard\.supabase\.com|\/workspace\/|service_role/i.test(
      content,
    )
  ) {
    throw new Error('Padrão de informação restrita na documentação pública: ' + file);
  }
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    let target = match[1].trim().split('#')[0];
    if (/^(https?:|mailto:|#|data:)/i.test(target) || !target) continue;
    try {
      target = decodeURIComponent(target);
    } catch {
      throw new Error('URL local inválida em ' + file);
    }
    if (!existsSync(resolve(dirname(absolute), target))) {
      throw new Error('Link local inexistente em: ' + file);
    }
  }
}
console.log(
  'Documentação pública, índice Git e links locais validados: ' +
    publicFiles.length +
    ' documentos.',
);
