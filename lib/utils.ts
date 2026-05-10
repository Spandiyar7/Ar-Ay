import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKzt(value: number, locale: "ru" | "kk") {
  return new Intl.NumberFormat(locale === "ru" ? "ru-KZ" : "kk-KZ", {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0
  }).format(value);
}

export function absoluteUrl(path: string, siteUrl: string) {
  return new URL(path, siteUrl).toString();
}
