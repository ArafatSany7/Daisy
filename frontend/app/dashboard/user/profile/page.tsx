import type { Metadata } from 'next';
import DashboardPlaceholder from '@/components/dashboard/DashboardPlaceholder';
import NewsletterForm from '@/components/forms/NewsletterForm';

export const metadata: Metadata = { title: "Profile Settings" };

export default function ProfilePage() {
  return (
    <DashboardPlaceholder title="Profile Settings" description="Update your name, email and password once accounts are connected.">
      <section id="newsletter" className="mt-10 scroll-mt-32">
        <h2 className="text-xl font-bold mb-2">Newsletter preferences</h2>
        <p className="text-muted text-sm mb-4">Get new arrivals and exclusive offers in your inbox.</p>
        <div className="max-w-sm bg-ink rounded-2xl p-6">
          <NewsletterForm />
        </div>
      </section>
    </DashboardPlaceholder>
  );
}
