import type { Metadata } from 'next';
import InfoPage from '@/components/layout/InfoPage';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Returns & refunds' };

export default function ReturnsPage() {
  return (
    <InfoPage
      currentHref="/returns"
      title="Returns & refunds"
      intro={`Not quite right? Return unworn items with their tags attached within ${site.returnWindowDays} days of delivery.`}
      sections={[
        { heading: 'How to return', body: <p>Contact our team with your order number and we&apos;ll arrange a pickup or drop-off.</p> },
        { heading: 'Refunds', body: <p>Refunds are issued to your original payment method within 5–7 business days of us receiving your return.</p> },
        { heading: 'Exchanges', body: <p>Need a different size? We&apos;ll swap it free of charge, subject to availability.</p> },
        { heading: 'Non-returnable items', body: <p>Items marked final sale cannot be returned.</p> },
      ]}
    />
  );
}
