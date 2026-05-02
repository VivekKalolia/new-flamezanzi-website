import type { Metadata } from "next";

import { VenturesDirectory } from "@/components/ventures-directory";
import { BRAND_WORDMARK, ventures } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Our Ventures | ${BRAND_WORDMARK}`,
  description: `Explore all ${BRAND_WORDMARK} ventures across Tanzania and Zanzibar.`,
};

export default function VenturesPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="page-section border-b border-border/70 bg-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Our Ventures
          </p>
          <h1 className="mt-3 max-w-2xl font-heading text-4xl leading-tight md:text-6xl">
            Portfolio of Premium Venues
          </h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            Discover our restaurants, cafe, and hotel concepts across Dar es
            Salaam and Zanzibar.
          </p>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 pt-12 pb-20 md:pt-16 md:pb-24">
        <VenturesDirectory ventures={ventures} />
      </section>
    </main>
  );
}
