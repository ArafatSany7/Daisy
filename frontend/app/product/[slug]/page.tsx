import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductGallery from '@/components/product/ProductGallery';
import ProductPurchase from '@/components/product/ProductPurchase';
import { getCategory, getProductBySlug, isOnSale, products, relatedProducts } from '@/lib/products';
import { formatPrice, site } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const related = relatedProducts(product);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <div className="bg-white pb-24">
      <div className="border-b border-gray-100 py-4">
        <nav className="container mx-auto px-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-2">&gt;</span>
          <Link href={`/shop?category=${category.slug}`} className="hover:text-primary transition-colors">{category.name}</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <ProductGallery images={product.images} title={product.title} />

        <div>
          <Link
            href={`/shop?category=${category.slug}`}
            className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
          >
            {category.name}
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold mt-2 mb-4">{product.title}</h1>

          <div className="flex items-center gap-2 mb-6 text-sm">
            <div className="flex text-[#FBB03B]" aria-label={`Rated ${product.rating} out of 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={16} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-gray-500">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-[#28A745]">{formatPrice(product.price)}</span>
            {isOnSale(product) && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice!)}</span>
                <span className="bg-[#FBB03B] text-black text-[11px] font-bold px-2 py-1 uppercase">
                  Save {formatPrice(savings)}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          <ProductPurchase product={product} />

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-gray-100 py-6 mb-8 text-xs text-gray-600">
            <li className="flex items-center gap-2">
              <Truck size={18} className="text-primary shrink-0" /> Free shipping over {formatPrice(site.freeShippingThreshold)}
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw size={18} className="text-primary shrink-0" /> {site.returnWindowDays}-day returns
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary shrink-0" /> Secure checkout
            </li>
          </ul>

          <div className="space-y-4">
            <details className="group border-b border-gray-100 pb-4" open>
              <summary className="font-bold flex justify-between items-center cursor-pointer list-none">
                Description
                <span className="group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </details>
            <details className="group border-b border-gray-100 pb-4">
              <summary className="font-bold flex justify-between items-center cursor-pointer list-none">
                Shipping &amp; Returns
                <span className="group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                Free shipping on orders over {formatPrice(site.freeShippingThreshold)}. Returns accepted within{' '}
                {site.returnWindowDays} days. See our <Link href="/shipping" className="underline hover:text-primary">shipping</Link> and{' '}
                <Link href="/returns" className="underline hover:text-primary">returns</Link> policies.
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container mx-auto px-6 mt-24" aria-labelledby="related-heading">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h2 id="related-heading" className="font-bold text-2xl tracking-tight">You may also like</h2>
            <Link href={`/shop?category=${category.slug}`} className="text-sm font-bold text-primary hover:underline">
              More {category.name.toLowerCase()} &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
