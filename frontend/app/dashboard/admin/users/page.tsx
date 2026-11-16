import type { Metadata } from 'next';
import DashboardPlaceholder from '@/components/dashboard/DashboardPlaceholder';

export const metadata: Metadata = { title: "Manage Users" };

export default function AdminUsersPage() {
  return (
    <DashboardPlaceholder title="Manage Users" description="User management will connect to the users API in a later phase." cta={{ href: "/dashboard/admin", label: "Back to overview" }} />
  );
}
