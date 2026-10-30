export const locales = ["pt", "es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  es: "Español",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

function parseAcceptLanguage(header: string): string[] {
  return header
    .split(",")
    .map((entry) => {
      const [tag = "", ...params] = entry.trim().split(";");
      const quality = params.find((param) => param.trim().startsWith("q="));
      const weight = quality ? Number(quality.trim().slice(2)) : 1;
      return { primary: tag.trim().toLowerCase().split("-")[0] ?? "", weight };
    })
    .filter(({ primary, weight }) => primary !== "" && weight > 0)
    .sort((a, b) => b.weight - a.weight)
    .map(({ primary }) => primary);
}

export function resolveLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  return parseAcceptLanguage(acceptLanguage).find(isLocale) ?? defaultLocale;
}
