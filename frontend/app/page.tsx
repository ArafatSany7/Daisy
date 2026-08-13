import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-secondary -z-10"></div>
        {/* Abstract background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
            Elevate Your Style
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]">
            Discover the latest trends and timeless classics in our premium collection. 
            Designed for the modern individual who values quality and elegance.
          </p>
          <div className="flex justify-center space-x-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
            <Link href="/items" className="bg-primary text-background px-8 py-4 rounded-full font-medium hover:bg-accent hover:text-primary transition-all">
              Shop Collection
            </Link>
            <Link href="/about" className="bg-transparent border border-primary text-primary px-8 py-4 rounded-full font-medium hover:bg-primary/5 transition-all">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-foreground/60">Find exactly what you're looking for</p>
            </div>
            <Link href="/items" className="hidden md:inline-flex text-accent hover:text-primary transition-colors font-medium">
              View All Categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-96 mb-6 overflow-hidden bg-secondary rounded-lg">
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-all duration-500 z-10"></div>
                   {/* Placeholder for category image */}
                   <div className="absolute inset-0 flex items-center justify-center text-foreground/20 text-6xl">
                      Image {i}
                   </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">Category {i}</h3>
                <p className="text-foreground/60">Explore collection</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">The latest additions to our premium collection</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-background rounded-lg overflow-hidden group">
                  <div className="relative h-80 bg-background/50 flex items-center justify-center text-foreground/20 overflow-hidden">
                    Image {i}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                       <button className="bg-white text-black px-6 py-2 rounded-full font-medium transform scale-95 group-hover:scale-100 transition-all">
                         Quick Add
                       </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-accent font-bold mb-2">BRAND</div>
                    <h3 className="text-lg font-bold mb-2">Premium Item {i}</h3>
                    <div className="flex justify-between items-center">
                       <span className="text-lg font-medium">$120.00</span>
                       <div className="flex text-accent text-sm">
                         ★ ★ ★ ★ ★
                       </div>
                    </div>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="text-center mt-16">
             <Link href="/items" className="inline-block border-2 border-primary text-primary px-10 py-4 rounded-full font-bold hover:bg-primary hover:text-background transition-all">
               Load More Products
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
