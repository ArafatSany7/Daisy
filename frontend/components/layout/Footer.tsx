import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import { Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaTiktok, FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-[#161616] text-gray-400 pt-20 pb-8 font-sans">
      <div className="container mx-auto px-8 max-w-7xl">
        
        {/* Top Section with Logo and Socials */}
        <FadeIn className="flex flex-col md:flex-row justify-between items-center mb-12 pb-10 border-b border-[#2A2A2A]">
          <Link href="/" className="flex items-center mb-6 md:mb-0 space-x-3">
            <Image src="/logo.png" alt="Daisy Logo" width={64} height={64} className="object-contain brightness-0 invert" />
            <span className="logo-text text-5xl text-white">Daisy</span>
          </Link>
          <div className="flex space-x-2">
            {/* Social Icons */}
            {[FaFacebookF, FaTiktok, FaXTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 flex items-center justify-center bg-[#7596B8] rounded-full text-white hover:bg-white hover:text-[#7596B8] transition-colors">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* Column 1: Contact & Payment */}
          <FadeIn delay={0.1} className="pr-8">
            <div className="flex flex-col space-y-4 text-[13px] mb-8">
               <div className="flex items-center hover:text-white transition-colors cursor-pointer"><Mail size={16} className="mr-3 text-gray-500" strokeWidth={1.5}/> support@daisy.com</div>
               <div className="flex items-center hover:text-white transition-colors cursor-pointer"><Phone size={16} className="mr-3 text-gray-500" strokeWidth={1.5}/> (888) 4000-2345</div>
            </div>
            <div className="flex space-x-2">
              {/* Custom Payment Badges mimicking screenshot */}
              <span className="px-2 py-1 bg-white text-[#1434CB] text-[10px] font-bold rounded-sm uppercase">VISA</span>
              <span className="px-2 py-1 bg-[#2671B9] text-white text-[10px] font-bold rounded-sm uppercase">AMEX</span>
              <span className="px-2 py-1 bg-white text-black text-[10px] font-bold rounded-sm uppercase">
                <span className="text-[#E55C20]">DIS</span>COVER
              </span>
              <span className="px-2 py-1 bg-white flex items-center rounded-sm">
                <span className="w-3 h-3 rounded-full bg-[#EB001B] opacity-90 -mr-1"></span>
                <span className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90"></span>
              </span>
              <span className="px-2 py-1 bg-white text-[#635BFF] text-[10px] font-bold rounded-sm">Stripe</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>

          {/* Column 2: Account */}
          <div className="h-full">
            <h4 className="font-bold text-[#7596B8] text-[12px] tracking-wider mb-8 uppercase">Account</h4>
            <ul className="space-y-4 text-[13px]">
              {['My account', 'Order history', 'Wishlist', 'Saved addresses', 'Newsletter preferences'].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </FadeIn>

          {/* Column 3: Customer Care */}
          <FadeIn delay={0.3}>
          <div>
            <h4 className="font-bold text-[#7596B8] text-[12px] tracking-wider mb-8 uppercase">Customer Care</h4>
            <ul className="space-y-4 text-[13px]">
              {['Help center', 'Shipping information', 'Returns & refunds', 'Track your order', 'Payment methods'].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </FadeIn>

          {/* Column 4: Newsletter */}
          <FadeIn delay={0.4}>
          <div>
            <h4 className="font-bold text-[#7596B8] text-[12px] tracking-wider mb-8 uppercase">Newsletter</h4>
            <p className="text-[13px] mb-6 leading-relaxed pr-4">
              Subscribe to the weekly newsletter for all the latest updates
            </p>
            <form className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-[#2A2A2A] text-white px-4 py-3 text-[13px] border border-[#333] focus:border-[#7596B8] outline-none w-full placeholder-gray-500"
              />
              <button 
                type="submit" 
                className="bg-[#7596B8] text-white font-medium py-3 px-4 text-[13px] hover:bg-white hover:text-[#7596B8] transition-colors flex items-center justify-center w-full"
              >
                <Mail size={14} className="mr-2" strokeWidth={1.5} /> Signup Newsletter
              </button>
            </form>
          </div>
          </FadeIn>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2A2A2A] pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-500">
          <p>Copyright &copy; 2026 Daisy, All rights reserved. Powered by MoxCreative.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms and conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
