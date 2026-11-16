"use client";

import { useState } from 'react';
import { Check, Mail } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: connect to the newsletter provider / backend endpoint.
    setDone(true);
    setEmail('');
  };

  if (done) {
    return (
      <p role="status" className="flex items-center text-[13px] text-white">
        <Check size={16} className="mr-2 text-[#7596B8]" /> Thanks! You&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        aria-label="Email address"
        className="bg-[#2A2A2A] text-white px-4 py-3 text-[13px] border border-[#333] focus:border-[#7596B8] outline-none w-full placeholder-gray-500"
      />
      <button
        type="submit"
        className="bg-[#7596B8] text-white font-medium py-3 px-4 text-[13px] hover:bg-white hover:text-[#7596B8] transition-colors flex items-center justify-center w-full"
      >
        <Mail size={14} className="mr-2" strokeWidth={1.5} /> Sign up for the newsletter
      </button>
    </form>
  );
}
