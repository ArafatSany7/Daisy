export default function UserDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-secondary/30 p-6 rounded-lg border border-secondary">
           <h3 className="text-foreground/60 mb-2">Total Orders</h3>
           <div className="text-3xl font-bold">12</div>
        </div>
        <div className="bg-secondary/30 p-6 rounded-lg border border-secondary">
           <h3 className="text-foreground/60 mb-2">Wishlist</h3>
           <div className="text-3xl font-bold">5 Items</div>
        </div>
        <div className="bg-secondary/30 p-6 rounded-lg border border-secondary">
           <h3 className="text-foreground/60 mb-2">Account Status</h3>
           <div className="text-3xl font-bold text-green-500">Active</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-secondary">
              <th className="py-4 px-4 font-bold">Order ID</th>
              <th className="py-4 px-4 font-bold">Date</th>
              <th className="py-4 px-4 font-bold">Status</th>
              <th className="py-4 px-4 font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(i => (
              <tr key={i} className="border-b border-secondary/50 hover:bg-secondary/20 transition-colors">
                <td className="py-4 px-4">#ORD-2026-00{i}</td>
                <td className="py-4 px-4">Aug {10 + i}, 2026</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">
                    Delivered
                  </span>
                </td>
                <td className="py-4 px-4">৳240.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
