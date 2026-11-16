import type { Metadata } from 'next';
import InfoPage from '@/components/layout/InfoPage';
import TrackOrderForm from '@/components/forms/TrackOrderForm';

export const metadata: Metadata = { title: 'Track your order' };

export default function TrackOrderPage() {
  return (
    <InfoPage
      currentHref="/track-order"
      title="Track your order"
      intro="Enter your order number and the email you used at checkout."
    >
      <TrackOrderForm />
    </InfoPage>
  );
}
