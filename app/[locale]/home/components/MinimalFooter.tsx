'use client'

import React from 'react';
import Link from 'next/link';

interface MinimalFooterProps {
  locale: string;
}

const MinimalFooter: React.FC<MinimalFooterProps> = ({ locale }) => {
  const isRTL = locale === 'ar';

  const leftLinks = [
    { href: `/${locale}/about`, label: isRTL ? 'من نحن' : 'About' },
    { href: `/${locale}/all-industries`, label: isRTL ? 'الصناعات' : 'Industries' },
    { href: `/${locale}/contact`, label: isRTL ? 'تواصل معنا' : 'Contact' },
  ];

  const rightLinks = [
    { href: `/${locale}/legals/privacy`, label: isRTL ? 'الخصوصية' : 'Privacy' },
    { href: `/${locale}/legals/terms`, label: isRTL ? 'الشروط' : 'Terms' },
    { href: `/${locale}/legals/cookies`, label: isRTL ? 'ملفات تعريف الارتباط' : 'Cookies' },
  ];

  return (
    <footer className="mt-auto bg-[rgb(224,237,250)] text-sm text-gray-600" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col items-center gap-3 px-6 py-3 sm:flex-row sm:justify-between">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
          {leftLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-gray-900 transition-colors duration-150">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
          {rightLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-gray-900 transition-colors duration-150">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default MinimalFooter;
