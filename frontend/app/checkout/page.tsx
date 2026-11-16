"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Lock } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { formatPrice, shippingFor } from '@/lib/site';

const inputClass =
  'w-full h-12 px-4 rounded-xl bg-white border border-line text-[15px] placeholder:text-muted focus:outline-none focus:border-ink focus:ring-4 focus:ring-accent/10 transition-shadow';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const shipping = shippingFor(cartTotal);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send the order to the backend once the orders API exists.
    setOrderNumber(`DSY-${Date.now().toString().slice(-6)}`);
    clearCart();
    window.scrollTo({ top: 0 });
  };

  if (orderNumber) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-xl text-center">
        <CheckCircle2 size={56} className="mx-auto text-success mb-6" />
        <h1 className="font-display text-4xl mb-3">Thank you for your order</h1>
        <p className="text-muted mb-2">
          Your order number is <span className="font-bold text-ink">{orderNumber}</span>.
        </p>
        <p className="text-muted text-sm mb-10">We&apos;ll email you a confirmation with tracking details shortly.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn btn-primary">
            Continue shopping
          </Link>
          <Link href="/track-order" className="btn btn-outline">
            Track your order
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 max-w-xl text-center">
        <h1 className="font-display text-4xl mb-4">Your bag is empty</h1>
        <p className="text-muted mb-8">Add a few things you love, then come back to check out.</p>
        <Link href="/shop" className="btn btn-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/cart" className="hover:text-primary">Cart</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-ink">Checkout</span>
        </nav>
        <h1 className="font-display text-5xl mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <form id="checkout-form" onSubmit={onSubmit} className="lg:col-span-3 space-y-8">
            <fieldset className="space-y-4">
              <legend className="font-display text-2xl mb-4">Contact</legend>
              <input className={inputClass} type="email" name="email" placeholder="Email" autoComplete="email" required />
              <input className={inputClass} type="tel" name="phone" placeholder="Phone" autoComplete="tel" required />
            </fieldset>
            <fieldset className="space-y-4">
              <legend className="font-display text-2xl mb-4">Delivery</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className={inputClass} name="firstName" placeholder="First name" autoComplete="given-name" required />
                <input className={inputClass} name="lastName" placeholder="Last name" autoComplete="family-name" required />
              </div>
              <input className={inputClass} name="address" placeholder="Address" autoComplete="street-address" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input className={inputClass} name="city" placeholder="City" autoComplete="address-level2" required />
                <input className={inputClass} name="postcode" placeholder="Postcode" autoComplete="postal-code" />
              </div>
            </fieldset>
            <p className="text-sm text-muted bg-well rounded-xl p-4">
              Demo checkout: no payment is taken and no order is sent yet.
            </p>
            <button
              type="submit"
              className="btn btn-primary w-full h-14 text-[15px]"
            >
              <Lock size={14} /> Place order · {formatPrice(cartTotal + shipping)}
            </button>
          </form>

          <aside className="lg:col-span-2 rounded-3xl bg-white border border-line p-6 md:p-8 h-fit lg:sticky lg:top-28" aria-label="Order summary">
            <h2 className="font-display text-2xl mb-6">Order summary</h2>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-20 rounded-xl bg-well shrink-0">
                    <Image src={item.img} alt={item.name} fill sizes="64px" className="object-contain" />
                    <span className="absolute -top-2 -right-2 bg-ink text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-semibold">{item.name}</p>
                    {item.size && <p className="text-xs text-muted">Size: {item.size}</p>}
                  </div>
                  <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="space-y-3 text-sm border-t border-line pt-6">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd>{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between font-bold text-base pt-3 border-t border-line">
                <dt>Total</dt>
                <dd>{formatPrice(cartTotal + shipping)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
