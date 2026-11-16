"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import CartSidebar from '@/components/cart/CartSidebar';
import SearchForm from '@/components/layout/SearchForm';
import { categories, COLLECTIONS } from '@/lib/products';
import { formatPrice, mainNav, site } from '@/lib/site';

const iconButton =
  'relative inline-flex items-center justify-center w-11 h-11 rounded-full text-ink hover:bg-well transition-colors';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const pathname = usePathname();
  const badgeControls = useAnimationControls();

  // Replay a small spring "bump" on the badge whenever the cart count changes.
  useEffect(() => {
    if (cartCount > 0) {
      badgeControls.start({ scale: [1.4, 1], opacity: 1, transition: { type: 'spring', stiffness: 500, damping: 15 } });
    }
  }, [cartCount, badgeControls]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
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
    `relative py-2 text-[15px] transition-colors hover:text-ink ${
      isActive(href)
        ? 'text-ink font-semibold after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-ink'
        : 'text-muted'
    }`;

  const cartBadge = (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.span
          key="badge"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={badgeControls}
          exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.15 } }}
          aria-hidden="true"
          className="absolute top-1 right-0.5 bg-accent text-white text-[11px] font-semibold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full ring-2 ring-surface tabular-nums"
        >
          {cartCount}
        </motion.span>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="bg-ink text-white/90 text-xs tracking-wide py-2.5 text-center px-4">
        Free shipping on orders over {formatPrice(site.freeShippingThreshold)} ·{' '}
        <Link href="/returns" className="underline underline-offset-2 hover:text-white">
          {site.returnWindowDays}-day returns
        </Link>
      </div>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 border-b ${
          isScrolled
            ? 'bg-surface/85 backdrop-blur-xl border-line shadow-[0_1px_20px_-12px_rgb(0_0_0/0.25)]'
            : 'bg-surface border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Daisy home">
            <Image src="/logo.png" alt="" width={34} height={34} className="object-contain" priority />
            <span className="logo-text text-[34px] leading-none text-ink">Daisy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {mainNav.map((item) =>
              item.href === '/shop' ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setIsShopMenuOpen(true)}
                  onMouseLeave={() => setIsShopMenuOpen(false)}
                >
                  <div className="flex items-center gap-0.5">
                    <Link href="/shop" className={linkClass('/shop')} aria-current={isActive('/shop') ? 'page' : undefined}>
                      Shop
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsShopMenuOpen((o) => !o)}
                      aria-expanded={isShopMenuOpen}
                      aria-label="Show shop categories"
                      className="p-1.5 text-muted hover:text-ink"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isShopMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                  <AnimatePresence>
                    {isShopMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98, transition: { duration: 0.12 } }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: 'top center' }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
                      >
                        <div className="bg-white rounded-2xl shadow-[0_24px_60px_-20px_rgb(0_0_0/0.25)] ring-1 ring-line p-6 grid grid-cols-[1fr_1fr_auto] gap-x-8 w-[480px]">
                          <div className="col-span-2">
                            <p className="eyebrow mb-3">Categories</p>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                              {categories.map((c) => (
                                <Link
                                  key={c.slug}
                                  href={`/shop?category=${c.slug}`}
                                  className="py-1.5 text-sm text-ink/80 hover:text-ink hover:translate-x-0.5 transition-all"
                                >
                                  {c.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="border-l border-line pl-8">
                            <p className="eyebrow mb-3">Edit</p>
                            <div className="flex flex-col gap-1">
                              {Object.entries(COLLECTIONS).map(([key, label]) => (
                                <Link key={key} href={`/shop?collection=${key}`} className="py-1.5 text-sm text-ink/80 hover:text-ink whitespace-nowrap">
                                  {label}
                                </Link>
                              ))}
                              <Link href="/shop" className="py-1.5 text-sm font-semibold text-accent hover:underline whitespace-nowrap">
                                Shop all &rarr;
                              </Link>
                            </div>
                          </div>
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

          <div className="flex items-center gap-1">
            <SearchForm className="hidden lg:block w-60 mr-2" />
            <Link href="/login" className={`${iconButton} hidden md:inline-flex`} aria-label="Account">
              <User size={21} strokeWidth={1.6} />
            </Link>
            <button type="button" onClick={toggleCart} className={iconButton} aria-label={`Open cart, ${cartCount} items`}>
              <ShoppingBag size={21} strokeWidth={1.6} />
              {cartBadge}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className={`${iconButton} md:hidden`}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden bg-surface border-t border-line overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-5 gap-1" aria-label="Mobile">
                <SearchForm className="mb-3" />
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-3 text-lg font-display ${isActive(item.href) ? 'text-ink' : 'text-ink/70'}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <p className="eyebrow mt-4 mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop?category=${c.slug}`}
                      className="px-4 py-2 rounded-full bg-well text-sm hover:bg-ink hover:text-white transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <Link href="/login" className="mt-5 pt-5 border-t border-line flex items-center gap-2 text-sm">
                  <User size={18} /> Account
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <CartSidebar />
    </>
  );
}
