/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wzeqlkbmqxlsjryidagf.supabase.co",
        pathname: "/storage/v1/object/public/marketing-assets/**"
      }
    ]
  }
};

module.exports = nextConfig;
