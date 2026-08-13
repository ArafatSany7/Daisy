"use client";

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Truck, ShieldCheck, Headphones, CreditCard } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="overflow-hidden bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[650px] md:h-[750px] flex items-center justify-end px-6 md:px-24">
        <div className="absolute inset-0 z-0">
          {/* Using a similar blue-background portrait image */}
          <Image 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
            alt="Fashion Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
        </div>
        
        <motion.div 
          className="relative z-10 w-full max-w-xl text-white"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp} className="font-bold text-5xl md:text-7xl mb-6 leading-tight tracking-tight">
            Elevated style, made beautifully yours
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-10 font-light text-white/90 leading-relaxed">
            Explore thoughtfully designed fashion that feels polished, versatile, and easy to wear across every occasion.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/items" className="btn-primary text-base px-8 py-4">
              <ShoppingBag size={18} className="mr-2" /> Shop the collection
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* VALUE PROP BAR */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              { icon: <Truck size={32} className="text-primary" />, title: "Free Shipping", desc: "On all orders over $150" },
              { icon: <ShieldCheck size={32} className="text-primary" />, title: "Secure Checkout", desc: "100% secure payment" },
              { icon: <CreditCard size={32} className="text-primary" />, title: "Easy Returns", desc: "30 days return policy" },
              { icon: <Headphones size={32} className="text-primary" />, title: "Premium Support", desc: "24/7 dedicated support" }
            ].map((prop, i) => (
              <div key={i} className="flex items-center space-x-4">
                {prop.icon}
                <div>
                  <h4 className="font-bold text-lg text-foreground">{prop.title}</h4>
                  <p className="text-gray-500 text-sm">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIDEBAR & PRODUCTS GRID */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 space-y-8">
            <div className="bg-white p-6 shadow-sm">
              <h3 className="font-bold text-xl mb-4">Categories</h3>
              <ul className="space-y-3">
                {['Hat', 'Footwear', 'Accessories', 'Dresses', 'Outerwear'].map(cat => (
                  <li key={cat} className="flex justify-between items-center text-gray-600 hover:text-primary cursor-pointer transition-colors py-2 border-b border-gray-50 last:border-0">
                    {cat} <span>+</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-[400px] w-full shadow-sm overflow-hidden bg-primary">
              <div className="absolute inset-0 z-0">
                <Image src="https://images.unsplash.com/photo-1550614000-4b95f269fb9f?q=80&w=600&auto=format&fit=crop" alt="Promo" fill className="object-cover mix-blend-overlay opacity-50" />
              </div>
              <div className="relative z-10 p-8 flex flex-col h-full text-white justify-center items-center text-center">
                <span className="logo-text text-4xl mb-4">Bhuselle</span>
                <h4 className="font-bold text-5xl mb-2">30% <span className="text-2xl">OFF</span></h4>
                <p className="text-sm uppercase tracking-widest mb-6">Limited Time Offer</p>
                <Link href="/items" className="btn-dark bg-white text-black hover:bg-black hover:text-white border-2 border-white">
                  Shop Now &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[ 
                { name: "Sabine Block Heel Ankle Boots", price: "$98", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop" },
                { name: "Mae Pleated Midi Skirt", price: "$58", img: "https://images.unsplash.com/photo-1582533561751-277180db6192?q=80&w=800&auto=format&fit=crop" },
                { name: "Camille Classic Trench Coat", price: "$135", oldPrice: "$149", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
                { name: "Noelle Fine Knit Sweater", price: "$60", oldPrice: "$68", sale: true, img: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop" },
                { name: "Remi Linen Bucket Hat", price: "$32", img: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=800&auto=format&fit=crop" },
                { name: "Audrey Ballet Flats", price: "$49", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col bg-transparent"
                >
                  <div className="relative aspect-[4/5] mb-4 bg-white overflow-hidden shadow-sm">
                    {item.sale && (
                      <span className="absolute top-3 right-3 bg-sale text-black text-xs font-bold px-2 py-1 z-10">
                        SALE!
                      </span>
                    )}
                    <Image 
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-foreground text-sm mb-2 px-2">Bhuselle {item.name}</h3>
                      <div className="flex justify-center items-center space-x-2 mb-4">
                        {item.oldPrice && <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>}
                        <span className="text-price font-bold">{item.price}</span>
                      </div>
                    </div>
                    <div>
                      <button className="btn-dark px-8 w-max opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               {[ 
                 { num: "47K+", label: "Happy Customer" },
                 { num: "35K+", label: "Product Sold" },
                 { num: "4.7", label: "Client Reviews" },
                 { num: "25+", label: "Years of Experience" }
               ].map((stat, i) => (
                 <div key={i} className="relative flex flex-col items-center justify-center py-8">
                    <span className="absolute inset-0 flex items-center justify-center text-7xl md:text-9xl font-bold text-gray-50 z-0">
                      {stat.num}
                    </span>
                    <h3 className="relative z-10 font-bold text-xl md:text-2xl text-foreground">
                      {stat.label}
                    </h3>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
