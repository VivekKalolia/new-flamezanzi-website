/**
 * Optimize food portfolio JPGs → WebP at 4:5 (960×1200 cover).
 * Sources: public/images/food pics/<venue>/*.jpg
 * Output: public/images/optimized/food-pics/*.webp
 * Manifest: lib/food-picture-manifest.json (for Next.js import)
 */

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicRoot = path.join(process.cwd(), "public");
const inputRoot = path.join(publicRoot, "images/food pics");
const outDir = path.join(publicRoot, "images/optimized/food-pics");
const manifestPath = path.join(process.cwd(), "lib/food-picture-manifest.json");

const WIDTH = 960;
const HEIGHT = 1200; /* 960:1200 = 4:5 */

function safeBase(name, extLen) {
  const base = name.slice(0, -extLen);
  return base
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function collectImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  /** @type {string[]} */
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await collectImages(p)));
    } else if (/\.(jpe?g|png)$/i.test(e.name)) {
      files.push(p);
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

function venueLabel(folder) {
  const map = {
    aquelia: "Aquelia Rose",
    flames: "Flames Restaurant",
    "silk-route": "The Silk Route",
  };
  return map[folder] ?? folder;
}

const files = await collectImages(inputRoot);
if (files.length === 0) {
  console.warn("No images under", inputRoot);
  process.exit(0);
}

await fs.mkdir(outDir, { recursive: true });

/** @type {{ src: string; alt: string }[]} */
const slides = [];

for (const abs of files) {
  const relFromFood = path.relative(inputRoot, abs);
  const folder = relFromFood.split(path.sep)[0];
  const file = path.basename(abs);
  const ext = path.extname(file);
  const base = safeBase(file, ext.length);
  const outName = `${folder}-${base}.webp`;
  const outAbs = path.join(outDir, outName);

  await sharp(abs)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .webp({ quality: 82, effort: 5 })
    .toFile(outAbs);

  const src = `/images/optimized/food-pics/${outName}`;
  const label = venueLabel(folder);
  slides.push({
    src,
    alt: `${label}, Flamezanzi food`,
  });
  console.log("wrote", path.relative(process.cwd(), outAbs));
}

await fs.writeFile(
  manifestPath,
  `${JSON.stringify({ slides }, null, 2)}\n`,
  "utf8",
);
console.log("wrote", path.relative(process.cwd(), manifestPath), `(${slides.length} slides)`);
