import type { Metadata } from 'next';
import DashboardPlaceholder from '@/components/dashboard/DashboardPlaceholder';

export const metadata: Metadata = { title: "My Orders" };

export default function OrdersPage() {
  return (
    <DashboardPlaceholder title="My Orders" description="Your order history will appear here once accounts are connected." />
  );
}
