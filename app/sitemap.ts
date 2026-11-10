import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const routes = [
  "/",
  "/cm-to-inches/",
  "/cm-to-in/",
  "/inches-to-cm/",
  "/cm-to-feet/",
  "/cm-to-feet-inches/",
  "/cm-to-inches-chart/",
  "/mm-to-inches/",
  "/meters-to-feet/",
  "/guides/",
  "/guides/how-to-convert-cm-to-inches/",
  "/guides/cm-to-feet-and-inches/",
  "/guides/inches-vs-centimeters/",
  "/about/",
  "/contact/",
  "/privacy-policy/",
  "/terms/",
  "/disclaimer/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, SITE.url).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/guides") ? 0.6 : 0.8,
  }));
}
