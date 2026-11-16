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
      <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        className="w-full h-11 pl-11 pr-4 rounded-full bg-well border border-transparent text-sm text-ink placeholder:text-muted focus:outline-none focus:bg-white focus:border-line focus:ring-4 focus:ring-accent/10 transition-all"
      />
    </form>
  );
}
