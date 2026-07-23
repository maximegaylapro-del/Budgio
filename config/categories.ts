import type { Category, CategoryId } from "@/types/common";

/** Catalogue des catégories de simulateurs. */
export const CATEGORIES: Category[] = [
  { id: "famille", name: "Famille", icon: "baby" },
  { id: "auto", name: "Automobile", icon: "car" },
  { id: "immobilier", name: "Immobilier", icon: "home" },
  { id: "energie", name: "Énergie", icon: "zap" },
  { id: "sante", name: "Santé", icon: "activity" },
  { id: "finance", name: "Finance", icon: "trending-up" },
  { id: "voyage", name: "Voyage", icon: "plane" },
  { id: "animaux", name: "Animaux", icon: "dog" },
];

export const CATEGORY_LABELS: Record<CategoryId, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.name]),
) as Record<CategoryId, string>;
