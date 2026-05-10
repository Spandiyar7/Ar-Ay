import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/ui/CTASection";
import { LegalNotice } from "@/components/ui/LegalNotice";
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
    path: "/privacy",
    title: t("privacyTitle"),
    description: t("defaultDescription")
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "ru") as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const items = t.raw("legal.privacyItems") as string[];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("nav.home"), href: "/" },
            { name: t("meta.privacyTitle"), href: "/privacy" }
          ],
          locale
        )}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("meta.privacyTitle"), href: "/privacy" }
        ]}
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
          {t("meta.privacyTitle")}
        </h1>
        <p className="mt-6 text-xl leading-8 text-slate-700">{t("legal.privacyIntro")}</p>
        <ul className="mt-8 grid gap-4">
          {items.map((item) => (
            <li
              className="rounded-2xl bg-white p-5 leading-7 text-slate-700 shadow-card"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <LegalNotice locale={locale} />
        </div>
      </section>
      <CTASection locale={locale} />
    </>
  );
}
