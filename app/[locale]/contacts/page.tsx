import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

import { AppointmentForm } from "@/components/AppointmentForm";
import { ContactMap } from "@/components/ContactMap";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/ui/CTASection";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { clinic } from "@/content/clinic";
import { isLocale, type Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "ru";
  const t = await getTranslations({ locale, namespace: "meta" });

  return createMetadata({
    locale,
    path: "/contacts",
    title: t("contactsTitle"),
    description: t("contactsDescription")
  });
}

export default async function ContactsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "ru") as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const contactItems = [
    {
      label: t("contactsPage.address"),
      value: clinic.contacts.address[locale],
      icon: MapPin
    },
    { label: t("contactsPage.phone"), value: clinic.contacts.phoneDisplay, icon: Phone },
    {
      label: t("contactsPage.additionalPhone"),
      value: clinic.contacts.additionalPhoneDisplay,
      icon: Phone
    },
    {
      label: t("contactsPage.whatsapp"),
      value: clinic.contacts.phoneDisplay,
      icon: MessageCircle
    },
    { label: t("contactsPage.hours"), value: clinic.contacts.hours[locale], icon: Clock }
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("nav.home"), href: "/" },
            { name: t("nav.contacts"), href: "/contacts" }
          ],
          locale
        )}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.contacts"), href: "/contacts" }
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <h1 className="text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
            {t("contactsPage.title")}
          </h1>
          <p className="mt-5 text-xl leading-8 text-slate-700">
            {t("contactsPage.description")}
          </p>
          <p className="mt-6 rounded-2xl bg-gold-100 p-4 text-sm leading-6 text-teal-900">
            {t("contactsPage.seedNotice")}
          </p>
          <dl className="mt-8 grid gap-4">
            {contactItems.map(({ label, value, icon: Icon }) => (
              <div className="rounded-[1.25rem] bg-white p-5 shadow-card" key={label}>
                <dt className="flex items-center gap-2 text-sm font-semibold text-gold-500">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </dt>
                <dd className="mt-2 text-base leading-7 text-teal-900">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <LegalNotice locale={locale} />
          </div>
        </div>
        <AppointmentForm />
      </section>
      <section className="bg-skysoft-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <ContactMap locale={locale} />
          <div className="rounded-[1.5rem] bg-white p-6 shadow-card">
            <h2 className="text-2xl font-semibold text-teal-900">
              {t("contactsPage.route")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              {t("contactsPage.routeText")}
            </p>
            <h2 className="mt-8 text-2xl font-semibold text-teal-900">
              {t("contactsPage.legal")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              {clinic.legal.owner[locale]}. {clinic.legal.bin[locale]}.
            </p>
          </div>
        </div>
      </section>
      <CTASection locale={locale} />
    </>
  );
}
