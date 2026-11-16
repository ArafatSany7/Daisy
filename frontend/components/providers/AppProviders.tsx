"use client";

import { LazyMotion, MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { CartProvider } from '@/app/context/CartContext';

// Animation features are code-split and fetched after the page is interactive.
const loadMotionFeatures = () => import('@/lib/motion-features').then((mod) => mod.default);

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    // strict: throws if any component imports the full `motion` instead of the lightweight `m`.
    <LazyMotion features={loadMotionFeatures} strict>
      {/* "user" honours the OS reduce-motion setting for every framer-motion animation. */}
      <MotionConfig reducedMotion="user">
        <CartProvider>
          {children}
          <Toaster
            position="bottom-right"
            offset={20}
            mobileOffset={16}
            gap={10}
            visibleToasts={3}
            toastOptions={{ unstyled: true }}
          />
        </CartProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
