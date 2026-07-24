"use client";

import type { Answers, CalculationResult } from "@/types/calculation";
import type { AnySimulatorConfig } from "@/types/simulator";
import { ResultHero } from "@/components/results/result-hero";
import { TakeawaysCard } from "@/components/results/takeaways-card";
import { BreakdownPanel } from "@/components/results/breakdown-panel";
import { RecommendationsPanel } from "@/components/results/recommendations-panel";
import { SourcesBar } from "@/components/results/sources-bar";
import { SeriesChart } from "@/components/charts/series-chart";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";

interface ResultViewProps {
  config: AnySimulatorConfig;
  result: CalculationResult;
  answers: Answers;
  onRestart: () => void;
}

/** Vue de résultat générique — pilotée par config.result.blocks. */
export function ResultView({ config, result, answers, onRestart }: ResultViewProps) {
  const subtitle = config.result.heroSubtitle?.(answers);
  const methodologyHref = config.methodology ? `${config.seo.canonicalPath}/methodologie` : undefined;

  return (
    <div className="mx-auto max-w-content animate-fadeIn px-7 py-11">
      <div className="flex flex-col gap-6">
        {config.result.blocks.map((block) => {
          switch (block) {
            case "hero":
              return (
                <ResultHero
                  key={block}
                  result={result}
                  subtitle={subtitle}
                  share={{ slug: config.slug, title: config.title, answers }}
                />
              );
            case "takeaways":
              return <TakeawaysCard key={block} takeaways={result.takeaways ?? []} />;
            case "breakdown":
              return <BreakdownPanel key={block} result={result} />;
            case "charts":
              return result.series?.length ? (
                <div key={block} className="flex flex-col gap-6">
                  {result.series.map((s) => (
                    <div key={s.id} className="rounded-2xl border border-border bg-bg-elev p-7">
                      <span className="text-[15px] font-semibold">{s.label}</span>
                      <div className="mt-6">
                        <SeriesChart series={s} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null;
            case "recommendations":
              return <RecommendationsPanel key={block} recommendations={result.recommendations ?? []} />;
            case "sources":
              return <SourcesBar key={block} sources={config.sources} methodologyHref={methodologyHref} />;
            default:
              return null;
          }
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" onClick={onRestart}>
          <Icon name="rotate-ccw" size={17} strokeWidth={2} />
          Recommencer
        </Button>
        <Button variant="outline">
          <Icon name="git-compare" size={17} strokeWidth={2} />
          Comparer un scénario
        </Button>
      </div>
    </div>
  );
}
