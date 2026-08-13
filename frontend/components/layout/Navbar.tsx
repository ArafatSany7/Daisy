"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="bg-primary text-white text-xs font-medium py-2 text-center">
        Free Shipping on All Orders Over $150
      </div>
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-5'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Left Logo */}
          <Link href="/" className="flex items-center justify-center">
            <span className="logo-text text-4xl text-primary">Bhuselle</span>
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <div className="flex items-center cursor-pointer hover:text-primary transition-colors">
               About us <ChevronDown size={14} className="ml-1" />
            </div>
            <Link href="/items" className="flex items-center hover:text-primary transition-colors">
              Shop <ChevronDown size={14} className="ml-1" />
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            <div className="flex items-center cursor-pointer hover:text-primary transition-colors">
               Pages <ChevronDown size={14} className="ml-1" />
            </div>
          </nav>

          {/* Right Icons & Search */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative hidden lg:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Product"
                className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-primary w-64"
              />
            </div>
            <Link href="/login" className="hover:text-primary transition-colors text-foreground">
              <User size={22} strokeWidth={1.5} />
            </Link>
            <button className="hover:text-primary transition-colors relative text-foreground">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 bg-sale text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-foreground">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <nav className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-foreground">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                <Link href="/items" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                <div className="border-t border-gray-100 pt-4 flex space-x-6">
                  <button><Search size={20} /></button>
                  <Link href="/login"><User size={20} /></Link>
                  <button className="relative">
                    <ShoppingBag size={20} />
                    <span className="absolute -top-1.5 -right-2 bg-sale text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
