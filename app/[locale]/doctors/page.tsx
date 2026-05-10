import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/ui/CTASection";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { doctors } from "@/content/doctors";
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
    path: "/doctors",
    title: t("doctorsTitle"),
    description: t("doctorsDescription")
  });
}

export default async function DoctorsPage({ params }: PageProps) {
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
            { name: t("nav.doctors"), href: "/doctors" }
          ],
          locale
        )}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.doctors"), href: "/doctors" }
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
            {t("doctorsPage.title")}
          </h1>
          <p className="mt-5 text-xl leading-8 text-slate-700">
            {t("doctorsPage.description")}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor, index) => (
            <DoctorCard
              doctor={doctor}
              key={doctor.id}
              locale={locale}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
      <CTASection locale={locale} />
    </>
  );
}
