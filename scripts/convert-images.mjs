import { readdir, stat } from 'node:fs/promises';
import { join, parse, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = resolve(__dirname, '../assets');
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png']);
const MAX_WIDTH = 2000;
const AVIF_QUALITY = 55;
const WEBP_QUALITY = 78;

const files = await readdir(ASSETS_DIR);
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const ext = parse(file).ext.toLowerCase();
  const base = parse(file).name;
  if (!SOURCE_EXT.has(ext)) continue;

  const src = join(ASSETS_DIR, file);
  const avifOut = join(ASSETS_DIR, `${base}.avif`);
  const webpOut = join(ASSETS_DIR, `${base}.webp`);

  const srcStat = await stat(src);
  totalBefore += srcStat.size;

  const pipe = sharp(src).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  await pipe.clone().avif({ quality: AVIF_QUALITY, effort: 6 }).toFile(avifOut);
  await pipe.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpOut);

  const avifStat = await stat(avifOut);
  const webpStat = await stat(webpOut);
  const smallest = Math.min(avifStat.size, webpStat.size);
  totalAfter += smallest;

  const pct = ((1 - smallest / srcStat.size) * 100).toFixed(0);
  console.log(
    `${file.padEnd(35)} ${(srcStat.size / 1024).toFixed(0).padStart(5)}KB -> AVIF ${(avifStat.size / 1024).toFixed(0).padStart(4)}KB, WebP ${(webpStat.size / 1024).toFixed(0).padStart(4)}KB  (-${pct}%)`
  );
}

console.log(`\nTOTAL: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB (best-of-two)`);
