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
    <div className="bg-surface pb-24">
      <div className="border-b border-line py-4">
        <nav className="container mx-auto px-6 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-ink">{title}</span>
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
                className={`block px-4 py-2.5 rounded-full transition-colors ${
                  l.href === currentHref ? 'bg-well font-bold text-ink' : 'text-muted hover:text-accent'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="lg:col-span-3 max-w-3xl">
          <h1 className="font-display text-4xl mb-4">{title}</h1>
          {intro && <p className="text-muted leading-relaxed mb-10">{intro}</p>}
          {sections?.map((s) => (
            <section key={s.heading} id={s.id} className="mb-10 scroll-mt-32">
              <h2 className="font-display text-2xl mb-3">{s.heading}</h2>
              <div className="text-muted leading-relaxed space-y-3 text-[15px]">{s.body}</div>
            </section>
          ))}
          {children}
          <p className="mt-12 text-sm text-muted border-t border-line pt-6">
            Still need help? <Link href="/contact" className="text-accent font-semibold hover:underline">Contact our team</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
