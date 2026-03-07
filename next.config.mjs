/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'graph.facebook.com', 'www.hirenup.com', 'hirenup.com', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  // Disable build cache to prevent stale server actions
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Production domain configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

