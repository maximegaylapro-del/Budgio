import type { MetadataRoute } from "next";
import { getAllSimulators } from "@/config/registry";
import { SITE } from "@/lib/seo/site";

/** Sitemap généré depuis le registry — tout nouveau simulateur y apparaît. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/simulateurs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];
  const simulatorRoutes: MetadataRoute.Sitemap = getAllSimulators().map((config) => ({
    url: `${SITE.url}${config.seo.canonicalPath}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...staticRoutes, ...simulatorRoutes];
}
