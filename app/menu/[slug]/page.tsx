import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { FlamesSignatureDishes } from "@/components/flames-signature-dishes";
import { MenuExperience } from "@/components/menu-experience";
import { MenuVenueMeta } from "@/components/menu-venue-meta";
import { flamesContent, getVentureBySlug, menus, ventures } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);
  if (!venture) {
    return { title: "Menu Not Found | FlameZanzi" };
  }
  return {
    title: `${venture.name} Menu | FlameZanzi`,
    description: `Explore the interactive menu for ${venture.name}.`,
  };
}

export default async function MenuPage({ params }: Props) {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);
  const menu = menus[slug];

  if (!venture || !menu) {
    notFound();
  }

  return (
    <main className="bg-background text-foreground">
      <section className="page-section border-b border-border/70 bg-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex size-22 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border/70 bg-background/90 p-2.5 shadow-sm sm:size-24 md:size-28 md:p-3">
              <Image
                src={venture.logo}
                alt={`${venture.name} logo`}
                width={120}
                height={120}
                className="h-full w-full rounded-full object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1 space-y-3 pt-0.5">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {venture.name}
              </p>
              <h1 className="font-heading text-4xl leading-tight md:text-5xl">
                Interactive Menu
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Search items, apply dietary filters, build your cart, and place
                your order on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {slug === "flames-restaurant" ? (
        <FlamesSignatureDishes dishes={flamesContent.signatureDishes} />
      ) : null}

      <section
        id="menu-experience-top"
        className="page-section mx-auto w-full max-w-6xl scroll-mt-28 px-6 pt-8 pb-28 md:scroll-mt-32 md:pt-10 md:pb-32"
      >
        <MenuExperience key={venture.slug} venture={venture} categories={menu.categories} />
      </section>

      <section className="page-section border-t border-border/70 bg-secondary/25 py-14 md:py-20 lg:hidden">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Venue details
          </p>
          <MenuVenueMeta venture={venture} />
        </div>
      </section>
    </main>
  );
}
