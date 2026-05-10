import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import type { Service } from "@/content/services";
import { getCategoryById } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { formatKzt } from "@/lib/utils";

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations("servicesPage");
  const category = getCategoryById(service.category);

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-teal-900/10 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <Link
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
        href={`/services/${service.slug}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-skysoft-100">
          <Image
            alt={service.title[locale]}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={service.image}
          />
        </div>
        <div className="p-5">
          {category ? (
            <p className="text-sm font-semibold text-gold-500">
              {category.title[locale]}
            </p>
          ) : null}
          <h3 className="mt-2 text-2xl font-semibold text-ink-950">
            {service.title[locale]}
          </h3>
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-base font-semibold text-teal-800">
              {t("from")} {formatKzt(service.priceFrom, locale)}
            </p>
            <ArrowRight
              aria-hidden="true"
              className="h-5 w-5 text-teal-900 transition group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
