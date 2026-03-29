"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

function Lightbox({
  items,
  activeIndex,
  onClose,
  onNav,
}: {
  items: GalleryImageItem[];
  activeIndex: number;
  onClose: () => void;
  onNav: (index: number) => void;
}) {
  const item = items[activeIndex];
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft") onNav((activeIndex - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length, onClose, onNav]);

  if (!item) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
      style={{ margin: 0, padding: 0 }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X className="size-5" />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={() => onNav((activeIndex - 1 + items.length) % items.length)}
        className="absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition-colors hover:bg-white/20"
        aria-label="Previous"
      >
        <ChevronLeft className="size-6" />
      </button>

      {/* Image */}
      <div className="flex h-full w-full items-center justify-center p-16">
        <div className="relative h-full w-full">
          <Image
            src={item.image}
            alt={item.ventureName}
            fill
            className="rounded-xl object-contain shadow-2xl"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-1.5 text-sm text-white/90 backdrop-blur">
        {item.ventureName} — {activeIndex + 1} / {items.length}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => onNav((activeIndex + 1) % items.length)}
        className="absolute right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition-colors hover:bg-white/20"
        aria-label="Next"
      >
        <ChevronRight className="size-6" />
      </button>
    </div>,
    document.body,
  );
}

export function GalleryGrid({ items }: Props) {
  const [filter, setFilter] = useState("all");
  const [region, setRegion] = useState<"all" | "Tanzania" | "Zanzibar">("all");
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

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "Tanzania", "Zanzibar"] as const).map((regionItem) => (
          <button
            key={regionItem}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              region === regionItem
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setRegion(regionItem)}
          >
            {regionItem === "all" ? "All Regions" : regionItem}
          </button>
        ))}

        <span className="mx-1 h-5 w-px bg-border" />

        <button
          type="button"
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            filter === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"
          }`}
          onClick={() => setFilter("all")}
        >
          All Venues
        </button>
        {ventures.map((venture) => (
          <button
            key={venture.slug}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === venture.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary/50"
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
              className="group relative mb-4 w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border/70 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={item.image}
                alt={item.ventureName}
                width={900}
                height={900}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              <span className="absolute right-3 bottom-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {item.ventureName}
              </span>
            </button>
          ))}
        </div>
      )}

      {activeIndex !== null && (
        <Lightbox
          items={filtered}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNav={setActiveIndex}
        />
      )}
    </div>
  );
}
