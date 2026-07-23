import type { Metadata } from "next";
import { getAllSimulators } from "@/config/registry";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/layout/container";
import { SimulatorCard } from "@/components/shared/simulator-card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Tous les simulateurs de coût",
  description:
    "Découvrez tous les simulateurs Budgio : coût d'un enfant, d'une voiture, d'une maison… Des estimations chiffrées basées sur des sources officielles.",
  canonicalPath: "/simulateurs",
});

export default function SimulatorsIndexPage() {
  const simulators = getAllSimulators();
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="py-14">
          <h1 className="text-[42px] font-semibold tracking-tighter text-balance">Tous les simulateurs</h1>
          <p className="mt-3 max-w-[560px] text-[17px] leading-[1.55] text-fg-muted">
            Choisissez une question, ajustez vos hypothèses, obtenez une réponse claire.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
            {simulators.map((config) => (
              <SimulatorCard key={config.slug} config={config} />
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
