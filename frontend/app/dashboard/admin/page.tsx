"use client";

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-secondary/30 p-6 rounded-lg border border-secondary">
           <h3 className="text-foreground/60 mb-2">Total Revenue</h3>
           <div className="text-3xl font-bold">৳124,500</div>
        </div>
        <div className="bg-secondary/30 p-6 rounded-lg border border-secondary">
           <h3 className="text-foreground/60 mb-2">Total Users</h3>
           <div className="text-3xl font-bold">1,245</div>
        </div>
        <div className="bg-secondary/30 p-6 rounded-lg border border-secondary">
           <h3 className="text-foreground/60 mb-2">Active Products</h3>
           <div className="text-3xl font-bold">342</div>
        </div>
        <div className="bg-secondary/30 p-6 rounded-lg border border-secondary">
           <h3 className="text-foreground/60 mb-2">Pending Orders</h3>
           <div className="text-3xl font-bold text-accent">18</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-secondary/10 p-6 rounded-lg border border-secondary">
          <h2 className="text-xl font-bold mb-6">Sales Analytics</h2>
          {/* Mock Chart Area */}
          <div className="h-64 flex items-end justify-between space-x-2">
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="w-full bg-primary/20 hover:bg-accent transition-colors rounded-t" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-foreground/50">
             <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
        
        <div className="bg-secondary/10 p-6 rounded-lg border border-secondary">
          <h2 className="text-xl font-bold mb-6">Top Categories</h2>
          <div className="space-y-4">
             <div>
               <div className="flex justify-between mb-1">
                 <span>Men's Wear</span>
                 <span className="font-bold">45%</span>
               </div>
               <div className="w-full bg-secondary rounded-full h-2">
                 <div className="bg-accent h-2 rounded-full" style={{ width: '45%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between mb-1">
                 <span>Women's Wear</span>
                 <span className="font-bold">35%</span>
               </div>
               <div className="w-full bg-secondary rounded-full h-2">
                 <div className="bg-accent h-2 rounded-full" style={{ width: '35%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between mb-1">
                 <span>Accessories</span>
                 <span className="font-bold">20%</span>
               </div>
               <div className="w-full bg-secondary rounded-full h-2">
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
            <tr className="border-b border-secondary">
              <th className="py-4 px-4 font-bold">Customer</th>
              <th className="py-4 px-4 font-bold">Amount</th>
              <th className="py-4 px-4 font-bold">Status</th>
              <th className="py-4 px-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="border-b border-secondary/50 hover:bg-secondary/20 transition-colors">
                <td className="py-4 px-4">Customer {i}</td>
                <td className="py-4 px-4">৳{(i * 150).toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${i % 2 === 0 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {i % 2 === 0 ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-accent hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination component for the table */}
      <div className="flex justify-between items-center mt-6 text-sm text-foreground/60">
         <div>Showing 1 to 5 of 124 entries</div>
         <div className="flex space-x-2">
           <button className="px-3 py-1 border border-secondary rounded hover:bg-primary hover:text-background">Previous</button>
           <button className="px-3 py-1 border border-secondary rounded hover:bg-primary hover:text-background">Next</button>
         </div>
      </div>
    </div>
  );
}
