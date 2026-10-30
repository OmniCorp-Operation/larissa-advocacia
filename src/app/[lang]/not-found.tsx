import Link from "next/link";
import { lang } from "next/root-params";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default async function NotFound() {
  const requestedLocale = await lang();
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const t = await getTranslations("notFound");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="font-soft font-display text-5xl font-medium tracking-tight text-primary sm:text-6xl">
        {t("title")}
      </h1>
      <p className="text-lg text-muted-foreground">{t("text")}</p>
      <Link
        href={`/${locale}`}
        className={cn(buttonVariants({ size: "lg" }), "mt-4 h-12 rounded-full px-6 text-base")}
      >
        {t("cta")}
      </Link>
    </main>
  );
}
