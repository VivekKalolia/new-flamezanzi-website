import manifest from "@/lib/food-picture-manifest.json";

export type FoodPictureSlide = (typeof manifest.slides)[number];

/** Optimized 4:5 food photography for full-bleed ribbon / marquee sections. */
export const foodPictureSlides: FoodPictureSlide[] = manifest.slides;
