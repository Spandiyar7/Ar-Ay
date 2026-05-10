import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/ui/CTASection";
import { PriceTable } from "@/components/sections/PriceTable";
import { isLocale, type Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "ru";
  const t = await getTranslations({ locale, namespace: "meta" });

  return createMetadata({
    locale,
    path: "/prices",
    title: t("pricesTitle"),
    description: t("pricesDescription")
  });
}

export default async function PricesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "ru") as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("nav.home"), href: "/" },
            { name: t("nav.prices"), href: "/prices" }
          ],
          locale
        )}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.prices"), href: "/prices" }
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
            {t("pricesPage.title")}
          </h1>
          <p className="mt-5 text-xl leading-8 text-slate-700">
            {t("pricesPage.description")}
          </p>
        </div>
        <div className="mt-10">
          <PriceTable locale={locale} />
        </div>
        <p className="mt-6 rounded-2xl bg-gold-100 p-5 text-base leading-7 text-teal-900">
          {t("pricesPage.disclaimer")}
        </p>
      </section>
      <CTASection locale={locale} />
    </>
  );
}
