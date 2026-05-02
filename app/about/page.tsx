import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedStat } from "@/components/animated-stat";
import { GrowthStoryTimeline } from "@/components/growth-story-timeline";
import { FoodRibbonMarquee } from "@/components/food-ribbon-marquee";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { foodPictureSlides } from "@/lib/food-pic-slides";
import { BRAND_WORDMARK, company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `About Us | ${company.name}`,
  description:
    `Learn about ${company.name}: mission, vision, values, milestones, and leadership.`,
};

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="page-section relative min-h-88 overflow-hidden border-b border-border/70">
        <Image
          src="/images/optimized/about-mission.webp"
          alt={`${BRAND_WORDMARK}: our story`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#070a0f]/85 via-[#0b0f14]/65 to-[#0b0f14]/30" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24 text-white md:py-32">
          <Badge
            variant="outline"
            className="rounded-full border-white/35 bg-black/15 px-3 py-1 text-[11px] tracking-wide text-white normal-case backdrop-blur"
          >
            About {company.name}
          </Badge>
          <h1 className="mt-5 max-w-2xl font-heading text-4xl leading-tight md:text-6xl">
            Over a decade of premium hospitality
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
            {company.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="page-section mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-5 rounded-2xl border border-border/70 bg-card p-8 md:p-10">
            <p className="text-xs tracking-[0.2em] uppercase text-primary">Mission</p>
            <Separator className="w-12 bg-primary/40" />
            <h2 className="font-heading text-3xl">Why We Do This</h2>
            <p className="leading-relaxed text-muted-foreground">{company.mission}</p>
          </div>
          <div className="space-y-5 rounded-2xl border border-border/70 bg-card p-8 md:p-10">
            <p className="text-xs tracking-[0.2em] uppercase text-primary">Vision</p>
            <Separator className="w-12 bg-primary/40" />
            <h2 className="font-heading text-3xl">Where We&rsquo;re Going</h2>
            <p className="leading-relaxed text-muted-foreground">{company.vision}</p>
          </div>
        </div>
      </section>

      <FoodRibbonMarquee slides={foodPictureSlides} />

      {/* Stats band - animated counters */}
      <section className="page-section border-y border-border/70 bg-primary py-14 text-primary-foreground">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {company.stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              numeric={stat.numeric}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="page-section bg-secondary/30 py-24 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12 max-w-xl">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Core Values</p>
            <h2 className="mt-3 font-heading text-4xl">The Standards We Hold</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              How every venue shows up in the kitchen and at the guest&apos;s side.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {company.values.map((value, i) => (
              <div
                key={value.title}
                className="group flex gap-5 rounded-2xl border border-border/70 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-semibold text-primary">
                  {i + 1}
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GrowthStoryTimeline milestones={company.milestones} />

      {/* Leadership */}
      <section className="page-section bg-card py-24 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Leadership</p>
            <h2 className="mt-3 font-heading text-4xl">The Team Behind the Group</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {company.leadership.map((leader) => (
              <div
                key={leader.name}
                className="group flex flex-col items-center rounded-2xl border border-border/70 bg-background px-6 pb-8 pt-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative size-36 overflow-hidden rounded-full border-4 border-border/60 bg-secondary/30 shadow-md ring-4 ring-background transition-transform duration-500 group-hover:scale-[1.03] sm:size-40">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-top"
                    sizes="160px"
                  />
                </div>
                <div className="mt-6 max-w-sm">
                  <p className="font-heading text-xl">{leader.name}</p>
                  <p className="mt-1 text-xs tracking-[0.14em] uppercase text-primary">{leader.role}</p>
                  <Separator className="mx-auto my-4 w-12 bg-border/60" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section border-t border-border/70 bg-secondary/30 py-20 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Partner With Us</p>
            <h3 className="font-heading text-3xl">Interested in Collaboration?</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Reach out for partnerships, event hosting, and corporate hospitality inquiries across our four venues.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in Touch <ArrowRight className="size-4" />
            </Link>
            <Link
              href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <WhatsAppIcon className="size-[1.1rem] text-[#25D366]" />
              WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
