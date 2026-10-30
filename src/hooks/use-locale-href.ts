import type { Locale } from "@/lib/i18n";
import { useActiveSection } from "./use-active-section";

export function useLocaleHref(): (locale: Locale) => string {
  const activeSection = useActiveSection();
  const hash = activeSection && activeSection !== "hero" ? `#${activeSection}` : "";

  return (locale) => `/${locale}${hash}`;
}
