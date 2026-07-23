import type { Faq } from "@/types/seo";
import { Icon } from "@/components/shared/icon";

/**
 * FAQ visible et indexable (accordéon natif <details>, sans JS).
 * Le contenu correspond exactement au schema FAQPage injecté en JSON-LD.
 */
export function FaqSection({ faq }: { faq: Faq[] }) {
  if (!faq.length) return null;
  return (
    <section aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-[26px] font-semibold tracking-tight">
        Questions fréquentes
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-border bg-bg-elev px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold">
              {item.question}
              <Icon
                name="arrow-right"
                size={18}
                className="flex-none text-fg-subtle transition-transform group-open:rotate-90"
              />
            </summary>
            <p className="mt-3 text-[15px] leading-[1.6] text-fg-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
