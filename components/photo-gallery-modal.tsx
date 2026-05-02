"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

import type { GalleryImageItem } from "@/lib/local-gallery";
import { cn } from "@/lib/utils";

type Props = {
  items: GalleryImageItem[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

/**
 * Reference-style gallery (portfolio example): muted backdrop + inset panel,
 * main stage + thumb strip + full-screen zoom. Theme-aligned, no animation deps.
 */
export function PhotoGalleryModal({ items, index: activeIndex, onClose, onNavigate }: Props) {
  const [mounted, setMounted] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const thumbScrollerRef = useRef<HTMLDivElement>(null);

  const item = items[activeIndex];
  const len = Math.max(items.length, 1);

  const wrap = (i: number) => ((i % len) + len) % len;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const el = thumbScrollerRef.current;
    if (!el) return;
    const btn = el.querySelector(`[data-thumb-index="${activeIndex}"]`);
    btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (zoomed) setZoomed(false);
        else onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const n = wrap(activeIndex + 1);
        onNavigate(n);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const n = wrap(activeIndex - 1);
        onNavigate(n);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, len, onClose, onNavigate, zoomed]);

  if (!mounted || !item || typeof document === "undefined") return null;

  const subtitle = `${item.region} · ${items.length} photos`;

  const portal = (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        className="fixed inset-0 z-[10050] min-h-[100dvh] bg-black/90"
        onClick={() => {
          if (zoomed) setZoomed(false);
          else onClose();
        }}
      />

      {/* Panel (reference: inset rounded shell) */}
      <div
        className={cn(
          "fixed inset-4 z-[10051] flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-2xl border border-white/12 bg-neutral-950 shadow-2xl sm:inset-6 sm:max-h-[calc(100dvh-3rem)] lg:inset-10",
          zoomed && "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={`Gallery: ${item.ventureName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-5 py-4 md:gap-6">
          <div className="min-w-0 flex-1 text-left">
            <h2 className="truncate font-heading text-base font-semibold text-white">{item.ventureName}</h2>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-xs text-white/50">
              <span className="min-w-0 truncate">{subtitle}</span>
              <span className="shrink-0 whitespace-nowrap text-white/45 tabular-nums">
                &nbsp;·&nbsp;
                {activeIndex + 1} / {items.length}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="relative flex flex-1 min-h-[44dvh] items-center justify-center overflow-hidden bg-black/50 md:min-h-[50dvh]">
          <button
            type="button"
            className="absolute inset-14 z-[5] cursor-zoom-in rounded-xl bg-transparent"
            aria-label="Enlarge photo"
            onClick={() => setZoomed(true)}
          />
          <Image
            src={item.image}
            alt={item.ventureName}
            fill
            className="pointer-events-none z-[1] object-contain p-10 md:p-14"
            sizes="(max-width: 1024px) 100vw, 85vw"
            priority
          />

          <div className="pointer-events-none absolute bottom-11 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1 text-xs text-white/75 md:bottom-16">
            {activeIndex + 1} / {items.length}
          </div>
          <div className="pointer-events-none absolute right-9 bottom-9 z-30 flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[11px] text-white/70 md:right-14 md:bottom-12">
            <ZoomIn className="size-3.5 shrink-0" aria-hidden />
            Tap to enlarge
          </div>

          <button
            type="button"
            className="absolute left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black/85 md:size-11"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(wrap(activeIndex - 1));
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-5 md:size-6" />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black/85 md:size-11"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(wrap(activeIndex + 1));
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="size-5 md:size-6" />
          </button>
        </div>

        <div className="shrink-0 overflow-x-auto border-t border-white/10 bg-black/30 px-4 py-3">
          <div ref={thumbScrollerRef} className="flex gap-2">
            {items.map((thumb, idx) => {
              const sel = idx === activeIndex;
              return (
                <button
                  key={`${thumb.image}-${idx}`}
                  type="button"
                  data-thumb-index={idx}
                  aria-label={`Go to photo ${idx + 1}`}
                  aria-current={sel ? "true" : undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(idx);
                  }}
                  className={cn(
                    "relative h-14 w-[5.05rem] shrink-0 overflow-hidden rounded-lg transition-all duration-200 md:h-[3.85rem] md:w-[7.05rem]",
                    sel
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-black opacity-100"
                      : "border-2 border-transparent opacity-48 hover:border-white/20 hover:opacity-88",
                  )}
                >
                  <Image src={thumb.image} alt="" fill className="object-cover" sizes="112px" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-screen zoom */}
      {zoomed ? (
        <div className="fixed inset-0 z-[10055] bg-black">
          <button
            type="button"
            className="absolute inset-0 z-0 bg-black/95 cursor-zoom-out"
            aria-label="Close enlarged photo"
            onClick={() => setZoomed(false)}
          />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 pb-10">
            <div className="flex shrink-0 items-center justify-between gap-3 pb-6 pt-8 md:pb-10 md:pt-12">
              <p className="flex min-w-0 flex-1 items-baseline gap-2 text-[13px] text-white md:text-[15px]">
                <span className="min-w-0 truncate font-medium">{item.ventureName}</span>
                <span className="shrink-0 whitespace-nowrap tabular-nums text-white/65">
                  · {activeIndex + 1}&nbsp;/&nbsp;{items.length}
                </span>
              </p>
              <button
                type="button"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/22"
                onClick={() => setZoomed(false)}
                aria-label="Close enlarged photo"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center pb-28">
              <div
                className="relative h-[min(78dvh,92vw)] w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={item.image}
                  alt={item.ventureName}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <button
                type="button"
                className="absolute left-6 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/82"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(wrap(activeIndex - 1));
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                className="absolute right-6 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/82"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(wrap(activeIndex + 1));
                }}
                aria-label="Next photo"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );

  return createPortal(portal, document.body);
}
