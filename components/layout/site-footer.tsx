import Link from "next/link";
import { Container } from "./container";
import { SITE } from "@/lib/seo/site";

const LINKS = [
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/#methode", label: "Méthodologie" },
  { href: "/sources", label: "Sources" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-elev">
      <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <div className="flex items-center gap-[11px]">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-sm"
            style={{ background: "linear-gradient(140deg, var(--accent), #b4a7ff)" }}
          >
            <span className="text-[15px] font-bold text-white">B</span>
          </div>
          <span className="font-mono text-[12px] text-fg-subtle">
            © {new Date().getFullYear()} {SITE.name} · {SITE.tagline}.
          </span>
        </div>
        <nav className="flex flex-wrap gap-5">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] text-fg-muted hover:text-fg">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
