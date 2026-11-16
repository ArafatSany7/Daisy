import Image from 'next/image';
import { Gem, HeartHandshake, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] bg-ink flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="relative z-10 px-6">
          <h1 className="font-display text-5xl md:text-7xl text-white mb-4">About Daisy</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Redefining elegance with timeless pieces designed for the modern individual.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-well rounded-3xl overflow-hidden">
              <Image 
                src="/images/hero-clean.png" 
                alt="The Daisy Story"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest">Our Story</h2>
            <h3 className="font-display text-4xl md:text-5xl leading-tight">
              Elevating Everyday Elegance
            </h3>
            <p className="text-muted text-lg">
              Founded on the belief that fashion is a powerful form of self-expression, Daisy brings you a curated collection of premium apparel and accessories. We blend classic silhouettes with contemporary design to create pieces that are both versatile and striking.
            </p>
            <p className="text-muted text-lg">
              Every stitch, fabric choice, and finishing detail is carefully considered to ensure that our garments not only look beautiful but feel extraordinary to wear. Whether you are stepping out for a casual afternoon or preparing for a special evening, Daisy is designed to make you feel confident and effortless.
            </p>
            <div className="pt-4">
              <Link href="/shop" className="btn btn-primary">
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-well py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl mb-4">Our core values</h2>
            <p className="text-muted max-w-2xl mx-auto">
              The principles that guide our design, sourcing, and customer experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 text-center rounded-3xl">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 ">
                <Gem size={26} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h4 className="font-bold text-lg mb-3">Premium Quality</h4>
              <p className="text-muted text-sm">
                We source only the finest materials to ensure our garments stand the test of time.
              </p>
            </div>
            <div className="bg-white p-8 text-center rounded-3xl">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 ">
                <Leaf size={26} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h4 className="font-bold text-lg mb-3">Sustainable Practices</h4>
              <p className="text-muted text-sm">
                Committed to minimizing our environmental footprint through mindful production.
              </p>
            </div>
            <div className="bg-white p-8 text-center rounded-3xl">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 ">
                <HeartHandshake size={26} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <h4 className="font-bold text-lg mb-3">Customer First</h4>
              <p className="text-muted text-sm">
                Your satisfaction is our priority, from the shopping experience to the final fit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
