"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type UseScrollOptions,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { useParallaxStrength } from "@/hooks/use-parallax-strength";

type HowStep = {
  id: string;
  title: string;
  text: string;
};

type HowStepsProps = {
  steps: HowStep[];
  children: ReactNode;
};

type StepItemProps = {
  step: HowStep;
  index: number;
  isLast: boolean;
  onActivate: (index: number) => void;
};

const readingLine: NonNullable<UseScrollOptions["offset"]> = ["start 62%", "end 62%"];
const smoothing = { stiffness: 140, damping: 30, mass: 0.3 };

function StepItem({ step, index, isLast, onActivate }: StepItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const strength = useParallaxStrength();
  const { scrollYProgress } = useScroll({ target: itemRef, offset: readingLine });
  const progress = useSpring(scrollYProgress, smoothing);

  const lineFill = useTransform(progress, [0, 1], [strength === 0 ? 1 : 0, 1]);
  const markerFill = useTransform(progress, [0, 0.12], [strength === 0 ? 1 : 0, 1]);
  const textShift = useTransform(progress, [0, 0.3], [32 * strength, 0]);
  const peak = 1 + 0.12 * strength;
  const markerScale = useTransform(progress, [0, 0.12, 0.5, 1], [1, peak, peak, 1]);

  useMotionValueEvent(progress, "change", (value) => {
    if (value > 0.02 && value < 0.98) onActivate(index);
  });

  return (
    <li
      ref={itemRef}
      data-testid="how-step"
      className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 pb-14 last:pb-0 lg:min-h-[44vh] lg:gap-x-8 lg:pb-0"
    >
      <div className="relative flex justify-center">
        <motion.span
          aria-hidden="true"
          style={{ scale: markerScale }}
          className="relative grid size-14 place-items-center rounded-full border-2 border-primary/40 bg-background font-display text-2xl font-semibold text-primary"
        >
          {index + 1}
          <motion.span
            data-parallax="how-marker"
            style={{ opacity: markerFill }}
            className="absolute -inset-0.5 grid place-items-center rounded-full bg-primary text-primary-foreground"
          >
            {index + 1}
          </motion.span>
        </motion.span>
        {!isLast && (
          <>
            <span
              aria-hidden="true"
              className="road-dash-y absolute -bottom-0 left-1/2 top-16 w-[3px] -translate-x-1/2 text-primary/25 lg:-bottom-0"
            />
            <motion.span
              aria-hidden="true"
              data-parallax="how-line"
              style={{ scaleY: lineFill }}
              className="absolute bottom-0 left-1/2 top-16 w-[3px] origin-top -translate-x-1/2 rounded-full bg-primary"
            />
          </>
        )}
      </div>
      <motion.div data-parallax="how-text" style={{ x: textShift }} className="pt-2 lg:pt-3">
        <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{step.title}</h3>
        <p className="mt-2 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          {step.text}
        </p>
      </motion.div>
    </li>
  );
}

function ActiveNumeral({ value, total }: { value: number; total: number }) {
  const strength = useParallaxStrength();
  const duration = strength === 0 ? 0 : 0.45;

  return (
    <div aria-hidden="true" className="relative mt-12 hidden h-56 items-end gap-3 lg:flex">
      <div className="relative h-full w-40 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: "70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-70%", opacity: 0 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-end font-display text-[11rem] font-light italic leading-[0.8] text-lilac"
          >
            {value + 1}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mb-3 font-display text-3xl font-light italic text-muted-foreground">
        / {total}
      </span>
    </div>
  );
}

export function HowSteps({ steps, children }: HowStepsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-14 px-4 sm:px-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-24 lg:px-12">
      <div className="lg:sticky lg:top-28 lg:self-start">
        {children}
        <ActiveNumeral value={activeIndex} total={steps.length} />
      </div>
      <ol role="list" className="lg:pt-6">
        {steps.map((step, index) => (
          <StepItem
            key={step.id}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            onActivate={setActiveIndex}
          />
        ))}
      </ol>
    </div>
  );
}
