import { MapPin, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { clinic } from "@/content/clinic";
import type { Locale } from "@/i18n/routing";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function StickyMobileCTA({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const message = t("form.whatsappMessage", {
    name: t("form.defaultName"),
    service: t("form.defaultService"),
    comment: ""
  });

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-teal-900/10 bg-white/95 px-3 py-2 shadow-soft backdrop-blur-xl md:hidden"
      data-testid="sticky-mobile-cta"
      data-locale={locale}
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <a
          className="flex min-h-12 flex-col items-center justify-center rounded-2xl bg-teal-900 px-2 text-xs font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          href={buildWhatsAppUrl(clinic.contacts.whatsapp, message)}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle aria-hidden="true" className="mb-0.5 h-5 w-5" />
          WhatsApp
        </a>
        <a
          className="flex min-h-12 flex-col items-center justify-center rounded-2xl bg-skysoft-100 px-2 text-xs font-semibold text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          href={`tel:${clinic.contacts.phone}`}
        >
          <Phone aria-hidden="true" className="mb-0.5 h-5 w-5" />
          {t("actions.call")}
        </a>
        <a
          className="flex min-h-12 flex-col items-center justify-center rounded-2xl bg-gold-100 px-2 text-xs font-semibold text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          href={clinic.contacts.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin aria-hidden="true" className="mb-0.5 h-5 w-5" />
          {t("actions.openMap")}
        </a>
      </div>
    </div>
  );
}
