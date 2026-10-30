import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { CoverageBand } from "@/components/sections/coverage-band";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { site } from "@/config/site";
import { isLocale, locales } from "@/lib/i18n";

function buildLanguageAlternates(): Record<string, string> {
  const entries = locales.map((locale) => [locale, `/${locale}`]);
  return { ...Object.fromEntries(entries), "x-default": "/" };
}

async function getOgLocale(locale: (typeof locales)[number]): Promise<string> {
  const meta = await getTranslations({ locale, namespace: "meta" });
  return meta("ogLocale");
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const meta = await getTranslations({ locale: lang, namespace: "meta" });
  const alternateLocale = await Promise.all(
    locales.filter((locale) => locale !== lang).map(getOgLocale),
  );
  const title = meta("title");
  const description = meta("description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: buildLanguageAlternates(),
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: `${site.name} | ${site.brand}`,
      title,
      description,
      locale: meta("ogLocale"),
      alternateLocale,
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
          alt: `${site.name}, ${site.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [site.ogImage],
    },
  };
}

export default async function LandingPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const common = await getTranslations("common");

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-br-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-0 focus:top-0"
      >
        {common("skipToContent")}
      </a>
      <SiteHeader locale={lang} />
      <main id="main" className="flex-1 overflow-x-clip">
        <Hero />
        <HowItWorks />
        <About />
        <CoverageBand />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
