import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't let `next dev` generate AGENTS.md / CLAUDE.md in the project.
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Legacy catalog routes now live under /shop and /product.
      { source: '/items', destination: '/shop', permanent: true },
      { source: '/items/:slug', destination: '/product/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
