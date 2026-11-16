"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import { formatPrice } from '@/lib/site';

export default function CartSidebar() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const pathname = usePathname();

  // Close the drawer whenever the route changes (e.g. after clicking a product or Checkout).
  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-ink/30 backdrop-blur-[2px] z-[60]"
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-surface shadow-2xl z-[60] flex flex-col"
          >
            <div className="px-6 h-[72px] border-b border-line flex justify-between items-center">
              <h2 className="font-display text-2xl">Your bag</h2>
              <button type="button" onClick={closeCart} className="w-11 h-11 -mr-2 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-well" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center mt-10">
                  <p className="font-display text-2xl mb-2">Your bag is empty</p>
                  <p className="text-muted text-sm mb-6">Find something you love — it will wait for you here.</p>
                  <Link onClick={closeCart} href="/shop" className="btn btn-primary">
                    Start shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-line pb-5 relative">
                    <Link onClick={closeCart} href={`/product/${item.slug}`} className="relative w-20 h-24 bg-well rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.img} alt={item.name} fill sizes="80px" className="object-contain" />
                    </Link>
                    <div className="flex flex-col justify-center flex-1 pr-6">
                      <Link onClick={closeCart} href={`/product/${item.slug}`} className="text-sm font-semibold leading-snug mb-1 hover:underline underline-offset-4">
                        {item.name}
                      </Link>
                      {item.size && <p className="text-xs text-muted mb-1">Size: {item.size}</p>}
                      <p className="text-sm font-semibold mb-2">{formatPrice(item.price)}</p>
                      <div className="flex items-center rounded-full border border-line bg-white w-fit">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-muted hover:text-ink disabled:opacity-30"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted hover:text-ink"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="absolute right-0 top-0 w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-signal hover:bg-well"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-line bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold text-xl tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs text-muted -mt-4 mb-5">Shipping calculated at checkout.</p>
                <div className="flex flex-col gap-3">
                  <Link
                    onClick={closeCart}
                    href="/cart"
                    className="btn btn-outline w-full"
                  >
                    View cart
                  </Link>
                  <Link
                    onClick={closeCart}
                    href="/checkout"
                    className="btn btn-primary w-full h-14 text-[15px]"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
