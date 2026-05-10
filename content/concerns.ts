import type { Localized } from "./types";

// TODO: verify Kazakh translation with native speaker before production launch.
export const concerns: Array<{
  key: string;
  title: Localized;
  description: Localized;
  href: string;
}> = [
  {
    key: "pain",
    title: { ru: "Зубная боль", kk: "Тіс ауыруы" },
    description: {
      ru: "Не откладывайте прием при сильной боли или отеке.",
      kk: "Қатты ауырсыну немесе ісіну болса, қабылдауды кейінге қалдырмаңыз."
    },
    href: "/services/diagnostics-consultation"
  },
  {
    key: "caries",
    title: { ru: "Кариес", kk: "Кариес" },
    description: {
      ru: "Пятно, полость или реакция на холодное.",
      kk: "Дақ, қуыс немесе суыққа сезімталдық."
    },
    href: "/services/caries-treatment"
  },
  {
    key: "cleaning",
    title: { ru: "Чистка", kk: "Тазалау" },
    description: {
      ru: "Налет, камень, профилактика и свежесть.",
      kk: "Қақ, тас, профилактика және сергектік."
    },
    href: "/services/professional-cleaning"
  },
  {
    key: "extraction",
    title: { ru: "Удаление", kk: "Тіс жұлу" },
    description: {
      ru: "Когда зуб разрушен или есть хирургические показания.",
      kk: "Тіс бұзылғанда немесе хирургиялық көрсетілім болғанда."
    },
    href: "/services/tooth-extraction"
  },
  {
    key: "children",
    title: { ru: "Детский прием", kk: "Балалар қабылдауы" },
    description: {
      ru: "Спокойная адаптация ребенка и понятный план.",
      kk: "Баланы тыныш бейімдеу және түсінікті жоспар."
    },
    href: "/services/pediatric-dentistry"
  },
  {
    key: "braces",
    title: { ru: "Брекеты", kk: "Брекет" },
    description: {
      ru: "Консультация по прикусу и вариантам коррекции.",
      kk: "Тістем және түзету нұсқалары бойынша кеңес."
    },
    href: "/services/orthodontic-consultation"
  },
  {
    key: "prosthetics",
    title: { ru: "Протезирование", kk: "Протездеу" },
    description: {
      ru: "Восстановление зубов и жевательной функции.",
      kk: "Тістерді және шайнау қызметін қалпына келтіру."
    },
    href: "/services/prosthetics-crowns"
  },
  {
    key: "implants",
    title: { ru: "Имплантация", kk: "Имплантация" },
    description: {
      ru: "Обсуждение вариантов восстановления отсутствующих зубов.",
      kk: "Жоқ тістерді қалпына келтіру нұсқаларын талқылау."
    },
    href: "/services/implant-consultation"
  }
];
