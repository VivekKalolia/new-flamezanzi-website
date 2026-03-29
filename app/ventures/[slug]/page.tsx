import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, MapPin, Phone, PhoneCall } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VentureGallery } from "@/components/venture-gallery";
import { VentureReservation } from "@/components/venture-reservation";
import { getVentureGalleryImages } from "@/lib/local-gallery";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { company, getVentureBySlug, ventures } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);
  if (!venture) {
    return {
      title: "Venture Not Found | FlameZanzi",
    };
  }

  return {
    title: `${venture.name} | FlameZanzi`,
    description: venture.shortDescription,
  };
}

export default async function VentureDetailPage({ params }: Props) {
  const { slug } = await params;
  const venture = getVentureBySlug(slug);

  if (!venture) {
    notFound();
  }

  const otherVentures = ventures.filter((item) => item.slug !== venture.slug).slice(0, 3);
  const galleryImages = getVentureGalleryImages(venture.slug, venture.images.gallery);
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <main className="bg-background text-foreground">
      <section className="page-section relative min-h-100 overflow-hidden border-b border-border/70">
        <Image src={venture.images.hero} alt={venture.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 text-white md:py-24">
          <p className="mb-4 text-xs text-white/70">
            Home / Ventures / {venture.name}
          </p>
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-black/35 p-2 shadow-lg backdrop-blur md:h-28 md:w-28">
            <Image
              src={venture.logo}
              alt={`${venture.name} logo`}
              width={120}
              height={120}
              className="h-full w-full rounded-full object-cover"
              unoptimized
            />
          </div>
          <Badge variant="outline" className="mt-4 border-white/40 bg-black/20 text-white">
            {venture.type}
          </Badge>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl">{venture.name}</h1>
          <p className="mt-3 max-w-2xl text-white/80">{venture.tagline}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/85">
            <MapPin className="size-4" />
            {venture.city === "Zanzibar"
              ? "Zanzibar, Tanzania"
              : "Dar es Salaam, Tanzania"}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`tel:${venture.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <PhoneCall className="size-4" />
              Call Now
            </Link>
            <Link
              href={`https://wa.me/${venture.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <WhatsAppIcon className="size-[1.1rem] text-[#25D366]" />
              WhatsApp
            </Link>
            <Link
              href="#reserve-actions"
              className="inline-flex h-10 items-center rounded-lg border border-white/40 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Reserve Table
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-20">
        <div className="space-y-10">
          {/* About — no card box, plain prose */}
          <div className="space-y-7">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">About</p>
              <h2 className="mt-2 font-heading text-3xl">About {venture.name}</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">{venture.fullDescription}</p>

            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Cuisine</p>
              <div className="flex flex-wrap gap-2">
                {venture.cuisine.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Features & Amenities</p>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {venture.features.map((item) => (
                  <p key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-0.5 text-primary">✓</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-3xl">Gallery</h2>
            <VentureGallery images={galleryImages} venueName={venture.name} />
          </div>
        </div>

        <div className="space-y-5 md:sticky md:top-24 md:self-start">
          <Card className="border border-border/70 py-4">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Opening Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {weekDays.map((day) => (
                <div key={day} className="flex items-center justify-between border-b border-border/50 py-1.5 last:border-0">
                  <span>{day}</span>
                  <span>{venture.hours}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/70 py-4">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="size-4" /> {venture.contact.phone}
              </p>
              <p>{venture.contact.email}</p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4" /> {venture.area}, {venture.city}
              </p>
            </CardContent>
          </Card>

          <Card id="reserve-actions" className="border border-border/70 py-4">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">View Our Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <VentureReservation venture={venture} />
              <Link
                href={`/menu/${venture.slug}`}
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View Menu Online
              </Link>
              <Link
                href={venture.menuUrl}
                className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                Download PDF
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-border/70 py-0">
            <CardHeader className="py-4">
              <CardTitle className="font-heading text-2xl">Location</CardTitle>
            </CardHeader>
            <iframe
              title={`${venture.name} map`}
              width="100%"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${venture.coordinates.lat},${venture.coordinates.lng}&z=15&output=embed`}
            />
          </Card>
        </div>
      </section>

      {venture.slug === "flames-restaurant" && (
        <section className="page-section border-y border-border/70 bg-secondary/30 py-16 md:py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Part of the Flames Family</p>
            <h2 className="mt-3 mb-10 font-heading text-3xl">Under the Flames Roof</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Image
                    src={company.logo}
                    alt="FlameZanzi logo"
                    width={140}
                    height={36}
                    className="h-7 w-auto opacity-70"
                    unoptimized
                  />
                  <span className="text-xs text-muted-foreground">×</span>
                  <Image src="/logos/PIKI.png" alt="Poiki logo" width={120} height={36} className="h-8 w-auto object-contain" unoptimized />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Poiki is the cocktail and mixology concept within Flames — a sophisticated bar experience offering handcrafted cocktails, curated spirits, and an intimate late-night atmosphere.
                </p>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Image
                    src={company.logo}
                    alt="FlameZanzi logo"
                    width={140}
                    height={36}
                    className="h-7 w-auto opacity-70"
                    unoptimized
                  />
                  <span className="text-xs text-muted-foreground">×</span>
                  <Image src="/logos/DUKA.png" alt="Duka logo" width={120} height={36} className="h-8 w-auto object-contain" unoptimized />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Duka is the retail and takeaway concept at Flames — a curated deli and provisions counter offering premium pantry selections, artisan goods, and Flames-branded products.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {venture.slug === "aquelia-rose" && (
        <section className="page-section border-y border-border/70 bg-secondary/30 py-14 md:py-18">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Book Your Stay</p>
            <h2 className="mt-3 mb-8 font-heading text-3xl">Find Us on Travel Platforms</h2>
            <div className="flex flex-wrap items-center gap-6">
              {[
                { src: "/logos/booking-logo.svg", alt: "Booking.com", w: 120 },
                { src: "/logos/tripadvisor-logo.svg", alt: "TripAdvisor", w: 140 },
                { src: "/logos/airbnb-logo.svg", alt: "Airbnb", w: 100 },
              ].map((platform) => (
                <div
                  key={platform.alt}
                  className="flex h-14 items-center justify-center rounded-xl border border-border/70 bg-card px-6 py-3 transition-colors hover:border-primary/40"
                >
                  <Image
                    src={platform.src}
                    alt={platform.alt}
                    width={platform.w}
                    height={32}
                    className="h-7 w-auto"
                  />
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Search &ldquo;Aquelia Rose Hotel Jambiani&rdquo; on your preferred platform to check availability and rates.
            </p>
          </div>
        </section>
      )}

      <section className="page-section mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <h2 className="mb-8 font-heading text-4xl">Other Ventures</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {otherVentures.map((item) => (
            <Card key={item.slug} className="border border-border/70 py-4">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{item.shortDescription}</p>
                <Link href={`/ventures/${item.slug}`} className="text-sm font-medium text-primary">
                  View details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
