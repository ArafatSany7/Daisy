import Link from 'next/link';
import Image from 'next/image';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaTiktok, FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { footerNav, phoneHref, site } from '@/lib/site';

const socialIcons = [
  { key: 'facebook', label: 'Facebook', Icon: FaFacebookF },
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'tiktok', label: 'TikTok', Icon: FaTiktok },
  { key: 'x', label: 'X', Icon: FaXTwitter },
  { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
] as const;

const paymentBadges = ['Visa', 'Mastercard', 'Amex', 'Discover', 'Stripe'];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-5">{title}</h2>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-white/75 hover:text-white transition-colors">
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
    <footer className="bg-ink text-white/75 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-6" aria-label="Daisy home">
              <Image src="/logo.png" alt="" width={44} height={44} className="object-contain brightness-0 invert" />
              <span className="logo-text text-5xl text-white leading-none">Daisy</span>
            </Link>
            <p className="font-display text-2xl text-white mb-2">Join the Daisy list</p>
            <p className="text-sm mb-6 max-w-sm">New arrivals, styling notes and early access to the sale — once a week, never more.</p>
            <div className="max-w-sm">
              <NewsletterForm />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <LinkColumn title="Account" links={footerNav.account} />
            <LinkColumn title="Customer care" links={footerNav.care} />
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-5">Get in touch</h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
                    <Mail size={15} aria-hidden="true" /> {site.email}
                  </a>
                </li>
                <li>
                  <a href={phoneHref} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
                    <Phone size={15} aria-hidden="true" /> {site.phone}
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-white/75 hover:text-white">Contact form</Link>
                </li>
              </ul>
              {socials.length > 0 && (
                <div className="flex gap-2 mt-6">
                  {socials.map(({ key, label, Icon }) => (
                    <a
                      key={key}
                      href={site.socials[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white hover:bg-white hover:text-ink transition-colors"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col-reverse md:flex-row gap-6 md:items-center justify-between text-xs text-white/55">
          <p>&copy; {new Date().getFullYear()} Daisy. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/payment-methods" className="flex flex-wrap gap-1.5">
            <span className="sr-only">Accepted payment methods: </span>
            {paymentBadges.map((b) => (
              <span key={b} className="px-2 py-1 rounded-md border border-white/15 text-[11px] font-semibold text-white/75">
                {b}
              </span>
            ))}
          </Link>
        </div>
      </div>
    </footer>
  );
}
