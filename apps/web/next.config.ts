import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Handle monorepo setup
  experimental: {
    // Enable React compiler for better performance
    reactCompiler: false, // Keep disabled for stability
    // Other experimental features can go here
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
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
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
};

export default nextConfig;
