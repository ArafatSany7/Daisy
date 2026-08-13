export default function About() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <h1 className="text-5xl font-bold text-center mb-12">About Bhuselle</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div className="h-96 bg-secondary rounded-lg flex items-center justify-center text-foreground/20 text-4xl overflow-hidden">
          Our Story Image
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-foreground/80 mb-4 leading-relaxed">
            Bhuselle was founded on a simple principle: high-end fashion should be accessible, sustainable, and timeless. We travel the world to source the finest materials, working closely with artisans who have dedicated their lives to their craft.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Every piece in our collection is designed with the modern individual in mind. We believe that what you wear is an extension of who you are, and our goal is to help you express your unique identity with confidence and elegance.
          </p>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto">The principles that guide everything we do</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-secondary rounded-lg text-center hover:shadow-xl transition-shadow bg-background">
           <div className="text-4xl mb-4">🌿</div>
           <h3 className="text-xl font-bold mb-4">Sustainability</h3>
           <p className="text-foreground/70">We are committed to ethical sourcing and reducing our environmental footprint.</p>
        </div>
        <div className="p-8 border border-secondary rounded-lg text-center hover:shadow-xl transition-shadow bg-background">
           <div className="text-4xl mb-4">💎</div>
           <h3 className="text-xl font-bold mb-4">Quality</h3>
           <p className="text-foreground/70">Uncompromising standards for materials and craftsmanship in every garment.</p>
        </div>
        <div className="p-8 border border-secondary rounded-lg text-center hover:shadow-xl transition-shadow bg-background">
           <div className="text-4xl mb-4">🤝</div>
           <h3 className="text-xl font-bold mb-4">Community</h3>
           <p className="text-foreground/70">Building lasting relationships with our customers and supporting our artisans.</p>
        </div>
      </div>
    </div>
  );
}
