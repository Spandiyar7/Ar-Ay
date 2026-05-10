"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { clinic } from "@/content/clinic";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { appointmentSchema, type AppointmentInput } from "@/lib/validation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { Button, ExternalButtonLink } from "./ui/Button";

const inputClassName =
  "mt-2 min-h-12 w-full rounded-2xl border border-teal-900/15 bg-white px-4 py-3 text-base text-teal-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/15";

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("form");
  const actions = useTranslations("actions");
  const [submitError, setSubmitError] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const serviceOptions = useMemo(
    () =>
      services.map((service) => ({
        value: service.title[locale],
        label: service.title[locale]
      })),
    [locale]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      locale,
      name: "",
      phone: "",
      service: "",
      comment: "",
      preferredContact: "whatsapp",
      consent: false
    },
    mode: "onBlur"
  });

  const errorMessage = (field: keyof AppointmentInput) => {
    const message = errors[field]?.message;
    if (!message || typeof message !== "string") {
      return null;
    }
    const key = message === "Invalid input" ? field : message;
    return t(`errors.${key}`);
  };

  const onSubmit = async (values: AppointmentInput) => {
    setSubmitError("");
    const message = t("whatsappMessage", {
      name: values.name,
      service: values.service,
      comment: values.comment ?? ""
    });
    const url = buildWhatsAppUrl(clinic.contacts.whatsapp, message);
    setWhatsAppUrl(url);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error("lead-submit-failed");
      }

      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setSubmitError(t("errors.submit"));
    }
  };

  return (
    <form
      className="rounded-[1.5rem] border border-teal-900/10 bg-white p-5 shadow-card md:p-7"
      data-testid="appointment-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" value={locale} {...register("locale")} />
      {!compact ? (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-teal-900">{t("title")}</h2>
          <p className="mt-2 text-base leading-7 text-slate-700">{t("description")}</p>
        </div>
      ) : null}

      <div className="grid gap-5">
        <div>
          <label
            className="text-base font-semibold text-teal-900"
            htmlFor="appointment-name"
          >
            {t("name")}
          </label>
          <input
            aria-describedby={errorMessage("name") ? "appointment-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            className={inputClassName}
            id="appointment-name"
            placeholder={t("namePlaceholder")}
            type="text"
            {...register("name")}
          />
          {errorMessage("name") ? (
            <p
              className="mt-2 text-sm font-medium text-red-700"
              id="appointment-name-error"
            >
              {errorMessage("name")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-base font-semibold text-teal-900"
            htmlFor="appointment-phone"
          >
            {t("phone")}
          </label>
          <input
            aria-describedby={
              errorMessage("phone") ? "appointment-phone-error" : undefined
            }
            aria-invalid={Boolean(errors.phone)}
            className={inputClassName}
            id="appointment-phone"
            inputMode="tel"
            placeholder={t("phonePlaceholder")}
            type="tel"
            {...register("phone")}
          />
          {errorMessage("phone") ? (
            <p
              className="mt-2 text-sm font-medium text-red-700"
              id="appointment-phone-error"
            >
              {errorMessage("phone")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-base font-semibold text-teal-900"
            htmlFor="appointment-service"
          >
            {t("service")}
          </label>
          <select
            aria-describedby={
              errorMessage("service") ? "appointment-service-error" : undefined
            }
            aria-invalid={Boolean(errors.service)}
            className={inputClassName}
            id="appointment-service"
            {...register("service")}
          >
            <option value="">{t("servicePlaceholder")}</option>
            {serviceOptions.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errorMessage("service") ? (
            <p
              className="mt-2 text-sm font-medium text-red-700"
              id="appointment-service-error"
            >
              {errorMessage("service")}
            </p>
          ) : null}
        </div>

        <div>
          <label
            className="text-base font-semibold text-teal-900"
            htmlFor="appointment-comment"
          >
            {t("comment")}
          </label>
          <textarea
            className={`${inputClassName} min-h-28 resize-y`}
            id="appointment-comment"
            placeholder={t("commentPlaceholder")}
            {...register("comment")}
          />
        </div>

        <fieldset>
          <legend className="text-base font-semibold text-teal-900">
            {t("preferredContact")}
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(["whatsapp", "call"] as const).map((value) => (
              <label
                className="flex min-h-12 items-center gap-3 rounded-2xl border border-teal-900/10 bg-skysoft-50 px-4 py-3 font-semibold text-teal-900"
                key={value}
              >
                <input
                  className="h-5 w-5 accent-teal-900"
                  type="radio"
                  value={value}
                  {...register("preferredContact")}
                />
                {t(value)}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="flex items-start gap-3 rounded-2xl bg-warm-100 p-4 text-sm leading-6 text-slate-800">
            <input
              aria-describedby={
                errorMessage("consent") ? "appointment-consent-error" : undefined
              }
              aria-invalid={Boolean(errors.consent)}
              className="mt-1 h-5 w-5 shrink-0 accent-teal-900"
              type="checkbox"
              {...register("consent")}
            />
            <span>{t("consent")}</span>
          </label>
          {errorMessage("consent") ? (
            <p
              className="mt-2 text-sm font-medium text-red-700"
              id="appointment-consent-error"
            >
              {errorMessage("consent")}
            </p>
          ) : null}
        </div>

        {submitError ? (
          <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
            {submitError}
          </p>
        ) : null}

        {isSubmitSuccessful && whatsAppUrl ? (
          <div className="rounded-2xl bg-teal-100 p-4 text-sm leading-6 text-teal-900">
            <p className="flex items-center gap-2 font-semibold">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
              {t("successTitle")}
            </p>
            <p className="mt-2">{t("successText")}</p>
            <ExternalButtonLink
              className="mt-4"
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              {actions("bookWhatsApp")}
            </ExternalButtonLink>
          </div>
        ) : null}

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? actions("sending") : actions("submit")}
        </Button>
      </div>
    </form>
  );
}
