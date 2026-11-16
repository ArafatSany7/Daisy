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
    <label className="relative inline-flex items-center">
      <span className="sr-only">Sort products</span>
      <select
        value={value}
        onChange={onChange}
        className="appearance-none bg-black text-white text-sm pl-6 pr-10 py-3 w-56 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-4 text-white pointer-events-none" />
    </label>
  );
}
