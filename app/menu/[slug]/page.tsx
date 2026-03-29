import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { MenuExperience } from "@/components/menu-experience";
import { getVentureBySlug, menus, ventures } from "@/lib/site-data";

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
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
          <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background/90 p-2 shadow-sm md:size-18">
            <Image
              src={venture.logo}
              alt={`${venture.name} logo`}
              width={88}
              height={88}
              className="h-full w-full rounded-full object-cover"
              unoptimized
            />
          </div>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{venture.name}</p>
          <h1 className="mt-3 font-heading text-5xl">Interactive Menu</h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            Search items, apply dietary filters, build your cart, and place your order on WhatsApp.
          </p>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <MenuExperience venture={venture} categories={menu.categories} />
      </section>
    </main>
  );
}
