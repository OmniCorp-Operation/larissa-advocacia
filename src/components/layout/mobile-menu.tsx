"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LocaleFlag } from "@/components/icons/locale-flag";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavSectionId } from "@/config/sections";
import { useLocaleHref } from "@/hooks/use-locale-href";
import { localeNames, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  locale: Locale;
  links: { id: NavSectionId; label: string }[];
  whatsappHref: string;
  labels: {
    open: string;
    close: string;
    title: string;
    description: string;
    navigation: string;
    language: string;
    whatsapp: string;
    opensInNewTab: string;
  };
};

export function MobileMenu({ locale, links, whatsappHref, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const hrefFor = useLocaleHref();
  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={labels.open}
        data-testid="mobile-menu-trigger"
        render={
          <Button
            variant="ghost"
            className="size-10 rounded-full text-foreground hover:bg-secondary lg:hidden"
          />
        }
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        data-testid="mobile-menu"
        className="w-[min(22rem,100vw)] gap-0 border-l-border bg-background p-0 sm:max-w-sm"
      >
        <SheetHeader className="flex-row items-center justify-between gap-4 border-b border-border px-6 py-4">
          <SheetTitle className="font-display text-2xl font-semibold">{labels.title}</SheetTitle>
          <SheetDescription className="sr-only">{labels.description}</SheetDescription>
          <SheetClose
            aria-label={labels.close}
            render={<Button variant="ghost" className="size-10 rounded-full" />}
          >
            <X className="size-6" aria-hidden="true" />
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-8">
          <nav aria-label={labels.navigation}>
            <ul className="space-y-1">
              {links.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={closeMenu}
                    className="block rounded-2xl px-3 py-3 font-display text-4xl font-medium tracking-tight text-foreground transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="px-3 text-sm font-bold text-muted-foreground">{labels.language}</p>
            <ul className="mt-2 space-y-1">
              {locales.map((option) => (
                <li key={option}>
                  <Link
                    href={hrefFor(option)}
                    lang={option}
                    hrefLang={option}
                    aria-current={option === locale ? "page" : undefined}
                    onClick={closeMenu}
                    className={cn(
                      "flex h-12 items-center gap-3 rounded-2xl px-3 font-semibold transition-colors hover:bg-secondary",
                      option === locale && "bg-secondary text-primary",
                    )}
                  >
                    <LocaleFlag locale={option} className="size-6" />
                    {localeNames[option]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border p-6">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-12 w-full gap-2 rounded-full text-base")}
          >
            <WhatsappIcon className="size-5" />
            {labels.whatsapp}
            <span className="sr-only">{labels.opensInNewTab}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
