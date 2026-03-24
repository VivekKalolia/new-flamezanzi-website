import type { MetadataRoute } from "next";

import { ventures } from "@/lib/site-data";

const baseUrl = "https://flamezanzi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/ventures",
    "/gallery",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = ventures.flatMap((venture) => [
    {
      url: `${baseUrl}/ventures/${venture.slug}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/menu/${venture.slug}`,
      lastModified: new Date(),
    },
  ]);

  return [...staticRoutes, ...dynamicRoutes];
}
