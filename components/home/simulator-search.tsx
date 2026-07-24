"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAllSimulators } from "@/config/registry";
import { CATEGORY_LABELS } from "@/config/categories";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils/cn";

/** Normalise (minuscules, sans accents) pour une recherche tolérante. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/**
 * Recherche de simulateurs — vrai combobox qui filtre le registre en direct.
 * Scalable à des centaines de simulateurs (filtrage en mémoire, instantané).
 */
export function SimulatorSearch() {
  const router = useRouter();

  const index = useMemo(
    () =>
      getAllSimulators().map((s) => ({
        slug: s.slug,
        title: s.shortTitle,
        category: CATEGORY_LABELS[s.category],
        icon: s.icon,
        metric: s.card.metricValue,
        haystack: normalize(
          [s.title, s.shortTitle, s.description, CATEGORY_LABELS[s.category], ...(s.seo.keywords ?? [])].join(" "),
        ),
      })),
    [],
  );

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return index.slice(0, 6);
    return index.filter((s) => s.haystack.includes(q)).slice(0, 8);
  }, [query, index]);

  useEffect(() => setActive(0), [query]);

  // Fermer au clic extérieur.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Raccourci ⌘K / Ctrl+K pour focus.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function goTo(slug?: string) {
    if (slug) router.push(`/simulateurs/${slug}`);
    else router.push("/simulateurs");
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[active]?.slug);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={containerRef} className="relative mx-auto mt-9 max-w-[700px] text-left">
      <div className="flex items-center gap-[10px] rounded-xl border border-border-strong bg-bg-elev py-[11px] pl-[22px] pr-[11px] shadow-lg transition-colors focus-within:border-accent-border">
        <Icon name="search" size={22} className="text-fg-subtle" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-controls="simulator-search-results"
          aria-autocomplete="list"
          aria-label="Rechercher un simulateur"
          placeholder="Que souhaitez-vous estimer aujourd’hui ?"
          className="flex-1 border-none bg-transparent text-[18px] text-fg outline-none placeholder:text-fg-subtle"
        />
        <span className="hidden rounded-lg border border-border px-[9px] py-[5px] font-mono text-[12px] text-fg-subtle sm:inline">
          ⌘K
        </span>
        <button
          type="button"
          onClick={() => goTo(results[active]?.slug)}
          className="flex items-center gap-[7px] rounded-lg bg-accent px-[22px] py-3 text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover"
        >
          Estimer
          <Icon name="arrow-right" size={17} strokeWidth={2.1} />
        </button>
      </div>

      {open ? (
        <div
          id="simulator-search-results"
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-xl border border-border bg-bg-elev shadow-lg"
        >
          {results.length ? (
            results.map((r, i) => (
              <Link
                key={r.slug}
                href={`/simulateurs/${r.slug}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors",
                  i === active ? "bg-surface" : "hover:bg-surface",
                )}
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Icon name={r.icon} size={18} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[14.5px] font-semibold">{r.title}</span>
                  <span className="text-[12.5px] text-fg-subtle">{r.category}</span>
                </span>
                <span className="flex-none font-mono text-[12.5px] text-fg-muted">{r.metric}</span>
              </Link>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-[14px] text-fg-muted">
              Aucun simulateur pour « {query} ».
            </div>
          )}
          <Link
            href="/simulateurs"
            className="block border-t border-border px-4 py-2.5 text-center text-[13px] font-semibold text-accent hover:bg-surface"
          >
            Voir tous les simulateurs
          </Link>
        </div>
      ) : null}
    </div>
  );
}
