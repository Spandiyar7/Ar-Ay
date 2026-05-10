import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ui/Button";

export default async function LocaleNotFound() {
  const t = await getTranslations();

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-teal-900 md:text-6xl">
        {t("notFound.title")}
      </h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">{t("notFound.text")}</p>
      <ButtonLink className="mt-8" href="/">
        {t("notFound.home")}
      </ButtonLink>
    </section>
  );
}
