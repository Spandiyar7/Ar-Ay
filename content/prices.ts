import { serviceCategories, services } from "./services";
import type { Localized, ServiceCategory } from "./types";

// Prices are seed estimates and must be confirmed by the clinic owner.
export type PriceItem = {
  category: ServiceCategory;
  serviceSlug: string;
  title: Localized;
  priceFrom: number;
  currency: "KZT";
  note: Localized;
};

export const prices: PriceItem[] = services.map((service) => ({
  category: service.category,
  serviceSlug: service.slug,
  title: service.title,
  priceFrom: service.priceFrom,
  currency: service.currency,
  note: {
    ru: "Точная стоимость после осмотра.",
    kk: "Нақты құн тексеруден кейін."
  }
}));

export function getPriceGroups() {
  return serviceCategories.map((category) => ({
    category,
    items: prices.filter((item) => item.category === category.id)
  }));
}
