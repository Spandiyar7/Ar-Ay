"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("language");

  return (
    <div
      className={cn("inline-flex rounded-full bg-skysoft-100 p-1", className)}
      aria-label={t("label")}
    >
      {routing.locales.map((item) => (
        <Link
          aria-label={`${t("switchTo")} ${t(item)}`}
          className={cn(
            "min-h-10 rounded-full px-3 py-2 text-sm font-semibold text-teal-900 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700",
            locale === item ? "bg-white shadow-card" : "hover:bg-white/70"
          )}
          href={pathname || "/"}
          key={item}
          locale={item}
        >
          {t(item)}
        </Link>
      ))}
    </div>
  );
}
