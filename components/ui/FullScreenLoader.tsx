'use client';

import Image from 'next/image';

type FullScreenLoaderProps = {
  message?: string;
};

export default function FullScreenLoader({ message = 'Signing you in...' }: FullScreenLoaderProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/images/logo.svg"
          alt="KNOLDG"
          width={72}
          height={72}
          priority
          className="opacity-90"
        />
        <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-700 dark:text-slate-200 text-base font-medium text-center">
          {message}
        </p>
      </div>
    </div>
  );
}


