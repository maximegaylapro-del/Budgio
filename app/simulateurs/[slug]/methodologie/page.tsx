import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSimulator, getAllSimulators } from "@/config/registry";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/shared/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { Icon } from "@/components/shared/icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Une page méthodologie par simulateur qui en déclare une. */
export function generateStaticParams() {
  return getAllSimulators()
    .filter((s) => s.methodology)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getSimulator(slug);
  if (!config?.methodology) return {};
  return buildMetadata({
    title: config.methodology.title,
    description: config.methodology.description,
    canonicalPath: `${config.seo.canonicalPath}/methodologie`,
  });
}

export default async function MethodologyPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getSimulator(slug);
  if (!config?.methodology) notFound();
  const m = config.methodology;

  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Simulateurs", path: "/simulateurs" },
    { name: config.title, path: config.seo.canonicalPath },
    { name: "Méthodologie", path: `${config.seo.canonicalPath}/methodologie` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <SiteHeader />
      <main>
        <Container className="flex max-w-content flex-col gap-14 py-10 pb-24">
          <Breadcrumb items={crumbs.map((c) => ({ name: c.name, href: c.path }))} />

          {/* HERO / H1 */}
          <header className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-[7px] rounded-full border border-accent-border bg-accent-soft px-3 py-[5px] font-mono text-[11.5px] text-accent">
              <Icon name="function-square" size={14} strokeWidth={2} />
              MÉTHODOLOGIE
            </div>
            <h1 className="max-w-[760px] text-[44px] font-semibold leading-[1.06] tracking-tighter text-balance">
              {m.title}
            </h1>
            <div className="max-w-[680px] space-y-3">
              {m.intro.map((p, i) => (
                <p key={i} className="text-[17px] leading-[1.6] text-fg-muted text-pretty">
                  {p}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={config.seo.canonicalPath} className={cn(buttonVariants({ size: "sm" }))}>
                <Icon name="arrow-left" size={16} strokeWidth={2.1} />
                Retour au simulateur
              </Link>
              <span className="font-mono text-[11.5px] text-fg-subtle">Mis à jour · {m.updated}</span>
            </div>
          </header>

          {/* MÉTHODOLOGIE */}
          <section aria-labelledby="method" className="flex flex-col gap-8">
            <h2 id="method" className="text-[26px] font-semibold tracking-tight">
              La méthode de calcul
            </h2>
            {m.method.map((block) => (
              <div key={block.heading} className="flex flex-col gap-3">
                <h3 className="text-[18px] font-semibold tracking-tight">{block.heading}</h3>
                {block.paragraphs.map((p, i) => (
                  <p key={i} className="max-w-[720px] text-[15.5px] leading-[1.65] text-fg-muted text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </section>

          {/* HYPOTHÈSES */}
          <section aria-labelledby="hypotheses">
            <h2 id="hypotheses" className="text-[26px] font-semibold tracking-tight">
              Les hypothèses chiffrées
            </h2>
            <p className="mt-3 max-w-[680px] text-[15px] leading-[1.6] text-fg-muted">
              Toutes ces valeurs sont regroupées dans un seul fichier et facilement modifiables.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              {m.assumptions.map((a, i) => (
                <div
                  key={a.label}
                  className={cn(
                    "grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6",
                    i > 0 && "border-t border-border",
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold">{a.label}</span>
                    {a.note ? <span className="text-[13px] text-fg-subtle">{a.note}</span> : null}
                  </div>
                  <span className="font-mono text-[15px] font-medium text-accent">{a.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* LIMITES */}
          <section aria-labelledby="limites">
            <h2 id="limites" className="text-[26px] font-semibold tracking-tight">
              Les limites de l'estimation
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {m.limits.map((limit, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-border bg-bg-elev p-4">
                  <Icon name="info" size={18} strokeWidth={2} className="mt-0.5 flex-none text-fg-subtle" />
                  <span className="text-[15px] leading-[1.55] text-fg-muted">{limit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* SOURCES */}
          <section aria-labelledby="sources">
            <h2 id="sources" className="text-[26px] font-semibold tracking-tight">
              Les sources
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {config.sources.map((s) => (
                <div key={s.name} className="flex gap-3 rounded-xl border border-border bg-bg-elev p-4">
                  <Icon name="badge-check" size={18} strokeWidth={2} className="mt-0.5 flex-none text-accent" />
                  <div className="flex flex-col gap-1">
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-[15px] font-semibold underline decoration-border-strong underline-offset-2 hover:decoration-accent"
                      >
                        {s.name}
                      </a>
                    ) : (
                      <span className="text-[15px] font-semibold">{s.name}</span>
                    )}
                    {s.scope ? <span className="text-[13px] leading-[1.45] text-fg-muted">{s.scope}</span> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8">
            <h2 className="text-[22px] font-semibold tracking-tight">Prêt à estimer votre situation ?</h2>
            <p className="max-w-[520px] text-[15px] leading-[1.6] text-fg-muted">
              Ajustez chaque hypothèse à votre cas en quelques questions et obtenez une estimation détaillée.
            </p>
            <Link href={config.seo.canonicalPath} className={cn(buttonVariants())}>
              {config.intro.ctaLabel}
              <Icon name="arrow-right" size={17} strokeWidth={2.1} />
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
