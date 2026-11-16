"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-[#F6F6F6] overflow-hidden">
        <Image
          key={images[active]}
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4" role="tablist" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative aspect-square bg-[#F6F6F6] border-2 transition-colors ${
                i === active ? 'border-primary' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
