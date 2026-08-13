import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-background py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-4 tracking-tighter">BHUSELLE.</h3>
          <p className="text-background/80 mb-6">
            Premium fashion for the modern individual. Quality, style, and elegance in every piece.
          </p>
          <div className="flex space-x-4">
            {/* Social Icons Mock */}
            <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
              <span className="sr-only">Facebook</span>
              f
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
              <span className="sr-only">Twitter</span>
              t
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all">
              <span className="sr-only">Instagram</span>
              i
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="text-background/80 hover:text-accent transition-colors">Home</Link></li>
            <li><Link href="/items" className="text-background/80 hover:text-accent transition-colors">Shop</Link></li>
            <li><Link href="/about" className="text-background/80 hover:text-accent transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="text-background/80 hover:text-accent transition-colors">Journal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Customer Care</h4>
          <ul className="space-y-3">
            <li><Link href="/help" className="text-background/80 hover:text-accent transition-colors">Help Center</Link></li>
            <li><Link href="/terms" className="text-background/80 hover:text-accent transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="text-background/80 hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link href="/contact" className="text-background/80 hover:text-accent transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
          <p className="text-background/80 mb-4">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 w-full bg-background/10 border border-background/20 rounded-l focus:outline-none focus:border-accent"
            />
            <button type="submit" className="bg-accent text-primary px-6 py-3 rounded-r font-medium hover:bg-accent/90 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-background/10 text-center text-background/60">
        <p>&copy; {new Date().getFullYear()} Bhuselle. All rights reserved.</p>
      </div>
    </footer>
  );
}
