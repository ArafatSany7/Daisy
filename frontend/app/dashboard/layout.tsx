import DashboardNav from '@/components/dashboard/DashboardNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-12 pb-12 bg-background flex flex-col md:flex-row container mx-auto px-6">
      <aside className="w-full md:w-64 flex-shrink-0 md:pr-8 md:border-r border-gray-100 md:mr-8 mb-8 md:mb-0">
        <div className="md:sticky md:top-32">
          <div className="mb-4">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-xl font-bold mb-4">
              U
            </div>
            <h2 className="font-bold text-xl">User Profile</h2>
            <p className="text-foreground/60 text-sm">Demo account</p>
          </div>
          <DashboardNav />
        </div>
      </aside>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
