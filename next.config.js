const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  eslint: {
    // Local env has an old ESLint install; don't block production builds on it.
    // Run `npm run lint` separately once ESLint is upgraded.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      '4sighta-common.s3.eu-north-1.amazonaws.com',
      'knoldg-common.s3.us-east-1.amazonaws.com'
    ],
  },
  reactStrictMode: false,
  // Avoid Next inferring a higher "workspace root" (multiple lockfiles)
  outputFileTracingRoot: __dirname,
  async headers() {
    return [
      {
        source: "/(.*)", // all routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://api.foresighta.co https://api.foresighta.com https://api.stripe.com https://*.pusher.com wss://*.pusher.com https://sockjs-eu.pusher.com",
              "frame-src https://js.stripe.com https://hooks.stripe.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; ')
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains"
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
