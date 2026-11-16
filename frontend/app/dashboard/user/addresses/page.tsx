import type { Metadata } from 'next';
import DashboardPlaceholder from '@/components/dashboard/DashboardPlaceholder';

export const metadata: Metadata = { title: "Saved Addresses" };

export default function AddressesPage() {
  return (
    <DashboardPlaceholder title="Saved Addresses" description="Addresses you save at checkout will appear here for faster ordering." />
  );
}
