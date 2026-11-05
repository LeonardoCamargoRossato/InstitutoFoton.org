import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';

const paths = execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
const forbiddenFiles = paths.filter(p => /(^|\/)\.env(?:\.|$)/.test(p) && !p.endsWith('.env.example'));
const hits = [];
for (const path of paths) {
  if (!/\.(?:[cm]?[jt]sx?|json|md|ya?ml|html|css|sql|example)$/.test(path)) continue;
  const text = await readFile(path,'utf8');
  let suspicious = /\b(?:sb_secret_[A-Za-z0-9_-]{15,}|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}|sk-[A-Za-z0-9_-]{25,})\b/.test(text) || /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text);
  for (const jwt of text.matchAll(/\beyJ[A-Za-z0-9_-]+\.([A-Za-z0-9_-]+)\.[A-Za-z0-9_-]+/g)) {
    try { if (JSON.parse(Buffer.from(jwt[1],'base64url').toString()).role === 'service_role') suspicious = true; } catch { /* Non-JWT text is ignored. */ }
  }
  if (suspicious) hits.push(path);
}
if (forbiddenFiles.length || hits.length) {
  console.error('Revisão necessária; somente nomes de arquivos são exibidos:', [...forbiddenFiles,...hits]);
  process.exit(1);
}
console.log(`Varredura concluída: ${paths.length} arquivos, sem .env privado ou padrões de credencial administrativa detectados. Revisão complementar continua necessária.`);
