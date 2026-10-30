import en from "../messages/en.json";
import es from "../messages/es.json";
import pt from "../messages/pt.json";
import { contact } from "../src/config/contact";

export const locales = ["pt", "es", "en"] as const;
export type Locale = (typeof locales)[number];

export const dictionaries: Record<Locale, typeof pt> = { pt, es, en };

export const whatsappUrl = (locale: Locale) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(dictionaries[locale].whatsappMessage)}`;
