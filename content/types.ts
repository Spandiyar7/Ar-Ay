import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export type ServiceCategory =
  | "therapy"
  | "hygiene"
  | "pediatric"
  | "surgery"
  | "orthopedics"
  | "orthodontics"
  | "implantology"
  | "diagnostics";

export type FaqItem = {
  question: Localized;
  answer: Localized;
};

export function text(value: Localized, locale: Locale) {
  return value[locale];
}
