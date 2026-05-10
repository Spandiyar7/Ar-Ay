import { clinic } from "@/content/clinic";
import type { FaqItem, Localized } from "@/content/types";
import type { Locale } from "@/i18n/routing";

import { absoluteUrl, formatKzt } from "./utils";

export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
    name: clinic.brand.legalName[locale],
    url: clinic.siteUrl,
    image: absoluteUrl(clinic.images.hero, clinic.siteUrl),
    telephone: clinic.contacts.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.contacts.shortAddress[locale],
      addressCountry: "KZ"
    },
    medicalSpecialty: "Dentistry",
    priceRange: "₸₸",
    areaServed: {
      "@type": "AdministrativeArea",
      name: clinic.areaServed[locale]
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Medical license",
      identifier: clinic.license.number
    }
  };
}

export function faqSchema(items: FaqItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[locale]
      }
    }))
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; href: string }>,
  locale: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(`/${locale}${item.href === "/" ? "" : item.href}`, clinic.siteUrl)
    }))
  };
}

export function serviceSchema(
  service: {
    title: Localized;
    shortDescription: Localized;
    slug: string;
    priceFrom: number;
    currency: "KZT";
  },
  locale: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title[locale],
    description: service.shortDescription[locale],
    provider: {
      "@type": "Dentist",
      name: clinic.brand.legalName[locale],
      url: clinic.siteUrl
    },
    areaServed: "Kazakhstan",
    offers: {
      "@type": "Offer",
      price: service.priceFrom,
      priceCurrency: service.currency,
      url: absoluteUrl(`/${locale}/services/${service.slug}`, clinic.siteUrl),
      availability: "https://schema.org/InStock",
      description: formatKzt(service.priceFrom, locale)
    }
  };
}
