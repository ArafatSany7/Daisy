"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Lock, Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { formatPrice, shippingFor, site } from '@/lib/site';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const shipping = shippingFor(cartTotal);
  const remaining = site.freeShippingThreshold - cartTotal;
  const progress = Math.min(100, (cartTotal / site.freeShippingThreshold) * 100);

  return (
    <div className="bg-surface py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h1 className="font-display text-5xl mb-2">Your bag</h1>
        <p className="text-muted mb-10">
          {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : 'Nothing here yet'}
        </p>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 rounded-3xl bg-well">
            <h2 className="font-display text-3xl mb-3">Your bag is empty</h2>
            <p className="text-muted mb-8">Find something you love — it will wait for you here.</p>
            <Link href="/shop" className="btn btn-primary">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <ul className="divide-y divide-line border-y border-line">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-6 flex gap-4 sm:gap-6">
                    <Link href={`/product/${item.slug}`} className="relative w-24 h-32 rounded-2xl bg-well overflow-hidden shrink-0">
                      <Image src={item.img} alt={item.name} fill sizes="96px" className="object-contain p-2" />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link href={`/product/${item.slug}`} className="font-semibold hover:underline underline-offset-4">
                            {item.name}
                          </Link>
                          {item.size && <p className="text-sm text-muted mt-0.5">Size {item.size}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-9 h-9 -mt-1 -mr-2 shrink-0 rounded-full flex items-center justify-center text-muted hover:text-signal hover:bg-well"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-line bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink disabled:opacity-30"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-semibold tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/shop" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold hover:text-accent">
                <ArrowLeft size={16} /> Continue shopping
              </Link>
            </div>

            <aside className="lg:col-span-5" aria-label="Order summary">
              <div className="lg:sticky lg:top-28 rounded-3xl bg-white border border-line p-6 md:p-8">
                <h2 className="font-display text-2xl mb-6">Summary</h2>

                <div className="mb-6">
                  <p className="text-sm mb-2">
                    {remaining > 0 ? (
                      <>
                        You&apos;re <span className="font-semibold">{formatPrice(remaining)}</span> away from free shipping
                      </>
                    ) : (
                      <span className="font-semibold text-success">You&apos;ve unlocked free shipping</span>
                    )}
                  </p>
                  <div
                    className="h-1.5 rounded-full bg-well overflow-hidden"
                    role="progressbar"
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Progress to free shipping"
                  >
                    <div
                      className={`h-full rounded-full transition-[width] duration-500 ease-out ${remaining > 0 ? 'bg-accent' : 'bg-success'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <dl className="space-y-3 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="text-muted">Subtotal</dt>
                    <dd className="tabular-nums">{formatPrice(cartTotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Shipping</dt>
                    <dd className="tabular-nums">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-line text-lg font-semibold">
                    <dt>Total</dt>
                    <dd className="tabular-nums">{formatPrice(cartTotal + shipping)}</dd>
                  </div>
                </dl>

                <Link href="/checkout" className="btn btn-primary w-full h-14 text-[15px] mt-6">
                  <Lock size={16} /> Checkout securely
                </Link>
                <p className="text-xs text-muted text-center mt-4">
                  {site.returnWindowDays}-day returns · Secure payment
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
