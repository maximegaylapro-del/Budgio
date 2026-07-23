import type { Faq } from "@/types/seo";
import type { AnySimulatorConfig } from "@/types/simulator";
import { SITE } from "./site";

type Json = Record<string, unknown>;

/** Schema FAQPage à partir des Q/R d'un simulateur. */
export function faqJsonLd(faq: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Schema BreadcrumbList. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/** Schema WebApplication pour un simulateur (outil gratuit). */
export function simulatorJsonLd(config: AnySimulatorConfig): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.title,
    description: config.seo.description,
    url: `${SITE.url}${config.seo.canonicalPath}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: SITE.lang,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };
}
