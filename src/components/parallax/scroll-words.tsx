"use client";

import { motion, useTransform } from "motion/react";
import { useParallaxScene } from "./parallax-scene";

type ScrollWordsProps = {
  text: string;
  startIndex?: number;
  entranceDelay?: number;
};

type Drift = { x: number; y: number; rotate: number };

const drifts: readonly Drift[] = [
  { x: -90, y: -70, rotate: -6 },
  { x: 70, y: -120, rotate: 5 },
  { x: -40, y: -160, rotate: -3 },
  { x: 120, y: -70, rotate: 6 },
  { x: -130, y: -130, rotate: 4 },
  { x: 50, y: -100, rotate: -5 },
];

const dissolveEnd = 0.5;
const entranceEase = [0.22, 1, 0.36, 1] as const;

type ScrollWordProps = {
  word: string;
  index: number;
  entranceDelay: number;
};

function ScrollWord({ word, index, entranceDelay }: ScrollWordProps) {
  const { progress, strength } = useParallaxScene();
  const drift = drifts[index % drifts.length];
  const span = [0, dissolveEnd];

  const x = useTransform(progress, span, [0, drift.x * strength]);
  const y = useTransform(progress, span, [0, drift.y * strength]);
  const rotate = useTransform(progress, span, [0, drift.rotate * strength]);
  const opacity = useTransform(progress, [0.05, dissolveEnd], [1, 1 - strength]);
  const filter = useTransform(progress, span, ["blur(0px)", `blur(${8 * strength}px)`]);

  return (
    <motion.span
      data-parallax="hero-word"
      style={{ x, y, rotate, opacity, filter }}
      className="inline-block will-change-transform"
    >
      <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
        <motion.span
          data-reveal
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: entranceEase, delay: entranceDelay + index * 0.07 }}
          className="inline-block"
        >
          {word}
        </motion.span>
      </span>
    </motion.span>
  );
}

export function ScrollWords({ text, startIndex = 0, entranceDelay = 0.15 }: ScrollWordsProps) {
  const words = text.split(" ");

  return words.map((word, offset) => (
    <span key={`${word}-${offset}`}>
      {offset > 0 && " "}
      <ScrollWord word={word} index={startIndex + offset} entranceDelay={entranceDelay} />
    </span>
  ));
}
