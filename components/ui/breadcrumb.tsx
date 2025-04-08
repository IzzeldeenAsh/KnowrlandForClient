"use client"

import Link from 'next/link';
import { ChevronRightIcon, ChevronLeftIcon, HomeIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const isRTL = currentLocale === 'ar';
  
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
        <li>
          <Link
            href={`/${currentLocale}`}
            className={`text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <HomeIcon className={`h-4 w-4 ${isRTL ? 'mr-0 ml-1' : 'mr-1'}`} />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {isRTL ? (
              <ChevronLeftIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
            )}
            <Link
              href={(item.label === "Industries" || item.label === "الصناعات") ? `/${currentLocale}/all-industries` : `/${currentLocale}/${item.href}`}
              className={`${isRTL ? 'mr-2' : 'ml-2'} text-sm  ${
                index === items.length - 1
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
