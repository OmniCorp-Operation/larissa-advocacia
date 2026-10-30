import type { Messages } from "@/i18n/messages";
import type { Locale } from "@/lib/i18n";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
  }
}
