import type { Localized } from "./types";

// No fake patient reviews. Replace these placeholders only with real reviews
// that have a confirmed source, date and permission for publication.
// TODO: verify Kazakh translation with native speaker before production launch.
export type Review = {
  id: string;
  author: Localized;
  text: Localized;
  source: Localized;
  date: Localized;
  isPlaceholder?: boolean;
};

export const reviews: Review[] = [
  {
    id: "placeholder-1",
    author: {
      ru: "Реальный пациент",
      kk: "Нақты пациент"
    },
    text: {
      ru: "Здесь будет отзыв после ручного добавления и проверки источника.",
      kk: "Бұл жерде дереккөзі тексерілгеннен кейін пікір қосылады."
    },
    source: {
      ru: "Источник уточнить",
      kk: "Дереккөзді нақтылау"
    },
    date: {
      ru: "Дата уточняется",
      kk: "Күні нақтыланады"
    },
    isPlaceholder: true
  },
  {
    id: "placeholder-2",
    author: {
      ru: "Реальный пациент",
      kk: "Нақты пациент"
    },
    text: {
      ru: "Добавьте отзыв из 2GIS, Google или WhatsApp только при наличии разрешения на публикацию.",
      kk: "2GIS, Google немесе WhatsApp пікірін тек жариялауға рұқсат болғанда қосыңыз."
    },
    source: {
      ru: "Источник уточнить",
      kk: "Дереккөзді нақтылау"
    },
    date: {
      ru: "Дата уточняется",
      kk: "Күні нақтыланады"
    },
    isPlaceholder: true
  }
];
