import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

import { SITEMAP_ROUTES } from "@/lib/site-map";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map((route) => ({
    url: new URL(route, SITE.url).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route === "/sitemap/"
          ? 0.4
          : route.startsWith("/guides")
            ? 0.6
            : 0.8,
  }));
}
