"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExplorePage() {
  const [items, setItems] = useState<unknown[]>([]);

  useEffect(() => {
    // Fetch from backend (fallback to mock if server is down)
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
           setItems(data);
        } else {
           // Fallback Mock data
           setItems(Array.from({ length: 12 }).map((_, i) => ({
             id: i.toString(),
             title: `Premium Item ${i + 1}`,
             price: 120.00 + (i * 10),
             category: i % 2 === 0 ? 'Men' : 'Women',
             rating: 4.5
           })));
        }
      })
      .catch(() => {
        // Fallback Mock data
        setItems(Array.from({ length: 12 }).map((_, i) => ({
          id: i.toString(),
          title: `Premium Item ${i + 1}`,
          price: 120.00 + (i * 10),
          category: i % 2 === 0 ? 'Men' : 'Women',
          rating: 4.5
        })));
      });
  }, []);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  return (
    <div className="pt-32 pb-24 container mx-auto px-6">
      <h1 className="text-4xl font-bold mb-8">Explore Collection</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-12 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <input 
            type="text" 
            placeholder="Search items..."
            className="px-4 py-2 border border-secondary rounded focus:outline-none focus:border-accent bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="px-4 py-2 border border-secondary rounded focus:outline-none focus:border-accent bg-background"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div>
          <select className="px-4 py-2 border border-secondary rounded focus:outline-none focus:border-accent bg-background">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-background rounded-lg overflow-hidden group border border-secondary">
            <div className="relative h-80 bg-secondary flex items-center justify-center text-foreground/20 overflow-hidden">
              Image {item.id}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Link href={`/items/${item.id}`} className="bg-white text-black px-6 py-2 rounded-full font-medium transform scale-95 group-hover:scale-100 transition-all">
                   View Details
                 </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-accent font-bold mb-2">{item.category.toUpperCase()}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <div className="flex justify-between items-center">
                 <span className="text-lg font-medium">৳{item.price.toFixed(2)}</span>
                 <div className="flex text-accent text-sm">
                   ★ ★ ★ ★ {item.rating % 1 !== 0 ? '☆' : '★'}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-16 space-x-2">
        <button className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors">&lt;</button>
        <button className="w-10 h-10 rounded-full bg-primary text-background flex items-center justify-center">1</button>
        <button className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors">2</button>
        <button className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors">3</button>
        <button className="w-10 h-10 rounded-full border border-secondary flex items-center justify-center hover:bg-primary hover:text-background transition-colors">&gt;</button>
      </div>
    </div>
  );
}
