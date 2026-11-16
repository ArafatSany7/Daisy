import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/layout/InfoPage';
import { formatPrice, site } from '@/lib/site';

export const metadata: Metadata = { title: 'Help center' };

const sizeRows = [
  ['XS', '80–84', '62–66', '86–90'],
  ['S', '84–88', '66–70', '90–94'],
  ['M', '88–92', '70–74', '94–98'],
  ['L', '92–98', '74–80', '98–104'],
  ['XL', '98–104', '80–86', '104–110'],
];

export default function HelpPage() {
  return (
    <InfoPage
      currentHref="/help"
      title="Help center"
      intro="Answers to the questions we hear most. Can't find what you need? Our team is happy to help."
      sections={[
        {
          heading: 'Orders & delivery',
          body: (
            <p>
              Orders over {formatPrice(site.freeShippingThreshold)} ship free. See{' '}
              <Link href="/shipping" className="underline hover:text-primary">shipping information</Link> for delivery times, or{' '}
              <Link href="/track-order" className="underline hover:text-primary">track your order</Link>.
            </p>
          ),
        },
        {
          heading: 'Returns & exchanges',
          body: (
            <p>
              You can return unworn items within {site.returnWindowDays} days. Read our{' '}
              <Link href="/returns" className="underline hover:text-primary">returns policy</Link> for details.
            </p>
          ),
        },
        {
          id: 'sizing',
          heading: 'Size guide',
          body: (
            <>
              <p>Our apparel runs true to size. If you&apos;re between sizes, we recommend sizing up for a relaxed fit.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-100 mt-2">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Size', 'Bust (cm)', 'Waist (cm)', 'Hip (cm)'].map((h) => (
                        <th key={h} className="text-left px-4 py-2 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sizeRows.map((row) => (
                      <tr key={row[0]} className="border-t border-gray-100">
                        {row.map((cell) => (
                          <td key={cell} className="px-4 py-2">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>Footwear uses EU sizing (36–41).</p>
            </>
          ),
        },
        {
          heading: 'Payments',
          body: (
            <p>
              See <Link href="/payment-methods" className="underline hover:text-primary">payment methods</Link> for the
              options we accept.
            </p>
          ),
        },
      ]}
    />
  );
}
