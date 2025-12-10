import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Insighta Business - Buy & Sell Insights',
    short_name: 'Insighta',
    description: 'Platform for buying and selling insight resources, insights and expertise',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'education', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  };
}




