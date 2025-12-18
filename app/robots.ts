import { MetadataRoute } from 'next';
import { publicBaseUrl } from './config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = publicBaseUrl;
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/callback/',
          '/checkout/',
          '/payment/',
          '/profile/',
          '/signout/',
          '/update-country/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/callback/',
          '/checkout/',
          '/payment/',
          '/profile/',
          '/signout/',
          '/update-country/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

