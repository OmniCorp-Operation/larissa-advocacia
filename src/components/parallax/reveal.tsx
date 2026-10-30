"use client";

import { motion, type HTMLMotionProps, type TargetAndTransition } from "motion/react";

type RevealVariant = "rise" | "pop" | "wipe" | "unveil";

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "variants"> & {
  variant?: RevealVariant;
  delay?: number;
};

const hiddenStates: Record<RevealVariant, TargetAndTransition> = {
  rise: { opacity: 0, y: 28 },
  pop: { opacity: 0, scale: 0.9 },
  wipe: { clipPath: "inset(-10% 100% -10% 0%)" },
  unveil: { clipPath: "inset(100% 0% 0% 0%)" },
};

const shownStates: Record<RevealVariant, TargetAndTransition> = {
  rise: { opacity: 1, y: 0 },
  pop: { opacity: 1, scale: 1 },
  wipe: { clipPath: "inset(-10% -10% -10% 0%)" },
  unveil: { clipPath: "inset(0% 0% 0% 0%)" },
};

export function Reveal({ variant = "rise", delay = 0, transition, ...props }: RevealProps) {
  return (
    <motion.div
      data-reveal
      initial={hiddenStates[variant]}
      whileInView={shownStates[variant]}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay, ...transition }}
      {...props}
    />
  );
}
