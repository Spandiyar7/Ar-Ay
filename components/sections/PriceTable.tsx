import { useTranslations } from "next-intl";

import { getPriceGroups } from "@/content/prices";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { formatKzt } from "@/lib/utils";

export function PriceTable({ locale }: { locale: Locale }) {
  const t = useTranslations("pricesPage");
  const actions = useTranslations("actions");

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-teal-900/10 bg-white shadow-card">
      {getPriceGroups().map(({ category, items }) =>
        items.length > 0 ? (
          <section
            className="border-b border-teal-900/10 last:border-b-0"
            key={category.id}
          >
            <div className="bg-skysoft-50 px-5 py-4">
              <h2 className="text-xl font-semibold text-teal-900">
                {category.title[locale]}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {category.description[locale]}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white text-teal-900">
                  <tr>
                    <th className="px-5 py-4 font-semibold">{t("service")}</th>
                    <th className="px-5 py-4 font-semibold">{t("price")}</th>
                    <th className="px-5 py-4 font-semibold">{t("note")}</th>
                    <th className="px-5 py-4 font-semibold">{actions("book")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/10">
                  {items.map((item) => (
                    <tr key={item.serviceSlug}>
                      <td className="px-5 py-4 font-medium text-teal-900">
                        <Link
                          href={`/services/${item.serviceSlug}`}
                          className="hover:underline"
                        >
                          {item.title[locale]}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-slate-800">
                        {formatKzt(item.priceFrom, locale)}
                      </td>
                      <td className="px-5 py-4 text-slate-700">{item.note[locale]}</td>
                      <td className="px-5 py-4">
                        <Link
                          className="rounded-full bg-teal-900 px-4 py-2 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                          href="/contacts"
                        >
                          {actions("book")}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}
