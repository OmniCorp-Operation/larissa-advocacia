import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ParallaxLayer } from "@/components/parallax/parallax-layer";
import { ParallaxScene } from "@/components/parallax/parallax-scene";
import { Reveal } from "@/components/parallax/reveal";

const marqueeRepetitions = [0, 1, 2, 3] as const;

const outlinedText =
  "font-soft font-display text-[clamp(4.5rem,13vw,12rem)] font-medium italic leading-none text-transparent [-webkit-text-stroke:1.5px_var(--lilac)]";

type MarqueeRowProps = {
  text: string;
};

function MarqueeRow({ text }: MarqueeRowProps) {
  return (
    <div className="flex w-max items-center gap-16" aria-hidden="true">
      {marqueeRepetitions.map((repetition) => (
        <span key={repetition} className="flex items-center gap-16">
          <span className={outlinedText}>{text}</span>
          <span className="size-6 shrink-0 rounded-full bg-lilac/60" />
        </span>
      ))}
    </div>
  );
}

export async function CoverageBand() {
  const t = await getTranslations("coverage");

  return (
    <ParallaxScene
      entry="viewport"
      id="coverage"
      aria-labelledby="coverage-title"
      className="relative isolate overflow-hidden bg-brand-deep py-32 text-brand-deep-foreground sm:py-44"
    >
      <ParallaxLayer
        name="coverage-background"
        y={[-150, 150]}
        scale={[1.2, 1.2]}
        className="absolute inset-x-0 -inset-y-44 -z-30"
      >
        <Image
          src="/images/fundo-faixa.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover opacity-30 mix-blend-luminosity"
        />
      </ParallaxLayer>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-brand-deep via-brand-deep/55 to-brand-deep"
      />

      <div aria-hidden="true" className="absolute inset-0 -z-10 flex flex-col justify-center gap-10 opacity-60">
        <ParallaxLayer name="coverage-marquee-forward" x={[200, -620]}>
          <MarqueeRow text={t("statement")} />
        </ParallaxLayer>
        <ParallaxLayer
          name="coverage-road"
          x={[0, -76]}
          className="road-dash-x -mx-24 h-1.5 text-lilac/30"
        />
        <ParallaxLayer name="coverage-marquee-backward" x={[-620, 200]}>
          <MarqueeRow text={t("statement")} />
        </ParallaxLayer>
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        <Reveal>
          <h2 id="coverage-title" className="text-balance">
            <span className="font-soft block font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {t("statement")}
            </span>
            <span className="mt-4 block font-script text-5xl font-bold text-lilac-glow sm:text-7xl">
              {t("invitation")}
            </span>
          </h2>
        </Reveal>
      </div>
    </ParallaxScene>
  );
}
