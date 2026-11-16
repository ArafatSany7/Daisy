"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { ease } from '@/lib/motion';
import { formatPrice, shippingFor, site } from '@/lib/site';

const inputClass =
  'peer w-full h-12 px-4 rounded-xl bg-white border border-line text-[15px] placeholder:text-muted/70 focus:outline-none focus:border-ink focus:ring-4 focus:ring-accent/10 transition-shadow [&:user-invalid]:border-signal';

function Field({
  label,
  name,
  type = 'text',
  autoComplete,
  required = true,
  placeholder,
  error,
  className = '',
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
}) {
  const id = `checkout-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
        {!required && <span className="text-muted font-normal"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className={inputClass}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        // Shown by CSS only after the browser marks the field invalid on interaction.
        <p id={`${id}-error`} className="hidden peer-[:user-invalid]:block text-xs text-signal mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

const steps = ['Bag', 'Details', 'Confirmation'];

function Steps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 text-sm mb-8" aria-label="Checkout progress">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
              i < current ? 'bg-ink text-white' : i === current ? 'bg-accent text-white' : 'bg-well text-muted'
            }`}
            aria-hidden="true"
          >
            {i < current ? <Check size={13} strokeWidth={3} /> : i + 1}
          </span>
          <span className={i === current ? 'font-semibold' : 'text-muted'} aria-current={i === current ? 'step' : undefined}>
            {i === 0 && current > 0 ? <Link href="/cart" className="hover:text-ink">{s}</Link> : s}
          </span>
          {i < steps.length - 1 && <span className="w-6 h-px bg-line mx-1" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

const confirmContainer: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } };
const confirmItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.out } },
};

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
      <div className="container mx-auto px-4 sm:px-6 py-20 md:py-28 max-w-xl text-center">
        <motion.div
          className="mx-auto mb-8 w-20 h-20 rounded-full bg-success/10 flex items-center justify-center"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-success" aria-hidden="true">
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: ease.out, delay: 0.2 }}
            />
          </svg>
        </motion.div>
        <motion.div variants={confirmContainer} initial="hidden" animate="visible">
          <motion.h1 variants={confirmItem} className="font-display text-4xl md:text-5xl mb-3">
            Thank you for your order
          </motion.h1>
          <motion.p variants={confirmItem} className="text-muted mb-2">
            Your order number is <span className="font-semibold text-ink">{orderNumber}</span>.
          </motion.p>
          <motion.p variants={confirmItem} className="text-muted text-sm mb-10">
            We&apos;ll email you a confirmation with tracking details shortly.
          </motion.p>
          <motion.div variants={confirmItem} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn btn-primary">
              Continue shopping
            </Link>
            <Link href="/track-order" className="btn btn-outline">
              Track your order
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-24 max-w-xl text-center">
        <h1 className="font-display text-4xl mb-4">Your bag is empty</h1>
        <p className="text-muted mb-8">Add a few things you love, then come back to check out.</p>
        <Link href="/shop" className="btn btn-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface py-10 md:py-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <Steps current={1} />
        <h1 className="font-display text-4xl md:text-5xl mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <form onSubmit={onSubmit} className="lg:col-span-7 space-y-10">
            <fieldset>
              <legend className="font-display text-2xl mb-5">Contact</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" error="Enter a valid email address." />
                <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" error="Enter a phone number for delivery updates." />
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-2xl mb-5">Delivery address</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First name" name="firstName" autoComplete="given-name" error="Enter your first name." />
                <Field label="Last name" name="lastName" autoComplete="family-name" error="Enter your last name." />
                <Field label="Address" name="address" autoComplete="street-address" placeholder="House, road, area" error="Enter your delivery address." className="sm:col-span-2" />
                <Field label="City" name="city" autoComplete="address-level2" error="Enter your city." />
                <Field label="Postcode" name="postcode" autoComplete="postal-code" required={false} />
              </div>
            </fieldset>

            <div className="space-y-4">
              <button type="submit" className="btn btn-primary w-full h-14 text-[15px]">
                <Lock size={16} aria-hidden="true" /> Place order · {formatPrice(cartTotal + shipping)}
              </button>
              <p className="text-xs text-muted text-center">
                Demo checkout — no payment is taken and no order is sent yet.
              </p>
            </div>
          </form>

          <aside
            className="lg:col-span-5 rounded-3xl bg-white border border-line p-6 md:p-8 h-fit lg:sticky lg:top-28"
            aria-label="Order summary"
          >
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display text-2xl">Order summary</h2>
              <Link href="/cart" className="text-sm text-muted hover:text-ink link-underline">
                Edit bag
              </Link>
            </div>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-20 rounded-xl bg-well shrink-0">
                    <Image src={item.img} alt={item.name} fill sizes="64px" className="object-contain p-1.5" />
                    <span className="absolute -top-2 -right-2 bg-ink text-white text-xs font-semibold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 text-sm">
                    <p className="font-semibold truncate">{item.name}</p>
                    {item.size && <p className="text-xs text-muted">Size {item.size}</p>}
                  </div>
                  <span className="text-sm font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="space-y-3 text-[15px] border-t border-line pt-6">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-4 border-t border-line">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPrice(cartTotal + shipping)}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-muted">
              {site.returnWindowDays}-day returns · Free shipping over {formatPrice(site.freeShippingThreshold)}
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
