
import type {NextConfig} from 'next';
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig:NextConfig = {
images:{
domains: ['res.cloudinary.com','4sighta-common.s3.eu-north-1.amazonaws.com'],
}
};

module.exports = withNextIntl(nextConfig);
