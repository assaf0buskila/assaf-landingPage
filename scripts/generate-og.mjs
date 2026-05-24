import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = resolve(__dirname, '../assets');

await sharp(`${ASSETS}/about-me.png`)
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${ASSETS}/og-cover.jpg`);

const stat = (await import('node:fs/promises')).stat;
const s = await stat(`${ASSETS}/og-cover.jpg`);
console.log(`og-cover.jpg generated: ${(s.size / 1024).toFixed(0)}KB`);
