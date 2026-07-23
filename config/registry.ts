import type { AnySimulatorConfig } from "@/types/simulator";
import { SIMULATORS } from "./simulators";

/**
 * Registre central des simulateurs.
 * Chaque simulateur s'enregistre via config/simulators/index.ts — le noyau
 * (routes, sitemap, homepage) itère ce registre sans jamais connaître un
 * simulateur en particulier.
 */
const registry: Map<string, AnySimulatorConfig> = new Map(
  SIMULATORS.map((config) => [config.slug, config]),
);

export function getSimulator(slug: string): AnySimulatorConfig | undefined {
  return registry.get(slug);
}

export function getAllSimulators(): AnySimulatorConfig[] {
  return [...registry.values()];
}

export function getAllSlugs(): string[] {
  return [...registry.keys()];
}

export function getSimulatorsByCategory(category: string): AnySimulatorConfig[] {
  return getAllSimulators().filter((s) => s.category === category);
}
