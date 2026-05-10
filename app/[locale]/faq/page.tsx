import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/ui/CTASection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqItems } from "@/content/faq";
import { isLocale, type Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "ru";
  const t = await getTranslations({ locale, namespace: "meta" });

  return createMetadata({
    locale,
    path: "/faq",
    title: t("faqTitle"),
    description: t("faqDescription")
  });
}

export default async function FAQPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "ru") as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <JsonLd data={faqSchema(faqItems, locale)} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("nav.home"), href: "/" },
            { name: t("nav.faq"), href: "/faq" }
          ],
          locale
        )}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.faq"), href: "/faq" }
        ]}
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
          {t("meta.faqTitle")}
        </h1>
        <p className="mt-5 text-xl leading-8 text-slate-700">
          {t("meta.faqDescription")}
        </p>
        <div className="mt-10">
          <FAQAccordion items={faqItems} locale={locale} />
        </div>
      </section>
      <CTASection locale={locale} />
    </>
  );
}
