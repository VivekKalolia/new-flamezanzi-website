"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

export type GrowthMilestone = { year: string; title: string };

type Props = {
  milestones: GrowthMilestone[];
};

export function GrowthStoryTimeline({ milestones }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineInnerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const lineInner = lineInnerRef.current;
    if (!section || !milestones.length || !lineInner) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    const years = section.querySelectorAll<HTMLElement>("[data-milestone-year]");

    gsap.set(lineInner, { transformOrigin: "top center", scaleY: 0 });
    gsap.set(items, { opacity: 0, x: 40, filter: "blur(6px)" });
    gsap.set(years, { scale: 0.5, opacity: 0 });
    if (header) gsap.set(header, { opacity: 0, y: 28 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
          toggleActions: "play none none none",
        },
      });

      if (header) {
        tl.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        });
      }

      tl.to(
        lineInner,
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.35",
      ).to(
        items,
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: { each: 0.11, from: "start" },
          ease: "power3.out",
        },
        "-=0.95",
      );

      tl.to(
        years,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: { each: 0.09, from: "start" },
          ease: "back.out(1.55)",
        },
        "<0.15",
      );
    }, section);

    return () => ctx.revert();
  }, [milestones]);

  const spanYears =
    milestones.length > 1
      ? `${milestones[0]?.year} – ${milestones[milestones.length - 1]?.year}`
      : milestones[0]?.year ?? "";

  return (
    <section ref={sectionRef} className="page-section mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
      <div ref={headerRef} className="mb-12 max-w-2xl">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Milestones</p>
        <h2 className="mt-3 font-heading text-4xl">Our Growth Story</h2>
        {spanYears ? (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground/80">{spanYears}</span>
            {" · "}
            {milestones.length} chapter{milestones.length === 1 ? "" : "s"} shaping the group from founding to today.
          </p>
        ) : null}
      </div>

      <div className="relative">
        <div
          className="absolute top-2 bottom-2 left-9 w-px overflow-hidden md:left-10"
          aria-hidden
        >
          <div
            ref={lineInnerRef}
            className="h-full w-full bg-linear-to-b from-primary/70 via-primary/35 to-border/80"
          />
        </div>

        <ul className="relative list-none space-y-0 p-0">
          {milestones.map((milestone, i) => (
            <li
              key={`${milestone.year}-${milestone.title}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative flex gap-5 pb-10 last:pb-0 md:gap-6 md:pb-12"
            >
              <div
                data-milestone-year
                className={cn(
                  "relative z-10 flex size-18 shrink-0 flex-col items-center justify-center rounded-full border-2 border-primary/35 bg-card font-mono text-[0.8rem] font-semibold text-primary shadow-sm md:size-20 md:text-sm",
                  "ring-4 ring-background",
                )}
              >
                {milestone.year}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-border/70 bg-card/90 px-5 py-4 shadow-sm md:px-7 md:py-5">
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase md:text-xs">
                  Step {i + 1}
                </p>
                <p className="mt-1.5 font-heading text-lg leading-snug text-foreground md:text-xl">
                  {milestone.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
