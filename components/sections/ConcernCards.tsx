import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

import { concerns } from "@/content/concerns";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function ConcernCards() {
  const locale = useLocale() as Locale;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {concerns.map((item) => (
        <Link
          className="group flex min-h-24 items-center justify-between gap-4 rounded-[1.5rem] border border-teal-900/10 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-teal-900/20 hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
          href={item.href}
          key={item.key}
        >
          <span className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-500 text-xl font-semibold text-ink-950">
              {item.title[locale].slice(0, 1)}
            </span>
            <h3 className="text-xl font-semibold text-ink-950">{item.title[locale]}</h3>
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800">
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition group-hover:translate-x-1"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}
