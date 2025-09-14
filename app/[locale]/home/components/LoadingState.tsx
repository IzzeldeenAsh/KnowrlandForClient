'use client'

import { memo } from 'react';

const LoadingState: React.FC = () => {
  return <div className="text-center py-8">Loading...</div>;
};

export default memo(LoadingState);
