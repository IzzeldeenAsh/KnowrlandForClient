const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl({
  // ... other config options
  
  // Server external packages config (newer syntax)
  serverExternalPackages: [],
  
  images: {
    domains: ['res.cloudinary.com', '4sighta-common.s3.eu-north-1.amazonaws.com'],
  },
  
  // Enable proper trailing slashes handling
  trailingSlash: true,
  
  // Output as standalone for better dynamic route handling
  output: 'standalone'
}); 