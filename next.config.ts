import type { NextConfig } from 'next';
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      '4sighta-common.s3.eu-north-1.amazonaws.com'
    ],
  },
  // Add these settings for better dynamic route handling
  output: 'standalone',
  // This helps with dynamic routes in production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },
  experimental: {
    // Only include supported experimental features
    serverComponentsExternalPackages: [],
  },
  // Enable proper trailing slashes handling
  trailingSlash: true,
};

module.exports = withNextIntl(nextConfig);
