import type { Metadata } from "next";
import type { SeoConfig } from "@/types/seo";
import { SITE } from "./site";

/** Transforme une SeoConfig de simulateur en Metadata Next complète. */
export function buildMetadata(seo: SeoConfig): Metadata {
  const url = `${SITE.url}${seo.canonicalPath}`;
  const title = seo.title;
  const description = seo.description;
  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: seo.ogTitle ?? title,
      description: seo.ogDescription ?? description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle ?? title,
      description: seo.ogDescription ?? description,
    },
  };
}
