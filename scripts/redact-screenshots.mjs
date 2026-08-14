/**
 * Redact client branding from the project screenshots.
 *
 * The written project copy anonymises every client ("a regional property
 * group", "a hospitality group", "an agricultural agency") and the KAI system
 * prompt refuses to name them, but the screenshots showed the real logos and
 * wordmarks at full legibility. This blurs those regions so the screenshots
 * agree with the copy, while leaving the layout, flows and craft fully visible.
 *
 *   node scripts/redact-screenshots.mjs          # redact anything not yet done
 *   node scripts/redact-screenshots.mjs --force  # redo, reading from --from
 *   node scripts/redact-screenshots.mjs --from <dir>
 *
 * Regions are in the 640px-wide coordinate space the optimiser outputs, as
 * [left, top, width, height]. If the screenshots are ever replaced, delete
 * scripts/.redacted.json and re-measure — the coordinates are per-image and
 * will not survive a different capture.
 */

import { readFile, writeFile, readdir, copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECTS_DIR = join(ROOT, "src/assets/projects");
const MARKER = join(ROOT, "scripts/.redacted.json");

/** Blur strength. High enough that no wordmark survives a zoom. */
const SIGMA = 22;

const REGIONS = {
  // "iReserb" mark and wordmark in the app header.
  "service-booking/01.webp": [[10, 94, 210, 68]],

  // "ALFARDAN Living / Privilege Programme" lockup, centred in the header.
  "resident-services/01.webp": [[192, 74, 262, 88]],

  // Same header lockup, plus the "Alfardan Properties" hero banner. The banner
  // runs to the image's right edge and its Arabic wordmark sits further left
  // than the Latin one, so this starts at 376 rather than at the panel edge.
  "resident-services/02.webp": [
    [192, 74, 262, 88],
    [376, 176, 264, 194],
  ],

  // Surgical rather than banded: the header lockup, the member name in the
  // greeting and again on the card, and the one privilege tile that names the
  // group. Blurring whole rows here read as damage rather than redaction.
  "membership-privileges/01.webp": [
    [4, 96, 240, 90],
    [176, 210, 320, 42],
    [50, 426, 340, 38],
    [244, 742, 160, 36],
  ],

  // "MISBuff" wordmark plus its "Management Information System for Buffaloes"
  // strapline, which identifies the programme.
  "herd-management/01.webp": [[10, 84, 250, 84]],

  // quorfin/* is KC's own product and is named deliberately. Not redacted.
};

async function loadMarker() {
  if (!existsSync(MARKER)) return {};
  try {
    return JSON.parse(await readFile(MARKER, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  const force = process.argv.includes("--force");
  const fromIdx = process.argv.indexOf("--from");
  const fromDir = fromIdx !== -1 ? process.argv[fromIdx + 1] : null;

  const done = force ? {} : await loadMarker();
  const marker = { ...done };
  let changed = 0;

  for (const [key, regions] of Object.entries(REGIONS)) {
    if (done[key] && !force) {
      console.log(`  skip ${key} (already redacted)`);
      continue;
    }

    const dest = join(PROJECTS_DIR, key);
    // Redacting an already-redacted file would blur the blur. When redoing,
    // read from a pristine copy instead.
    const src = fromDir ? join(fromDir, key) : dest;
    if (!existsSync(src)) {
      console.log(`  MISSING ${src}`);
      continue;
    }

    const base = sharp(src);
    const { width, height } = await base.metadata();

    const patches = [];
    for (const [left, top, w, h] of regions) {
      // Clamp so a stale coordinate can't throw on a differently sized capture.
      const L = Math.max(0, Math.min(left, width - 1));
      const T = Math.max(0, Math.min(top, height - 1));
      const W = Math.min(w, width - L);
      const H = Math.min(h, height - T);
      if (W <= 0 || H <= 0) continue;

      const patch = await sharp(src)
        .extract({ left: L, top: T, width: W, height: H })
        .blur(SIGMA)
        .toBuffer();
      patches.push({ input: patch, left: L, top: T });
    }

    const out = await sharp(src).composite(patches).webp({ quality: 82 }).toBuffer();
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, out);
    marker[key] = { regions: regions.length, at: new Date().toISOString() };
    changed++;
    console.log(`  redacted ${key}  (${patches.length} region(s))`);
  }

  await writeFile(MARKER, `${JSON.stringify(marker, null, 2)}\n`);
  console.log(`\n${changed} file(s) redacted. Marker: scripts/.redacted.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
