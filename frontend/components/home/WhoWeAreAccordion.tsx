"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const items = [
  {
    title: 'Company Vision',
    body: 'To make considered, beautifully made clothing feel effortless to own — pieces you reach for season after season.',
  },
  {
    title: 'Company Mission',
    body: 'We design timeless essentials, source responsibly and deliver them with care, from our studio to your door.',
  },
  {
    title: 'Company Motto',
    body: 'Wear it often. Love it longer.',
  },
];

export default function WhoWeAreAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className={i < items.length - 1 ? 'border-b border-gray-200 pb-4' : ''}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`w-full text-left font-bold text-xs text-foreground transition-opacity ${isOpen ? '' : 'opacity-60 hover:opacity-100'}`}
            >
              {item.title}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-gray-500 text-[11px] leading-relaxed overflow-hidden"
                >
                  <span className="block pt-3">{item.body}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
