import type { Metadata } from 'next';
import InfoPage from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Payment methods' };

export default function PaymentMethodsPage() {
  return (
    <InfoPage
      currentHref="/payment-methods"
      title="Payment methods"
      intro="Pay securely with the method that suits you."
      sections={[
        { heading: 'Cards', body: <p>We accept Visa, Mastercard, American Express and Discover, processed through Stripe.</p> },
        { heading: 'Security', body: <p>Payments are processed over an encrypted connection. We never store your full card details.</p> },
      ]}
    />
  );
}
