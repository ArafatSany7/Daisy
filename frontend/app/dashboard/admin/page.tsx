import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-4xl mb-8">Admin Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-line">
           <h3 className="text-muted mb-2">Total Revenue</h3>
           <div className="text-3xl font-bold">৳124,500</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-line">
           <h3 className="text-muted mb-2">Total Users</h3>
           <div className="text-3xl font-bold">1,245</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-line">
           <h3 className="text-muted mb-2">Active Products</h3>
           <div className="text-3xl font-bold">342</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-line">
           <h3 className="text-muted mb-2">Pending Orders</h3>
           <div className="text-3xl font-bold text-accent">18</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-line">
          <h2 className="text-xl font-bold mb-6">Sales Analytics</h2>
          {/* Mock Chart Area */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="w-full bg-primary/20 hover:bg-accent/60 transition-colors rounded-t" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-muted">
             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-line">
          <h2 className="text-xl font-bold mb-6">Top Categories</h2>
          <div className="space-y-4">
             <div>
               <div className="flex justify-between mb-1">
                 <span>Men&apos;s Wear</span>
                 <span className="font-bold">45%</span>
               </div>
               <div className="w-full bg-well rounded-full h-2">
                 <div className="bg-accent h-2 rounded-full" style={{ width: '45%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between mb-1">
                 <span>Women&apos;s Wear</span>
                 <span className="font-bold">35%</span>
               </div>
               <div className="w-full bg-well rounded-full h-2">
                 <div className="bg-accent h-2 rounded-full" style={{ width: '35%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between mb-1">
                 <span>Accessories</span>
                 <span className="font-bold">20%</span>
               </div>
               <div className="w-full bg-well rounded-full h-2">
                 <div className="bg-accent h-2 rounded-full" style={{ width: '20%' }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line">
              <th className="py-4 px-4 font-bold">Customer</th>
              <th className="py-4 px-4 font-bold">Amount</th>
              <th className="py-4 px-4 font-bold">Status</th>
              <th className="py-4 px-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="border-b border-line hover:bg-white transition-colors">
                <td className="py-4 px-4">Customer {i}</td>
                <td className="py-4 px-4">৳{(i * 150).toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${i % 2 === 0 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {i % 2 === 0 ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Link href="/dashboard/admin/users" className="text-accent hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm">
        <Link href="/dashboard/admin/analytics" className="text-accent font-bold hover:underline">
          View all transactions &rarr;
        </Link>
      </div>
    </div>
  );
}
