'use client'

import React, { memo, useMemo } from 'react';
import PerformanceMonitor from './PerformanceMonitor';

interface FilterToggleProps {
  locale: string;
  filtersVisible: boolean;
  isTabletOrMobile: boolean;
  onToggle: () => void;
}

const FilterToggle = memo<FilterToggleProps>(({
  locale,
  filtersVisible,
  isTabletOrMobile,
  onToggle,
}) => {
  // Memoized translations
  const translations = useMemo(() => ({
    showFilters: locale === 'ar' ? 'إظهار الفلاتر' : 'Show Filters',
    hideFilters: locale === 'ar' ? 'إخفاء الفلاتر' : 'Hide Filters',
  }), [locale]);

  return (
    <>
      <PerformanceMonitor componentName="FilterToggle" />
      
      <div className="mb-4 flex justify-start">
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
        >
          {filtersVisible && !isTabletOrMobile ? (
            <>
              <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <g clipRule="evenodd" fillRule="evenodd">
                  <path d="m11 20v-16h2v16z" fill="#90caea"/>
                  <g fill="#3747d6">
                    <path d="m16.9142 12 2.7929-2.79289-1.4142-1.41422-3.5 3.50001c-.3905.3905-.3905 1.0237 0 1.4142l3.5 3.5 1.4142-1.4142z"/>
                    <path d="m7.0858 12-2.79289-2.79289 1.41421-1.41422 3.5 3.50001c.39053.3905.39053 1.0237 0 1.4142l-3.5 3.5-1.41421-1.4142z"/>
                  </g>
                </g>
              </svg>
              {translations.hideFilters}
            </>
          ) : (
            <>
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.44336 5.9082H14.6973V7.37305H4.44336V5.9082Z" fill="#4DC4FF"/>
                <path d="M16.1621 5.9082H20.5566V7.37305H16.1621V5.9082Z" fill="#4DA6FF"/>
                <path d="M4.44336 11.7676H8.83789V13.2324H4.44336V11.7676Z" fill="#4DC4FF"/>
                <path d="M10.3027 11.7676H20.5566V13.2324H10.3027V11.7676Z" fill="#4DC4FF"/>
                <path d="M9.57031 14.6973C8.35869 14.6973 7.37305 13.7116 7.37305 12.5C7.37305 11.2884 8.35869 10.3027 9.57031 10.3027C10.7819 10.3027 11.7676 11.2884 11.7676 12.5C11.7676 13.7116 10.7819 14.6973 9.57031 14.6973Z" fill="#5A77B3"/>
                <path d="M4.44336 17.627H14.6973V19.0918H4.44336V17.627Z" fill="#4DC4FF"/>
                <path d="M16.1621 17.627H20.5566V19.0918H16.1621V17.627Z" fill="#4DA6FF"/>
                <path d="M15.4297 8.83789C14.2181 8.83789 13.2324 7.85225 13.2324 6.64062C13.2324 5.429 14.2181 4.44336 15.4297 4.44336C16.6413 4.44336 17.627 5.429 17.627 6.64062C17.627 7.85225 16.6413 8.83789 15.4297 8.83789Z" fill="#4D5B99"/>
                <path d="M15.4297 20.5566C14.2181 20.5566 13.2324 19.571 13.2324 18.3594C13.2324 17.1478 14.2181 16.1621 15.4297 16.1621C16.6413 16.1621 17.627 17.1478 17.627 18.3594C17.627 19.571 16.6413 20.5566 15.4297 20.5566Z" fill="#4D5B99"/>
              </svg>
              {translations.showFilters}
            </>
          )}
        </button>
      </div>
    </>
  );
});

FilterToggle.displayName = 'FilterToggle';

export default FilterToggle;