import Link from "next/link";
import { SITE } from "@/lib/seo/site";

/** Logo + wordmark Budgio. */
export function Brand({ subtitle = SITE.tagline }: { subtitle?: string | null }) {
  return (
    <Link href="/" className="flex flex-none items-center gap-[11px]">
      <div
        className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] shadow-sm"
        style={{ background: "linear-gradient(140deg, var(--accent), #b4a7ff)" }}
      >
        <span className="text-[19px] font-bold tracking-tight text-white">B</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[18px] font-semibold tracking-tight text-fg">{SITE.name}</span>
        {subtitle ? (
          <span className="mt-0.5 font-mono text-[10.5px] text-fg-subtle">{subtitle}</span>
        ) : null}
      </div>
    </Link>
  );
}
