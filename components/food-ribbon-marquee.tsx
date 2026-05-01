"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type FoodRibbonSlide = {
  src: string;
  alt: string;
};

type Props = {
  slides: FoodRibbonSlide[];
  ariaLabel?: string;
  className?: string;
};

function shuffleSlides(slides: FoodRibbonSlide[]): FoodRibbonSlide[] {
  const copy = [...slides];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function wrapOffset(value: number, half: number): number {
  if (half <= 0) return 0;
  let o = value % half;
  if (o < 0) o += half;
  return o;
}

/**
 * Full viewport–width food ribbon: auto-drifts + pointer drag (touch / mouse).
 */
export function FoodRibbonMarquee({
  slides,
  ariaLabel = "Food photography across Flamezanzi venues",
  className,
}: Props) {
  const reducedMotion = usePrefersReducedMotion();

  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [orderedSlides, setOrderedSlides] = useState<FoodRibbonSlide[] | null>(null);

  /** Horizontal offset for translate path (px). */
  const offsetRef = useRef(0);
  /** True while user holds pointer (pauses auto drift). */
  const draggingRef = useRef(false);
  const lastPointerXRef = useRef<number | null>(null);

  useEffect(() => {
    if (slides.length === 0) {
      setOrderedSlides([]);
      return;
    }
    setOrderedSlides(shuffleSlides(slides));
  }, [slides]);

  const doubled = useMemo(
    () => (orderedSlides?.length ? [...orderedSlides, ...orderedSlides] : []),
    [orderedSlides],
  );

  const applyTransform = useCallback(() => {
    const row = trackRef.current;
    if (!row || reducedMotion) return;
    const totalW = row.getBoundingClientRect().width;
    const half = Math.max(totalW / 2, 1);
    offsetRef.current = wrapOffset(offsetRef.current, half);
    row.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    row.style.willChange = "transform";
  }, [reducedMotion]);

  const wrapScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half > 4 && el.scrollLeft >= half - 0.5) el.scrollLeft -= half;
    if (half > 4 && el.scrollLeft < 0) el.scrollLeft += half;
  }, []);

  /** Reduced motion → auto-scroll */
  useEffect(() => {
    if (!reducedMotion || !scrollRef.current || doubled.length === 0) return;

    let rafId = 0;
    const el = scrollRef.current;

    const tick = () => {
      if (!draggingRef.current) {
        const half = el.scrollWidth / 2;
        if (half > 4) {
          el.scrollLeft += 0.9;
          if (el.scrollLeft >= half - 0.5) el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion, doubled.length]);

  /** Standard motion → auto translate */
  useEffect(() => {
    if (reducedMotion || doubled.length === 0) return;

    let rafId = 0;
    let last = typeof performance !== "undefined" ? performance.now() : 0;
    const pxPerMs = 0.028;

    const tick = (now: number) => {
      const row = trackRef.current;
      if (!row) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const totalW = row.getBoundingClientRect().width;
      if (totalW < 80) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const half = Math.max(totalW / 2, 1);
      const dt = typeof performance !== "undefined" ? Math.min(Math.max(now - last, 0), 48) : 16.7;
      last = now;

      if (!draggingRef.current) {
        offsetRef.current += pxPerMs * dt;
      }

      offsetRef.current = wrapOffset(offsetRef.current, half);
      row.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      row.style.willChange = "transform";

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      if (trackRef.current) trackRef.current.style.transform = "";
    };
  }, [reducedMotion, doubled.length]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      draggingRef.current = true;
      lastPointerXRef.current = e.clientX;

    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current || lastPointerXRef.current === null) return;

      const dx = e.clientX - lastPointerXRef.current;
      lastPointerXRef.current = e.clientX;

      if (reducedMotion && scrollRef.current) {
        scrollRef.current.scrollLeft -= dx;
        wrapScroll();
      } else {
        offsetRef.current -= dx;
        applyTransform();
      }
    },
    [applyTransform, reducedMotion, wrapScroll],
  );

  const endDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      draggingRef.current = false;
      lastPointerXRef.current = null;
    },
    [],
  );

  if (slides.length === 0) return null;

  if (orderedSlides === null) {
    return (
      <section
        aria-hidden
        className={cn(
          "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-background",
          "mt-6 mb-6 py-4 md:mt-8 md:mb-8 md:py-5",
          className,
        )}
      >
        <div className="h-[clamp(176px,min(54vw),380px)] rounded-sm bg-muted/40 md:rounded-md" />
      </section>
    );
  }

  if (orderedSlides.length === 0) return null;

  const row = doubled.map((slide, index) => (
    <div
      key={`${slide.src}-${index}`}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-sm bg-muted/30 md:rounded-md",
        "aspect-4/5 h-[clamp(176px,min(54vw),380px)] w-auto ring-1 ring-black/4 dark:ring-white/6",
      )}
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        className="pointer-events-none object-cover"
        sizes="(max-width: 768px) 40vw, 320px"
        priority={index < 4}
        loading={index < 4 ? "eager" : "lazy"}
        draggable={false}
      />
    </div>
  ));

  return (
    <section
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-background",
        "mt-6 mb-6 py-4 md:mt-8 md:mb-8 md:py-5",
        "touch-none cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      {reducedMotion ? (
        <div
          ref={scrollRef}
          className={cn(
            "w-full overflow-x-auto overflow-y-hidden",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          <div className="flex w-max shrink-0 flex-nowrap gap-1.5 select-none md:gap-2">
            {row}
          </div>
        </div>
      ) : (
        <div
          ref={trackRef}
          className="flex w-max shrink-0 flex-nowrap gap-1.5 select-none md:gap-2"
        >
          {row}
        </div>
      )}
    </section>
  );
}
