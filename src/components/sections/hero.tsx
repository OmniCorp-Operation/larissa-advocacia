import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LocaleFlag } from "@/components/icons/locale-flag";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { ParallaxLayer } from "@/components/parallax/parallax-layer";
import { ParallaxScene } from "@/components/parallax/parallax-scene";
import { Reveal } from "@/components/parallax/reveal";
import { ScrollWords } from "@/components/parallax/scroll-words";
import { CtaLink } from "@/components/shared/cta-link";
import { site } from "@/config/site";
import { buildWhatsappUrl, emailUrl, phoneUrl } from "@/lib/contact-links";
import { locales } from "@/lib/i18n";

const ctaClassName = "h-12 gap-2 rounded-full px-5 text-base font-bold sm:px-6";
const outlineCtaClassName = `${ctaClassName} border-primary/40 bg-transparent text-primary hover:bg-secondary`;

export async function Hero() {
  const [t, common, root] = await Promise.all([
    getTranslations("hero"),
    getTranslations("common"),
    getTranslations(),
  ]);

  return (
    <ParallaxScene
      entry="page-top"
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-20 pt-28 lg:pt-24"
    >
      <ParallaxLayer
        name="hero-background"
        y={[0, 150]}
        scale={[1.22, 1]}
        className="absolute inset-x-0 -top-40 bottom-0 -z-30"
      >
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_30%,transparent_100%)] lg:left-[26%] lg:[mask-image:linear-gradient(to_left,#000_40%,transparent_100%)]">
          <Image
            src="/images/fundo-acidente.jpg"
            alt=""
            fill
            loading="eager"
            sizes="(min-width: 1024px) 75vw, 100vw"
            quality={60}
            className="object-cover opacity-40 blur-[3px] contrast-125 grayscale dark:opacity-25 dark:contrast-100 dark:grayscale-0 dark:mix-blend-screen"
          />
          <div className="absolute inset-0 bg-lilac-soft mix-blend-multiply dark:bg-lilac/25 dark:mix-blend-normal" />
        </div>
      </ParallaxLayer>
      <div
        aria-hidden="true"
        className="absolute -right-24 top-0 -z-20 size-[42rem] rounded-full bg-[radial-gradient(closest-side,var(--lilac-soft),transparent)] opacity-70"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 lg:px-12">
        <ParallaxLayer name="hero-copy" y={[0, -50]} className="relative z-10">
          <h1 id="hero-title" className="text-balance">
            <span className="block text-xl font-light leading-snug sm:text-2xl lg:text-[1.9rem]">
              <ScrollWords text={t("headlineLead")} />
            </span>{" "}
            <span className="font-soft mt-3 block font-display text-[clamp(2.75rem,7.4vw,6rem)] font-medium leading-[0.98] tracking-[-0.025em] text-primary">
              <ScrollWords text={t("headlineMain")} startIndex={6} entranceDelay={0.4} />
            </span>
          </h1>
          <Reveal variant="wipe" delay={1.3} transition={{ duration: 1.1 }} className="mt-6">
            <p className="inline-block origin-left -rotate-2 text-balance font-script text-4xl font-bold sm:text-5xl xl:text-6xl">
              {t("handwritten")}
            </p>
          </Reveal>
          <Reveal delay={1.5}>
            <p className="mt-6 max-w-md text-pretty text-lg text-foreground">{t("intro")}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <CtaLink
                href={buildWhatsappUrl(root("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaClassName} col-span-2`}
              >
                <WhatsappIcon className="size-5" />
                {t("ctaWhatsapp")}
                <span className="sr-only">{common("opensInNewTab")}</span>
              </CtaLink>
              <CtaLink href={phoneUrl} variant="outline" className={outlineCtaClassName}>
                <Phone className="size-5" aria-hidden="true" />
                {t("ctaCall")}
              </CtaLink>
              <CtaLink href={emailUrl} variant="outline" className={outlineCtaClassName}>
                <Mail className="size-5" aria-hidden="true" />
                {t("ctaEmail")}
              </CtaLink>
            </div>
          </Reveal>
        </ParallaxLayer>

        <div className="relative mx-auto w-[min(76vw,21rem)] lg:w-full lg:max-w-[27rem] lg:justify-self-end">
          <ParallaxLayer
            name="hero-disc"
            y={[0, 120]}
            scale={[1, 1.18]}
            className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary"
          />
          <ParallaxLayer
            name="hero-ring"
            rotate={[0, 140]}
            className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[122%] -translate-x-1/2 -translate-y-1/2 text-primary/45"
          >
            <svg viewBox="0 0 100 100" aria-hidden="true" className="size-full">
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="3 3.4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </ParallaxLayer>

          <ParallaxLayer name="hero-portrait" y={[0, 40]} rotate={[-3, 4]} scale={[1, 0.95]}>
            <Reveal variant="pop" delay={0.5} transition={{ duration: 1 }}>
              <figure className="overflow-hidden rounded-[2rem] bg-card shadow-[0_40px_90px_-30px_rgb(78_61_110/0.6)] ring-1 ring-primary/20 dark:shadow-[0_40px_100px_-30px_rgb(143_123_194/0.4)]">
                <Image
                  src="/images/larissa-retrato.webp"
                  alt={t("photoAlt")}
                  width={356}
                  height={408}
                  preload
                  loading="eager"
                  quality={90}
                  sizes="(min-width: 1024px) 27rem, 76vw"
                  className="h-auto w-full"
                />
              </figure>
            </Reveal>
          </ParallaxLayer>

          <ParallaxLayer
            name="hero-badge-role"
            y={[0, -70]}
            className="absolute -left-3 top-10 z-10 sm:-left-10"
          >
            <Reveal variant="pop" delay={1.1}>
              <p className="rounded-full bg-card px-4 py-2 text-sm font-bold text-primary shadow-lg ring-1 ring-border">
                {site.role}
              </p>
            </Reveal>
          </ParallaxLayer>
          <ParallaxLayer
            name="hero-badge-languages"
            y={[0, -120]}
            className="absolute -right-3 bottom-10 z-10 sm:-right-8"
          >
            <Reveal variant="pop" delay={1.3}>
              <p className="flex items-center gap-2.5 rounded-full bg-card py-2 pl-2.5 pr-4 text-sm font-bold text-card-foreground shadow-lg ring-1 ring-border">
                <span className="flex -space-x-1.5">
                  {locales.map((locale) => (
                    <LocaleFlag key={locale} locale={locale} className="size-6 ring-2 ring-card" />
                  ))}
                </span>
                {t("badgeLanguages")}
              </p>
            </Reveal>
          </ParallaxLayer>
        </div>
      </div>
    </ParallaxScene>
  );
}
