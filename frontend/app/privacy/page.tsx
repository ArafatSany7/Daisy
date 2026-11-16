import type { Metadata } from 'next';
import InfoPage from '@/components/layout/InfoPage';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function PrivacyPage() {
  return (
    <InfoPage
      currentHref="/privacy"
      title="Privacy policy"
      intro="This policy explains what information we collect when you shop with Daisy and how we use it."
      sections={[
        { heading: 'Information we collect', body: <p>Contact and delivery details you give us at checkout, and basic usage data that helps us improve the site.</p> },
        { heading: 'How we use it', body: <p>To process and deliver your orders, provide customer support and, only if you opt in, send our newsletter.</p> },
        { heading: 'Your choices', body: <p>You can ask us to access, correct or delete your data at any time by emailing {site.email}.</p> },
      ]}
    />
  );
}
