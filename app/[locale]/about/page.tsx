import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileCheck2, HeartHandshake, Stethoscope, UsersRound } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/ui/CTASection";
import { LegalNotice } from "@/components/ui/LegalNotice";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clinic } from "@/content/clinic";
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
    path: "/about",
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    image: clinic.images.clinicRoom
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "ru") as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const cards = [
    {
      title: t("aboutPage.equipmentTitle"),
      text: t("aboutPage.equipmentText"),
      icon: Stethoscope
    },
    {
      title: t("aboutPage.documentsTitle"),
      text: t("aboutPage.documentsText"),
      icon: FileCheck2
    },
    {
      title: t("aboutPage.approachTitle"),
      text: t("aboutPage.approachText"),
      icon: HeartHandshake
    },
    {
      title: t("aboutPage.familyTitle"),
      text: t("aboutPage.familyText"),
      icon: UsersRound
    }
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("nav.home"), href: "/" },
            { name: t("nav.about"), href: "/about" }
          ],
          locale
        )}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.about"), href: "/about" }
        ]}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <h1 className="text-balance text-4xl font-semibold text-teal-900 md:text-6xl">
            {t("aboutPage.title")}
          </h1>
          <SectionHeading
            className="mt-10"
            title={t("aboutPage.missionTitle")}
            text={t("aboutPage.missionText")}
          />
          <div className="mt-8">
            <LegalNotice locale={locale} />
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
          <div className="relative aspect-[4/3]">
            <Image
              alt={t("aboutPage.title")}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={clinic.images.clinicRoom}
            />
          </div>
        </div>
      </section>
      <section className="bg-skysoft-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {cards.map(({ title, text, icon: Icon }) => (
            <article className="rounded-[1.5rem] bg-white p-6 shadow-card" key={title}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-skysoft-100 text-teal-900">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-teal-900">{title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTASection locale={locale} />
    </>
  );
}
