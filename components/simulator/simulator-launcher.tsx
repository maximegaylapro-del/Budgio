"use client";

import { useEffect, useMemo, useState } from "react";
import { getSimulator } from "@/config/registry";
import { decodeAnswers } from "@/lib/utils/share";
import { SimulatorFlow } from "./simulator-flow";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils/cn";

interface SimulatorLauncherProps {
  slug: string;
  label?: string;
  className?: string;
}

/**
 * Bouton de lancement + overlay plein écran du simulateur.
 * Permet à la page /simulateurs/[slug] d'être une vraie page de contenu SEO
 * (rendue serveur) tout en offrant l'outil immersif à la demande.
 */
export function SimulatorLauncher({ slug, label = "Commencer l'estimation", className }: SimulatorLauncherProps) {
  const [open, setOpen] = useState(false);
  const config = getSimulator(slug);

  // Lien partagé : réponses encodées dans ?s= → on ouvre direct au résultat.
  const seededAnswers = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    const param = new URLSearchParams(window.location.search).get("s");
    return param ? (decodeAnswers(param) ?? undefined) : undefined;
  }, []);

  useEffect(() => {
    if (seededAnswers) setOpen(true);
  }, [seededAnswers]);

  // Verrouille le scroll de la page sous l'overlay.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Fermeture au clavier (Échap).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!config) return null;

  return (
    <>
      <Button size="lg" className={cn("shadow-md", className)} onClick={() => setOpen(true)}>
        {label}
        <Icon name="arrow-right" size={18} strokeWidth={2.1} />
      </Button>

      {open ? (
        <div role="dialog" aria-modal="true" aria-label={config.title} className="fixed inset-0 z-50 animate-fadeIn overflow-y-auto bg-bg">
          <SimulatorFlow config={config} seededAnswers={seededAnswers} onClose={() => setOpen(false)} />
        </div>
      ) : null}
    </>
  );
}
