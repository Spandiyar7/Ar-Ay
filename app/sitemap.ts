import type { MetadataRoute } from "next";

import { clinic } from "@/content/clinic";
import { services } from "@/content/services";
import { routing } from "@/i18n/routing";

const staticPaths = [
  "",
  "/services",
  "/doctors",
  "/prices",
  "/about",
  "/reviews",
  "/contacts",
  "/faq",
  "/privacy",
  "/terms",
  "/medical-disclaimer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls = routing.locales.flatMap((locale) => [
    ...staticPaths.map((path) => ({
      url: `${clinic.siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.75
    })),
    ...services.map((service) => ({
      url: `${clinic.siteUrl}/${locale}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ]);

  return urls;
}
