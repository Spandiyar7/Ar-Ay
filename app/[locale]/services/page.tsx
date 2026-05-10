import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCategories, services } from "@/content/services";
import { isLocale, type Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
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
    path: "/services",
    title: t("servicesTitle"),
    description: t("servicesDescription")
  });
}

export default async function ServicesPage({ params }: PageProps) {
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
            { name: t("nav.services"), href: "/services" }
          ],
          locale
        )}
      />
      {services.map((service) => (
        <JsonLd data={serviceSchema(service, locale)} key={service.slug} />
      ))}
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.services"), href: "/services" }
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
            {t("servicesPage.title")}
          </h1>
          <p className="mt-5 text-xl leading-8 text-slate-700">
            {t("servicesPage.description")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {serviceCategories.map((category) => {
            const items = services.filter((service) => service.category === category.id);
            if (!items.length) {
              return null;
            }

            return (
              <section
                className="rounded-[2rem] border border-teal-900/10 bg-white p-5 shadow-card md:p-8"
                key={category.id}
              >
                <SectionHeading
                  title={category.title[locale]}
                  text={category.description[locale]}
                />
                <div className="mt-8 grid gap-5">
                  {items.map((service) => (
                    <article
                      className="rounded-[1.5rem] border border-teal-900/10 bg-skysoft-50 p-5 md:p-6"
                      key={service.slug}
                    >
                      <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
                        <div>
                          <h3 className="text-2xl font-semibold text-teal-900">
                            {service.title[locale]}
                          </h3>
                          <p className="mt-3 text-base leading-7 text-slate-700">
                            {service.what[locale]}
                          </p>
                          <div className="mt-5 grid gap-5 md:grid-cols-2">
                            <div>
                              <h4 className="font-semibold text-teal-900">
                                {t("servicesPage.when")}
                              </h4>
                              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                                {service.when[locale].map((item) => (
                                  <li className="flex gap-2" key={item}>
                                    <CheckCircle2
                                      aria-hidden="true"
                                      className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
                                    />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-teal-900">
                                {t("servicesPage.process")}
                              </h4>
                              <ol className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                                {service.steps[locale].slice(0, 4).map((item, index) => (
                                  <li className="flex gap-2" key={item}>
                                    <span className="font-semibold text-teal-900">
                                      {index + 1}.
                                    </span>
                                    {item}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-[1.25rem] bg-white p-5 shadow-card">
                          <p className="text-sm font-semibold text-slate-600">
                            {t("pricesPage.price")}
                          </p>
                          <p className="mt-2 text-2xl font-semibold text-teal-900">
                            {t("servicesPage.from")}{" "}
                            {formatKzt(service.priceFrom, locale)}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {t("servicesPage.priceNote")}
                          </p>
                          <ButtonLink className="mt-5 w-full" href="/contacts">
                            {t("actions.book")}
                          </ButtonLink>
                          <ButtonLink
                            className="mt-3 w-full"
                            href={`/services/${service.slug}`}
                            variant="secondary"
                          >
                            {t("actions.viewServices")}
                            <ArrowRight aria-hidden="true" className="h-4 w-4" />
                          </ButtonLink>
                        </div>
                      </div>
                      <div className="mt-6">
                        <FAQAccordion items={service.faq} locale={locale} />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <CTASection locale={locale} />
    </>
  );
}
