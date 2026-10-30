import { contact } from "@/config/contact";

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const phoneUrl = contact.officePhone.href;

export const emailUrl = `mailto:${contact.email}`;
