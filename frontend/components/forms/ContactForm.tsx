"use client";

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const inputClass =
  'w-full px-4 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-accent shadow-sm';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: send to the backend / email service.
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="text-center py-12">
        <CheckCircle2 size={48} className="mx-auto text-[#28A745] mb-4" />
        <h3 className="text-2xl font-bold mb-2">Message sent</h3>
        <p className="text-foreground/70 mb-6">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
        <button type="button" onClick={() => setSent(false)} className="text-sm underline hover:text-primary">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block font-medium mb-2">First Name</label>
          <input id="firstName" name="firstName" type="text" autoComplete="given-name" className={inputClass} required />
        </div>
        <div>
          <label htmlFor="lastName" className="block font-medium mb-2">Last Name</label>
          <input id="lastName" name="lastName" type="text" autoComplete="family-name" className={inputClass} required />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block font-medium mb-2">Email Address</label>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} required />
      </div>
      <div>
        <label htmlFor="message" className="block font-medium mb-2">Message</label>
        <textarea id="message" name="message" rows={5} className={inputClass} required></textarea>
      </div>
      <button type="submit" className="w-full bg-primary text-background py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all">
        Send Message
      </button>
    </form>
  );
}
