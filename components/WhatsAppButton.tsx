import { MessageCircle } from "lucide-react";

import { clinic } from "@/content/clinic";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { ExternalButtonLink } from "./ui/Button";

export function WhatsAppButton({
  label,
  message,
  className
}: {
  label: string;
  message: string;
  className?: string;
}) {
  return (
    <ExternalButtonLink
      className={className}
      href={buildWhatsAppUrl(clinic.contacts.whatsapp, message)}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle aria-hidden="true" className="h-5 w-5" />
      {label}
    </ExternalButtonLink>
  );
}
