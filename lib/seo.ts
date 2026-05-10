import type { Metadata } from "next";

import { clinic, primaryKeywords } from "@/content/clinic";
import type { Locale } from "@/i18n/routing";

export function localePath(locale: Locale, path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

export function createMetadata({
  locale,
  path = "",
  title,
  description,
  image = clinic.images.hero,
  keywords = []
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
  keywords?: readonly string[];
}): Metadata {
  const canonical = localePath(locale, path);
  const alternatePath = path.startsWith("/") ? path : `/${path}`;
  const ogImage = new URL(image, clinic.siteUrl).toString();

  return {
    metadataBase: new URL(clinic.siteUrl),
    title,
    description,
    keywords: [...primaryKeywords[locale], ...keywords],
    alternates: {
      canonical,
      languages: {
        ru: localePath("ru", alternatePath),
        kk: localePath("kk", alternatePath)
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: clinic.brand.legalName[locale],
      locale: locale === "ru" ? "ru_KZ" : "kk_KZ",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  };
}
