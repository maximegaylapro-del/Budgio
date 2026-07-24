"use client";

import { useState } from "react";
import type { Answers, CalculationResult } from "@/types/calculation";
import { encodeAnswers } from "@/lib/utils/share";
import { formatCurrency } from "@/lib/utils/format";
import { track } from "@/lib/analytics";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils/cn";

interface ResultShareActionsProps {
  slug: string;
  title: string;
  answers: Answers;
  result: CalculationResult;
}

/** Cluster de partage viral, placé juste sous le montant. */
export function ResultShareActions({ slug, title, answers, result }: ResultShareActionsProps) {
  const [copied, setCopied] = useState(false);

  function shareUrl(): string {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/simulateurs/${slug}?s=${encodeAnswers(answers)}`;
  }

  function imageUrl(): string {
    const total = Math.round(result.headline.value);
    const monthly = Math.round(result.metrics.find((m) => m.id === "monthly")?.value ?? 0);
    const years = Math.round(result.metrics.find((m) => m.id === "duration")?.value ?? 0);
    const params = new URLSearchParams({
      title,
      total: String(total),
      monthly: String(monthly),
      years: String(years),
    });
    return `/api/share-image?${params.toString()}`;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      track({ name: "share_copy", props: { slug } });
    } catch {
      /* clipboard indisponible */
    }
  }

  async function nativeShare() {
    const url = shareUrl();
    const text = `${title} ${formatCurrency(result.headline.value)} — estimé sur Budgio`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        track({ name: "share_native", props: { slug } });
      } catch {
        /* partage annulé */
      }
    } else {
      copyLink();
    }
  }

  function downloadImage() {
    const a = document.createElement("a");
    a.href = imageUrl();
    a.download = "ma-simulation-budgio.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    track({ name: "share_image", props: { slug } });
  }

  const pill =
    "inline-flex items-center gap-2 rounded-full border border-border bg-bg-elev px-4 py-2 text-[13.5px] font-semibold text-fg transition-colors hover:border-border-strong";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button type="button" onClick={copyLink} className={cn(pill, copied && "border-accent text-accent")}>
        <Icon name={copied ? "check" : "link"} size={16} strokeWidth={2} />
        {copied ? "Lien copié !" : "Copier le lien"}
      </button>
      <button type="button" onClick={nativeShare} className={pill}>
        <Icon name="share-2" size={16} strokeWidth={2} />
        Partager
      </button>
      <button type="button" onClick={downloadImage} className={pill}>
        <Icon name="download" size={16} strokeWidth={2} />
        Télécharger en image
      </button>
    </div>
  );
}
