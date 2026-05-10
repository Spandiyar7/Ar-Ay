"use client";

import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { clinic } from "@/content/clinic";
import { Link } from "@/i18n/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { ExternalButtonLink } from "../ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "./nav";

export function MobileNav({ locale }: { locale: "ru" | "kk" }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const message = t("form.whatsappMessage", {
    name: t("form.defaultName"),
    service: t("form.defaultService"),
    comment: ""
  });

  return (
    <div className="lg:hidden" data-locale={locale}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? t("nav.close") : t("nav.menu")}
        className="grid h-12 w-12 place-items-center rounded-full border border-teal-900/10 bg-white text-teal-900 shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <Menu aria-hidden="true" className="h-6 w-6" />
        )}
      </button>

      {open ? (
        <div
          className="fixed inset-x-4 top-20 z-50 rounded-[1.5rem] border border-teal-900/10 bg-white p-4 shadow-soft"
          id="mobile-navigation"
        >
          <nav aria-label={t("nav.menu")}>
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="block rounded-2xl px-4 py-3 text-base font-semibold text-teal-900 hover:bg-skysoft-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-teal-900/10 pt-4">
            <LanguageSwitcher />
            <div className="flex gap-2">
              <a
                aria-label={t("actions.call")}
                className="grid h-12 w-12 place-items-center rounded-full bg-skysoft-100 text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                href={`tel:${clinic.contacts.phone}`}
              >
                <Phone aria-hidden="true" className="h-5 w-5" />
              </a>
              <ExternalButtonLink
                aria-label={t("actions.bookWhatsApp")}
                href={buildWhatsAppUrl(clinic.contacts.whatsapp, message)}
                size="icon"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
              </ExternalButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
