import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, MapPin, Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VentureReservation } from "@/components/venture-reservation";
import { getVentureGalleryImages } from "@/lib/local-gallery";
import { getVentureBySlug, ventures } from "@/lib/site-data";

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

  return (
    <main className="bg-background text-foreground">
      <section className="page-section relative min-h-100 overflow-hidden border-b border-border/70">
        <Image src={venture.images.hero} alt={venture.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-20 text-white md:py-24">
          <Image
            src={venture.logo}
            alt={`${venture.name} logo`}
            width={170}
            height={46}
            className="h-10 w-auto"
          />
          <Badge variant="outline" className="border-white/40 bg-black/20 text-white">
            {venture.type}
          </Badge>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl">{venture.name}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{venture.tagline}</p>
        </div>
      </section>

      <section className="page-section mx-auto grid w-full max-w-6xl gap-6 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <Card className="border border-border/70 py-5">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="leading-relaxed text-muted-foreground">{venture.fullDescription}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Cuisine</p>
                <div className="flex flex-wrap gap-2">
                  {venture.cuisine.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Features</p>
                <div className="flex flex-wrap gap-2">
                  {venture.features.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="size-4" /> {venture.area}, {venture.city}
              </p>
              <p className="flex items-center gap-2">
                <Clock3 className="size-4" /> Hours: {venture.hours}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4" /> {venture.contact.phone}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/70 py-5">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <VentureReservation venture={venture} />
            <Link
              href={`/menu/${venture.slug}`}
              className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              View Interactive Menu
            </Link>
            <Link
              href={`https://wa.me/${venture.contact.whatsapp.replace("+", "")}`}
              target="_blank"
              className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              Chat on WhatsApp
            </Link>
            <Link
              href={venture.menuUrl}
              className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Download PDF Menu
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 pb-20 md:pb-24">
        <h2 className="mb-8 font-heading text-4xl">Gallery</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {galleryImages.map((image) => (
            <div key={image} className="relative min-h-72 overflow-hidden rounded-2xl border border-border/70">
              <Image src={image} alt={venture.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="page-section bg-card py-20 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="mb-8 font-heading text-4xl">Location</h2>
          <div className="overflow-hidden rounded-2xl border border-border/70">
            <iframe
              title={`${venture.name} map`}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${venture.coordinates.lat},${venture.coordinates.lng}&z=15&output=embed`}
            />
          </div>
        </div>
      </section>

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
