import type { Metadata } from 'next';
import InfoPage from '@/components/layout/InfoPage';

export const metadata: Metadata = { title: 'Cookie policy' };

export default function CookiesPage() {
  return (
    <InfoPage
      currentHref="/cookies"
      title="Cookie policy"
      intro="We use a small amount of browser storage to make the site work."
      sections={[
        { heading: 'Essential storage', body: <p>Your shopping cart is saved in your browser so it&apos;s still there when you come back.</p> },
        { heading: 'Managing cookies', body: <p>You can clear cookies and site data from your browser settings at any time. Doing so will empty your cart.</p> },
      ]}
    />
  );
}
