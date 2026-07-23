import Link from "next/link";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { Container } from "./container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const NAV = [
  { href: "/simulateurs", label: "Simulateurs" },
  { href: "/#categories", label: "Catégories" },
  { href: "/#methode", label: "Méthodologie" },
];

/** En-tête global sticky avec navigation et bascule de thème. */
export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-20 border-b border-border backdrop-blur-[14px] backdrop-saturate-[180%]"
      style={{ background: "var(--nav-bg)" }}
    >
      <Container className="flex items-center justify-between py-4">
        <Brand />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-[13px] py-2 text-[14.5px] font-medium text-fg-muted transition-colors hover:bg-surface hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-[10px]">
          <ThemeToggle />
          <Link
            href="/simulateurs"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Commencer
          </Link>
        </div>
      </Container>
    </header>
  );
}
