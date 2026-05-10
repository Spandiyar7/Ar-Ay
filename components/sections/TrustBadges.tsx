import { CalendarCheck, ClipboardCheck, HeartHandshake, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const badges = [
  { key: "license", textKey: "licenseText", icon: ShieldCheck },
  { key: "whatsapp", textKey: "whatsappText", icon: CalendarCheck },
  { key: "family", textKey: "familyText", icon: HeartHandshake },
  { key: "plan", textKey: "planText", icon: ClipboardCheck }
] as const;

export function TrustBadges() {
  const t = useTranslations("trust");

  return (
    <section className="relative z-10 -mt-12 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="grid gap-3 rounded-[2rem] border border-white/10 bg-ink-900 p-3 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        {badges.map(({ key, textKey, icon: Icon }) => (
          <div
            className="flex min-h-32 items-start gap-4 rounded-[1.5rem] border border-white/8 bg-white/6 p-5 text-white"
            key={key}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint-500 text-ink-950">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-lg font-semibold">{t(key)}</p>
              <p className="mt-2 text-sm leading-6 text-white/68">{t(textKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
