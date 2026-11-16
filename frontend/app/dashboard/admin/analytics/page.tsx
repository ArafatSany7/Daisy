import type { Metadata } from 'next';
import DashboardPlaceholder from '@/components/dashboard/DashboardPlaceholder';

export const metadata: Metadata = { title: "Analytics" };

export default function AdminAnalyticsPage() {
  return (
    <DashboardPlaceholder title="Analytics" description="Sales and traffic reports will appear here." cta={{ href: "/dashboard/admin", label: "Back to overview" }} />
  );
}
