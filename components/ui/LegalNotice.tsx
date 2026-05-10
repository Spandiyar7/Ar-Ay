import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { clinic } from "@/content/clinic";
import type { Locale } from "@/i18n/routing";

export function LegalNotice({ locale }: { locale: Locale }) {
  const t = useTranslations();

  return (
    <aside className="rounded-[1.5rem] border border-gold-500/30 bg-gold-100/60 p-5 text-sm leading-6 text-teal-900">
      <div className="flex items-start gap-3">
        <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold-500" />
        <div>
          <p className="font-semibold">{clinic.brand.legalName[locale]}</p>
          <p>
            {t("footer.license")} {clinic.license.number}. {clinic.license.note[locale]}
          </p>
          <p className="mt-2">{t("legal.siteDisclaimer")}</p>
        </div>
      </div>
    </aside>
  );
}
