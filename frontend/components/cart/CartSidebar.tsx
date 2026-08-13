"use client";

import { useCart } from '@/app/context/CartContext';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar() {
  const { cartItems, isCartOpen, toggleCart, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/20 z-50"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-[350px] bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-lg">Shopping Cart</h2>
              <button onClick={toggleCart} className="text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 relative">
                    <div className="relative w-20 h-24 bg-gray-50 flex-shrink-0">
                      <Image src={item.img} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="flex flex-col justify-center flex-1 pr-6">
                      <h3 className="text-sm font-bold text-gray-800 leading-tight mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.quantity} × <span className="text-[#28A745]">৳{item.price}</span></p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500"
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
                  <span className="font-bold text-xl">৳{cartTotal}</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <Link 
                    href="/cart" 
                    onClick={toggleCart}
                    className="w-full py-3 bg-white border border-gray-200 text-center font-bold text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    View cart
                  </Link>
                  <button className="w-full py-3 bg-primary text-white text-center font-bold text-sm hover:bg-primary/90 transition-colors">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
