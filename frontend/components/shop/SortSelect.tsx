"use client";

import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { SORT_OPTIONS } from '@/lib/products';

export default function SortSelect({ value, baseParams }: { value: string; baseParams: Record<string, string> }) {
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(baseParams);
    params.delete('page');
    if (e.target.value === 'featured') params.delete('sort');
    else params.set('sort', e.target.value);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : '/shop', { scroll: false });
  };

  return (
    <label className="relative flex items-center">
      <span className="sr-only">Sort products</span>
      <select
        value={value}
        onChange={onChange}
        className="appearance-none h-10 w-full sm:w-auto pl-4 pr-10 rounded-full bg-white border border-line text-sm font-medium cursor-pointer hover:border-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/15 transition-colors"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            Sort: {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3.5 text-muted pointer-events-none" />
    </label>
  );
}
