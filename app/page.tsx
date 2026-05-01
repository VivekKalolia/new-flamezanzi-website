import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Coffee,
  Star,
  Handshake,
  Hotel,
  Layers3,
  MapPin,
  UserRound,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { VentureTypeBadge } from "@/components/venture-type-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimatedStat } from "@/components/animated-stat";
import { FoodRibbonMarquee } from "@/components/food-ribbon-marquee";
import { GroupOverviewSlideshow } from "@/components/group-overview-slideshow";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { foodPictureSlides } from "@/lib/food-pic-slides";
import { company, ventures } from "@/lib/site-data";

const stats = company.stats;

const offeringBand: { label: string; Icon: LucideIcon }[] = [
  { label: "Restaurants", Icon: UtensilsCrossed },
  { label: "Cafe & Bakery", Icon: Coffee },
  { label: "Hotel", Icon: Hotel },
  { label: "Bars & More", Icon: Wine },
];

const primaryButtonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";

const outlineButtonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted";

const heroOutlineButtonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/35 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10";

export default function Home() {
  const groupOverviewSlides = (
    [
      ["HNK08106", "FlameZanzi hospitality: service"],
      ["HNK08561", "FlameZanzi hospitality: ambiance"],
      ["HNK08109", "FlameZanzi hospitality: dining detail"],
      ["HNK08536", "FlameZanzi hospitality: experience"],
      ["HNK08537", "FlameZanzi hospitality: venue"],
      ["HNK08540", "FlameZanzi hospitality: moments"],
      ["HNK08546", "FlameZanzi hospitality: atmosphere"],
      ["HNK08550", "FlameZanzi hospitality: celebration"],
    ] as const
  ).map(([base, alt]) => ({
    src: `/images/optimized/group-overview/${base}.webp`,
    alt,
  }));

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative border-b border-white/10 bg-[#0b0f14]">
        <div className="relative min-h-72 overflow-hidden sm:min-h-80 md:min-h-88 lg:min-h-96">
          <Image
            src="/images/optimized/hero-main.webp"
            alt="FlameZanzi hospitality portfolio hero"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#070a0f]/90 via-[#0b0f14]/70 to-[#0b0f14]/40" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(196,77,49,0.3),transparent_34%)]" />

          <div className="relative mx-auto w-full max-w-6xl px-6 py-12 text-white md:py-14 lg:py-16">
            {/* Badge - delay 0 */}
            <div className="motion-safe:animate-fade-up motion-safe:[animation-delay:0ms]">
              <Badge
                variant="outline"
                className="rounded-full border-white/35 bg-black/15 px-3 py-1 text-[11px] tracking-[0.2em] text-white uppercase backdrop-blur"
              >
                Flamezanzi Restaurant Limited
              </Badge>
            </div>

            {/* Eyebrow + headline - delay 100ms */}
            <div className="mt-5 space-y-4 motion-safe:animate-fade-up motion-safe:[animation-delay:100ms]">
              <p className="text-xs tracking-[0.2em] uppercase text-white/60">
                Corporate Hospitality Portfolio
              </p>
              <h1 className="max-w-2xl font-heading text-4xl leading-tight md:text-6xl">
                Crafting Exceptional Hospitality Experiences
              </h1>
            </div>

            {/* Short pitch; full company story on /about */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]">
              {company.elevatorPitch}{" "}
              <Link
                href="/about"
                className="font-medium text-white underline-offset-4 transition-colors hover:text-white/95 hover:underline"
              >
                Read our story
              </Link>
            </p>

            {/* CTAs - delay 300ms */}
            <div className="mt-7 flex flex-wrap gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:300ms]">
              <Link href="/ventures" className={primaryButtonClass}>
                Explore Our Ventures <ArrowRight className="size-4" />
              </Link>
              <Link
                href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                className={heroOutlineButtonClass}
              >
                <WhatsAppIcon className="size-[1.1rem] text-[#25D366]" />
                WhatsApp Us
              </Link>
            </div>

            {/* Info chips - delay 420ms, hidden on very small screens to avoid clutter */}
            <div className="mt-7 hidden flex-wrap items-center gap-2.5 sm:flex motion-safe:animate-fade-up motion-safe:[animation-delay:420ms]">
              <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs backdrop-blur">
                <Building2 className="size-3.5 text-white/60" />
                <span className="text-white/80">Dar es Salaam & Zanzibar, Tanzania</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs backdrop-blur">
                <Layers3 className="size-3.5 text-white/60" />
                <span className="text-white/80">{ventures.length} Active Ventures</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FoodRibbonMarquee slides={foodPictureSlides} />

      {/* ── Group Overview ───────────────────────────────────────────── */}
      <section className="page-section mx-auto w-full max-w-6xl px-6 pt-0 pb-24 md:pb-28">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="reveal flex min-h-96 flex-col justify-center gap-5 rounded-2xl border border-border/70 bg-card p-8 md:p-12">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Group Overview</p>
            <p className="font-heading text-3xl">Built for Distinctive Hospitality Brands</p>
            <Separator className="w-16 bg-primary/50" />
            <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:line-clamp-4">{company.mission}</p>
            <p className="line-clamp-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{company.vision}</p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
              >
                Mission, vision &amp; core values <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/70 bg-background/70 p-4">
                  <AnimatedStat
                    value={stat.value}
                    numeric={stat.numeric}
                    label={stat.label}
                    className="text-left"
                    valueClassName="font-mono text-2xl font-semibold text-primary"
                    labelClassName="mt-1 text-xs tracking-wide uppercase text-muted-foreground"
                  />
                </div>
              ))}
            </div>
          </article>
          <GroupOverviewSlideshow slides={groupOverviewSlides} />
        </div>
      </section>

      {/* ── Offering band ────────────────────────────────────────────── */}
      <section className="page-section border-y border-border/70 bg-primary py-11 text-primary-foreground">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {offeringBand.map(({ label, Icon }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto size-6 opacity-95" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-2 text-xs tracking-[0.16em] uppercase opacity-90">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ventures ─────────────────────────────────────────────────── */}
      <section className="page-section mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Our Ventures</p>
            <h2 className="mt-3 font-heading text-4xl">A Portfolio Built Around 4 Distinct Brands</h2>
          </div>
          <Link href="/ventures" className={outlineButtonClass}>
            View All Ventures <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {ventures.map((venture, i) => (
            <Card
              key={venture.slug}
              className={`group reveal reveal-delay-${(i % 4) + 1} overflow-hidden border border-border/70 bg-card/90 py-0 shadow-sm transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10`}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={venture.images.hero}
                  alt={venture.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardHeader className="pt-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="flex size-17 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background/90 p-2 shadow-sm sm:size-20 md:size-24 md:p-2.5">
                    <Image
                      src={venture.logo}
                      alt={`${venture.name} logo`}
                      width={112}
                      height={112}
                      className="h-full w-full rounded-full object-cover"
                      unoptimized
                    />
                  </div>
                  <VentureTypeBadge type={venture.type} accentColor={venture.color} />
                </div>
                <CardTitle className="font-heading text-2xl">{venture.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {venture.area}, {venture.city}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pb-7">
                <p className="text-sm leading-relaxed text-muted-foreground">{venture.shortDescription}</p>
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="inline-flex h-9 items-center justify-center gap-1 self-start rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Discover venue details <ArrowRight className="size-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Portfolio Services ────────────────────────────────────────── */}
      <section className="page-section bg-secondary/45 py-24 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Portfolio Services</p>
            <h2 className="mt-3 font-heading text-4xl">What Clients and Partners Experience</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(
              [
                {
                  title: "Corporate Event Hosting",
                  text: "Structured venue support for executive dinners, private functions, and business events.",
                  Icon: CalendarDays,
                },
                {
                  title: "Brand Consistency",
                  text: "Unified service standards, curated environments, and portfolio-level quality control.",
                  Icon: Layers3,
                },
                {
                  title: "Partnership Programs",
                  text: "Long-term collaboration models for agencies, travel partners, and institutional clients.",
                  Icon: Handshake,
                },
              ] as const
            ).map((item, i) => {
              const ServiceIcon = item.Icon;
              return (
              <Card key={item.title} className={`reveal reveal-delay-${i + 1} border border-border/70 bg-card py-5 shadow-sm`}>
                <CardContent className="pt-2">
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <ServiceIcon className="size-6" strokeWidth={1.5} aria-hidden />
                  </div>
                  <p className="font-heading text-2xl">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="page-section mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Testimonials</p>
          <h2 className="font-heading text-4xl">What Customers Say</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {company.testimonials.map((testimonial, i) => (
            <Card
              key={`${testimonial.author}-${testimonial.venture}-${i}`}
              className={`reveal reveal-delay-${(i % 4) + 1} border border-border/70 bg-card py-5 shadow-md`}
            >
              <CardContent className="flex flex-col items-center gap-5 pt-2 text-center">
                <div
                  aria-hidden
                  className="flex size-12.5 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted text-muted-foreground shadow-sm ring-2 ring-background/80 sm:size-14 md:size-14.5"
                >
                  <UserRound className="size-[42%] opacity-85" strokeWidth={1.5} />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div
                  className="flex items-center gap-0.5 text-amber-500"
                  aria-label={`${testimonial.rating} star rating`}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={`${testimonial.author}-${index}`}
                      className={`size-4 ${index < testimonial.rating ? "fill-amber-500" : "text-amber-300/60"}`}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  ))}
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.venture}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────── */}
      <section className="page-section border-y border-border/70 bg-card py-20 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Contact & Reservations
            </p>
            <h3 className="font-heading text-3xl">Start a Hospitality Conversation</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Reach us for partnerships, venue inquiries, corporate events, and group-wide collaborations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primaryButtonClass}>
              Contact Us
            </Link>
            <Link
              href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              className={outlineButtonClass}
            >
              <WhatsAppIcon className="size-[1.1rem] text-[#25D366]" />
              WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bottom collage card ───────────────────────────────────────── */}
      <section className="page-section mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="reveal reveal-scale relative min-h-[min(22rem,72vw)] overflow-hidden rounded-2xl border border-border/70 sm:min-h-60 md:min-h-0 md:h-64">
          <Image
            src="/images/optimized/silk-route/HNK08758.webp"
            alt="FlameZanzi portfolio collage"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1152px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/55 to-black/35 md:bg-linear-to-r md:from-black/75 md:via-black/45 md:to-black/25" />
          <div className="absolute inset-0 flex items-end p-5 pb-6 pt-14 sm:items-center sm:p-8 sm:pb-8 sm:pt-8 md:p-12">
            <div className="w-full max-w-lg text-center text-white sm:text-left">
              <p className="text-xs tracking-[0.2em] uppercase text-white/70">FlameZanzi Portfolio</p>
              <p className="mt-2 text-pretty font-heading text-2xl leading-snug sm:text-[1.65rem] md:text-3xl">
                Modern, elegant, and built for premium hospitality brands.
              </p>
              <div className="mt-5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-start">
                <Link
                  href="/about"
                  className={`${primaryButtonClass} w-full justify-center sm:w-auto`}
                >
                  About the Group
                </Link>
                <Link
                  href="/ventures"
                  className={`${heroOutlineButtonClass} w-full justify-center sm:w-auto`}
                >
                  Explore Ventures
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
