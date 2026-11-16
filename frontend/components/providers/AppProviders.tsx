"use client";

import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { CartProvider } from '@/app/context/CartContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    // "user" honours the OS reduce-motion setting for every framer-motion animation.
    <MotionConfig reducedMotion="user">
      <CartProvider>
        {children}
        <Toaster
          position="bottom-right"
          offset={20}
          mobileOffset={16}
          gap={10}
          visibleToasts={3}
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'group w-full sm:w-[380px] flex items-center gap-3 rounded-2xl bg-ink text-white p-3 pr-4 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.45)] ring-1 ring-white/10',
              title: 'text-sm font-semibold',
              description: 'text-xs text-white/70',
              actionButton:
                'ml-auto shrink-0 h-9 px-4 rounded-full bg-white text-ink text-xs font-semibold hover:bg-well transition-colors',
            },
          }}
        />
      </CartProvider>
    </MotionConfig>
  );
}
