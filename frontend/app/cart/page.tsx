"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { useCart } from '@/app/context/CartContext';
import { formatPrice, shippingFor, site } from '@/lib/site';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const shipping = shippingFor(cartTotal);
  const remaining = site.freeShippingThreshold - cartTotal;

  return (
    <div className="min-h-screen bg-white py-16">
      <FadeIn className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-end mb-12">
          <h1 className="text-5xl font-bold mr-6">Cart</h1>
          <p className="text-gray-500 text-sm pb-1 border-l border-gray-200 pl-6">
            Your shopping bag is<br />almost complete
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Your cart is currently empty.</h2>
            <Link href="/shop" className="inline-block bg-primary text-white px-8 py-3 font-bold text-sm hover:bg-primary/90 transition-colors">
              Return to shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-2/3">
              <div className="border border-gray-100 p-4 sm:p-8">
                <ul className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex items-center gap-4 sm:gap-6">
                      <Link href={`/product/${item.slug}`} className="relative w-20 h-24 bg-[#F6F6F6] shrink-0">
                        <Image src={item.img} alt={item.name} fill sizes="80px" className="object-contain" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.slug}`} className="text-sm font-bold text-gray-800 hover:text-primary">
                          {item.name}
                        </Link>
                        {item.size && <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>}
                        <p className="text-sm text-gray-500 mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center border border-gray-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 text-gray-500 hover:text-black disabled:opacity-30"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-500 hover:text-black"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="hidden sm:block w-20 text-right text-sm font-bold text-gray-700">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link href="/shop" className="text-sm font-bold text-primary hover:underline">
                    &larr; Continue shopping
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-[#4A7294] text-white p-10">
                <h2 className="text-2xl font-bold mb-8 text-white">Cart Totals</h2>

                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="text-sm">{formatPrice(cartTotal)}</span>
                </div>

                <div className="py-4 border-b border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Shipping</span>
                    <span className="text-sm">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  {remaining > 0 && (
                    <p className="text-xs text-white/70 mt-2">
                      Add {formatPrice(remaining)} more for free shipping.
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center py-6">
                  <span className="text-base font-bold">Total</span>
                  <span className="text-base font-bold">{formatPrice(cartTotal + shipping)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-[#FBB03B] text-black font-bold py-4 text-sm mt-4 hover:bg-[#EFA834] transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </FadeIn>
    </div>
  );
}
