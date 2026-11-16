import type { Metadata } from 'next';
import InfoPage from '@/components/layout/InfoPage';
import { formatPrice, site } from '@/lib/site';

export const metadata: Metadata = { title: 'Shipping information' };

export default function ShippingPage() {
  return (
    <InfoPage
      currentHref="/shipping"
      title="Shipping information"
      intro={`Free shipping on every order over ${formatPrice(site.freeShippingThreshold)}. Orders below that ship for a flat ${formatPrice(site.shippingFee)}.`}
      sections={[
        { heading: 'Processing time', body: <p>Orders are packed and dispatched within 1–2 business days.</p> },
        { heading: 'Delivery times', body: <p>Inside Dhaka: 1–3 business days. Outside Dhaka: 3–5 business days.</p> },
        { heading: 'Tracking', body: <p>You&apos;ll receive a tracking link by email as soon as your order ships.</p> },
      ]}
    />
  );
}
