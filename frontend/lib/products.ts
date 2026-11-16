// Single source of truth for the storefront catalog.
// Field names mirror the backend Prisma `Product` model (title, description,
// price, category, rating, stock) so this can be swapped for /api/products later.

export type CategorySlug =
  | 'dresses'
  | 'tops'
  | 'knitwear'
  | 'outerwear'
  | 'bottoms'
  | 'footwear'
  | 'bags'
  | 'hats';

export interface Category {
  slug: CategorySlug;
  name: string;
}

export const categories: Category[] = [
  { slug: 'dresses', name: 'Dresses' },
  { slug: 'tops', name: 'Tops' },
  { slug: 'knitwear', name: 'Knitwear' },
  { slug: 'outerwear', name: 'Outerwear' },
  { slug: 'bottoms', name: 'Bottoms' },
  { slug: 'footwear', name: 'Footwear' },
  { slug: 'bags', name: 'Bags' },
  { slug: 'hats', name: 'Hats' },
];

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: CategorySlug;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sizes?: string[];
  isNew?: boolean;
}

const APPAREL = ['XS', 'S', 'M', 'L', 'XL'];
const SHOES = ['36', '37', '38', '39', '40', '41'];

export const products: Product[] = [
  {
    id: 'p01', slug: 'elara-embroidered-midi-dress', title: 'Elara Embroidered Midi Dress',
    description: 'A relaxed, flowing midi with hand-finished embroidery along the neckline, sleeves and hem. Cut from breathable cotton voile with a tie waist you can wear cinched or loose.',
    price: 249, oldPrice: 299, category: 'dresses', images: ['/products/1-1-600x600.jpg'],
    rating: 4.8, reviewCount: 64, stock: 12, sizes: APPAREL, isNew: true,
  },
  {
    id: 'p02', slug: 'ines-embroidered-long-sleeve-dress', title: 'Ines Embroidered Long-Sleeve Dress',
    description: 'Soft ivory dress with botanical embroidery, billowed sleeves and a self-tie belt. An easy throw-on for warm evenings and celebrations alike.',
    price: 189, category: 'dresses', images: ['/products/6-1-600x600.jpg'],
    rating: 4.7, reviewCount: 41, stock: 9, sizes: APPAREL,
  },
  {
    id: 'p03', slug: 'elya-satin-blouse', title: 'Elya Satin Blouse',
    description: 'Liquid-soft satin blouse with a fluid drape and a clean V-neck. Tuck it into tailoring or wear it loose over denim.',
    price: 70, oldPrice: 85, category: 'tops', images: ['/products/7-1-600x600.jpg', '/products/7-1-600x600 (1).jpg'],
    rating: 4.6, reviewCount: 88, stock: 20, sizes: APPAREL,
  },
  {
    id: 'p04', slug: 'aria-everyday-hoodie', title: 'Aria Everyday Hoodie',
    description: 'A brushed-back fleece hoodie in a muted blush. Oversized through the body with dropped shoulders for a cosy, slouchy fit.',
    price: 60, oldPrice: 69, category: 'tops', images: ['/products/9-1-600x600.jpg'],
    rating: 4.5, reviewCount: 120, stock: 30, sizes: APPAREL,
  },
  {
    id: 'p05', slug: 'amelie-cable-knit-cardigan', title: 'Amelie Cable Knit Cardigan',
    description: 'Chunky cable-knit cardigan in warm cream, finished with gold-tone buttons. Generous enough to layer over dresses and shirts.',
    price: 74, category: 'knitwear', images: ['/products/17-2-600x600.jpg', '/products/17-600x600.jpg'],
    rating: 4.9, reviewCount: 57, stock: 14, sizes: APPAREL, isNew: true,
  },
  {
    id: 'p06', slug: 'nora-turtleneck-sweater', title: 'Nora Turtleneck Sweater',
    description: 'A fine-gauge turtleneck in cornflower blue with a relaxed body and ribbed trims. The colour that brightens every neutral in your wardrobe.',
    price: 60, oldPrice: 68, category: 'knitwear', images: ['/products/Gemini_Generated_Image_xdkbjaxdkbjaxdkb.jpg'],
    rating: 4.7, reviewCount: 33, stock: 11, sizes: APPAREL, isNew: true,
  },
  {
    id: 'p07', slug: 'celeste-longline-blazer', title: 'Celeste Longline Blazer',
    description: 'Single-breasted longline blazer with sharp peak lapels and a softly structured shoulder. Tailored to sit just below the hip.',
    price: 100, oldPrice: 119, category: 'outerwear', images: ['/products/16-1-600x600.jpg', '/products/16-2-600x600.jpg'],
    rating: 4.8, reviewCount: 46, stock: 8, sizes: APPAREL,
  },
  {
    id: 'p08', slug: 'camille-classic-trench-coat', title: 'Camille Classic Trench Coat',
    description: 'The trench, perfected: double-breasted, belted at the waist and finished with storm flaps. Water-resistant cotton gabardine.',
    price: 135, oldPrice: 149, category: 'outerwear', images: ['/products/23-600x600.jpg'],
    rating: 4.9, reviewCount: 72, stock: 6, sizes: APPAREL, isNew: true,
  },
  {
    id: 'p09', slug: 'kaia-cropped-jacket', title: 'Kaia Cropped Jacket',
    description: 'Boxy cropped jacket with a point collar and flap pockets. A smart-casual layer that works over everything from dresses to wide-leg trousers.',
    price: 110, oldPrice: 129, category: 'outerwear', images: ['/products/8-1-600x600.jpg'],
    rating: 4.6, reviewCount: 29, stock: 10, sizes: APPAREL,
  },
  {
    id: 'p10', slug: 'mae-pleated-midi-skirt', title: 'Mae Pleated Midi Skirt',
    description: 'Knife-pleated midi skirt with an elasticated waist that moves beautifully as you walk. Pairs with knits, tees and blouses.',
    price: 58, category: 'bottoms', images: ['/products/10-1-600x600.jpg'],
    rating: 4.7, reviewCount: 51, stock: 18, sizes: APPAREL, isNew: true,
  },
  {
    id: 'p11', slug: 'vela-clean-leather-sneakers', title: 'Vela Clean Leather Sneakers',
    description: 'Minimal white leather sneakers with a tonal heel tab and cushioned insole. The everyday pair that goes with everything.',
    price: 50, oldPrice: 59, category: 'footwear', images: ['/products/11-1-600x600.jpg'],
    rating: 4.8, reviewCount: 140, stock: 25, sizes: SHOES,
  },
  {
    id: 'p12', slug: 'lune-ankle-strap-heels', title: 'Lune Ankle Strap Heels',
    description: 'Barely-there strappy sandals on a slim 9cm heel, with an adjustable ankle buckle. Nude tone to lengthen the leg.',
    price: 64, category: 'footwear', images: ['/products/12-1-600x600.jpg'],
    rating: 4.5, reviewCount: 38, stock: 9, sizes: SHOES,
  },
  {
    id: 'p13', slug: 'audrey-ballet-flats', title: 'Audrey Ballet Flats',
    description: 'Soft leather ballet flats with a delicate bow and a pointed toe. Flexible soles made for all-day wear.',
    price: 49, category: 'footwear', images: ['/products/19-600x600.jpg'],
    rating: 4.7, reviewCount: 66, stock: 22, sizes: SHOES,
  },
  {
    id: 'p14', slug: 'sabine-block-heel-ankle-boots', title: 'Sabine Block Heel Ankle Boots',
    description: 'Cream leather ankle boots on a stable 6cm block heel with an almond toe and inside zip.',
    price: 98, category: 'footwear', images: ['/products/25-600x600.jpg'],
    rating: 4.6, reviewCount: 34, stock: 7, sizes: SHOES, isNew: true,
  },
  {
    id: 'p15', slug: 'maren-structured-handbag', title: 'Maren Structured Handbag',
    description: 'A roomy structured tote in cognac leather with rolled top handles, gold-tone hardware and a detachable shoulder strap.',
    price: 85, category: 'bags', images: ['/products/14-1-600x600.jpg'],
    rating: 4.8, reviewCount: 49, stock: 11,
  },
  {
    id: 'p16', slug: 'odette-top-handle-bag', title: 'Odette Top Handle Bag',
    description: 'A compact top-handle bag with a polished push-lock clasp. Fits your phone, wallet and keys — and lifts every outfit.',
    price: 78, category: 'bags', images: ['/products/18-600x600.jpg'],
    rating: 4.7, reviewCount: 27, stock: 8, isNew: true,
  },
  {
    id: 'p17', slug: 'elise-saddle-crossbody-bag', title: 'Elise Saddle Crossbody Bag',
    description: 'Curved saddle bag in soft cream leather with an adjustable crossbody strap and a slim gold bar closure.',
    price: 62, category: 'bags', images: ['/products/22-600x600.jpg'],
    rating: 4.6, reviewCount: 31, stock: 13, isNew: true,
  },
  {
    id: 'p18', slug: 'sienna-wide-brim-fedora', title: 'Sienna Wide Brim Fedora',
    description: 'A wide-brim wool felt fedora in sand with a tonal grosgrain band. Sun protection with polish.',
    price: 45, category: 'hats', images: ['/products/13-1-600x600.jpg'],
    rating: 4.5, reviewCount: 19, stock: 10,
  },
  {
    id: 'p19', slug: 'remi-linen-bucket-hat', title: 'Remi Linen Bucket Hat',
    description: 'Lightweight linen-blend bucket hat with a soft, packable brim. A weekend staple.',
    price: 32, category: 'hats', images: ['/products/20-600x600.jpg'],
    rating: 4.4, reviewCount: 22, stock: 24,
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getCategory = (slug: string | undefined) => categories.find((c) => c.slug === slug);

export const isOnSale = (p: Product) => p.oldPrice !== undefined && p.oldPrice > p.price;

export const newArrivals = () => products.filter((p) => p.isNew);

export const saleProducts = () => products.filter(isOnSale);

export const relatedProducts = (product: Product, limit = 4) => {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
};

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest arrivals' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export const COLLECTIONS = { new: 'New arrivals', sale: 'On sale' } as const;
export type CollectionKey = keyof typeof COLLECTIONS;

export interface ShopQuery {
  category?: string;
  collection?: string;
  q?: string;
  sort?: string;
}

export function queryProducts({ category, collection, q, sort }: ShopQuery) {
  let list = [...products];
  if (getCategory(category)) list = list.filter((p) => p.category === category);
  if (collection === 'new') list = list.filter((p) => p.isNew);
  if (collection === 'sale') list = list.filter(isOnSale);
  const term = q?.trim().toLowerCase();
  if (term) {
    list = list.filter((p) =>
      [p.title, p.description, getCategory(p.category)?.name ?? ''].some((s) => s.toLowerCase().includes(term)),
    );
  }
  switch (sort as SortValue) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating': list.sort((a, b) => b.rating - a.rating); break;
    case 'newest': list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
  }
  return list;
}
