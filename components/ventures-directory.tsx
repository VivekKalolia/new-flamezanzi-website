"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Venture } from "@/lib/site-data";

type Props = {
  ventures: Venture[];
};

type TypeFilter = "all" | "restaurant" | "cafe" | "hotel";

export function VenturesDirectory({ ventures }: Props) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [activeSlug, setActiveSlug] = useState<string>(ventures[0]?.slug ?? "");

  const filteredVentures = useMemo(() => {
    if (typeFilter === "all") {
      return ventures;
    }
    return ventures.filter((venture) => venture.type === typeFilter);
  }, [typeFilter, ventures]);

  const activeVenture =
    ventures.find((venture) => venture.slug === activeSlug) ?? filteredVentures[0] ?? ventures[0];

  return (
    <div className="space-y-14">
      <div>
        <div className="mb-8 flex flex-wrap gap-2">
          {(["all", "restaurant", "cafe", "hotel"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setTypeFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm capitalize transition-colors ${
                typeFilter === filter
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredVentures.length === 0 ? (
          <Card className="border border-border/70 py-4">
            <CardContent className="text-muted-foreground">
              No ventures match this filter.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredVentures.map((venture) => (
              <Card
                key={venture.slug}
                className="group overflow-hidden border border-border/70 py-0 shadow-sm transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={venture.images.hero}
                    alt={venture.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardHeader className="pt-6">
                  <CardTitle className="flex items-center justify-between gap-4">
                    <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background/90 p-2 shadow-sm md:size-18">
                      <Image
                        src={venture.logo}
                        alt={`${venture.name} logo`}
                        width={88}
                        height={88}
                        className="h-full w-full rounded-full object-cover"
                        unoptimized
                      />
                    </div>
                    <Badge variant="secondary" className="uppercase">
                      {venture.type}
                    </Badge>
                  </CardTitle>
                  <p className="font-heading text-2xl">{venture.name}</p>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    {venture.area}, {venture.city}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-7">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {venture.shortDescription}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/ventures/${venture.slug}`}
                      className="inline-flex h-9 items-center self-start rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      View Details <ArrowUpRight className="ml-1 size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setActiveSlug(venture.slug)}
                      className="inline-flex h-9 items-center self-start rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      View on Map
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {activeVenture ? (
        <section className="space-y-4">
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
            className="inline-flex h-9 items-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            Open in Google Maps
          </Link>
        </section>
      ) : null}
    </div>
  );
}
