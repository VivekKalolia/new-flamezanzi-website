import fs from "node:fs";
import path from "node:path";

import { treatsCafeGallery } from "./stock-images";

type Region = "Tanzania" | "Zanzibar";

export type GalleryImageItem = {
  ventureSlug: string;
  ventureName: string;
  region: Region;
  image: string;
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function listPublicImages(relativeDirectory: string) {
  const absoluteDirectory = path.join(process.cwd(), "public", relativeDirectory);
  if (!fs.existsSync(absoluteDirectory)) {
    return [] as string[];
  }

  const files = fs.readdirSync(absoluteDirectory);
  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/${relativeDirectory.replace(/\\/g, "/")}/${file}`);
}

// All galleries now point to optimised WebP copies
const flamesImages = listPublicImages("images/optimized/flames");
const silkRouteImages = listPublicImages("images/optimized/silk-route");
const aqueliaImages = listPublicImages("images/optimized/aquelia");

/** Match `site-data` venture `images.hero` so folder scans list the main shot first. */
const FLAMES_MAIN = "/images/optimized/flames/HNK08116(1).webp";
const SILK_MAIN = "/images/optimized/silk-route/HNK08758.webp";
const AQUELIA_MAIN = "/images/optimized/aquelia/HNK08486.webp";

function withMainImageFirst(images: string[], mainPath: string) {
  const rest = images.filter((src) => src !== mainPath);
  return [mainPath, ...rest];
}

const treatsImages = [...treatsCafeGallery];

export function getVentureGalleryImages(slug: string, fallback: string[]) {
  if (slug === "flames-restaurant") {
    return flamesImages.length ? withMainImageFirst(flamesImages, FLAMES_MAIN) : fallback;
  }
  if (slug === "silk-route") {
    return silkRouteImages.length ? withMainImageFirst(silkRouteImages, SILK_MAIN) : fallback;
  }
  if (slug === "treats-cafe") {
    return treatsImages;
  }
  if (slug === "aquelia-rose") {
    return aqueliaImages.length ? withMainImageFirst(aqueliaImages, AQUELIA_MAIN) : fallback;
  }
  return fallback;
}

export function getPortfolioGalleryItems(): GalleryImageItem[] {
  const flamesOrdered = flamesImages.length ? withMainImageFirst(flamesImages, FLAMES_MAIN) : [];
  const silkOrdered = silkRouteImages.length ? withMainImageFirst(silkRouteImages, SILK_MAIN) : [];
  const aqueliaOrdered = aqueliaImages.length ? withMainImageFirst(aqueliaImages, AQUELIA_MAIN) : [];

  return [
    ...flamesOrdered.map((image) => ({
      ventureSlug: "flames-restaurant",
      ventureName: "Flames Restaurant",
      region: "Tanzania" as const,
      image,
    })),
    ...treatsImages.map((image) => ({
      ventureSlug: "treats-cafe",
      ventureName: "Treats Cafe & Bakery",
      region: "Tanzania" as const,
      image,
    })),
    ...silkOrdered.map((image) => ({
      ventureSlug: "silk-route",
      ventureName: "The Silk Route Restaurant",
      region: "Zanzibar" as const,
      image,
    })),
    ...aqueliaOrdered.map((image) => ({
      ventureSlug: "aquelia-rose",
      ventureName: "Aquelia Rose Hotel",
      region: "Zanzibar" as const,
      image,
    })),
  ];
}
