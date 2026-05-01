"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const DEFAULT_PAGE_SIZE = 10;

type Props = {
  images: string[];
  venueName: string;
  /** How many images load per "View more" click (default 10). */
  pageSize?: number;
};

function Lightbox({
  images,
  activeIndex,
  venueName,
  onClose,
  onNav,
}: {
  images: string[];
  activeIndex: number;
  venueName: string;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
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
      if (e.key === "ArrowRight") onNav((activeIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onNav((activeIndex - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length, onClose, onNav]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
      style={{ margin: 0 }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X className="size-5" />
      </button>

      {images.length > 1 && (
        <button
          type="button"
          onClick={() => onNav((activeIndex - 1 + images.length) % images.length)}
          className="absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition-colors hover:bg-white/20"
          aria-label="Previous"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      <div className="flex h-full w-full items-center justify-center p-16">
        <div className="relative h-full w-full">
          <Image
            src={images[activeIndex]}
            alt={`${venueName} gallery ${activeIndex + 1}`}
            fill
            className="rounded-xl object-contain shadow-2xl"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-1.5 text-sm text-white/90 backdrop-blur">
        {venueName} · {activeIndex + 1} / {images.length}
      </div>

      {images.length > 1 && (
        <button
          type="button"
          onClick={() => onNav((activeIndex + 1) % images.length)}
          className="absolute right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition-colors hover:bg-white/20"
          aria-label="Next"
        >
          <ChevronRight className="size-6" />
        </button>
      )}
    </div>,
    document.body,
  );
}

export function VentureGallery({
  images,
  venueName,
  pageSize = DEFAULT_PAGE_SIZE,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const step = Math.max(1, pageSize);
  const [visibleCount, setVisibleCount] = useState(() => Math.min(step, images.length));

  if (images.length === 0) return null;

  const displayImages = images.slice(0, visibleCount);
  const remaining = images.length - visibleCount;
  const hasMore = remaining > 0;

  function loadMore() {
    setVisibleCount((c) => Math.min(c + step, images.length));
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {displayImages.map((image, index) => (
          <button
            key={`${index}-${image}`}
            type="button"
            className="group relative min-h-72 cursor-zoom-in overflow-hidden rounded-2xl border border-border/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image}
              alt={`${venueName} gallery ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
              <span className="scale-75 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                View
              </span>
            </div>
          </button>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
          >
            View more · {Math.min(step, remaining)} photo{Math.min(step, remaining) === 1 ? "" : "s"}
            {remaining > step ? ` (${remaining} left)` : ""}
          </button>
        </div>
      ) : null}

      {activeIndex !== null && (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          venueName={venueName}
          onClose={() => setActiveIndex(null)}
          onNav={setActiveIndex}
        />
      )}
    </>
  );
}
