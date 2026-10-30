"use client";

import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { LocaleFlag } from "@/components/icons/locale-flag";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocaleHref } from "@/hooks/use-locale-href";
import { localeNames, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
};

export function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  const hrefFor = useLocaleHref();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        data-testid="language-switcher"
        render={
          <Button
            variant="ghost"
            className="h-10 gap-2 rounded-full px-3 text-sm font-bold text-foreground hover:bg-secondary"
          />
        }
      >
        <LocaleFlag locale={current} className="size-5" />
        {current.toUpperCase()}
        <ChevronDown className="size-4 opacity-70" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-52 rounded-2xl p-1.5">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            data-testid={`language-option-${locale}`}
            className="h-11 gap-3 rounded-xl px-3 text-sm font-semibold"
            render={
              <Link
                href={hrefFor(locale)}
                lang={locale}
                hrefLang={locale}
                aria-current={locale === current ? "page" : undefined}
              />
            }
          >
            <LocaleFlag locale={locale} className="size-5" />
            <span className="flex-1">{localeNames[locale]}</span>
            {locale === current && <Check className="size-4 text-primary" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
