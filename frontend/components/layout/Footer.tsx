"use client";

import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-6 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center mb-6">
               <span className="logo-text text-4xl text-primary">Bhuselle</span>
            </Link>
            <p className="text-gray-500 mb-8 leading-relaxed max-w-xs text-sm">
              Thoughtfully designed fashion that feels polished, versatile, and easy to wear across every occasion.
            </p>
            <div className="flex flex-col space-y-3 text-sm text-gray-500">
               <div className="flex items-center"><MapPin size={16} className="mr-2 text-primary"/> 123 Fashion Ave, NY 10001</div>
               <div className="flex items-center"><Phone size={16} className="mr-2 text-primary"/> +1 (555) 123-4567</div>
               <div className="flex items-center"><Mail size={16} className="mr-2 text-primary"/> hello@bhuselle.com</div>
            </div>
          </div>

          {/* Column 2: Information */}
          <div>
            <h4 className="font-bold text-lg mb-6">Information</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/items" className="hover:text-primary transition-colors">Shop Collection</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="font-bold text-lg mb-6">Customer Care</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-500 mb-6 text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-primary transition-colors text-foreground text-sm"
                required
              />
              <button type="submit" className="btn-primary w-full">
                Subscribe Now
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2026 Bhuselle. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
