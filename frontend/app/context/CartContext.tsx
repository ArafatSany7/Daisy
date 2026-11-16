"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface CartItem {
  /** Line id: product id + size, so different sizes are separate lines. */
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  img: string;
  size?: string;
  quantity: number;
}

export type AddToCartInput = Omit<CartItem, 'id' | 'quantity'> & { quantity?: number };

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: AddToCartInput, options?: { openCart?: boolean }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const STORAGE_KEY = 'daisy-cart-v2';
const CartContext = createContext<CartContextType | undefined>(undefined);

const lineId = (productId: string, size?: string) => (size ? `${productId}__${size}` : productId);

function isValidItem(value: unknown): value is CartItem {
  const v = value as CartItem;
  return !!v && typeof v.id === 'string' && typeof v.slug === 'string' && typeof v.price === 'number' && v.quantity > 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem('cart'); // legacy cart with ids that no longer exist
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        // Hydrating from localStorage must happen after mount to avoid an SSR mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setCartItems(parsed.filter(isValidItem));
      }
    } catch {
      /* storage unavailable or corrupt: start with an empty cart */
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      /* ignore quota / private mode errors */
    }
  }, [cartItems, isHydrated]);

  const addToCart = useCallback<CartContextType['addToCart']>((input, options) => {
    const { quantity = 1, ...item } = input;
    const id = lineId(item.productId, item.size);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantity } : i));
      return [...prev, { ...item, id, quantity }];
    });
    if (options?.openCart ?? true) setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((open) => !open), []);

  const value = useMemo<CartContextType>(() => {
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return {
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart: (productId: string) => cartItems.some((i) => i.productId === productId),
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      cartCount,
      cartTotal,
    };
  }, [cartItems, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart, toggleCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
