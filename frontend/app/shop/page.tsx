import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import FadeIn from '@/components/animations/FadeIn';
import CategorySidebar from '@/components/shop/CategorySidebar';
import SortSelect from '@/components/shop/SortSelect';
import {
  COLLECTIONS,
  SORT_OPTIONS,
  getCategory,
  queryProducts,
  type CollectionKey,
} from '@/lib/products';

// 15 products + the promo poster tile = 4 full rows on page one.
const PAGE_SIZE = 15;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams;
  const category = getCategory(first(sp.category));
  return { title: category ? `${category.name} | Shop` : 'Shop' };
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const category = getCategory(first(sp.category));
  const collectionKey = first(sp.collection);
  const collection = collectionKey && collectionKey in COLLECTIONS ? (collectionKey as CollectionKey) : undefined;
  const q = first(sp.q)?.trim() || undefined;
  const sortRaw = first(sp.sort);
  const sort = SORT_OPTIONS.some((o) => o.value === sortRaw) ? sortRaw! : 'featured';

  const results = queryProducts({ category: category?.slug, collection, q, sort });
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(first(sp.page)) || 1), totalPages);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Params that should persist across sort / pagination links.
  const baseParams: Record<string, string> = {};
  if (category) baseParams.category = category.slug;
  if (collection) baseParams.collection = collection;
  if (q) baseParams.q = q;
  if (sort !== 'featured') baseParams.sort = sort;

  const hrefWith = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams(baseParams);
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined) params.delete(k);
      else params.set(k, v);
    }
    const qs = params.toString();
    return qs ? `/shop?${qs}` : '/shop';
  };

  const heading = q
    ? `Results for “${q}”`
    : category?.name ?? (collection ? COLLECTIONS[collection] : 'All products');

  const activeFilters = [
    category && { label: category.name, href: hrefWith({ category: undefined, page: undefined }) },
    collection && { label: COLLECTIONS[collection], href: hrefWith({ collection: undefined, page: undefined }) },
    q && { label: `“${q}”`, href: hrefWith({ q: undefined, page: undefined }) },
  ].filter(Boolean) as { label: string; href: string }[];

  const showPoster = page === 1 && !category && !collection && !q && sort === 'featured';

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="border-b border-gray-100 py-4">
        <nav className="container mx-auto px-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">&gt;</span>
          {category || collection || q ? (
            <>
              <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-900">{heading}</span>
            </>
          ) : (
            <span className="text-gray-900">Shop</span>
          )}
        </nav>
      </div>

      <div className="container mx-auto px-6 mt-8">
        <FadeIn>
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            <div className="w-full lg:w-1/4 shrink-0">
              <CategorySidebar active={category?.slug} headerClassName="bg-[#4A7294]" />
            </div>

            <div className="w-full lg:w-3/4 flex flex-col">
              <Link
                href="/shop?collection=sale"
                className="relative block w-full h-[300px] lg:h-auto lg:flex-1 bg-gray-100 mb-4 overflow-hidden group"
                aria-label="Shop the sale"
              >
                <Image
                  src="/products/5-1.jpg"
                  alt="New season sale — up to 40% off"
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority
                />
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{heading}</h1>
                  <p className="text-sm text-gray-500">
                    {results.length} {results.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                <SortSelect value={sort} baseParams={baseParams} />
              </div>
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {activeFilters.map((f) => (
                    <Link
                      key={f.label}
                      href={f.href}
                      className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1.5 text-xs hover:bg-gray-200 transition-colors"
                      aria-label={`Remove filter ${f.label}`}
                    >
                      {f.label} <X size={12} />
                    </Link>
                  ))}
                  <Link href="/shop" className="text-xs underline text-gray-500 hover:text-primary ml-1">
                    Clear all
                  </Link>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {visible.length === 0 ? (
          <div className="text-center py-24 bg-gray-50">
            <h2 className="text-xl font-bold mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">Try a different search or browse all products.</p>
            <Link href="/shop" className="inline-block bg-primary text-white px-8 py-3 font-bold text-sm hover:bg-primary/90 transition-colors">
              View all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {showPoster && (
              <FadeIn>
                <Link
                  href="/shop?collection=sale"
                  className="relative block aspect-[4/5] bg-[#F6F6F6] overflow-hidden h-full w-full group"
                  aria-label="30% off — shop the sale"
                >
                  <span className="absolute top-0 right-0 bg-[#FBB03B] text-black text-[10px] font-bold px-2 py-1 z-10 uppercase">
                    SALE!
                  </span>
                  <Image
                    src="/products/4-2.jpg"
                    alt="30% off — limited time offer"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </FadeIn>
            )}
            {visible.map((product, idx) => (
              <FadeIn key={product.id} delay={0.1 * (idx % 4)}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-16 flex justify-center" aria-label="Pagination">
            <div className="flex items-center border border-gray-200">
              {page > 1 && (
                <Link href={hrefWith({ page: String(page - 1) })} className="px-4 py-2 text-gray-500 hover:bg-gray-50 border-r border-gray-200" aria-label="Previous page">
                  &larr;
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={hrefWith({ page: n === 1 ? undefined : String(n) })}
                  aria-current={n === page ? 'page' : undefined}
                  className={`px-4 py-2 font-medium border-r border-gray-200 last:border-r-0 ${
                    n === page ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {n}
                </Link>
              ))}
              {page < totalPages && (
                <Link href={hrefWith({ page: String(page + 1) })} className="px-4 py-2 text-gray-500 hover:bg-gray-50" aria-label="Next page">
                  &rarr;
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
