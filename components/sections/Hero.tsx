import Image from "next/image";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { clinic } from "@/content/clinic";
import type { Locale } from "@/i18n/routing";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { ExternalButtonLink } from "../ui/Button";

export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const message = t("form.whatsappMessage", {
    name: t("form.defaultName"),
    service: t("form.defaultService"),
    comment: ""
  });

  return (
    <section
      className="relative isolate overflow-hidden bg-ink-950 text-white"
      data-locale={locale}
    >
      <Image
        alt={t("home.visualCaption")}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fill
        priority
        sizes="100vw"
        src={clinic.images.hero}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,9,11,0.92)_0%,rgba(3,9,11,0.78)_44%,rgba(3,9,11,0.30)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,9,11,0.10)_0%,rgba(3,9,11,0.48)_100%)]" />

      <div className="mx-auto flex min-h-[640px] max-w-7xl items-end px-4 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-card backdrop-blur">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-mint-500" />
            {t("home.heroEyebrow")}
          </p>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-8xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-white/82 sm:text-2xl">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ExternalButtonLink
              href={buildWhatsAppUrl(clinic.contacts.whatsapp, message)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              {t("actions.bookWhatsApp")}
            </ExternalButtonLink>
            <ExternalButtonLink
              className="border-white/20 bg-white/12 text-white hover:bg-white/18"
              href={`tel:${clinic.contacts.phone}`}
              variant="secondary"
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
              {t("actions.call")}
            </ExternalButtonLink>
          </div>
          <p className="mt-5 text-base font-semibold text-mint-500">
            {t("home.heroNote")}
          </p>
        </div>
      </div>
    </section>
  );
}
