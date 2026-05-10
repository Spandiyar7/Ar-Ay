import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { clinic } from "@/content/clinic";
import type { Locale } from "@/i18n/routing";

import { ExternalButtonLink } from "./ui/Button";

export function ContactMap({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const src = `https://www.google.com/maps?q=${encodeURIComponent(clinic.contacts.mapQuery)}&output=embed`;

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-teal-900/10 bg-white shadow-card">
      <div className="aspect-[4/3] bg-skysoft-100 md:aspect-[16/9]">
        <iframe
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
          title={t("contactsPage.address")}
        />
      </div>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold-500" />
          <p className="text-sm leading-6 text-slate-700">
            {clinic.contacts.address[locale]}
          </p>
        </div>
        <ExternalButtonLink
          href={clinic.contacts.mapUrl}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          {t("actions.openMap")}
        </ExternalButtonLink>
      </div>
    </div>
  );
}
