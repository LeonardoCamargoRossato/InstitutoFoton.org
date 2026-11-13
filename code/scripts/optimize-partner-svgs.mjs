// Deriva versões leves e recortadas das logos aprovadas sem alterar os SVGs originais.
// Executar somente após npm ci: npm run partners:optimize
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const inventory = JSON.parse(
  await readFile(path.join(root, 'assets/partner-svg-inventory.json'), 'utf8'),
);
const originals = path.join(root, 'public/assets/img-logos-parceiros-foton/assets-svg');
const previews = path.join(root, 'public/assets/img-logos-parceiros-foton/display-svg');
await mkdir(previews, { recursive: true });

function applyAttribute(svgTag, attribute, value) {
  const regex = new RegExp('\\b' + attribute + '=(["\\\'])[^"\\\']*\\1', 'i');
  const replacement = attribute + '="' + value + '"';
  return regex.test(svgTag)
    ? svgTag.replace(regex, replacement)
    : svgTag.replace(/>$/, ' ' + replacement + '>');
}

async function compressEmbeddedImages(svg) {
  let savings = 0;
  let optimizedCount = 0;
  // SVGs exportados podem conter fotografias raster de resolução desnecessária
  // dentro de uma imagem vetorial. A geometria vetorial nunca é rasterizada.
  const matches = [...svg.matchAll(/data:image\/(png|jpe?g|webp);base64,([a-zA-Z0-9+/=]+)/gi)];
  for (const match of matches) {
    const source = Buffer.from(match[2], 'base64');
    if (source.length < 40000) continue;
    try {
      const metadata = await sharp(source, { limitInputPixels: 80000000 }).metadata();
      if (!metadata.width || !metadata.height) continue;
      const converted = await sharp(source, { limitInputPixels: 80000000 })
        .resize({ width: 960, height: 960, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 94, effort: 4 })
        .toBuffer();
      if (converted.length >= source.length * 0.96) continue;
      svg = svg.replace(match[0], 'data:image/webp;base64,' + converted.toString('base64'));
      savings += source.length - converted.length;
      optimizedCount += 1;
    } catch (error) {
      console.warn('Raster preservado por incompatibilidade:', String(error));
    }
  }
  return { svg, savings, optimizedCount };
}

async function cropTransparentMargins(svg) {
  const opening = svg.match(/<svg\b[^>]*>/i);
  if (!opening) return { svg, cropped: false, reason: 'Sem elemento SVG' };
  const oldTag = opening[0];
  const viewBox = oldTag.match(/\bviewBox=["']([^"']+)["']/i);
  if (!viewBox) return { svg, cropped: false, reason: 'Sem viewBox' };
  const values = viewBox[1]
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (
    values.length !== 4 ||
    values.some((v) => !Number.isFinite(v)) ||
    values[2] <= 0 ||
    values[3] <= 0
  ) {
    return { svg, cropped: false, reason: 'viewBox inválido' };
  }
  try {
    const { data, info } = await sharp(Buffer.from(svg), { limitInputPixels: 80000000 })
      .resize(512, 512, { fit: 'fill' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const w = info.width;
    const h = info.height;
    const px = (x, y) => (y * w + x) * info.channels;
    const corner = [
      [0, 0],
      [w - 1, 0],
      [0, h - 1],
      [w - 1, h - 1],
    ].map(([x, y]) => {
      const i = px(x, y);
      return [data[i], data[i + 1], data[i + 2], data[i + 3]];
    });
    const transparent = corner.every((p) => p[3] < 24);
    const white = corner.every((p) => p[3] > 245 && p.slice(0, 3).every((c) => c > 245));
    if (!transparent && !white)
      return { svg, cropped: false, reason: 'Fundo preenchido conservado' };

    let minX = w,
      minY = h,
      maxX = -1,
      maxY = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = px(x, y);
        const alpha = data[i + 3];
        const visible = transparent
          ? alpha > 24
          : alpha > 24 && Math.min(data[i], data[i + 1], data[i + 2]) < 237;
        if (!visible) continue;
        minX = Math.min(x, minX);
        minY = Math.min(y, minY);
        maxX = Math.max(x, maxX);
        maxY = Math.max(y, maxY);
      }
    }
    if (maxX < minX || maxY < minY) return { svg, cropped: false, reason: 'Sem pixels detectados' };
    const pad = Math.max(7, Math.ceil(Math.max(maxX - minX, maxY - minY) * 0.055));
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(w - 1, maxX + pad);
    maxY = Math.min(h - 1, maxY + pad);
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;
    if (cropWidth * cropHeight >= w * h * 0.94) {
      return { svg, cropped: false, reason: 'O conteúdo já usa o canvas' };
    }
    const vx = values[0] + (minX / w) * values[2];
    const vy = values[1] + (minY / h) * values[3];
    const vw = (cropWidth / w) * values[2];
    const vh = (cropHeight / h) * values[3];
    const rounded = (n) => Number(n.toFixed(4));
    let tag = applyAttribute(oldTag, 'viewBox', [vx, vy, vw, vh].map(rounded).join(' '));
    tag = applyAttribute(tag, 'width', String(rounded(vw)));
    tag = applyAttribute(tag, 'height', String(rounded(vh)));
    return {
      svg: svg.replace(oldTag, tag),
      cropped: true,
      reason: 'Margens transparentes removidas do viewBox',
    };
  } catch (error) {
    return { svg, cropped: false, reason: 'Não renderizável no otimizador: ' + String(error) };
  }
}

const report = [];
for (const record of inventory.records) {
  const filename = record.logo_filename;
  if (!/^Logo[A-Za-z0-9]+\.svg$/.test(filename)) throw new Error('Nome SVG inválido: ' + filename);
  const original = await readFile(path.join(originals, filename));
  const optimized = await compressEmbeddedImages(original.toString('utf8'));
  const cropped = await cropTransparentMargins(optimized.svg);
  const output = Buffer.from(cropped.svg);
  await writeFile(path.join(previews, filename), output);
  report.push({
    file: filename,
    sourceBytes: original.length,
    displayBytes: output.length,
    embeddedImagesOptimized: optimized.optimizedCount,
    cropped: cropped.cropped,
    note: cropped.reason,
  });
  console.log(filename + ': ' + original.length + ' -> ' + output.length + ' B; ' + cropped.reason);
}
if (report.length !== 31 || new Set(report.map((r) => r.file)).size !== 31) {
  throw new Error('Inventário inesperado: os 31 SVGs aprovados devem continuar presentes');
}
const sourceBytes = report.reduce((n, r) => n + r.sourceBytes, 0);
const displayBytes = report.reduce((n, r) => n + r.displayBytes, 0);
const summary = {
  generatedFrom: 'SVGs originais aprovados, sem modificação dos arquivos fonte',
  count: report.length,
  sourceBytes,
  displayBytes,
  savingsPercent: Number(((1 - displayBytes / sourceBytes) * 100).toFixed(2)),
  records: report,
};
await writeFile(
  path.join(root, 'assets/partner-svg-display-report.json'),
  JSON.stringify(summary, null, 2) + '\n',
);
console.log(
  'TOTAL: ' + sourceBytes + ' -> ' + displayBytes + ' B (' + summary.savingsPercent + '% menores).',
);
