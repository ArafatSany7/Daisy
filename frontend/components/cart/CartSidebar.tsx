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
            className="fixed inset-0 bg-black/20 z-[60]"
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
            className="fixed right-0 top-0 h-full w-full max-w-[380px] bg-white shadow-2xl z-[60] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-lg">Shopping Cart</h2>
              <button type="button" onClick={closeCart} className="text-gray-400 hover:text-black" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center mt-10">
                  <p className="text-gray-500 mb-6">Your cart is empty.</p>
                  <Link onClick={closeCart} href="/shop" className="inline-block bg-primary text-white px-6 py-3 font-bold text-sm hover:bg-primary/90 transition-colors">
                    Start shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 relative">
                    <Link onClick={closeCart} href={`/product/${item.slug}`} className="relative w-20 h-24 bg-gray-50 flex-shrink-0">
                      <Image src={item.img} alt={item.name} fill sizes="80px" className="object-contain" />
                    </Link>
                    <div className="flex flex-col justify-center flex-1 pr-6">
                      <Link onClick={closeCart} href={`/product/${item.slug}`} className="text-sm font-bold text-gray-800 leading-tight mb-1 hover:text-primary">
                        {item.name}
                      </Link>
                      {item.size && <p className="text-xs text-gray-500 mb-1">Size: {item.size}</p>}
                      <p className="text-sm text-[#28A745] mb-2">{formatPrice(item.price)}</p>
                      <div className="flex items-center border border-gray-200 w-fit">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 text-gray-500 hover:text-black disabled:opacity-30"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-gray-500 hover:text-black"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-base">Subtotal:</span>
                  <span className="font-bold text-xl">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <Link
                    onClick={closeCart}
                    href="/cart"
                    className="w-full py-3 bg-white border border-gray-200 text-center font-bold text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    View cart
                  </Link>
                  <Link
                    onClick={closeCart}
                    href="/checkout"
                    className="w-full py-3 bg-primary text-white text-center font-bold text-sm hover:bg-primary/90 transition-colors"
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
