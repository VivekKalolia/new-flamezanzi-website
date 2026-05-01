import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { flamesContent } from "@/lib/site-data";

type Props = {
  dishes: typeof flamesContent.signatureDishes;
  /** In-page anchor for the categories / search / cart block (same page). */
  fullMenuAnchorId?: string;
};

function formatTzs(amount: number) {
  return `TZS ${Math.round(amount).toLocaleString("en-US")}`;
}

/**
 * Photo-led signature dishes on the interactive menu page above
 * categories, search, filters, and cart.
 */
export function FlamesSignatureDishes({
  dishes,
  fullMenuAnchorId = "menu-experience-top",
}: Props) {
  return (
    <section className="page-section mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Signature dishes
          </p>
          <h2 className="font-heading text-3xl md:text-4xl">Most-loved plates at Flames</h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Start here for highlights with photos, then scroll to search every dish, filter by
            diet, add to cart, and send your order on WhatsApp.
          </p>
        </div>
        <a
          href={`#${fullMenuAnchorId}`}
          className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-lg border border-border bg-background px-5 text-sm font-semibold shadow-sm transition-colors hover:bg-muted md:self-auto"
        >
          Browse full menu <ArrowRight className="size-4" />
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <article
            key={dish.name}
            className="group reveal flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
          >
            <div className="relative aspect-5/4 overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {dish.badge ? (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                  <Sparkles className="size-3" strokeWidth={2} aria-hidden />
                  {dish.badge}
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-tight">{dish.name}</h3>
                <p className="shrink-0 text-base font-semibold text-primary tabular-nums">
                  {formatTzs(dish.price)}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{dish.description}</p>
              {dish.tags?.length ? (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {dish.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-background text-[10px] font-normal capitalize"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
