import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'http://insightabusiness.com';
  
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

