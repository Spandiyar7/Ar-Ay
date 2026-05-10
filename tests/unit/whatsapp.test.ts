import { describe, expect, it } from "vitest";

import { buildWhatsAppUrl, isKazakhstanPhone, normalizePhone } from "@/lib/whatsapp";

describe("whatsapp utilities", () => {
  it("normalizes Kazakhstan phone numbers", () => {
    expect(normalizePhone("+7 771 439 22 70")).toBe("77714392270");
    expect(normalizePhone("8 771 439 22 70")).toBe("77714392270");
  });

  it("validates Kazakhstan phone numbers", () => {
    expect(isKazakhstanPhone("+7 771 439 22 70")).toBe(true);
    expect(isKazakhstanPhone("+1 555 000 00 00")).toBe(false);
  });

  it("builds an encoded WhatsApp URL", () => {
    const message =
      "Здравствуйте! Хочу записаться в стоматологию Ар-Ай. Имя: Айгуль. Услуга: Лечение кариеса. Комментарий: Болит зуб.";

    expect(buildWhatsAppUrl("+7 771 439 22 70", message)).toBe(
      "https://wa.me/77714392270?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%20%D1%81%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8E%20%D0%90%D1%80-%D0%90%D0%B9.%20%D0%98%D0%BC%D1%8F%3A%20%D0%90%D0%B9%D0%B3%D1%83%D0%BB%D1%8C.%20%D0%A3%D1%81%D0%BB%D1%83%D0%B3%D0%B0%3A%20%D0%9B%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D0%B0%D1%80%D0%B8%D0%B5%D1%81%D0%B0.%20%D0%9A%D0%BE%D0%BC%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%80%D0%B8%D0%B9%3A%20%D0%91%D0%BE%D0%BB%D0%B8%D1%82%20%D0%B7%D1%83%D0%B1."
    );
  });
});
