import type { Metadata } from 'next';
import { Prata, Inter } from "next/font/google";
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const prata = Prata({
  weight: '400',
  variable: "--font-prata",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Daisy - Fashion Store',
  description: 'High-end fashion boutique',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${prata.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col text-foreground bg-background`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
