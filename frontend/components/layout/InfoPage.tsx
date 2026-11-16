import Link from 'next/link';
import { footerNav } from '@/lib/site';

export interface InfoSection {
  id?: string;
  heading: string;
  body: React.ReactNode;
}

const sideLinks = [...footerNav.care, ...footerNav.legal];

export default function InfoPage({
  title,
  intro,
  sections,
  children,
  currentHref,
}: {
  title: string;
  intro?: string;
  sections?: InfoSection[];
  children?: React.ReactNode;
  currentHref: string;
}) {
  return (
    <div className="bg-white pb-24">
      <div className="border-b border-gray-100 py-4">
        <nav className="container mx-auto px-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900">{title}</span>
        </nav>
      </div>
      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-6xl">
        <aside className="hidden lg:block">
          <nav className="sticky top-32 space-y-1 text-sm" aria-label="Help topics">
            {sideLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={l.href === currentHref ? 'page' : undefined}
                className={`block px-4 py-2 transition-colors ${
                  l.href === currentHref ? 'bg-gray-100 font-bold text-gray-900' : 'text-gray-600 hover:text-primary'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="lg:col-span-3 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {intro && <p className="text-gray-600 leading-relaxed mb-10">{intro}</p>}
          {sections?.map((s) => (
            <section key={s.heading} id={s.id} className="mb-10 scroll-mt-32">
              <h2 className="text-xl font-bold mb-3">{s.heading}</h2>
              <div className="text-gray-600 leading-relaxed space-y-3 text-[15px]">{s.body}</div>
            </section>
          ))}
          {children}
          <p className="mt-12 text-sm text-gray-500 border-t border-gray-100 pt-6">
            Still need help? <Link href="/contact" className="text-primary font-bold hover:underline">Contact our team</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
