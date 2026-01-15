import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // RecoveryOS Design System Configuration
  experimental: {
    // Enable experimental features if needed
  },
  // Asset optimization for therapeutic content
  images: {
    domains: ['localhost'], // Add your asset domains
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Performance optimizations
  swcMinify: true,
  // Environment variables
  env: {
    // Add your environment variables
  }
}

export default nextConfig