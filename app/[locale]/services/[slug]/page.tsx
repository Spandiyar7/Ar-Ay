import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DoctorCard } from "@/components/sections/DoctorCard";
import { getDoctorsByIds } from "@/content/doctors";
import { getCategoryById, getServiceBySlug, services } from "@/content/services";
import { isLocale, type Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { formatKzt } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return services.flatMap((service) =>
    (["ru", "kk"] as const).map((locale) => ({
      locale,
      slug: service.slug
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "ru";
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return createMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: service.title[locale],
    description: service.shortDescription[locale],
    image: service.image
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "ru") as Locale;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const t = await getTranslations({ locale });
  const category = getCategoryById(service.category);
  const doctors = getDoctorsByIds(service.doctorIds);

  return (
    <>
      <JsonLd data={serviceSchema(service, locale)} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("nav.home"), href: "/" },
            { name: t("nav.services"), href: "/services" },
            { name: service.title[locale], href: `/services/${service.slug}` }
          ],
          locale
        )}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.services"), href: "/services" },
          { label: service.title[locale], href: `/services/${service.slug}` }
        ]}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          {category ? (
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-500">
              {category.title[locale]}
            </p>
          ) : null}
          <h1 className="mt-4 text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
            {service.title[locale]}
          </h1>
          <p className="mt-5 text-xl leading-8 text-slate-700">
            {service.shortDescription[locale]}
          </p>
          <p className="mt-5 text-base leading-7 text-slate-700">
            {service.what[locale]}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contacts">{t("actions.book")}</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              {t("actions.backToServices")}
            </ButtonLink>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-teal-900/10 bg-white shadow-soft">
          <div className="relative aspect-[4/3]">
            <Image
              alt={service.title[locale]}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              src={service.image}
            />
          </div>
          <div className="p-6">
            <p className="text-sm font-semibold text-slate-600">
              {t("pricesPage.price")}
            </p>
            <p className="mt-2 text-3xl font-semibold text-teal-900">
              {t("servicesPage.from")} {formatKzt(service.priceFrom, locale)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {t("servicesPage.priceNote")}
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              {service.duration[locale]}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white/70 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading title={t("servicesPage.symptoms")} />
            <ul className="mt-6 grid gap-3">
              {service.symptoms[locale].map((item) => (
                <li
                  className="flex gap-3 rounded-2xl bg-white p-4 text-slate-700 shadow-card"
                  key={item}
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-gold-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={t("servicesPage.steps")} />
            <ol className="mt-6 grid gap-3">
              {service.steps[locale].map((item, index) => (
                <li
                  className="flex gap-3 rounded-2xl bg-white p-4 shadow-card"
                  key={item}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-900 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-slate-700">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title={t("servicesPage.specialist")} />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.id} locale={locale} />
          ))}
        </div>
      </section>

      <section className="bg-skysoft-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("servicesPage.faq")} />
          <div className="mt-8">
            <FAQAccordion items={service.faq} locale={locale} />
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
