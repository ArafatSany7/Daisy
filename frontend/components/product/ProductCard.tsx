"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { isOnSale, type Product } from '@/lib/products';
import { formatPrice } from '@/lib/site';

export default function ProductCard({ product }: { product: Product }) {
  const { isInCart, addToCart, openCart } = useCart();
  const { id, slug, title, price, oldPrice, images, sizes } = product;
  const href = `/product/${slug}`;
  const inCart = isInCart(id);
  const needsSize = !!sizes?.length;

  const handleAdd = () => {
    addToCart({ productId: id, slug, name: title, price, oldPrice, img: images[0] });
  };

  return (
    <div className="flex flex-col group h-full">
      <Link href={href} className="relative block aspect-[4/5] bg-[#F6F6F6] mb-5 overflow-hidden" aria-label={title}>
        {isOnSale(product) && (
          <span className="absolute top-0 right-0 bg-[#FBB03B] text-black text-[10px] font-bold px-2 py-1 z-10 uppercase">
            SALE!
          </span>
        )}
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="text-center flex flex-col items-center flex-grow">
        <h3 className="font-bold text-foreground text-[13px] mb-2 leading-snug">
          <Link href={href} className="hover:text-primary transition-colors">{title}</Link>
        </h3>
        <div className="flex justify-center items-center space-x-2 mb-4">
          {oldPrice && <span className="text-gray-400 line-through text-[13px]">{formatPrice(oldPrice)}</span>}
          <span className="text-[#4CAF50] font-bold text-[13px]">{formatPrice(price)}</span>
        </div>
        <div className="mt-auto flex items-center space-x-3">
          {inCart ? (
            <>
              <span className="bg-[#2A2A2A] text-white text-[11px] font-bold px-4 py-2.5 flex items-center">
                In your cart <Check size={14} className="ml-1" />
              </span>
              <button
                type="button"
                onClick={openCart}
                className="text-[11px] font-bold text-gray-600 hover:text-primary transition-colors underline"
              >
                View cart
              </button>
            </>
          ) : needsSize ? (
            <Link
              href={href}
              className="bg-[#2A2A2A] text-white text-[11px] font-bold px-6 py-2.5 hover:bg-primary transition-colors"
            >
              Choose size
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="bg-[#2A2A2A] text-white text-[11px] font-bold px-6 py-2.5 hover:bg-primary transition-colors"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
