import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import ProductGallery from '@/components/product/ProductGallery';
import ProductPurchase from '@/components/product/ProductPurchase';
import SectionHeader from '@/components/home/SectionHeader';
import {
  discountPercent,
  getCategory,
  getProductBySlug,
  isOnSale,
  products,
  relatedProducts,
} from '@/lib/products';
import { formatPrice, site, siteUrl } from '@/lib/site';

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
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { type: 'website', title: product.title, description: product.description, images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const related = relatedProducts(product);
  const onSale = isOnSale(product);

  // Product structured data for rich results. Ratings are intentionally omitted
  // until they come from real customer reviews.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: product.id,
    image: product.images.map((img) => `${siteUrl}${encodeURI(img)}`),
    category: category.name,
    brand: { '@type': 'Brand', name: site.name },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/product/${product.slug}`,
      priceCurrency: 'BDT',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <div className="bg-surface pb-24">
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped so it cannot close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="container mx-auto px-4 sm:px-6 pt-8">
        <nav className="text-sm text-muted mb-8" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/shop" className="hover:text-ink">Shop</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/shop?category=${category.slug}`} className="hover:text-ink">{category.name}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink truncate max-w-[50vw]" aria-current="page">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Link href={`/shop?category=${category.slug}`} className="eyebrow hover:text-ink">
                {category.name}
              </Link>
              <h1 className="font-display text-4xl md:text-5xl mt-3 mb-4">{product.title}</h1>

              <a href="#details" className="inline-flex items-center gap-2 mb-6 text-sm group">
                <span className="flex text-[#B7791F]" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={15} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
                  ))}
                </span>
                <span className="text-muted group-hover:text-ink">
                  <span className="sr-only">Rated </span>
                  {product.rating.toFixed(1)} · {product.reviewCount} reviews
                </span>
              </a>

              <div className="flex flex-wrap items-baseline gap-3 mb-6">
                <span className={`text-3xl font-semibold ${onSale ? 'text-signal' : 'text-ink'}`}>
                  {formatPrice(product.price)}
                </span>
                {onSale && (
                  <>
                    <span className="text-lg text-muted line-through">
                      <span className="sr-only">was </span>
                      {formatPrice(product.oldPrice!)}
                    </span>
                    <span className="bg-signal/10 text-signal text-xs font-semibold px-2.5 py-1 rounded-full">
                      Save {discountPercent(product)}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted mb-8">{product.description}</p>

              <ProductPurchase product={product} />

              <div id="details" className="mt-10 border-t border-line divide-y divide-line">
                {[
                  { title: 'Details & care', body: `${product.description} Care: gentle wash or dry clean; see the label for specifics.`, open: true },
                  {
                    title: 'Shipping & returns',
                    body: `Free shipping on orders over ${formatPrice(site.freeShippingThreshold)}. Returns accepted within ${site.returnWindowDays} days.`,
                  },
                ].map((d) => (
                  <details key={d.title} className="group" open={d.open}>
                    <summary className="flex items-center justify-between py-4 cursor-pointer list-none font-semibold text-[15px] [&::-webkit-details-marker]:hidden">
                      {d.title}
                      <span aria-hidden="true" className="text-xl leading-none text-muted transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-5 text-sm text-muted">
                      {d.body}{' '}
                      {d.title.startsWith('Shipping') && (
                        <>
                          Read our <Link href="/shipping" className="link-underline text-ink">shipping</Link> and{' '}
                          <Link href="/returns" className="link-underline text-ink">returns</Link> policies.
                        </>
                      )}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 mt-28" aria-labelledby="related-heading">
          <SectionHeader
            eyebrow="Complete the look"
            title="You may also like"
            id="related-heading"
            href={`/shop?category=${category.slug}`}
            linkLabel={`More ${category.name.toLowerCase()}`}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
