/**
 * Abstraction analytics — aucune dépendance forte à Plausible.
 * L'app appelle track(); l'implémentation est remplaçable.
 */
export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

type Plausible = (event: string, options?: { props?: Record<string, unknown> }) => void;

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as { plausible?: Plausible }).plausible;
  if (typeof plausible === "function") {
    plausible(event.name, event.props ? { props: event.props } : undefined);
  }
}
