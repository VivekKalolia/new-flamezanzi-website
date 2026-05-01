"use client";

import Link from "next/link";
import { useState } from "react";

import type { Venture } from "@/lib/site-data";

type Props = {
  ventures: Venture[];
  /** When set with `onActiveSlugChange`, the parent controls which venue is shown on the map. */
  activeSlug?: string;
  onActiveSlugChange?: (slug: string) => void;
  className?: string;
};

/**
 * Venture pill selector + embedded Google Map + external Maps link (same pattern as Our Ventures).
 */
export function VentureLocationMapSection({
  ventures,
  activeSlug: controlledSlug,
  onActiveSlugChange,
  className,
}: Props) {
  const [internalSlug, setInternalSlug] = useState(ventures[0]?.slug ?? "");

  const activeSlug = controlledSlug !== undefined ? controlledSlug : internalSlug;
  const setActiveSlug = (slug: string) => {
    if (onActiveSlugChange) onActiveSlugChange(slug);
    else setInternalSlug(slug);
  };

  const activeVenture = ventures.find((v) => v.slug === activeSlug) ?? ventures[0];

  if (!activeVenture) return null;

  return (
    <section className={className ?? "space-y-4"}>
      <h3 className="font-heading text-3xl">Location Map</h3>
      <div className="flex flex-wrap gap-2">
        {ventures.map((venture) => (
          <button
            key={venture.slug}
            type="button"
            onClick={() => setActiveSlug(venture.slug)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              activeVenture.slug === venture.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-muted"
            }`}
          >
            {venture.name}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-border/70">
        <iframe
          title={`${activeVenture.name} map`}
          width="100%"
          height="360"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${activeVenture.coordinates.lat},${activeVenture.coordinates.lng}&z=15&output=embed`}
        />
      </div>
      <Link
        href={`https://maps.google.com/?q=${activeVenture.coordinates.lat},${activeVenture.coordinates.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 items-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
      >
        Open in Google Maps
      </Link>
    </section>
  );
}
