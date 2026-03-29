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

const treatsImages = [...treatsCafeGallery];

export function getVentureGalleryImages(slug: string, fallback: string[]) {
  if (slug === "flames-restaurant") {
    return flamesImages.length ? flamesImages : fallback;
  }
  if (slug === "silk-route") {
    return silkRouteImages.length ? silkRouteImages : fallback;
  }
  if (slug === "treats-cafe") {
    return treatsImages;
  }
  if (slug === "aquelia-rose") {
    return aqueliaImages.length ? aqueliaImages : fallback;
  }
  return fallback;
}

export function getPortfolioGalleryItems(): GalleryImageItem[] {
  return [
    ...flamesImages.map((image) => ({
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
    ...silkRouteImages.map((image) => ({
      ventureSlug: "silk-route",
      ventureName: "The Silk Route Restaurant",
      region: "Zanzibar" as const,
      image,
    })),
    ...aqueliaImages.map((image) => ({
      ventureSlug: "aquelia-rose",
      ventureName: "Aquelia Rose Hotel",
      region: "Zanzibar" as const,
      image,
    })),
  ];
}
