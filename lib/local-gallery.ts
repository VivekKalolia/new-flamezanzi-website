import fs from "node:fs";
import path from "node:path";

type Region = "TZ" | "ZNZ";

export type GalleryImageItem = {
  ventureSlug: string;
  ventureName: string;
  region: Region;
  image: string;
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function toPublicUrl(relativePath: string) {
  return `/${relativePath
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function listPublicImages(relativeDirectory: string) {
  const absoluteDirectory = path.join(process.cwd(), "public", relativeDirectory);
  if (!fs.existsSync(absoluteDirectory)) {
    return [] as string[];
  }

  const files = fs.readdirSync(absoluteDirectory);
  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => toPublicUrl(path.join(relativeDirectory, file)));
}

const flamesImages = listPublicImages(path.join("images", "flames"));
const silkRouteImages = listPublicImages(path.join("images", "silk route"));

const treatsImages = [
  "/images/optimized/venture-treats.jpg",
  "/images/corporate-reference-2.png",
  "/images/optimized/about-mission.jpg",
];

const aqueliaImages = [
  "/images/optimized/venture-hotel.jpg",
  "/images/optimized/team-corporate.jpg",
  "/images/corporate-reference-1.png",
];

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
    return aqueliaImages;
  }
  return fallback;
}

export function getPortfolioGalleryItems(): GalleryImageItem[] {
  return [
    ...flamesImages.map((image) => ({
      ventureSlug: "flames-restaurant",
      ventureName: "Flames Restaurant",
      region: "TZ" as const,
      image,
    })),
    ...treatsImages.map((image) => ({
      ventureSlug: "treats-cafe",
      ventureName: "Treats Cafe & Bakery",
      region: "TZ" as const,
      image,
    })),
    ...silkRouteImages.map((image) => ({
      ventureSlug: "silk-route",
      ventureName: "The Silk Route Restaurant",
      region: "ZNZ" as const,
      image,
    })),
    ...aqueliaImages.map((image) => ({
      ventureSlug: "aquelia-rose",
      ventureName: "Aquelia Rose Hotel",
      region: "ZNZ" as const,
      image,
    })),
  ];
}
