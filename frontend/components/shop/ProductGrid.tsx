"use client";

import { AnimatePresence, m } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import type { Product } from '@/lib/products';
import { ease, spring } from '@/lib/motion';

/**
 * Animated product grid. Because the shop page re-renders on the server when the
 * URL changes, this client component stays mounted across filter/sort changes:
 * items that remain glide to their new slot (layout), removed ones fade out,
 * and new ones fade up into place.
 */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <m.ul layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6">
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product, idx) => (
          <m.li
            key={product.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18, ease: ease.in } }}
            transition={{
              layout: spring.smooth,
              opacity: { duration: 0.35, ease: ease.out, delay: Math.min(idx, 8) * 0.025 },
              y: { duration: 0.35, ease: ease.out, delay: Math.min(idx, 8) * 0.025 },
              scale: { duration: 0.35, ease: ease.out },
            }}
          >
            <ProductCard product={product} priority={idx < 4} />
          </m.li>
        ))}
      </AnimatePresence>
    </m.ul>
  );
}
