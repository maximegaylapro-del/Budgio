"use client";

import { useConsent } from "./consent-provider";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";

const LABELS = { granted: "accepté", denied: "refusé" } as const;

/** Permet de consulter et modifier son choix de consentement (RGPD). */
export function ManageConsentButton() {
  const { consent, mounted, grant, deny } = useConsent();
  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-bg-elev p-5">
      <div className="flex items-center gap-2 text-[14px]">
        <Icon name="shield-check" size={16} strokeWidth={2} className="text-accent" />
        <span className="text-fg-muted">
          Choix actuel :{" "}
          <span className="font-semibold text-fg">
            {consent ? LABELS[consent] : "non défini"}
          </span>
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={consent === "granted" ? "primary" : "outline"} onClick={grant}>
          Accepter la mesure d'audience
        </Button>
        <Button size="sm" variant={consent === "denied" ? "primary" : "outline"} onClick={deny}>
          La refuser
        </Button>
      </div>
    </div>
  );
}
