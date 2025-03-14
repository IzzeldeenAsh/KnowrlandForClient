import type {NextConfig} from 'next';
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
const nextConfig:NextConfig = {
  output: 'standalone',
  images:{
    domains: ['res.cloudinary.com','4sighta-common.s3.eu-north-1.amazonaws.com'], 
  },
  async rewrites() {
    return [
      // Handle the problematic route explicitly 
      {
        source: '/en/filter-knowledges/topic/139/insight',
        destination: '/en/filter-knowledges/topic/139/insight',
      },
      // More general handling for topic routes
      {
        source: '/:locale/filter-knowledges/topic/:id/:type',
        destination: '/:locale/filter-knowledges/topic/:id/:type',
      },
      // Handle other taxonomies
      {
        source: '/:locale/filter-knowledges/industry/:id/:type',
        destination: '/:locale/filter-knowledges/industry/:id/:type',
      },
      {
        source: '/:locale/filter-knowledges/sub_industry/:id/:type',
        destination: '/:locale/filter-knowledges/sub_industry/:id/:type',
      }
    ];
  },
};
 
module.exports = withNextIntl(nextConfig);
