"use client";

import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from '@/lib/motion';

/** Scroll-triggered reveal (replaces AOS). Animates once, transform + opacity only. */
export default function FadeIn({
  children,
  delay = 0,
  className = '',
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, ease: ease.out, delay }}
    >
      {children}
    </m.div>
  );
}
