import type { Localized } from "./types";

// Public profile data below is seed data from public listings and MUST be
// confirmed by the clinic owner before production launch.
export const clinic = {
  brand: {
    ru: "Ар-Ай",
    kk: "Ар-Ай",
    latin: "Ar-Ay",
    legalName: {
      ru: "Стоматология «Ар-Ай»",
      kk: "«Ар-Ай» стоматологиясы"
    } satisfies Localized
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ar-ay.kz",
  contacts: {
    address: {
      ru: "пос. Касыма Кайсенова, ул. З. Ахметова, 5/3 или ул. Ахметова, 5 — уточнить",
      kk: "Қасым Қайсенов кенті, З. Ахметов көшесі, 5/3 немесе Ахметов көшесі, 5 — нақтылау керек"
    } satisfies Localized,
    shortAddress: {
      ru: "Касыма Кайсенова, ул. Ахметова, 5",
      kk: "Қасым Қайсенов, Ахметов көшесі, 5"
    } satisfies Localized,
    phone: "+77714392270",
    phoneDisplay: "+7 771 439 22 70",
    additionalPhone: "+77015404353",
    additionalPhoneDisplay: "+7 701 540 43 53",
    whatsapp: "+77714392270",
    email: "",
    mapQuery: "Стоматология Ар-Ай Касыма Кайсенова Ахметова 5",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F%20%D0%90%D1%80-%D0%90%D0%B9%20%D0%9A%D0%B0%D1%81%D1%8B%D0%BC%D0%B0%20%D0%9A%D0%B0%D0%B9%D1%81%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0%20%D0%90%D1%85%D0%BC%D0%B5%D1%82%D0%BE%D0%B2%D0%B0%205",
    hours: {
      ru: "Запись по WhatsApp — администратор уточнит время",
      kk: "WhatsApp арқылы жазылу — уақытты әкімші нақтылайды"
    } satisfies Localized
  },
  areaServed: {
    ru: "Восточно-Казахстанская область",
    kk: "Шығыс Қазақстан облысы"
  } satisfies Localized,
  license: {
    number: "№001638DF",
    note: {
      ru: "Лицензия на медицинскую деятельность. Орган выдачи нужно подтвердить перед запуском.",
      kk: "Медициналық қызметке лицензия. Берген органын іске қосар алдында растау керек."
    } satisfies Localized
  },
  legal: {
    bin: {
      ru: "БИН/ИИН — уточнить",
      kk: "БСН/ЖСН — нақтылау керек"
    } satisfies Localized,
    owner: {
      ru: "Юридическое лицо/ИП — уточнить",
      kk: "Заңды тұлға/ЖК — нақтылау керек"
    } satisfies Localized
  },
  images: {
    // Generated local photo assets. Replace with real clinic photos after owner approval.
    hero: "/images/clinic/hero-consultation.webp",
    clinicRoom: "/images/clinic/clinic-interior.webp",
    doctor: "/images/clinic/doctor-portrait.webp",
    family: "/images/clinic/family-dentistry.webp",
    equipment: "/images/clinic/clinic-interior.webp"
  },
  social: {
    instagram: "",
    twoGis: "",
    googleBusiness: ""
  }
} as const;

export const primaryKeywords = {
  ru: [
    "стоматология Ар-Ай",
    "стоматология Касыма Кайсенова",
    "лечение зубов",
    "детская стоматология",
    "запись к стоматологу",
    "стоматология Восточно-Казахстанская область"
  ],
  kk: [
    "Ар-Ай стоматологиясы",
    "Қасым Қайсенов стоматология",
    "тіс емдеу",
    "балалар стоматологиясы",
    "стоматологқа жазылу"
  ]
} as const;
