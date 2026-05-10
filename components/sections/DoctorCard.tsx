import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Doctor } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";

import { ButtonLink } from "../ui/Button";

export function DoctorCard({
  doctor,
  locale,
  priority = false
}: {
  doctor: Doctor;
  locale: Locale;
  priority?: boolean;
}) {
  const t = useTranslations();

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-teal-900/10 bg-white shadow-card">
      <div className="relative aspect-[4/3] bg-skysoft-100">
        <Image
          alt={doctor.name[locale]}
          className="object-cover"
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={doctor.image}
        />
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold text-gold-500">
          {doctor.specialization[locale]}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-teal-900">
          {doctor.name[locale]}
        </h3>
        <p className="mt-2 text-base text-slate-700">
          {t("doctorsPage.experience")}: {doctor.experience[locale]}
        </p>
        <div className="mt-5 rounded-2xl bg-skysoft-50 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-teal-900">
            <GraduationCap aria-hidden="true" className="h-4 w-4" />
            {t("doctorsPage.education")}
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            {doctor.education[locale].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <ButtonLink className="mt-5 w-full" href="/contacts">
          {t("actions.book")}
        </ButtonLink>
      </div>
    </article>
  );
}
