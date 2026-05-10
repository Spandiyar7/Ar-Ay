import { MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { clinic } from "@/content/clinic";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

import { navItems } from "./nav";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <footer className="border-t border-teal-900/10 bg-white pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-900 text-lg font-bold text-white">
              A
            </span>
            <div>
              <p className="text-lg font-semibold text-teal-900">
                {clinic.brand.legalName[locale]}
              </p>
              <p className="text-sm text-slate-600">{clinic.brand.latin}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-700">
            {t("footer.about")}
          </p>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            {t("footer.license")}: {clinic.license.number}. {clinic.license.note[locale]}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {t("footer.disclaimer")}
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-teal-900">{t("nav.menu")}</h2>
          <ul className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-sm text-slate-700 hover:text-teal-900"
                  href={item.href}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-sm text-slate-700 hover:text-teal-900" href="/faq">
                {t("nav.faq")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-teal-900">{t("nav.contacts")}</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
            <li className="flex gap-2">
              <MapPin
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-gold-500"
              />
              <span>{clinic.contacts.address[locale]}</span>
            </li>
            <li className="flex gap-2">
              <Phone aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold-500" />
              <a href={`tel:${clinic.contacts.phone}`}>{clinic.contacts.phoneDisplay}</a>
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link href="/privacy" className="text-slate-700 hover:text-teal-900">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-slate-700 hover:text-teal-900">
              {t("footer.terms")}
            </Link>
            <Link
              href="/medical-disclaimer"
              className="text-slate-700 hover:text-teal-900"
            >
              {t("footer.medicalDisclaimer")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
