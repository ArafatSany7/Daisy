"use client";

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ease } from '@/lib/motion';

// The first page load must paint server-rendered HTML immediately (LCP), so the
// enter animation only runs for client-side navigations after hydration.
let hasHydrated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animateIn] = useState(() => hasHydrated);

  useEffect(() => {
    hasHydrated = true;
  }, []);

  return (
    <m.div
      initial={animateIn ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: ease.out }}
      // Drop the transform once settled so it never creates a containing block for fixed/sticky children.
      transformTemplate={(_, generated) => (generated === 'translateY(0px)' || generated === 'none' ? 'none' : generated)}
    >
      {children}
    </m.div>
  );
}
