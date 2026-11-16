export const site = {
  name: 'Daisy',
  description: 'Timeless womenswear, footwear and accessories — thoughtfully made, delivered across Bangladesh.',
  email: 'support@daisy.com',
  phone: '+880 1711-000000',
  address: 'Gulshan, Dhaka 1212, Bangladesh',
  currency: '৳',
  freeShippingThreshold: 150,
  shippingFee: 10,
  returnWindowDays: 30,
  // Add a URL to show the icon in the footer. Empty entries are hidden.
  socials: {
    facebook: '',
    instagram: '',
    tiktok: '',
    x: '',
    youtube: '',
  },
} as const;

export const phoneHref = `tel:${site.phone.replace(/[^+\d]/g, '')}`;

export const formatPrice = (value: number) => `${site.currency}${value.toLocaleString('en-US')}`;

export const shippingFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;

export const footerNav = {
  account: [
    { label: 'My account', href: '/dashboard/user' },
    { label: 'Order history', href: '/dashboard/user/orders' },
    { label: 'Wishlist', href: '/dashboard/user/wishlist' },
    { label: 'Saved addresses', href: '/dashboard/user/addresses' },
    { label: 'Newsletter preferences', href: '/dashboard/user/profile#newsletter' },
  ],
  care: [
    { label: 'Help center', href: '/help' },
    { label: 'Shipping information', href: '/shipping' },
    { label: 'Returns & refunds', href: '/returns' },
    { label: 'Track your order', href: '/track-order' },
    { label: 'Payment methods', href: '/payment-methods' },
  ],
  legal: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Cookie policy', href: '/cookies' },
    { label: 'Terms and conditions', href: '/terms' },
  ],
};

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact Us', href: '/contact' },
];
