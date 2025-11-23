'use client'

import { memo } from 'react';
import { useLocale } from 'next-intl';  
const LoadingState: React.FC = () => {
  const currentLocale = useLocale();
  return <div className="text-center py-8">{currentLocale === 'ar' ? 'جارى التحميل...' : 'Loading...'}</div>;
};

export default memo(LoadingState);
