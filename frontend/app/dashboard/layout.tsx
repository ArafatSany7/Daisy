import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-background flex container mx-auto px-6">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 pr-8 hidden md:block border-r border-secondary mr-8">
        <div className="sticky top-32">
          <div className="mb-8">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-xl font-bold mb-4">
              U
            </div>
            <h2 className="font-bold text-xl">User Profile</h2>
            <p className="text-foreground/60 text-sm">demo@bhuselle.com</p>
          </div>

          <nav className="space-y-2">
            <div className="text-xs font-bold text-accent uppercase tracking-wider mb-4 mt-8">User Menu</div>
            <Link href="/dashboard/user" className="block px-4 py-2 rounded hover:bg-secondary transition-colors">Overview</Link>
            <Link href="/dashboard/user/orders" className="block px-4 py-2 rounded hover:bg-secondary transition-colors">My Orders</Link>
            <Link href="/dashboard/user/profile" className="block px-4 py-2 rounded hover:bg-secondary transition-colors">Profile Settings</Link>
            
            <div className="text-xs font-bold text-accent uppercase tracking-wider mb-4 mt-8 pt-4 border-t border-secondary">Admin Menu</div>
            <Link href="/dashboard/admin" className="block px-4 py-2 rounded hover:bg-secondary transition-colors">Admin Overview</Link>
            <Link href="/dashboard/admin/items" className="block px-4 py-2 rounded hover:bg-secondary transition-colors">Manage Items</Link>
            <Link href="/dashboard/admin/users" className="block px-4 py-2 rounded hover:bg-secondary transition-colors">Manage Users</Link>
            <Link href="/dashboard/admin/analytics" className="block px-4 py-2 rounded hover:bg-secondary transition-colors">Analytics</Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
