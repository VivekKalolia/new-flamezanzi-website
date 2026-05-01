"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Slide = {
  src: string;
  alt: string;
};

type Props = {
  slides: Slide[];
  intervalMs?: number;
};

export function GroupOverviewSlideshow({ slides, intervalMs = 5500 }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [barKey, setBarKey] = useState(0);

  const totalSlides = useMemo(() => slides.length, [slides.length]);

  useEffect(() => {
    if (totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
      setBarKey((current) => current + 1);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, totalSlides]);

  if (slides.length === 0) return null;

  return (
    <div className="reveal reveal-delay-2 relative min-h-96 overflow-hidden rounded-2xl border border-border/70">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-700 ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      ))}

      <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />

      <div className="absolute right-6 bottom-6 left-6 rounded-xl border border-white/20 bg-black/40 p-4 text-white backdrop-blur">
        <p className="text-xs tracking-[0.16em] uppercase text-white/70">Positioning</p>
        <p className="mt-1 text-sm">
          Premium restaurants, cafe culture, and boutique stays under one corporate standard.
        </p>
        {totalSlides > 1 ? (
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
              <span
                key={barKey}
                className="block h-full rounded-full bg-primary motion-safe:animate-[progressLinear_var(--duration)_linear_forwards]"
                style={{ ["--duration" as string]: `${intervalMs}ms` }}
              />
            </div>
            <p className="text-[10px] text-white/70">
              {activeIndex + 1} / {totalSlides}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
