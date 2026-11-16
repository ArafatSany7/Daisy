import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/app/context/CartContext';
import AOSInit from '@/components/animations/AOSInit';
import { site } from '@/lib/site';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-logo",
  style: 'italic',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: 'Daisy | Timeless womenswear', template: '%s | Daisy' },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col text-foreground bg-background overflow-x-hidden`}>
        <AOSInit />
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
