import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AppointmentForm } from "@/components/AppointmentForm";
import { ContactMap } from "@/components/ContactMap";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConcernCards } from "@/components/sections/ConcernCards";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { services } from "@/content/services";
import { isLocale, type Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import { formatKzt } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "ru";
  const t = await getTranslations({ locale, namespace: "meta" });

  return createMetadata({
    locale,
    title: t("homeTitle"),
    description: t("homeDescription")
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "ru") as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />
      <Hero locale={locale} />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading align="center" title={t("home.concernsTitle")} />
        <Reveal className="mt-10">
          <ConcernCards />
        </Reveal>
      </section>

      <section className="bg-ink-950 py-24 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t("home.servicesTitle")}
            className="[&_h2]:text-white [&_p]:text-white/72"
          />
          <Reveal className="mt-10">
            <ServicesGrid locale={locale} services={services.slice(0, 6)} />
          </Reveal>
          <ButtonLink className="mt-10" href="/services">
            {t("actions.allServices")}
          </ButtonLink>
        </div>
      </section>

      <section className="bg-skysoft-50 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("home.pricesTitle")} />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <article
                className="rounded-[1.5rem] bg-white p-5 shadow-card"
                key={service.slug}
              >
                <p className="text-sm font-semibold text-slate-500">
                  {t("servicesPage.from")}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-ink-950">
                  {service.title[locale]}
                </h3>
                <p className="mt-4 text-2xl font-semibold text-teal-800">
                  {formatKzt(service.priceFrom, locale)}
                </p>
                <ButtonLink className="mt-5 w-full" href="/contacts" variant="secondary">
                  {t("actions.book")}
                </ButtonLink>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            {t("pricesPage.disclaimer")}
          </p>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeading title={t("home.contactsTitle")} />
            <div className="mt-10">
              <ContactMap locale={locale} />
            </div>
          </div>
          <AppointmentForm compact />
        </div>
      </section>
    </>
  );
}
