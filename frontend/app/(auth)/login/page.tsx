"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = () => {
    setEmail('demo@bhuselle.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-24 px-6">
      <div className="w-full max-w-md bg-secondary/30 p-8 rounded-lg border border-secondary">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
        
        <form className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-background border border-secondary rounded focus:outline-none focus:border-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-background border border-secondary rounded focus:outline-none focus:border-accent"
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
            <a href="#" className="text-accent hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full bg-primary text-background py-3 rounded-full font-bold hover:bg-accent hover:text-primary transition-all">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
           <button onClick={handleDemoLogin} className="text-sm text-foreground/60 hover:text-primary transition-colors underline">
             Use Demo Credentials
           </button>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-4">
          <div className="h-px bg-secondary flex-1"></div>
          <span className="text-foreground/50 text-sm">Or continue with</span>
          <div className="h-px bg-secondary flex-1"></div>
        </div>

        <div className="mt-8 flex space-x-4">
          <button className="flex-1 py-3 border border-secondary rounded flex items-center justify-center space-x-2 hover:bg-secondary transition-colors">
             <span>Google</span>
          </button>
          <button className="flex-1 py-3 border border-secondary rounded flex items-center justify-center space-x-2 hover:bg-secondary transition-colors">
             <span>Facebook</span>
          </button>
        </div>

        <p className="mt-8 text-center text-foreground/70">
          Don't have an account? <Link href="/register" className="text-accent font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
