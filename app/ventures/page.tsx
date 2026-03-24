import type { Metadata } from "next";
import Image from "next/image";

import { VenturesDirectory } from "@/components/ventures-directory";
import { ventures } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Ventures | FlameZanzi",
  description: "Explore all FlameZanzi ventures across Tanzania and Zanzibar.",
};

export default function VenturesPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="page-section border-b border-border/70 bg-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Our Ventures</p>
          <h1 className="mt-3 font-heading text-5xl">Portfolio of Premium Venues</h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            Discover our restaurants, cafe, and hotel concepts across Dar es Salaam and Zanzibar.
          </p>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-border/70">
          <Image
            src="/images/optimized/venture-treats.jpg"
            alt="FlameZanzi ventures collage"
            width={1400}
            height={520}
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/65 to-black/20" />
          <div className="absolute inset-0 flex items-end p-8 md:p-10">
            <p className="max-w-2xl font-heading text-3xl text-white">
              Four distinct hospitality brands. One disciplined standard of premium service.
            </p>
          </div>
        </div>
        <VenturesDirectory ventures={ventures} />
      </section>
    </main>
  );
}
