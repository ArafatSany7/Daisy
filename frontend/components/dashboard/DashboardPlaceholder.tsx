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
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="bg-gray-50 border border-gray-100 p-10 text-center">
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
        <Link
          href={cta.href}
          className="inline-block bg-primary text-white px-6 py-3 font-bold text-sm hover:bg-primary/90 transition-colors"
        >
          {cta.label}
        </Link>
      </div>
      {children}
    </div>
  );
}
