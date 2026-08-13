"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Left Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <Link href="/items" className="hover:text-accent transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
        </nav>

        {/* Center Logo */}
        <Link href="/" className="flex items-center justify-center">
          <div className="relative w-12 h-12 md:w-16 md:h-16 mix-blend-multiply dark:mix-blend-screen">
            <Image src="/daisy_logo.jpg" alt="Daisy Logo" fill className="object-contain" />
          </div>
          <span className="font-serif text-2xl md:text-3xl ml-2 uppercase tracking-[0.2em] font-bold">Daisy</span>
        </Link>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="hover:text-accent transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link href="/login" className="hover:text-accent transition-colors">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <button className="hover:text-accent transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
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
            className="md:hidden bg-background border-t border-secondary overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium uppercase tracking-widest">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/items" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <div className="border-t border-secondary pt-4 flex space-x-6">
                <button><Search size={20} /></button>
                <Link href="/login"><User size={20} /></Link>
                <button className="relative">
                  <ShoppingBag size={20} />
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
