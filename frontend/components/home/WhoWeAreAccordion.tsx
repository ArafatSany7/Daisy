"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const items = [
  {
    title: 'Our vision',
    body: 'To make considered, beautifully made clothing feel effortless to own — pieces you reach for season after season.',
  },
  {
    title: 'Our mission',
    body: 'We design timeless essentials, source responsibly and deliver them with care, from our studio to your door.',
  },
  {
    title: 'Our motto',
    body: 'Wear it often. Love it longer.',
  },
];

export default function WhoWeAreAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `story-panel-${i}`;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between gap-4 py-4 text-left text-[15px] font-semibold"
              >
                {item.title}
                <Plus
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-muted">{item.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
