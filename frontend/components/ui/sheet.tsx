"use client";

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ease, spring } from '@/lib/motion';

/**
 * Side sheet built on Radix Dialog (the same primitive shadcn/ui's Sheet uses):
 * focus trap, Esc to close, scroll lock, aria-modal and focus return are handled by Radix.
 * framer-motion drives enter/exit via forceMount + AnimatePresence.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3, ease: ease.out } }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: ease.in } }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount {...(description ? {} : { 'aria-describedby': undefined })}>
              <motion.aside
                className="fixed right-0 top-0 z-[60] h-dvh w-full sm:max-w-[440px] bg-surface flex flex-col shadow-[-24px_0_60px_-20px_rgb(0_0_0/0.3)] focus:outline-none"
                initial={{ x: '100%' }}
                animate={{ x: 0, transition: spring.smooth }}
                exit={{ x: '100%', transition: { duration: 0.25, ease: ease.in } }}
              >
                <header className="px-6 h-[72px] shrink-0 border-b border-line flex items-center justify-between">
                  <Dialog.Title className="font-display text-2xl">{title}</Dialog.Title>
                  <Dialog.Close
                    className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-well transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </Dialog.Close>
                </header>
                {description ? (
                  <Dialog.Description className="sr-only">{description}</Dialog.Description>
                ) : null}
                <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
                {footer}
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
