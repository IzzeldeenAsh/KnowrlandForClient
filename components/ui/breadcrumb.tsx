"use client"

import Link from 'next/link';
import { ChevronRightIcon, ChevronLeftIcon, HomeIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  makeLastItemClickable?: boolean;
}

export default function Breadcrumb({ items, makeLastItemClickable = false }: BreadcrumbProps) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const isRTL = currentLocale === 'ar';
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Function to render items based on screen size
  const renderBreadcrumbItems = () => {
    // If we have more than 3 items and on mobile, show only first and last item
    if (isMobile && items.length > 3) {
      return (
        <>
          {/* First item */}
          {renderBreadcrumbItem(items[0], 0)}
          
          {/* Ellipsis indicator */}
          <li className="flex items-center">
            {isRTL ? (
              <ChevronLeftIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
            )}
            <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-500 text-sm`}>...</span>
          </li>
          
          {/* Last item */}
          {renderBreadcrumbItem(items[items.length - 1], items.length - 1)}
        </>
      );
    }
    
    // Otherwise, render all items
    return items.map((item, index) => renderBreadcrumbItem(item, index));
  };
  
  // Function to render a single breadcrumb item
  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => {
    const isLastItem = index === items.length - 1;
    
    return (
      <li key={item.href} className="flex items-center min-w-0">
        {isRTL ? (
          <ChevronLeftIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
        )}
        {isLastItem && !makeLastItemClickable ? (
          <span
            className={`${isRTL ? 'mr-2' : 'ml-2'} text-sm whitespace-nowrap truncate inline-block text-gray-900 font-medium max-w-[140px] sm:max-w-[220px] md:max-w-[280px]`}
            aria-current="page"
            title={item.label} // Add title for hover tooltip on truncated text
          >
            {item.label}
          </span>
        ) : (
          (() => {
            // Normalize API-provided hrefs to avoid double slashes
            const rawHref = (item.href || '').replace(/^\/+/, '');
            // Handle known API alias: route '/industry' does not exist; send to '/all-industries'
            const normalizedHref =
              rawHref === 'industry' ? 'all-industries' : rawHref;
            const finalHref =
              (item.label === 'Industries' || item.label === 'المجالات')
                ? `/${currentLocale}/all-industries`
                : `/${currentLocale}/${normalizedHref}`;
            return (
              <Link
                href={finalHref}
                className={`${isRTL ? 'mr-2' : 'ml-2'} text-sm whitespace-nowrap truncate inline-block max-w-[140px] sm:max-w-[220px] md:max-w-[280px] ${isLastItem && makeLastItemClickable ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                title={item.label}
              >
                {item.label}
              </Link>
            );
          })()
        )}
      </li>
    );
  };
  
  return (
    <nav className="flex w-full" aria-label="Breadcrumb">
      <ol className={`flex items-center flex-wrap sm:flex-nowrap w-full min-w-0 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
        <li>
          <Link
            href={`/${currentLocale}`}
            className={`text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}
            aria-label="Home"
          >
            <HomeIcon className={`h-4 w-4 ${isRTL ? 'mr-0 ml-1' : 'mr-1'}`} />
          </Link>
        </li>
        {renderBreadcrumbItems()}
      </ol>
    </nav>
  );
}
