"use client";

import Link from "next/link";
import { useConsent } from "./consent-provider";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";

/** Bandeau de consentement RGPD — les scripts analytics attendent le choix. */
export function ConsentBanner() {
  const { consent, mounted, grant, deny } = useConsent();

  // Rien tant que non monté (SSR) ou si un choix a déjà été fait.
  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement à la mesure d'audience"
      className="fixed inset-x-0 bottom-0 z-40 p-4 sm:bottom-5 sm:left-1/2 sm:right-auto sm:w-[min(560px,calc(100vw-2rem))] sm:-translate-x-1/2 sm:p-0"
    >
      <div className="rounded-xl border border-border bg-bg-elev p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-accent-soft text-accent">
            <Icon name="shield-check" size={18} strokeWidth={2} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[15px] font-semibold">Un peu de mesure d'audience ?</span>
            <p className="text-[13.5px] leading-[1.5] text-fg-muted">
              Nous utilisons des outils de statistiques anonymisées (Google Analytics, Microsoft
              Clarity) pour comprendre l'usage et améliorer les simulateurs. Rien n'est chargé sans
              votre accord.{" "}
              <Link href="/confidentialite" className="underline underline-offset-2 hover:text-fg">
                En savoir plus
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" size="sm" onClick={deny}>
            Refuser
          </Button>
          <Button size="sm" onClick={grant}>
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
