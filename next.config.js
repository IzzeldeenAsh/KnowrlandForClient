const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();


const nextConfig = {
  images:{
    domains: ['res.cloudinary.com','4sighta-common.s3.eu-north-1.amazonaws.com','knoldg-common.s3.us-east-1.amazonaws.com'],
  }
};

module.exports = withNextIntl(nextConfig); 
