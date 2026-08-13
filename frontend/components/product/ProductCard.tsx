"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  oldPrice?: number;
  price: number;
  sale?: boolean;
  img: string;
}

export default function ProductCard({ id, name, oldPrice, price, sale, img }: ProductCardProps) {
  const { cartItems, addToCart } = useCart();
  const inCart = cartItems.some(item => item.id === id);

  const handleAdd = () => {
    addToCart({
      id,
      name,
      price,
      oldPrice,
      img,
    });
  };

  return (
    <div className="flex flex-col group">
      <div className="relative aspect-[4/5] bg-[#F6F6F6] mb-5 overflow-hidden">
        {sale && (
          <span className="absolute top-0 right-0 bg-[#FBB03B] text-black text-[10px] font-bold px-2 py-1 z-10 uppercase">
            SALE!
          </span>
        )}
        <Image 
          src={img}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="text-center flex flex-col items-center flex-grow">
        <h3 className="font-bold text-foreground text-[13px] mb-2 leading-snug">{name}</h3>
        <div className="flex justify-center items-center space-x-2 mb-4">
          {oldPrice && <span className="text-gray-400 line-through text-[13px]">৳{oldPrice}</span>}
          <span className="text-[#4CAF50] font-bold text-[13px]">৳{price}</span>
        </div>
        <div className="mt-auto flex items-center space-x-3">
          {inCart ? (
            <>
              <div className="bg-[#2A2A2A] text-white text-[11px] font-bold px-4 py-2.5 flex items-center">
                Added to cart <Check size={14} className="ml-1" />
              </div>
              <Link href="/cart" className="text-[11px] font-bold text-gray-600 hover:text-primary transition-colors underline">
                View cart
              </Link>
            </>
          ) : (
            <button 
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
