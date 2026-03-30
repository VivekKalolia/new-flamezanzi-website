import type { Metadata } from "next";

import { GalleryGrid } from "@/components/gallery-grid";
import { getPortfolioGalleryItems } from "@/lib/local-gallery";

export const metadata: Metadata = {
  title: "Gallery | FlameZanzi",
  description: "Explore FlameZanzi venue moments and hospitality visuals.",
};

export default function GalleryPage() {
  const items = getPortfolioGalleryItems();

  return (
    <main className="bg-background text-foreground">
      <section className="page-section border-b border-border/70 bg-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Gallery
          </p>
          <h1 className="mt-3 font-heading text-5xl">
            Visual Stories from Our Ventures
          </h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            Browse moments across our restaurants, cafe, and hotel portfolio.
          </p>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <GalleryGrid items={items} />
      </section>
    </main>
  );
}
