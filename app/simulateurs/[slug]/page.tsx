import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSimulator, getAllSlugs } from "@/config/registry";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqJsonLd, breadcrumbJsonLd, simulatorJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/shared/json-ld";
import { SimulatorRenderer } from "@/components/simulator/simulator-renderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pré-génère une page statique par simulateur enregistré. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getSimulator(slug);
  if (!config) return {};
  return buildMetadata(config.seo);
}

export default async function SimulatorPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getSimulator(slug);
  if (!config) notFound();

  const jsonLd = [
    simulatorJsonLd(config),
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Simulateurs", path: "/simulateurs" },
      { name: config.title, path: config.seo.canonicalPath },
    ]),
    ...(config.faq?.length ? [faqJsonLd(config.faq)] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SimulatorRenderer slug={config.slug} />
    </>
  );
}
