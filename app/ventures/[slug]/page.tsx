import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuCardVisual } from "@/components/menu-card-visual";
import { OpeningHoursRows } from "@/components/opening-hours-rows";
import { VentureGallery } from "@/components/venture-gallery";
import { VentureReservation } from "@/components/venture-reservation";
import { VentureCtaBar } from "@/components/venture-cta-bar";
import { FlamesEventHalls } from "@/components/flames-event-halls";
import { FlamesStorySection } from "@/components/flames-story-section";
import { FlamesTestimonials } from "@/components/flames-testimonials";
import { OtherExperiencesCarousel } from "@/components/other-experiences-carousel";
import { VentureMenuPreview } from "@/components/venture-menu-preview";
import { getVentureGalleryImages } from "@/lib/local-gallery";
import {
  BRAND_WORDMARK,
  company,
  flamesContent,
  getVentureBySlug,
  menus,
  ventureDetailTestimonials,
  ventureQuickFacts,
  ventureStories,
  ventures,
  type VentureRichSlug,
} from "@/lib/site-data";

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
      title: `Venture Not Found | ${BRAND_WORDMARK}`,
    };
  }

  if (venture.slug === "flames-restaurant") {
    return {
      title: `Flames Restaurant | Fine Dining in Masaki, Dar es Salaam | ${BRAND_WORDMARK}`,
      description: flamesContent.shortMetaDescription,
      keywords: flamesContent.seoKeywords,
      openGraph: {
        title: "Flames Restaurant | Fine Dining in Masaki, Dar es Salaam",
        description: flamesContent.shortMetaDescription,
        type: "website",
        images: [{ url: venture.images.hero }],
      },
      twitter: {
        card: "summary_large_image",
        title: "Flames Restaurant | Fine Dining in Masaki, Dar es Salaam",
        description: flamesContent.shortMetaDescription,
        images: [venture.images.hero],
      },
    };
  }

  return {
    title: `${venture.name} | ${BRAND_WORDMARK}`,
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
  const ventureMenu = menus[venture.slug];
  const typeLabel =
    venture.type === "cafe" ? "Cafe" : venture.type === "hotel" ? "Hotel" : "Restaurant";
  const isFlames = venture.slug === "flames-restaurant";
  const isHotel = venture.type === "hotel";
  const richSlug = venture.slug as VentureRichSlug;
  const storyForPage = isFlames ? flamesContent.story : ventureStories[richSlug];
  const quickFactsForPage = isFlames ? flamesContent.quickFacts : ventureQuickFacts[richSlug];
  const testimonialsForPage = isFlames
    ? flamesContent.testimonials
    : ventureDetailTestimonials[richSlug];
  /** Hero crop: anchor to top edge (Silk Route + Aquelia art direction). */
  const heroAnchoredTop = venture.slug === "silk-route" || venture.slug === "aquelia-rose";

  // Restaurant JSON-LD for Flames helps target keywords like "Dar es Salaam fine dining"
  // and "Masaki seafood restaurant"; search engines pick this up directly.
  const flamesJsonLd = isFlames
    ? {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: venture.name,
        url: `${company.domain}/ventures/${venture.slug}`,
        image: [venture.images.hero, ...venture.images.gallery.slice(0, 4)],
        servesCuisine: venture.cuisine,
        priceRange: "$$$",
        telephone: venture.contact.phone,
        email: venture.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Masaki",
          addressLocality: venture.city,
          addressRegion: "Dar es Salaam",
          addressCountry: "TZ",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: venture.coordinates.lat,
          longitude: venture.coordinates.lng,
        },
        openingHours: "Mo-Su 12:00-23:00",
        keywords: flamesContent.seoKeywords.join(", "),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: (
            flamesContent.testimonials.reduce((acc, t) => acc + t.rating, 0) /
            flamesContent.testimonials.length
          ).toFixed(1),
          reviewCount: flamesContent.testimonials.length,
        },
        review: flamesContent.testimonials.map((testimonial) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: testimonial.rating,
            bestRating: 5,
          },
          author: {
            "@type": "Person",
            name: testimonial.author,
          },
          reviewBody: testimonial.quote,
        })),
        amenityFeature: flamesContent.eventHalls.map((hall) => ({
          "@type": "LocationFeatureSpecification",
          name: hall.name,
          value: hall.capacity,
        })),
      }
    : null;

  return (
    <main className="bg-background text-foreground">
      {flamesJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(flamesJsonLd) }}
        />
      ) : null}

      <section className="page-section relative min-h-100 overflow-hidden border-b border-border/70">
        <Image
          src={venture.images.hero}
          alt={venture.name}
          fill
          priority
          className="object-cover"
          style={heroAnchoredTop ? { objectPosition: "50% 0%" } : undefined}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 text-white md:py-24">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/35" aria-hidden>
              /
            </span>
            <Link href="/ventures" className="transition-colors hover:text-white">
              Ventures
            </Link>
            <span className="text-white/35" aria-hidden>
              /
            </span>
            <span className="font-medium text-white/90">{venture.name}</span>
          </nav>
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
          <p className="mt-4 inline-flex rounded-md border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-white uppercase sm:text-[11px]">
            {typeLabel}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight md:text-6xl">
            {venture.name}
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">{venture.tagline}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/85">
            <MapPin className="size-4" />
            {venture.city === "Zanzibar"
              ? "Zanzibar, Tanzania"
              : isFlames
                ? "Masaki, Dar es Salaam, Tanzania"
                : "Dar es Salaam, Tanzania"}
          </p>
        </div>
      </section>

      <VentureCtaBar
        phone={venture.contact.phone}
        whatsapp={venture.contact.whatsapp}
        reservePrimary={isHotel ? "Book Your Stay" : "Book A Table"}
        reserveSecondary={isHotel ? "Request availability · rooms & dates" : "Reserve in 30 seconds"}
      />

      {venture.slug === "flames-restaurant" ? (
        <section className="border-b border-border/70 bg-card py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <p className="mb-8 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Available on
            </p>
            <div className="mx-auto grid w-full max-w-md grid-cols-2 items-center gap-6 sm:max-w-none sm:flex sm:flex-row sm:justify-center sm:gap-20 md:gap-28">
              <Link
                href="https://piki.co.tz/store/flames"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 w-full items-center justify-center rounded-lg transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 sm:w-auto"
              >
                <Image
                  src="/logos/PIKI.png"
                  alt="Order on Piki"
                  width={180}
                  height={54}
                  className="h-12 w-full max-w-[160px] object-contain object-center opacity-95 sm:h-12 sm:w-auto sm:max-w-none md:h-14"
                  unoptimized
                />
              </Link>
              <Link
                href="https://web.duka.direct/61022968"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 w-full items-center justify-center rounded-lg transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 sm:w-auto"
              >
                <Image
                  src="/logos/DUKA.png"
                  alt="Order on Duka"
                  width={180}
                  height={54}
                  className="h-12 w-full max-w-[160px] object-contain object-center opacity-95 sm:h-12 sm:w-auto sm:max-w-none md:h-14"
                  unoptimized
                />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {storyForPage ? <FlamesStorySection story={storyForPage} /> : null}

      {isFlames ? (
        <FlamesEventHalls
          halls={flamesContent.eventHalls}
          phone={venture.contact.phone}
          whatsapp={venture.contact.whatsapp}
        />
      ) : null}

      {ventureMenu ? (
        <VentureMenuPreview
          ventureSlug={venture.slug}
          ventureName={venture.name}
          categories={ventureMenu.categories}
        />
      ) : null}

      <section className="page-section mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:grid md:grid-cols-[1.2fr_0.8fr] md:items-start md:gap-x-10 md:gap-y-10 md:py-20">
        {/* Mobile order: About → sidebar → Gallery at bottom. Desktop: About + Gallery col1, sidebar spans rows. */}
        <div className="order-1 md:col-start-1 md:row-start-1">
          <div className="space-y-7">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">At a glance</p>
              <h2 className="mt-2 font-heading text-3xl">
                {isHotel ? `Stay at ${venture.name}` : `Visit ${venture.name}`}
              </h2>
            </div>

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

            <div className="grid gap-2 rounded-2xl border border-border/70 bg-card p-4 sm:grid-cols-2 sm:p-5">
              {quickFactsForPage.map((fact) => (
                <div key={fact.label} className="space-y-0.5">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    {fact.label}
                  </p>
                  <p className="text-sm text-foreground">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-2 space-y-5 md:col-start-2 md:row-start-1 md:row-span-2 md:sticky md:top-24 md:self-start">
          <VentureReservation venture={venture} showTrigger={false} />

          <Card className="border border-border/70 py-4">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Opening Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <OpeningHoursRows hours={venture.hours} />
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
            <CardContent className="space-y-4">
              <MenuCardVisual />
              <Link
                href={`/menu/${venture.slug}#menu-experience-top`}
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

        <div className="order-3 md:col-start-1 md:row-start-2">
          <h2 className="mb-6 font-heading text-3xl">Gallery</h2>
          <VentureGallery images={galleryImages} venueName={venture.name} />
        </div>
      </section>

      <FlamesTestimonials
        testimonials={testimonialsForPage}
        headline={
          isFlames
            ? undefined
            : isHotel
              ? "Loved by travelers who checked in"
              : "What guests are saying"
        }
      />

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

      <OtherExperiencesCarousel ventures={otherVentures} />
    </main>
  );
}
