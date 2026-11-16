import type { Metadata } from 'next';
import DashboardPlaceholder from '@/components/dashboard/DashboardPlaceholder';

export const metadata: Metadata = { title: "Manage Items" };

export default function AdminItemsPage() {
  return (
    <DashboardPlaceholder title="Manage Items" description="Product management will connect to the products API in a later phase." cta={{ href: "/shop", label: "View storefront" }} />
  );
}
