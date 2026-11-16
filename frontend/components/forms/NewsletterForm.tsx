"use client";

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

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
      <p role="status" className="flex items-center gap-2 h-12 text-sm text-white">
        <Check size={18} className="text-[#8FB3DD]" /> Thanks — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoComplete="email"
        className="flex-1 min-w-0 h-12 px-5 rounded-full bg-white/10 text-white text-sm placeholder:text-white/50 border border-white/15 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors"
      />
      <button type="submit" className="btn btn-light h-12 px-5 shrink-0" aria-label="Subscribe">
        Subscribe <ArrowRight size={16} className="hidden sm:block" />
      </button>
    </form>
  );
}
