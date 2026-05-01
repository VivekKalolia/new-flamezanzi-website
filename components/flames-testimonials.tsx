import { Quote, Star } from "lucide-react";

import type { flamesContent } from "@/lib/site-data";

type Props = {
  testimonials: typeof flamesContent.testimonials;
};

function StarRating({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${filled} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`size-4 ${
            index < filled ? "fill-amber-500 text-amber-500" : "text-muted-foreground/40"
          }`}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

/**
 * Verified guest reviews with star ratings (building trust + credibility)
 * (per the brief). Mix of dining and event-hall reviews so both audiences
 * see proof.
 */
export function FlamesTestimonials({ testimonials }: Props) {
  if (!testimonials.length) return null;

  const averageRating =
    testimonials.reduce((acc, item) => acc + item.rating, 0) / testimonials.length;

  return (
    <section className="page-section mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Guest reviews</p>
          <h2 className="font-heading text-3xl md:text-4xl">Loved by diners and event hosts</h2>
        </div>
        <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-sm">
          <StarRating rating={averageRating} />
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Average rating</p>
            <p className="text-sm font-semibold">
              {averageRating.toFixed(1)} / 5 from {testimonials.length} verified reviews
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((testimonial) => (
          <article
            key={`${testimonial.author}-${testimonial.date}`}
            className="reveal flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <StarRating rating={testimonial.rating} />
              <Quote className="size-5 text-primary/35" strokeWidth={2} aria-hidden />
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-auto border-t border-border/70 pt-4 text-sm">
              <p className="font-semibold leading-tight">{testimonial.author}</p>
              <p className="text-xs text-muted-foreground">{testimonial.location}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {testimonial.date}
                {testimonial.source ? ` · ${testimonial.source}` : ""}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
