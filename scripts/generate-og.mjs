import { dirname, resolve } from 'node:path';
import { stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Renders the WhatsApp/OG share card (1200x630) as a branded typographic
// composition: white-first with a restrained blue accent, matching the site
// palette. Output goes to public/assets/ (the served asset folder).
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/assets/og-cover.jpg');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f8fbff"/>

  <!-- soft depth: mist bloom bottom-left, sky wash top-right -->
  <circle cx="150" cy="560" r="300" fill="#d9eeff" opacity="0.6"/>
  <circle cx="1100" cy="40" r="230" fill="#d9eeff" opacity="0.38"/>

  <!-- action-blue edge bar (inline-start for RTL) -->
  <rect x="1186" y="0" width="14" height="630" fill="#2563eb"/>

  <!-- monogram chip -->
  <rect x="1046" y="86" width="84" height="84" rx="24" fill="#061b35"/>
  <text x="1088" y="141" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="40" font-weight="700" fill="#ffffff">אב</text>

  <text x="1130" y="300" text-anchor="end" font-family="Segoe UI, Arial, sans-serif"
        font-size="92" font-weight="800" fill="#061b35">אסף בוסקילה</text>
  <text x="1130" y="382" text-anchor="end" font-family="Segoe UI, Arial, sans-serif"
        font-size="42" font-weight="600" fill="#2f5f93">עובד דיגיטלי לעסק שלך: AI, אוטומציות ואתרים</text>
  <text x="1130" y="448" text-anchor="end" font-family="Segoe UI, Arial, sans-serif"
        font-size="34" font-weight="600" fill="#5b6f86">עונה, מוכר ומתאם. גם בשתיים בלילה</text>

  <text x="1130" y="546" text-anchor="end" font-family="Segoe UI, Arial, sans-serif"
        font-size="30" font-weight="700" fill="#2563eb">assafweb.com</text>
</svg>`;

await sharp(Buffer.from(svg), { density: 144 })
  .resize(1200, 630)
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(OUT);

const s = await stat(OUT);
console.log(`og-cover.jpg generated: ${(s.size / 1024).toFixed(0)}KB at ${OUT}`);
