"use client";

import { useCallback } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Check } from 'lucide-react';
import { useCart, type AddToCartInput } from '@/app/context/CartContext';

/**
 * Adds an item and confirms with a toast instead of interrupting with the drawer,
 * so shoppers can keep browsing. "View bag" opens the drawer on demand.
 */
export function useAddToCart() {
  const { addToCart, openCart } = useCart();

  return useCallback(
    (item: AddToCartInput) => {
      addToCart(item, { openCart: false });
      toast.custom(
        (id) => (
          <div
            role="status"
            className="w-full sm:w-[380px] flex items-center gap-3 rounded-2xl bg-ink text-white p-3 pr-3 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.45)] ring-1 ring-white/10"
          >
            <div className="relative w-12 h-14 shrink-0 rounded-lg bg-white overflow-hidden">
              <Image src={item.img} alt="" fill sizes="48px" className="object-contain p-1" />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center ring-2 ring-ink">
                <Check size={12} strokeWidth={3} />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Added to your bag</p>
              <p className="text-xs text-white/70 truncate">
                {item.name}
                {item.size ? ` · ${item.size}` : ''}
                {item.quantity && item.quantity > 1 ? ` · ×${item.quantity}` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                toast.dismiss(id);
                openCart();
              }}
              className="shrink-0 h-9 px-4 rounded-full bg-white text-ink text-xs font-semibold hover:bg-well transition-colors"
            >
              View bag
            </button>
          </div>
        ),
        { duration: 3500 },
      );
    },
    [addToCart, openCart],
  );
}
