// Usa o renderizador do Chromium para identificar o conteúdo visível de SVGs
// com imagens raster embutidas. Sharp/librsvg não renderiza todas essas imagens.
// O original aprovado continua em assets-svg; somente display-svg é atualizado.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const root = process.cwd();
const dir = path.join(root, 'public/assets/img-logos-parceiros-foton/display-svg');
const reportFile = path.join(root, 'assets/partner-svg-display-report.json');
const report = JSON.parse(await readFile(reportFile, 'utf8'));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox'],
});
const page = await browser.newPage();

function applyAttribute(svgTag, attribute, value) {
  const regex = new RegExp('\\b' + attribute + '="[^"]*"', 'i');
  const replacement = attribute + '="' + value + '"';
  return regex.test(svgTag)
    ? svgTag.replace(regex, replacement)
    : svgTag.replace(/>$/, ' ' + replacement + '>');
}

try {
  for (const record of report.records) {
    const file = path.join(dir, record.file);
    const svg = await readFile(file, 'utf8');
    const opening = svg.match(/<svg\b[^>]*>/i);
    const box = opening?.[0].match(/\bviewBox=["']([^"']+)["']/i);
    if (!opening || !box) throw new Error('SVG sem viewBox: ' + record.file);
    const oldBox = box[1].split(/[\s,]+/).map(Number);
    if (oldBox.length !== 4 || oldBox.some((value) => !Number.isFinite(value))) {
      throw new Error('viewBox inválido: ' + record.file);
    }
    const metrics = await page.evaluate(async (source) => {
      const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml' }));
      const image = new Image();
      try {
        image.src = url;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) throw new Error('Canvas indisponível');
        ctx.drawImage(image, 0, 0, 512, 512);
        const data = ctx.getImageData(0, 0, 512, 512).data;
        const sample = (x, y) => {
          const i = (y * 512 + x) * 4;
          return [data[i], data[i + 1], data[i + 2], data[i + 3]];
        };
        const corners = [sample(0, 0), sample(511, 0), sample(0, 511), sample(511, 511)];
        const alphaBackground = corners.every((p) => p[3] < 24);
        const whiteBackground = corners.every(
          (p) => p[3] > 245 && p.slice(0, 3).every((v) => v > 245),
        );
        let minX = 512, minY = 512, maxX = -1, maxY = -1;
        let colorPixels = 0;
        for (let y = 0; y < 512; y++) {
          for (let x = 0; x < 512; x++) {
            const i = (y * 512 + x) * 4;
            const visible = alphaBackground
              ? data[i + 3] > 24
              : whiteBackground
                ? data[i + 3] > 24 && Math.min(data[i], data[i + 1], data[i + 2]) < 237
                : data[i + 3] > 24;
            if (!visible) continue;
            colorPixels++;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
        return {
          minX, minY, maxX, maxY,
          colorPixels,
          cropSafe: alphaBackground || whiteBackground,
          pixelCoverage: Number((colorPixels / (512 * 512)).toFixed(5)),
        };
      } finally {
        URL.revokeObjectURL(url);
      }
    }, svg);
    if (metrics.colorPixels === 0) {
      throw new Error('Logo invisível no Chromium, verificar SVG derivado: ' + record.file);
    }
    record.browserPixelCoverage = metrics.pixelCoverage;
    record.browserCropped = false;
    if (!metrics.cropSafe) {
      record.browserNote = 'Fundo colorido ou opaco: preservado';
      console.log(record.file + ': preservado fundo não transparente');
      continue;
    }
    const pad = Math.max(6, Math.ceil(Math.max(metrics.maxX - metrics.minX, metrics.maxY - metrics.minY) * 0.055));
    const x = Math.max(0, metrics.minX - pad);
    const y = Math.max(0, metrics.minY - pad);
    const endX = Math.min(511, metrics.maxX + pad);
    const endY = Math.min(511, metrics.maxY + pad);
    const bw = endX - x + 1, bh = endY - y + 1;
    if (bw * bh >= 512 * 512 * 0.94) {
      record.browserNote = 'Canvas já utilizado';
      continue;
    }
    const updatedBox = [
      oldBox[0] + x / 512 * oldBox[2],
      oldBox[1] + y / 512 * oldBox[3],
      bw / 512 * oldBox[2],
      bh / 512 * oldBox[3],
    ];
    const round = (value) => String(Number(value.toFixed(4)));
    let rootTag = applyAttribute(opening[0], 'viewBox', updatedBox.map(round).join(' '));
    rootTag = applyAttribute(rootTag, 'width', round(updatedBox[2]));
    rootTag = applyAttribute(rootTag, 'height', round(updatedBox[3]));
    const changed = svg.replace(opening[0], rootTag);
    await writeFile(file, changed);
    record.browserCropped = true;
    record.browserNote = 'viewBox ajustado a conteúdo visível via Chromium';
    record.displayBytes = Buffer.byteLength(changed);
    console.log(record.file + ': bbox ' + [bw, bh].join('x') + ', ' + record.displayBytes + ' bytes');
  }
} finally {
  await browser.close();
}
report.displayBytes = report.records.reduce((sum, record) => sum + record.displayBytes, 0);
report.savingsPercent = Number(((1 - report.displayBytes / report.sourceBytes) * 100).toFixed(2));
await writeFile(reportFile, JSON.stringify(report, null, 2) + '\n');
console.log('RESULTADO FINAL: ' + report.records.length + ' logos; ' + report.savingsPercent + '% de economia; recortes via Chromium: ' + report.records.filter((x) => x.browserCropped).length);
