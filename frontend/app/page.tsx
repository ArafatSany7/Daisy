"use client";

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Hero"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h4 variants={fadeInUp} className="uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium text-white/90">
            Spring / Summer 2026
          </motion.h4>
          <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
            Elegance <br/> <span className="italic font-light">&</span> Grace
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto text-white/80">
            Discover our latest collection of premium garments designed for the modern individual.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/items" className="inline-flex items-center justify-center px-10 py-5 bg-white text-black hover:bg-accent hover:text-white transition-all duration-300 font-medium uppercase tracking-widest text-sm">
              Shop The Collection
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl mb-4">Shop by Category</h2>
            <div className="w-16 h-px bg-accent mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { title: "Women's Wear", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },
              { title: "Accessories", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop" },
              { title: "Men's Wear", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop" } 
            ].map((cat, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: i * 0.2 }}
                className="group relative h-[500px] overflow-hidden cursor-pointer"
              >
                <Image 
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between border-b border-white/50 pb-4">
                  <h3 className="text-white font-serif text-2xl">{cat.title}</h3>
                  <ArrowRight className="text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING NOW SECTION */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16"
          >
            <div>
              <h4 className="uppercase tracking-widest text-accent text-sm font-bold mb-2">Our Best Sellers</h4>
              <h2 className="font-serif text-4xl">Trending Now</h2>
            </div>
            <Link href="/items" className="hidden md:inline-flex items-center text-sm uppercase tracking-widest font-bold hover:text-accent transition-colors">
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: i * 0.15 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] mb-6 overflow-hidden bg-white">
                  <Image 
                    src={`https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop&sig=${i}`}
                    alt="Product"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Add to Cart Hover Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full py-4 bg-background text-foreground font-bold uppercase text-xs tracking-widest hover:bg-accent hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-accent fill-accent" />)}
                  </div>
                  <h3 className="font-serif text-lg mb-2">Elegant Silk Blouse</h3>
                  <p className="text-foreground/60">$120.00</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
             <Link href="/items" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="relative py-32 bg-primary text-white text-center flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-20">
           <Image 
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
            alt="Pattern"
            fill
            className="object-cover"
           />
         </div>
         <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative z-10 max-w-2xl px-6"
         >
            <h2 className="font-serif text-5xl mb-6">Sustainable Luxury</h2>
            <p className="text-white/80 mb-10 text-lg">
              We believe in creating timeless pieces that respect both the artisan and the environment. Explore our new conscious collection.
            </p>
            <Link href="/about" className="btn-primary">
              Read Our Story
            </Link>
         </motion.div>
      </section>
    </div>
  );
}
