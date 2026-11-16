"use client";

import { useEffect, useRef } from 'react';
import { animate, m, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';

export default function StatCounter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? value : 0);
  const text = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (isInView && !reduce) {
      const controls = animate(count, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [count, isInView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <m.span>{text}</m.span>
      {suffix}
    </span>
  );
}
