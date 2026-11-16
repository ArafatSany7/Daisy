import Link from 'next/link';
import { Shirt, Sparkles, Layers, Wind, Scissors, Footprints, Briefcase, Crown, LayoutGrid } from 'lucide-react';
import { categories, products, type CategorySlug } from '@/lib/products';

const icons: Record<CategorySlug, React.ReactNode> = {
  dresses: <Sparkles size={16} />,
  tops: <Shirt size={16} />,
  knitwear: <Layers size={16} />,
  outerwear: <Wind size={16} />,
  bottoms: <Scissors size={16} />,
  footwear: <Footprints size={16} />,
  bags: <Briefcase size={16} />,
  hats: <Crown size={16} />,
};

const countFor = (slug: CategorySlug) => products.filter((p) => p.category === slug).length;

export default function CategorySidebar({
  active,
  headerClassName = 'bg-primary',
}: {
  active?: string;
  headerClassName?: string;
}) {
  const items = [
    { slug: undefined, name: 'All products', icon: <LayoutGrid size={16} />, count: products.length, href: '/shop' },
    ...categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      icon: icons[c.slug],
      count: countFor(c.slug),
      href: `/shop?category=${c.slug}`,
    })),
  ];

  return (
    <nav className="bg-white border border-gray-100 shadow-sm" aria-label="Product categories">
      <div className={`${headerClassName} text-white text-center font-bold text-[13px] py-4 uppercase tracking-wider`}>
        Popular Category
      </div>
      <ul className="flex flex-col">
        {items.map((cat, idx) => {
          const isActive = active === cat.slug;
          return (
            <li key={cat.name} className={idx !== items.length - 1 ? 'border-b border-gray-100' : ''}>
              <Link
                href={cat.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center text-[13px] px-6 py-4 transition-colors hover:text-primary hover:bg-gray-50 ${
                  isActive ? 'text-primary font-bold bg-gray-50' : 'text-foreground'
                }`}
              >
                <span className="mr-4 text-primary">{cat.icon}</span>
                <span className="flex-1">{cat.name}</span>
                <span className="text-[11px] text-gray-400">{cat.count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
