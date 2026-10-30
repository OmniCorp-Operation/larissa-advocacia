import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const usStripeOffsets = [0, 2, 4, 6, 8, 10, 12];

const flags: Record<Locale, ReactNode> = {
  pt: (
    <>
      <rect width="24" height="24" fill="#009c3b" />
      <polygon points="12,3.5 21.5,12 12,20.5 2.5,12" fill="#ffdf00" />
      <circle cx="12" cy="12" r="4.4" fill="#002776" />
    </>
  ),
  es: (
    <>
      <rect width="24" height="24" fill="#aa151b" />
      <rect y="6" width="24" height="12" fill="#f1bf00" />
    </>
  ),
  en: (
    <>
      <rect width="24" height="24" fill="#ffffff" />
      {usStripeOffsets.map((offset) => (
        <rect key={offset} y={offset * 1.85} width="24" height="1.85" fill="#b22234" />
      ))}
      <rect width="11.5" height="13" fill="#3c3b6e" />
    </>
  ),
};

type LocaleFlagProps = {
  locale: Locale;
  className?: string;
};

export function LocaleFlag({ locale, className }: LocaleFlagProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block overflow-hidden rounded-full ring-1 ring-black/10", className)}
    >
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid slice" className="size-full">
        {flags[locale]}
      </svg>
    </span>
  );
}
