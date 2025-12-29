
import React from 'react';

export const metadata = {
  title: 'insighta',
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
