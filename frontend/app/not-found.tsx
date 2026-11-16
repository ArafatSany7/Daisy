import Link from 'next/link';
import { categories } from '@/lib/products';

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-28 text-center max-w-2xl">
      <p className="logo-text text-6xl text-accent mb-4">Oops</p>
      <h1 className="font-display text-4xl mb-3">We couldn&apos;t find that page</h1>
      <p className="text-muted mb-10">The link may be broken, or the page may have moved. Try one of these instead:</p>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?category=${c.slug}`}
            className="px-4 py-2 rounded-full bg-well text-sm hover:bg-ink hover:text-white transition-colors"
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/shop" className="btn btn-primary">
          Shop all products
        </Link>
        <Link href="/" className="btn btn-outline">
          Back to home
        </Link>
      </div>
    </div>
  );
}
