import type { Service } from "@/content/services";
import type { Locale } from "@/i18n/routing";

import { ServiceCard } from "./ServiceCard";

export function ServicesGrid({
  services,
  locale
}: {
  services: Service[];
  locale: Locale;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} locale={locale} service={service} />
      ))}
    </div>
  );
}
