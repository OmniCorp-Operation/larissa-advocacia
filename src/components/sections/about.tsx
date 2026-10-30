import { Handshake, MapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LocaleFlag } from "@/components/icons/locale-flag";
import { ParallaxLayer } from "@/components/parallax/parallax-layer";
import { ParallaxScene } from "@/components/parallax/parallax-scene";
import { Reveal } from "@/components/parallax/reveal";
import { site } from "@/config/site";
import { locales } from "@/lib/i18n";

const [firstName] = site.name.split(" ");

export async function About() {
  const t = await getTranslations("about");

  return (
    <ParallaxScene
      entry="viewport"
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-secondary pb-32 pt-24 lg:pb-40 lg:pt-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-8 lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-24 lg:px-12">
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <ParallaxLayer
            name="about-arch-outline"
            y={[50, -50]}
            className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-full rounded-b-[2rem] border-2 border-dashed border-primary/45"
          />
          <ParallaxLayer name="about-portrait" y={[30, -30]}>
            <Reveal variant="unveil" transition={{ duration: 1.2 }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-card shadow-[0_30px_70px_-30px_rgb(78_61_110/0.55)] ring-1 ring-primary/20">
                <Image
                  src="/images/larissa-retrato.webp"
                  alt={t("photoAlt")}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-cover object-[35%_15%]"
                />
              </div>
            </Reveal>
          </ParallaxLayer>
          <ParallaxLayer
            name="about-signature"
            y={[0, -70]}
            rotate={[-8, -2]}
            className="absolute -bottom-14 -left-2 z-10 sm:-left-8"
          >
            <p aria-hidden="true" className="font-script text-5xl font-bold text-primary sm:text-6xl">
              {firstName} 💜
            </p>
          </ParallaxLayer>
        </div>

        <div>
          <Reveal>
            <h2
              id="about-title"
              className="font-soft text-balance font-display text-5xl font-medium leading-[1.02] tracking-tight text-primary sm:text-6xl"
            >
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-pretty text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
              {t("lead")}
            </p>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80">
              {t("closing")}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <ul className="divide-y divide-primary/20 border-y border-primary/20">
              <li className="flex items-center gap-4 py-5">
                <span className="flex w-16 shrink-0 justify-center -space-x-2" aria-hidden="true">
                  {locales.map((locale) => (
                    <LocaleFlag key={locale} locale={locale} className="size-7 ring-2 ring-secondary" />
                  ))}
                </span>
                <span className="font-bold">{t("highlights.languages")}</span>
              </li>
              <li className="flex items-center gap-4 py-5">
                <span className="grid w-16 shrink-0 place-items-center text-primary" aria-hidden="true">
                  <MapPin className="size-6" />
                </span>
                <span className="font-bold">{t("highlights.coverage")}</span>
              </li>
              <li className="flex items-center gap-4 py-5">
                <span className="grid w-16 shrink-0 place-items-center text-primary" aria-hidden="true">
                  <Handshake className="size-6" />
                </span>
                <span className="font-bold">{t("highlights.firm")}</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </ParallaxScene>
  );
}
