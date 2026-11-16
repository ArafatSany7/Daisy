import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppProviders from '@/components/providers/AppProviders';
import { site } from '@/lib/site';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

// One Playfair instance (normal + italic) serves both display headings and the logo.
const playfair = Playfair_Display({
  variable: '--font-display-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Daisy | Timeless womenswear', template: '%s | Daisy' },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: '#FBF9F6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col text-ink bg-surface overflow-x-hidden`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <AppProviders>
          <Navbar />
          <main id="main" className="flex-grow">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
