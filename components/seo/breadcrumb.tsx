import Link from "next/link";
import { Icon } from "@/components/shared/icon";

export interface Crumb {
  name: string;
  href: string;
}

/** Fil d'ariane visible (le schema BreadcrumbList est injecté séparément). */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'ariane" className="flex flex-wrap items-center gap-1.5 text-[13px] text-fg-muted">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1.5">
            {last ? (
              <span aria-current="page" className="text-fg-subtle">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-fg">
                {item.name}
              </Link>
            )}
            {!last ? <Icon name="arrow-right" size={13} className="text-fg-subtle" /> : null}
          </span>
        );
      })}
    </nav>
  );
}
