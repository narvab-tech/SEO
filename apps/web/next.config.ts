import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Handle monorepo setup
  experimental: {
    // Other experimental features can go here
  },
  
  // External packages for server-side rendering
  serverExternalPackages: [],
  
  // Set output file tracing root to silence warnings
  outputFileTracingRoot: process.env.NODE_ENV === 'production' ? undefined : '../../',
  
  // Transpile internal packages
  transpilePackages: [
    '@seo-tool/ui',
    '@seo-tool/database', 
    '@seo-tool/seo-utils'
  ],
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  }
};

export default nextConfig;
