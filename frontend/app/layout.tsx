import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
  title: 'Bhuselle UI Clone - Daisy',
  description: 'Exact UI match of Bhuselle theme',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col text-foreground bg-background`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
