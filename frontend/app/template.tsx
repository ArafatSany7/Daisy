"use client";

import { motion } from 'framer-motion';
import { ease } from '@/lib/motion';

// Re-mounts on every route change: a short, subtle enter so navigation feels continuous.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: ease.out }}
      // Drop the transform once settled so it never creates a containing block for fixed/sticky children.
      transformTemplate={(_, generated) => (generated === 'translateY(0px)' || generated === 'none' ? 'none' : generated)}
    >
      {children}
    </motion.div>
  );
}
