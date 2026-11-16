"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import type { Product } from '@/lib/products';

export default function ProductPurchase({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const needsSize = !!product.sizes?.length;
  const lowStock = product.stock > 0 && product.stock <= 8;

  const handleAdd = () => {
    if (needsSize && !size) {
      setShowSizeError(true);
      return;
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
  };

  return (
    <div className="mb-8">
      {needsSize && (
        <fieldset className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <legend className="font-bold text-sm">
              Size{size && <span className="font-normal text-gray-500">: {size}</span>}
            </legend>
            <Link href="/help#sizing" className="text-xs underline text-gray-500 hover:text-primary">
              Size guide
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes!.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setShowSizeError(false);
                }}
                className={`min-w-12 h-12 px-3 border text-sm font-medium transition-colors ${
                  size === s ? 'bg-[#2A2A2A] text-white border-[#2A2A2A]' : 'border-gray-200 hover:border-[#2A2A2A]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {showSizeError && (
            <p role="alert" className="text-sm text-red-600 mt-3">
              Please choose a size.
            </p>
          )}
        </fieldset>
      )}

      {lowStock && <p className="text-sm text-[#C77700] font-medium mb-4">Only {product.stock} left in stock</p>}

      <div className="flex gap-3">
        <div className="flex items-center border border-gray-200">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="px-4 h-14 text-gray-500 hover:text-black disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center tabular-nums" aria-live="polite">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
            className="px-4 h-14 text-gray-500 hover:text-black"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 bg-[#2A2A2A] text-white h-14 font-bold text-sm uppercase tracking-wider hover:bg-primary transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
