"use client";

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useAddToCart } from '@/components/cart/useAddToCart';
import { ease } from '@/lib/motion';
import { discountPercent, getCategory, isOnSale, type Product } from '@/lib/products';
import { formatPrice } from '@/lib/site';

export default function ProductCard({
  product,
  priority = false,
  variant = 'default',
}: {
  product: Product;
  priority?: boolean;
  /** "feature" renders a taller tile for bento layouts. */
  variant?: 'default' | 'feature';
}) {
  const { isInCart } = useCart();
  const addToCart = useAddToCart();
  const { id, slug, title, price, oldPrice, images, sizes } = product;
  const href = `/product/${slug}`;
  const inCart = isInCart(id);
  const needsSize = !!sizes?.length;
  const onSale = isOnSale(product);
  const hasAlt = images.length > 1;
  const category = getCategory(product.category);

  const add = (size?: string) =>
    addToCart({ productId: id, slug, name: title, price, oldPrice, img: images[0], size });

  return (
    <article className="group relative flex flex-col h-full">
      <div
        className={`relative overflow-hidden rounded-2xl bg-well ${
          variant === 'feature' ? 'aspect-[4/5] lg:aspect-auto lg:flex-1 lg:min-h-[520px]' : 'aspect-[4/5]'
        }`}
      >
        <Link href={href} aria-label={title} className="absolute inset-0 z-[1]">
          <Image
            src={images[0]}
            alt={title}
            fill
            // Several first-row cards can be the LCP, so load eagerly rather than preloading all of them.
            loading={priority ? 'eager' : undefined}
            sizes={
              variant === 'feature'
                ? '(max-width: 1024px) 100vw, 50vw'
                : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
            }
            className={`object-contain p-6 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${
              hasAlt ? 'group-hover:opacity-0' : ''
            }`}
          />
          {hasAlt && (
            <Image
              src={images[1]}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-6 opacity-0 scale-[1.02] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-[1.06]"
            />
          )}
        </Link>

        <div className="absolute top-3 left-3 z-[2] flex flex-col items-start gap-1.5 pointer-events-none">
          {onSale && (
            <span className="bg-signal text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              −{discountPercent(product)}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-white/90 backdrop-blur text-ink text-xs font-semibold px-2.5 py-1 rounded-full">New</span>
          )}
        </div>

        {/* Quick add: revealed on hover/focus for pointer devices */}
        <div className="absolute inset-x-3 bottom-3 z-[2] hidden [@media(hover:hover)]:block translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {inCart ? (
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: ease.out }}
              className="flex items-center justify-center gap-2 h-11 rounded-full bg-white/95 backdrop-blur text-sm font-semibold text-success shadow-lg"
            >
              <Check size={16} /> In your bag
            </m.div>
          ) : needsSize ? (
            <div className="rounded-2xl bg-white/95 backdrop-blur p-2.5 shadow-lg">
              <p className="text-xs font-semibold text-muted text-center mb-2">Quick add</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {sizes!.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => add(s)}
                    aria-label={`Add ${title}, size ${s}, to cart`}
                    className="min-w-9 h-9 px-2 rounded-full text-xs font-semibold border border-line hover:bg-ink hover:text-white hover:border-ink active:scale-95 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => add()} className="btn btn-primary w-full h-11">
              <Plus size={16} /> Add to cart
            </button>
          )}
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-1 flex-grow">
        {category && <p className="text-xs text-muted">{category.name}</p>}
        <h3 className={`leading-snug ${variant === 'feature' ? 'text-xl font-display' : 'text-[15px] font-medium'}`}>
          <Link href={href} className="hover:underline underline-offset-4 decoration-ink/30">
            {title}
          </Link>
        </h3>
        <p className="flex items-baseline gap-2 text-[15px]">
          <span className={`font-semibold ${onSale ? 'text-signal' : 'text-ink'}`}>{formatPrice(price)}</span>
          {onSale && (
            <span className="text-muted line-through text-sm">
              <span className="sr-only">was </span>
              {formatPrice(oldPrice!)}
            </span>
          )}
        </p>

        {/* Touch devices: always-visible action */}
        <div className="mt-3 [@media(hover:hover)]:hidden">
          {inCart ? (
            <m.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: ease.out }}
              className="flex items-center justify-center gap-1.5 h-11 rounded-full bg-well text-sm font-semibold text-success"
            >
              <Check size={16} /> In your bag
            </m.span>
          ) : needsSize ? (
            <Link href={href} className="btn btn-outline w-full h-11 px-4">
              Choose size
            </Link>
          ) : (
            <button type="button" onClick={() => add()} className="btn btn-primary w-full h-11 px-4">
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
