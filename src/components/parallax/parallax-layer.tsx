"use client";

import { motion, useTransform, type HTMLMotionProps, type MotionStyle } from "motion/react";
import { cn } from "@/lib/utils";
import { useParallaxScene } from "./parallax-scene";

type Range = readonly [from: number, to: number];

type ParallaxLayerProps = Omit<HTMLMotionProps<"div">, "style"> & {
  name: string;
  y?: Range;
  x?: Range;
  rotate?: Range;
  scale?: Range;
  opacity?: Range;
  span?: Range;
};

const fullSpan: Range = [0, 1];
const idleRange: Range = [0, 0];

function attenuate([from, to]: Range, strength: number): [number, number] {
  return [from, from + (to - from) * strength];
}

export function ParallaxLayer({
  name,
  y,
  x,
  rotate,
  scale,
  opacity,
  span = fullSpan,
  className,
  ...props
}: ParallaxLayerProps) {
  const { progress, strength } = useParallaxScene();
  const input = [span[0], span[1]];

  const yValue = useTransform(progress, input, attenuate(y ?? idleRange, strength));
  const xValue = useTransform(progress, input, attenuate(x ?? idleRange, strength));
  const rotateValue = useTransform(progress, input, attenuate(rotate ?? idleRange, strength));
  const scaleValue = useTransform(progress, input, attenuate(scale ?? [1, 1], strength));
  const opacityValue = useTransform(progress, input, attenuate(opacity ?? [1, 1], strength));

  const style: MotionStyle = {
    ...(y && { y: yValue }),
    ...(x && { x: xValue }),
    ...(rotate && { rotate: rotateValue }),
    ...(scale && { scale: scaleValue }),
    ...(opacity && { opacity: opacityValue }),
  };

  return (
    <motion.div
      data-parallax={name}
      style={style}
      className={cn("will-change-transform", className)}
      {...props}
    />
  );
}
