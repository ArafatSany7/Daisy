"use client";

import { useEffect, useRef } from 'react';
import { motion, Variants, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

function StatCounter({ value, suffix, isFloat = false }: { value: number, suffix: string, isFloat?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const count = useMotionValue(0);
  
  const formattedCount = useTransform(count, (latest) => {
    return isFloat ? latest.toFixed(1) : Math.round(latest);
  });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [count, isInView, value]);

  return (
    <span ref={ref}>
      <motion.span>{formattedCount}</motion.span>{suffix}
    </span>
  );
}
import { ShoppingBag, Package, BadgeCheck, MessageSquareText, Shirt, Glasses, Diamond, Scissors, Briefcase, Footprints } from 'lucide-react';

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
      <section className="relative h-[650px] md:h-[750px] flex items-center px-6 md:px-16 lg:px-24 overflow-hidden bg-[#183a54]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-clean.png"
            alt="Fashion Hero"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" /> {/* Slight darkening so white text stays readable */}
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="w-full max-w-3xl text-white"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="font-logo text-3xl md:text-4xl italic text-white/90 mb-2 font-serif">
              Made from luxurious material
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-bold text-6xl md:text-[110px] leading-[0.9] tracking-tighter uppercase text-[#F2E3D5] mb-6 flex flex-wrap gap-x-6 drop-shadow-2xl">
              <span>STEP BACK</span>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #F2E3D5' }}>INTO STYLE</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-sm md:text-base mb-10 font-light text-white/80 leading-relaxed max-w-md">
              Explore timeless pieces that blend classic elegance with a modern twist. Embrace iconic styles and discover your perfect look
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/items" className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white hover:bg-primary/90 transition-colors rounded-sm font-bold tracking-wider text-sm border border-[#F2E3D5]/20">
                SHOP NOW
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side badge graphic */}
          <motion.div 
             className="hidden lg:flex relative items-center mr-12"
             initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
          >
             {/* Connecting line */}
             <div className="absolute right-[100%] w-48 h-[1px] bg-primary mr-4 top-1/2 -translate-y-1/2 flex items-center">
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] -ml-1"></div>
             </div>
             
             {/* Circular badge */}
             <div className="relative w-36 h-36 rounded-full border border-primary/50 flex items-center justify-center bg-[#183a54]/50 backdrop-blur-md">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]">
                  <path id="curve" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
                  <text className="text-[9px] font-bold fill-primary tracking-[4px] uppercase">
                    <textPath href="#curve" startOffset="0%">CONSTANCE FAUX LEATHER JACKET • CONSTANCE FAUX LEATHER JACKET • </textPath>
                  </text>
                </svg>
                {/* Jacket Icon inside */}
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white border-4 border-[#183a54]">
                  <Shirt size={28} />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROP BAR */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-6">
            {[ 
              { icon: <Package size={36} strokeWidth={1.5} className="text-foreground" />, title: "Free Shipping", desc: "No minimum, always ships free." },
              { icon: <ShoppingBag size={36} strokeWidth={1.5} className="text-foreground" />, title: "Secure Checkout", desc: "Trusted & seamless experience." },
              { icon: <BadgeCheck size={36} strokeWidth={1.5} className="text-foreground" />, title: "Authenticity Guaranteed", desc: "Certified quality, 100% real." },
              { icon: <MessageSquareText size={36} strokeWidth={1.5} className="text-foreground" />, title: "Premium Support", desc: "Expert help, anytime you need." }
            ].map((prop, i) => (
              <div key={i} className="flex items-center space-x-4">
                {prop.icon}
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] text-foreground leading-tight mb-1">{prop.title}</span>
                  <span className="text-gray-500 text-[13px]">{prop.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVAL SECTION (Sidebar + Grid) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[22%] space-y-6 shrink-0">
            <div className="bg-white border border-gray-100 shadow-sm">
              <div className="bg-primary text-white text-center font-bold text-[13px] py-4 uppercase tracking-wider">
                POPULAR CATEGORY
              </div>
              <ul className="flex flex-col">
                {[ 
                  { name: 'Dress', icon: <Shirt size={16} /> },
                  { name: 'Eyewear', icon: <Glasses size={16} /> },
                  { name: 'Pants', icon: <Scissors size={16} /> },
                  { name: 'Hoodie', icon: <Shirt size={16} /> },
                  { name: 'Hat', icon: <Diamond size={16} /> },
                  { name: 'Footwear', icon: <Footprints size={16} /> },
                  { name: 'Accessories', icon: <Briefcase size={16} /> },
                ].map((cat, idx) => (
                  <li key={cat.name} className={`flex items-center text-[13px] text-foreground hover:text-primary cursor-pointer px-6 py-4 ${idx !== 6 ? 'border-b border-gray-100' : ''}`}>
                    <span className="mr-4 text-primary">{cat.icon}</span> {cat.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* 30% OFF Banner */}
            <div className="relative h-[350px] w-full shadow-sm overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop" alt="Promo" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover" />
                <div className="absolute inset-0 bg-white/80" />
              </div>
              <div className="relative z-10 p-6 flex flex-col h-full text-foreground justify-center items-center text-center">
                <span className="logo-text text-4xl mb-4 text-primary">Daisy</span>
                <h4 className="font-bold text-5xl mb-2 text-primary">30% <span className="text-2xl">OFF</span></h4>
                <p className="text-[11px] uppercase tracking-widest mb-6 font-bold text-gray-500">Limited Time Offer</p>
                <Link href="/shop" className="bg-primary text-white text-[11px] font-bold px-6 py-2.5 uppercase tracking-wide hover:bg-primary/90 transition-colors">
                  Shop Now &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="w-full lg:w-[78%]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-3xl text-foreground tracking-tight">New Arrival</h2>
              <Link href="/shop" className="bg-[#7596B8] text-white text-xs font-bold px-5 py-2 hover:bg-primary transition-colors">
                All Product
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[ 
                { id: "na-1", name: "Daisy Sabine Block Heel Ankle Boots", price: 98, img: "/products/10-1-600x600.jpg" },
                { id: "na-2", name: "Daisy Mae Pleated Midi Skirt", price: 58, img: "/products/16-2-600x600.jpg" },
                { id: "na-3", name: "Daisy Camille Classic Trench Coat", oldPrice: 149, price: 135, sale: true, img: "/products/17-2-600x600.jpg" },
                { id: "na-4", name: "Daisy Elise Saddle Crossbody Bag", price: 62, img: "/products/18-600x600.jpg" },
                { id: "na-5", name: "Daisy Noelle Fine Knit Sweater", oldPrice: 68, price: 60, sale: true, img: "/products/19-600x600.jpg" },
                { id: "na-6", name: "Daisy Remi Linen Bucket Hat", price: 32, img: "/products/20-600x600.jpg" },
                { id: "na-7", name: "Daisy Audrey Ballet Flats", price: 49, img: "/products/22-600x600.jpg" },
                { id: "na-8", name: "Daisy Maren Structured Handbag", price: 49, img: "/products/25-600x600.jpg" },
              ].map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3-CARD SHOWCASE SECTION */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[ 
              { title: "Elevated everyday tops", desc: "Suscipit fermentum dolor urna pede felis venenatis litora dignissim maecenas", img: "/banners/banner_6.jpg", dark: false },
              { title: "Comfort and structure in motion", desc: "Suscipit fermentum dolor urna pede felis venenatis litora dignissim maecenas", img: "/banners/banner_8.jpg", dark: true },
              { title: "Finishing touches for every look", desc: "Suscipit fermentum dolor urna pede felis venenatis litora dignissim maecenas", img: "/banners/banner_9.jpg", dark: false },
            ].map((card, i) => (
              <div key={i} className={`relative aspect-[3/4] overflow-hidden group ${i === 1 ? 'mt-0 md:mt-12' : ''}`}>
                <Image 
                  src={card.img}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center">
                  <div className={`p-6 w-full ${card.dark ? 'bg-[#2A2A2A] text-white' : 'bg-white text-foreground'} shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500`}>
                    <h3 className="font-bold text-[15px] mb-2">{card.title}</h3>
                    <p className={`text-[12px] leading-relaxed ${card.dark ? 'text-gray-400' : 'text-gray-500'}`}>{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT ON SALES SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h2 className="font-bold text-3xl text-foreground tracking-tight">Product on sales</h2>
            <Link href="/items" className="bg-[#7596B8] text-white text-xs font-bold px-5 py-2 hover:bg-primary transition-colors">
              All Product
            </Link>
          </div>

          {/* Products Grid (8 Items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {[ 
              { id: "sale-1", name: "Daisy Camille Classic Trench Coat", oldPrice: 149, price: 135, sale: true, img: "/products/7-1-600x600.jpg" },
              { id: "sale-2", name: "Daisy Noelle Fine Knit Sweater", oldPrice: 68, price: 60, sale: true, img: "/products/8-1-600x600.jpg" },
              { id: "sale-3", name: "Daisy Celeste Longline Blazer", oldPrice: 119, price: 100, sale: true, img: "/products/9-1-600x600.jpg" },
              { id: "sale-4", name: "Daisy Vela Clean Sneakers", oldPrice: 59, price: 50, sale: true, img: "/products/7-1-600x600 (1).jpg" },
              { id: "sale-5", name: "Daisy Elya Striped Shirt", oldPrice: 85, price: 70, sale: true, img: "/products/11-1-600x600.jpg" },
              { id: "sale-6", name: "Daisy Aria Everyday Hoodie", oldPrice: 75, price: 65, sale: true, img: "/products/16-1-600x600.jpg" },
              { id: "sale-7", name: "Daisy Kaia Cropped Jacket", oldPrice: 129, price: 110, sale: true, img: "/products/17-600x600.jpg" },
              { id: "sale-8", name: "Daisy Nova Rib Tank Top", oldPrice: 35, price: 25, sale: true, img: "/products/23-600x600.jpg" },
            ].map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>

        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            
            {/* Left Content */}
            <div className="w-full lg:w-5/12 pr-0 lg:pr-12 mb-12 lg:mb-0">
              <span className="text-[#7596B8] text-[10px] font-bold uppercase tracking-widest mb-4 block">
                Who We Are
              </span>
              <h2 className="font-bold text-4xl lg:text-5xl text-foreground mb-8 leading-tight">
                Discover the story behind Daisy&apos;s elegance
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-10 border-t border-gray-100 pt-8">
                Facilisis turpis ultricies semper natoque imperdiet. Condimentum viverra scelerisque erat fringilla tristique cubilia. In netus et ad imperdiet non suspendisse nisl montes semper.
              </p>
              <Link href="/about" className="bg-[#7596B8] text-white text-xs font-bold px-8 py-3.5 hover:bg-primary transition-colors inline-block">
                Discover more &rarr;
              </Link>
            </div>

            {/* Right Image & Accordion */}
            <div className="w-full lg:w-7/12 relative pl-0 lg:pl-12">
              {/* Vertical Watermark Text */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 -rotate-90 text-gray-100 font-bold text-8xl z-0 pointer-events-none hidden lg:block">
                Premium
              </div>
              
              <div className="relative z-10 w-4/5 h-[500px]">
                <Image 
                  src="/images/who-we-are.jpg" 
                  alt="Model"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Overlapping White Box */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] bg-[#F9F9F9] p-8 shadow-xl z-20">
                <h3 className="font-bold text-lg mb-6 leading-snug">
                  Driven by craftsmanship, inspired by your moments
                </h3>
                
                <div className="space-y-4">
                  {/* Accordion Item 1 (Expanded) */}
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-bold text-xs mb-3 text-foreground">Company Vision</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed">
                      Hac viverra est mus platea letius facilisis lobortis nec porttitor rhoncus. Ullamcorper
                    </p>
                  </div>
                  {/* Accordion Item 2 */}
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-bold text-xs text-foreground opacity-60 hover:opacity-100 cursor-pointer transition-opacity">Company Mission</h4>
                  </div>
                  {/* Accordion Item 3 */}
                  <div>
                    <h4 className="font-bold text-xs text-foreground opacity-60 hover:opacity-100 cursor-pointer transition-opacity">Company Motto</h4>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
               {[ 
                 { value: 47, suffix: "K+", label: "Happy Customer" },
                 { value: 35, suffix: "K+", label: "Product Sold" },
                 { value: 4.7, suffix: "", isFloat: true, label: "Client Reviews" },
                 { value: 25, suffix: "+", label: "Years of Experience" }
               ].map((stat, i) => (
                 <div key={i} className="relative flex-1 flex flex-col items-center justify-center py-6 md:py-8">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-bold text-gray-200/50 z-0 select-none">
                      <StatCounter value={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
                    </div>
                    <h3 className="relative z-10 font-bold text-sm md:text-base text-foreground">
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
