import Link from 'next/link';

export default function ItemDetails({ params }: { params: { id: string } }) {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      {/* Breadcrumbs */}
      <div className="text-sm text-foreground/60 mb-8">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link> &gt; 
        <Link href="/items" className="hover:text-accent transition-colors mx-2">Items</Link> &gt; 
        <span className="text-foreground mx-2">Premium Item {params.id}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="h-[600px] bg-secondary rounded-lg flex items-center justify-center text-foreground/20 text-4xl">
             Main Image
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="h-32 bg-secondary rounded flex items-center justify-center text-foreground/20 cursor-pointer hover:opacity-80 transition-opacity">
                 Thumb {i}
               </div>
             ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">Premium Item {params.id}</h1>
          <div className="text-2xl font-medium mb-6">$120.00</div>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex text-accent">
              ★ ★ ★ ★ ★
            </div>
            <div className="text-foreground/60">(128 Reviews)</div>
          </div>

          <p className="text-foreground/80 mb-8 leading-relaxed">
            Elevate your wardrobe with this premium piece. Crafted with the finest materials and designed for the modern individual. Perfect for both casual outings and formal events.
          </p>

          <div className="mb-8">
            <h3 className="font-bold mb-4">Select Size</h3>
            <div className="flex space-x-4">
               {['S', 'M', 'L', 'XL'].map(size => (
                 <button key={size} className="w-12 h-12 rounded border border-secondary flex items-center justify-center hover:border-primary transition-colors focus:bg-primary focus:text-background focus:border-primary">
                   {size}
                 </button>
               ))}
            </div>
          </div>

          <div className="flex space-x-4 mb-12">
            <button className="flex-1 bg-primary text-background px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-primary transition-all">
              Add to Cart
            </button>
            <button className="w-14 h-14 border border-secondary rounded-full flex items-center justify-center hover:border-accent hover:text-accent transition-all">
               ♥
            </button>
          </div>

          {/* Accordions */}
          <div className="space-y-4 border-t border-secondary pt-8">
            <details className="group cursor-pointer">
              <summary className="font-bold text-lg flex justify-between items-center">
                Description
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-foreground/70">
                Detailed description about the materials, fit, and care instructions.
              </div>
            </details>
            <details className="group cursor-pointer">
              <summary className="font-bold text-lg flex justify-between items-center">
                Shipping & Returns
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-foreground/70">
                Free shipping on orders over $200. Returns accepted within 30 days.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
