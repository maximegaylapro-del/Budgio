import { cn } from "@/lib/utils/cn";

/** Conteneur centré, largeur max 1200px, padding horizontal responsive. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-page px-5 sm:px-8", className)}>{children}</div>;
}
