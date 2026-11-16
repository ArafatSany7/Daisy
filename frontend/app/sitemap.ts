import type { MetadataRoute } from 'next';
import { categories, products } from '@/lib/products';
import { footerNav, siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['/', '/shop', '/about', '/contact', ...footerNav.care.map((l) => l.href), ...footerNav.legal.map((l) => l.href)];

  return [
    ...staticPaths.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: path === '/' || path === '/shop' ? ('daily' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : path === '/shop' ? 0.9 : 0.4,
    })),
    ...categories.map((c) => ({
      url: `${siteUrl}/shop?category=${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${siteUrl}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: p.images.map((img) => `${siteUrl}${encodeURI(img)}`),
    })),
  ];
}
