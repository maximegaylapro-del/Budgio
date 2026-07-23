"use client";

import Link from "next/link";
import type { Progress } from "@/lib/engine/progress";
import { Brand } from "@/components/layout/brand";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Icon } from "@/components/shared/icon";

interface SimulatorTopbarProps {
  progress: Progress;
  showProgress: boolean;
  /** Si fourni, la croix ferme l'overlay ; sinon elle renvoie à l'accueil. */
  onClose?: () => void;
}

/** Barre supérieure du wizard : progression + fermeture. */
export function SimulatorTopbar({ progress, showProgress, onClose }: SimulatorTopbarProps) {
  return (
    <header
      className="sticky top-0 z-20 border-b border-border backdrop-blur-[14px] backdrop-saturate-[180%]"
      style={{ background: "var(--nav-bg)" }}
    >
      <div className="mx-auto flex max-w-content items-center gap-5 px-7 py-3.5">
        <Brand subtitle={null} />
        {showProgress ? (
          <div className="flex flex-1 items-center gap-[14px]">
            <ProgressBar value={progress.pct} label={progress.label} className="max-w-[420px] flex-1" />
            <span className="whitespace-nowrap font-mono text-[12px] text-fg-muted">{progress.label}</span>
          </div>
        ) : null}
        <div className="ml-auto flex items-center gap-[10px]">
          <span className="hidden items-center gap-[6px] font-mono text-[12px] text-fg-subtle sm:flex">
            <Icon name="check" size={13} strokeWidth={2.4} className="text-success" />
            Enregistré
          </span>
          <ThemeToggle />
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le simulateur"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-elev text-fg-muted hover:border-border-strong"
            >
              <Icon name="x" size={18} strokeWidth={2} />
            </button>
          ) : (
            <Link
              href="/"
              aria-label="Fermer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-elev text-fg-muted hover:border-border-strong"
            >
              <Icon name="x" size={18} strokeWidth={2} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
