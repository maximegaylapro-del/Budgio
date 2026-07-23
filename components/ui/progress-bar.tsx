import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  label?: string;
}

/** Barre de progression accessible (role progressbar). */
export function ProgressBar({ value, className, label }: ProgressBarProps) {
  const pct = Math.min(Math.max(value, 0), 100);
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("h-1.5 overflow-hidden rounded-full bg-surface", className)}
    >
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
