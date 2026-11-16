import type { Metadata } from 'next';
import Link from 'next/link';
import InfoPage from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Terms and conditions' };

export default function TermsPage() {
  return (
    <InfoPage
      currentHref="/terms"
      title="Terms and conditions"
      intro="By using this website and placing an order, you agree to the terms below."
      sections={[
        { heading: 'Orders', body: <p>All orders are subject to availability and confirmation of the order price.</p> },
        { heading: 'Pricing', body: <p>Prices are shown in Bangladeshi Taka (৳). The price charged is the one shown at checkout.</p> },
        {
          heading: 'Returns',
          body: (
            <p>
              Returns are handled under our <Link href="/returns" className="underline hover:text-primary">returns policy</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
