import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Layers3, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { company, ventures } from "@/lib/site-data";

const stats = company.stats;

const primaryButtonClass =
  "inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";

const outlineButtonClass =
  "inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted";

const heroOutlineButtonClass =
  "inline-flex h-9 items-center justify-center rounded-lg border border-white/35 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <section className="page-section relative border-b border-white/10 bg-[#0b0f14]">
        <div className="relative min-h-128 overflow-hidden lg:min-h-156">
          <Image
            src="/images/optimized/hero-main.jpg"
            alt="FlameZanzi hospitality portfolio hero"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#070a0f]/88 via-[#0b0f14]/72 to-[#0b0f14]/45" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(196,77,49,0.34),transparent_34%)]" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-6 pb-20 pt-20 text-white lg:grid-cols-[1fr_0.55fr] lg:items-end lg:pt-28">
            <div className="max-w-2xl space-y-7 motion-safe:animate-fade-up">
              <Badge
                variant="outline"
                className="rounded-full border-white/35 bg-black/15 px-3 py-1 text-[11px] tracking-[0.2em] text-white uppercase backdrop-blur"
              >
                FlameZanzi Restaurant Ltd.
              </Badge>
              <div className="space-y-5">
                <p className="text-xs tracking-[0.2em] uppercase text-white/70">
                  Corporate Hospitality Portfolio
                </p>
                <h1 className="font-heading text-4xl leading-tight md:text-6xl">
                  Crafting Exceptional Hospitality Experiences
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-white/80">
                  {company.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/ventures" className={primaryButtonClass}>
                  Explore Our Ventures
                </Link>
                <Link href="/contact" className={heroOutlineButtonClass}>
                  Contact Us
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-white">
                <div className="rounded-lg border border-white/30 bg-black/35 px-3 py-2 backdrop-blur">
                  <p className="text-[11px] tracking-[0.14em] uppercase text-white/75">
                    Headquarters
                  </p>
                  <p className="font-heading text-xl">{company.contact.hq}</p>
                </div>
                <div className="rounded-lg border border-white/30 bg-black/35 px-3 py-2 text-sm backdrop-blur">
                  Portfolio: {ventures.length} Ventures
                </div>
              </div>
            </div>
            <div className="hidden space-y-3 lg:block motion-safe:animate-fade-up">
              <div className="rounded-xl border border-white/25 bg-black/35 p-4 backdrop-blur">
                <p className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-white/70">
                  <Building2 className="size-4" />
                  HQ Presence
                </p>
                <p className="mt-2 font-heading text-2xl">{company.contact.hq}</p>
                <p className="mt-1 text-sm text-white/75">Operating across Tanzania and Zanzibar.</p>
              </div>
              <div className="rounded-xl border border-white/25 bg-black/35 p-4 backdrop-blur">
                <p className="flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-white/70">
                  <Layers3 className="size-4" />
                  Portfolio Scope
                </p>
                <p className="mt-2 font-heading text-2xl">{ventures.length} Ventures</p>
                <p className="mt-1 text-sm text-white/75">Restaurants, cafe, and boutique hotel concepts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <article className="flex min-h-96 flex-col justify-center gap-5 rounded-2xl border border-border/70 bg-card p-8 md:p-12 motion-safe:animate-fade-up">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Group Overview</p>
            <p className="font-heading text-3xl">Built for Distinctive Hospitality Brands</p>
            <Separator className="w-16 bg-primary/50" />
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{company.mission}</p>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{company.vision}</p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/70 bg-background/70 p-4">
                  <p className="font-mono text-2xl font-semibold text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs tracking-wide uppercase text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </article>
          <div className="relative min-h-96 overflow-hidden rounded-2xl border border-border/70 motion-safe:animate-fade-up">
            <Image
              src="/images/optimized/about-mission.jpg"
              alt="FlameZanzi service and culinary quality"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />
            <div className="absolute right-6 bottom-6 left-6 rounded-xl border border-white/20 bg-black/40 p-4 text-white backdrop-blur">
              <p className="text-xs tracking-[0.16em] uppercase text-white/70">Positioning</p>
              <p className="mt-1 text-sm">Premium restaurants, cafe culture, and boutique stays under one corporate standard.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section border-y border-border/70 bg-primary py-11 text-primary-foreground">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {["Restaurants", "Cafe & Bakery", "Hotel", "Corporate Services"].map((line) => (
            <div key={line} className="text-center">
              <Sparkles className="mx-auto size-5 opacity-90" />
              <p className="mt-2 text-xs tracking-[0.16em] uppercase opacity-90">{line}</p>
            </div>
          ))}
        </div>
      </section>

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
          {ventures.map((venture) => (
            <Card
              key={venture.slug}
              className="overflow-hidden border border-border/70 bg-card/90 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-safe:animate-fade-up"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={venture.images.hero}
                  alt={venture.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardHeader className="pt-6">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <Image
                    src={venture.logo}
                    alt={`${venture.name} logo`}
                    width={150}
                    height={40}
                    className="h-9 w-auto"
                  />
                  <Badge variant="secondary" className="uppercase">
                    {venture.type}
                  </Badge>
                </div>
                <CardTitle className="font-heading text-2xl">{venture.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {venture.area}, {venture.city}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-relaxed text-muted-foreground">{venture.shortDescription}</p>
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Discover venue details <ArrowRight className="size-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-section bg-secondary/45 py-24 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Portfolio Services</p>
            <h2 className="mt-3 font-heading text-4xl">What Clients and Partners Experience</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Corporate Event Hosting",
                text: "Structured venue support for executive dinners, private functions, and business events.",
              },
              {
                title: "Brand Consistency",
                text: "Unified service standards, curated environments, and portfolio-level quality control.",
              },
              {
                title: "Partnership Programs",
                text: "Long-term collaboration models for agencies, travel partners, and institutional clients.",
              },
            ].map((item) => (
              <Card key={item.title} className="border border-border/70 bg-card py-5 shadow-sm motion-safe:animate-fade-up">
                <CardContent className="pt-2">
                  <p className="font-heading text-2xl">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
        <div className="mb-10 space-y-3">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Testimonials</p>
          <h2 className="mt-3 font-heading text-4xl">What Partners Say</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {company.testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="border border-border/70 py-5 shadow-sm">
              <CardContent className="space-y-5 pt-2">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

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
            <Link href={`https://wa.me/${company.contact.whatsapp.replace("+", "")}`} className={outlineButtonClass}>
              WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-border/70">
          <Image
            src="/images/optimized/team-corporate.jpg"
            alt="FlameZanzi portfolio collage"
            width={1400}
            height={640}
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30" />
          <div className="absolute inset-0 flex items-end p-8 md:p-10">
            <div className="max-w-2xl text-white">
              <p className="text-xs tracking-[0.2em] uppercase text-white/75">FlameZanzi Portfolio</p>
              <p className="mt-2 font-heading text-3xl">Modern, elegant, and built for premium hospitality brands.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/about" className={primaryButtonClass}>
                  Learn About the Group
                </Link>
                <Link href="/ventures" className={heroOutlineButtonClass}>
                  Explore 4 Ventures
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
