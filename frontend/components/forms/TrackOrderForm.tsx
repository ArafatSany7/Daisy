"use client";

import { useState } from 'react';
import Link from 'next/link';

const inputClass = 'w-full px-4 py-3 bg-white border border-gray-200 text-sm focus:outline-none focus:border-primary';

export default function TrackOrderForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: look the order up via the backend once the orders API exists.
    setSubmitted(true);
  };

  return (
    <div className="max-w-md">
      <form onSubmit={onSubmit} className="space-y-4">
        <input className={inputClass} name="order" placeholder="Order number (e.g. DSY-123456)" aria-label="Order number" required />
        <input className={inputClass} type="email" name="email" placeholder="Email" aria-label="Email" required />
        <button type="submit" className="w-full bg-[#2A2A2A] text-white py-3 font-bold text-sm hover:bg-primary transition-colors">
          Track order
        </button>
      </form>
      {submitted && (
        <p role="status" className="mt-6 text-sm text-gray-600 bg-gray-50 p-4">
          Online tracking isn&apos;t available yet. Please use the tracking link in your shipping email, or{' '}
          <Link href="/contact" className="underline text-primary">contact us</Link> with your order number.
        </p>
      )}
    </div>
  );
}
