"use client";

import { useScroll, useSpring, type MotionValue, type UseScrollOptions } from "motion/react";
import { createContext, useContext, useRef, type ComponentProps } from "react";
import { useParallaxStrength } from "@/hooks/use-parallax-strength";

type ParallaxEntry = "page-top" | "viewport";

type ParallaxContextValue = {
  progress: MotionValue<number>;
  strength: number;
};

const scrollOffsets: Record<ParallaxEntry, NonNullable<UseScrollOptions["offset"]>> = {
  "page-top": ["start start", "end start"],
  viewport: ["start end", "end start"],
};

const smoothing = { stiffness: 120, damping: 28, mass: 0.35 };

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

export function useParallaxScene(): ParallaxContextValue {
  const context = useContext(ParallaxContext);
  if (!context) throw new Error("ParallaxLayer precisa estar dentro de ParallaxScene");
  return context;
}

type ParallaxSceneProps = ComponentProps<"section"> & {
  entry: ParallaxEntry;
};

export function ParallaxScene({ entry, children, ...props }: ParallaxSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: scrollOffsets[entry],
  });
  const progress = useSpring(scrollYProgress, smoothing);
  const strength = useParallaxStrength();

  return (
    <ParallaxContext value={{ progress, strength }}>
      <section ref={sceneRef} {...props}>
        {children}
      </section>
    </ParallaxContext>
  );
}
