"use client";

import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

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
            {/* Left side: Cart Items Table */}
            <div className="w-full lg:w-2/3">
              <div className="border border-gray-100 p-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-6 font-bold text-sm">Product</th>
                      <th className="pb-6 font-bold text-sm">Price</th>
                      <th className="pb-6 font-bold text-sm">Quantity</th>
                      <th className="pb-6 font-bold text-sm">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-50">
                        <td className="py-6 flex items-center space-x-6">
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500">
                            <X size={16} />
                          </button>
                          <div className="relative w-20 h-24 bg-[#F6F6F6]">
                            <Image src={item.img} alt={item.name} fill className="object-contain" />
                          </div>
                          <span className="text-sm text-gray-700 max-w-[200px]">{item.name}</span>
                        </td>
                        <td className="py-6 text-sm text-gray-500">৳{item.price}</td>
                        <td className="py-6">
                          <input 
                            type="number" 
                            min="1" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 border border-gray-200 p-2 text-center text-sm focus:outline-none focus:border-primary"
                          />
                        </td>
                        <td className="py-6 text-sm text-gray-700">৳{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-8 flex justify-between">
                  <div className="flex space-x-4">
                    <input type="text" placeholder="Coupon code" className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50 w-48" />
                    <button className="bg-[#7596B8] text-white px-8 py-3 text-xs font-bold hover:bg-primary transition-colors">
                      Apply coupon
                    </button>
                  </div>
                  <button className="bg-[#B3C5D6] text-white px-8 py-3 text-xs font-bold">
                    Update Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: Cart Totals */}
            <div className="w-full lg:w-1/3">
              <div className="bg-[#4A7294] text-white p-10">
                <h2 className="text-2xl font-bold mb-8">Cart Totals</h2>
                
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="text-sm">৳{cartTotal}</span>
                </div>
                
                <div className="py-6 border-b border-white/20">
                  <span className="text-sm font-medium block mb-4">Shipment</span>
                  <div className="space-y-3 text-sm text-white/80">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="free" name="shipping" className="accent-[#FBB03B]" defaultChecked />
                      <label htmlFor="free">Free shipping</label>
                    </div>
                    <p className="text-white/60 text-xs ml-5">
                      Shipping to <span className="text-white font-bold">DKI Jakarta</span>.
                    </p>
                    <button className="text-xs text-white/80 hover:text-white underline ml-5">
                      Change address
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-6">
                  <span className="text-base font-bold">Total</span>
                  <span className="text-base font-bold">৳{cartTotal}</span>
                </div>

                <button className="w-full bg-[#FBB03B] text-black font-bold py-4 text-sm mt-4 hover:bg-[#EFA834] transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </FadeIn>
    </div>
  );
}
