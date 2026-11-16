import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProductGrid from '@/components/shop/ProductGrid';
import SortSelect from '@/components/shop/SortSelect';
import {
  COLLECTIONS,
  SORT_OPTIONS,
  categories,
  getCategory,
  products,
  queryProducts,
  type CollectionKey,
} from '@/lib/products';

const PAGE_SIZE = 12;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams;
  const category = getCategory(first(sp.category));
  return { title: category ? `${category.name} | Shop` : 'Shop' };
}

const chip = (active: boolean) =>
  `shrink-0 inline-flex items-center h-10 px-4 rounded-full text-sm font-medium border transition-colors ${
    active ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-line hover:border-ink'
  }`;

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

  // Params that persist across sort / pagination / chip links.
  const baseParams: Record<string, string> = {};
  if (category) baseParams.category = category.slug;
  if (collection) baseParams.collection = collection;
  if (q) baseParams.q = q;
  if (sort !== 'featured') baseParams.sort = sort;

  const hrefWith = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams(baseParams);
    params.delete('page');
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined) params.delete(k);
      else params.set(k, v);
    }
    const qs = params.toString();
    return qs ? `/shop?${qs}` : '/shop';
  };

  const heading = q ? `“${q}”` : category?.name ?? (collection ? COLLECTIONS[collection] : 'All products');
  const subheading = q
    ? 'Search results'
    : category
      ? 'Category'
      : collection
        ? 'Collection'
        : 'The Daisy collection';

  return (
    <div className="bg-surface pb-24">
      {/* Page header */}
      <header className="container mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-8">
        <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li aria-hidden="true">/</li>
            {category || collection || q ? (
              <>
                <li><Link href="/shop" className="hover:text-ink">Shop</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-ink" aria-current="page">{q ? 'Search' : heading}</li>
              </>
            ) : (
              <li className="text-ink" aria-current="page">Shop</li>
            )}
          </ol>
        </nav>
        <p className="eyebrow mb-3">{subheading}</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-4xl md:text-6xl">{heading}</h1>
          <p className="text-sm text-muted pb-2">
            {results.length} {results.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      </header>

      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-30 bg-surface/90 backdrop-blur-xl border-y border-line">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <nav className="no-scrollbar flex-1 flex items-center gap-2 overflow-x-auto -mx-1 px-1" aria-label="Filter products">
            <Link href={hrefWith({ category: undefined, collection: undefined })} scroll={false} className={chip(!category && !collection)} aria-current={!category && !collection ? 'page' : undefined}>
              All
            </Link>
            {Object.entries(COLLECTIONS).map(([key, label]) => (
              <Link
                key={key}
                href={hrefWith({ collection: collection === key ? undefined : key })}
                scroll={false} className={chip(collection === key)}
                aria-current={collection === key ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
            <span className="shrink-0 w-px h-6 bg-line mx-1" aria-hidden="true" />
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={hrefWith({ category: category?.slug === c.slug ? undefined : c.slug })}
                scroll={false} className={chip(category?.slug === c.slug)}
                aria-current={category?.slug === c.slug ? 'page' : undefined}
              >
                {c.name}
                <span className={`ml-1.5 text-xs ${category?.slug === c.slug ? 'text-white/60' : 'text-muted'}`}>
                  {products.filter((p) => p.category === c.slug).length}
                </span>
              </Link>
            ))}
          </nav>
          <div className="hidden sm:block shrink-0">
            <SortSelect value={sort} baseParams={baseParams} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-8">
        <div className="sm:hidden mb-6">
          <SortSelect value={sort} baseParams={baseParams} />
        </div>

        {q && (
          <div className="mb-8">
            <Link href={hrefWith({ q: undefined })} scroll={false} className={chip(true)} aria-label={`Clear search for ${q}`}>
              Search: {q} <X size={14} className="ml-1.5" />
            </Link>
          </div>
        )}

        {visible.length === 0 ? (
          <div className="text-center py-24 rounded-3xl bg-well">
            <h2 className="font-display text-3xl mb-3">Nothing here yet</h2>
            <p className="text-muted mb-8">Try a different search or browse the full collection.</p>
            <Link href="/shop" className="btn btn-primary">
              View all products
            </Link>
          </div>
        ) : (
          <ProductGrid products={visible} />
        )}

        {totalPages > 1 && (
          <nav className="mt-20 flex items-center justify-center gap-2" aria-label="Pagination">
            {page > 1 ? (
              <Link href={hrefWith({ page: page - 1 === 1 ? undefined : String(page - 1) })} className="w-11 h-11 rounded-full border border-line flex items-center justify-center hover:border-ink" aria-label="Previous page">
                <ChevronLeft size={18} />
              </Link>
            ) : null}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={hrefWith({ page: n === 1 ? undefined : String(n) })}
                aria-current={n === page ? 'page' : undefined}
                aria-label={`Page ${n}`}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  n === page ? 'bg-ink text-white' : 'border border-line hover:border-ink'
                }`}
              >
                {n}
              </Link>
            ))}
            {page < totalPages ? (
              <Link href={hrefWith({ page: String(page + 1) })} className="w-11 h-11 rounded-full border border-line flex items-center justify-center hover:border-ink" aria-label="Next page">
                <ChevronRight size={18} />
              </Link>
            ) : null}
          </nav>
        )}
      </div>
    </div>
  );
}
