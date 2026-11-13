import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = resolve('public/assets');
const inventory = JSON.parse(await readFile('assets/asset-inventory.json', 'utf8'));
const write = process.argv.includes('--write');
const errors = [],
  duplicateIndex = new Map(),
  duplicatePairs = [];
const report = [];
for (const item of inventory.items) {
  const png = join(root, 'PNG', item.category, item.id + '.png');
  const webp = join(root, 'WebP', item.category, item.id + '.webp');
  try {
    const content = await readFile(png);
    const hash = createHash('sha256').update(content).digest('hex');
    if (duplicateIndex.has(hash)) duplicatePairs.push([duplicateIndex.get(hash), item.id]);
    duplicateIndex.set(hash, item.id);
    const src = await sharp(content).metadata();
    if (!src.width || !src.height) throw Error('PNG inválido');
    if (write)
      await sharp(content)
        .resize({ width: 1440, withoutEnlargement: true })
        .webp({ quality: 84, effort: 5 })
        .toFile(webp);
    const rendered = await sharp(webp).metadata();
    if (!rendered.width || !rendered.height) throw Error('WebP inválido');
    if (rendered.width > src.width || rendered.height > src.height)
      errors.push('Ampliação não autorizada: ' + item.id);
    if (src.hasAlpha && !rendered.hasAlpha) {
      // PNG pode ter canal alfa declarado, mas todos os pixels completamente opacos.
      // Somente transparência real precisa sobreviver à codificação WebP.
      const alpha = await sharp(content).extractChannel('alpha').raw().toBuffer();
      if (alpha.some((value) => value < 255)) errors.push('Transparência real perdida: ' + item.id);
    }
    report.push({
      id: item.id,
      sourceWidth: src.width,
      sourceHeight: src.height,
      webpWidth: rendered.width,
      webpHeight: rendered.height,
      pngBytes: content.length,
      webpBytes: (await stat(webp)).size,
    });
  } catch (e) {
    errors.push(item.id + ': ' + String(e));
  }
}
const summary = { count: report.length, duplicates: duplicatePairs, errors, images: report };
if (write)
  await writeFile('assets/conversion-report.json', JSON.stringify(summary, null, 2) + '\n');
console.log(
  'Assets:',
  report.length,
  'duplicados:',
  duplicatePairs.length,
  'erros:',
  errors.length,
);
if (duplicatePairs.length) console.warn('Conteúdo idêntico reaproveitável:', duplicatePairs);
if (errors.length) {
  console.error(errors);
  process.exitCode = 1;
}
if (
  (await readdir(join(root, 'PNG', 'visitas-tecnicas'))).filter((p) => p.endsWith('.png'))
    .length !== 20
)
  process.exitCode = 1;
