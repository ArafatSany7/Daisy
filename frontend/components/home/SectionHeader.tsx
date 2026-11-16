import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
  id,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  linkLabel?: string;
  id?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="font-display text-3xl md:text-4xl">
          {title}
        </h2>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="group shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent transition-colors"
        >
          {linkLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
