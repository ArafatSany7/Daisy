"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  // Demo only: real authentication will connect to the backend /api/auth endpoints.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/dashboard/user');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-24 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-line">
        <h1 className="font-display text-4xl text-center mb-8">Create Account</h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-white border border-line rounded focus:outline-none focus:border-accent"
              required
            />
          </div>
          
          <div>
            <label className="block font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-white border border-line rounded focus:outline-none focus:border-accent"
              required
            />
          </div>
          
          <div>
            <label className="block font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-white border border-line rounded focus:outline-none focus:border-accent"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>


        <p className="mt-8 text-center text-muted">
          Already have an account? <Link href="/login" className="text-accent font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
