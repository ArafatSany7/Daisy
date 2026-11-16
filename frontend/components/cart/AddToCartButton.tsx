"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { ease, spring } from '@/lib/motion';

type Status = 'idle' | 'success';

/**
 * Primary add-to-cart CTA with tactile feedback:
 * press → spring pop → label morphs into a checkmark → settles back.
 * `onAdd` returns false when the add was blocked (e.g. no size chosen) to skip the success state.
 */
export default function AddToCartButton({
  onAdd,
  label = 'Add to cart',
  successLabel = 'Added',
  className = '',
  icon = true,
}: {
  onAdd: () => boolean | void;
  label?: string;
  successLabel?: string;
  className?: string;
  icon?: boolean;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleClick = () => {
    if (onAdd() === false) return;
    setStatus('success');
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 1600);
  };

  const success = status === 'success';

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      animate={success ? { scale: [1, 1.04, 1] } : { scale: 1 }}
      transition={success ? { duration: 0.35, ease: ease.out } : spring.snappy}
      aria-live="polite"
      // framer-motion owns `transform` here, so CSS only transitions colour and shadow.
      className={`btn btn-primary overflow-hidden !transition-[background-color,box-shadow,color] hover:!translate-y-0 ${
        success ? '!bg-success' : ''
      } ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {success ? (
          <motion.span
            key="success"
            className="inline-flex items-center gap-2"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.22, ease: ease.out }}
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <motion.path
                d="M5 12.5l4.5 4.5L19 7.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: ease.out, delay: 0.05 }}
              />
            </motion.svg>
            {successLabel}
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            className="inline-flex items-center gap-2"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.22, ease: ease.out }}
          >
            {icon && <ShoppingBag size={18} aria-hidden="true" />}
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
