import { lang } from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { messages } from "./messages";

export default getRequestConfig(async ({ locale }) => {
  const requestedLocale = locale ?? (await lang());
  const resolvedLocale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return { locale: resolvedLocale, messages: messages[resolvedLocale] };
});
