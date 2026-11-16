import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Server component. The staggered entrance is pure CSS (.hero-in in globals.css),
// so it plays as soon as HTML arrives instead of waiting for JavaScript.
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#13294a]">
      <Image
        src="/images/hero-clean.png"
        alt="Two models in denim and a red leather jacket against a cornflower-blue wall"
        fill
        preload
        sizes="100vw"
        className="object-cover object-[65%_center] -z-10"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d1c33]/85 via-[#0d1c33]/45 to-transparent"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 sm:px-6 min-h-[560px] md:min-h-[680px] flex items-center py-20">
        <div className="max-w-xl text-white">
          <p className="hero-in [--i:0] text-xs font-semibold uppercase tracking-[0.22em] text-white/75 mb-5">
            The new season edit
          </p>
          <h1 className="hero-in [--i:1] font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-white mb-6">
            Step back
            <br />
            <em className="italic font-normal">into style</em>
          </h1>
          <p className="hero-in [--i:2] text-base sm:text-lg text-white/80 mb-10 max-w-md">
            Timeless pieces with a modern edge — made from luxurious materials and designed to be worn for years.
          </p>
          <div className="hero-in [--i:3] flex flex-wrap gap-3">
            <Link href="/shop?collection=new" className="btn btn-primary h-14 px-8 text-[15px]">
              Shop new arrivals <ArrowRight size={18} />
            </Link>
            <Link href="/shop?collection=sale" className="btn btn-light h-14 px-8 text-[15px]">
              Shop the sale
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
