"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchForm({ className = '' }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  return (
    <form role="search" onSubmit={onSubmit} className={`relative ${className}`}>
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-primary w-full"
      />
    </form>
  );
}
