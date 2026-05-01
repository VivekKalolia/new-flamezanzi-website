"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

import { VentureTypeBadge } from "@/components/venture-type-badge";
import { VentureLocationMapSection } from "@/components/venture-location-map-section";
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

      {ventures.length > 0 ? (
        <VentureLocationMapSection
          ventures={ventures}
          activeSlug={activeSlug}
          onActiveSlugChange={setActiveSlug}
        />
      ) : null}
    </div>
  );
}
