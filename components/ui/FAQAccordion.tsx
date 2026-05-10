import type { FaqItem } from "@/content/types";
import type { Locale } from "@/i18n/routing";

export function FAQAccordion({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  return (
    <div className="divide-y divide-teal-900/10 rounded-[1.5rem] border border-teal-900/10 bg-white shadow-card">
      {items.map((item) => (
        <details className="group p-6 open:bg-skysoft-50/70" key={item.question[locale]}>
          <summary className="cursor-pointer list-none text-lg font-semibold text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
            <span className="inline-flex w-full items-start justify-between gap-4">
              {item.question[locale]}
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-900 text-white transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            {item.answer[locale]}
          </p>
        </details>
      ))}
    </div>
  );
}
