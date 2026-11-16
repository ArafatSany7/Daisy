"use client";

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, m } from 'framer-motion';

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3" role="group" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-pressed={i === active}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              onClick={() => setActive(i)}
              className={`relative w-20 h-24 shrink-0 rounded-xl bg-well overflow-hidden ring-offset-2 ring-offset-surface transition-all ${
                i === active ? 'ring-2 ring-ink' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
      <div className="relative flex-1 aspect-[4/5] rounded-3xl bg-well overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <m.div
            key={images[active]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={images[active]}
              alt={title}
              fill
              preload={active === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain p-8 md:p-12"
            />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
