const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      '4sighta-common.s3.eu-north-1.amazonaws.com',
      'knoldg-common.s3.us-east-1.amazonaws.com'
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // all routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
