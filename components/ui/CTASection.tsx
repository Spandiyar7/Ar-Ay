import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { clinic } from "@/content/clinic";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { ButtonLink, ExternalButtonLink } from "./Button";

export function CTASection({ locale }: { locale: "ru" | "kk" }) {
  const t = useTranslations();
  const message = t("form.whatsappMessage", {
    name: t("form.defaultName"),
    service: t("form.defaultService"),
    comment: ""
  });

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      data-locale={locale}
    >
      <div className="overflow-hidden rounded-[2rem] bg-teal-900 p-8 text-white shadow-soft md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              {t("sections.finalCtaTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/82">
              {t("sections.finalCtaText")}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <ExternalButtonLink
              href={buildWhatsAppUrl(clinic.contacts.whatsapp, message)}
              variant="gold"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              {t("actions.bookWhatsApp")}
            </ExternalButtonLink>
            <ExternalButtonLink href={`tel:${clinic.contacts.phone}`} variant="secondary">
              <Phone aria-hidden="true" className="h-5 w-5" />
              {t("actions.call")}
            </ExternalButtonLink>
            <ButtonLink
              href="/contacts"
              variant="ghost"
              className="bg-white/10 text-white hover:bg-white/15"
            >
              {t("nav.contacts")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
