import type { Metadata } from 'next';
import DashboardPlaceholder from '@/components/dashboard/DashboardPlaceholder';

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <DashboardPlaceholder title="Wishlist" description="Save the pieces you love and find them here later." />
  );
}
