import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSimulator, getAllSlugs } from "@/config/registry";
import { CATEGORY_LABELS } from "@/config/categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqJsonLd, breadcrumbJsonLd, simulatorJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/shared/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { FaqSection } from "@/components/seo/faq-section";
import { MethodologySection } from "@/components/seo/methodology-section";
import { HowItWorks } from "@/components/simulator/how-it-works";
import { RelatedSimulators } from "@/components/simulator/related-simulators";
import { SimulatorLauncher } from "@/components/simulator/simulator-launcher";
import { Icon } from "@/components/shared/icon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Simulateurs", path: "/simulateurs" },
    { name: config.title, path: config.seo.canonicalPath },
  ];

  const jsonLd = [
    simulatorJsonLd(config),
    breadcrumbJsonLd(crumbs),
    ...(config.faq?.length ? [faqJsonLd(config.faq)] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <main>
        <Container className="flex flex-col gap-16 py-10 pb-24">
          <Breadcrumb items={crumbs.map((c) => ({ name: c.name, href: c.path }))} />

          {/* HERO / H1 */}
          <section className="relative overflow-hidden">
            <div className="flex flex-col items-start gap-5">
              <div className="inline-flex items-center gap-[7px] rounded-full border border-accent-border bg-accent-soft px-3 py-[5px] font-mono text-[11.5px] text-accent">
                <Icon name={config.icon} size={14} strokeWidth={2} />
                {config.intro.eyebrow} · {CATEGORY_LABELS[config.category]}
              </div>
              <h1 className="max-w-[760px] text-[46px] font-semibold leading-[1.05] tracking-tighter text-balance">
                {config.title}
              </h1>
              <p className="max-w-[600px] text-[18px] leading-[1.55] text-fg-muted text-pretty">
                {config.intro.description}
              </p>
              <div className="flex flex-wrap gap-[10px]">
                {config.intro.meta.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center gap-[7px] rounded-md border border-border bg-surface px-[14px] py-2 text-[13px] text-fg-muted"
                  >
                    <Icon name={m.icon} size={15} strokeWidth={2} className="text-accent" />
                    {m.label}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <SimulatorLauncher slug={config.slug} label={config.intro.ctaLabel} />
                <span className="flex items-center gap-2 text-[13.5px] text-fg-muted">
                  <span className="font-mono text-fg-subtle">{config.card.metricLabel} :</span>
                  <span className="font-semibold text-fg">{config.card.metricValue}</span>
                </span>
              </div>
              {config.intro.footnote ? (
                <p className="font-mono text-[11.5px] text-fg-subtle">{config.intro.footnote}</p>
              ) : null}
            </div>
          </section>

          <HowItWorks />
          <MethodologySection
            sources={config.sources}
            methodologyHref={config.methodology ? `${config.seo.canonicalPath}/methodologie` : undefined}
          />
          {config.faq?.length ? <FaqSection faq={config.faq} /> : null}
          <RelatedSimulators currentSlug={config.slug} category={config.category} />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
