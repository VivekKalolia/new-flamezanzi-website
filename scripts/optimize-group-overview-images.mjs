import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public/images");
const outDir = path.join(publicDir, "optimized/group-overview");

await fs.mkdir(outDir, { recursive: true });

/** Slideshow sources under `public/images/` */
const slideshow = [
  "HNK08106.JPG",
  "HNK08561.JPG",
  "HNK08109.JPG",
  "HNK08536.JPG",
  "HNK08537.JPG",
  "HNK08540.JPG",
  "HNK08546.JPG",
  "HNK08550.JPG",
];

async function toWebpSlideshow(filename) {
  const input = path.join(publicDir, filename);
  const base = path.basename(filename, path.extname(filename));
  const output = path.join(outDir, `${base}.webp`);
  await sharp(input)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(output);
  console.log("wrote", path.relative(process.cwd(), output));
}

for (const file of slideshow) {
  await toWebpSlideshow(file);
}
