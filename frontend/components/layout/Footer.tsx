import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaTiktok, FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { footerNav, phoneHref, site } from '@/lib/site';

const socialIcons = [
  { key: 'facebook', label: 'Facebook', Icon: FaFacebookF },
  { key: 'tiktok', label: 'TikTok', Icon: FaTiktok },
  { key: 'x', label: 'X', Icon: FaXTwitter },
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
] as const;

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="h-full">
      <h4 className="font-bold text-[#7596B8] text-[12px] tracking-wider mb-8 uppercase">{title}</h4>
      <ul className="space-y-4 text-[13px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const socials = socialIcons.filter((s) => site.socials[s.key]);

  return (
    <footer className="bg-[#161616] text-gray-400 pt-20 pb-8 font-sans">
      <div className="container mx-auto px-8 max-w-7xl">
        <FadeIn className="flex flex-col md:flex-row justify-between items-center mb-12 pb-10 border-b border-[#2A2A2A]">
          <Link href="/" className="flex items-center mb-6 md:mb-0 space-x-3" aria-label="Daisy home">
            <Image src="/logo.png" alt="" width={64} height={64} className="object-contain brightness-0 invert" />
            <span className="logo-text text-5xl text-white">Daisy</span>
          </Link>
          {socials.length > 0 && (
            <div className="flex space-x-2">
              {socials.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={site.socials[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center bg-[#7596B8] rounded-full text-white hover:bg-white hover:text-[#7596B8] transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          )}
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FadeIn delay={0.1} className="pr-8">
            <div className="flex flex-col space-y-4 text-[13px] mb-8">
              <a href={`mailto:${site.email}`} className="flex items-center hover:text-white transition-colors">
                <Mail size={16} className="mr-3 text-gray-500" strokeWidth={1.5} /> {site.email}
              </a>
              <a href={phoneHref} className="flex items-center hover:text-white transition-colors">
                <Phone size={16} className="mr-3 text-gray-500" strokeWidth={1.5} /> {site.phone}
              </a>
            </div>
            <Link href="/payment-methods" className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
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
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <LinkColumn title="Account" links={footerNav.account} />
          </FadeIn>

          <FadeIn delay={0.3}>
            <LinkColumn title="Customer Care" links={footerNav.care} />
          </FadeIn>

          <FadeIn delay={0.4}>
            <h4 className="font-bold text-[#7596B8] text-[12px] tracking-wider mb-8 uppercase">Newsletter</h4>
            <p className="text-[13px] mb-6 leading-relaxed pr-4">
              Subscribe to the weekly newsletter for all the latest updates
            </p>
            <NewsletterForm />
          </FadeIn>
        </div>

        <div className="border-t border-[#2A2A2A] pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-500">
          <p>Copyright &copy; {new Date().getFullYear()} Daisy. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0" aria-label="Legal">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
