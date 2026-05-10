import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

import { reviews } from "@/content/reviews";
import type { Locale } from "@/i18n/routing";

export function ReviewsSection({ locale }: { locale: Locale }) {
  const t = useTranslations("reviewsPage");

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {reviews.map((review) => (
        <article
          className="rounded-[1.5rem] border border-teal-900/10 bg-white p-6 shadow-card"
          key={review.id}
        >
          <Quote aria-hidden="true" className="h-8 w-8 text-gold-500" />
          <p className="mt-5 text-lg leading-8 text-slate-800">{review.text[locale]}</p>
          <div className="mt-6 border-t border-teal-900/10 pt-4">
            <p className="font-semibold text-teal-900">{review.author[locale]}</p>
            <p className="mt-1 text-sm text-slate-600">
              {t("source")}: {review.source[locale]} · {t("date")}: {review.date[locale]}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
