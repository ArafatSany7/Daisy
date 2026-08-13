import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import FadeIn from '@/components/animations/FadeIn';
import {
  Shirt,
  Glasses,
  Scissors,
  Diamond,
  Footprints,
  Briefcase,
  ChevronDown
} from 'lucide-react';

export default function ShopPage() {
  // Array of 12 products matching the screenshots conceptually
  const products = [
    { id: "shop-1", name: "Daisy Elara Embroidered Midi Dress", oldPrice: 299, price: 249, sale: true, img: "/products/4-2.jpg" },
    { id: "shop-3", name: "Daisy Lune Ankle Strap Heels", price: 64, img: "/products/6-1-600x600.jpg" },
    { id: "shop-4", name: "Daisy Rora Raffia Tote Bag", price: 52, img: "/products/7-1-600x600.jpg" },
    { id: "shop-5", name: "Daisy Aria Baseball Cap", price: 29, img: "/products/8-1-600x600.jpg" },
    { id: "shop-6", name: "Daisy Nova Rib Tank Top", oldPrice: 29, price: 25, sale: true, img: "/products/9-1-600x600.jpg" },
    { id: "shop-7", name: "Daisy Kaia Cropped Jacket", oldPrice: 79, price: 70, sale: true, img: "/products/10-1-600x600.jpg" },
    { id: "shop-8", name: "Daisy Aria Everyday Hoodie", oldPrice: 69, price: 60, sale: true, img: "/products/11-1-600x600.jpg" },
    { id: "shop-9", name: "Daisy Amelie Cable Knit Cardigan", price: 74, img: "/products/12-1-600x600.jpg" },
    { id: "shop-10", name: "Daisy Maren Structured Handbag", price: 85, img: "/products/13-1-600x600.jpg" },
    { id: "shop-11", name: "Daisy Audrey Ballet Flats", price: 49, img: "/products/14-1-600x600.jpg" },
    { id: "shop-12", name: "Daisy Remi Linen Bucket Hat", price: 32, img: "/products/16-1-600x600.jpg" },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900">Shop</span>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8">
        <FadeIn>
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="w-full lg:w-1/4 shrink-0">
            <div className="bg-white border border-gray-100 shadow-sm">
              <div className="bg-[#4A7294] text-white text-center font-bold text-[13px] py-4 uppercase tracking-wider">
                POPULAR CATEGORY
              </div>
              <ul className="flex flex-col">
                {[
                  { name: 'Dress', icon: <Shirt size={16} /> },
                  { name: 'Eyewear', icon: <Glasses size={16} /> },
                  { name: 'Pants', icon: <Scissors size={16} /> },
                  { name: 'Hoodie', icon: <Shirt size={16} /> },
                  { name: 'Hat', icon: <Diamond size={16} /> },
                  { name: 'Footwear', icon: <Footprints size={16} /> },
                  { name: 'Accessories', icon: <Briefcase size={16} /> },
                ].map((cat, idx) => (
                  <li key={cat.name} className={`flex items-center text-[13px] text-foreground hover:text-primary cursor-pointer px-6 py-4 ${idx !== 6 ? 'border-b border-gray-100' : ''}`}>
                    <span className="mr-4 text-[#4A7294]">{cat.icon}</span> {cat.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Banner & Sorting */}
          <div className="w-full lg:w-3/4 flex flex-col">
            {/* Banner Image */}
            <div className="relative w-full h-[300px] lg:h-auto lg:flex-1 bg-gray-100 mb-4">
              <Image 
                src="/products/5-1.jpg"
                alt="New Season Sale Up to 40% OFF"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 75vw"
                priority
              />
            </div>
            {/* Sorting Dropdown */}
            <div className="flex justify-end">
              <button className="bg-black text-white text-sm px-6 py-3 flex items-center justify-between w-48">
                Default sorting <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        </FadeIn>

        {/* Product Grid (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Poster Image */}
          <FadeIn delay={0}>
          <div className="relative aspect-[4/5] bg-[#F6F6F6] mb-5 overflow-hidden h-full w-full">
            <span className="absolute top-0 right-0 bg-[#FBB03B] text-black text-[10px] font-bold px-2 py-1 z-10 uppercase">
              SALE!
            </span>
            <Image 
              src="/products/4-2.jpg"
              alt="30% OFF Limited Time Offer"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          </FadeIn>
          
          {products.slice(1).map((item, idx) => (
            <FadeIn key={item.id} delay={0.1 * ((idx % 4) + 1)}>
              <ProductCard {...item} />
            </FadeIn>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center border border-gray-200">
            <button className="px-4 py-2 bg-gray-100 text-gray-500 font-medium border-r border-gray-200">1</button>
            <button className="px-4 py-2 bg-white text-gray-500 font-medium hover:bg-gray-50 border-r border-gray-200">2</button>
            <button className="px-4 py-2 bg-white text-gray-500 hover:bg-gray-50">&rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
}
