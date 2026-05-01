import Image from "next/image";
import { ChefHat, Flame, HandHeart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { flamesContent } from "@/lib/site-data";

type Props = {
  story: typeof flamesContent.story;
};

const PILLAR_ICONS: LucideIcon[] = [ChefHat, Flame, HandHeart];

/**
 * Expanded "About Flames Restaurant" section: origins, chef philosophy,
 * and guest-experience pillars. Replaces the short single-paragraph block.
 */
export function FlamesStorySection({ story }: Props) {
  const strip = story.imageStrip ?? [];

  return (
    <section className="page-section bg-secondary/35 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-x-14">
          <div className="space-y-5">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {story.eyebrow}
            </p>
            <h2 className="font-heading text-3xl leading-tight md:text-4xl">{story.title}</h2>

            {strip.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
                {strip.map((img) => (
                  <figure
                    key={img.src}
                    className="relative aspect-[16/11] w-[min(100%,340px)] shrink-0 overflow-hidden rounded-2xl border border-border/60 shadow-md md:flex-1 md:min-w-0"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 85vw, 33vw"
                    />
                  </figure>
                ))}
              </div>
            ) : null}

            <div className="h-px w-16 bg-primary/60" aria-hidden />
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {story.pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index] ?? ChefHat;
              return (
                <article
                  key={pillar.title}
                  className="reveal flex gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div>
                    <p className="font-heading text-xl">{pillar.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
