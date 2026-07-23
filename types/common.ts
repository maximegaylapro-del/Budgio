/**
 * Nom d'icône Lucide (kebab-case, ex. "baby", "map-pin").
 * Les configs restent des données pures et sérialisables ; le composant
 * <Icon> résout le nom vers le composant Lucide correspondant.
 */
export type LucideIconName = string;

/** Identifiant de catégorie de simulateur. */
export type CategoryId =
  | "famille"
  | "auto"
  | "immobilier"
  | "energie"
  | "sante"
  | "finance"
  | "voyage"
  | "animaux";

export interface Category {
  id: CategoryId;
  name: string;
  icon: LucideIconName;
}
