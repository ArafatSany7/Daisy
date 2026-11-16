"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { Lock, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { Sheet } from '@/components/ui/sheet';
import { ease, spring } from '@/lib/motion';
import { formatPrice, site } from '@/lib/site';

export default function CartSidebar() {
  const { cartItems, isCartOpen, openCart, closeCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const pathname = usePathname();
  const remaining = site.freeShippingThreshold - cartTotal;
  const progress = Math.min(100, (cartTotal / site.freeShippingThreshold) * 100);

  // Close the drawer after navigating (e.g. clicking a product or Checkout).
  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  const footer =
    cartItems.length > 0 ? (
      <footer className="shrink-0 border-t border-line bg-white px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold text-xl tabular-nums">{formatPrice(cartTotal)}</span>
        </div>
        <p className="text-xs text-muted mb-5">Shipping and taxes calculated at checkout.</p>
        <Link href="/checkout" onClick={closeCart} className="btn btn-primary w-full h-14 text-[15px]">
          <Lock size={16} aria-hidden="true" /> Checkout securely
        </Link>
        <Link
          href="/cart"
          onClick={closeCart}
          className="mt-3 flex justify-center text-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          View full bag
        </Link>
      </footer>
    ) : null;

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => (open ? openCart() : closeCart())}
      title={
        <span className="flex items-baseline gap-2">
          Your bag
          {cartCount > 0 && <span className="font-sans text-sm text-muted tabular-nums">({cartCount})</span>}
        </span>
      }
      description="Review the items in your shopping bag"
      footer={footer}
    >
      {cartItems.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center px-8 py-16">
          <span className="w-16 h-16 rounded-full bg-well flex items-center justify-center text-muted mb-5">
            <ShoppingBag size={26} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <p className="font-display text-2xl mb-2">Your bag is empty</p>
          <p className="text-muted text-sm mb-7">Find something you love — it will wait for you here.</p>
          <Link href="/shop" onClick={closeCart} className="btn btn-primary">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="px-6 pb-6">
          {/* Free-shipping progress */}
          <div className="py-5">
            <p className="text-sm mb-2.5" aria-live="polite">
              {remaining > 0 ? (
                <>
                  Add <span className="font-semibold">{formatPrice(remaining)}</span> for free shipping
                </>
              ) : (
                <span className="font-semibold text-success">You&apos;ve unlocked free shipping</span>
              )}
            </p>
            <div
              className="h-1.5 rounded-full bg-well overflow-hidden"
              role="progressbar"
              aria-label="Progress to free shipping"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <m.div
                className={`h-full rounded-full origin-left ${remaining > 0 ? 'bg-accent' : 'bg-success'}`}
                initial={false}
                animate={{ scaleX: progress / 100 }}
                transition={spring.smooth}
              />
            </div>
          </div>

          <ul className="border-t border-line">
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <m.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24, height: 0, paddingTop: 0, paddingBottom: 0, transition: { duration: 0.25, ease: ease.in } }}
                  transition={{ duration: 0.3, ease: ease.out, layout: spring.smooth }}
                  className="flex gap-4 py-5 border-b border-line overflow-hidden"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative w-20 h-24 shrink-0 rounded-xl bg-well overflow-hidden"
                  >
                    <Image src={item.img} alt={item.name} fill sizes="80px" className="object-contain p-1.5" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="block text-sm font-semibold leading-snug hover:underline underline-offset-4"
                        >
                          {item.name}
                        </Link>
                        {item.size && <p className="text-xs text-muted mt-0.5">Size {item.size}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 -mt-1 -mr-1.5 shrink-0 rounded-full flex items-center justify-center text-muted hover:text-signal hover:bg-well transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={15} />
                      </button>
                    </div>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line bg-white">
                        <m.button
                          type="button"
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-9 h-9 flex items-center justify-center text-muted hover:text-ink disabled:opacity-30"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={13} />
                        </m.button>
                        <span className="w-6 text-center text-sm font-semibold tabular-nums" aria-label={`Quantity ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <m.button
                          type="button"
                          whileTap={{ scale: 0.85 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-muted hover:text-ink"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={13} />
                        </m.button>
                      </div>
                      <span className="text-sm font-semibold tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </Sheet>
  );
}
