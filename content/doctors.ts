import type { Localized } from "./types";

// Placeholder team data. Replace with real doctors only after owner approval.
// TODO: verify Kazakh translation with native speaker before production launch.
export type Doctor = {
  id: string;
  name: Localized;
  specialization: Localized;
  experience: Localized;
  education: Localized<string[]>;
  image: string;
  serviceSlugs: string[];
  isPlaceholder?: boolean;
};

export const doctors: Doctor[] = [
  {
    id: "therapist",
    name: {
      ru: "ФИО врача уточняется",
      kk: "Дәрігердің аты-жөні нақтыланады"
    },
    specialization: {
      ru: "Стоматолог-терапевт",
      kk: "Стоматолог-терапевт"
    },
    experience: {
      ru: "Стаж нужно подтвердить",
      kk: "Тәжірибесін растау керек"
    },
    education: {
      ru: ["Добавить подтвержденное образование", "Добавить актуальные сертификаты"],
      kk: ["Расталған білімін қосу", "Өзекті сертификаттарын қосу"]
    },
    image: "/images/clinic/doctor-portrait.webp",
    serviceSlugs: [
      "caries-treatment",
      "professional-cleaning",
      "diagnostics-consultation"
    ],
    isPlaceholder: true
  },
  {
    id: "pediatric",
    name: {
      ru: "ФИО детского врача уточняется",
      kk: "Балалар дәрігерінің аты-жөні нақтыланады"
    },
    specialization: {
      ru: "Детский стоматолог",
      kk: "Балалар стоматологы"
    },
    experience: {
      ru: "Стаж нужно подтвердить",
      kk: "Тәжірибесін растау керек"
    },
    education: {
      ru: [
        "Добавить документы об образовании",
        "Добавить сертификаты по детскому приему"
      ],
      kk: [
        "Білімі туралы құжаттарды қосу",
        "Балалар қабылдауы бойынша сертификаттарды қосу"
      ]
    },
    image: "/images/clinic/family-dentistry.webp",
    serviceSlugs: ["pediatric-dentistry"],
    isPlaceholder: true
  },
  {
    id: "surgeon",
    name: {
      ru: "ФИО хирурга уточняется",
      kk: "Хирургтің аты-жөні нақтыланады"
    },
    specialization: {
      ru: "Стоматолог-хирург",
      kk: "Стоматолог-хирург"
    },
    experience: {
      ru: "Стаж нужно подтвердить",
      kk: "Тәжірибесін растау керек"
    },
    education: {
      ru: [
        "Добавить профильное образование",
        "Добавить документы по хирургическому приему"
      ],
      kk: ["Бейінді білімін қосу", "Хирургиялық қабылдау бойынша құжаттарды қосу"]
    },
    image: "/images/clinic/doctor-portrait.webp",
    serviceSlugs: ["tooth-extraction", "implant-consultation"],
    isPlaceholder: true
  },
  {
    id: "orthopedist",
    name: {
      ru: "ФИО ортопеда уточняется",
      kk: "Ортопедтің аты-жөні нақтыланады"
    },
    specialization: {
      ru: "Стоматолог-ортопед",
      kk: "Стоматолог-ортопед"
    },
    experience: {
      ru: "Стаж нужно подтвердить",
      kk: "Тәжірибесін растау керек"
    },
    education: {
      ru: ["Добавить образование", "Добавить сертификаты по протезированию"],
      kk: ["Білімін қосу", "Протездеу бойынша сертификаттарды қосу"]
    },
    image: "/images/clinic/clinic-interior.webp",
    serviceSlugs: ["prosthetics-crowns", "implant-consultation"],
    isPlaceholder: true
  },
  {
    id: "orthodontist",
    name: {
      ru: "ФИО ортодонта уточняется",
      kk: "Ортодонттың аты-жөні нақтыланады"
    },
    specialization: {
      ru: "Ортодонт",
      kk: "Ортодонт"
    },
    experience: {
      ru: "Стаж нужно подтвердить",
      kk: "Тәжірибесін растау керек"
    },
    education: {
      ru: ["Добавить образование", "Добавить сертификаты по ортодонтии"],
      kk: ["Білімін қосу", "Ортодонтия бойынша сертификаттарды қосу"]
    },
    image: "/images/clinic/doctor-portrait.webp",
    serviceSlugs: ["orthodontic-consultation"],
    isPlaceholder: true
  }
];

export function getDoctorsByIds(ids: string[]) {
  return doctors.filter((doctor) => ids.includes(doctor.id));
}
