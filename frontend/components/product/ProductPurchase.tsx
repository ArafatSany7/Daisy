"use client";

import { useState } from 'react';
import Link from 'next/link';
import { m, useAnimationControls } from 'framer-motion';
import { Minus, Plus, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { useAddToCart } from '@/components/cart/useAddToCart';
import type { Product } from '@/lib/products';
import { formatPrice, site } from '@/lib/site';

export default function ProductPurchase({ product }: { product: Product }) {
  const addToCart = useAddToCart();
  const sizeRow = useAnimationControls();
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const needsSize = !!product.sizes?.length;
  // Low-stock messaging is intentionally hidden until real inventory data exists.

  const handleAdd = () => {
    if (needsSize && !size) {
      setShowSizeError(true);
      sizeRow.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } });
      return false;
    }
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.title,
      price: product.price,
      oldPrice: product.oldPrice,
      img: product.images[0],
      size: size ?? undefined,
      quantity,
    });
    return true;
  };

  return (
    <div>
      {needsSize && (
        <fieldset className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <legend className="text-sm font-semibold">
              Size{size ? <span className="font-normal text-muted"> · {size}</span> : null}
            </legend>
            <Link href="/help#sizing" className="text-sm text-muted link-underline">
              Size guide
            </Link>
          </div>
          <m.div animate={sizeRow} className="flex flex-wrap gap-2" aria-describedby={showSizeError ? 'size-error' : undefined}>
            {product.sizes!.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setShowSizeError(false);
                }}
                className={`min-w-14 h-12 px-4 rounded-full border text-sm font-semibold transition-all active:scale-95 ${
                  size === s
                    ? 'bg-ink text-white border-ink'
                    : showSizeError
                      ? 'border-signal/60 hover:border-ink'
                      : 'border-line bg-white hover:border-ink'
                }`}
              >
                {s}
              </button>
            ))}
          </m.div>
          {showSizeError && (
            <p id="size-error" role="alert" className="text-sm text-signal mt-3">
              Choose a size to add this to your bag.
            </p>
          )}
        </fieldset>
      )}

      <div className="flex gap-3">
        <div className="flex items-center h-14 rounded-full border border-line bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-12 h-full flex items-center justify-center text-muted hover:text-ink disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-semibold tabular-nums" aria-live="polite" aria-label={`Quantity ${quantity}`}>
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
            className="w-12 h-full flex items-center justify-center text-muted hover:text-ink"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        <AddToCartButton onAdd={handleAdd} className="flex-1 h-14 text-[15px]" successLabel="Added to bag" />
      </div>

      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted">
        <li className="flex items-center gap-2 rounded-xl bg-well px-3 py-3">
          <Truck size={16} className="text-accent shrink-0" aria-hidden="true" /> Free over {formatPrice(site.freeShippingThreshold)}
        </li>
        <li className="flex items-center gap-2 rounded-xl bg-well px-3 py-3">
          <RotateCcw size={16} className="text-accent shrink-0" aria-hidden="true" /> {site.returnWindowDays}-day returns
        </li>
        <li className="flex items-center gap-2 rounded-xl bg-well px-3 py-3">
          <ShieldCheck size={16} className="text-accent shrink-0" aria-hidden="true" /> Secure checkout
        </li>
      </ul>
    </div>
  );
}
