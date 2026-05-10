import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
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
    path: "/reviews",
    title: t("reviewsTitle"),
    description: t("reviewsDescription")
  });
}

export default async function ReviewsPage({ params }: PageProps) {
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
            { name: t("nav.reviews"), href: "/reviews" }
          ],
          locale
        )}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.reviews"), href: "/reviews" }
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
            {t("reviewsPage.title")}
          </h1>
          <p className="mt-5 text-xl leading-8 text-slate-700">
            {t("reviewsPage.description")}
          </p>
        </div>
        <div className="mt-10">
          <ReviewsSection locale={locale} />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contacts">{t("actions.writeWhatsApp")}</ButtonLink>
          <ButtonLink href="/contacts" variant="secondary">
            {t("actions.leaveReview")}
          </ButtonLink>
        </div>
      </section>
      <CTASection locale={locale} />
    </>
  );
}
