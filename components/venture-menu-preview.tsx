import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { MENU_ITEM_PLACEHOLDER_IMAGE, type MenuCategory } from "@/lib/site-data";

function sampleMenuTiles(categories: MenuCategory[], limit: number) {
  const out: { category: string; name: string; description: string; price: number; image?: string }[] = [];
  for (const cat of categories) {
    for (const item of cat.items) {
      if (out.length >= limit) return out;
      out.push({
        category: cat.name,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
      });
    }
  }
  return out;
}

type Props = {
  ventureSlug: string;
  ventureName: string;
  categories: MenuCategory[];
};

/**
 * Lightweight menu demo on `/ventures/[slug]` with a deep link to the full interactive menu.
 */
export function VentureMenuPreview({ ventureSlug, ventureName, categories }: Props) {
  const tiles = sampleMenuTiles(categories, 6);

  return (
    <section
      id="venture-menu-preview"
      className="page-section border-b border-border/70 bg-card py-14 md:py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Taste of the venue
            </p>
            <h2 className="font-heading text-3xl md:text-4xl">From our menu</h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Preview a handful of plates from {ventureName}. Open the interactive menu for every
              category, dietary filters, and WhatsApp checkout.
            </p>
          </div>
          <Link
            href={`/menu/${ventureSlug}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/92"
          >
            View full menu <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <Separator className="my-8 bg-border/80" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <div
              key={`${tile.category}-${tile.name}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={tile.image ?? MENU_ITEM_PLACEHOLDER_IMAGE}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                <p className="text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {tile.category}
                </p>
                <p className="font-heading text-lg leading-snug">{tile.name}</p>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {tile.description}
                </p>
                <p className="mt-auto pt-2 text-lg font-semibold text-primary tabular-nums">
                  TZS {Math.round(tile.price).toLocaleString("en-US")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground md:text-left">
          Full menu includes search, veg / non-veg filters, cart, delivery or pickup.{" "}
          <Link href={`/menu/${ventureSlug}`} className="font-medium text-primary underline-offset-4 hover:underline">
            Open interactive menu
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
