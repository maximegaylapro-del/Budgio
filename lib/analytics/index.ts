/**
 * Abstraction analytics — aucune dépendance forte à un fournisseur.
 * L'app appelle track() ; l'événement est diffusé vers les fournisseurs
 * présents (Plausible, Google Analytics 4, Microsoft Clarity). Chaque appel
 * est un no-op si le fournisseur n'est pas chargé (IDs d'env absents).
 */
export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const { name, props } = event;

  // Plausible
  window.plausible?.(name, props ? { props } : undefined);

  // Google Analytics 4
  window.gtag?.("event", name, props ?? {});

  // Microsoft Clarity — événement personnalisé
  window.clarity?.("event", name);
}

/** Pose une étiquette de session (utile pour segmenter dans Clarity). */
export function setAnalyticsTag(key: string, value: string): void {
  if (typeof window === "undefined") return;
  window.clarity?.("set", key, value);
}
