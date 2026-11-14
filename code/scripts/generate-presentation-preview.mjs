import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const run = promisify(execFile);
const source = resolve('public/documents/apresentacao-institucional-2026-09-10.pdf');
const destination = resolve('public/assets/WebP/apresentacao');
const temp = await mkdtemp(join(tmpdir(), 'foton-apresentacao-'));
const outputs = ['apresentacao-foton-pagina-01.webp', 'apresentacao-foton-pagina-02.webp'];

await mkdir(destination, { recursive: true });

try {
  const { stdout } = await run('pdfinfo', [source]);
  const pages = Number(stdout.match(/^Pages:\s*(\d+)$/m)?.[1]);
  if (!Number.isInteger(pages) || pages < 2) {
    throw new Error('A apresentação institucional precisa conter pelo menos duas páginas.');
  }

  // Renderização fiel das páginas 1 e 2; nenhuma imagem é gerada por IA.
  // A largura longa é limitada a 1200 px para manter uma prévia leve.
  await run('pdftoppm', [
    '-f',
    '1',
    '-l',
    '2',
    '-scale-to',
    '1200',
    '-png',
    source,
    join(temp, 'pagina'),
  ]);

  const pngs = (await readdir(temp))
    .filter((name) => /^pagina-\d+\.png$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));
  if (pngs.length !== 2) {
    throw new Error('Falha ao renderizar exatamente as duas primeiras páginas do PDF.');
  }

  for (let i = 0; i < pngs.length; i++) {
    const output = join(destination, outputs[i]);
    const result = await sharp(join(temp, pngs[i])).webp({ quality: 84, effort: 5 }).toFile(output);
    const metadata = await sharp(output).metadata();
    if (!metadata.width || !metadata.height || metadata.format !== 'webp') {
      throw new Error('Imagem WebP inválida: ' + outputs[i]);
    }
    const bytes = (await stat(output)).size;
    if (bytes < 1000 || bytes > 800000) {
      throw new Error('Prévia com tamanho fora do esperado: ' + outputs[i] + ' (' + bytes + ')');
    }
    console.log(outputs[i] + ': ' + result.width + 'x' + result.height + ' · ' + bytes + ' bytes');
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
