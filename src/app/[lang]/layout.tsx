import type { Metadata } from "next";
import { Caveat, Fraunces, Nunito } from "next/font/google";
import { lang } from "next/root-params";
import { AppProviders } from "@/components/providers/app-providers";
import { site } from "@/config/site";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import "../globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
};

export function generateStaticParams(): { lang: Locale }[] {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const requestedLocale = await lang();
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${nunito.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
