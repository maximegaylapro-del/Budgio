import type { BreakdownItem } from "@/types/calculation";
import type { LucideIconName } from "@/types/common";
import { sum } from "@/lib/formulas";

interface RawItem {
  id: string;
  label: string;
  value: number;
  icon?: LucideIconName;
}

/**
 * Transforme des postes bruts en BreakdownItem normalisés :
 * filtre les zéros, trie décroissant, calcule les % et assigne les couleurs.
 */
export function buildBreakdown(items: RawItem[]): BreakdownItem[] {
  const filtered = items.filter((i) => i.value > 0);
  const total = sum(filtered.map((i) => i.value));
  if (total <= 0) return [];
  return filtered
    .sort((a, b) => b.value - a.value)
    .map((item, index) => ({
      id: item.id,
      label: item.label,
      value: item.value,
      pct: (item.value / total) * 100,
      colorIndex: index,
      icon: item.icon,
    }));
}
