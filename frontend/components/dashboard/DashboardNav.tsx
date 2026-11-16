"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const groups = [
  {
    title: 'User Menu',
    links: [
      { href: '/dashboard/user', label: 'Overview' },
      { href: '/dashboard/user/orders', label: 'My Orders' },
      { href: '/dashboard/user/wishlist', label: 'Wishlist' },
      { href: '/dashboard/user/addresses', label: 'Saved Addresses' },
      { href: '/dashboard/user/profile', label: 'Profile Settings' },
    ],
  },
  {
    title: 'Admin Menu',
    links: [
      { href: '/dashboard/admin', label: 'Admin Overview' },
      { href: '/dashboard/admin/items', label: 'Manage Items' },
      { href: '/dashboard/admin/users', label: 'Manage Users' },
      { href: '/dashboard/admin/analytics', label: 'Analytics' },
    ],
  },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2" aria-label="Dashboard">
      {groups.map((group, gi) => (
        <div key={group.title}>
          <div
            className={`eyebrow mb-3 mt-8 ${gi > 0 ? 'pt-4 border-t border-line' : ''}`}
          >
            {group.title}
          </div>
          {group.links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`block px-4 py-2.5 rounded-full text-sm transition-colors ${
                  active ? 'bg-well font-bold' : 'hover:bg-well'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
