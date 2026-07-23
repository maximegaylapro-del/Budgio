import * as React from "react";
import { cn } from "@/lib/utils/cn";

/** Surface élevée standard du design system (bordure fine, rayon xl). */
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border border-border bg-bg-elev", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";
