import Link from 'next/link';

export default function DashboardPlaceholder({
  title,
  description,
  cta = { href: '/shop', label: 'Continue shopping' },
  children,
}: {
  title: string;
  description: string;
  cta?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-4xl mb-8">{title}</h1>
      <div className="bg-well rounded-3xl p-10 text-center">
        <p className="text-muted mb-6 max-w-md mx-auto">{description}</p>
        <Link
          href={cta.href}
          className="btn btn-primary"
        >
          {cta.label}
        </Link>
      </div>
      {children}
    </div>
  );
}
