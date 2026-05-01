"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { VentureTypeBadge } from "@/components/venture-type-badge";
import type { Venture } from "@/lib/site-data";

type Props = {
  ventures: Venture[];
};

/**
 * "Discover Our Other Experiences" cross-promotion carousel.
 * Horizontal snap scroll + arrow controls for desktop.
 */
export function OtherExperiencesCarousel({ ventures }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    const handler = () => updateScrollState();
    el.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      el.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [updateScrollState]);

  function scrollByDirection(direction: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-experience-card]");
    const cardWidth = card?.offsetWidth ?? el.clientWidth * 0.8;
    const gap = 20;
    const delta = (cardWidth + gap) * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section className="page-section bg-secondary/35 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              The FlameZanzi family
            </p>
            <h2 className="font-heading text-3xl md:text-4xl">
              Discover our other experiences
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              From a Stone Town rooftop fusion restaurant to a beachfront boutique hotel
              in Jambiani. Every venue carries the same standard of hospitality you find
              at Flames.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByDirection("left")}
              disabled={!canScrollLeft}
              className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-card text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-40 disabled:hover:bg-card"
              aria-label="Previous experience"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByDirection("right")}
              disabled={!canScrollRight}
              className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-card text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-40 disabled:hover:bg-card"
              aria-label="Next experience"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative -mx-6 px-6 sm:mx-0 sm:px-0">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ventures.map((venture) => (
              <article
                key={venture.slug}
                data-experience-card
                className="group relative flex w-[85%] shrink-0 snap-start overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 sm:w-[58%] md:w-[44%] lg:w-[38%]"
              >
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="flex w-full flex-col"
                  aria-label={`View ${venture.name}`}
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={venture.images.hero}
                      alt={venture.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 44vw, 38vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <VentureTypeBadge type={venture.type} accentColor={venture.color} />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background/90 p-1.5 shadow-sm">
                        <Image
                          src={venture.logo}
                          alt={`${venture.name} logo`}
                          width={72}
                          height={72}
                          className="h-full w-full rounded-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {venture.area}, {venture.city}
                      </div>
                    </div>
                    <p className="font-heading text-2xl leading-tight">{venture.name}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {venture.shortDescription}
                    </p>
                    <p className="mt-auto inline-flex items-center gap-1 self-start text-sm font-semibold text-primary">
                      Explore venue <ArrowUpRight className="size-4" />
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
