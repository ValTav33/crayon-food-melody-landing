/**
 * Turns the raw brand/photo drop in ../Media into the site's image set:
 * every public image as WebP, plus the favicon (PNG) and the social card (JPG),
 * which stay in formats every platform reads.
 *
 *   node scripts/process-media.mjs [path/to/Media]
 *
 * Sources are matched by pattern, not exact name: the files come from phones and
 * design tools, with mixed extensions and the odd non-breaking space.
 */
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MEDIA = path.resolve(process.argv[2] ?? path.join(ROOT, '..', 'Media'));
const OUT = path.join(ROOT, 'public', 'images');
const APP = path.join(ROOT, 'app');

const INK = { r: 10, g: 10, b: 10 };
const WEBP = { quality: 80, effort: 6 };

const files = await readdir(MEDIA);
function src(pattern) {
  const hit = files.find((f) => pattern.test(f.normalize('NFKC')));
  if (!hit) throw new Error(`No file in ${MEDIA} matches ${pattern}`);
  return path.join(MEDIA, hit);
}
async function write(pipeline, file) {
  await mkdir(path.dirname(file), { recursive: true });
  const info = await pipeline.toFile(file);
  console.log(`${path.relative(ROOT, file)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
const webp = (file) => path.join(OUT, file);

/* ---------- logos: gold artwork on near-black JPG → transparent WebP ---------- */

/**
 * The gold is saturated (R well above B) while the background and its paper texture
 * are neutral grey, so chroma keys the texture out cleanly; brightness catches the
 * few highlights that are close to white. Colour is un-mixed from the background so
 * anti-aliased edges don't keep a dark fringe.
 */
async function keyGold(file, box) {
  const { data, info } = await sharp(file).extract(box).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  const BG = 18;
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const chroma = Math.min(1, Math.max(0, (r - b - 12) / 70));
    const bright = Math.min(1, Math.max(0, (Math.max(r, g, b) - 70) / 150));
    const a = Math.max(chroma, bright);
    const unmix = (c) => (a > 0.02 ? Math.min(255, Math.max(0, (c - BG * (1 - a)) / a)) : 0);
    out[j] = unmix(r);
    out[j + 1] = unmix(g);
    out[j + 2] = unmix(b);
    out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}
const pad = (b, p) => ({ left: b.left - p, top: b.top - p, width: b.width + 2 * p, height: b.height + 2 * p });

const LOCKUP = src(/^logo lockup/i);
const STACKED = src(/^logo mark/i);
// artwork bounds, measured on the 2048² sources
const lockupBox = pad({ left: 267, top: 767, width: 1515, height: 514 }, 16);
const stackedBox = pad({ left: 475, top: 463, width: 1099, height: 1121 }, 16);
const markBox = { left: 625 - 40, top: 463 - 58, width: 798 + 80, height: 762 + 116 }; // squared up, V + clef only

await write((await keyGold(LOCKUP, lockupBox)).resize({ width: 1200 }).webp({ quality: 90, alphaQuality: 100 }), webp('brand/logo-lockup.webp'));
await write((await keyGold(STACKED, stackedBox)).resize({ width: 900 }).webp({ quality: 90, alphaQuality: 100 }), webp('brand/logo-stacked.webp'));
const mark = await (await keyGold(STACKED, markBox)).resize(512, 512).png().toBuffer();
await write(sharp(mark).webp({ quality: 90, alphaQuality: 100 }), webp('brand/logo-mark.webp'));

// favicon + touch icon: the mark on ink, with breathing room
for (const [size, name] of [[512, 'icon.png'], [180, 'apple-icon.png']]) {
  const inner = Math.round(size * 0.78);
  const glyph = await sharp(mark).resize(inner, inner).toBuffer();
  await write(
    sharp({ create: { width: size, height: size, channels: 4, background: { ...INK, alpha: 1 } } })
      .composite([{ input: glyph, gravity: 'center' }])
      .png(),
    path.join(APP, name),
  );
}

/* ---------- banner ---------- */

const BANNER = src(/banner/i);
await write(sharp(BANNER).resize({ width: 1600 }).webp(WEBP), webp('brand/banner.webp'));
// social card: centre 1.9:1 slice keeps the wordmark and both gold swirls
await write(
  sharp(BANNER).extract({ left: 304, top: 0, width: 2560, height: 1344 }).resize(1200, 630).jpeg({ quality: 84, mozjpeg: true }),
  path.join(APP, 'opengraph-image.jpg'),
);
// the lounge to the left of the wordmark, no text: a portrait hero slide
await write(sharp(BANNER).extract({ left: 0, top: 0, width: 1008, height: 1344 }).webp(WEBP), webp('atmosphere/lounge.webp'));

/* ---------- event posters: keep the artists, drop other venues' dates, logos and sponsors ---------- */

const POSTERS = [
  // grey mat, "Kraków Live Festival 2017", the date and the venue line go
  { file: src(/^travis scott/i), box: { left: 131, top: 215, width: 474, height: 474 }, out: 'utopia-nights' },
  // "OAKA Oct. 29", the anniversary badge, Coca-Cola and the sponsor strip go
  { file: src(/^argyros-50-cent/i), box: { left: 0, top: 219, width: 650, height: 481 }, out: 'nyc-to-athens' },
  // the NUMA Halkidiki logo and the date/support-act lines go; the gold LIGHT stays
  { file: src(/^light poster/i), box: { left: 95, top: 128, width: 450, height: 427 }, out: 'heavyweight-icon' },
];
for (const p of POSTERS) {
  await write(sharp(p.file).extract(p.box).webp({ quality: 86, effort: 6 }), webp(`events/${p.out}.webp`));
}

/* ---------- food & venue photos ---------- */

const PHOTOS = [
  { file: src(/steak/i), out: 'steak', storyX: 0.51 },
  // not "Instagram - Shrimp Cocteil"
  { file: src(/^instagram - cocteil/i), out: 'cocktail', storyX: 0.55 },
  { file: src(/shrimp/i), out: 'sunset-dinner' },
  { file: src(/burger/i), out: 'burger' },
  { file: src(/pizza/i), out: 'pizza' },
  { file: src(/wine/i), out: 'late-night' },
  { file: src(/table pasta/i), out: 'table' },
];

for (const p of PHOTOS) {
  await write(
    sharp(p.file).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp(WEBP),
    webp(`food/${p.out}.webp`),
  );
}

/* ---------- stories: 9:16 ---------- */

/** Already-9:16 phone shots are only trimmed to exact 9:16 (no upscaling); 4:5 shots are cropped around the subject. */
async function storyFromPhoto(file, x = 0.5) {
  const img = sharp(file).rotate();
  const { width, height } = await img.metadata();
  const w = Math.min(width, Math.round((height * 9) / 16));
  const h = Math.min(height, Math.round((w * 16) / 9));
  const left = Math.round(Math.min(width - w, Math.max(0, x * width - w / 2)));
  const top = Math.round((height - h) / 2);
  return img.extract({ left, top, width: w, height: h }).resize({ width: 1080, height: 1920, withoutEnlargement: true });
}

/** Posters sit on a blurred, darkened copy of themselves, the way a flyer is reposted to a story. */
async function storyFromPoster(poster) {
  const cropped = await sharp(poster.file).extract(poster.box).toBuffer();
  const bg = await sharp(cropped).resize(1080, 1920, { fit: 'cover' }).blur(70).modulate({ brightness: 0.32 }).toBuffer();
  const front = await sharp(cropped).resize({ width: 960 }).toBuffer();
  const { height } = await sharp(front).metadata();
  return sharp(bg).composite([{ input: front, left: 60, top: Math.round((1920 - height) / 2) }]);
}

const photo = Object.fromEntries(PHOTOS.map((p) => [p.out, p]));
const poster = Object.fromEntries(POSTERS.map((p) => [p.out, p]));
const STORIES = [
  ['story-1', () => storyFromPoster(poster['utopia-nights'])],
  ['story-2', () => storyFromPhoto(photo.steak.file, photo.steak.storyX)],
  ['story-3', () => storyFromPhoto(photo.cocktail.file, photo.cocktail.storyX)],
  ['story-4', () => storyFromPoster(poster['nyc-to-athens'])],
  ['story-5', () => storyFromPhoto(photo['sunset-dinner'].file)],
  ['story-6', () => storyFromPhoto(photo.pizza.file)],
  ['story-7', () => storyFromPoster(poster['heavyweight-icon'])],
  ['story-8', () => storyFromPhoto(photo['late-night'].file)],
  ['story-9', () => storyFromPhoto(photo.burger.file)],
];
for (const [name, make] of STORIES) {
  await write((await make()).webp(WEBP), webp(`stories/${name}.webp`));
}

/* ---------- optional: AI-generated venue shots, if they have been added to Media ---------- */

for (const [pattern, out] of [[/^ai - stage/i, 'live-stage'], [/^ai - booth/i, 'velvet-booth']]) {
  const hit = files.find((f) => pattern.test(f));
  if (hit) {
    await write(
      sharp(path.join(MEDIA, hit)).resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp(WEBP),
      webp(`atmosphere/${out}.webp`),
    );
  }
}
