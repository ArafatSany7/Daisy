"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock for now
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          BHUSELLE.
        </Link>

        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <Link href="/items" className="hover:text-accent transition-colors">Explore</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link>
              <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 hover:text-accent transition-colors"
                >
                  <span>Profile</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-secondary rounded shadow-lg py-2">
                    <Link href="/profile" className="block px-4 py-2 hover:bg-secondary">Settings</Link>
                    <button onClick={() => setIsLoggedIn(false)} className="block w-full text-left px-4 py-2 hover:bg-secondary text-red-500">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-accent transition-colors">Login</Link>
              <Link href="/register" className="bg-primary text-background px-4 py-2 rounded-full hover:bg-accent transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
