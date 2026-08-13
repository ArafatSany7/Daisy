import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] bg-[#4A7294] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">About Daisy</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Redefining elegance with timeless pieces designed for the modern individual.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-gray-100">
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
            <h2 className="text-sm font-bold text-[#4A7294] uppercase tracking-widest">Our Story</h2>
            <h3 className="text-4xl font-bold text-gray-900 leading-tight">
              Elevating Everyday Elegance
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Founded on the belief that fashion is a powerful form of self-expression, Daisy brings you a curated collection of premium apparel and accessories. We blend classic silhouettes with contemporary design to create pieces that are both versatile and striking.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every stitch, fabric choice, and finishing detail is carefully considered to ensure that our garments not only look beautiful but feel extraordinary to wear. Whether you are stepping out for a casual afternoon or preparing for a special evening, Daisy is designed to make you feel confident and effortless.
            </p>
            <div className="pt-4">
              <Link href="/shop" className="inline-block bg-primary text-white font-bold text-sm px-8 py-4 uppercase tracking-wider hover:bg-primary/90 transition-colors">
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The principles that guide our design, sourcing, and customer experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#4A7294]/10 text-[#4A7294] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                ✨
              </div>
              <h4 className="font-bold text-lg mb-3">Premium Quality</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                We source only the finest materials to ensure our garments stand the test of time.
              </p>
            </div>
            <div className="bg-white p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#4A7294]/10 text-[#4A7294] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                🌿
              </div>
              <h4 className="font-bold text-lg mb-3">Sustainable Practices</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Committed to minimizing our environmental footprint through mindful production.
              </p>
            </div>
            <div className="bg-white p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-[#4A7294]/10 text-[#4A7294] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                🤝
              </div>
              <h4 className="font-bold text-lg mb-3">Customer First</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your satisfaction is our priority, from the shopping experience to the final fit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
