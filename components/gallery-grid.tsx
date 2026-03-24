"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { GalleryImageItem } from "@/lib/local-gallery";

function shuffle<T>(source: T[]) {
  const array = [...source];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

type Props = {
  items: GalleryImageItem[];
};

export function GalleryGrid({ items }: Props) {
  const [filter, setFilter] = useState("all");
  const [region, setRegion] = useState<"all" | "TZ" | "ZNZ">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [randomized] = useState<GalleryImageItem[]>(() => shuffle(items));

  const ventures = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of randomized) {
      if (!map.has(item.ventureSlug)) {
        map.set(item.ventureSlug, item.ventureName);
      }
    }
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [randomized]);

  const filtered = useMemo(() => {
    return randomized.filter((item) => {
      const ventureMatch = filter === "all" || item.ventureSlug === filter;
      const regionMatch = region === "all" || item.region === region;
      return ventureMatch && regionMatch;
    });
  }, [filter, randomized, region]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) {
        return;
      }
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) {
            return 0;
          }
          return (current + 1) % filtered.length;
        });
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) {
            return 0;
          }
          return (current - 1 + filtered.length) % filtered.length;
        });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, filtered.length]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "TZ", "ZNZ"] as const).map((regionItem) => (
          <button
            key={regionItem}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm ${
              region === regionItem
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border"
            }`}
            onClick={() => setRegion(regionItem)}
          >
            {regionItem}
          </button>
        ))}

        <span className="mx-1 h-5 w-px bg-border" />

        <button
          type="button"
          className={`rounded-full border px-4 py-2 text-sm ${
            filter === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        {ventures.map((venture) => (
          <button
            key={venture.slug}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm ${
              filter === venture.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border"
            }`}
            onClick={() => setFilter(venture.slug)}
          >
            {venture.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border/70 p-8 text-muted-foreground">
          No images found for this filter.
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <button
              key={`${item.image}-${index}`}
              type="button"
              className="group relative mb-4 w-full overflow-hidden rounded-2xl border border-border/70 text-left"
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={item.image}
                alt={item.ventureName}
                width={900}
                height={900}
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute right-3 bottom-3 rounded bg-black/50 px-2 py-1 text-xs text-white">
                {item.ventureName}
              </span>
            </button>
          ))}
        </div>
      )}

      {activeIndex !== null && filtered[activeIndex] ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 rounded-full border border-white/30 p-2 text-white"
          >
            <X className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((current) => ((current ?? 0) - 1 + filtered.length) % filtered.length)}
            className="absolute left-4 rounded-full border border-white/30 p-2 text-white"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-xl border border-white/20">
            <Image
              src={filtered[activeIndex].image}
              alt={filtered[activeIndex].ventureName}
              fill
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((current) => ((current ?? 0) + 1) % filtered.length)}
            className="absolute right-4 rounded-full border border-white/30 p-2 text-white"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
