import { z } from "zod";

import { isKazakhstanPhone } from "./whatsapp";

export const appointmentSchema = z.object({
  locale: z.enum(["ru", "kk"]),
  name: z.string().trim().min(2, "name"),
  phone: z.string().trim().refine(isKazakhstanPhone, "phone"),
  service: z.string().trim().min(1, "service"),
  comment: z.string().trim().max(800).optional().or(z.literal("")),
  preferredContact: z.enum(["whatsapp", "call"]),
  consent: z.boolean().refine((value) => value, "consent")
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
