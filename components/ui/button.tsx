import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        primary: "bg-accent text-on-accent shadow-sm hover:bg-accent-hover",
        secondary: "border border-border-strong text-fg hover:bg-surface",
        ghost: "text-fg-muted hover:text-fg hover:bg-surface",
        outline: "border border-border bg-bg-elev text-fg hover:border-border-strong",
      },
      size: {
        md: "h-11 px-5 text-[14.5px] rounded-md",
        lg: "h-[52px] px-7 text-base rounded-lg",
        sm: "h-9 px-4 text-sm rounded-md",
        icon: "h-9 w-9 rounded-md p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
