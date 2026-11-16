"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import CartSidebar from '@/components/cart/CartSidebar';
import SearchForm from '@/components/layout/SearchForm';
import { categories, COLLECTIONS } from '@/lib/products';
import { formatPrice, mainNav, site } from '@/lib/site';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const pathname = usePathname();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus after navigating (state adjusted during render, not in an effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMobileMenuOpen(false);
    setIsShopMenuOpen(false);
  }

  const linkClass = (href: string) =>
    `transition-colors hover:text-primary ${isActive(href) ? 'text-primary' : ''}`;

  const cartBadge = cartCount > 0 && (
    <span className="absolute -top-1.5 -right-2 bg-sale text-black text-[10px] font-bold min-w-4 h-4 px-1 flex items-center justify-center rounded-full shadow-sm">
      {cartCount}
    </span>
  );

  return (
    <>
      <div className="bg-primary text-white text-xs font-medium py-2 text-center">
        Free shipping on all orders over {formatPrice(site.freeShippingThreshold)}
      </div>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-white/90 backdrop-blur py-5'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3" aria-label="Daisy home">
            <Image src="/logo.png" alt="" width={40} height={40} className="object-contain" />
            <span className="logo-text text-4xl text-primary">Daisy</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-foreground" aria-label="Main">
            {mainNav.map((item) =>
              item.href === '/shop' ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setIsShopMenuOpen(true)}
                  onMouseLeave={() => setIsShopMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Link href="/shop" className={linkClass('/shop')} aria-current={isActive('/shop') ? 'page' : undefined}>
                      Shop
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsShopMenuOpen((o) => !o)}
                      aria-expanded={isShopMenuOpen}
                      aria-label="Show shop categories"
                      className="ml-1 hover:text-primary"
                    >
                      <ChevronDown size={14} className={`transition-transform ${isShopMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {isShopMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
                      >
                        <div className="bg-white shadow-xl border border-gray-100 p-6 grid grid-cols-2 gap-x-10 gap-y-3 w-[360px] text-sm">
                          <p className="col-span-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Categories</p>
                          {categories.map((c) => (
                            <Link key={c.slug} href={`/shop?category=${c.slug}`} className="hover:text-primary transition-colors">
                              {c.name}
                            </Link>
                          ))}
                          <p className="col-span-2 mt-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">Collections</p>
                          {Object.entries(COLLECTIONS).map(([key, label]) => (
                            <Link key={key} href={`/shop?collection=${key}`} className="hover:text-primary transition-colors">
                              {label}
                            </Link>
                          ))}
                          <Link href="/shop" className="col-span-2 mt-3 font-bold text-primary hover:underline">
                            Shop all &rarr;
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(item.href)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <SearchForm className="hidden lg:block w-64" />
            <Link href="/login" className="hover:text-primary transition-colors text-foreground" aria-label="Account">
              <User size={22} strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              onClick={toggleCart}
              className="hover:text-primary transition-colors relative text-foreground"
              aria-label={`Open cart (${cartCount} items)`}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartBadge}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              type="button"
              onClick={toggleCart}
              className="relative p-1 text-foreground"
              aria-label={`Open cart (${cartCount} items)`}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartBadge}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="p-2 -mr-2 text-foreground"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <nav className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-foreground" aria-label="Mobile">
                <SearchForm />
                {mainNav.map((item) => (
                  <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-wrap gap-2 pt-1">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop?category=${c.slug}`}
                      className="px-3 py-1.5 bg-gray-100 text-xs hover:bg-primary hover:text-white transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <Link href="/login" className="flex items-center gap-2">
                    <User size={18} /> Account
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <CartSidebar />
    </>
  );
}
