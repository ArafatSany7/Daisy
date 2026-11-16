import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Package, RotateCcw, ShieldCheck } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Hero from '@/components/home/Hero';
import SectionHeader from '@/components/home/SectionHeader';
import StatCounter from '@/components/home/StatCounter';
import WhoWeAreAccordion from '@/components/home/WhoWeAreAccordion';
import ProductCard from '@/components/product/ProductCard';
import { categories, newArrivals, products, saleProducts } from '@/lib/products';
import { formatPrice, site } from '@/lib/site';

const trust = [
  { icon: Package, title: 'Free shipping', desc: `On orders over ${formatPrice(site.freeShippingThreshold)}` },
  { icon: RotateCcw, title: `${site.returnWindowDays}-day returns`, desc: 'Easy exchanges on every size' },
  { icon: ShieldCheck, title: 'Secure checkout', desc: 'Encrypted, protected payments' },
  { icon: BadgeCheck, title: 'Quality guaranteed', desc: 'Considered fabrics, built to last' },
];

const editorials = [
  {
    title: 'Soft knits, elevated',
    desc: 'Fine-gauge turtlenecks and cosy cardigans.',
    img: '/banners/banner_6.jpg',
    href: '/shop?category=knitwear',
    cta: 'Shop knitwear',
  },
  {
    title: 'Tailoring with ease',
    desc: 'Blazers, trenches and cropped jackets.',
    img: '/banners/banner_8.jpg',
    href: '/shop?category=outerwear',
    cta: 'Shop outerwear',
  },
  {
    title: 'Lines that move',
    desc: 'Pleats and wide legs, cut to move with you.',
    img: '/banners/banner_9.jpg',
    href: '/shop?category=bottoms',
    cta: 'Shop bottoms',
  },
];

const stats = [
  { value: 47, suffix: 'K+', label: 'Happy customers' },
  { value: 35, suffix: 'K+', label: 'Pieces sold' },
  { value: 4.7, suffix: '/5', decimals: 1, label: 'Average rating' },
];

// One representative product image per category for the category rail.
const categoryTiles = categories.map((c) => ({
  ...c,
  img: products.find((p) => p.category === c.slug)?.images[0],
}));

export default function Home() {
  const arrivals = newArrivals();
  const [feature, ...restArrivals] = arrivals;
  const onSale = saleProducts().slice(0, 4);

  return (
    <div className="bg-surface">
      <Hero />

      {/* Trust strip */}
      <section aria-label="Why shop with Daisy" className="border-b border-line">
        <ul className="container mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 py-8">
          {trust.map(({ icon: Icon, title, desc }) => (
            <li key={title} className="flex items-center gap-3.5">
              <span className="w-11 h-11 shrink-0 rounded-full bg-well flex items-center justify-center text-accent">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="block text-xs text-muted">{desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Category rail */}
      <section className="container mx-auto px-4 sm:px-6 pt-16 md:pt-20" aria-labelledby="cat-heading">
        <SectionHeader eyebrow="Explore" title="Shop by category" id="cat-heading" href="/shop" linkLabel="Shop all" />
        <ul className="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory">
          {categoryTiles.map((c) => (
            <li key={c.slug} className="snap-start shrink-0 w-[132px] sm:w-auto">
              <Link href={`/shop?category=${c.slug}`} className="group block text-center">
                <span className="relative block aspect-square rounded-2xl bg-well overflow-hidden mb-3">
                  {c.img && (
                    <Image
                      src={c.img}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 132px, (max-width: 1024px) 25vw, 12vw"
                      className="object-contain p-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                  )}
                </span>
                <span className="text-sm font-medium group-hover:text-accent transition-colors">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* New arrivals — bento */}
      <section className="container mx-auto px-4 sm:px-6 pt-20 md:pt-28" aria-labelledby="new-heading">
        <SectionHeader
          eyebrow="Just landed"
          title="New arrivals"
          id="new-heading"
          href="/shop?collection=new"
          linkLabel={`View all ${arrivals.length}`}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {feature && (
            <FadeIn className="col-span-2 lg:row-span-2 flex flex-col">
              <ProductCard product={feature} variant="feature" />
            </FadeIn>
          )}
          {restArrivals.slice(0, 4).map((p, i) => (
            <FadeIn key={p.id} delay={0.05 * (i + 1)}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="container mx-auto px-4 sm:px-6 pt-20 md:pt-28" aria-label="Featured edits">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {editorials.map((card, i) => (
            <FadeIn key={card.href} delay={0.08 * i}>
              <Link href={card.href} className="group relative block aspect-[3/4] rounded-3xl overflow-hidden bg-well">
                <Image
                  src={card.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
                  <h3 className="font-display text-2xl md:text-[28px] text-white mb-1.5">{card.title}</h3>
                  <p className="text-sm text-white/80 mb-4">{card.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                    {card.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* On sale */}
      <section className="container mx-auto px-4 sm:px-6 pt-20 md:pt-28" aria-labelledby="sale-heading">
        <SectionHeader
          eyebrow="Limited time"
          title="On sale now"
          id="sale-heading"
          href="/shop?collection=sale"
          linkLabel="Shop the sale"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {onSale.map((p, i) => (
            <FadeIn key={p.id} delay={0.05 * i}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 sm:px-6 py-20 md:py-28" aria-labelledby="story-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden bg-well">
            <Image
              src="/images/who-we-are.jpg"
              alt="Model wearing a cornflower-blue turtleneck and charcoal trousers"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Who we are</p>
            <h2 id="story-heading" className="font-display text-4xl md:text-5xl mb-6">
              Driven by craftsmanship,
              <br className="hidden md:block" /> inspired by your moments
            </h2>
            <p className="text-muted text-lg mb-8 max-w-xl">
              Daisy began with a simple idea: well-made pieces should be easy to find and easy to love. Every
              collection is designed in small runs, with fabrics and finishes chosen to last.
            </p>
            <div className="max-w-xl mb-10">
              <WhoWeAreAccordion />
            </div>
            <dl className="grid grid-cols-3 gap-4 max-w-xl border-t border-line pt-8 mb-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs text-muted mb-1">{s.label}</dt>
                  <dd className="font-display text-3xl md:text-4xl">
                    <StatCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/about" className="btn btn-outline">
              Our story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
