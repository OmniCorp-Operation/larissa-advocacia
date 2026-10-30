import en from "../../messages/en.json";
import es from "../../messages/es.json";
import pt from "../../messages/pt.json";
import type { Locale } from "@/lib/i18n";

export type Messages = typeof pt;

export const messages = { pt, es, en } satisfies Record<Locale, Messages>;
