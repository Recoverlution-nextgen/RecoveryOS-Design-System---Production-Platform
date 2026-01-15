/** @type {import('next').NextConfig} */
const nextConfig = {
  // RecoveryOS Design System Configuration
  experimental: {
    // Enable experimental features if needed
  },
  // Asset optimization for therapeutic content
  images: {
    domains: ['localhost'], // Add your asset domains
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Environment variables
  env: {
    // Add your environment variables
  }
}

module.exports = nextConfig