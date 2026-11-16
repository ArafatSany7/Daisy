"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();

  // Demo only: real authentication will connect to the backend /api/auth endpoints.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/dashboard/user');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = () => {
    setEmail('demo@daisy.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-24 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-line">
        <h1 className="font-display text-4xl text-center mb-8">Welcome Back</h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-white border border-line rounded focus:outline-none focus:border-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-white border border-line rounded focus:outline-none focus:border-accent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded text-accent focus:ring-accent" />
              <span>Remember me</span>
            </label>
            <Link href="/contact" className="text-accent hover:underline">Forgot Password?</Link>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
           <button type="button" onClick={handleDemoLogin} className="text-sm text-muted hover:text-accent transition-colors underline">
             Use Demo Credentials
           </button>
        </div>


        <p className="mt-8 text-center text-muted">
          Don&apos;t have an account? <Link href="/register" className="text-accent font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
