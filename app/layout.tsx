
import React from 'react';

export const metadata = {
  title: 'insighta',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // Add meta tag for apple-mobile-web-app-title
  other: [
    {
      name: 'apple-mobile-web-app-title',
      content: 'insighta'
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
