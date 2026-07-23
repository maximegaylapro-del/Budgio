import type { Metadata } from "next";
import Link from "next/link";
import { getAllSimulators } from "@/config/registry";
import { getSimulatorsByCategory } from "@/config/registry";
import { CATEGORIES } from "@/config/categories";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/home/hero";
import { Methodology } from "@/components/home/methodology";
import { SimulatorCard } from "@/components/shared/simulator-card";
import { Icon } from "@/components/shared/icon";
import { SITE } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: { absolute: "Budgio — Estimez le coût de vos grandes décisions" },
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  const popular = getAllSimulators().slice(0, 8);

  return (
    <>
      <SiteHeader />
      <main>
        <Container>
          <Hero />

          {/* Simulateurs populaires */}
          <section className="pb-1 pt-6">
            <div className="flex items-baseline justify-between">
              <div className="flex flex-col gap-[3px]">
                <h2 className="text-[22px] font-semibold tracking-tight">Simulateurs populaires</h2>
                <span className="text-[14px] text-fg-muted">
                  Les questions que se posent le plus nos utilisateurs
                </span>
              </div>
              <Link href="/simulateurs" className="flex items-center gap-1 text-[14px] font-medium">
                Tout voir <Icon name="arrow-right" size={15} strokeWidth={2} />
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((config) => (
                <SimulatorCard key={config.slug} config={config} />
              ))}
            </div>
          </section>

          {/* Catégories */}
          <section id="categories" className="pb-1 pt-11">
            <h2 className="mb-5 text-[22px] font-semibold tracking-tight">Explorer par catégorie</h2>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {CATEGORIES.map((cat) => {
                const count = getSimulatorsByCategory(cat.id).length;
                return (
                  <Link
                    key={cat.id}
                    href={`/simulateurs?categorie=${cat.id}`}
                    className="flex items-center gap-[13px] rounded-md border border-border bg-surface px-4 py-[15px] transition-colors hover:border-border-strong hover:bg-surface-2"
                  >
                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-md border border-border bg-bg-elev text-fg">
                      <Icon name={cat.icon} size={19} />
                    </div>
                    <div className="flex flex-col gap-px">
                      <span className="text-[14.5px] font-semibold">{cat.name}</span>
                      <span className="text-[12px] text-fg-subtle">
                        {count} simulateur{count > 1 ? "s" : ""}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <Methodology />

          {/* CTA */}
          <section className="pb-[72px] pt-2">
            <div
              className="relative overflow-hidden rounded-2xl px-8 py-14 text-center shadow-lg"
              style={{ background: "linear-gradient(150deg, var(--accent), #8b7bff)" }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "var(--glow)" }} />
              <div className="relative">
                <h2 className="text-[34px] font-semibold tracking-tight text-white text-balance">
                  Estimez avant de décider.
                </h2>
                <p className="mx-auto mt-3 max-w-[440px] text-[16px] leading-[1.55] text-white/85">
                  Choisissez une question, ajustez vos hypothèses, obtenez une réponse claire.
                </p>
                <Link
                  href="/simulateurs"
                  className="mt-[26px] inline-flex items-center gap-2 rounded-lg bg-white px-[26px] py-[13px] text-[15.5px] font-semibold text-[#1a1730] transition-transform hover:-translate-y-px"
                >
                  Commencer une simulation
                  <Icon name="arrow-right" size={17} strokeWidth={2.1} />
                </Link>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
