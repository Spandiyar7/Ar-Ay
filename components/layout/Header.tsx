import { MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { clinic } from "@/content/clinic";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { ExternalButtonLink } from "../ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { navItems } from "./nav";

export function Header() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const message = t("form.whatsappMessage", {
    name: t("form.defaultName"),
    service: t("form.defaultService"),
    comment: ""
  });

  return (
    <header className="sticky top-0 z-40 border-b border-ink-950/10 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          className="group flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
          href="/"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-950 text-lg font-bold text-mint-500 shadow-card">
            A
          </span>
          <span>
            <span className="block text-xl font-semibold uppercase leading-none tracking-[0.18em] text-ink-950">
              {clinic.brand.latin}
            </span>
            <span className="mt-1 block text-sm text-slate-600">
              {clinic.brand[locale]}
            </span>
          </span>
        </Link>

        <nav aria-label={t("nav.menu")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-ink-950/72 transition hover:bg-skysoft-100 hover:text-ink-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  href={item.href}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <a
            aria-label={t("actions.call")}
            className="grid h-12 w-12 place-items-center rounded-full border border-ink-950/10 bg-white text-ink-950 shadow-card transition hover:bg-skysoft-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            href={`tel:${clinic.contacts.phone}`}
          >
            <Phone aria-hidden="true" className="h-5 w-5" />
          </a>
          <ExternalButtonLink
            href={buildWhatsAppUrl(clinic.contacts.whatsapp, message)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            {t("actions.bookWhatsApp")}
          </ExternalButtonLink>
        </div>

        <MobileNav locale={locale} />
      </div>
    </header>
  );
}
