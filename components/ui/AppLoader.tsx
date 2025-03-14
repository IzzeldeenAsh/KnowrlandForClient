import Image from 'next/image';

export default function AppLoader() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-900 flex items-center justify-center z-50">
      <div className="w-32 h-32 relative">
        <Image 
          src="/images/KNOLDG.gif" 
          alt="Loading..." 
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
} 