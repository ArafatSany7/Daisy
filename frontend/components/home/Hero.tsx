"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#13294a]">
      <Image
        src="/images/hero-clean.png"
        alt="Two models in denim and a red leather jacket against a cornflower-blue wall"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center] -z-10"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d1c33]/85 via-[#0d1c33]/45 to-transparent"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 sm:px-6 min-h-[560px] md:min-h-[680px] flex items-center py-20">
        <motion.div className="max-w-xl text-white" variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75 mb-5">
            The new season edit
          </motion.p>
          <motion.h1 variants={item} className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-white mb-6">
            Step back
            <br />
            <em className="italic font-normal">into style</em>
          </motion.h1>
          <motion.p variants={item} className="text-base sm:text-lg text-white/80 mb-10 max-w-md">
            Timeless pieces with a modern edge — made from luxurious materials and designed to be worn for years.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Link href="/shop?collection=new" className="btn btn-primary h-14 px-8 text-[15px]">
              Shop new arrivals <ArrowRight size={18} />
            </Link>
            <Link href="/shop?collection=sale" className="btn btn-light h-14 px-8 text-[15px]">
              Shop the sale
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
